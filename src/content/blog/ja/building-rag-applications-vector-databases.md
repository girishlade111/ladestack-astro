---
title: "ベクトルデータベースを活用したRAGアプリケーション構築：データ取り込み、チャンク分割、検索アーキテクチャ"
description: "ベクトルデータベース、ハイブリッド検索、リランキング、引用検証を組み合わせた本番対応の検索拡張生成（RAG）システムの完全設計ガイド。"
locale: "ja"
slug: "building-rag-applications-vector-databases"
translationKey: "building-rag-applications-vector-databases"
author: "Girish Lade"
publishedAt: "2024-07-08"
updatedAt: "2026-10-24"
category: "Generative AI"
tags:
  - "RAG"
  - "ベクトルデータベース"
  - "Pinecone"
  - "埋め込み"
  - "LLM"
  - "セマンティック検索"
coverImage: "/blog-covers/ai-code-generation.svg"
coverAlt: "LLM向けドキュメント取り込み、ベクトルインデックス作成、類似度検索、コンテキスト拡張を示すアーキテクチャ図"
draft: false
featured: false
relatedProduct: "GB Coder"
contentType: "tutorial"
---

# ベクトルデータベースを活用したRAGアプリケーション構築：データ取り込み、チャンク分割、検索アーキテクチャ

大規模言語モデル（LLM）は、一般的な知識の要約や自然なテキスト生成において極めて強力な能力を発揮します。しかし、企業の基幹業務システムに導入する際、基底モデルは2つの本質的な課題に直面します。**知識の更新カットオフ（時間的制約）**と、モデル内部の確率分布に基づいてもっともらしい嘘を出力してしまう**幻覚（ハルシネーション / Confabulation）**です。

**検索拡張生成（RAG: Retrieval-Augmented Generation）**は、モデルパラメータによる暗記から知識の保管を分離することで、この課題を解決します。社内マニュアルやデータベースの全知識をLLMに学習させるのではなく、外部の専門的な情報検索システム（主にベクトルデータベース）から関連する文書の断片（パッセージ）を検索し、推論時のプロンプトへ動的に注入します。

しかし、RAGシステムをPoC（概念実証）から本番環境の信頼できるサービスへとスケールさせるには、綿密なアーキテクチャ設計が不可欠です。単純に1,000文字ごとにテキストを機械的に分割してベクトル検索を行うような素朴な実装では、文脈の喪失、表データの切断、無関係なノイズの混入、そして矛盾した情報によるハルシネーションといった障害が頻発します。

本記事では、ドキュメントの構造化取り込み、チャンク分割戦略、密ベクトル埋め込みと類似度計算、クロスエンコーダによるリランキング、そして正確な引用根拠を持つ回答生成まで、本番水準のRAGパイプラインを徹底解説します。

---

## 1. エンドツーエンドのRAGアーキテクチャ

本番水準のRAGシステムは、**オフラインの取り込み・インデックス作成パイプライン**と、**オンラインの検索・生成ループ**という2つの非同期ライフサイクルで構成されます。

```
[ オフライン取り込みパイプライン ]
未加工ドキュメント (PDF, Markdown, HTML, 社内Wiki)
       │
       ▼
テキスト抽出 & 正規化
       │
       ▼
構造認識型チャンク分割 (400〜800トークン, 10〜15%オーバーラップ)
       │
       ▼
密ベクトル埋め込み生成 (text-embedding-3-small, 1536次元)
       │
       ▼
ベクトルデータベースへのインデックス登録 (HNSW / メタデータ付与)

─────────────────────────────────────────────────────────────────

[ オンライン検索 & 生成ループ ]
ユーザーからの問い合わせクエリ
       │
       ▼
クエリ前処理 & 拡張
       │
       ▼
ハイブリッド検索 (密ベクトルコサイン類似度 + BM25疎キーワード検索)
       │
       ▼
逆順位融合 (RRF: Reciprocal Rank Fusion) ──> 上位50候補
       │
       ▼
クロスエンコーダによるリランキング ──> 最適な上位4チャンク抽出
       │
       ▼
コンテキスト組み立て & 引用境界タグの付与
       │
       ▼
事実に基づいたLLM推論 (出典元引用の強制と未情報時の回答拒否)
```

---

## 2. ドキュメント取り込みとチャンク分割戦略

検索の精度は、チャンク分割の品質によって決定づけられます。チャンクが小さすぎると前後の文脈が失われ、逆に大きすぎると密ベクトルが余計な情報で希釈され、ターゲットクエリに対する類似度スコアが低下します。

### 主なチャンク分割戦略の比較

| 戦略 | 目標トークン数 | オーバーラップ | メリット | デメリット・注意点 |
| :--- | :--- | :--- | :--- | :--- |
| **固定長スライディングウィンドウ** | 256〜512 | 10〜20% | 実装が容易、計算コストが予測可能 | 文や段落、表の行を途中で分断しやすい |
| **再帰的文字分割** | 400〜800 | 50〜100 | 段落（`\n\n`）や文境界（`. `）を尊重 | 入れ子構造や手順付きコードブロックを分断するリスク |
| **Markdown / 構造認識型分割** | セクション毎に可変 | 見出しの階層情報 | 見出しパス、コードブロック、表の整合性を完全維持 | 階層が深すぎる文書では再帰的ロールアップが必要 |
| **セマンティック類似度分割** | 可変 | なし | 文ごとの埋め込み変化点をもとに分割、意味的一貫性が高い | 取り込み時に全文章の埋め込み推論が必要で計算負荷大 |

### 構造認識型Markdownチャンカーの実装（TypeScript）

技術マニュアルやドキュメントベースでは、見出しの階層構造をメタデータとして保持する構造認識型チャンキングが最も高い検索精度を発揮します。

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
 * 見出し（#, ##, ###）と段落境界を尊重してMarkdownテキストを分割する関数
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

    // トークン数の簡易見積もり: 英語1トークン≒4文字
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
      // 巨大なセクションは段落単位で分割
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

          // オーバーラップ保持のため直前の段落を引き継ぎ
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

## 3. ベクトル類似度計算とHNSWインデックス

埋め込みモデルは、テキストを数千次元の高次元実数ベクトル空間へ写像します。

### 距離メトリクス：コサイン類似度 vs 内積（Dot Product）
- **コサイン類似度**: 2つのベクトルのなす角のコサインを測定。テキスト長によるベクトルの絶対値の差を正規化するため、長さの異なる文書断片の比較に最適です。
- **内積（Dot Product）**: ベクトルをあらかじめL2ノルムで単位正規化（$\|\mathbf{u}\|_2 = 1$）しておけば、内積の計算結果はコサイン類似度と完全に一致します。平方根計算が不要なため、データベースのハードウェアアクセラレーションを活用して最速で計算可能です。

### 近似最近傍探索（ANN）とHNSWパラメータ
数百万件規模のベクトルコレクションに対して全件スキャン（Exact k-NN）を行うと、計算量が $O(N \cdot d)$ となり実用的な応答速度を維持できません。そのため、**HNSW（Hierarchical Navigable Small World）**アルゴリズムが採用されます。

- **`M`**: 各ノードが持つ双方向リンクの最大数。値を大きくすると再現率が向上しますが、メモリ消費量が増加します。
- **`efConstruction`**: インデックス構築時の探索候補リストのサイズ。大きな値を指定すると高品質なグラフが生成されます。
- **`efSearch`**: クエリ実行時の候補探索サイズ。実行時のレイテンシと再現率のトレードオフを微調整します。

---

## 4. ハイブリッド検索とクロスエンコーダによるリランキング

密ベクトル検索のみに依存すると、**専門用語や製品型番の完全一致を見落とす**という弱点が生じます。

実運用では、意味的ニュアンスを捉える**密ベクトル検索**と、厳密な単語一致を捉える**BM25疎キーワード検索**を並行して実行し、**相互順位融合（RRF: Reciprocal Rank Fusion）**で候補を統合します。

さらに、統合された上位候補（例：上位40件）を**クロスエンコーダ（Cross-Encoder Reranker）**に渡し、クエリと文書の単語間相互作用を全層で計算することで、最も関連性の高い上位4〜5件を厳選します。

---

## 5. 本番対応のRAGパイプライン実装（TypeScript）

以下は、PineconeとOpenAIを活用した本番対応のRAGパイプライン実装です。類似度閾値によるフィルタリングと、情報不足時の明示的な回答拒否ロジックを備えています。

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
  // ステップ 1: クエリの単位正規化埋め込みベクトルを生成
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
    throw new Error(`埋め込みAPIエラー: ${embeddingResponse.statusText}`);
  }

  const embeddingData = await embeddingResponse.json();
  const queryVector: number[] = embeddingData.data[0].embedding;

  // ステップ 2: ベクトルデータベースから上位候補を検索
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

  // ステップ 3: 最小類似度閾値未満の低品質チャンクを除外
  const MIN_SIMILARITY_SCORE = 0.65;
  const filteredChunks = candidates.filter(c => c.score >= MIN_SIMILARITY_SCORE);

  // 確信度の高い文書が存在しない場合は即座に回答を辞退（ハルシネーション防止）
  if (filteredChunks.length === 0) {
    return {
      answer: "提供された技術文書内に関連情報が見つかりませんでした。検索条件を満たす根拠文書が存在しません。",
      citations: [],
      tokenUsage: { promptTokens: 0, completionTokens: 0 },
      refusal: true
    };
  }

  const selectedContext = filteredChunks.slice(0, 4);

  // ステップ 4: 引用識別タグを付与したコンテキストプロンプトを構築
  const contextBlock = selectedContext
    .map((chunk, idx) => `[Source-${idx + 1}] (${chunk.headingPath})\n${chunk.content}`)
    .join("\n\n---\n\n");

  const systemPrompt = `あなたは厳格な技術ドキュメントアシスタントです。
以下の検証済みソース文書のみを使用して、ユーザーの質問に回答してください。
遵守すべき規則:
1. すべての事実記述には、文末に対応する引用表記 [Source-N] を付与すること。
2. 文書内に十分な根拠情報が含まれていない場合は、「ドキュメント内に該当する十分な情報がありません」と回答すること。
3. 提供された文書の外にある推測や一般知識を勝手に混入させないこと。

検証済みソース:
${contextBlock}`;

  // ステップ 5: LLMによる推論実行
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
    throw new Error(`LLM生成エラー: ${llmResponse.statusText}`);
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
    refusal: answerText.includes("十分な情報がありません")
  };
}
```

---

## 6. 技術的な事実検証：RAGはハルシネーションを完全に排除できるか？

AI業界のマーケティングにおいて、「ベクトルデータベースを導入してRAGを組めばハルシネーションは完全にゼロになる」という主張が散見されます。

**この主張は技術的に誤りです。**

RAGはモデルの回答を検索されたテキストに根拠付けることでハルシネーションを劇的に抑制しますが、完全な排除は不可能であり、特有の新たな失敗モードが存在します。

1. **検索漏れ（Retrieval Miss）**: ユーザーの質問と文書表現の乖離により、必要な情報を持つチャンクが検索されなかった場合、厳格な回答拒否を設けていないとモデルは内部の記憶から嘘を補填します。
2. **コンテキストの希釈と「Lost in the Middle」**: トランスフォーマーの注意機構は、長大なプロンプトの中央部分にある情報を無視しやすい傾向があります。大量のチャンクを流し込むと、中央にある重要情報が見落とされます。
3. **矛盾する文書の取り込み**: システム内に古いv1のドキュメントと最新のv2のドキュメントが混在していると、両方が検索され、モデルが2つの仕様を勝手に混ぜ合わせた架空のコードを生成してしまいます。
4. **コンテキスト軽視（Faithfulness Failure）**: 文書内に正しい記述があるにもかかわらず、事前学習時の強力なバイアスに引きずられてモデルが文書の内容を歪めてしまう現象です。

---

## 7. まとめ

ベクトルデータベースと検索拡張生成（RAG）は、信頼性の高い企業向けAIシステムを構築するための不可欠な土台です。構造認識型のチャンク分割、ハイブリッド検索、リランキング、そして厳格なプロンプト規律を組み合わせることで、検証可能な引用根拠を持った回答システムを実現できます。

マルチテナント環境でのデータ分離については、当ブログの[マルチテナントSaaSアーキテクチャパターン](/blog/multi-tenant-saas-architecture-patterns)を、モデルの振る舞い自体のカスタマイズについては[ドメイン特化タスクのためのLLMファインチューニング](/blog/fine-tuning-llms-domain-specific-tasks)も併せてご覧ください。
