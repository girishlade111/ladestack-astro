import type { SupportPageData } from './types';

export const jaSupport: SupportPageData = {
  seo: {
    title: 'サポートセンター – ヘルプ・ドキュメント・FAQ | LadeStack',
    description: 'LadeStack開発者ツールのサポート。技術ドキュメントの閲覧、トラブルシューティング、またはエンジニアリングチームへの直接のお問い合わせをご案内します。',
    ogTitle: 'LadeStack サポートセンター – ヘルプとFAQ',
    ogDescription: 'アーキテクチャ、データ取り扱い、ブラウザ互換性に関する質問の確認、またはLadeStackへの直接のお問い合わせ。',
  },
  hero: {
    badge: 'サポート＆アシスタンス',
    title: 'どのようなサポートが必要ですか？',
    description: 'ワークフローのトラブルシューティング、技術ドキュメントの閲覧、プライバシー方針の確認、またはエンジニアリングチームへ直接お問い合わせいただけます。',
  },
  channelsSection: {
    heading: 'サポートチャンネル',
    channels: [
      {
        icon: 'mail',
        title: 'メールによる直接サポート',
        description: 'アーキテクチャの質問、バグ報告、技術提携について、創設者および開発チームへの直接連絡窓口です。',
        responseTime: '1〜2営業日以内',
        action: 'admin@ladestack.in',
        href: 'mailto:admin@ladestack.in',
      },
      {
        icon: 'book-open',
        title: '技術ドキュメント',
        description: 'GB Coderのアーキテクチャ、クライアントサイドWebAssemblyツール、ローカル実行要件を解説したガイドです。',
        responseTime: '即時セルフサービス',
        action: 'ドキュメントを閲覧する',
        href: '/docs',
      },
      {
        icon: 'message-square',
        title: 'GitHubコミュニティ',
        description: '公式GitHubリポジトリでのオープンソース課題トラッカー、機能提案、ディスカッションです。',
        responseTime: 'パブリックIssue',
        action: 'GitHubリポジトリを見る',
        href: 'https://github.com/girishlade111',
      },
    ],
  },
  faqSection: {
    badge: 'ヘルプとFAQ',
    title: 'よくあるご質問',
    description: 'ツールの商用利用、ドキュメント処理、ブラウザ互換性、技術サポートに関する明確な回答です。',
    faqs: [
      {
        question: 'LadeStackのツールは商用プロジェクトで無料で使用できますか？',
        answer: 'はい。GB Coderで作成されたコードや、LS PDF Toolkit、LS Image Compressorで生成された出力物は、プラットフォーム使用料なしで個人および商用クライアントワークに自由にご利用いただけます。',
      },
      {
        question: 'ドキュメントやコードの処理時、データはどのように扱われますか？',
        answer: 'LS PDF ToolkitやLS Image Compressorなどのクライアントサイドユーティリティは、WebAssemblyやCanvas APIを用いてブラウザのローカルメモリ上で完結して処理を行います。ファイルがLadeStackのサーバーへアップロードされることはありません。GB Coderでは、オプションのサードパーティAI APIを明示的に設定しない限り、プロジェクトファイルはブラウザのIndexedDBにのみ保存されます。',
      },
      {
        question: 'LadeStackのツールと互換性のあるブラウザは何ですか？',
        answer: 'LS PDF Toolkit、LS Image Compressor、およびGB Coder Static Editorは、主要なモダンブラウザ（Chrome、Firefox、Safari、Edge）でスムーズに動作します。GB Coder Advanced IDEのWebContainer実行には、Chromium系ブラウザ（Chrome、Edge、Brave等）が最も完全な環境を提供します。Firefoxは一部対応、SafariにはWebContainerサンドボックスの既知の制限があります。',
      },
      {
        question: 'バグの報告や新機能の提案はどのように行えますか？',
        answer: 'GitHubリポジトリ（github.com/girishlade111）でIssueを開くか、再現手順を記載して admin@ladestack.in までメールをお送りください。',
      },
      {
        question: 'クライアントサイドツールはオフラインでも動作しますか？',
        answer: 'ブラウザキャッシュに読み込まれた後は、LS PDF ToolkitやLS Image Compressorなどの静的ツールはローカルCPU上で処理を行うため、継続的なネットワーク接続なしで動作可能です。',
      },
    ],
    ctaText: 'サポートに直接問い合わせる',
  },
};
