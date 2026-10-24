---
title: "Web Geliştiricileri İçin Makine Öğrenimi Boru Hatları: Veri Toplamadan Tarayıcı ve Sunucu Çıkarımına"
description: "Web mühendisleri için kapsamlı MLOps rehberi: Veri toplama, veri sızıntısını önleme, ONNX Runtime Web ile tarayıcı çıkarımı, FastAPI mikroservisleri ve üretim drift takibi."
locale: "tr"
slug: "machine-learning-pipelines-for-web-developers"
translationKey: "machine-learning-pipelines-for-web-developers"
author: "Girish Lade"
publishedAt: "2024-06-25"
updatedAt: "2026-10-24"
category: "AI Development"
tags:
  - "Makine Öğrenimi"
  - "MLOps"
  - "ONNX Runtime"
  - "FastAPI"
  - "Web Geliştirme"
  - "Python"
coverImage: "/blog-covers/ai-ml-engineering.svg"
coverAlt: "Veri toplama, model eğitimi, ONNX tarayıcı çıkarımı ve FastAPI mikroservisini birbirine bağlayan makine öğrenimi boru hattı mimarisi"
draft: false
featured: false
relatedProduct: "GB Coder"
contentType: "tutorial"
---

# Web Geliştiricileri İçin Makine Öğrenimi Boru Hatları: Veri Toplamadan Tarayıcı ve Sunucu Çıkarımına

Modern web uygulamalarında makine öğrenimi (ML), yalnızca arka planda çalışan akademik araştırmalardan çıkarak kullanıcı deneyiminin merkezine yerleşmiştir. Kişiselleştirilmiş öneriler, arama niyeti ayrıştırma, gerçek zamanlı dolandırıcılık tespiti ve istemci tarafı görsel işleme gibi özellikler, web mühendislerinin akıllı tahmin modellerini doğrudan üretim mimarilerine entegre etmesini gerektirmektedir.

Ancak birçok web mühendisliği ekibi için veri bilimi uzmanlarının hazırladığı Jupyter Notebook modellerini yüksek erişilebilirlikli bir web servisine taşımak ciddi zorluklar barındırır. Eğitim ile çıkarım arasındaki ön işleme uyumsuzlukları (training-serving skew), veri sızıntısı (data leakage), ağ gecikmeleri ve zamanla düşen model doğruluğu (data drift) bu engellerin başında gelir.

Bu rehberde, bir web mühendisinin bakış açısıyla uçtan uca makine öğrenimi boru hattı mimarisini inceliyoruz: Veri toplama ve doğrulama, tarayıcı ile sunucu çıkarımı arasındaki mimari tercihler, ONNX Runtime Web ve FastAPI uygulamaları ve üretim drift izleme süreçleri.

---

## 1. Uçtan Uca Makine Öğrenimi Boru Hattı Mimarisi

Üretim seviyesindeki güvenilir bir ML sistemi dört bağımsız yaşam döngüsünden oluşur:

```
[ AŞAMA 1: Toplama ve Doğrulama ]
Kullanıcı Etkinlik Günlükleri / RDBMS / Olay Akışları
       │
       ▼
Şema Doğrulama ve Temizleme (Pydantic / Great Expectations)
       │
       ▼
Zaman Serisi Tabanlı Train / Val / Test Ayrımı (Veri Sızıntısını Önleme)

─────────────────────────────────────────────────────────────────

[ AŞAMA 2: Eğitim ve Model Dışa Aktarma ]
Özellik Deposu (Feature Store) ve Boru Hattı Eğitimi (Scikit-Learn / PyTorch)
       │
       ▼
Format Standardizasyonu (ONNX / TorchScript) ve Kuantalama (INT8 / FP16)
       │
       ▼
Model Kayıt Dizini (S3 / MLflow) ve Sürüm Kontrolü

─────────────────────────────────────────────────────────────────

[ AŞAMA 3: Dağıtım ve Çıkarım Sunumu ]
       ┌───────────────────────────────┐
       ▼                               ▼
[ İstemci Tarafı Tarayıcı Çıkarımı ] [ Sunucu Tarafı Mikroservis ]
ONNX Runtime Web (WASM / WebGPU)      FastAPI / Triton Çıkarım Sunucusu
Sıfır Sunucu Maliyeti・Gizlilik       Karmaşık Modeller・Fikri Mülkiyet Koruması

─────────────────────────────────────────────────────────────────

[ AŞAMA 4: MLOps ve Drift İzleme ]
Girdi Özellik Dağılım Takibi (KS Testi / PSI) ve Model Güvenilirlik İzleme
```

---

## 2. Veri Toplama ve Veri Sızıntısını (Data Leakage) Önleme

Bir ML boru hattı kurarken karşılaşılan en sinsi ve yıkıcı hata **veri sızıntısıdır (Data Leakage)**.

### Yaygın Veri Sızıntısı Nedenleri
1. **Ölçekleyici Parametrelerinin Sızması**: Test verilerini de içeren tüm veri kümesi üzerinde `StandardScaler.fit()` çalıştırılması, gelecekteki istatistiksel ortalama ve varyansın eğitim sürecine sızmasına yol açarak doğrulama skorlarını yanıltıcı biçimde yükseltir.
2. **Zaman Serisi Verilerinin Rastgele Bölünmesi**: Zaman sıralamasına dayalı etkinlik kayıtlarına rastgele k-fold çapraz doğrulama uygulandığında, model gelecekteki verileri kullanarak geçmiş olayları tahmin etmeyi öğrenir.

### Sızıntısız Veri Ön İşleme Boru Hattı (Python)

```python
# pipeline/preprocess.py
import pandas as pd
import numpy as np
from sklearn.model_selection import TimeSeriesSplit
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

def build_leak_free_pipeline(df: pd.DataFrame, target_col: str, timestamp_col: str):
    # Zaman damgasına göre kesin sıralama
    df = df.sort_values(timestamp_col).reset_index(drop=True)
    X = df.drop(columns=[target_col, timestamp_col])
    y = df[target_col]

    # Son %20'lik dilim üretim doğrulama kümesi olarak ayrılır
    split_index = int(len(df) * 0.8)
    X_train, X_test = X.iloc[:split_index], X.iloc[split_index:]
    y_train, y_test = y.iloc[:split_index], y.iloc[split_index:]

    # Pipeline nesnesi ölçekleyiciyi kapsüller, çıkarım sapmasını önler
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('classifier', LogisticRegression(C=1.0, solver='lbfgs', max_iter=500))
    ])

    pipeline.fit(X_train, y_train)
    holdout_score = pipeline.score(X_test, y_test)
    print(f"Holdout Doğrulama Doğruluğu: {holdout_score:.4f}")

    return pipeline
```

---

## 3. Tarayıcıda Çıkarım vs Sunucuda Çıkarım Karşılaştırması

Çıkarım hesaplamasının nerede yapılacağı sistem maliyetini ve kullanıcı deneyimini doğrudan belirler.

| Kriter | İstemci Tarafı Çıkarım (ONNX Runtime Web) | Sunucu Tarafı Çıkarım (FastAPI / Triton) |
| :--- | :--- | :--- |
| **Ağ Gecikmesi** | **0 ms** (Ağ gidiş-dönüşü yok) | Ağ gecikmesine bağlı (50–250 ms) |
| **Sunucu Maliyeti** | **0 TL / $** (İstemci donanımı kullanılır) | Sunucu işlemci/GPU maliyeti (Otomatik ölçekleme gerekir) |
| **Çevrimdışı Çalışma** | **Tam Destek** (Service Worker ile çalışabilir) | Desteklenmez (İnternet bağlantısı zorunlu) |
| **Veri Gizliliği** | **En Yüksek** (Hassas veri tarayıcıdan çıkmaz) | Sunucuya iletilir (Güvenlik uyumluluğu gerekir) |
| **Fikri Mülkiyet (IP)** | Korunamaz (Model dosyası istemciye indirilir) | **En Yüksek** (Ağırlıklar sunucuda gizli kalır) |
| **Model Boyut Limiti** | Küçük ve optimize modeller (< 50 MB önerilir) | Sınırsız (Onlarca GB büyüklüğündeki modeller) |

---

## 4. İstemci Tarafı Çıkarım Uygulaması: ONNX Runtime Web

Hafif sınıflandırma veya görsel işleme modellerini tarayıcıda çalıştırmak için WebAssembly (WASM) ve WebGPU donanım hızlandırmalı **ONNX Runtime Web** en kararlı çözümdür.

```typescript
// src/lib/ml/browserInference.ts
import * as ort from 'onnxruntime-web';

ort.env.wasm.numThreads = 2;
ort.env.wasm.simd = true;

export interface PredictionResult {
  probabilities: number[];
  predictedClass: number;
  inferenceDurationMs: number;
}

export class BrowserInferenceService {
  private session: ort.InferenceSession | null = null;

  async loadModel(modelPath: string): Promise<void> {
    this.session = await ort.InferenceSession.create(modelPath, {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all'
    });
  }

  async predict(features: number[]): Promise<PredictionResult> {
    if (!this.session) {
      throw new Error("Model oturumu başlatılmadı. Önce loadModel() çağrılmalı.");
    }

    const start = performance.now();
    const inputTensor = new ort.Tensor('float32', Float32Array.from(features), [1, features.length]);
    const inputName = this.session.inputNames[0];
    const feeds: Record<string, ort.Tensor> = {};
    feeds[inputName] = inputTensor;

    const results = await this.session.run(feeds);
    const outputName = this.session.outputNames[0];
    const outputTensor = results[outputName];
    const outputData = Array.from(outputTensor.data as Float32Array);

    let maxIdx = 0;
    let maxVal = outputData[0];
    for (let i = 1; i < outputData.length; i++) {
      if (outputData[i] > maxVal) {
        maxVal = outputData[i];
        maxIdx = i;
      }
    }

    return {
      probabilities: outputData,
      predictedClass: maxIdx,
      inferenceDurationMs: performance.now() - start
    };
  }
}
```

---

## 5. Sunucu Tarafı Çıkarım Mikroservisi: FastAPI Uygulaması

Fikri mülkiyetin gizli tutulması gereken veya ağır GPU kaynağı gerektiren senaryolarda, FastAPI tabanlı asenkron mikroservis mimarisi tercih edilir.

```python
# server/app.py
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
import numpy as np
import onnxruntime as ort
import time

app = FastAPI(title="ML Çıkarım Servisi", version="1.0.0")

class InferenceRequest(BaseModel):
    user_id: str
    features: list[float] = Field(..., min_items=5, max_items=5)

class InferenceResponse(BaseModel):
    user_id: str
    prediction: int
    confidence: float
    latency_ms: float

session = ort.InferenceSession("models/production_classifier.onnx")
input_name = session.get_inputs()[0].name

@app.post("/api/v1/predict", response_model=InferenceResponse)
async def predict_endpoint(payload: InferenceRequest):
    try:
        start_time = time.perf_counter()
        input_array = np.array([payload.features], dtype=np.float32)

        raw_outputs = session.run(None, {input_name: input_array})
        probabilities = raw_outputs[0][0]
        predicted_class = int(np.argmax(probabilities))
        confidence = float(probabilities[predicted_class])
        duration_ms = (time.perf_counter() - start_time) * 1000

        return InferenceResponse(
            user_id=payload.user_id,
            prediction=predicted_class,
            confidence=confidence,
            latency_ms=duration_ms
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Çıkarım motoru hatası: {str(exc)}"
        )
```

---

## 6. MLOps ve Üretimde Drift İzleme

Model üretim ortamına alındıktan sonra zaman içinde gerçek dünya verilerinin değişmesiyle tahmin doğruluğunun düşmesi kaçınılmazdır. Bu durum **veri sapması (Data Drift)** olarak adlandırılır.

### Kritik İzleme Metrikleri
1. **Girdi Özellik Sapması**: Kolmogorov-Smirnov (KS) testi veya Nüfus Kararlılık İndeksi (PSI) ile üretim trafiği dağılımının eğitim verisinden sapıp sapmadığı düzenli olarak kontrol edilir.
2. **Tahmin Güvenilirlik Düşüşü**: Modelin ürettiği olasılık puanlarının ortalamasındaki ani düşüşler, veri anormalliklerine işaret eder.
3. **Gölge Dağıtım (Shadow Deployment)**: Yeni model sürümü (v2) arka planda gerçek trafikle test edilir; kullanıcıya mevcut v1 yanıtı dönerken v2'nin gecikme ve doğruluk performansı güvenle incelenir.

---

## 7. Özet ve Sonraki Adımlar

Web geliştiricilerinin makine öğrenimini başarıyla ürünleştirmesi, veri bütünlüğünün korunması, doğru çıkarım mimarisinin seçilmesi ve üretim gözlemlenebilirliğinin kurulması ile mümkündür.

İlgili ileri düzey mimariler için [Vektör Veritabanları ile RAG Uygulamaları Geliştirme](/blog/building-rag-applications-vector-databases) ve [Alana Özel Görevler İçin LLM İnce Ayarı (Fine-Tuning)](/blog/fine-tuning-llms-domain-specific-tasks) rehberlerimizi inceleyebilirsiniz.
