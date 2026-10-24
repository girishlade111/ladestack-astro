---
title: "견고한 구독 결제 시스템 구축 가이드: 라이프사이클, 웹훅 및 멱등성 설계"
description: "Stripe 연동, 암호화 웹훅 검증, 멱등성 상태 머신, 멀티테넌트 권한 동기화를 다루는 프로덕션급 SaaS 구독 결제 아키텍처 엔지니어링 가이드."
locale: "ko"
slug: "building-subscription-billing-systems"
translationKey: "building-subscription-billing-systems"
author: "Girish Lade"
publishedAt: "2024-07-28"
updatedAt: "2026-10-24"
category: "SaaS Architecture"
tags: ["SaaS", "Billing", "Stripe", "Webhooks", "Architecture", "TypeScript"]
coverImage: "/blog-covers/kubernetes-scale.svg"
coverAlt: "구독 결제 시스템 아키텍처 다이어그램"
draft: false
featured: false
contentType: "architecture"
---

## 소개: 결제 엔지니어링의 복잡성

SaaS 엔지니어링에서 구독 결제 구현은 종종 체크아웃 위젯을 추가하고 데이터베이스에 `subscription_id`를 저장하는 단순한 작업으로 과소평가됩니다. 하지만 실제 결제 인프라는 기업이 운영하는 가장 중요한 분산 시스템 중 하나입니다.

신뢰할 수 있는 결제 엔진은 비동기 결제 승인, 일시적 네트워크 장애, 순서가 뒤바뀌어 수신되는 웹훅 이벤트, 신용카드 만료, 일할 계산(Proration)을 포함한 요금제 변경, 멀티테넌트 접근 권한(Entitlements) 동기화를 안정적으로 처리해야 합니다. 단 한 번의 상태 오류도 매출 누락이나 정당한 사용자의 서비스 차단으로 이어질 수 있습니다.

본 가이드에서는 확장성과 내결함성을 갖춘 구독 결제 시스템의 아키텍처 청사진을 제시합니다.

---

## 1. 하이레벨 아키텍처 및 관심사 분리

결제 로직과 애플리케이션 접근 권한을 명확히 분리해야 합니다:

```
[클라이언트 브라우저]
      │
      │ 1. 결제 시작 / 결제 수단 업데이트
      ▼
[SaaS 애플리케이션 서버] ─── 2. 체크아웃 세션 / 고객 생성 ────► [Stripe / 결제 API]
      │                                                                  │
      │ 4. 권한 조회 (로컬 DB / 캐시)                                     │
      ▼                                                                  │ 3. 비동기 이벤트 전달
[데이터베이스 / Redis] ◄──────── 5. 멱등 웹훅 핸들러 ◄───────────────────┘
(테넌트, 구독, 인보이스)
```

### 핵심 아키텍처 원칙
1. **신용카드 번호(PAN)를 절대 직접 저장하지 말 것:** 카드 정보와 CVC는 서버를 통과해서는 안 됩니다. Stripe Elements와 같은 클라이언트 토큰화를 활용하여 PCI DSS 규정을 준수합니다.
2. **웹훅을 단일 진실 공급원(SSOT)으로 활용:** 결제 완료 리디렉션 응답에서 즉시 권한을 부여하지 마십시오. 네트워크 불안정으로 리디렉션이 실패할 수 있으므로, 영구 상태 업데이트는 반드시 검증된 웹훅을 통해 이루어져야 합니다.
3. **결제 식별자와 기능 권한의 분리:** 비즈니스 로직에서 결제사 가격 ID(`price_xxx`)를 직접 확인하지 말고, `tenant.hasFeature('advanced_analytics')`와 같이 추상화된 권한 모델을 조회하십시오.

---

## 2. 구독 라이프사이클 상태 머신

구독은 다음과 같은 주요 상태를 거칩니다:

- `incomplete`: 3D Secure 또는 추가 인증 대기 상태.
- `active`: 결제가 정상 완료되어 모든 유료 기능이 활성화된 상태.
- `past_due`: 갱신 결제 실패(카드 만료, 한도 초과 등). **즉각적인 차단 대신 유예 기간(Grace Period)을 두고** 카드 변경을 유도합니다.
- `canceled`: 해지된 상태. 보통 결제 주기가 끝날 때까지 접근 권한을 유지합니다(`cancel_at_period_end: true`).
- `unpaid`: 모든 자동 재시도가 실패한 최종 상태. 무료 요금제나 읽기 전용 모드로 전환합니다.

---

## 3. 웹훅 서명 검증 및 멱등성 처리

웹훅은 지연이나 재시도로 인해 **중복 전달(At-Least-Once Delivery)**되거나 **도착 순서가 뒤바뀔 수 있습니다**.

### 웹훅 서명 검증 (TypeScript)

```typescript
import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import { processWebhookEvent } from './billingService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

// 중요: 서명 검증을 위해 raw Buffer가 필요합니다.
export const webhookHandler = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'];

  if (!sig || typeof sig !== 'string') {
    res.status(400).send('Stripe-Signature 헤더가 누락되었습니다');
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`웹훅 서명 검증 실패: ${err.message}`);
    res.status(400).send(`웹훅 오류: ${err.message}`);
    return;
  }

  try {
    await processWebhookEvent(event);
    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error(`웹훅 이벤트 처리 실패 ${event.id}:`, err);
    res.status(500).json({ error: '내부 처리 실패' });
  }
};
```

---

## 4. 데이터베이스 설계 및 멱등성 레지스터

이벤트의 중복 처리를 방지하기 위해 PostgreSQL에 **멱등성 레지스터(Idempotency Register)**를 구현합니다:

```sql
-- 1. 웹훅 이벤트 감사 및 멱등성 테이블
CREATE TABLE billing_webhook_events (
    id VARCHAR(255) PRIMARY KEY, -- Stripe 이벤트 ID (evt_xxx)
    event_type VARCHAR(100) NOT NULL,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    payload JSONB NOT NULL
);

-- 2. 테넌트 구독 테이블
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

### 멱등성 보장 이벤트 처리

```typescript
import { db } from './db';
import Stripe from 'stripe';

export async function processWebhookEvent(event: Stripe.Event): Promise<void> {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    // 1. 이미 처리된 이벤트인지 비관적 락으로 확인
    const existing = await client.query(
      'SELECT id FROM billing_webhook_events WHERE id = $1 FOR UPDATE',
      [event.id]
    );

    if (existing.rows.length > 0) {
      console.log(`이벤트 ${event.id}는 이미 처리되었습니다. 건너뜁니다.`);
      await client.query('ROLLBACK');
      return;
    }

    // 2. 이벤트 기록
    await client.query(
      'INSERT INTO billing_webhook_events (id, event_type, payload) VALUES ($1, $2, $3)',
      [event.id, event.type, JSON.stringify(event)]
    );

    // 3. 비즈니스 로직 분기
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

## 5. 테넌트 권한 동기화 및 Redis 캐싱

구독 상태가 변경되면 DB를 갱신하고, 빠른 API 요청 처리를 위해 Redis 캐시를 업데이트합니다:

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

  // 인메모리 권한 캐시 동기화
  const cacheKey = `entitlements:tenant:${tenantId}`;
  await redisClient.set(cacheKey, JSON.stringify({
    tier,
    status: sub.status,
    seatLimit: tier === 'enterprise' ? 100 : 10,
    canAccessAI: true,
  }), 'EX', 86400);
}
```

---

## 결론 및 권장 아키텍처

구독 결제 시스템의 핵심은 분산 환경에서의 신뢰성 있는 상태 동기화입니다. 암호화 서명 검증, 데이터베이스 멱등성 레지스터, 권한 캐시 분리를 적용하면 비즈니스 규모가 확장되어도 안전하게 결제를 처리할 수 있습니다.

### 관련 아키텍처 가이드
- 멀티테넌트 데이터베이스 격리에 대한 자세한 내용은 [Multi-Tenant SaaS Architecture Patterns](/blog/multi-tenant-saas-architecture-patterns)를 참조하십시오.
- 백엔드 보호 전략은 [API Rate Limiting and Throttling Strategies](/blog/api-rate-limiting-throttling-strategies)에서 확인할 수 있습니다.
