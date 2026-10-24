---
title: "Стратегии ограничения скорости и троттлинга API: архитектурное руководство"
description: "Инженерное руководство по алгоритмам ограничения скорости API (Rate Limiting) и троттлинга. Анализ Token Bucket, Sliding Window, атомарная реализация на Redis Lua и заголовки HTTP."
locale: "ru"
slug: "api-rate-limiting-throttling-strategies"
translationKey: "api-rate-limiting-throttling-strategies"
author: "Girish Lade"
publishedAt: "2024-09-09"
updatedAt: "2026-10-24"
category: "Backend"
tags: ["Проектирование API", "Rate Limiting", "Redis", "Распределенные системы", "Backend", "Безопасность"]
coverImage: "/blog-covers/api-rate-limiting.svg"
coverAlt: "Архитектурная схема ограничения скорости и троттлинга API"
draft: false
featured: false
relatedProduct: "GB Coder"
contentType: "deep-dive"
---

Современные веб-приложения и распределенные API непрерывно подвергаются колебаниям входящего трафика. Будь то внезапные всплески активности пользователей, агрессивная индексация поисковыми роботами, бесконечные повторные попытки сбоящих микросервисов или распределенные DoS-атаки — API без механизмов формирования трафика (Traffic Shaping) представляет собой критическую точку отказа.

**Ограничение скорости (Rate Limiting)** и **троттлинг (Throttling)** являются ключевыми защитными рубежами архитектуры. В то время как Rate Limiting задает верхний предел числа запросов, которые клиент может отправить за определенный интервал времени, Throttling активно регулирует темп обработки, защищая базы данных и гарантируя справедливое распределение вычислительных ресурсов между клиентами.

В этом материале мы разберем математические модели основных алгоритмов ограничения скорости и реализуем масштабируемый атомарный движок Token Bucket на базе Redis и Lua.

---

## Сравнение ключевых алгоритмов Rate Limiting

Каждый алгоритм предлагает определенный компромисс между вычислительной сложностью, расходом оперативной памяти и устойчивостью к пиковым нагрузкам (bursts).

```
+---------------------------+-------------------+--------------------+------------------------+
| Алгоритм                  | Потребление памяти| Работа со всплесками| Точность на границах   |
+---------------------------+-------------------+--------------------+------------------------+
| Фиксированное окно (Fixed)| O(1) на клиента   | Уязвим к 2x пикам  | Искажения на стыках    |
| Лог скользящего окна (Log)| O(N) запросов     | Плавный и точный   | Идеальная точность     |
| Счетчик скользящего окна  | O(1) на клиента   | Плавное усреднение | Аппроксимация (~99%)   |
| Корзина токенов (Token)   | O(1) на клиента   | Допустим всплеск C | Точное восполнение     |
| Утекающее ведро (Leaky)   | O(N) глубина пула | Равномерный сброс  | Сброс при переполнении |
+---------------------------+-------------------+--------------------+------------------------+
```

### 1. Фиксированное окно (Fixed Window Counter)
Интервал делится на статические блоки (например, 60 секунд), в течение которых ведется подсчет запросов. 
- **Краевая уязвимость:** Если клиент отправляет 100 запросов на 59-й секунде и еще 100 запросов на 61-й, за 2 секунды сервер обслужит 200 запросов, что вдвое превышает допустимую нагрузку и может привести к каскадному сбою.

### 2. Корзина токенов (Token Bucket)
Фактический стандарт для распределенных шлюзов (Cloudflare, AWS API Gateway). Корзина емкостью $C$ непрерывно пополняется токенами со скоростью $R$ токенов в секунду. Каждый входящий запрос расходует 1 токен. При исчерпании токенов возвращается статус HTTP `429 Too Many Requests`. Это позволяет комфортно обслуживать короткие всплески в пределах $C$, сохраняя долговременный лимит $R$.

---

## Атомарная реализация Token Bucket на Redis и Lua

В распределенной системе локальный учет в памяти отдельных нод приводит к неточному учету лимитов. Централизация состояния в Redis решает эту проблему, однако последовательные операции чтения и записи приводят к состоянию гонки (Race Condition).

Инженерным решением является объединение логики пополнения и списания токенов в атомарный **скрипт Lua**:

```lua
-- KEYS[1]: Ключ корзины (например, "ratelimit:user_1024")
-- ARGV[1]: Вместимость корзины (максимальный всплеск)
-- ARGV[2]: Скорость пополнения в секунду
-- ARGV[3]: Текущее время Unix (секунды с дробной частью)
-- ARGV[4]: Требуемое число токенов (обычно 1)

local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local requested = tonumber(ARGV[4])

local data = redis.call("HMGET", key, "tokens", "last_updated")
local tokens = tonumber(data[1])
local last_updated = tonumber(data[2])

if tokens == nil then
    tokens = capacity
    last_updated = now
else
    local elapsed = math.max(0, now - last_updated)
    tokens = math.min(capacity, tokens + (elapsed * refill_rate))
    last_updated = now
end

if tokens >= requested then
    tokens = tokens - requested
    redis.call("HMSET", key, "tokens", tokens, "last_updated", last_updated)
    local ttl = math.ceil(capacity / refill_rate) * 2
    redis.call("EXPIRE", key, ttl)
    return {1, math.floor(tokens)} -- Разрешено: [1, остаток токенов]
else
    redis.call("HMSET", key, "tokens", tokens, "last_updated", last_updated)
    return {0, math.floor(tokens)} -- Заблокировано: [0, остаток токенов]
end
```

### TypeScript Middleware

```typescript
import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });

export interface RateLimitResult {
  allowed: boolean;
  remainingTokens: number;
  retryAfterSeconds?: number;
}

export async function checkRateLimit(
  clientId: string,
  capacity: number = 60,
  refillRate: number = 1.0 // 1 токен/сек = 60 запросов в минуту
): Promise<RateLimitResult> {
  const key = `ratelimit:${clientId}`;
  const now = Date.now() / 1000;

  const [allowed, remaining] = (await redis.evalSha(LUA_SCRIPT_SHA, {
    keys: [key],
    arguments: [
      capacity.toString(),
      refillRate.toString(),
      now.toString(),
      '1'
    ],
  })) as [number, number];

  if (allowed === 1) {
    return { allowed: true, remainingTokens: remaining };
  }

  const retryAfter = Math.ceil((1 - remaining) / refillRate);
  return {
    allowed: false,
    remainingTokens: 0,
    retryAfterSeconds: Math.max(1, retryAfter),
  };
}
```

---

## Стандартные HTTP-заголовки

Для предотвращения агрессивных циклов повторных запросов возвращайте клиентам стандартные заголовки IETF:

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 12
RateLimit-Limit: 60
RateLimit-Remaining: 0
RateLimit-Reset: 12

{
  "error": "rate_limit_exceeded",
  "message": "Превышен лимит запросов. Пожалуйста, повторите попытку позже.",
  "retry_after_seconds": 12
}
```
