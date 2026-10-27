---
title: "GitOps: Git'i Tek Doğruluk Kaynağı Olarak Kullanarak Altyapı ve Kubernetes Yönetimi"
description: "GitOps mimarisinin derinlemesine analizi: bildirime dayalı durum, sürekli mutabakat döngüleri (Reconciliation), Push vs Pull karşılaştırması, Argo CD, Flux CD, gizli anahtar yönetimi ve kod olarak politika."
locale: "tr"
slug: "gitops-managing-infrastructure-with-git"
translationKey: "gitops-managing-infrastructure-with-git"
author: "Girish Lade"
publishedAt: "2024-10-20"
updatedAt: "2026-10-25"
category: "DevOps & CI/CD"
tags: ["GitOps", "Kubernetes", "Argo CD", "Flux CD", "DevOps", "Infrastructure as Code", "Continuous Delivery"]
coverImage: "/blog-covers/devops-automation.svg"
coverAlt: "Kubernetes ve Argo CD ile GitOps Mimari Şeması"
draft: false
featured: false
contentType: "deep-dive"
---

## 1. GitOps'u Tanımlamak: CI/CD Komutlarının Ötesinde

Modern bulut yerel operasyonlarında GitOps kavramı, genellikle sıradan CI/CD otomasyonu veya kabuk betiklerinin bir Git deposunda saklanması ile karıştırılmaktadır. GitHub Actions veya GitLab CI çalıştırıcısından bir birleştirme (merge) tetiklendiğinde doğrudan `kubectl apply` veya `terraform apply` çalıştırmak, **itme tabanlı (push-based) dağıtım otomasyonudur**, gerçek bir GitOps değildir.

CNCF **OpenGitOps Çalışma Grubu** tarafından tanımlanan GitOps, dört temel ilkeye dayanır:

1. **Bildirime Dayalı Tanımlar (Declarative Descriptions)**: Tüm sistem durumu (altyapı, ağ, dağıtımlar, güvenlik politikaları) prosedürel değil, bildirime dayalı olarak ifade edilir.
2. **Sürümlenmiş ve Değişmez Durum Deposu (Immutable Storage)**: Git, tek doğruluk kaynağı (Single Source of Truth, SSOT) olarak işlev görür; her durum beyanı sürümlenir ve şifrelenmiş geçmişe sahiptir.
3. **Otomatik Çekme ve Uygulama (Automated Pull)**: Küme içindeki mutabakat aracısı (In-cluster reconciliation agent), dışarıdan yönetici kimlik bilgilerine ihtiyaç duymadan yeni beyanları doğrudan Git'ten çeker ve kümeye uygular.
4. **Sürekli Durum Mutabakatı ve Kayma Tespiti (Drift Detection)**: Denetleyici, kümenin fiili çalışma durumu ile Git'teki hedeflenen durumu sürekli karşılaştırarak yetkisiz elle müdahaleleri otomatik olarak düzeltir (Self-Healing).

```
+-------------------------------------------------------------------------+
|                               Geliştirici Çalışma Alanı                 |
|  git commit -m "feat: scale catalog replicas" && git push               |
+-----------------------------------+-------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                        Git Deposu (Tek Doğruluk Kaynağı: SSOT)          |
|  - manifests/base/catalog.yaml                                          |
|  - overlays/production/kustomization.yaml                              |
+-----------------------------------+-------------------------------------+
                                    |
          Mutabakat Döngüsü         | Git Poll / Webhook (Çekme / Pull)
          Küme İçi Ajan             v
+-------------------------------------------------------------------------+
|                  Kubernetes Kümesi / Kontrol Düzlemi                    |
|                                                                         |
|  +---------------------+        Karşılaştır     +---------------------+ |
|  |  GitOps Denetleyici | -------------------->  | Fiili Çalışan       | |
|  |  (Argo CD / Flux)   | <--------------------  | Küme Durumu         | |
|  +---------------------+       Kayma Tespiti    +---------------------+ |
|             |                                             ^             |
|             +-------- Otomatik Düzeltme / Self-Heal ------+             |
+-------------------------------------------------------------------------+
```

### Temel Mimari Fark: Push vs. Pull

- **Push Modeli**: Harici CI sunucuları, üretim kümesinin yetkili kimlik bilgilerini (`kubeconfig`) taşır. CI altyapısı tehlikeye girdiğinde tüm küme ele geçirilebilir. Ayrıca `kubectl edit` ile yapılan elle değişiklikler CI tarafından fark edilemez.
- **Pull Modeli**: Kimlik bilgileri küme dışına asla çıkmaz. Küme içindeki denetleyici, Git deposunu salt okunur olarak izler ve herhangi bir konfigürasyon kaymasında sistemi Git durumuna otomatik olarak geri getirir.

---

## 2. Kustomize ile Ortam Yönetimi

Base ve Overlay yapısı sayesinde farklı ortamların (staging, production) konfigürasyonları şablon karmaşası olmadan güvenle yönetilir:

```yaml
# apps/ecommerce-service/overlays/production/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - ../../base

namespace: ecommerce-production

images:
  - name: ghcr.io/ladestack/ecommerce-service
    newTag: v2.14.0

patches:
  - target:
      kind: Deployment
      name: ecommerce-service
    patch: |-
      - op: replace
        path: /spec/replicas
        value: 12
```

---

## 3. Argo CD ve Flux CD Karşılaştırması

- **Argo CD**: Kullanıcı dostu Web arayüzü, gelişmiş kurumsal SSO ve çok kiracılı (multi-tenant) proje yetkilendirmesi ile geliştirici self-servis platformları için idealdir.
- **Flux CD**: Unix felsefesine uygun, modüler ve hafif mikro denetleyicilerden oluşur. Grafik arayüz olmaksızın Kubernetes yerel CRD yapılandırmalarını tercih eden altyapı ekiplerine uygundur.

---

## 4. Gizli Anahtar Yönetimi ve Geri Alma (Rollback) Sınırları

- **Gizli Anahtarlar**: Açık metin parolalar asla Git'e eklenmez. **Sealed Secrets** (istemci tarafı asimetrik şifreleme) veya **External Secrets Operator** (HashiCorp Vault ve bulut anahtar kasalarıyla dinamik entegrasyon) kullanılır.
- **Rollback Uyarıları**: Git üzerinde bir `revert` işlemi yapmak, yıkıcı veritabanı şema değişikliklerini geri alamaz. Sıfır kesintili dağıtımlar için Genişlet-Daralt (Expand-Contract) veritabanı stratejileri uygulanmalıdır.
