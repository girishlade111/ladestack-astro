---
title: "Girişimler İçin Bulut Maliyetlerini Optimize Etme Stratejileri: Uygulamalı FinOps ve Altyapı Verimliliği"
description: "İşlemci boyutlandırması, spot bulut sunucuları, S3 depolama yaşam döngüsü, veritabanı bağlantı havuzu ve FinOps birim ekonomisi ile maliyet düşürme rehberi."
locale: "tr"
slug: "cloud-cost-optimization-strategies-startups"
translationKey: "cloud-cost-optimization-strategies-startups"
author: "Girish Lade"
publishedAt: "2024-09-22"
updatedAt: "2026-10-24"
category: "Cloud Computing"
tags: ["Cloud Costs", "FinOps", "AWS", "Kubernetes", "DevOps", "Startups", "Architecture"]
coverImage: "/blog-covers/cloud-security.svg"
coverAlt: "Girişimler için Bulut Maliyeti Optimizasyon Şeması"
draft: false
featured: false
contentType: "guide"
---

## 1. Giriş: Girişimlerde Bulut Faturası Krizi ve FinOps İhtiyacı

Hızlı büyüyen teknoloji girişimlerinde AWS, Azure veya Google Cloud faturaları, personel maaşlarından sonraki en büyük gider kalemi haline gelir. Ürünün erken geliştirme evresinde öncelik daima "pazara çıkış hızı" olduğundan, aşırı kaynak ayrılmış sunucular kontrolsüz şekilde çalışmaya bırakılır.

Ancak girişim Seri A veya Seri B yatırım turlarına geldiğinde, kontrolsüz bulut harcamaları kâr marjını eriterek nakit akışını tehdit eder.

```
Girişimlerde Maliyet Sızıntısının Tipik Yaşam Döngüsü
===================================================
1. MVP Aşaması       ──► İhtiyaçtan çok büyük sunucular açılır ("yeter ki çalışsın")
2. Canlıya Çıkış     ──► Trafik korkusuyla Auto-scaling minimum limitleri çok yüksek tutulur
3. Sürekli Geliştirme ──► Unutulan test ortamları, bağlı olmayan EBS diskleri, eski yedekler
4. Fatura Patlaması  ──► Kâr erir ve yönetim ekibinden maliyetleri yarı yarıya indirme talimatı gelir
```

**Makineleri rastgele kapatmak maliyet optimizasyonu değildir.** Gerçek optimizasyon; sistemin yüksek erişilebilirlik ve performans standartlarını koruyarak gereksiz kaynakları sistematik olarak eleyen **FinOps (Bulut Finansal Operasyonları) disiplinidir**.

---

## 2. İşlem Gücü (Compute) Optimizasyonu: Doğru Boyutlandırma ve Akıllı Ölçekleme

### 1. Aşırı Kaynak Tahsisini Önleme (Rightsizing)
Birçok girişimin sunucularındaki ortalama CPU kullanımı %5-10 seviyesindedir. Üretim ortamının p95 metrikleri incelenerek doğru donanım aileleri seçilmelidir:
- **ARM Tabanlı İşlemciler:** AWS Graviton3/4 gibi yeni nesil ARM işlemcilere geçiş yapmak, geleneksel x86 işlemcilere göre aynı performansı daha düşük maliyetle sunar.
- **Burstable Sunucular:** Arka plan işleri veya aralıklı trafik alan servisler için kredi modelli (t4g serisi) sunucular tercih edilmelidir.

### 2. Kubernetes KEDA ile Olay Güdümlü Ölçekleme
Yalnızca CPU kullanımına dayalı HPA (Horizontal Pod Autoscaler) ani trafik artışlarında geç reaksiyon verir. KEDA kullanarak mesaj kuyruklarındaki (RabbitMQ, Kafka, SQS) bekleyen iş sayısına göre anlık ölçekleme yapılmalı ve iş bittiğinde pod sayısı sıfıra indirilmelidir.

---

## 3. Spot Sunucular ve Kapasite Taahhütleri

```
İşlem Gücü Tedarik Piramidi
---------------------------
▲
│ [Spot Sunucular]       ──► Durumsuz (Stateless) API'ler, arka plan işleri, CI/CD (%60-90 indirim)
│ [Savings Plans / RI]   ──► Çekirdek veritabanları, sürekli çalışan mesaj kuyrukları (1-3 yıl taahhüt)
│ [On-Demand Sunucular]  ──► Sadece beklenmeyen ani trafik dalgalanmaları için minimum tampon
▼
```

### Karpenter ile Güvenli Spot Düğüm Havuzu
Kubernetes ortamında Karpenter kullanarak farklı sunucu tiplerinden oluşan dayanıklı spot düğüm havuzları kurulur:

```yaml
apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: stateless-spot-workers
spec:
  template:
    spec:
      requirements:
        - key: "karpenter.sh/capacity-type"
          operator: In
          values: ["spot", "on-demand"]
        - key: "kubernetes.io/arch"
          operator: In
          values: ["arm64", "amd64"]
        - key: "node.kubernetes.io/instance-category"
          operator: In
          values: ["c", "m", "r"]
  disruption:
    consolidationPolicy: WhenUnderutilized
    expireAfter: 720h
```

---

## 4. Depolama ve Ağ İletişiminin Gizli Maliyetleri

### 1. Blok Depolama (EBS) İyileştirmeleri
- **gp2'den gp3'e Geçiş:** Eski gp2 diskleri IOPS artışı için disk boyutunu büyütmeyi zorunlu kılıyordu. gp3 bağımsız IOPS ve veri aktarım hızı sunarak taban maliyeti %20 oranında düşürür.
- **Boşta Kalan Diskleri Temizleme:** Sonlandırılan sanal sunuculardan geriye kalan sahipsiz EBS diskleri otomatik scriptlerle düzenli temizlenmelidir.

### 2. S3 Yaşam Döngüsü ile Otomatik Arşivleme
Uygulama loglarını S3 Standard sınıfında süresiz tutmak yerine Terraform ile arşivleme kuralları tanımlanmalıdır:

```hcl
resource "aws_s3_bucket_lifecycle_configuration" "app_logs_lifecycle" {
  bucket = aws_s3_bucket.app_logs.id

  rule {
    id     = "auto-archive-logs"
    status = "Enabled"

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }

    transition {
      days          = 90
      storage_class = "GLACIER"
    }

    expiration {
      days = 365
    }
  }
}
```

---

## 5. Veritabanı Verimliliği ve Bağlantı Havuzu

Yönetilen veritabanları (Amazon RDS, Cloud SQL) toplam altyapı maliyetinin %30'undan fazlasını tüketebilir. Çoğu zaman veritabanı yükseltme ihtiyacı CPU yetersizliğinden değil, kontrolsüz bağlantıların RAM tüketmesinden kaynaklanır.

### PgBouncer ile Bağlantı Patlamasını Önleme
İşlem modunda (Transaction Pooling) çalışan hafif PgBouncer ara katmanı ile yüzlerce konteynerden gelen bağlantılar, veritabanına giden onlarca optimize oturumda toplanır.

---

## 6. FinOps Kültürü ve Birim Ekonomisi

1. **Etiketleme (Inform):** Harcamaların ekiplere ve ortamlara göre izlenebilmesi için etiketleme (Cost Allocation Tags) zorunlu tutulmalıdır.
2. **Sürekli İyileştirme (Optimize):** Boşta kalan kaynaklar haftalık olarak denetlenmelidir.
3. **Birim Ekonomisi (Operate):** En kritik gösterge olarak *«Aktif Kullanıcı Başına Düşen Altyapı Maliyeti»* takip edilmelidir.
