---
title: "Создание RAG-приложений с векторными базами данных: сбор данных, чанкинг и архитектура поиска"
description: "Полное практическое руководство по архитектуре Retrieval-Augmented Generation (RAG): векторные базы данных, гибридный поиск, реранкинг и проверяемые цитирования."
locale: "ru"
slug: "building-rag-applications-vector-databases"
translationKey: "building-rag-applications-vector-databases"
author: "Girish Lade"
publishedAt: "2024-07-08"
updatedAt: "2026-10-24"
category: "Generative AI"
tags:
  - "RAG"
  - "Векторные базы данных"
  - "Pinecone"
  - "Эмбеддинги"
  - "LLM"
  - "Семантический поиск"
coverImage: "/blog-covers/ai-code-generation.svg"
coverAlt: "Архитектурная диаграмма RAG: парсинг документов, векторная индексация, поиск по сходству и генерация контекста для LLM"
draft: false
featured: false
relatedProduct: "GB Coder"
contentType: "tutorial"
---

Большие языковые модели (LLM) демонстрируют впечатляющие возможности обобщения и логического вывода на общедоступных корпусах данных. Однако при внедрении в корпоративные информационные системы базовые модели сталкиваются с двумя фундаментальными ограничениями: **временной границей обучающей выборки (knowledge cutoff)** и склонностью к правдоподобным фактическим искажениям — **галлюцинациям (confabulation)**.

Архитектура **Retrieval-Augmented Generation (RAG)** решает эту проблему путем отделения долговременного хранилища знаний от параметрической памяти нейросети. Вместо попыток дообучить модель на всей внутренней документации компании, RAG извлекает релевантные фрагменты текстов из специализированного хранилища (чаще всего векторной базы данных) и динамически передает их в контекстное окно модели в момент выполнения запроса.

Однако переход от сырого прототипа к отказоустойчивому сервису корпоративного уровня требует строгой инженерной дисциплины. Наивный подход, при котором текст просто нарезается блоками по 1000 символов и отправляется в векторный индекс, приводит к потере контекста, искажению таблиц, попаданию шума в выборку и возникновению галлюцинаций из-за противоречивых фрагментов.

В этом руководстве мы разберем ключевые этапы построения надежного RAG-пайплайна: стратегию чанкинга с сохранением структуры, векторные метрики сходства, индексацию HNSW, гибридный поиск, реранкинг кросс-энкодерами и генерацию ответов с обязательным цитированием первоисточников.

---

## 1. Сквозная архитектура производственного RAG-пайплайна

Полноценная RAG-система разделена на два независимых асинхронных контура: **офлайн-пайплайн индексации** и **онлайн-цикл поиска и генерации**.

```
[ ОФЛАЙН-ПАЙПЛАЙН ИНДЕКСАЦИИ ]
Исходные документы (PDF, Markdown, HTML, корпоративная база)
       │
       ▼
Извлечение текста и нормализация
       │
       ▼
Структурный чанкинг (400–800 токенов, перекрытие 10–15%)
       │
       ▼
Генерация плотных эмбеддингов (text-embedding-3-small, 1536 dim)
       │
       ▼
Индексация в векторной БД (HNSW / полезная нагрузка с метаданными)

─────────────────────────────────────────────────────────────────

[ ОНЛАЙН-ЦИКЛ ПОИСКА И ГЕНЕРАЦИИ ]
Запрос пользователя
       │
       ▼
Предобработка и расширение запроса (HyDE и др.)
       │
       ▼
Гибридный поиск (косинусное сходство векторов + BM25 по ключевым словам)
       │
       ▼
Reciprocal Rank Fusion (RRF) ──> Топ-50 кандидатов
       │
       ▼
Реранкинг кросс-энкодером ──> Топ-4 проверенных фрагмента
       │
       ▼
Формирование контекста и разметка тегами цитирования
       │
       ▼
Фактическая генерация LLM (ссылки на [Source-N], отказ при нехватке данных)
```

---

## 2. Стратегии чанкинга (Chunking) документов

Качество поисковой выдачи напрямую ограничено качеством разбиения исходного текста. Слишком мелкие чанки теряют контекст, а слишком крупные размывают семантический вектор случайным шумом, снижая оценку сходства для точечных запросов.

### Сравнение стратегий чанкинга

| Стратегия | Целевой объем | Перекрытие | Преимущества | Недостатки и риски |
| :--- | :--- | :--- | :--- | :--- |
| **Фиксированное окно** | 256–512 токенов | 10–20% | Простота реализации, предсказуемые затраты | Разрывает предложения, абзацы и строки таблиц |
| **Рекурсивный разделитель** | 400–800 токенов | 50–100 токенов | Учитывает границы абзацев (`\n\n`) и предложений | Может разрезать вложенные списки и примеры кода |
| **Чанкинг по AST Markdown** | Динамический | Иерархия заголовков | Полностью сохраняет заголовки, таблицы и блоки кода | При глубокой структуре требует рекурсивного свертывания |
| **Семантический чанкинг** | Динамический | Отсутствует | Разбиение по скачкам семантического расстояния | Требует расчета эмбеддингов для каждого предложения |

### Реализация структурного чанкера для Markdown (TypeScript)

Для технической документации максимальную точность обеспечивает разбиение с сохранением иерархии заголовков Markdown:

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
 * Разбивает Markdown с учетом заголовков (#, ##, ###) и границ абзацев
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

## 3. Метрики векторного сходства и индексация HNSW

Модели эмбеддингов отображают текстовые фрагменты в многомерное непрерывное векторное пространство $\mathbb{R}^d$.

### Косинусное сходство vs Скалярное произведение (Dot Product)
- **Косинусное сходство**: Измеряет косинус угла между двумя векторами и не зависит от их абсолютной длины, что идеально при разном объеме фрагментов.
- **Скалярное произведение**: Если векторы предварительно нормализованы по норме L2 ($\|\mathbf{u}\|_2 = 1$), скалярное произведение математически эквивалентно косинусному сходству, но вычисляется значительно быстрее на векторных аппаратных инструкциях (AVX-512, NEON).

### Приближенный поиск ближайших соседей (ANN) и граф HNSW
Точный перебор (Exact k-NN) требует $O(N \cdot d)$ операций, что исключает возможность ответа за миллисекунды на базе из миллионов чанков. Векторные БД используют алгоритм **HNSW (Hierarchical Navigable Small World)**:

- **`M`**: Максимальное число связей на узел. Большие значения повышают полноту поиска (recall), но увеличивают потребление оперативной памяти.
- **`efConstruction`**: Размер очереди кандидатов при построении графа. Чем он выше, тем качественнее структура графа.
- **`efSearch`**: Глубина поиска в момент запроса. Позволяет гибко балансировать между точностью и задержкой.

---

## 4. Гибридный поиск и реранкинг кросс-энкодерами

Опора исключительно на семантические векторы часто приводит к пропуску точных соответствий (номеров моделей, параметров конфигурации, имен функций).

В промышленных системах применяется **гибридный поиск (Hybrid Search)**: параллельное выполнение **плотного векторного поиска** и **разреженного поиска по ключевым словам (BM25)** с последующим объединением через **Reciprocal Rank Fusion (RRF)**.

Объединенный пул кандидатов (топ-40) передается в модель **Cross-Encoder Reranker**, которая вычисляет сквозное внимание между запросом и каждым фрагментом, отсеивая до 90% нерелевантного информационного шума.

---

## 5. Полная реализация пайплайна генерации (TypeScript)

Ниже представлена готовая к эксплуатации функция RAG-инференса с пороговой фильтрацией и контролем галлюцинаций:

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
  // Шаг 1: Получение единично-нормализованного эмбеддинга запроса
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
    throw new Error(`Ошибка вычисления эмбеддинга: ${embeddingResponse.statusText}`);
  }

  const embeddingData = await embeddingResponse.json();
  const queryVector: number[] = embeddingData.data[0].embedding;

  // Шаг 2: Векторный поиск кандидатов
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

  // Шаг 3: Отсечение фрагментов ниже минимального порога сходства
  const MIN_SIMILARITY_SCORE = 0.65;
  const filteredChunks = candidates.filter(c => c.score >= MIN_SIMILARITY_SCORE);

  // Если релевантные документы не найдены, прерываем генерацию
  if (filteredChunks.length === 0) {
    return {
      answer: "В предоставленной корпоративной документации не найдено достаточных данных для ответа на поставленный вопрос.",
      citations: [],
      tokenUsage: { promptTokens: 0, completionTokens: 0 },
      refusal: true
    };
  }

  const selectedContext = filteredChunks.slice(0, 4);

  // Шаг 4: Формирование системного промпта с цитированием
  const contextBlock = selectedContext
    .map((chunk, idx) => `[Source-${idx + 1}] (${chunk.headingPath})\n${chunk.content}`)
    .join("\n\n---\n\n");

  const systemPrompt = `Вы — строгий ассистент по технической документации.
Отвечайте на вопрос пользователя ТОЛЬКО на основе приведенных проверенных фрагментов.
Правила:
1. Каждое утверждение должно сопровождаться указанием источника [Source-N].
2. Если в источниках нет ответа, ответьте: "В предоставленных материалах недостаточно данных для ответа."
3. Не придумывайте факты и не используйте внешние знания вне контекста.

ПРОВЕРЕННЫЕ ИСТОЧНИКИ:
${contextBlock}`;

  // Шаг 5: Генерация ответа через языковую модель
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
    throw new Error(`Ошибка генерации LLM: ${llmResponse.statusText}`);
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
    refusal: answerText.includes("недостаточно данных")
  };
}
```

---

## 6. Технический фактчек: устраняет ли RAG галлюцинации полностью?

Распространенное рекламное утверждение о том, что «RAG на 100% исключает галлюцинации нейросетей», **является технически недостоверным**.

RAG существенно снижает уровень дезинформации, однако порождает собственные сценарии сбоев:

1. **Ошибки извлечения (Retrieval Miss)**: Несовпадение формулировки вопроса и документа приводит к тому, что нужный чанк не попадает в выборку. Без запрета на фантазирование модель додумывает ответ.
2. **Проблема «Lost in the Middle»**: Внимание трансформеров концентрируется на начале и конце длинного контекста. При подаче десятков чанков факты из середины часто игнорируются.
3. **Конфликтующие версии документов**: Если в базу одновременно загружены спецификации v1 и v2, модель может синтезировать несуществующий гибридный API-метод.
4. **Сбои соответствия (Faithfulness Failure)**: Сильные предубеждения, заложенные на этапе предварительного обучения, могут заставить модель проигнорировать явные факты из контекста.

---

## 7. Заключение

Векторные базы данных и архитектура RAG служат надежным фундаментом для создания проверяемых и точных корпоративных сервисов. Грамотный чанкинг, гибридный поиск и фильтрация по порогу схожести позволяют развертывать ИИ-системы с прозрачным аудитом источников.

Для проектирования безопасного разделения данных изучите материал [Архитектурные паттерны мультиарендных SaaS-систем](/blog/multi-tenant-saas-architecture-patterns), а для адаптации модели под внутренний диалект кода ознакомьтесь с руководством [Тонкая настройка LLM для специализированных задач](/blog/fine-tuning-llms-domain-specific-tasks).
