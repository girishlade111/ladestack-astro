---
title: "APIレート制限とスロットリング戦略：本番アーキテクチャ完全ガイド"
description: "分散システムにおけるAPIレート制限およびスロットリングアルゴリズムの解説。Token Bucket、Sliding Window、Redis Luaスクリプトによるアトミック実装、標準HTTPヘッダーの活用。"
locale: "ja"
slug: "api-rate-limiting-throttling-strategies"
translationKey: "api-rate-limiting-throttling-strategies"
author: "Girish Lade"
publishedAt: "2024-09-09"
updatedAt: "2026-10-24"
category: "Backend"
tags: ["API設計", "レート制限", "Redis", "分散システム", "バックエンドエンジニアリング", "セキュリティ"]
coverImage: "/blog-covers/api-rate-limiting.svg"
coverAlt: "APIレート制限およびスロットリング戦略のアーキテクチャ図"
draft: false
featured: false
relatedProduct: "GB Coder"
contentType: "deep-dive"
---

現代のWebアプリケーションや分散APIは、常にトラフィックの急変動に晒されています。マーケティングキャンペーンによる急激なスパイク、クローラーの自動収集、外部連携ツールのリトライ、あるいは悪意あるDoS攻撃に至るまで、トラフィック制御を備えていないAPIは重大な運用リスクを抱えています。

**レート制限（Rate Limiting）**と**スロットリング（Throttling）**は、システムの安定性を担保するための不可欠な基盤です。レート制限が「一定時間内にクライアントが送信できるリクエスト数の上限」を制御するのに対し、スロットリングは「ダウンストリームのデータベースやサーバーリソースを保護し、マルチテナント間の公平性を維持するために処理速度を能動的に調整」します。

本記事では、主要なレート制限アルゴリズムの数学的モデルを比較し、Redisを用いたアトミックなToken Bucketエンジンの本番実装を解説します。

---

## 主要なレート制限アルゴリズムの比較

各アルゴリズムは、計算量、メモリフットプリント、およびバーストトラフィック耐性の間でそれぞれ異なるトレードオフを持ちます。

```
+---------------------------+-------------------+--------------------+------------------------+
| アルゴリズム              | メモリ消費量      | バースト処理能力   | 境界精度の正確性       |
+---------------------------+-------------------+--------------------+------------------------+
| 固定ウィンドウ（Fixed）   | クライアント毎O(1)| 2倍バーストの脆弱性| ウィンドウ境界で不正確 |
| スライディングログ (Log)  | リクエスト毎O(N)  | 正確かつ滑らか     | 完全な境界精度         |
| スライディングカウンター  | クライアント毎O(1)| 滑らかな平均化     | 近似値（約99%の精度）  |
| トークンバケット (Token)  | クライアント毎O(1)| 容量Cまでバースト許容| 正確なトークン補充     |
| リーキーバケット (Leaky)  | キュー深度O(N)    | 一定速度での平滑出力| キュー満杯時に拒否     |
+---------------------------+-------------------+--------------------+------------------------+
```

### 1. 固定ウィンドウカウンター（Fixed Window Counter）
時間を一定の枠（例：60秒）に区切り、リクエスト毎にカウンターを加算します。上限 $L$ に達した時点で、同一ウィンドウ内の後続リクエストを拒否します。
- **境界脆弱性：** 秒59で100回、秒61で100回リクエストが送られた場合、実質2秒間で200回のリクエストが実行され、システムを過負荷に陥れる弱点があります。

### 2. スライディングログ（Sliding Window Log）
各リクエストのタイムスタンプをソート済みセットに保持し、直近のウィンドウ外のログを破棄して件数を判定します。完全な精度を持つ反面、大規模トラフィックではメモリ消費量が膨大になる課題があります。

### 3. トークンバケット（Token Bucket）
業界標準としてCloudflareやAWS API Gatewayなどで広く採用されているアルゴリズムです。バケットに最大容量 $C$ のトークンが格納され、一定の補充速度 $R$（トークン/秒）で補充されます。リクエストはトークンを1つ消費して実行され、残数がゼロになるとHTTP `429 Too Many Requests` を返します。

---

## RedisによるアトミックなToken Bucket実装

複数のステートレスなAPIサーバーが分散配置された環境では、サーバー個別のローカルメモリでカウントを管理するとクォータが分散してしまいます。Redisに状態を集約するのが確実ですが、通常のRead-Modify-Writeでは競合状態（Race Condition）が発生します。

これを防ぐため、補充と消費のロジックを1つのアトミックな**Redis Luaスクリプト**にカプセル化します。

```lua
-- KEYS[1]: レート制限キー（例: "ratelimit:user_1024"）
-- ARGV[1]: バケット最大容量 (burst limit)
-- ARGV[2]: 1秒あたりの補充速度
-- ARGV[3]: 現在のUnixタイムスタンプ (ミリ秒単位の小数)
-- ARGV[4]: 要求トークン数 (通常 1)

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
    return {1, math.floor(tokens)} -- 許可: [1, 残りトークン]
else
    redis.call("HMSET", key, "tokens", tokens, "last_updated", last_updated)
    return {0, math.floor(tokens)} -- 拒絶: [0, 残りトークン]
end
```

### TypeScriptミドルウェア連携

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
  refillRate: number = 1.0 // 1トークン/秒 = 60リクエスト/分
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

## 標準HTTPヘッダーとエラー応答設計

クライアント側での過度な再試行ループを防ぐため、IETF標準のRateLimitヘッダーを付与して状態を伝達します：

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 12
RateLimit-Limit: 60
RateLimit-Remaining: 0
RateLimit-Reset: 12

{
  "error": "rate_limit_exceeded",
  "message": "レート制限の上限に達しました。時間をおいて再試行してください。",
  "retry_after_seconds": 12
}
```

- **`RateLimit-Limit`:** 対象ウィンドウでの最大許容リクエスト数。
- **`RateLimit-Remaining`:** 現在利用可能な残トークン数。
- **`RateLimit-Reset`:** トークンがリセットされるまでの待機秒数。
- **`Retry-After`:** 再試行が可能になるまでの秒数。
