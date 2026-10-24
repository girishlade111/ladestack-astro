---
title: "Créer des applications RAG avec des bases de données vectorielles : ingestion, découpage et architecture de recherche"
description: "Guide architectural complet pour concevoir des systèmes de génération augmentée de récupération (RAG) en production avec bases vectorielles, recherche hybride et réévaluation."
locale: "fr"
slug: "building-rag-applications-vector-databases"
translationKey: "building-rag-applications-vector-databases"
author: "Girish Lade"
publishedAt: "2024-07-08"
updatedAt: "2026-10-24"
category: "Generative AI"
tags:
  - "RAG"
  - "Bases de données vectorielles"
  - "Pinecone"
  - "Embeddings"
  - "LLM"
  - "Recherche sémantique"
coverImage: "/blog-covers/ai-code-generation.svg"
coverAlt: "Schéma d'architecture RAG pour LLM : ingestion de documents, indexation vectorielle, recherche par similarité et augmentation du contexte"
draft: false
featured: false
relatedProduct: "GB Coder"
contentType: "tutorial"
---

# Créer des applications RAG avec des bases de données vectorielles : ingestion, découpage et architecture de recherche

Les grands modèles de langage (LLM) excellent dans la synthèse linguistique et le raisonnement généraliste. Toutefois, lorsqu'ils sont déployés au sein d'applications d'entreprise, les modèles de fondation rencontrent deux limites structurelles : la **date limite de leurs données d'apprentissage (knowledge cutoff)** et la tendance à formuler des affirmations plausibles mais factuellement inexactes, qualifiées **d'hallucinations (confabulation)**.

L'architecture **Retrieval-Augmented Generation (RAG)** résout ce défi en dissociant la mémoire de stockage de connaissances de la mémoire paramétrique du modèle. Plutôt que d'imposer au LLM la mémorisation exhaustive des bases documentaires internes, le système RAG extrait dynamiquement les passages pertinents depuis un système d'information spécialisé — le plus souvent une base de données vectorielle — et les injecte dans la fenêtre de contexte au moment de l'inférence.

Cependant, faire évoluer un pipeline RAG d'un simple prototype à un service d'entreprise hautement fiable exige une rigueur architecturale poussée. Un découpage naïf scindant arbitrairement le texte tous les 1 000 caractères combiné à une recherche vectorielle élémentaire produit inévitablement des pertes de contexte, des tables tronquées, un bruit documentaire excessif et des réponses incohérentes.

Ce tutoriel détaille l'ensemble des couches d'un système RAG en production : de l'ingestion structurelle et des stratégies de découpage (chunking) aux métriques de similarité vectorielle, en passant par le réordonnancement par encodeur croisé (reranking) et la génération de réponses strictement justifiées par des citations vérifiables.

---

## 1. Architecture globale d'un pipeline RAG en production

Un système RAG robuste repose sur deux cycles asynchrones et découplés : le **pipeline d'ingestion et d'indexation hors ligne** et la **boucle de recherche et de génération en ligne**.

```
[ PIPELINE D'INGESTION HORS LIGNE ]
Documents sources (PDF, Markdown, HTML, bases documentaires)
       │
       ▼
Extraction de texte et normalisation
       │
       ▼
Découpage structurel (400–800 tokens, chevauchement de 10–15 %)
       │
       ▼
Génération d'embeddings denses (text-embedding-3-small, 1536 dim)
       │
       ▼
Indexation vectorielle (graphe HNSW / métadonnées documentaires)

─────────────────────────────────────────────────────────────────

[ BOUCLE DE RECHERCHE ET DE GÉNÉRATION EN LIGNE ]
Requête utilisateur
       │
       ▼
Prétraitement et expansion sémantique de la requête
       │
       ▼
Recherche hybride (similarité cosinus dense + mots-clés BM25)
       │
       ▼
Fusion par rang réciproque (RRF) ──> Top 50 candidats
       │
       ▼
Réordonnancement par encodeur croisé (Cross-Encoder) ──> Top 4 passages
       │
       ▼
Assemblage du contexte et injection des balises de citation
       │
       ▼
Génération factuelle par le LLM (citations [Source-N], refus si manque de preuves)
```

---

## 2. Ingestion documentaire et stratégies de découpage (Chunking)

La précision globale de la recherche dépend directement de la pertinence de la stratégie de découpage. Un segment trop court perd son contexte explicatif ; un segment trop volumineux dilue l'information dans un vecteur d'embedding moyen, diminuant le score de similarité lors des requêtes pointues.

### Comparaison des approches de découpage

| Stratégie | Objectif de tokens | Chevauchement | Points forts | Risques et compromis |
| :--- | :--- | :--- | :--- | :--- |
| **Fenêtre glissante fixe** | 256–512 tokens | 10–20 % | Implémentation triviale, calcul prévisible | Tronque arbitrairement phrases, paragraphes et tableaux |
| **Séparateur de caractères récursif** | 400–800 tokens | 50–100 tokens | Préserve la structure naturelle des paragraphes (`\n\n`) | Peut scinder des listes imbriquées ou du code |
| **Découpage structurel Markdown** | Dynamique | Chemin d'en-tête | Conserve l'arborescence, les blocs de code et tableaux | Nécessite une agrégation pour les sections très profondes |
| **Découpage sémantique** | Dynamique | Aucun | Se base sur les ruptures de distance d'embedding | Coûteux en calcul lors de l'ingestion initiale |

### Implémentation d'un découpeur Markdown structurel (TypeScript)

Pour la documentation technique, le découpage qui préserve la hiérarchie des en-têtes Markdown offre les meilleurs résultats en production :

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
 * Découpe un document Markdown en respectant les en-têtes (#, ##, ###) et les paragraphes
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

## 3. Similarité vectorielle et indexation HNSW

Les modèles d'embeddings projettent les fragments de texte dans un espace vectoriel continu de dimension élevée.

### Similarité cosinus vs produit scalaire (Dot Product)
- **Similarité cosinus** : Mesure le cosinus de l'angle entre deux vecteurs, indépendamment de leur norme, convenant parfaitement aux passages de longueurs inégales.
- **Produit scalaire** : Lorsque les vecteurs sont préalablement normalisés selon la norme L2 ($\|\mathbf{u}\|_2 = 1$), le produit scalaire est mathématiquement identique à la similarité cosinus tout en s'exécutant beaucoup plus vite sur les processeurs modernes grâce aux instructions vectorielles (AVX-512).

### Recherche approximative des plus proches voisins (ANN) et HNSW
Parcourir séquentiellement des millions de vecteurs présente une complexité prohibitive de $O(N \cdot d)$. L'algorithme **HNSW (Hierarchical Navigable Small World)** construit un graphe multicouche assurant une recherche logarithmique performante :

- **`M`** : Nombre maximal de liaisons bidirectionnelles par nœud.
- **`efConstruction`** : Profondeur de la liste de candidats explorée lors de la construction de l'index.
- **`efSearch`** : Profondeur d'exploration lors de la requête en ligne, permettant d'ajuster le compromis entre latence et rappel.

---

## 4. Recherche hybride et réévaluation par encodeur croisé (Cross-Encoder)

Se limiter aux seuls vecteurs denses expose à des défaillances sur les **mots-clés exacts, les identifiants techniques ou les numéros de version**.

L'architecture préconisée associe en parallèle la **recherche vectorielle sémantique dense** et la **recherche lexicale creuse BM25**, combinées via la méthode **Reciprocal Rank Fusion (RRF)**.

Les 40 à 50 meilleurs candidats sont ensuite réordonnés par un **encodeur croisé (Cross-Encoder Reranker)** qui calcule une attention croisée complète entre la question et chaque passage, éliminant les documents non pertinents avant la synthèse.

---

## 5. Implémentation du pipeline RAG complet (TypeScript)

Voici une implémentation prête pour la production utilisant Pinecone et OpenAI, avec filtrage par seuil de confiance et gestion explicite du refus en cas d'absence de source probante :

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
  // 1. Calcul du vecteur d'embedding normalisé de la requête
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
    throw new Error(`Erreur API d'embedding : ${embeddingResponse.statusText}`);
  }

  const embeddingData = await embeddingResponse.json();
  const queryVector: number[] = embeddingData.data[0].embedding;

  // 2. Requête dans la base de données vectorielle
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

  // 3. Filtrage des passages sous le seuil de similarité minimal
  const MIN_SIMILARITY_SCORE = 0.65;
  const filteredChunks = candidates.filter(c => c.score >= MIN_SIMILARITY_SCORE);

  // Si aucun passage n'est suffisamment concluant, refus immédiat pour éviter toute hallucination
  if (filteredChunks.length === 0) {
    return {
      answer: "Les documents de référence fournis ne contiennent pas d'informations suffisantes pour répondre à cette question.",
      citations: [],
      tokenUsage: { promptTokens: 0, completionTokens: 0 },
      refusal: true
    };
  }

  const selectedContext = filteredChunks.slice(0, 4);

  // 4. Construction du prompt système avec contrainte stricte de citation
  const contextBlock = selectedContext
    .map((chunk, idx) => `[Source-${idx + 1}] (${chunk.headingPath})\n${chunk.content}`)
    .join("\n\n---\n\n");

  const systemPrompt = `Vous êtes un assistant documentaire technique rigoureux.
Répondez à la question de l'utilisateur UNIQUEMENT à partir des extraits vérifiés ci-dessous.
Règles strictes :
1. Chaque affirmation factuelle doit être assortie d'un renvoi explicite [Source-N].
2. Si la documentation fournie ne contient pas l'élément de réponse, indiquez : "Les documents fournis ne contiennent pas suffisamment d'informations pour répondre."
3. N'extrapolez pas et n'introduisez aucune supposition extérieure aux extraits fournis.

DOCUMENTS VÉRIFIÉS :
${contextBlock}`;

  // 5. Synthèse de la réponse par le LLM
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
    throw new Error(`Erreur lors de la génération : ${llmResponse.statusText}`);
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
    refusal: answerText.includes("pas suffisamment d'informations")
  };
}
```

---

## 6. Analyse factuelle : le RAG élimine-t-il totalement les hallucinations ?

L'affirmation courante prétendant que « déployer un système RAG élimine à 100 % les hallucinations des LLM » est **techniquement inexacte**.

Bien que le RAG réduise considérablement les confabulations en ancrant le modèle dans des faits concrets, il introduit des modes de défaillance spécifiques :

1. **Échec d'extraction (Retrieval Miss)** : Si la question de l'utilisateur diverge du vocabulaire des documents, le passage idoine n'est pas remonté. Sans consigne de refus explicite, le modèle génère des affirmations fantaisistes.
2. **Perte d'attention centrale (Lost in the Middle)** : Les modèles portent une attention disproportionnée au début et à la fin des contextes longs. L'injection d'un trop grand nombre d'extraits amène le LLM à ignorer les faits situés au milieu.
3. **Pollution par documents obsolètes** : Si la base vectorielle contient à la fois les spécifications d'une API v1 et d'une version v2, le modèle peut fusionner les paramètres et générer une méthode inexistante.
4. **Biais de fidélité (Faithfulness Failure)** : Lorsqu'un fait documenté contredit frontalement un schéma fortement ancré dans le pré-entraînement du modèle, ce dernier peut ignorer l'extrait fourni pour favoriser son a priori.

---

## 7. Conclusion

Les bases de données vectorielles et le RAG constituent le socle de toute application IA d'entreprise digne de confiance. En combinant un découpage structurel, une recherche hybride et des consignes d'ancrage sans ambiguïté, les équipes d'ingénierie peuvent concevoir des systèmes prédictifs vérifiables et auditables.

Pour poursuivre votre exploration architecturale, consultez nos guides sur [les modèles d'architecture SaaS multi-locataires](/blog/multi-tenant-saas-architecture-patterns) et sur [le fine-tuning de LLM pour des tâches spécialisées](/blog/fine-tuning-llms-domain-specific-tasks).
