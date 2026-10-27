---
title: "Mikroservisler İçin API Ağ Geçidi (API Gateway) Mimarisi: Yönlendirme, Kimlik Doğrulama, Hız Sınırlama ve Dayanıklılık"
description: "Ters proxy, dağıtık kimlik doğrulama, Redis belirteç kovası hız sınırlaması, devre kesiciler ve Envoy yapılandırması ile üretim düzeyinde API Gateway rehberi."
locale: "tr"
slug: "building-api-gateways-microservices"
translationKey: "building-api-gateways-microservices"
author: "Girish Lade"
publishedAt: "2024-09-15"
updatedAt: "2026-10-24"
category: "Microservices"
tags: ["API Gateway", "Microservices", "Envoy", "Redis", "Security", "Architecture", "DevOps"]
coverImage: "/blog-covers/api-architecture.svg"
coverAlt: "Mikroservisler için API Gateway Mimari Şeması"
draft: false
featured: false
contentType: "architecture"
---

## 1. Giriş: Mikroservis Mimarilerinde Neden API Gateway Gereklidir?

Dağıtık mikroservis mimarilerinde istemci uygulamalarının (web tarayıcıları, mobil uygulamalar veya üçüncü taraf entegrasyonlar) doğrudan onlarca iç mikroservisle iletişim kurması ciddi bir anti-paterndir.

Doğrudan erişim yaklaşımı aşağıdaki kritik sorunlara yol açar:
- **İstemci ve İç Servisler Arasında Sıkı Bağlantı (Tight Coupling):** Herhangi bir servisin bölünmesi veya rota değişikliği tüm istemci uygulamalarının yeniden dağıtılmasını gerektirir.
- **Saldırı Yüzeyinin Genişlemesi:** Tüm mikroservislerin internete açılması; güvenlik duvarı kurallarının, CORS yapılandırmalarının ve TLS sertifikalarının parçalanmasına neden olur.
- **Yinelenen Çapraz Mantık (Cross-Cutting Concerns):** Her ekip kimlik doğrulama, hız sınırlama ve loglama mekanizmalarını baştan yazar, bu da güvenlik açıklarına zemin hazırlar.
- **Yüksek Ağ Gecikmesi:** Mobil bir istemcinin tek bir arayüzü çizmek için 10'dan fazla HTTP isteğini seri olarak yapması gerekir.

```
Doğrudan Erişim vs API Gateway Modeli
=====================================
Doğrudan Erişim Modeli (Anti-Pattern):
[Mobil İstemci] ──┬──► [Kimlik Doğrulama Servisi :8081]
                  ├──► [Sipariş Servisi :8082]
                  ├──► [Ödeme Servisi :8083]
                  └──► [Stok Servisi :8084]

API Gateway Modeli (Önerilen Model):
                  ┌────────────────────────────────────────────────────────┐
                  │                 API Gateway (:443)                     │
                  │  - SSL Sonlandırma & CORS Politikaları                 │
                  │  - JWT Doğrulama & İstemci Bağlamının Yayılması        │
                  │  - Redis Tabanlı Dağıtık Belirteç Kovası Hız Sınırı    │
                  │  - Akıllı Yönlendirme, Zaman Aşımları & Devre Kesici   │
                  └──────────────────────────┬─────────────────────────────┘
                                             │ Özel VPC Ağı (mTLS)
                        ┌────────────────────┼────────────────────┐
                        ▼                    ▼                    ▼
                [Kimlik Servisi]     [Sipariş Servisi]     [Ödeme Servisi]
```

API Gateway, sistem sınırında tek bir giriş noktası (ters proxy) olarak görev yapar ve çapraz işlevleri merkezileştirir.

---

## 2. Üretim Düzeyinde API Gateway Çekirdek Yetenekleri

Dayanıklı bir API Gateway aşağıdaki temel işlev katmanlarını milisaniyenin altında gecikmeyle yerine getirmelidir:

| İşlev Katmanı | Ağ Geçidinin Sorumluluğu | Mekanizma ve Protokoller |
| :--- | :--- | :--- |
| **Ters Proxy & Dinamik Yönlendirme** | Dış istek yollarını iç mikroservis adreslerine dönüştürme | Yol öneki eşleme, regex yönlendirme, kanarya ağırlıkları |
| **Uç Nokta Kimlik Doğrulama** | İsteklerin kriptografik imzalarını doğrulama | JWT RS256/EdDSA doğrulaması, JWKS anahtar rotasyonu, mTLS |
| **Trafik Yönetimi & Hız Sınırlama** | DoS saldırılarını önleme ve kiracı kotalarını uygulama | Redis dağıtık token bucket (belirteç kovası) algoritması |
| **Dayanıklılık (Resilience)** | Basamaklı sistem çökmelerini engelleme | İstek zaman aşımları, üstel geri çekilme (backoff) ile yeniden deneme, devre kesici |
| **Dağıtık İzleme (Observability)** | Uçtan uca işlem izlenebilirliği sağlama | W3C TraceContext standardı (`traceparent`), OpenTelemetry |
| **Protokol Dönüşümü** | Dış ve iç protokollerin ayrıştırılması | Dış HTTP/1.1・HTTP/2 trafiğini iç yüksek performanslı gRPC/Protobuf'a dönüştürme |

---

## 3. Kimlik Doğrulama ve Derinlemesine Savunma (Defense in Depth)

### Temel Kural: Ağ Geçidinde Doğrulama, İç Yetkilendirmenin Yerini Alamaz
Birçok mühendislik ekibi, "İstek API Gateway üzerinde JWT doğrulamasından geçtiğine göre, iç servislerin yetki kontrolü yapmasına gerek yoktur" yanılgısına düşer.

Ağ geçidinin güvenliği aşıldığında veya iç ağ üzerinden doğrudan bir servis çağrıldığında sistem savunmasız kalır. **Derinlemesine Savunma (Defense in Depth)** ilkesi uygulanmalıdır:

```
Derinlemesine Savunma Akışı
---------------------------
[İstemci]
   │ 1. Authorization: Bearer <JWT>
   ▼
[API Gateway]
   │ 2. Yerel önbellekteki JWKS açık anahtarlarıyla JWT imzasını doğrular
   │ 3. Süre (exp) ve yayıncı (iss) denetimi yapar; geçersizse 401 Unauthorized döner
   │ 4. Doğrulanmış talepleri güvenilir iç başlıklara dönüştürür:
   │    - X-User-Id: 98412
   │    - X-User-Roles: billing_admin,user
   │    - X-Tenant-Id: tenant_corp_a
   ▼
[İç Mikroservis (Sipariş/Ödeme)]
   │ 5. mTLS ile bağlantının ağ geçidinden geldiğini teyit eder
   │ 6. X-User-Roles başlığına göre iş mantığı yetkilendirmesini (Authorization) yapar
   │ 7. Çekirdek işlemi gerçekleştirir
```

---

## 4. Dağıtık Hız Sınırlama: Redis Token Bucket Algoritması

Sunucu hafızasında tutulan yerel sayaçlar, yatay olarak ölçeklenen konteyner kümelerinde işlevini yitirir. 10 yeni pod ayağa kalktığında izin verilen toplam istek limiti 10 katına çıkar.

Redis ve atomik Lua betikleri ile küme genelinde tutarlı token bucket algoritması uygulanır:

```lua
-- Redis Token Bucket Rate Limiting (Atomik Lua Betiği)
-- KEYS[1]: Hız sınırı anahtarı (örn: ratelimit:tenant_123:orders)
-- ARGV[1]: Maksimum kova kapasitesi (Max Burst)
-- ARGV[2]: Belirteç yenilenme hızı (Belirteç / Saniye)
-- ARGV[3]: Geçerli Unix zaman damgası (saniye)
-- ARGV[4]: İstenen belirteç adedi (genellikle 1)

local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local fill_rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local requested = tonumber(ARGV[4])

local data = redis.call('HMGET', key, 'tokens', 'last_updated')
local tokens = tonumber(data[1])
local last_updated = tonumber(data[2])

if not tokens then
    tokens = capacity
    last_updated = now
else
    local elapsed = math.max(0, now - last_updated)
    tokens = math.min(capacity, tokens + (elapsed * fill_rate))
    last_updated = now
end

if tokens >= requested then
    tokens = tokens - requested
    redis.call('HMSET', key, 'tokens', tokens, 'last_updated', last_updated)
    redis.call('EXPIRE', key, math.ceil(capacity / fill_rate) * 2)
    return {1, math.floor(tokens)} -- 1 = İzin verildi
else
    redis.call('HMSET', key, 'tokens', tokens, 'last_updated', last_updated)
    return {0, 0} -- 0 = Reddedildi (429 Too Many Requests)
end
```

---

## 5. Dayanıklılık Desenleri: Zaman Aşımı, Yeniden Deneme ve Devre Kesici

1. **Zaman Aşımları (Timeouts):** Ağ geçidinin bekleme zaman aşımı süresi, her zaman iç servisin işlem süresinden kısa olmalıdır.
2. **Güvenli Yeniden Deneme (Idempotency):** Sadece GET, PUT ve DELETE gibi güvenli ve eşgüçlü (idempotent) HTTP istekleri yeniden denenmelidir. POST ödeme isteklerinin otomatik tekrarlanması mükerrer çekimlere neden olur.
3. **Devre Kesici (Circuit Breaker):** Bir iç servis sürekli 5xx hatası veriyorsa devre OPEN konumuna geçmeli ve istekler hemen sonlandırılarak sistem korunmalıdır.

---

## 6. Teknoloji Karşılaştırması: Envoy vs NGINX vs Kong

| Kriter | Envoy Proxy | NGINX (Open Source / Plus) | Kong Gateway |
| :--- | :--- | :--- | :--- |
| **Geliştirme Dili** | C++ (Düşük bellek gecikmesi) | C (Olay güdümlü mimari) | Lua / OpenResty (NGINX temelli) |
| **Yapılandırma** | xDS API ile kesintisiz dinamik yükleme | Dosya tabanlı (İşlem yeniden yükleme) | REST API ve decK araçları ile dinamik |
| **Protokoller** | HTTP/1.1, HTTP/2, HTTP/3, gRPC | HTTP/1.1, HTTP/2, gRPC vekil | HTTP/1.1, HTTP/2, gRPC |
| **Genişletilebilirlik**| WebAssembly (Wasm) filtreleri, C++ | C modülleri, njs | Lua eklentileri, Wasm |
| **Kullanım Alanı** | Bulut yerlisi, Kubernetes Ingress | Statik dosya dağıtımı, basit proxy | Kurumsal API yönetim platformu |

---

## 7. API Gateway ile Servis Ağı (Service Mesh) Farkı

- **API Gateway (Kuzey-Güney Trafiği):** Dış dünyadan altyapıya giren uç trafiğini yönetir. İstemci kimlik doğrulama, faturalandırma ve API sürümleme odaklıdır.
- **Service Mesh (Doğu-Batı Trafiği):** İç mikroservislerin birbiriyle iletişimini yönetir (örn. Istio, Linkerd). Otomatik mTLS şifreleme ve gelişmiş trafik yönlendirme sağlar.
