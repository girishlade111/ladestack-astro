---
title: "Güvenilir Abonelik Faturalandırma Sistemleri Oluşturma: Yaşam Döngüsü, Webhook'lar ve Tekrarlanabilirlik (Idempotency)"
description: "Stripe ile üretime hazır abonelik faturalandırma mimarileri, güvenli webhook doğrulaması, tekrarlanabilir durum makineleri ve çok kiracılı yetki senkronizasyonu için kapsamlı mühendislik rehberi."
locale: "tr"
slug: "building-subscription-billing-systems"
translationKey: "building-subscription-billing-systems"
author: "Girish Lade"
publishedAt: "2024-07-28"
updatedAt: "2026-10-24"
category: "SaaS Architecture"
tags: ["SaaS", "Faturalandırma", "Stripe", "Webhooks", "Mimari", "TypeScript"]
coverImage: "/blog-covers/kubernetes-scale.svg"
coverAlt: "Abonelik Faturalandırma Sistemleri Mimari Şeması"
draft: false
featured: false
contentType: "architecture"
---

## Giriş: Faturalandırma Mühendisliğinin Karmaşıklığı

SaaS mühendisliğinde abonelik faturalandırması uygulamak genellikle basitçe bir ödeme bileşeni eklemek ve veritabanına bir `subscription_id` kaydetmekten ibaret görülür. Gerçekte ise faturalandırma, bir kurumun sürdürdüğü en kritik dağıtık sistemlerden biridir.

Güvenilir bir faturalandırma motoru; asenkron ödeme onaylarını, geçici ağ kesintilerini, sırasız gelen webhook olaylarını, süresi dolan kredi kartlarını, orantılı ücretlendirme (proration) ile plan yükseltmelerini ve çok kiracılı (multi-tenant) erişim yetkilerini sorunsuz bir şekilde yönetmelidir. Tek bir mantık hatası gelir kaybına, hatalı erişim iptali nedeniyle müşteri kaybına veya mevzuata uyumsuzluğa yol açabilir.

Bu rehber, ölçeklenebilir ve dayanıklı bir abonelik faturalandırma altyapısı kurmak için mimari bir plan sunmaktadır. Eksiksiz abonelik durum makinesini, güvenli ödeme akışlarını, kriptografik olarak doğrulanmış webhook'ları, tekrarlanabilir (idempotent) işlem yönetimini ve kiracı yetki senkronizasyonunu inceliyoruz.

---

## 1. Yüksek Düzey Mimari ve Sorumlulukların Ayrılması

Kod yazmadan önce ödeme işlemleri ile uygulama yetkilendirmesi arasında kesin bir sınır belirlenmelidir:

```
[İstemci Tarayıcı]
       │
       │ 1. Ödeme / Kart Güncelleme Başlat
       ▼
[SaaS Uygulama Sunucusu] ──── 2. Checkout Oturumu / Müşteri Oluştur ───► [Stripe / Billing API]
       │                                                                            │
       │ 4. Yetkileri Oku (Yerel DB / Cache)                                        │
       ▼                                                                            │ 3. Asenkron
[Uygulama Veritabanı / Redis] ◄─── 5. Idempotent Webhook İşleyici ◄─────────────────┘    Olay İletimi
(Kiracılar, Abonelikler, Faturalar)
```

### Temel Tasarım Kuralları
1. **Ham Kart Bilgilerine Asla Dokunmayın:** Kredi kartı numaraları (PAN) veya CVV kodları asla sunucularınıza veya veritabanlarınıza ulaşmamalıdır. Tüm ödeme yöntemleri istemci taraflı belirteçleştirme (Stripe Elements veya barındırılan ödeme sayfaları gibi) ile toplanarak asgari PCI DSS SAQ A kapsamı sağlanmalıdır.
2. **Tek Gerçek Kaynağı Olarak Webhook'lar:** Bir API çağrısının doğrudan HTTP yanıtında asla yetki vermeyin veya veritabanındaki abonelik durumunu hemen güncellemeyin. Ağ kesintileri döngüyü bozabilir. Kalıcı veritabanı durumu yalnızca doğrulanmış webhook olaylarıyla değişmelidir.
3. **Faturalandırma Durumunu Yetkilerden Ayırın:** Uygulama veritabanınızın yetkilendirme kurallarını sağlayıcıya özel fiyat modellerinden ayrı tutun. Uygulamanız `stripe_price_id === 'price_123'` şeklinde değil, `tenant.hasFeature('advanced_analytics')` şeklinde sorgulama yapmalıdır.

---

## 2. Abonelik Yaşam Döngüsü Durum Makinesi (State Machine)

Abonelik, kullanım süresi boyunca çeşitli aşamalardan geçen yaşayan bir varlıktır. Standart Stripe abonelik modeli aşağıdaki durum geçişlerini sunar:

```
                  ┌──────────────┐
                  │   trialing   │
                  └──────┬───────┘
                         │ Deneme sürümü tamamlandı
                         ▼
┌──────────────┐  Ödeme   ┌──────────────┐  Ödeme   ┌──────────────┐
│  incomplete  ├──────────►│    active    │◄──────────┤   past_due   │
└──────┬───────┘ Başarılı └──────┬───────┘ Başarısız └──────┬───────┘
       │                          │                          │
       │ Ödeme                    │ İptal veya               │ Yeniden Denemeler
       │ Kalıcı Başarısız         │ Alt Plana Geçiş          │ Tükendi
       ▼                          ▼                          ▼
┌──────────────┐           ┌──────────────┐           ┌──────────────┐
│  incomplete_ │           │   canceled   │           │    unpaid    │
│   expired    │           └──────────────┘           └──────────────┘
└──────────────┘
```

### Durum Tanımları ve Yönetim Stratejisi
- `incomplete`: Ödemenin ilk aktivasyondan önce 3D Secure (3DS) doğrulaması veya SCA onayı gerektirdiği başlangıç durumu.
- `active`: Ödeme başarılı oldu; tüm ücretli yetkiler ve kotalar açıldı.
- `past_due`: Yenileme ödemesi başarısız oldu (kart süresi doldu, yetersiz bakiye vb.). Erişimi **hemen iptal etmeyin**. Bu tolerans süresi içinde akıllı tahsilat (dunning) iş akışlarını ve uygulama içi ödeme güncelleme uyarılarını tetikleyin.
- `canceled`: Abonelik kullanıcı tarafından veya ödeme yapılamadığı için sonlandırıldı. Erişim genellikle mevcut fatura dönemi bitene kadar korunmalıdır (`cancel_at_period_end: true`).
- `unpaid`: Otomatik yeniden denemeler başarısız olduğunda ulaşılan son durum. Şirket politikasına göre kiracı ücretsiz plana veya salt okunur moda geçirilir.

---

## 3. Güvenli Webhook Doğrulaması ve Tekrarlanabilir (Idempotent) İşleme

Stripe webhook'ları HTTP POST üzerinden iletilir. İnternet üzerinden iletim güvenilir olmadığından Stripe üstel geri çekilme (exponential backoff) ile otomatik yeniden denemeler uygular. Bu durum iki temel zorunluluk doğurur:
1. **En Az Bir Kez İletim (At-Least-Once Delivery):** Tam olarak aynı webhook yükünü birden fazla kez alabilirsiniz.
2. **Sırasız İletim (Out-of-Order Delivery):** Ağ yollarındaki gecikmeler nedeniyle bir `invoice.payment_succeeded` olayı `customer.subscription.created` olayından önce ulaşabilir.

### Kriptografik İmza Doğrulaması
Sahtecilik saldırılarını önlemek için gelen her webhook, paylaşılan uç nokta gizli anahtarı kullanılarak `Stripe-Signature` başlığı üzerinden doğrulanmalıdır.

İşte TypeScript ve Express ile hazırlanmış üretime uygun bir webhook işleyicisi:

```typescript
import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import { db } from './db';
import { processWebhookEvent } from './billingService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

// KRİTİK: Webhook uç noktası imza kontrolü için işlenmemiş ham Buffer almalıdır
export const webhookHandler = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'];

  if (!sig || typeof sig !== 'string') {
    res.status(400).send('Eksik veya geçersiz Stripe-Signature başlığı');
    return;
  }

  let event: Stripe.Event;

  try {
    // Olayı kriptografik olarak doğrula ve oluştur
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook imza doğrulaması başarısız: ${err.message}`);
    res.status(400).send(`Webhook Hatası: ${err.message}`);
    return;
  }

  try {
    // Olayı veritabanı işlemi içinde tekrarlanabilir biçimde işle
    await processWebhookEvent(event);
    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error(`Webhook ${event.id} işlenemedi:`, err);
    // 500 dönmek Stripe'ın olayı yeniden denemesini sağlar
    res.status(500).json({ error: 'Dahili işleme hatası' });
  }
};
```

---

## 4. Veritabanı Şeması ve Tekrarlanabilirlik (Idempotency) Kilidi

Mükerrer yan etkileri (çift fatura oluşturma veya mükerrer e-posta gönderimi gibi) engellemek için PostgreSQL'de bir **Tekrarlanabilirlik Kayıt Defteri** uygulayın:

```sql
-- 1. Webhook Olay Denetim ve Idempotency Tablosu
CREATE TABLE billing_webhook_events (
    id VARCHAR(255) PRIMARY KEY, -- Stripe Event ID (örn. evt_1Oxxxx)
    event_type VARCHAR(100) NOT NULL,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    payload JSONB NOT NULL
);

-- 2. Kiracı Abonelikleri Tablosu
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

-- Müşteri kimliği aramaları için indeks
CREATE INDEX idx_tenant_subscriptions_customer ON tenant_subscriptions(stripe_customer_id);
```

### Tekrarlanabilir Olay İşleyici

```typescript
import { db } from './db';
import Stripe from 'stripe';

export async function processWebhookEvent(event: Stripe.Event): Promise<void> {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    // 1. Olayın daha önce işlenip işlenmediğini kontrol et
    const existing = await client.query(
      'SELECT id FROM billing_webhook_events WHERE id = $1 FOR UPDATE',
      [event.id]
    );

    if (existing.rows.length > 0) {
      console.log(`Olay ${event.id} zaten işlendi. Atlanıyor.`);
      await client.query('ROLLBACK');
      return;
    }

    // 2. Olay kimliğini kayıt defterine ekle
    await client.query(
      'INSERT INTO billing_webhook_events (id, event_type, payload) VALUES ($1, $2, $3)',
      [event.id, event.type, JSON.stringify(event)]
    );

    // 3. Olay türüne göre ilgili iş mantığını yürüt
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
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleFailedPayment(client, invoice);
        break;
      }
      default:
        console.log(`İşlenmeyen webhook olay türü: ${event.type}`);
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

## 5. Abonelik Durumunu ve Yetkileri Senkronize Etme

Abonelik güncellendiğinde ham Stripe verisini alan adı seviyesindeki plan tanımlarına dönüştürmeli ve hızlı erişim kontrolü için Redis'e önbelleğe almalıyız:

```typescript
import { PoolClient } from 'pg';
import Stripe from 'stripe';
import { redisClient } from './redis';

const PRICE_TIER_MAP: Record<string, string> = {
  'price_pro_monthly': 'pro',
  'price_pro_yearly': 'pro',
  'price_enterprise_monthly': 'enterprise',
};

async function syncSubscriptionState(client: PoolClient, sub: Stripe.Subscription): Promise<void> {
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
  const priceId = sub.items.data[0]?.price.id;
  const tier = PRICE_TIER_MAP[priceId] || 'free';

  // Veritabanını güncelle
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
    [
      sub.id,
      priceId,
      tier,
      sub.status,
      sub.current_period_start,
      sub.current_period_end,
      sub.cancel_at_period_end,
      customerId,
    ]
  );

  if (result.rows.length === 0) {
    throw new Error(`Stripe müşterisi ${customerId} için kiracı bulunamadı`);
  }

  const tenantId = result.rows[0].tenant_id;

  // Hızlı Redis yetki önbelleğini yenile
  const cacheKey = `entitlements:tenant:${tenantId}`;
  const entitlementData = {
    tier,
    status: sub.status,
    canAccessAI: tier === 'pro' || tier === 'enterprise',
    seatLimit: tier === 'enterprise' ? 100 : tier === 'pro' ? 10 : 1,
    currentPeriodEnd: sub.current_period_end,
  };

  await redisClient.set(cacheKey, JSON.stringify(entitlementData), 'EX', 86400); // 24 saat TTL
}
```

---

## 6. Orantılı Ücretlendirme (Proration) ve Plan Yükseltmeleri

Müşteriler fatura dönemi ortasında plan değiştirdiğinde Stripe varsayılan olarak proration hesaplaması yapar:

1. **Anında Faturalandırma (`proration_behavior: 'always_invoice'`):**
   - Plan yükseltmeleri için idealdir (örn. Starter'dan Pro'ya geçiş).
   - Dönemin geri kalanı için oluşan farkı anında faturalandırıp tahsil eder.
   - Yeni özellikler hemen aktif hale gelir.
2. **Dönem Sonu Proration (`proration_behavior: 'create_prorations'`):**
   - Oluşan fark tutarı müşterinin bir sonraki faturasına alacak veya borç olarak yansıtılır.
   - Küçük mikro ödeme işlemlerini önler.
3. **Proration Yok (`proration_behavior: 'none'`):**
   - Değişikliğin tam olarak bir sonraki fatura döneminin başında devreye girmesi istendiğinde kullanılır.

```typescript
// Örnek: Anında faturalandırma ile kiracının aboneliğini yükseltme
export async function upgradeSubscription(
  subscriptionId: string,
  newPriceId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  return await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: 'always_invoice',
    payment_behavior: 'error_if_incomplete',
  });
}
```

---

## 7. Başarısız Ödemeleri Yönetme ve Dunning Süreçleri

Süresi dolan kartlar ve banka kısıtlamaları nedeniyle başarısız yenilemeler kaçınılmazdır. Doğru yönetilmeyen bir `invoice.payment_failed` olayı hatalı erişim engellemelerine yol açabilir:

1. **Stripe Akıllı Yeniden Denemeleri (Smart Retries) Kullanın:** Stripe paneli üzerinden makine öğrenimi destekli yeniden deneme planlayıcısını aktif edin.
2. **Tahsilat E-posta Akışları (Dunning):** `invoice.payment_action_required` veya `customer.subscription.updated` webhook olaylarını dinleyerek müşteriye Müşteri Portalı bağlantısı içeren bildirimler gönderin.
3. **Tolerans Süreleri (Grace Periods):** Kiracının temel akışlarını engellemeden `status: 'past_due'` durumunu 7-14 gün koruyun. Yalnızca durum `unpaid` veya `canceled` olduğunda hesap kısıtlamasına gidin.

---

## 8. Sık Yapılan Mimari Hatalar

- **Kart Bilgilerini Saklamak:** Kart numaralarını veya güvenlik kodlarını asla sunucularınızda tutmayın. Yalnızca belirteçleştirilmiş ödeme yöntemlerini kullanın.
- **Senkron Yetkilendirme:** Ödeme yönlendirme sayfasında anında hesap açmayın veya özellikleri açmayın. Kullanıcı ödeme yaptıktan sonra yönlendirme gerçekleşmeden tarayıcıyı kapatabilir.
- **Webhook'larda Ham Gövdeyi Kaybetmek:** Standart `express.json()` ara katmanları ham yükü değiştirdiğinden imza doğrulaması başarısız olur. Webhook yollarında daima `express.raw({ type: 'application/json' })` kullanın.
- **Sunucu Saat Sapmaları:** İmza kontrollerinde zaman damgası hatalarını önlemek için sunucu saatlerinizin NTP ile senkronize olduğundan emin olun.

---

## Sonuç ve İleri Okuma

Üretime hazır bir abonelik faturalandırma sistemi, temelde dağıtık sınırlar arasında bir durum senkronizasyonu problemidir. Kriptografik imza doğrulaması uygulayarak, tekrarlanabilirlik kayıt defteri tutarak ve yetkileri doğrudan sağlayıcı fiyat kodlarından ayırarak SaaS platformunuz güvenle ölçeklenecektir.

### İlgili Mimari Rehberleri
- Çok kiracılı veritabanı bölümleme stratejileri için [Çok Kiracılı SaaS Mimari Desenleri](/blog/multi-tenant-saas-architecture-patterns) rehberimizi inceleyin.
- API'lerinizi aşırı yükten korumak için [API Hız Sınırlama ve Kısıtlama Stratejileri](/blog/api-rate-limiting-throttling-strategies) makalesine göz atın.
