import type { LandingPageData } from './types';

export const ja: LandingPageData = {
  missionVision: {
    eyebrow: 'LADESTACKについて',
    title: '次世代を築く',
    titleHighlight: 'AI開発の未来',
    subtitle:
      'すべての開発者にスタートアップのスピードでエンタープライズ品質のツールを提供する、AI駆動型SaaSエコシステム — 完全無料、オープン、高信頼性。',
    stats: [
      { value: '8K+', label: 'エンジニア' },
      { value: '80+', label: '構築プロジェクト' },
      { value: '100+', label: '展開国' },
      { value: '99%', label: '稼働率' },
    ],
    mission: {
      eyebrow: 'ミッション',
      tagline: '私たちの存在理由',
      headline: 'AI開発ツールの民主化',
      body: '予算やチーム規模を問わず、すべての開発者に開発時間を劇的に短縮するエンタープライズ品質のAIソリューションを提供し、高度な開発環境を解放します。',
      context:
        '個人開発者と巨大テック企業チームの差はツールによって生まれるべきではありません。ツールが公平な環境を作るとき、創造性と実行力だけが真の差別化になります。',
      timelineTitle: 'プラットフォームの軌跡',
      timeline: [
        {
          year: '2024',
          label: '創業',
          desc: 'AI開発ツールの民主化を掲げてLadeStackが誕生。',
          detail: '最初のAIコードエディターのプロトタイプから着手し、500名の初期ユーザーとともにプロダクトを洗練。',
        },
        {
          year: '2025',
          label: 'プラットフォーム公開',
          desc: 'AIコードエディターが世界10,000名以上の開発者に普及。',
          detail: 'リアルタイムコード補完、インテリジェントサジェスト、多言語対応を備えたフルエディターを提供開始。',
        },
        {
          year: '2026',
          label: '総合エコシステム',
          desc: '5つのAI搭載プロダクトによる統合開発スイート。',
          detail: 'APIテスト、サイトビルダー、ファイル共有、Doc AIが統合され、一貫した開発スイートへ進化。',
        },
      ],
    },
    vision: {
      eyebrow: 'ビジョン',
      tagline: '私たちが目指す未来',
      headline: 'AIが複雑さを吸収する',
      body: '誰もがエンタープライズ品質のソフトウェアを世に送り出せる世界 — AIが技術的複雑さを肩代わりし、エンジニアは創造性と本質的価値に専念できます。',
      features: [
        { icon: 'code-2', text: 'AI支援型コードアシスタント' },
        { icon: 'zap', text: 'インテリジェントコード最適化' },
        { icon: 'shield', text: 'エンタープライズグレードセキュリティ' },
        { icon: 'globe', text: 'グローバルな開発者コラボレーション' },
        { icon: 'users', text: 'コミュニティ駆動型の機能開発' },
        { icon: 'layers', text: 'シームレスな統合マルチツールスイート' },
      ],
    },
    approach: {
      title: 'オープンスタンダードを徹底',
      body: '主要ツールをオープンソース化し、ロードマップと仕様を全面公開。信頼こそが持続的な成長の源泉です。',
      badges: ['12K+ スター', '200+ コントリビューター', 'パブリックロードマップ'],
    },
  },

  coreValues: {
    eyebrow: '価値観と原則',
    title: '私たちの開発を支える',
    titleHighlight: '4つの原則',
    subtitle:
      'ソフトウェアアーキテクチャ、データ主権、オープンアクセスを支えるエンジニアリングの基本方針。',
    values: [
      {
        id: '01',
        number: '01',
        title: 'AIファーストの革新',
        tagline: 'すべてのキーストロークに知性を',
        badge: 'コンテキスト認知AI',
        badgeIcon: 'zap',
        description:
          '開発ツールへ最先端AIを直結させ、反復作業の自動化とコーディング意図の予測をリアルタイムに実行します。',
        bullets: [
          '文脈対応型コード補完',
          'シームレスな多言語シンセシス',
          'コードベースへのリアルタイム適応',
        ],
      },
      {
        id: '02',
        number: '02',
        title: '開発者のエンパワーメント',
        tagline: '制限のないエンタープライズ機能',
        badge: '100% 無料プラン',
        badgeIcon: 'shield-check',
        description:
          '個人ハッカーからグローバルチームまで、すべての開発者が制限なく使えるプロフェッショナル仕様のツールを提供します。',
        bullets: [
          'コア機能の完全無制限アクセス',
          'クレジットカード登録不要',
          'チームコラボレーション機能内蔵',
        ],
      },
      {
        id: '03',
        number: '03',
        title: '本番環境水準の堅牢性',
        tagline: '実戦テスト済み、ベータ水準を脱却',
        badge: '99.9% 稼働率SLA',
        badgeIcon: 'cpu',
        description:
          'エンタープライズ本番負荷に耐えうるフェイルオーバー冗長構成、ゼロダウンタイムデプロイ、エンドツーエンド暗号化。',
        bullets: [
          '99.9% 稼働率SLA保証',
          'SOC 2 基準準拠アーキテクチャ',
          '完全エンドツーエンド暗号化',
        ],
      },
      {
        id: '04',
        number: '04',
        title: 'オープン＆透明性',
        tagline: '隠すものはなく、すべてを共有',
        badge: 'オープンソース',
        badgeIcon: 'git-fork',
        description:
          'コアロジックをオープンにし、コミュニティの投票とフィードバックに基づきロードマップを進行します。',
        bullets: [
          '主要コアアーキテクチャのOSS公開',
          '開発ロードマップの完全公開',
          'コミュニティ主導の機能投票',
        ],
      },
    ],
    principlesEyebrow: '基本理念',
    principles: [
      'オープンソース',
      'AIネイティブ',
      '開発者ファースト',
      'ロックインなし',
      '永年無料',
      'コミュニティ駆動',
      '高い透明性',
      '企業利用対応',
      'SOC 2 準拠',
      'プライバシー優先',
    ],
  },

  metricsImpact: {
    eyebrow: '実績とインパクト',
    title: '数字が証明する',
    titleHighlight: '確かな成果',
    subtitle: '実際の開発現場で測定された、持続可能で再現性のある生産性向上。',
    heroStats: [
      {
        value: '10倍',
        label: '開発スピード向上',
        sub: '手動開発比',
        icon: 'zap',
      },
      {
        value: '8K+',
        label: 'アクティブ開発者',
        sub: '世界各地で拡大中',
        icon: 'users',
      },
      {
        value: '99.9%',
        label: 'プラットフォーム稼働率',
        sub: 'エンタープライズSLA準拠',
        icon: 'trending-up',
      },
      {
        value: '98%',
        label: '開発者満足度',
        sub: '利用ユーザー評価',
        icon: 'heart',
      },
    ],
    toolMetricsTitle: 'ワークフロー生産性向上',
    toolMetricsSubtitle: 'エンジニアリングワークフローで実測された効率化指標',
    toolMetrics: [
      {
        tool: 'AIコードエディター',
        icon: 'code-2',
        metrics: [
          { label: 'AI自動生成コード率', value: 73 },
          { label: 'バグ発生率の削減', value: 61 },
          { label: 'レビュー工数の削減', value: 55 },
        ],
      },
      {
        tool: 'APIテスター',
        icon: 'zap',
        metrics: [
          { label: 'テスト網羅率の向上', value: 88 },
          { label: '手動工数の大幅削減', value: 79 },
          { label: 'デプロイサイクルの短縮', value: 64 },
        ],
      },
      {
        tool: 'ドキュメント生成ツール',
        icon: 'trending-up',
        metrics: [
          { label: 'ドキュメント作成時間短縮', value: 82 },
          { label: '仕様書記述の正確性向上', value: 91 },
          { label: 'オンボーディング時間短縮', value: 68 },
        ],
      },
    ],
    benchmarksTitle: '速度と信頼性ベンチマーク',
    benchmarks: [
      { label: '処理加速率', value: '92%', sub: 'クライアント実行速度の向上' },
      { label: 'SLA稼働率', value: '99.9%', sub: '無停止サービスの継続稼働' },
      { label: '満足度スコア', value: '98%', sub: '開発者推奨度（NPS）' },
      { label: 'グローバル到達性', value: '85%', sub: 'エッジ分散による低レイテンシ' },
    ],
  },

  freeForever: {
    eyebrow: '完全永年無料の誓約',
    title: 'エンタープライズAIパワー。',
    titleHighlight: '費用は一切ゼロ。',
    subtitle:
      '優れた開発ツールをサブスクリプションの壁に閉じ込めるべきではありません。すべての開発者に、カード登録なしで業務水準のツールを開放します。',
    commitments: [
      {
        number: '01',
        title: 'コアAIツールの無制限利用',
        badge: '5+ プロダクト稼働中',
        badgeIcon: 'code-2',
        description:
          'AIコードエディター、17機能搭載LS PDF、LS画像圧縮、Swift Resume、Bharat Land変換の全機能を制限なく利用可能。',
        bullets: ['1日の利用上限なし', 'すべての機能を解放', '継続的な無料アップデート'],
      },
      {
        number: '02',
        title: '課金壁・試用期限の一切の排除',
        badge: 'カード登録不要',
        badgeIcon: 'shield-check',
        description:
          '永年無料とは言葉通りです。14日間の試用期限も、不意の自動課金も、カード情報の要求も存在しません。',
        bullets: ['1クリックで即時起動', 'アップグレードの強制なし', '商用プロジェクトでも自由に使用可能'],
      },
      {
        number: '03',
        title: '100% クライアント完結のプライバシー',
        badge: 'ブラウザ内ローカル処理',
        badgeIcon: 'lock',
        description:
          'PDFや画像の変換処理はすべてブラウザのローカルメモリ上で完結。ファイルやコードが外部サーバーへ送信されることはありません。',
        bullets: ['サーバーへのファイル送信ゼロ', 'SOC 2 基準の安全設計', 'メモリ内サンドボックス処理'],
      },
      {
        number: '04',
        title: 'コミュニティとオープン思想',
        badge: 'コミュニティ主導',
        badgeIcon: 'heart-handshake',
        description:
          '公開ロードマップ、ユーザー投票、オープンソースの基盤をもとに、世界中のエンジニアとともに進化を続けます。',
        bullets: ['GitHubパブリックロードマップ', 'ユーザーによる新機能リクエスト', '8,000名を超える開発者コミュニティ'],
      },
    ],
  },

  developerCommunity: {
    eyebrow: '開発者コミュニティ',
    title: '開発者のために、',
    titleHighlight: '開発者とともに創る',
    subtitle:
      'すべてのツールが利用者との対話から生まれるオープンな空間。世界中の仲間とともに学び、開発し、リリースしましょう。',
    stats: [
      { value: '8K+', label: '参加エンジニア', icon: 'users' },
      { value: '12K+', label: '成果物プロジェクト', icon: 'layers' },
      { value: '100+', label: 'コミュニティ展開国', icon: 'globe' },
      { value: '4.1 / 5', label: '平均評価スコア', icon: 'star' },
    ],
    channelsTitle: 'コミュニティ活動',
    channels: [
      {
        icon: 'code-2',
        label: 'オープンソース',
        stat: '2.4K スター',
        description: 'フォークやプルリクエストを通じて、世界中のコントリビューターとともにツールの未来を形作ります。',
        cta: 'GitHubを見る',
        url: 'https://github.com/girishlade111',
      },
      {
        icon: 'message-square',
        label: 'Discordコミュニティ',
        stat: '8K メンバー',
        description: 'リアルタイムの質問、成果物共有、世界中のエンジニアとの交流が活発に行われています。',
        cta: 'Discordに参加',
        url: 'https://discord.gg/ladestack',
      },
      {
        icon: 'book-open',
        label: '技術ドキュメント',
        stat: '200+ ガイド',
        description: '初心者からエキスパートまで対応する網羅的なチュートリアルとAPIリファレンス。',
        cta: 'ドキュメントを読む',
        url: '/docs',
      },
      {
        icon: 'rocket',
        label: 'スターターテンプレート',
        stat: '60+ テンプレート',
        description: 'ベストプラクティスに基づいた本番対応テンプレート。数秒で新規アプリを立ち上げ可能。',
        cta: 'テンプレートを探す',
        url: '/apps',
      },
      {
        icon: 'globe',
        label: 'グローバルイベント',
        stat: '24 開催予定',
        description: 'ハッカソン、ウェビナー、技術ワークショップを随時開催。',
        cta: 'イベントを確認',
        url: '/blog',
      },
      {
        icon: 'zap',
        label: 'ウィークリーチャレンジ',
        stat: '毎週開催',
        description: 'AI支援を活用した毎週のコーディング課題。バッジを獲得してスキルを証明。',
        cta: '挑戦する',
        url: '/apps',
      },
    ],
  },
};
