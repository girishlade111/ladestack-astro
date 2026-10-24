---
title: "GB Coderの内部構造：ブラウザ完結型開発のためのデュアルエンジンアーキテクチャ"
description: "Monaco Editorの高度な構文解析と言語インテリジェンス、そしてゼロ遅延のサンドボックス実行を両立するGB Coderの独自アーキテクチャを詳細解説。"
locale: "ja"
slug: "gb-coder-dual-engine-architecture"
translationKey: "gb-coder-dual-engine-architecture"
author: "Girish Lade"
publishedAt: "2026-03-15"
updatedAt: "2026-03-20"
category: "Architecture"
tags: ["GB Coder", "アーキテクチャ", "JavaScript", "Monaco Editor", "WebAssembly", "Web IDE"]
coverImage: "/blog-covers/gb-coder-architecture.svg"
coverAlt: "GB Coder デュアルエンジン アーキテクチャ図"
draft: false
featured: true
relatedProduct: "GB Coder"
contentType: "architecture"
---

現代のブラウザベースのコードエディタは、重大な技術的課題に直面しています。開発者はVisual Studio Codeのような高度な構文ハイライト、コード補完、診断機能を求める一方で、メインのUIスレッドをブロックすることなく瞬時にライブプレビューが実行されることを期待しています。

LadeStackの主力Web統合開発環境である**GB Coder**の構築において、私たちは高コストで遅延の大きいクラウドコンテナモデルを採用せず、クライアントサイド中心の**デュアルエンジンアーキテクチャ（Dual-Engine Architecture）**を独自に設計しました。本記事では、GB CoderがどのようにMonaco Editor、隔離されたiframeサンドボックス、そしてRPCメッセージチャネルを統調させ、クライアントブラウザ内でミリ秒未満の高速実行ループを実現しているかを解説します。

---

## ブラウザ内IDEにおけるアーキテクチャの課題

従来のブラウザIDEは、大きく分けて2つのアプローチのいずれかに依存していました。

1. **リモートクラウド仮想マシン型:** ファイルの変更ごとにWebSocket経由でクラウド上のコンテナ（DockerやFirecracker microVMなど）にコードを転送します。完全なPOSIX互換性を得られる反面、ネットワーク往復遅延、多大なサーバーコスト、オフライン環境での利用不可という欠点があります。
2. **メインスレッド直接評価型:** 初歩的なプレイグラウンドツールに見られる手法で、`eval()`や無制約なDOM挿入を用いてトップレベルのコンテキスト内でコードを実行します。この場合、1つの`while(true)`無限ループによってブラウザタブ全体がフリーズし、未保存の作業データが消失するほか、深刻なクロスサイトスクリプティング（XSS）のリスクに晒されます。

GB Coderは、**言語インテリジェンス（静的エンジン）**と**ランタイム実行（動的サンドボックス）**を完全に分離することで、これら双方の課題を解決しています。

```
┌────────────────────────────────────────────────────────┐
│                   メインブラウザコンテキスト            │
│                                                        │
│  ┌─────────────────────────┐  postMessage (RPC)        │
│  │    Monaco Editor Core   │ ──────────────────────┐   │
│  │ (構文木 / AST / 静的検査)│                       │   │
│  └─────────────────────────┘                       │   │
└────────────────────────────────────────────────────┼───┘
                                                     │
                                                     ▼
┌────────────────────────────────────────────────────────┐
│               サンドボックス化されたiframeコンテキスト   │
│               sandbox="allow-scripts"                  │
│                                                        │
│  ┌─────────────────────────┐  Blob Object URL          │
│  │   仮想DOM & コンソール  │ ◄──────────────────────   │
│  │ (完全に独立したWindow)  │                           │
│  └─────────────────────────┘                           │
└────────────────────────────────────────────────────────┘
```

---

## エンジン 1: Monaco Editorと言語ワーカースレッド

エディタの入力サーフェスはMicrosoftのMonaco Editorエンジンをベースに構築され、専用のWeb Workers上で動作します。これにより、大規模な構文解析、括弧の一致確認、TypeScriptの抽象構文木（AST）バリデーションがメインの描画スレッドに干渉することはありません。

### Web Workerによるスレッド分離

Monacoの言語サービスは標準的なWeb Workerプールとして初期化されます。

```typescript
// Monaco言語ワーカープールの初期化設定
import * as monaco from 'monaco-editor';

self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: string, label: string): string {
    if (label === 'typescript' || label === 'javascript') {
      return '/workers/ts.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars') {
      return '/workers/html.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return '/workers/css.worker.bundle.js';
    }
    return '/workers/editor.worker.bundle.js';
  }
};
```

構文解析処理をバックグラウンドスレッドへオフロードすることにより、数千行に及ぶ単一ファイルであっても、GB Coderは常に滑らかな60 FPSのタイピング体験を維持します。

---

## エンジン 2: 隔離された実行コンテキスト

メインアプリケーションのセキュリティと安定性を損なうことなくライブ出力を描画するため、GB Coderは`<iframe>`コンテナの内部に動的なHTMLドキュメントを構築します。

### 厳格なサンドボックス権限設定

プレビューフレームは、HTML5 iframeのセキュリティ属性によって厳重に制限されています。

```html
<iframe
  id="gb-preview-frame"
  sandbox="allow-scripts allow-modals"
  csp="default-src 'self' 'unsafe-inline' blob: data:; img-src * data: blob:;"
  src="about:blank"
  title="GB Coder Live Execution Preview"
  aria-label="Live Execution Sandbox"
></iframe>
```

ここで重要な設計判断は、**`allow-same-origin`を意図的に除外している点**です。`allow-same-origin`を付与しないことで、実行フレームのオリジンは一意の不透明なオリジン（`null`）として扱われます。そのため、iframe内で悪意あるコードが実行されたとしても、以下のリソースにアクセスすることは不可能です。
- `ladestack.in`のローカルストレージやトークン
- クッキーや認証セッション情報
- IDEシェルやナビゲーションを構成する親DOMツリー

---

## 双方向RPC通信：コンソールのインターセプト

GB Coder内の統合ターミナルに実行時ログを表示するため、サンドボックス環境内でネイティブな`console`メソッドをフックし、ウィンドウ境界を越えてデータをシリアライズして転送します。

```javascript
// サンドボックス内に注入されるブートストラップスクリプト
(function installConsoleProxy() {
  const originalLog = console.log;
  const originalError = console.error;

  function serialize(data) {
    try {
      return JSON.parse(JSON.stringify(data));
    } catch (e) {
      return String(data);
    }
  }

  console.log = function (...args) {
    window.parent.postMessage({
      type: 'GB_CODER_CONSOLE_EVENT',
      level: 'log',
      payload: args.map(serialize),
      timestamp: Date.now()
    }, '*');
    originalLog.apply(console, args);
  };

  console.error = function (...args) {
    window.parent.postMessage({
      type: 'GB_CODER_CONSOLE_EVENT',
      level: 'error',
      payload: args.map(serialize),
      timestamp: Date.now()
    }, '*');
    originalError.apply(console, args);
  };
})();
```

ホスト側のメインアプリケーションは、メッセージの送信元要素とデータ構造を厳格に検証した上で、デバッグターミナルにログを追加します。

```typescript
window.addEventListener('message', (event: MessageEvent) => {
  // イベントの送信元がプレビュー用iframe要素と一致することを検証
  const previewFrame = document.getElementById('gb-preview-frame') as HTMLIFrameElement;
  if (!previewFrame || event.source !== previewFrame.contentWindow) {
    return;
  }

  const { type, level, payload } = event.data ?? {};
  if (type === 'GB_CODER_CONSOLE_EVENT') {
    appendTerminalMessage(level, payload);
  }
});
```

---

## アーキテクチャ比較表

| 評価項目 | 従来のクラウドIDE (Docker) | メインスレッド直接Eval | GB Coder デュアルエンジン |
|:---|:---:|:---:|:---:|
| **実行遅延** | 300ms 〜 1200ms（通信経由） | 1ms未満（極めて危険） | **2ms未満（ローカルメモリ）** |
| **オフライン動作** | ❌ インターネット接続必須 | ⚠️ 不安定 | **✅ コアエディタとサンドボックスはオフライン動作** |
| **クラッシュ保護** | ✅ ホスト保護あり | ❌ ブラウザ全体がフリーズ | **✅ iframe隔離により完全保護** |
| **コードのプライバシー**| ⚠️ クラウドVMへコード送信 | ✅ ローカル完結 | **✅ ローカル計算（サーバーへのコード送信なし）** |
| **ユーザーあたりサーバー費用** | 月額 $5 〜 $25 | $0 | **$0（クライアント計算資源）** |

---

## IndexedDBによる安全な状態永続化

誤ったタブ閉じやOSの再起動から開発者の作業を守るため、GB Coderは揮発性のメモリスコアを排除し、300msのデバウンス処理を施してプロジェクト状態をブラウザ内のIndexedDBへ自動保存します。

```typescript
import { openDB } from 'idb';

const DB_NAME = 'gb_coder_workspace';
const STORE_NAME = 'project_files';

export async function persistActiveBuffer(filename: string, content: string): Promise<void> {
  const db = await openDB(DB_NAME, 1, {
    upgrade(database) {
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'filename' });
      }
    }
  });

  await db.put(STORE_NAME, {
    filename,
    content,
    updatedAt: Date.now()
  });
}
```

---

## まとめと製品へのアクセス

デュアルエンジンアーキテクチャは、プロフェッショナルな開発体験を提供するために膨大なクラウドサーバー群を運用する必要がないことを実証しています。Monaco Web Workersによる構文解析と、不透明オリジンのiframeサンドボックスによる実行隔離を組み合わせることで、GB Coderは優れたレスポンス、完全なプライバシー保護、そしてゼロインフラコストを両立させました。

GB Coderの動作を実際に体験するには、[LadeStackのGB Coder紹介ページ](/ja/gb-coder)をご覧いただくか、[code.ladestack.in](https://code.ladestack.in/)から直接IDEを起動してください。その他の開発リファレンスについては[公式ドキュメント](/ja/docs)でご確認いただけます。
