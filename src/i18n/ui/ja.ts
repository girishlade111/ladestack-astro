/**
 * Japanese (ja) — UI Strings
 * Natural technical Japanese using standard developer terminology.
 * Preserves brand names: LadeStack, GB Coder, Astro.
 */
import type { UIStrings } from './en';

export const ja: UIStrings = {
  // Navigation
  'nav.platform': 'プラットフォーム',
  'nav.apps': 'アプリ',
  'nav.codeStudio': 'コードスタジオ',
  'nav.docs': 'ドキュメント',
  'nav.blog': 'ブログ',
  'nav.about': '会社概要',
  'nav.support': 'サポート',
  'nav.contact': 'お問い合わせ',
  'nav.quickJump': 'クイックジャンプ',
  'nav.themeToggle': 'テーマ切り替え',
  'nav.languageSelect': '言語を選択',
  'nav.openMenu': 'メニューを開く',
  'nav.closeMenu': 'メニューを閉じる',

  // Footer
  'footer.tagline': '速度とプライバシーを追求した、ブラウザ完結型の高性能開発ツール。',
  'footer.status': 'ブラウザ内 · ローカル実行',
  'footer.tools': 'ツール',
  'footer.resources': 'リソース',
  'footer.company': '運営',
  'footer.legal': '規約・プライバシー',
  'footer.rights': '無断転載を禁じます。',
  'footer.emailPrompt': 'エンジニアリングへ直接連絡:',
  'footer.copyEmail': 'メールをコピー',
  'footer.copiedEmail': 'クリップボードにコピーしました！',
  'footer.privacy': 'プライバシーポリシー',
  'footer.terms': '利用規約',

  // Hero Section
  'hero.badge': 'ブラウザ内実行 · 100% クライアントサイド・プライバシー',
  'hero.titleLine1': 'ブラウザ上で直接',
  'hero.titleLine2': '構築、編集、最適化。',
  'hero.description':
    'クライアントサイドで完結する高性能開発者向けユーティリティ。サーバーへのファイル送信ゼロ、有料プランなし、全ツール即座に高速動作。',
  'hero.ctaPrimary': '17以上のツールを見る',
  'hero.ctaSecondary': 'Studio IDEを起動',
  'hero.ctaSecondaryAria': 'GB Coder IDEを新しいタブで開く',
  'hero.editorFileName': 'CodeStudio.tsx',
  'hero.editorTabName': 'PreviewSandbox.html',
  'hero.editorStatus': 'ブラウザ内実行',
  'hero.editorPrivacy': 'プライバシー: ローカルホスト',
  'hero.editorNotification': '構文検証とサンドボックスプレビュー: ローカルブラウザスレッド',
  'hero.editorNotificationBadge': 'デプロイ準備完了',
  'hero.specTitle': 'アーキテクチャ仕様',
  'hero.specRuntime': 'ローカルランタイム',
  'hero.specExecutionModel': '実行モデル',
  'hero.specExecutionValue': 'クライアントサイド・ブラウザランタイム',
  'hero.specExecutionBadge': 'ローカル',
  'hero.specPrivacy': 'データ保護',
  'hero.specPrivacyValue': 'サーバー保存ゼロ · クライアント限定実行',
  'hero.specPrivacyBadge': '厳格',
  'hero.specDistribution': '配信方式',
  'hero.specDistributionValue': '静的事前レンダリング構成',
  'hero.specDistributionBadge': '静的',
  'hero.browserCompatibility': 'すべての主要モダンブラウザで動作',
  'hero.viewAppsLink': '検証済み全ツールを表示 →',

  // Features Bento
  'features.eyebrow': 'ツールエコシステム',
  'features.title': '速度、プライバシー、自己主権のために設計',
  'features.subtitle':
    'すべてのツールはブラウザのランタイム上で厳格に実行されます。アカウント登録不要、クラウドテレメトリなし、レイテンシゼロ。',
  'features.card1Title': 'GB Coder',
  'features.card1Desc':
    'リアルタイムコンパイル、iframeライブプレビュー、アクセシブルなHTML/CSS/モダンJavaScriptフォーマッターを備えたIDE。',
  'features.card1Badge': '旗艦IDE',
  'features.card2Title': 'LS PDF ツールキット',
  'features.card2Desc':
    'ローカルメモリ内でPDFの結合、分割、圧縮、保護、回転、変換を行える17種類のクライアントサイドツール。',
  'features.card2Badge': '17-in-1 スイート',
  'features.card3Title': 'LS 画像オプティマイザー',
  'features.card3Desc':
    'WebP、AVIF、PNG、JPEGなど9つ以上のフォーマットに対応し、瞬時にサイズを縮小するクライアントサイド圧縮。',
  'features.card3Badge': 'アップロード不要',
  'features.card4Title': 'キャリア・生産性ユーティリティ',
  'features.card4Desc':
    '実務開発者のワークフローに合わせて設計された、ATS最適化レジュメビルダーおよび高精度ユーティリティ。',
  'features.card4Badge': '生産性',

  // How It Works
  'howItWorks.eyebrow': 'シンプルな運用フロー',
  'howItWorks.title': 'LadeStackの仕組み',
  'howItWorks.subtitle': '当プラットフォームのすべてのユーティリティは、3つの明確な原則に基づいています。',
  'howItWorks.step1Num': '01',
  'howItWorks.step1Title': 'ブラウザから即座にアクセス',
  'howItWorks.step1Desc': 'ツールを開けばすぐに利用開始可能。ログイン、APIキー、クレジットカードの登録は一切不要です。',
  'howItWorks.step2Num': '02',
  'howItWorks.step2Title': 'クライアント端末でのローカル実行',
  'howItWorks.step2Desc': 'ファイル、コード、各種データはお使いのデバイスのメモリ内でのみ安全に処理されます。',
  'howItWorks.step3Num': '03',
  'howItWorks.step3Title': '直接ダウンロード & データ完全管理',
  'howItWorks.step3Desc': '処理結果を即座にローカルへ保存。外部サーバーへデータが送信されることは一切ありません。',

  // Use Cases
  'useCases.eyebrow': '対象ユーザー',
  'useCases.title': '現代のエンジニアリングワークフローのために',
  'useCases.subtitle': '個人開発者からデータの機密性を最重要視する企業エンジニアまで幅広く対応。',
  'useCases.case1Title': 'フロントエンドエンジニア',
  'useCases.case1Desc': 'UIレイアウトの試作、HTML/CSS/JSの検証、モダンWebパターンのテストを即時フィードバックで実行。',
  'useCases.case2Title': '技術チーム & 開発組織',
  'useCases.case2Desc': '社内のセキュリティ基準を遵守しながら、社外秘のPDFドキュメントや設計図面を安全に圧縮・整理。',
  'useCases.case3Title': 'プライバシー重視の開発者',
  'useCases.case3Desc': 'データが端末外へ一切漏洩しない確信のもと、機密情報を安全にローカル処理。',

  // Product Showcase
  'showcase.eyebrow': '検証済みカタログ',
  'showcase.title': '稼働中のプロダクションツール',
  'showcase.subtitle': '高い信頼性を誇る、完全無料のクライアントサイド・アプリケーション。',
  'showcase.launchApp': 'アプリを開く',
  'showcase.learnMore': '詳細を見る',
  'showcase.inBrowser': 'ブラウザ内実行',
  'showcase.viewAllCatalog': '全アプリケーション一覧を見る →',

  // FAQ
  'faq.eyebrow': 'よくあるご質問',
  'faq.title': 'FAQ',
  'faq.subtitle': 'LadeStackのツール、セキュリティ、アーキテクチャに関する主な質問と回答。',
  'faq.q1': 'LadeStackのユーティリティは完全無料ですか？',
  'faq.a1':
    'はい。GB Coder、LS PDFツールキット、LS画像オプティマイザーを含む全開発者ツールは、個人利用および商用クライアントワークを問わず永久に無料です。',
  'faq.q2': 'ユーザーデータとファイルのプライバシーはどのように保護されますか？',
  'faq.a2':
    'すべての文書やコードの処理は、お使いのブラウザ内のローカルサンドボックスメモリ内でのみ実行されます。リモートサーバーへアップロードされることはありません。',
  'faq.q3': 'どのWebブラウザに対応していますか？',
  'faq.a3':
    'Google Chrome、Mozilla Firefox、Apple Safari、Microsoft Edge、Braveなど、標準的なHTML5およびCanvas APIをサポートするすべての最新ブラウザでご利用いただけます。',
  'faq.q4': 'LadeStackの開発・運営者は誰ですか？',
  'faq.a4':
    'LadeStackは創業者のGirish Ladeによって設計・開発されており、世界中のエンジニアにプライバシー重視のオープンな開発ツールを提供することを目指しています。',

  // CTA Banner
  'cta.title': 'ワークフローを今すぐ高速化しませんか？',
  'cta.subtitle': 'LadeStackのブラウザ完結型開発者ツールを今すぐお試しください。アカウント登録は不要です。',
  'cta.button': '全ツールを見る',

  // SEO Metadata
  'seo.homeTitle': 'LadeStack – ブラウザ完結型開発者プラットフォーム＆ユーティリティ',
  'seo.homeDescription':
    'ブラウザ上で動作する高性能開発ツール：コードエディタ、17種類のプライベートPDFツール、画像圧縮、キャリア支援ツール。完全無料・ローカル実行。',
  'seo.ogTitle': 'LadeStack – ブラウザ完結型開発者ツール＆ユーティリティ',
  'seo.ogDescription':
    'ブラウザ内コードスタジオ、プライベートPDFスイート、画像オプティマイザー。100%クライアントサイド実行、完全無料。',
};
