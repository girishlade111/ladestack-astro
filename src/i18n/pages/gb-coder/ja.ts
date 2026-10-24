import type { GbCoderPageData } from './types';

export const ja: GbCoderPageData = {
  seo: {
    title: 'GB Coder — ブラウザ内IDE・開発スタジオ | LadeStack',
    description: 'GB CoderでWebコードを即座に構築、実行、プレビュー。Monaco Editor、リアルタイムDOMプレビュー、WebContainer Node.js実行、ローカル優先プライバシー。完全無料。',
    ogTitle: 'GB Coder — ブラウザ内IDE・開発スタジオ | LadeStack',
    ogDescription: 'GB CoderでWebコードを即座に構築、実行、プレビュー。Monaco Editor、リアルタイムDOMプレビュー、WebContainer Node.js実行、ローカル優先プライバシー。完全無料。',
  },
  hero: {
    badge: 'ブラウザ第一主義の開発スタジオ',
    titleLine: 'ブラウザの中で、コードを即座に',
    titleHighlight: '構築・実行・出荷。',
    description: 'GB Coderは、Monaco Editorとデュアル実行エンジンを統合：あらゆる最新ブラウザで即座に動作する静的Webプロトタイピングと、WebContainerによるメモリ内フルスタックNode.js環境を提供します。',
    ctaStudio: 'GB Coder Studioを起動',
    ctaProjects: 'WebContainer IDEを起動',
    trustBadges: [
      'クライアント完結のプライバシー',
      'ミリ秒未満の高速コンパイル',
      '完全無料 · 課金なし',
    ],
  },
  environments: {
    eyebrow: 'デュアル実行アーキテクチャ',
    title: '用途に特化した2つのコーディングエンジン',
    description: 'ワークフローに最適なランタイムを選択：超高速な静的プロトタイピング、またはブラウザ内での完全なNode.js開発環境。',
    staticCard: {
      badge: 'ユニバーサルブラウザ対応',
      engine: '即時クライアントサンドボックス',
      title: '静的 & マルチファイルプロトタイピング',
      description: 'HTML5、CSS3、JavaScriptの環境構築不要なコーディング。リアルタイムDOM同期、構文ハイライト、保存時フォーマット、CDNスクリプト注入を備えたMonacoエディタ。',
      features: [
        '入力と同時にミリ秒未満でDOMを同期',
        '外部CDNライブラリの注入（Tailwind、Lucide、Bootstrap等）',
        '最新のデスクトップおよびモバイルブラウザで動作',
      ],
      status: 'ビルド待ち時間ゼロ',
      cta: 'プロトタイピングを開始',
    },
    webContainerCard: {
      badge: 'フルスタックマイクロOS',
      engine: 'ブラウザ内Node.js',
      title: '高度なWebContainer IDE',
      description: 'ブラウザメモリ内で直接動作するフルスタックNode.js環境。npm installの実行、パッケージスクリプト、Vite開発サーバーの起動、ReactおよびVueスターターに対応。',
      features: [
        'Node.jsランタイムの実行とnpmパッケージのインストール',
        'ホットモジュールリロード対応のReact & Vueテンプレート',
        'SharedArrayBufferとWeb Workerによる独立サンドボックス',
      ],
      status: 'Chromium & Firefox対応',
      cta: 'WebContainer IDEを起動',
    },
  },
  pillars: {
    eyebrow: '機能の柱',
    title: '高精度・高速性・プライバシーのためのエンジニアリング',
    description: 'GB Coderのすべての機能は、ブラウザ内で本格的な開発体験を提供するために設計されています。',
    items: [
      {
        icon: 'code-2',
        title: 'Monaco Code Editor',
        badge: 'VS Codeエンジン',
        description: 'VS Codeで採用されている業界標準のエディタ。TypeScript構文検証、自動補完、マルチカーソル編集、括弧一致、コード折りたたみを備えています。',
      },
      {
        icon: 'eye',
        title: '即時ライブプレビュー',
        badge: '同期型DOM',
        description: 'タイピングと同時にHTML、CSS、モダンJavaScriptを即座にレンダリング。独立した別ウィンドウプレビューやローカルネットワーク用モバイルQRコード検証も付属。',
      },
      {
        icon: 'cpu',
        title: 'WebContainerマイクロOS',
        badge: 'メモリ内Node.js',
        description: '本物のNode.jsプロセスを実行し、npmスクリプトを走らせ、Vite開発サーバーを起動し、ReactやVueの本格的な開発をブラウザメモリ内で完結。',
      },
      {
        icon: 'shield-check',
        title: 'ローカル優先の永続化',
        badge: 'クライアントサイド完結',
        description: 'ワークスペースはお手元の端末のIndexedDBに安全に保存されます。強制的なアカウント登録やサーバーへのテレメトリ送信は一切ありません。',
      },
      {
        icon: 'layers',
        title: 'マルチファイル構造',
        badge: 'モジュラー構成',
        description: 'すっきりとしたファイルエクスプローラーとタブ管理により、複数のファイルやディレクトリにまたがる複雑なWebコンポーネントを整理可能。',
      },
      {
        icon: 'download',
        title: '安全なプロジェクトバックアップ',
        badge: 'ZIPアーカイブ',
        description: 'いつでも完全なディレクトリ構造を保持したままZIP形式でエクスポート可能。ワンクリックのインポートで過去のプロジェクトを復元できます。',
      },
    ],
  },
  guardrails: {
    eyebrow: '技術的ガードレールと境界',
    title: 'WebContainerランタイムとブラウザ互換性',
    desc1: 'GB Coderは、SharedArrayBufferおよびクロスオリジン分離（COOP/COEP）をサポートするモダンブラウザ上でWebContainerを活用し、本格的なNode.jsプロセスを実行します。',
    desc2: '軽量なプロトタイピングや、WebContainerの分離ヘッダーに制約がある環境（Apple Safariを含む）では、外部依存ゼロの静的エディタが即時フォールバックとして機能し、快適なコーディングを保証します。',
    supportedHeading: '対応環境',
    environments: [
      { browser: 'Google Chrome', support: 'WebContainer + 静的エディタ', highlight: true },
      { browser: 'Microsoft Edge', support: 'WebContainer + 静的エディタ', highlight: true },
      { browser: 'Brave Browser', support: 'WebContainer + 静的エディタ', highlight: true },
      { browser: 'Mozilla Firefox', support: 'WebContainer (COOP/COEP)', highlight: true },
      { browser: 'Apple Safari', support: '静的エディタモード', highlight: false },
    ],
  },
  faqs: {
    eyebrow: '技術Q&A',
    title: 'よくある質問',
    description: 'GB Coderの機能、アーキテクチャ、ランタイム境界に関する明確で誠実な回答。',
    items: [
      {
        q: 'GB Coderはリモートサーバーなしでどのようにフルスタックコードを実行するのですか？',
        a: 'GB CoderはWebContainer技術を採用しており、SharedArrayBufferとクロスオリジン分離（COOP/COEP）を用いて、ブラウザタブ内で本物のNode.jsプロセスとWebAssemblyを実行します。開発サーバーやビルド処理はすべてローカルPCのハードウェア上で直接動作します。',
      },
      {
        q: '静的エディタとWebContainer IDEの違いは何ですか？',
        a: '静的マルチファイルエディタは、HTML、CSS、JavaScriptをすべてのモダンブラウザで待機時間なくDOMレンダリングします。高度なWebContainer IDEは、Node.jsのパッケージマネージャー、npmスクリプト、ReactやVueなどのフロントエンドフレームワークを実行します。',
      },
      {
        q: 'ソースコードやプロジェクトがLadeStackのサーバーにアップロードされることはありますか？',
        a: 'いいえ。GB Coderは厳格なローカルファーストモデルで動作します。コード、アセット、作業状態はお使いのブラウザのIndexedDBに直接保存されます。LadeStackがリモートサーバーにプロジェクトコードを保存・追跡することはありません。',
      },
      {
        q: 'GB Coderをサポートしているブラウザは何ですか？',
        a: '静的マルチファイルエディタは、Apple Safari、Google Chrome、Microsoft Edge、Mozilla Firefoxを含むすべての最新ブラウザで動作します。高度なWebContainer IDEは、Chromium系ブラウザ（Chrome、Edge、Brave）およびCOOP/COEPが有効なモダンFirefoxに対応しています。現在のWebKitの制約上、Safariではフル機能の静的エディタをご利用いただけます。',
      },
      {
        q: 'GB Coderは完全に無料ですか？',
        a: 'はい、完全無料でご利用いただけます。有料プラン、クレジットカード登録、1日のコンパイル制限はありません。オープンなLadeStack開発者エコシステムの一環として、Girish Ladeによって開発・保守されています。',
      },
    ],
  },
  cta: {
    title: 'ブラウザでコードを書き、実行し、出荷する準備はできましたか？',
    description: 'インストール不要で今すぐGB Coderを起動。Monaco Editorとブラウザ内Node.jsワークフローをご体験ください。',
    launchStudioBtn: 'GB Coder Studioを起動',
    exploreAllBtn: 'すべてのユーティリティを見る',
    footerTagline: 'GB Coder by LadeStack · ブラウザ第一主義アーキテクチャ · 完全無料',
  },
};
