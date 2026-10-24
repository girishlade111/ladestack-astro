---
title: "API İstek Sınırlama ve Kısma Stratejileri: Üretim Seviyesi Mimari Rehberi"
description: "Dağıtık sistemler için API istek sınırlama (Rate Limiting) ve kısma (Throttling) algoritmaları. Token Bucket, Sliding Window, Redis Lua ile atomik çalıştırma ve standart HTTP başlıkları."
locale: "tr"
slug: "api-rate-limiting-throttling-strategies"
translationKey: "api-rate-limiting-throttling-strategies"
author: "Girish Lade"
publishedAt: "2024-09-09"
updatedAt: "2026-10-24"
category: "Backend"
tags: ["API Tasarımı", "Rate Limiting", "Redis", "Dağıtık Sistemler", "Arka Uç Mühendisliği", "Güvenlik"]
coverImage: "/blog-covers/api-rate-limiting.svg"
coverAlt: "API İstek Sınırlama ve Kısma Mimarisi Şeması"
draft: false
featured: false
relatedProduct: "GB Coder"
contentType: "deep-dive"
---

Modern web uygulamaları ve dağıtık API'ler sürekli olarak öngörülemeyen trafik dalgalanmalarıyla karşılaşır. Pazarlama kampanyalarından kaynaklanan anlık yükler, arama motoru botlarının yoğun taramaları, kontrolsüz mikroservis yeniden denemeleri veya kötü niyetli DoS girişimleri; trafik şekillendirme (Traffic Shaping) korumasına sahip olmayan bir API için ciddi çökme riskleri doğurur.

**İstek sınırlama (Rate Limiting)** ve **kısma (Throttling)**, sistem dayanıklılığının en temel koruyucu hatlarıdır. İstek sınırlama, belirli bir zaman penceresinde bir istemcinin gönderebileceği en fazla istek adedini belirlerken; kısma mekanizması veritabanlarını korumak ve kaynak adaletini sağlamak için genel işleme temposunu aktif olarak yönetir.

Bu kapsamlı rehberde, temel istek sınırlama algoritmalarının matematiksel modellerini inceleyecek ve Redis üzerinde atomik bir Token Bucket motorunun üretim seviyesi uygulamasını kuracağız.

---

## Temel İstek Sınırlama Algoritmalarının Karşılaştırması

Her algoritma; hesaplama maliyeti, bellek tüketimi ve ani trafik patlamalarını (burst) karşılama kabiliyeti arasında farklı bir mühendislik dengesi sunar.

```
+---------------------------+-------------------+--------------------+------------------------+
| Algoritma                 | Bellek Ayak İzi   | Ani Yük Kapasitesi | Pencere Sınır Kesinliği|
+---------------------------+-------------------+--------------------+------------------------+
| Sabit Pencere (Fixed)     | İstemci başı O(1) | 2x Yük Açığı       | Pencere sınırında zayıf|
| Kayan Günlük (Log)        | İstek başı O(N)   | Kusursuz ve yumuşak| Tam matematiksel uyum  |
| Kayan Sayaç (Counter)     | İstemci başı O(1) | Düzgün ortalama    | Yaklaşık (%99 doğruluk)|
| Belirteç Kovası (Token)   | İstemci başı O(1) | C hacmine dek burst| Kesintisiz dolum hesabı|
| Sızdıran Kova (Leaky)     | Kuyruk boyu O(N)  | Sabit çıkış akışı  | Kuyruk taşınca ret     |
+---------------------------+-------------------+--------------------+------------------------+
```

### 1. Sabit Pencere Sayacı (Fixed Window Counter)
Zamanı 60 saniyelik sabit bloklara ayırır ve istekleri sayar. Limit aşıldığında istekler reddedilir. Ancak 59. saniyede 100 istek ve 61. saniyede 100 istek gelirse, sistem 2 saniye içinde 200 istek işlemek zorunda kalarak aşırı yüklenme riskiyle karşılaşır.

### 2. Belirteç Kovası (Token Bucket)
Cloudflare ve AWS API Gateway gibi küresel sistemlerin temel tercihidir. $C$ kapasitesine sahip bir kova, saniyede $R$ adet belirteçle (token) doldurulur. Gelen her geçerli istek 1 belirteç tüketir; kova boşaldığında HTTP `429 Too Many Requests` döndürülür. Bu mekanizma ani yükleri $C$ sınırına dek karşılayabilirken, uzun vadeli tüketimin $R$ oranını geçmemesini garanti eder.

---

## Redis ve Lua ile Atomik Token Bucket Uygulaması

Çok düğümlü dağıtık mimarilerde sayaçların sunucu yerel belleğinde tutulması limitlerin tutarsızlaşmasına yol açar. Durum bilgisinin Redis'e aktarılması şarttır; ancak sıradan Okuma-Değiştirme-Yazma (Read-Modify-Write) akışları yarış durumlarına (Race Condition) sebep olur.

Tüm hesaplamayı tek bir atomik **Redis Lua betiği** içinde toplayarak tam veri bütünlüğü elde ederiz:

```lua
-- KEYS[1]: İstek sınırlama anahtarı (Örn: "ratelimit:user_1024")
-- ARGV[1]: Kova kapasitesi (maksimum anlık limit)
-- ARGV[2]: Saniye başına belirteç dolum hızı
-- ARGV[3]: Mevcut Unix zaman damgası (milisaniye kesirli)
-- ARGV[4]: Talep edilen belirteç adedi (genellikle 1)

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
    return {1, math.floor(tokens)} -- Onaylandı: [1, kalan belirteç]
else
    redis.call("HMSET", key, "tokens", tokens, "last_updated", last_updated)
    return {0, math.floor(tokens)} -- Kısıtlandı: [0, kalan belirteç]
end
```

### TypeScript Ara Yazılımı (Middleware)

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
  refillRate: number = 1.0 // Saniyede 1 belirteç = dakikada 60 istek
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

## Standart HTTP Başlıkları ve Yanıt Tasarımı

İstemcilerin gereksiz yere agresif döngüler kurmasını engellemek için IETF standart başlıklarını yanıtla birlikte iletmek gerekir:

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 12
RateLimit-Limit: 60
RateLimit-Remaining: 0
RateLimit-Reset: 12

{
  "error": "rate_limit_exceeded",
  "message": "İstek kotası aşıldı. Lütfen daha sonra tekrar deneyiniz.",
  "retry_after_seconds": 12
}
```
