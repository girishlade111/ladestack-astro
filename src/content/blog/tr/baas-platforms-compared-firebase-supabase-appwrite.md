---
title: "BaaS Platformları Karşılaştırması: Firebase, Supabase ve Appwrite Mimari Analizi"
description: "Firebase, Supabase ve Appwrite arasında tarafsız mimari karşılaştırma: veri modelleri, güvenlik ve RLS, gerçek zamanlı protokoller, edge fonksiyonları, self-hosting olanakları ve vendor lock-in dengeleri."
locale: "tr"
slug: "baas-platforms-compared-firebase-supabase-appwrite"
translationKey: "baas-platforms-compared-firebase-supabase-appwrite"
author: "Girish Lade"
publishedAt: "2024-08-12"
updatedAt: "2026-10-24"
category: "Backend as a Service"
tags: ["BaaS", "Firebase", "Supabase", "Appwrite", "PostgreSQL", "Mimari"]
coverImage: "/blog-covers/cloud-security.svg"
coverAlt: "Firebase, Supabase ve Appwrite Mimari Karşılaştırması"
draft: false
featured: false
contentType: "guide"
---

## Giriş: Backend-as-a-Service Platformlarının Evrimi

Backend-as-a-Service (BaaS) platformları, basit mobil veritabanı senkronizasyon araçlarından kapsamlı uygulama altyapılarına dönüştü. Kimlik doğrulama, veritabanı barındırma, istemci taraflı yetkilendirme, nesne depolama ve sunucusuz hesaplama (serverless compute) gibi rutin altyapı ihtiyaçlarını soyutlayarak mühendislik ekiplerinin doğrudan iş mantığına odaklanmasını sağlarlar.

Bununla birlikte, bir BaaS motoru seçmek temel bir mimari taahhüttür. İlerleyen aşamalarda uygun olmayan bir platformdan geçiş yapmak, istemci kodunda, güvenlik kurallarında ve veri şemalarında kapsamlı bir yeniden yazım gerektirir. Günümüzde öne çıkan üç ana seçenek belirgin şekilde farklı felsefeleri temsil etmektedir:

1. **Google Firebase:** Google Cloud Platform'un (GCP) tescilli sunucusuz ekosistemine sıkı sıkıya bağlı, yönetilen bulut BaaS öncüsü.
2. **Supabase:** Tamamen ilişkisel PostgreSQL üzerine kurulu, açık kaynak standartlarını kullanan "açık kaynaklı Firebase alternatifi".
3. **Appwrite:** Modülerlik, dilden bağımsız SDK'lar ve tam altyapı sahipliği (self-hosting) için tasarlanmış konteyner tabanlı açık kaynaklı BaaS.

Bu rehber; veri modelleme, yetkilendirme, gerçek zamanlı iletişim, sunucusuz işlevler, geliştirici deneyimi ve sağlayıcıya bağımlılık (vendor lock-in) olmak üzere altı kritik boyutta nesnel bir mimari karşılaştırma sunar.

---

## 1. Mimari Genel Bakış ve Platform Felsefeleri

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            BAAS EKOSİSTEMİ                                  │
├─────────────────────┬───────────────────────────┬───────────────────────────┤
│   Google Firebase   │         Supabase          │         Appwrite          │
├─────────────────────┼───────────────────────────┼───────────────────────────┤
│ • Tescilli Bulut    │ • Açık Kaynak Çekirdek    │ • Açık Kaynak Çekirdek    │
│ • NoSQL Belge       │ • İlişkisel PostgreSQL    │ • Belge / Anahtar-Değer   │
│ • Tam Yönetilen     │ • Bulut ve Self-Hostable  │ • Docker Konteyner        │
│ • GCP Ekosistemi    │ • SQL ve Eklentiler(pg_*) │ • Bağımsız Altyapı        │
└─────────────────────┴───────────────────────────┴───────────────────────────┘
```

### Firebase: Tam Yönetilen Bulut Ekosistemi
Firebase, Google Cloud altyapısı üzerinde çalışan optimize edilmiş bir katmandır. Sıfır operasyonel yönetim (Zero-Ops) ile ölçeklenebilirliği hedefler: sunucu yapılandırması, bağlantı havuzu yönetimi veya disk boyutu artırma gibi işlemlerle uğraşmazsınız. Bunun karşılığında veritabanları (Cloud Firestore ve Realtime Database) kapalı kaynaklı sistemlerdir.

### Supabase: Açık Kaynak PostgreSQL ile İlişkisel Güvenilirlik
Supabase tescilli veri motorlarını reddeder. Her Supabase projesi, süper kullanıcı yetkilerine sahip tam bir PostgreSQL veritabanıdır. Otomatik REST API üretimi için PostgREST, kimlik doğrulama için GoTrue ve WebSockets yayını için Realtime ile birlikte gelir. SQL biliyorsanız, Supabase'i zaten biliyorsunuzdur.

### Appwrite: Konteynerleştirilmiş Modülerlik ve Bağımsız Barındırma
Appwrite, Docker'ın çalıştığı her yerde sorunsuz çalışacak şekilde tasarlanmıştır. Kimlik doğrulama, veritabanı, depolama ve fonksiyon çalıştırma ortamlarını Docker Compose ile orkestre edilen mikroservisler kümesi olarak paketler. Kendi sunucunuzda barındırma (self-hosting) birinci sınıf bir vatandaş olarak ele alınır ve katı veri yerelliği mevzuatlarına (KVKK, GDPR) tabi kurumlar için idealdir.

---

## 2. Veri Modelleri ve Sorgulama Yetenekleri

Platformlar arasındaki en belirleyici mimari fark verinin nasıl yapılandırıldığı ve sorgulandığıdır:

| Boyut | Firebase (Firestore) | Supabase | Appwrite |
|:---|:---|:---|:---|
| **Altyapı Motoru** | Cloud Firestore (NoSQL) | PostgreSQL (İlişkisel) | MariaDB / Redis / Özel |
| **Veri Yapısı** | Koleksiyonlar ve Belgeler | Tablolar, Satırlar, İlişkiler | Veritabanları, Koleksiyonlar, Belgeler |
| **Join Desteği** | Yok (Denormalizasyon gerekir) | Tam İlişkisel SQL (`JOIN`) | Dahili İlişkiler (Relationships) |
| **İndeksleme** | Otomatik bileşik indeksler | PostgreSQL B-Tree, GIN, GiST | Manuel indeks oluşturma |
| **Sorgu Esnekliği** | Katı indeks kuralları | Serbest SQL, CTE, Agregasyonlar | Yapılandırılmış Sorgu API (`Query.equal`) |

### Uygulamada Sorgu Örnekleri

#### Firestore (NoSQL Belge Arama)
Firestore sorguları sıkı indeks kurallarına uymak zorundadır. Tek bir sorguda birden fazla alanda eşitsizlik filtreleri çalıştırmak için konsoldan bileşik indeks oluşturulmalıdır:

```typescript
import { collection, query, where, getDocs } from 'firebase/firestore';

// Firebase Konsolunda oluşturulmuş bileşik indeks gerektirir
const q = query(
  collection(db, 'invoices'),
  where('tenantId', '==', 'tenant_123'),
  where('status', '==', 'unpaid')
);

const snapshot = await getDocs(q);
const invoices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
```

#### Supabase (İlişkisel SQL ve PostgREST İstemcisi)
Supabase, ilişkisel modelin tüm gücünü tek bir ağ isteğinde sunar:

```typescript
import { supabase } from './supabaseClient';

// İlişkisel birleştirme: kiracı faturalarını müşteri iletişim bilgileriyle birlikte çekme
const { data, error } = await supabase
  .from('invoices')
  .select(`
    id,
    amount_cents,
    status,
    customers (
      name,
      email
    )
  `)
  .eq('tenant_id', 'tenant_123')
  .eq('status', 'unpaid');
```

#### Appwrite (Yapılandırılmış Belge Sorgu Motoru)
Appwrite, belge koleksiyonları üzerinde çalışan programatik bir sorgu oluşturucu sunar:

```typescript
import { Client, Databases, Query } from 'appwrite';

const databases = new Databases(client);

const response = await databases.listDocuments(
  'production_db',
  'invoices_col',
  [
    Query.equal('tenantId', 'tenant_123'),
    Query.equal('status', 'unpaid'),
    Query.limit(50)
  ]
);
```

---

## 3. Güvenlik ve Erişim Kontrol Modelleri

İstemci uygulamaları sıklıkla doğrudan BaaS veritabanıyla iletişim kurduğundan yetkilendirme kuralları temel güvenlik sınırınızdır.

### Firebase: Bildirimsel Güvenlik Kuralları (Security Rules)
Firestore, Google sunucularında yürütülen özel bir etki alanına özgü dil (DSL) kullanır:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /invoices/{invoiceId} {
      // Kimlik doğrulama belirteciyle kiracı izolasyonu sağlama
      allow read, write: if request.auth != null 
        && request.auth.token.tenant_id == resource.data.tenantId;
    }
  }
}
```

### Supabase: PostgreSQL Satır Düzeyinde Güvenlik (Row-Level Security - RLS)
Supabase yetkilendirmeyi doğrudan PostgreSQL çekirdeğine devreder:

```sql
-- Satır düzeyinde güvenliği etkinleştir
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- JWT oturum bağlamı kullanarak kiracı izolasyon ilkesi oluştur
CREATE POLICY tenant_isolation_policy ON invoices
  FOR ALL
  USING (
    tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::uuid
  );
```
*Avantaj:* Kurallar standart SQL politikalarıdır. İstemci SDK'lerinden, arka uç mikroservislerinden veya doğrudan `psql` bağlantılarından yapılan tüm sorgularda tutarlı bir şekilde çalışır.

### Appwrite: İzin Dizileri ve Roller
Appwrite, doğrudan belgelere eklenen sezgisel bir izin dizisi modeli uygular:

```typescript
import { Permission, Role } from 'appwrite';

await databases.createDocument(
  'production_db',
  'invoices_col',
  'unique()',
  { tenantId: 'tenant_123', amount: 5000 },
  [
    Permission.read(Role.team('team_123', 'admin')),
    Permission.update(Role.team('team_123', 'finance')),
    Permission.delete(Role.team('team_123', 'owner')),
  ]
);
```

---

## 4. Gerçek Zamanlı Veri Senkronizasyonu Mimarisi

Her platform verileri istemcilere iletmek için farklı bir protokol kullanır:

```
[Firebase] İstemci ◄──── Çift Yönlü Kalıcı Akış (gRPC) ─────► [Firestore Motoru]
[Supabase] İstemci ◄──── WebSocket (wal2json / pgoutput) ───► [PostgreSQL WAL Motoru]
[Appwrite] İstemci ◄──── WebSocket (Redis Pub/Sub) ─────────► [Appwrite Realtime Ağ Geçidi]
```

1. **Firebase:** Optimize edilmiş anlık görüntü dinleyicileri (snapshot listeners). Bir belge değiştiğinde Firestore motoru istemci tarafı farkları hesaplar ve açık kanal üzerinden iletir. Mobil cihazlarda düşük gecikme sunar.
2. **Supabase Realtime:** `pgoutput` mantıksal kod çözme eklentisi ile PostgreSQL'in Write-Ahead Log (WAL) mekanizmasını dinler. Veritabanında onaylanan işlemler Phoenix Channels (Elixir WebSockets) aracılığıyla istemcilere yayınlanır.
3. **Appwrite Realtime:** WebSocket çalışanlarına bağlı dahili bir Redis Pub/Sub kümesi kullanır. Başarılı olan API mutasyonları anında abonelere iletilir.

---

## 5. Sunucusuz Hesaplama ve Edge Fonksiyonları

Özel iş kuralları (ödeme işleme, harici API çağrıları vb.) izole sunucusuz hesaplama ortamları gerektirir:

- **Firebase Cloud Functions:** Google Cloud Functions altyapısında çalışır (Node.js, Python). Olay tetikleyicileriyle (`onDocumentWritten`, `onUserCreated`) entegredir. İkinci nesil Cloud Run altyapısı eşzamanlılığı artırır.
- **Supabase Edge Functions:** Global uç ağında çalışan Deno motoru tarafından desteklenir. 50 ms altı soğuk başlatma süresi, derleme adımı gerektirmeyen TypeScript desteği ve standart Web API'leri (`fetch`, `Request`) sunar.
- **Appwrite Functions:** 15'ten fazla çalışma zamanını (Node.js, Python, PHP, Ruby, Dart, Go, Rust, Swift) destekleyen yalıtılmış Docker konteynerlerinde çalışır ve özel sistem kütüphanelerine izin verir.

---

## 6. Self-Hosting, Taşınabilirlik ve Sağlayıcı Bağımlılığı (Vendor Lock-in)

| Kriter | Google Firebase | Supabase | Appwrite |
|:---|:---|:---|:---|
| **Self-Hosting Olanakları** | İmkansız (Tescilli GCP) | Yüksek (Resmi Docker Compose / K8s) | Birinci Sınıf (Tek komutla Docker kurulumu) |
| **Veri Taşınabilirliği** | `gcloud` ile JSON dışa aktarma | Standart `pg_dump` ve `psql` | MariaDB dump veya Appwrite CLI aktarımı |
| **Geçiş Maliyeti** | **Yüksek:** Şemaları ve kuralları yeniden yazma | **Düşük:** Standart PostgreSQL | **Orta:** Belge JSON dışa aktarımı |
| **Yerel Emülasyon** | Firebase Local Emulator Suite | Supabase CLI (Docker ile yerel Postgres) | Yerel Appwrite konteyner kümesi |

Veri egemenliği ve yerel mevzuat uyumu gerektiren durumlarda **Supabase** veya **Appwrite** kesin tercihtir. Supabase ile buluttan ayrılsanız bile AWS RDS veya özel sunucularda çalışabilecek standart bir PostgreSQL veritabanına sahip olursunuz.

---

## 7. Mimari Karar Matrisi

```
                      SQL ve İlişkisel Bir Veritabanına
                              İhtiyacınız Var mı?
                                      │
                       ┌──────────────┴──────────────┐
                       │ EVET                        │ HAYIR
                       ▼                             ▼
              [Supabase Seçin]             Self-Hosting Zorunlu
                                              bir Gereklilik mi?
                                                     │
                                      ┌──────────────┴──────────────┐
                                      │ EVET                        │ HAYIR
                                      ▼                             ▼
                              [Appwrite Seçin]              [Firebase Seçin]
```

### Özet Tavsiyeler
- **Supabase'i Seçin:** İlişkisel bütünlük, karmaşık SQL sorguları ve `pgvector` gibi eklentilerden yararlanan bir B2B SaaS veya finansal sistem geliştiriyorsanız.
- **Firebase'i Seçin:** Hızlıca bir mobil uygulama veya MVP geliştiriyorsanız, sıfır sunucu yönetimi istiyorsanız ve Google ekosistemiyle (Analytics, Crashlytics) tam entegrasyon hedefliyorsanız.
- **Appwrite'ı Seçin:** Verilerinizin tam kontrolünü elde tutmak, kendi altyapınızda barındırmak ve SQL yönetimi yerine sezgisel bir REST/WebSocket API'si tercih ediyorsanız.

---

## Sonuç ve İleri Okuma

BaaS platformları artık yalnızca prototip araçları değil, yüksek ölçekli sistemlere güç veren üretim bileşenleridir. Veri modelleme ve yetkilendirme sınırlarını erken planlamak maliyetli mimari dönüşümlerin önüne geçer.

### İlgili Mimari Rehberleri
- Edge bilişim ve sunucusuz tetikleyiciler için [BaaS ile Sunucusuz Backend Sistemleri Oluşturma](/blog/building-serverless-backends-with-baas) rehberini inceleyin.
- Gerçek zamanlı veri senkronizasyonu için [Backend Servisleri ile Gerçek Zamanlı Veri Senkronizasyonu](/blog/real-time-data-sync-backend-services) makalesine göz atın.
