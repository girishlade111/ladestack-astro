---
title: "Vektör Veritabanları ile RAG Uygulamaları Geliştirme: Veri Alımı, Parçalama ve Arama Mimarisi"
description: "Vektör veritabanları, hibrit arama, yeniden sıralama (reranking) ve kaynak doğrulama mekanizmalarını birleştiren kurumsal Retrieval-Augmented Generation (RAG) mimari rehberi."
locale: "tr"
slug: "building-rag-applications-vector-databases"
translationKey: "building-rag-applications-vector-databases"
author: "Girish Lade"
publishedAt: "2024-07-08"
updatedAt: "2026-10-24"
category: "Generative AI"
tags:
  - "RAG"
  - "Vektör Veritabanları"
  - "Pinecone"
  - "Gömme Modelleri"
  - "LLM"
  - "Semantik Arama"
coverImage: "/blog-covers/ai-code-generation.svg"
coverAlt: "LLM için doküman alımı, vektör indeksleme, benzerlik araması ve bağlam genişletmesini gösteren RAG mimari şeması"
draft: false
featured: false
relatedProduct: "GB Coder"
contentType: "tutorial"
---

# Vektör Veritabanları ile RAG Uygulamaları Geliştirme: Veri Alımı, Parçalama ve Arama Mimarisi

Büyük Dil Modelleri (LLM), genel metin analizi, sentezleme ve kod üretiminde olağanüstü kabiliyetler sunmaktadır. Ancak kurumsal yazılım ekosistemlerinde doğrudan kullanıldıklarında iki temel kısıtla karşılaşırlar: **eğitim verisinin zaman aşımı sınırı (knowledge cutoff)** ve kaynakta bulunmayan bilgileri ikna edici şekilde uydurma eğilimi olan **halüsinasyonlar (confabulation)**.

**Retrieval-Augmented Generation (RAG)**, bilgi depolama katmanını modelin parametrik belleğinden ayırarak bu sorunu çözer. Tüm kurumsal belgelerin modeli yeniden eğiterek öğretilmesi yerine, harici bir bilgi getirme sisteminden (genellikle bir vektör veritabanı) ilgili metin parçacıkları sorgulanır ve çıkarım anında modelin bağlam penceresine dinamik olarak eklenir.

Bununla birlikte, bir RAG sistemini basit bir prototipten kurumsal ölçekte çalışan güvenilir bir servise dönüştürmek hassas mühendislik gerektirir. Metinleri her 1.000 karakterde rastgele bölüp doğrudan vektör araması yapan ilkel tasarımlar; bağlam kaybına, bozuk tablolara, arama gürültüsüne ve çelişkili bilgilerden kaynaklanan halüsinasyonlara neden olur.

Bu rehberde, doküman alımı ve yapı farkındalıklı parçalama (chunking) stratejilerinden yoğun vektör benzerliği hesaplamalarına, çapraz kodlayıcı (cross-encoder) ile yeniden sıralamadan doğrulanabilir kaynak atıflı yanıt üretimine kadar uçtan uca bir RAG boru hattı mimarisini inceliyoruz.

---

## 1. Uçtan Uca RAG Mimarisi

Üretim seviyesinde bir RAG mimarisi, iki bağımsız yaşam döngüsü etrafında şekillenir: **Çevrimdışı Doküman İndeksleme Boru Hattı** ve **Çevrimiçi Gerçek Zamanlı Arama ve Üretim Döngüsü**.

```
[ ÇEVRİMDİŞİ İNDEKSLEME BORU HATTI ]
Ham Dokümanlar (PDF, Markdown, HTML, Şirket Wiki Belgeleri)
       │
       ▼
Metin Çıkarma ve Temizleme
       │
       ▼
Yapı Farkındalıklı Parçalama (400–800 token, %10–15 örtüşme)
       │
       ▼
Yoğun Vektör Gömme Üretimi (text-embedding-3-small, 1536 boyut)
       │
       ▼
Vektör Veritabanı İndeksleme (HNSW / Metaveri Yükü Eklenmesi)

─────────────────────────────────────────────────────────────────

[ ÇEVRİMİÇİ ARAMA VE ÜRETİM DÖNGÜSÜ ]
Kullanıcı Sorgusu
       │
       ▼
Sorgu Ön İşleme ve Niyet Genişletme
       │
       ▼
Hibrit Arama (Yoğun Vektör Kosinüs Benzerliği + BM25 Anahtar Kelime Araması)
       │
       ▼
Karşılıklı Sıralama Birleştirme (RRF) ──> İlk 50 Aday
       │
       ▼
Çapraz Kodlayıcı ile Yeniden Sıralama (Reranker) ──> En İyi 4 Parça
       │
       ▼
Bağlam İnşası ve Kaynak Etiketleme
       │
       ▼
Kanıta Dayalı LLM Yanıt Üretimi ([Kaynak-N] zorunluluğu ve bilgi yoksa ret)
```

---

## 2. Doküman Alımı ve Parçalama (Chunking) Stratejileri

Arama başarısının üst sınırı parçalama kalitesi ile belirlenir. Parçalar aşırı küçük olursa gerekli arka plan bağlamı kaybolur; aşırı büyük olursa yoğun vektör ilgisiz metinlerle seyreltilerek hedef sorgular için benzerlik puanı düşer.

### Parçalama Stratejilerinin Karşılaştırması

| Strateji | Hedef Token | Örtüşme (Overlap) | Avantajlar | Dezavantajlar ve Riskler |
| :--- | :--- | :--- | :--- | :--- |
| **Sabit Boyutlu Kayan Pencere** | 256–512 token | %10–20 | Kolay uygulama, sabit işlem maliyeti | Cümleleri, paragrafları ve tablo satırlarını ortadan böler |
| **Özyinelemeli Karakter Ayrımı**| 400–800 token | 50–100 token | Paragraf (`\n\n`) ve cümle (`. `) sınırlarını korur | Karmaşık listeleri ve kod bloklarını bölebilir |
| **Markdown / Yapı Farkındalıklı** | Değişken | Başlık hiyerarşi yolu | Başlık bağlamını, kod bloklarını ve tabloları korur | Çok derin belgelerde özyinelemeli özetleme gerektirir |
| **Semantik Benzerlik Parçalama** | Değişken | Yok | Cümleler arası anlamsal sapmaya göre böler | Alım anında her cümle için gömme hesaplama yükü getirir |

### Yapı Farkındalıklı Markdown Parçalayıcı (TypeScript)

Teknik dokümantasyonlarda başlık hiyerarşisini metaveri olarak saklayan yapı farkındalıklı parçalama en yüksek arama doğruluğunu sağlar:

```typescript
// src/lib/rag/chunker.ts

export interface DocumentSection {
  title: string;
  sourceUrl: string;
  category: string;
  content: string;
}

export interface TextChunk {
  chunkId: string;
  sourceUrl: string;
  headingPath: string;
  content: string;
  tokenEstimate: number;
}

/**
 * Markdown başlıklarını (#, ##, ###) ve paragraf sınırlarını koruyarak metni böler
 */
export function chunkMarkdownDocument(
  doc: DocumentSection,
  maxTokens: number = 600,
  overlapTokens: number = 60
): TextChunk[] {
  const sections = doc.content.split(/\n(?=#{1,3}\s)/);
  const chunks: TextChunk[] = [];
  let chunkCounter = 0;

  for (const section of sections) {
    const lines = section.trim().split("\n");
    const heading = lines[0].startsWith("#") ? lines[0].replace(/^#+\s*/, "") : "General";
    const body = lines[0].startsWith("#") ? lines.slice(1).join("\n").trim() : section.trim();

    if (!body) continue;

    const estimatedTokens = Math.ceil(body.length / 4);

    if (estimatedTokens <= maxTokens) {
      chunkCounter++;
      chunks.push({
        chunkId: `${doc.sourceUrl}#chunk-${chunkCounter}`,
        sourceUrl: doc.sourceUrl,
        headingPath: `${doc.title} > ${heading}`,
        content: `### ${heading}\n${body}`,
        tokenEstimate: estimatedTokens
      });
    } else {
      const paragraphs = body.split(/\n\n+/);
      let currentBuffer: string[] = [];
      let currentTokenCount = 0;

      for (const paragraph of paragraphs) {
        const pTokens = Math.ceil(paragraph.length / 4);

        if (currentTokenCount + pTokens > maxTokens && currentBuffer.length > 0) {
          chunkCounter++;
          chunks.push({
            chunkId: `${doc.sourceUrl}#chunk-${chunkCounter}`,
            sourceUrl: doc.sourceUrl,
            headingPath: `${doc.title} > ${heading}`,
            content: `### ${heading}\n${currentBuffer.join("\n\n")}`,
            tokenEstimate: currentTokenCount
          });

          const overlap = currentBuffer.slice(-1);
          currentBuffer = [...overlap, paragraph];
          currentTokenCount = Math.ceil(currentBuffer.join("\n\n").length / 4);
        } else {
          currentBuffer.push(paragraph);
          currentTokenCount += pTokens;
        }
      }

      if (currentBuffer.length > 0) {
        chunkCounter++;
        chunks.push({
          chunkId: `${doc.sourceUrl}#chunk-${chunkCounter}`,
          sourceUrl: doc.sourceUrl,
          headingPath: `${doc.title} > ${heading}`,
          content: `### ${heading}\n${currentBuffer.join("\n\n")}`,
          tokenEstimate: currentTokenCount
        });
      }
    }
  }

  return chunks;
}
```

---

## 3. Vektör Benzerlik Metrikleri ve HNSW İndeksleme

Gömme modelleri metinleri yüksek boyutlu sürekli vektör uzayına eşler.

### Kosinüs Benzerliği vs Noktasal Çarpım (Dot Product)
- **Kosinüs Benzerliği**: İki vektör arasındaki açının kosinüsünü ölçer ve metin uzunluğundan bağımsızdır.
- **Noktasal Çarpım**: Vektörler L2 normu ile birim normalleştirildiğinde ($\|\mathbf{u}\|_2 = 1$), noktasal çarpım kosinüs benzerliği ile matematiksel olarak tamamen eşdeğerdir ve karekök işlemi gerektirmediği için donanım hızlandırıcılarında çok daha hızlı hesaplanır.

### Yaklaşık En Yakın Komşu (ANN) Arama ve HNSW Parametreleri
Milyonlarca parçadan oluşan bir koleksiyonda doğrudan karşılaştırma (Exact k-NN) $O(N \cdot d)$ karmaşıklık yarattığından milisaniye seviyesinde yanıt veremez. Bu nedenle **HNSW (Hierarchical Navigable Small World)** algoritması kullanılır:

- **`M`**: Her düğümün sahip olduğu maksimum bağlantı sayısı. Büyük değerler arama kalitesini artırır ancak bellek kullanımını yükseltir.
- **`efConstruction`**: İndeks oluşturma anındaki arama adayı derinliği.
- **`efSearch`**: Çalışma zamanındaki arama adayı sayısı. Gecikme ile doğruluk arasındaki dengeyi ayarlar.

---

## 4. Hibrit Arama ve Çapraz Kodlayıcı ile Yeniden Sıralama

Yalnızca yoğun vektör aramasına güvenmek, **özel terimlerin, kod değişkenlerinin ve tam ürün kodlarının eşleşmesinde kör noktalar** yaratır.

Üretim sistemlerinde **Hibrit Arama (Hybrid Search)** tercih edilir: Semantik anlamı yakalayan **yoğun vektör araması** ile harfiyen anahtar kelime eşleşmesini yakalayan **BM25 seyrek araması** paralel çalıştırılır ve sonuçlar **Karşılıklı Sıralama Birleştirme (RRF)** ile harmanlanır.

Birleştirilen adaylar daha sonra bir **Çapraz Kodlayıcıya (Cross-Encoder Reranker)** aktarılarak sorgu ile metin parçacığı arasındaki detaylı token etkileşimleri puanlanır ve en alakalı 4–5 parça seçilir.

---

## 5. Üretime Hazır RAG Boru Hattı Uygulaması (TypeScript)

Pinecone ve OpenAI modellerini bir araya getiren, benzerlik eşiği ve kanıt yetersizliğinde kibar ret mekanizması içeren tam kapsamlı servis:

```typescript
// src/lib/rag/pipeline.ts
import { Pinecone } from '@pinecone-database/pinecone';

export interface RetrievedChunk {
  chunkId: string;
  sourceUrl: string;
  headingPath: string;
  content: string;
  score: number;
}

export interface GroundedRAGResponse {
  answer: string;
  citations: Array<{ citationIndex: number; sourceUrl: string; headingPath: string }>;
  tokenUsage: { promptTokens: number; completionTokens: number };
  refusal: boolean;
}

export async function executeGroundedRAG(
  query: string,
  pineconeClient: Pinecone,
  pineconeIndexName: string,
  embeddingApiKey: string,
  llmApiKey: string
): Promise<GroundedRAGResponse> {
  // 1. Sorgunun birim normalleştirilmiş gömme vektörünü oluştur
  const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${embeddingApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input: query,
      model: 'text-embedding-3-small'
    })
  });

  if (!embeddingResponse.ok) {
    throw new Error(`Gömme servisi hatası: ${embeddingResponse.statusText}`);
  }

  const embeddingData = await embeddingResponse.json();
  const queryVector: number[] = embeddingData.data[0].embedding;

  // 2. Vektör veritabanından adayları sorgula
  const index = pineconeClient.index(pineconeIndexName);
  const queryResult = await index.query({
    vector: queryVector,
    topK: 10,
    includeMetadata: true
  });

  const candidates: RetrievedChunk[] = (queryResult.matches || []).map((match) => ({
    chunkId: match.id,
    sourceUrl: (match.metadata?.sourceUrl as string) || 'Unknown Source',
    headingPath: (match.metadata?.headingPath as string) || 'General',
    content: (match.metadata?.content as string) || '',
    score: match.score || 0
  }));

  // 3. Eşik değerin altındaki ilgisiz parçaları ele
  const MIN_SIMILARITY_SCORE = 0.65;
  const filteredChunks = candidates.filter(c => c.score >= MIN_SIMILARITY_SCORE);

  // Yeterli kanıt bulunamazsa halüsinasyonu engellemek için cevap vermeyi reddet
  if (filteredChunks.length === 0) {
    return {
      answer: "Mevcut kurumsal dokümantasyon içerisinde bu soruyu yanıtlamak için yeterli kanıt bulunamamıştır.",
      citations: [],
      tokenUsage: { promptTokens: 0, completionTokens: 0 },
      refusal: true
    };
  }

  const selectedContext = filteredChunks.slice(0, 4);

  // 4. Kaynak atıf etiketli sistem komutunu oluştur
  const contextBlock = selectedContext
    .map((chunk, idx) => `[Kaynak-${idx + 1}] (${chunk.headingPath})\n${chunk.content}`)
    .join("\n\n---\n\n");

  const systemPrompt = `Katı kuralları olan bir teknik dokümantasyon asistanısınız.
Kullanıcının sorusunu YALNIZCA aşağıda verilen doğrulanmış kaynak parçalarına dayanarak yanıtlayın.
Kurallar:
1. İfade edilen her olgunun sonuna ilgili kaynak etiketini [Kaynak-N] şeklinde ekleyin.
2. Belgelerde sorunun yanıtı yer almıyorsa "Belgelerde bu soruyu yanıtlamak için yeterli bilgi bulunmamaktadır" deyin.
3. Asla verilen kaynakların dışındaki genel bilgilerden tahmin yürütmeyin.

DOĞRULANMIŞ KAYNAKLAR:
${contextBlock}`;

  // 5. LLM ile yanıtı üret
  const llmResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${llmApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
      ],
      temperature: 0.1,
      max_tokens: 500
    })
  });

  if (!llmResponse.ok) {
    throw new Error(`LLM üretim hatası: ${llmResponse.statusText}`);
  }

  const completionData = await llmResponse.json();
  const answerText = completionData.choices[0].message.content;

  const citations = selectedContext.map((chunk, idx) => ({
    citationIndex: idx + 1,
    sourceUrl: chunk.sourceUrl,
    headingPath: chunk.headingPath
  }));

  return {
    answer: answerText,
    citations,
    tokenUsage: {
      promptTokens: completionData.usage.prompt_tokens,
      completionTokens: completionData.usage.completion_tokens
    },
    refusal: answerText.includes("yeterli bilgi bulunmamaktadır")
  };
}
```

---

## 6. Teknik Gerçeklik Analizi: RAG Halüsinasyonları Tamamen Yok Eder mi?

"RAG mimarisi dil modellerindeki halüsinasyonları %100 oranında tamamen ortadan kaldırır" iddiası **teknik olarak doğru değildir**.

RAG halüsinasyon riskini radikal biçimde azaltsa da kendine özgü yeni arıza senaryoları doğurur:

1. **Arama Kaçırma (Retrieval Miss)**: Soru ile dokümanın ifade biçimi uyuşmadığında doğru parça bulunamaz. Sistemde açık ret kuralı yoksa model hafızasından uydurmaya başlar.
2. **Ortada Kaybolma (Lost in the Middle)**: Dil modelleri uzun bağlamların başında ve sonundaki bilgilere odaklanır, ortadaki parçalarda geçen gerçekleri gözden kaçırabilir.
3. **Çelişkili Doküman Kirliliği**: Veritabanında v1 ve v2 sürümlerine ait zıt dokümanlar aynı anda arandığında, model iki sürümü birleştirerek sahte bir API çağrısı üretebilir.
4. **Bağlama Sadakatsizlik (Faithfulness Failure)**: Bağlamda açıkça yazan bir bilgi, modelin ön eğitiminde edindiği güçlü bir önyargı ile çatıştığında model dokümanı görmezden gelebilir.

---

## 7. Özet

Vektör veritabanları ve RAG mimarisi, güvenilir kurumsal yapay zeka ürünleri inşa etmenin vazgeçilmez temelidir. Yapı farkındalıklı parçalama, hibrit arama, yeniden sıralama ve kaynak doğrulamalı istemlerle donatılmış bir sistem, izlenebilir ve denetlenebilir bilgi servisleri sunar.

İlgili diğer mimari desenler için [Çok Kiracılı SaaS Mimari Desenleri](/blog/multi-tenant-saas-architecture-patterns) ve [Alana Özel Görevler İçin LLM İnce Ayarı](/blog/fine-tuning-llms-domain-specific-tasks) yazılarımızı inceleyebilirsiniz.
