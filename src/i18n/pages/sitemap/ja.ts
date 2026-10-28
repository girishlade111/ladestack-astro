import type { SitemapPageData } from './types';

export const jaSitemap: SitemapPageData = {
  seo: {
    title: 'サイトマップ＆サイト目次 | LadeStack',
    description: 'LadeStackの全ページ、開発者ツール、ドキュメント、アーキテクチャガイドを一覧できるインデックスです。',
    ogTitle: 'LadeStack サイトマップ＆サイト目次',
    ogDescription: 'LadeStackの公開ページ、ツール、技術ドキュメント、記事の完全なディレクトリ。',
  },
  hero: {
    badge: 'ナビゲーション＆目次',
    title: 'サイト目次＆ディレクトリ',
    description: 'LadeStackプラットフォーム上のすべてのページ、ツール、技術ドキュメント、記事を網羅した目次です。',
  },
  sections: {
    corePlatform: {
      title: 'プラットフォーム基本ルート',
      items: [
        { title: 'ホーム', href: '/', desc: 'ツールの概要とインタラクティブなコードデモを備えたプラットフォームのトップページ' },
        { title: 'LadeStackについて', href: '/about', desc: '創設者の経歴、エンジニアリング原則、実証済みの製品ポートフォリオ' },
        { title: 'GB Coder', href: '/gb-coder', desc: 'Monaco Editor、静的エディタ、WebContainer環境を備えたブラウザネイティブIDE' },
        { title: '製品＆ユーティリティ', href: '/apps', desc: 'ブラウザ内で完結するクライアントサイド開発ツールの検証済みカタログ' },
        { title: 'ドキュメント', href: '/docs', desc: '技術仕様、アーキテクチャガイド、プラットフォームの更新履歴' },
        { title: 'サポートセンター', href: '/support', desc: '技術支援窓口、ブラウザ互換性ガイド、よくあるご質問' },
        { title: 'お問い合わせ', href: '/contact', desc: '創設者直通窓口、エンジニアリング相談、フィードバックフォーム' },
              { title: 'よくある質問 (FAQ)', href: '/faq', desc: 'プラットフォームの機能、プライバシー、GB Coder IDE、開発者ツールに関するよくある質問' },
      ],
    },
    tools: {
      title: '開発者ツール＆アプリケーション',
      openTool: 'ツールを開く',
      comingSoon: '準備中',
      live: '公開中',
    },
    blogArchive: {
      title: 'エンジニアリングブログ一覧（27件）',
      notice: '注: エンジニアリングブログ記事は現在英語でのみ公開されています。ブログ記事の多言語化はフェーズ3で予定されています。',
      visitBlog: 'ブログ一覧へ →',
    },
    legal: {
      title: '法務およびプライバシー',
      items: [
        { title: 'プライバシーポリシー', href: '/privacy', desc: 'クライアントサイド処理アーキテクチャ、データ取り扱い、ローカルストレージ方針' },
        { title: '利用規約', href: '/terms', desc: '商用利用権、知的財産ライセンス、責任の制限規定' },
      ],
    },
  },
};
