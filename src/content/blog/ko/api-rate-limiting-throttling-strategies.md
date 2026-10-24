---
title: "API 속도 제한 및 스로틀링 전략: 프로덕션 아키텍처 실무 가이드"
description: "분산 시스템을 위한 API 속도 제한 및 스로틀링 알고리즘 분석. 토큰 버킷, 슬라이딩 윈도우, Redis Lua 스크립트를 통한 원자적 구현과 표준 HTTP 헤더 설계."
locale: "ko"
slug: "api-rate-limiting-throttling-strategies"
translationKey: "api-rate-limiting-throttling-strategies"
author: "Girish Lade"
publishedAt: "2024-09-09"
updatedAt: "2026-10-24"
category: "Backend"
tags: ["API 설계", "속도 제한", "Redis", "분산 시스템", "백엔드 엔지니어링", "보안"]
coverImage: "/blog-covers/api-rate-limiting.svg"
coverAlt: "API 속도 제한 및 스로틀링 아키텍처 다이어그램"
draft: false
featured: false
relatedProduct: "GB Coder"
contentType: "deep-dive"
---

현대 웹 애플리케이션과 분산 API는 예측하기 어려운 트래픽 변동성에 항상 노출되어 있습니다. 마케팅 캠페인으로 인한 급격한 스파이크, 검색 크롤러의 데이터 수집, 외부 파트너 시스템의 무한 재시도, 혹은 악의적인 서비스 거부(DoS) 공격에 이르기까지 트래픽 셰이핑(Traffic Shaping)이 부재한 API는 언제든 다운될 위험을 안고 있습니다.

**속도 제한(Rate Limiting)**과 **스로틀링(Throttling)**은 시스템의 안정성을 보장하는 핵심 안전장치입니다. 속도 제한이 '특정 시간 단위 동안 클라이언트가 보낼 수 있는 최대 요청 수'를 강제한다면, 스로틀링은 '백엔드 데이터베이스와 리소스를 보호하고 멀티 테넌트 간의 공정성을 유지하기 위해 처리 속도를 적극적으로 조율'합니다.

이 심층 가이드에서는 주요 속도 제한 알고리즘의 수학적 모델을 살펴보고, 분산 환경의 병목 현상을 해결하는 원자적 Redis 토큰 버킷 엔진의 구현을 다룹니다.

---

## 핵심 속도 제한 알고리즘 비교

각 알고리즘은 연산 복잡도, 메모리 사용량, 버스트(Burst) 트래픽 허용 범위 사이에서 서로 다른 균형점을 가집니다.

```
+---------------------------+-------------------+--------------------+------------------------+
| 알고리즘                  | 메모리 사용량     | 버스트 트래픽 처리 | 윈도우 경계 정밀도     |
+---------------------------+-------------------+--------------------+------------------------+
| 고정 윈도우 (Fixed)       | 클라이언트당 O(1) | 2배 스파이크 취약  | 경계 구간 왜곡 발생    |
| 슬라이딩 로그 (Log)       | 요청 수당 O(N)    | 정밀하고 매끄러움  | 완벽한 정밀도          |
| 슬라이딩 카운터 (Counter) | 클라이언트당 O(1) | 매끄러운 평균화    | 근사치 (약 99% 정밀도) |
| 토큰 버킷 (Token Bucket)  | 클라이언트당 O(1) | 용량 C까지 버스트  | 정확한 토큰 충전 계산  |
| 리키 버킷 (Leaky Bucket)  | 큐 크기 O(N)      | 일정 속도 정량 배출| 큐 포화 시 요청 거부   |
+---------------------------+-------------------+--------------------+------------------------+
```

### 1. 고정 윈도우 카운터 (Fixed Window Counter)
시간을 고정된 구간(예: 60초)으로 나누고 카운터를 증가시킵니다. 임계값 $L$에 도달하면 후속 요청을 차단합니다. 59초에 100회, 61초에 100회 요청이 인입될 경우 2초 사이에 200회의 요청이 통과되어 백엔드가 과부하에 빠지는 경계 취약점이 존재합니다.

### 2. 토큰 버킷 (Token Bucket)
AWS API Gateway, Cloudflare 등 전 세계 대규모 API 게이트웨이의 실질적 표준입니다. 용량 $C$의 버킷에 초당 $R$개의 토큰이 일정하게 충전되며, 요청이 들어올 때마다 토큰 1개를 차감하여 처리합니다. 토큰이 고갈되면 HTTP `429 Too Many Requests`를 반환합니다. 평상시에는 정해진 속도 $R$을 유지하면서도 $C$ 크기까지의 일시적 버스트를 자연스럽게 수용합니다.

---

## Redis 기반 원자적 토큰 버킷 구현

분산 환경에서 여러 대의 무상태(Stateless) API 서버가 각자의 로컬 메모리에서 카운트를 관리하면 쿼터가 파편화됩니다. 중앙 Redis를 통해 상태를 공유해야 하지만, 단순한 Read-Modify-Write는 동시성 경쟁 상태(Race Condition)를 유발합니다.

이를 해결하기 위해 충전과 차감 로직을 원자적인 **Redis Lua 스크립트**로 작성합니다:

```lua
-- KEYS[1]: 속도 제한 키 (예: "ratelimit:user_1024")
-- ARGV[1]: 버킷 용량 (최대 버스트 한도)
-- ARGV[2]: 초당 충전 속도 (refill rate)
-- ARGV[3]: 현재 Unix 타임스탬프 (밀리초 포함 실수)
-- ARGV[4]: 요청 토큰 수 (기본 1)

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
    return {1, math.floor(tokens)} -- 허용: [1, 남은 토큰]
else
    redis.call("HMSET", key, "tokens", tokens, "last_updated", last_updated)
    return {0, math.floor(tokens)} -- 제한: [0, 남은 토큰]
end
```

### TypeScript 미들웨어 연동

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
  refillRate: number = 1.0 // 초당 1개 토큰 = 분당 60회 허용
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

## 표준 HTTP 응답 헤더

클라이언트가 비효율적인 무차별 폴링을 멈추고 지수 백오프(Exponential Backoff)를 수행할 수 있도록 IETF 표준 헤더를 응답에 포함합니다:

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 12
RateLimit-Limit: 60
RateLimit-Remaining: 0
RateLimit-Reset: 12

{
  "error": "rate_limit_exceeded",
  "message": "요청 허용 쿼터를 초과했습니다. 잠시 후 다시 시도하십시오.",
  "retry_after_seconds": 12
}
```
