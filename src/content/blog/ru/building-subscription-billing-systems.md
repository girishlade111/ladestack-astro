---
title: "Архитектура надежных систем подписочного биллинга: жизненный цикл, вебхуки и идемпотентность"
description: "Практическое руководство по созданию надежной биллинговой архитектуры для SaaS с интеграцией Stripe, верификацией вебхуков, автоматом состояний и синхронизацией прав."
locale: "ru"
slug: "building-subscription-billing-systems"
translationKey: "building-subscription-billing-systems"
author: "Girish Lade"
publishedAt: "2024-07-28"
updatedAt: "2026-10-24"
category: "SaaS Architecture"
tags: ["SaaS", "Billing", "Stripe", "Webhooks", "Architecture", "TypeScript"]
coverImage: "/blog-covers/kubernetes-scale.svg"
coverAlt: "Схема архитектуры системы подписочного биллинга"
draft: false
featured: false
contentType: "architecture"
---

## Введение: Сложности биллинговой инженерии

При разработке SaaS-решений внедрение подписок нередко ошибочно считают тривиальной задачей: подключить платежный виджет и записать `subscription_id` в базу данных. Однако в реальности биллинговая подсистема — это один из самых критически важных компонентов распределенной архитектуры.

Надежный биллинговый движок обязан корректно обрабатывать асинхронные подтверждения платежей, сетевые сбои, доставку вебхуков не по порядку, истечение срока действия карт, пропорциональный перерасчет (Proration) и синхронизацию прав доступа (Entitlements) между тенантами.

В этом руководстве представлен архитектурный чертеж построения отказоустойчивой системы подписок.

---

## 1. Архитектурный обзор и разделение ответственности

Необходимо четко разграничивать процессы обработки платежей и бизнес-авторизацию:

```
[Клиентский браузер]
      │
      │ 1. Инициация оплаты / смена карты
      ▼
[Сервер приложений SaaS] ─── 2. Создание сессии / клиента ───► [API платежного шлюза (Stripe)]
      │                                                                  │
      │ 4. Проверка прав доступа (локальная БД / Redis)                  │
      ▼                                                                  │ 3. Асинхронные вебхуки
[База данных / Redis] ◄───── 5. Идемпотентный обработчик ◄───────────────┘
(Тенанты, подписки, счета)
```

### Основные правила проектирования
1. **Никогда не хранить и не пропускать через сервер номера карт (PAN):** Все платежные данные должны токенизироваться на стороне клиента (например, через Stripe Elements) в соответствии с PCI DSS SAQ A.
2. **Вебхуки — единственный источник истины:** Не предоставляйте доступ к платным функциям в синхронном HTTP-ответе после перенаправления. Окончательное состояние должно фиксироваться только через криптографически проверенные события вебхуков.
3. **Разделение тарифов и внутренних прав:** Проверяйте `tenant.hasFeature('analytics')`, а не идентификаторы цен платежного шлюза (`price_xxx`).

---

## 2. Автомат состояний подписки

Основные фазы жизненного цикла подписки:
- `incomplete`: Ожидание подтверждения платежа (3D Secure).
- `active`: Платеж успешен, полный доступ открыт.
- `past_due`: Платеж не прошел. **Не блокируйте доступ мгновенно** — включите льготный период (Grace Period) и настройте автоматические уведомления.
- `canceled`: Подписка отменена, но доступ обычно сохраняется до конца оплаченного периода (`cancel_at_period_end: true`).
- `unpaid`: Лимит автоматических попыток исчерпан. Перевод тенанта на бесплатный тариф или режим "только чтение".

---

## 3. Криптографическая проверка вебхуков

Из-за повторных попыток отправки вебхуков система должна быть готова к **дубликатам (At-Least-Once Delivery)** и **нарушению порядка доставки**.

```typescript
import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import { processWebhookEvent } from './billingService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

// ВАЖНО: Для проверки подписи требуется сырой Buffer (raw body)
export const webhookHandler = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'];

  if (!sig || typeof sig !== 'string') {
    res.status(400).send('Отсутствует заголовок Stripe-Signature');
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Ошибка проверки подписи вебхука: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  try {
    await processWebhookEvent(event);
    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error(`Ошибка обработки события ${event.id}:`, err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
```

---

## 4. Идемпотентность и структура БД в PostgreSQL

```sql
-- Таблица для фиксации обработанных событий вебхуков
CREATE TABLE billing_webhook_events (
    id VARCHAR(255) PRIMARY KEY, -- ID события Stripe (evt_xxx)
    event_type VARCHAR(100) NOT NULL,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    payload JSONB NOT NULL
);

-- Таблица подписок тенантов
CREATE TABLE tenant_subscriptions (
    tenant_id UUID PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
    stripe_customer_id VARCHAR(255) UNIQUE NOT NULL,
    stripe_subscription_id VARCHAR(255) UNIQUE,
    stripe_price_id VARCHAR(255),
    plan_tier VARCHAR(50) NOT NULL DEFAULT 'free',
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Идемпотентный обработчик транзакций

```typescript
import { db } from './db';
import Stripe from 'stripe';

export async function processWebhookEvent(event: Stripe.Event): Promise<void> {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    // Проверка дубликатов с блокировкой FOR UPDATE
    const existing = await client.query(
      'SELECT id FROM billing_webhook_events WHERE id = $1 FOR UPDATE',
      [event.id]
    );

    if (existing.rows.length > 0) {
      console.log(`Событие ${event.id} уже обработано. Пропуск.`);
      await client.query('ROLLBACK');
      return;
    }

    // Регистрация события
    await client.query(
      'INSERT INTO billing_webhook_events (id, event_type, payload) VALUES ($1, $2, $3)',
      [event.id, event.type, JSON.stringify(event)]
    );

    // Выполнение бизнес-логики
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await syncSubscriptionState(client, subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(client, subscription);
        break;
      }
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
```

---

## 5. Синхронизация прав доступа и кэширование в Redis

```typescript
import { PoolClient } from 'pg';
import Stripe from 'stripe';
import { redisClient } from './redis';

async function syncSubscriptionState(client: PoolClient, sub: Stripe.Subscription): Promise<void> {
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
  const priceId = sub.items.data[0]?.price.id;
  const tier = priceId === 'price_enterprise' ? 'enterprise' : 'pro';

  const result = await client.query(
    `UPDATE tenant_subscriptions
     SET stripe_subscription_id = $1,
         stripe_price_id = $2,
         plan_tier = $3,
         status = $4,
         current_period_start = to_timestamp($5),
         current_period_end = to_timestamp($6),
         cancel_at_period_end = $7,
         updated_at = NOW()
     WHERE stripe_customer_id = $8
     RETURNING tenant_id`,
    [sub.id, priceId, tier, sub.status, sub.current_period_start, sub.current_period_end, sub.cancel_at_period_end, customerId]
  );

  if (result.rows.length === 0) return;
  const tenantId = result.rows[0].tenant_id;

  // Обновление кэша прав
  const cacheKey = `entitlements:tenant:${tenantId}`;
  await redisClient.set(cacheKey, JSON.stringify({
    tier,
    status: sub.status,
    seatLimit: tier === 'enterprise' ? 100 : 10,
    canAccessAI: true
  }), 'EX', 86400);
}
```

---

## Заключение

Инженерия подписок опирается на надежную синхронизацию состояний в распределенной среде. Использование криптографической проверки подписей, идемпотентного реестра событий и быстрого кэширования прав позволяет поддерживать непрерывность операций при любом масштабе.

### Рекомендуемые материалы
- Паттерны изоляции данных описаны в статье [Multi-Tenant SaaS Architecture Patterns](/blog/multi-tenant-saas-architecture-patterns).
- Стратегии защиты API рассмотрены в руководстве [API Rate Limiting and Throttling Strategies](/blog/api-rate-limiting-throttling-strategies).
