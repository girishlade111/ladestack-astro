---
title: "堅牢なサブスクリプション決済システムの構築：ライフサイクル、Webhook、および冪等性"
description: "Stripe連携、暗号化Webhook検証、冪等な状態遷移マシン、マルチテナントエンタイトルメント同期を含む、実用的なSaaSサブスクリプション決済アーキテクチャの解説ガイド。"
locale: "ja"
slug: "building-subscription-billing-systems"
translationKey: "building-subscription-billing-systems"
author: "Girish Lade"
publishedAt: "2024-07-28"
updatedAt: "2026-10-24"
category: "SaaS Architecture"
tags: ["SaaS", "Billing", "Stripe", "Webhooks", "Architecture", "TypeScript"]
coverImage: "/blog-covers/kubernetes-scale.svg"
coverAlt: "サブスクリプション決済システムアーキテクチャ図"
draft: false
featured: false
contentType: "architecture"
---

## はじめに：決済エンジニアリングの複雑性

SaaSエンジニアリングにおいて、サブスクリプション決済の実装は「チェックアウトUIを組み込み、データベースに`subscription_id`を保存するだけ」と過小評価されがちです。しかし実際には、課金基盤は組織が運用する分散システムの中でも最も障害が許されないクリティカルな要素の1つです。

信頼性の高い課金エンジンは、非同期の支払い確認、一時的なネットワーク障害、順序が前後するWebhookイベント、クレジットカードの有効期限切れ、日割り計算（Proration）を伴うプラン変更、そしてマルチテナントのアクセス権限（Entitlements）チェックを安全に処理しなければなりません。単一のロジックの不具合が、収益の未回収や不当なアカウント停止による解約を引き起こします。

本ガイドでは、スケーラブルで耐障害性に優れたサブスクリプション課金インフラの設計指針を解説します。サブスクリプション状態マシン、安全なチェックアウトフロー、暗号検証されたWebhook、冪等なトランザクション処理、およびテナント権限の同期について掘り下げます。

---

## 1. ハイレベルアーキテクチャと関心の分離

コードを書く前に、決済処理とアプリケーション認可を明確に分離する設計を確立する必要があります：

```
[クライアントブラウザ]
      │
      │ 1. チェックアウト開始 / 決済手段更新
      ▼
[SaaSアプリケーションサーバー] ─── 2. セッション / 顧客作成 ────► [Stripe / 決済API]
      │                                                                  │
      │ 4. 権限読み取り (ローカルDB / キャッシュ)                         │
      ▼                                                                  │ 3. 非同期イベント配信
[データベース / Redis] ◄──────── 5. 冪等なWebhookハンドラー ◄─────────────┘
(テナント, サブスクリプション, 請求書)
```

### コア設計原則
1. **クレジットカード番号（PAN）を直接扱わない:** サーバーやDBにいかなるカード番号やセキュリティコードも通過させてはなりません。すべての決済情報収集はStripe Elements等のクライアントトークン化を利用し、最小限のPCI DSS SAQ Aコンプライアンス範囲にとどめます。
2. **Webhookを唯一の信頼できる情報源とする:** API呼び出しのHTTPレスポンス内で直接アクセス権限を付与してはなりません。ユーザーの離脱や回線切断でフローが途切れる可能性があるため、永続的なステータス変更は検証済みWebhookイベント経由でのみ実行します。
3. **課金状態と機能権限の疎結合化:** アプリケーション側の認可ルールを決済プロバイダ固有の価格IDと直接結合させず、`tenant.hasFeature('advanced_analytics')`のように抽象化された権限モデルをクエリします。

---

## 2. サブスクリプション・ライフサイクル状態マシン

サブスクリプションは、ライフサイクルを通じて様々な状態を遷移します：

- `incomplete`: 初回の支払いが3Dセキュア（3DS）やSCA認証待ちの状態。
- `active`: 決済完了。全機能および割り当て枠が利用可能。
- `past_due`: 更新決済が失敗（カード期限切れ、残高不足など）。**即時停止は行わず**、一定の猶予期間（Grace Period）を設けて督促（Dunning）案内を表示します。
- `canceled`: ユーザーによる解約、または決済不能による終了。通常は期間終了まで利用を継続させます（`cancel_at_period_end: true`）。
- `unpaid`: 自動リトライがすべて失敗した場合の最終状態。読み取り専用や無料プランへ移行させます。

---

## 3. Webhook署名検証と冪等性の担保

StripeのWebhookは指数バックオフによるリトライを行うため、**同一イベントの重複受信（At-Least-Once Delivery）**や**イベントの逆順到着**が発生します。

### 暗号学的署名検証の実装（TypeScript）

```typescript
import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import { processWebhookEvent } from './billingService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

// 重要: 署名検証には未加工のraw Bufferが必要です
export const webhookHandler = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'];

  if (!sig || typeof sig !== 'string') {
    res.status(400).send('Stripe-Signatureヘッダーが無効です');
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook署名検証に失敗しました: ${err.message}`);
    res.status(400).send(`Webhookエラー: ${err.message}`);
    return;
  }

  try {
    await processWebhookEvent(event);
    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error(`イベント処理エラー ${event.id}:`, err);
    res.status(500).json({ error: '内部処理エラー' });
  }
};
```

---

## 4. データベース設計と冪等性ガード

二重請求やメールの重複送信を防ぐため、PostgreSQLに**冪等性レジスタ（Idempotency Register）**を設けます：

```sql
-- 1. Webhook監査および冪等性管理テーブル
CREATE TABLE billing_webhook_events (
    id VARCHAR(255) PRIMARY KEY, -- StripeイベントID (evt_xxx)
    event_type VARCHAR(100) NOT NULL,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    payload JSONB NOT NULL
);

-- 2. テナントサブスクリプションテーブル
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

### 冪等イベント処理ロジック

```typescript
import { db } from './db';
import Stripe from 'stripe';

export async function processWebhookEvent(event: Stripe.Event): Promise<void> {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    // イベントが処理済みか排他ロックをかけて確認
    const existing = await client.query(
      'SELECT id FROM billing_webhook_events WHERE id = $1 FOR UPDATE',
      [event.id]
    );

    if (existing.rows.length > 0) {
      console.log(`イベント ${event.id} は既に処理済みです。スキップします。`);
      await client.query('ROLLBACK');
      return;
    }

    // レジスタに記録
    await client.query(
      'INSERT INTO billing_webhook_events (id, event_type, payload) VALUES ($1, $2, $3)',
      [event.id, event.type, JSON.stringify(event)]
    );

    // イベントに応じたビジネスロジックを実行
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

## 5. マルチテナント権限同期とRedisキャッシュ

DB更新後、頻繁なAPI認可リクエストに対応するため、高速なRedisキャッシュを更新します：

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

  // 高速な認可判定用のキャッシュを反映
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

## まとめと次のステップ

サブスクリプション課金の堅牢性は、分散境界を越えた状態同期の正確性にかかっています。暗号署名検証、データベースでの排他制御を伴う冪等性レジスタ、および権限の適切なキャッシュ分離を実装することで、取引規模が拡大しても信頼性を維持できます。

### 関連記事
- マルチテナント分離の詳細については、[Multi-Tenant SaaS Architecture Patterns](/blog/multi-tenant-saas-architecture-patterns) をご覧ください。
- バックエンドAPIの保護については、[API Rate Limiting and Throttling Strategies](/blog/api-rate-limiting-throttling-strategies) を参照してください。
