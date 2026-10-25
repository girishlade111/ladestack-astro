---
title: "OWASP Top 10: Modern Web Uygulamaları Güvenlik Açıkları ve Eksiksiz Azaltma Kılavuzu (2025 Sürümü)"
description: "Resmi OWASP Top 10:2025 kategorilerinin ayrıntılı mühendislik analizi: kök nedenler, kod düzeyinde azaltma önlemleri, yazılım tedarik zinciri güvenliği ve derinlemesine savunma mimarisi."
locale: "tr"
slug: "owasp-top-10-complete-mitigation-guide"
translationKey: "owasp-top-10-complete-mitigation-guide"
author: "Girish Lade"
publishedAt: "2024-11-17"
updatedAt: "2026-10-25"
category: "Security in Web Apps"
tags: ["AppSec", "OWASP", "Web Security", "Cybersecurity", "Authentication", "Input Validation", "DevSecOps"]
coverImage: "/blog-covers/web-security.svg"
coverAlt: "OWASP Top 10:2025 Web Uygulama Güvenliği Mimarisi"
draft: false
featured: false
contentType: "deep-dive"
---

## 1. Uyumluluk Kontrol Listesinin Ötesinde: Sistem Mimarisi Olarak Uygulama Güvenliği

**OWASP Top 10:2025**, modern web uygulamalarını, dağıtık API'leri ve bulut tabanlı sistemleri tehdit eden en kritik güvenlik risklerini tanımlayan en güncel uluslararası referans standardıdır. Ancak yazılım mühendisliği ekiplerinin düştüğü en yaygın yanılgı, OWASP Top 10'u yalnızca bir uyumluluk kontrol listesi olarak görmektir.

Otomatik bir zafiyet tarayıcısından temiz rapor almak veya on maddeyi işaretlemek bir uygulamanın güvenli olduğunu kanıtlamaz. OWASP Top 10, yüksek etkili mimari başarısızlık modellerinin dizinidir. Gerçek sistem güvenliği; **derinlemesine savunma (Defense-in-Depth)**, Güvenli Yazılım Geliştirme Yaşam Döngüsü (Secure SDLC), sürekli tehdit modellemesi ve teknoloji yığınının tüm sınırlarında sıkı girdi-çıktı doğrulaması gerektirir.

```
+--------------------------------------------------------------------------+
|                  Derinlemesine Savunma Katmanlı Mimarisi                 |
+------------------------------------+-------------------------------------+
                                     |
    Katman 1: Ağ ve Kenar            v
    [ WAF / DDoS Önleme / TLS 1.3 / Giriş Hız Sınırlaması ]
                                     |
    Katman 2: İletim ve Ağ Geçidi    v
    [ API Gateway / OAuth 2.0 & OIDC Doğrulama / Karşılıklı TLS (mTLS) ]
                                     |
    Katman 3: Uygulama ve Mantık     v
    [ Sıkı Girdi Doğrulama / Parametreli Sorgular / RBAC & ABAC Yetkilendirme ]
                                     |
    Katman 4: Veri ve Depolama       v
    [ Kolon Şifreleme / En Az Yetkili DB Rolleri / Cloud Vault Kasaları ]
```

---

## 2. Resmi OWASP Top 10:2025 Kategorileri ve Teknik Azaltma Yöntemleri

Aşağıdaki bölümlerde, **OWASP Top 10:2025** standardının tüm on resmi kategorisi (`A01:2025` - `A10:2025`) incelenmekte, kök neden analizleri, geliştirici odaklı kod örnekleri ve koruyucu mühendislik uygulamaları sunulmaktadır.

---

### A01:2025 – Broken Access Control (Bozuk Erişim Kontrolü)

Bozuk Erişim Kontrolü, 2025 standardında da 1 numaralı risk konumunu korumaktadır. Yetkilendirme ilkelerinin eksik olması, hatalı yapılandırılması veya istemci tarafı mantığına devredilmesi durumunda ortaya çıkar. Saldırganların yetkisiz verilere erişmesine veya ayrıcalıklı yönetimsel eylemleri yürütmesine olanak tanır. 2025 standardında, **Sunucu Tarafı İstek Sahteciliği (SSRF)**, iç ağlara ve bulut meta veri servislerine karşı bir erişim denetimi atlatma mekanizması olarak açıkça bu kategoriye dahil edilmiştir.

* **Tipik Kök Nedenler**:
  - Güvensiz Doğrudan Nesne Referansları (IDOR): İstemciden gelen varlık kimliklerine (ID) mülkiyet doğrulaması yapmadan güvenmek.
  - Eksik fonksiyonel erişim denetimi: Rol gereksinimlerini doğrulamadan yönetim uç noktalarını (`/admin/deleteUser`) dışarıya açık bırakmak.
  - SSRF tabanlı meta veri erişimi: Giden istekleri RFC 1918 özel IP bloklarına veya bulut örnek meta veri servisine (IMDS) kısıtlamadan rastgele kullanıcı URL'lerini çekmek.
* **Güvenli Mimari Çözümü**: Veri tabanı sorgulama katmanında uygulanan merkezi, politika tabanlı yetkilendirme kontrolleri (RBAC veya ABAC).

```typescript
// GÜVENLİ: Veritabanı sorgu katmanında kiracı sahipliğini zorunlu kılmak
async function getUserInvoice(invoiceId: string, authenticatedUserId: string, authenticatedTenantId: string) {
  // Asla yalnızca invoiceId ile sorgulama yapmayın; her zaman kiracı ve kullanıcı kimliğini bağlayın
  const invoice = await db.query(
    `SELECT id, amount, status, created_at 
     FROM invoices 
     WHERE id = $1 AND user_id = $2 AND tenant_id = $3`,
    [invoiceId, authenticatedUserId, authenticatedTenantId]
  );

  if (!invoice.rows.length) {
    throw new NotFoundOrForbiddenException('Kaynak mevcut değil veya erişim engellendi');
  }

  return invoice.rows[0];
}
```

---

### A02:2025 – Security Misconfiguration (Güvenlik Yanlış Yapılandırması)

2025 sürümünde 2. sıraya yükselen Güvenlik Yanlış Yapılandırması; çoklu bulut dağıtımlarının, konteyner çalışma zamanlarının ve mikroservis ağlarının karmaşıklığını yansıtmaktadır. Güvensiz varsayılan ayarlar veya eksik sıkılaştırma kritik güvenlik açıklarına yol açar.

* **Tipik Kök Nedenler**:
  - Üretim ortamı veritabanlarında veya ara katman yazılımlarında varsayılan parolaların değiştirilmemesi.
  - İç yığın izlerini (stack trace), veritabanı şema ayrıntılarını veya ortam değişkenlerini son kullanıcılara gösteren ayrıntılı hata mesajları.
  - Aşırı izinli bulut depolama demetleri, kök (root) kullanıcısı ile çalışan Kubernetes podları veya eksik HTTP güvenlik başlıkları.
* **Etkili Önlemler**:
  - Altyapı sıkılaştırmasını Kod Olarak Altyapı (Terraform, OpenTofu, Pulumi) ile otomatikleştirin.
  - Üretim derlemelerinden hata ayıklama uç noktalarını ve ayrıntılı hata yığınlarını temizleyin; hataları genel hata kimlikleriyle eşleştirin.
  - Kapsamlı HTTP güvenlik yanıt başlıkları uygulayın:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none';
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

---

### A03:2025 – Software Supply Chain Failures (Yazılım Tedarik Zinciri Hataları)

2025 standardında öne çıkan bu yeni kategori, önceki "Savunmasız ve Güncel Olmayan Bileşenler" kapsamını önemli ölçüde genişletmiştir. Tüm yazılım tedarik zinciri boyunca riskleri ele alır: zararlı paket enjeksiyonu, güvenliği ihlal edilmiş bağımlılıklar, zehirlenmiş derleme boru hatları (CI/CD), bağımlılık karışıklığı (dependency confusion) ve eser izlenebilirliği eksikliği.

* **Tipik Kök Nedenler**:
  - Halka açık depolardan (`npm`, `PyPI`) denetlenmemiş veya yazım hatası tuzağı (typosquatting) içeren paketlerin içe aktarılması.
  - Sabit olmayan, değişken dal referanslarından doğrudan kod çalıştıran CI/CD eylemleri (örn. tam commit SHA yerine `uses: actions/checkout@v4` kullanımı).
  - Otomatik Yazılım Malzeme Faturası (SBOM) oluşturma ve zafiyet takibi süreçlerinin bulunmaması.
* **Etkili Önlemler**:
  - Kriptografik olarak doğrulanmış paket kilit dosyalarını (`package-lock.json`, `pnpm-lock.yaml`) zorunlu tutun ve derleme sırasında sağlama toplamlarını (checksum) doğrulayın.
  - CI/CD hatlarında otomatik Yazılım Bileşimi Analizi (SCA) uygulayın (Trivy, Snyk, Dependabot).
  - Harici CI/CD eylemlerini tam 40 karakterlik commit SHA değerlerine sabitleyin.
  - Makine tarafından okunabilir SBOM'lar (CycloneDX veya SPDX) oluşturun ve sürüm çıktılarını Sigstore/Cosign ile kriptografik olarak imzalayın.

```yaml
# Tam commit SHA sabitlemesi ve güvenlik taraması içeren örnek GitHub Actions adımı
- name: Checkout Code
  uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11 # v4.1.1
- name: Run Trivy Vulnerability Scanner
  uses: aquasecurity/trivy-action@d43c1f16c00cfd3978dde6c07f4bbcf9eb6993ca
  with:
    scan-type: 'fs'
    ignore-unfixed: true
    severity: 'CRITICAL,HIGH'
```

---

### A04:2025 – Cryptographic Failures (Kriptografik Başarısızlıklar)

Kriptografik Başarısızlıklar; aktarım halindeki, beklemedeki veya işleme sırasındaki hassas verilerin uygun kriptografik ilkeller ve anahtar yönetimi mimarileriyle korunamamasını kapsar.

* **Tipik Kök Nedenler**:
  - Parolalar veya veri bütünlüğü doğrulaması için kullanım dışı bırakılmış zayıf özet algoritmaları (MD5, SHA1) kullanmak.
  - Güvensiz simetrik şifreleme modları tercih etmek (örn. kimlik doğrulamalı GCM modu yerine ECB modunda AES).
  - Şifreleme anahtarlarını kaynak kod depolarına gömmek veya açık metin gizli dizileri kaydetmek.
* **Etkili Önlemler**:
  - **Parolalar**: Yalnızca modern, belleğe duyarlı algoritmalarla özetleyin: Argon2id (tercih edilen), scrypt veya uygun maliyet faktörüne sahip bcrypt.
  - **Aktarımdaki Veri**: İleri gizlilik (forward secrecy) destekleyen TLS 1.3 zorunlu kılın; eski şifreleme paketlerini devre dışı bırakın.
  - **Durağan Veri**: AES-256-GCM veya ChaCha20-Poly1305 kullanın; zarf şifreleme anahtarlarını bulut KMS veya HashiCorp Vault ile yönetin ve düzenli olarak döndürün.

---

### A05:2025 – Injection (Enjeksiyon)

Enjeksiyon; güvenilmeyen kullanıcı verilerinin bir yürütme motoru (SQL, NoSQL, işletim sistemi komut kabuğu, LDAP, XPath veya GraphQL) tarafından komut veya sorgu olarak yorumlanmasıyla oluşur.

* **Tipik Kök Nedenler**:
  - SQL sorgu oluşturmada dize birleştirme (`"SELECT * FROM users WHERE name = '" + input + "'"`).
  - Temizlenmemiş kullanıcı girdilerini doğrudan sistem kabuk komutlarına aktarmak (`child_process.exec("ping " + host)`).
* **Etkili Önlemler**:
  - Yalnızca parametreli sorgular (Prepared Statements) veya tip güvenli ORM'ler kullanın.
  - Şema kütüphaneleri (Zod, JSON Schema) ile sıkı sınır girdi doğrulaması uygulayın.
  - Verileri HTML, JavaScript veya CSS bağlamlarında görüntülerken bağlama duyarlı çıktı kodlaması uygulayın.

```typescript
// GÜVENLİ: Parametreli SQL sorgusu ile komut enjeksiyonunu engelleme
const result = await pool.query(
  'SELECT id, email, role FROM users WHERE email = $1 AND active = $2',
  [sanitizedEmail, true]
);
```

---

### A06:2025 – Insecure Design (Güvensiz Tasarım)

Güvensiz Tasarım; güvenlik gereksinimleri toplama ve sistem tasarımı aşamalarında güvenlik göz ardı edildiği için basit hata düzeltmeleriyle çözülemeyen yapısal mimari ve iş mantığı kusurlarını ifade eder.

* **Tipik Kök Nedenler**:
  - Kısıtlanmamış iş akışları (hız sınırı olmayan parola sıfırlama veya OTP onay süreçleri).
  - İç ağ mikroservislerinin doğası gereği güvenilir olduğunu varsaymak (sıfır güven ilkelerinin göz ardı edilmesi).
  - Yüksek değerli işlemlerde (hediye kartı kullanımı, hesap oluşturma) otomasyon karşıtı kontrollerin eksikliği.
* **Etkili Önlemler**:
  - Mimari incelemeler sırasında **STRIDE tehdit modellemesi** (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) yürütün.
  - Güvenli varsayılanlar uygulayın: arıza durumunda kapanan (fail-closed) erişim politikaları ve hassas uç noktalarda zorunlu MFA.

---

### A07:2025 – Authentication Failures (Kimlik Doğrulama Hataları)

"Tanımlama ve Kimlik Doğrulama Hataları" başlığından sadeleştirilen bu kategori; kimlik doğrulama protokolü zayıflıklarına, oturum kaçırmaya ve kimlik bilgisi doğrulama açıklarına odaklanır.

* **Tipik Kök Nedenler**:
  - Karmaşıklık denetimi veya sızdırılmış parola doğrulaması (HaveIBeenPwned) olmadan zayıf veya varsayılan parolalara izin vermek.
  - Güvensiz oturum yönetimi: Tahmin edilebilir oturum belirteçleri, belirteç döndürme eksikliği veya çıkış yapıldığında oturumların geçersiz kılınmaması.
  - Yönetici hesaplarında Çok Faktörlü Kimlik Doğrulama (MFA) bulunmaması.
* **Etkili Önlemler**:
  - TOTP (RFC 6238) veya FIDO2/WebAuthn donanım anahtarları ile Çok Faktörlü Kimlik Doğrulamayı zorunlu kılın.
  - `HttpOnly; Secure; SameSite=Strict` çerezlerinde saklanan kriptografik olarak rastgele oturum belirteçleri (en az 128 bit entropi) oluşturun.
  - OAuth 2.0 / OpenID Connect uygulamalarında PKCE (`S256`) ile Yetkilendirme Kodu Akışını zorunlu tutun.

---

### A08:2025 – Software or Data Integrity Failures (Yazılım veya Veri Bütünlüğü Hataları)

Bu kategori; yazılım güncellemeleri, kritik veri hatları ve seri hale getirilmiş nesneler üzerinde bütünlük doğrulaması yapılmadan yapılan varsayımlara odaklanır.

* **Tipik Kök Nedenler**:
  - Güvensiz deserialization: Güvenilmeyen ağ kaynaklarından ham seri hale getirilmiş nesneleri kabul edip çalıştırmak.
  - Şifrelenmemiş HTTP üzerinden ikili dosyalar indiren veya dijital imzaları doğrulamayan otomatik güncelleme mekanizmaları.
  - İmzasız JSON Web Belirteçlerinin (`alg: "none"`) kabul edilmesi veya algoritma karışıklığı saldırılarına açık olunması (RS256 vs HS256).
* **Etkili Önlemler**:
  - Güvenilmeyen verilerin ham ikili seriden çıkarılmasını yasaklayın; şema doğrulamalı katı JSON ayrıştırma kullanın.
  - Harici ikili dosyaların ve konteyner görüntülerinin yürütülmesinden önce dijital imzalarını ve özetlerini doğrulayın.
  - JWT doğrulama kütüphanelerinde açık algoritmik beyaz listeler uygulayın.

---

### A09:2025 – Security Logging and Alerting Failures (Güvenlik Günlüğü ve Uyarı Hataları)

2025 standardında yeniden adlandırılan bu kategori, **proaktif ve eyleme dönüştürülebilir uyarılar** olmadan yalnızca günlük tutmanın veri ihlallerini önleyemeyeceğini vurgular. Güvenlik olayları izlenmeyen dosyalara kaydedildiği için ihlaller genellikle aylarca fark edilmez.

* **Tipik Kök Nedenler**:
  - Yüksek riskli güvenlik olaylarının (başarısız girişler, yetkilendirme retleri, yetki yükseltmeleri) kaydedilmemesi.
  - Hassas kimlik bilgilerinin (açık metin parolalar, oturum belirteçleri, ödeme bilgileri) uygulama günlüklerine yazılması.
  - Günlüklerin, saldırganların adli bilişim kanıtlarını silebileceği yerel web sunucusu disklerinde saklanması.
* **Etkili Önlemler**:
  - Zaman damgası, olay türü, aktör kimliği, istemci IP'si ve korelasyon izleme kimliğini içeren yapılandırılmış JSON denetim günlükleri tutun.
  - Günlükleri kurcalamaya dayanıklı merkezi bir SIEM sistemine (Elasticsearch, Splunk, Datadog) gerçek zamanlı aktarın.
  - Şüpheli etkinliklerde (örn. bir IP bloğundan 60 saniye içinde > 10 başarısız giriş) otomatik gerçek zamanlı alarmlar yapılandırın.

---

### A10:2025 – Mishandling of Exceptional Conditions (İstisnai Durumların Hatalı Yönetimi)

OWASP Top 10:2025 standardında sunulan kritik yeni kategori (önceki SSRF kategorisinin Bozuk Erişim Kontrolü'ne dahil edilmesiyle 10. sıraya yerleşmiştir). Hata yönetimi hatalarından, işlenmeyen istisnalardan, beklenmeyen sınır koşullarından ve başarısızlık durumunda korumasız açılma (fail-open) hallerinden kaynaklanan zafiyetleri ele alır.

* **Tipik Kök Nedenler**:
  - **Açık Bırakan Güvenlik Durumları (Fail-Open)**: Bir kimlik doğrulama veya yetkilendirme filtresi beklenmeyen bir girdi (örneğin null işaretçi veya bozuk belirteç) aldığında çökerek güvenlik kontrollerini atlatır ve isteğin geçmesine izin verir.
  - **Yarış Durumları (Race Conditions) & Durum Senkronizasyon Bozuklukları**: Kontrol anı ile kullanım anı (TOCTOU) pencerelerini istismar ederek bakiye kopyalamaya veya hız sınırlarını aşmaya çalışan eşzamanlı istekler.
  - **Kaynak Tüketimi (Resource Exhaustion)**: Sınırsız işlemlerde bellek, CPU veya bağlantı zaman aşımlarının bulunmaması nedeniyle oluşan hizmet engelleme (DoS) durumları.
* **Etkili Önlemler**:
  - **Kapalı Kalan Mimari (Fail-Closed Architecture)**: İşlenmeyen herhangi bir istisna veya filtre çökmesinin isteği iletmek yerine anında erişim reddi (HTTP 500/403) ile sonuçlanmasını sağlayın.
  - Durum geçişleri sırasında eşzamanlılık yarış durumlarını önlemek için veritabanı düzeyinde satır kilitleme (`SELECT FOR UPDATE`) veya dağıtık kilitler (Redis Redlock) kullanın.
  - Tüm harici G/Ç işlemlerinde sıkı kaynak kotaları, istek gövdesi boyut sınırları ve soket zaman aşımları yapılandırın.

```typescript
// GÜVENLİ: Hata anında erişimi engelleyen (Fail-Closed) yetkilendirme ara katmanı
export async function enforcePolicyMiddleware(req: Request, res: Response, next: NextFunction) {
  let isAuthorized = false; // Varsayılan olarak false (Fail-Closed)

  try {
    const user = extractAuthenticatedUser(req);
    isAuthorized = await policyEngine.evaluate(user, req.path, req.method);
  } catch (error) {
    // Beklenmeyen istisnayı korelasyon kimliğiyle güvenli bir şekilde günlüğe kaydedin
    logger.error('Yetkilendirme ilkesi değerlendirmesi beklenmedik şekilde çöktü', { error, path: req.path });
    isAuthorized = false; // Çökme anında erişimin kapalı kaldığından kesinlikle emin olun
  }

  if (!isAuthorized) {
    return res.status(403).json({ error: 'Erişim engellendi: yetkilendirme ilkesi isteği reddetti' });
  }

  next();
}
```

---

## 3. Tarihsel Karşılaştırma: OWASP Top 10 2021 ve 2025

| 2021 Kategorisi | 2025 Kategorisi | Başlıca Yapısal Değişiklikler |
| :--- | :--- | :--- |
| **A01:2021 – Broken Access Control** | **A01:2025 – Broken Access Control** | 1. sıradaki yerini korur; SSRF zafiyetini bir erişim denetimi atlatma mekanizması olarak bünyesine katar. |
| **A05:2021 – Security Misconfiguration** | **A02:2025 – Security Misconfiguration** | Çoklu bulut, konteyner ve mikroservis ağlarının karmaşıklığı nedeniyle 2. sıraya yükselmiştir. |
| **A06:2021 – Vulnerable and Outdated Components** | **A03:2025 – Software Supply Chain Failures** | CI/CD hat bütünlüğü ve SBOM süreçlerini kapsayacak biçimde genişletilerek yeniden tanımlanmıştır. |
| **A02:2021 – Cryptographic Failures** | **A04:2025 – Cryptographic Failures** | 4. sıraya yerleşmiştir; hassas veri ifşası ve anahtar yönetimi vurgusunu korur. |
| **A03:2021 – Injection** | **A05:2025 – Injection** | 5. sıraya gerilemiştir; parametreli sorgular ve şema doğrulaması gereksinimleri devam eder. |
| **A04:2021 – Insecure Design** | **A06:2025 – Insecure Design** | 6. sıraya geçmiştir; kodlama öncesi STRIDE tehdit modellemesini zorunlu kılar. |
| **A07:2021 – Identification and Authentication Failures** | **A07:2025 – Authentication Failures** | Başlık sadeleştirilmiştir; MFA (TOTP/WebAuthn), oturum entropisi ve PKCE zorunludur. |
| **A08:2021 – Software and Data Integrity Failures** | **A08:2025 – Software or Data Integrity Failures** | İmzalanmamış eserlere ve CI/CD derleme doğrulamasına odaklanır. |
| **A09:2021 – Security Logging and Monitoring Failures** | **A09:2025 – Security Logging and Alerting Failures** | Gerçek zamanlı ve eyleme geçirilebilir uyarılara odaklanacak şekilde yeniden adlandırılmıştır. |
| **A10:2021 – Server-Side Request Forgery (SSRF)** | **A10:2025 – Mishandling of Exceptional Conditions** | Yeni 10. kategori; hata durumları ve fail-open hallerine odaklanır. SSRF, A01'e aktarılmıştır. |

---

## 4. Otomatik Güvenlik Tarayıcılarının Sınırları

Dinamik Uygulama Güvenliği Testi (DAST) ve Statik Uygulama Güvenliği Testi (SAST) araçları temel taramalar için gereklidir ancak tek başlarına güvenliği sağlayamazlar:

1. **İş Mantığı Kusurları**: Otomatik araçlar, kimliği doğrulanmış bir kullanıcının hesap bakiyesini değiştirme veya kiracı atlatma yetkisini anlayamaz.
2. **Bağlamdan Yoksun Yetkilendirme**: Tarayıcılar, genel açık kaynaklar ile kiracıya özel nesneleri ayırt etmekte zorlanır.
3. **Alarm Yorgunluğu ve Yanlış Negatifler**: Yüzlerce düşük öncelikli uyarı, mühendislerin kritik mimari zafiyetleri gözden kaçırmasına yol açar.

Kapsamlı uygulama güvenliği; otomatik taramaların insan tehdit modellemesi, deneyimli mühendisler tarafından yapılan kod incelemeleri ve bağımsız sızma testleri ile birleştirilmesini gerektirir.

---

## Özet OWASP Top 10:2025 Doğrulama Kontrol Listesi

- [x] **A01 Bozuk Erişim Kontrolü**: Kiracı bazında sorgu düzeyinde yetkilendirme; SSRF çıkış filtrelemesi.
- [x] **A02 Güvenlik Yanlış Yapılandırması**: IaC sıkılaştırması; hata ayıklama mesajlarının gizlenmesi; CSP ve HSTS aktif.
- [x] **A03 Yazılım Tedarik Zinciri Hataları**: Kilit dosyaları doğrulaması; CI/CD adımlarında commit SHA sabitlemesi; SBOM üretimi.
- [x] **A04 Kriptografik Başarısızlıklar**: Argon2id/bcrypt ile parola özetleme; TLS 1.3 zorunluluğu; durağan veri şifreleme.
- [x] **A05 Enjeksiyon**: Parametreli SQL sorguları; sıkı şema girdi doğrulaması; dize birleştirme yasağı.
- [x] **A06 Güvensiz Tasarım**: STRIDE tehdit modellemesi entegrasyonu; güvenli varsayılanlar.
- [x] **A07 Kimlik Doğrulama Hataları**: Zorunlu MFA; yüksek entropili `HttpOnly; Secure; SameSite=Strict` çerezleri.
- [x] **A08 Yazılım veya Veri Bütünlüğü Hataları**: Güvensiz binary deserialization yasağı; Cosign ile sürüm imzalama.
- [x] **A09 Güvenlik Günlüğü ve Uyarı Hataları**: Yapılandırılmış JSON denetim günlükleri; kurcalanamaz SIEM; gerçek zamanlı alarmlar.
- [x] **A10 İstisnai Durumların Hatalı Yönetimi**: Fail-closed hata yönetimi; eşzamanlılık kilitleri; kaynak kotaları.

---

### Yetkili Kaynaklar (Ekim 2026 Doğrulaması)
- **OWASP Vakfı**: [OWASP Top 10:2025 Resmi Projesi](https://owasp.org/projects/top-ten/)
- **OWASP Top 10 Dokümantasyonu**: [OWASP Top 10:2025 Standart Sürümü](https://top10.owasp.org/2025/)
- **OWASP GitHub Deposu**: [OWASP/Top10 Kaynak Kod Deposu](https://github.com/OWASP/Top10)
- **NIST Özel Yayını 800-63B**: Dijital Kimlik Kılavuzları (Kimlik Doğrulama ve Yaşam Döngüsü Yönetimi)
- **IETF RFC 9700**: OAuth 2.0 Güvenliği İçin En İyi Güncel Uygulamalar
