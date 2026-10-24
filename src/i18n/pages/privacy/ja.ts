import type { PrivacyPageData } from './types';

export const jaPrivacy: PrivacyPageData = {
  seo: {
    title: 'プライバシーポリシー – データ保護とアーキテクチャ | LadeStack',
    description: 'LadeStackがクライアントサイドWebAssembly、ローカルIndexedDB、透明性のある方針を通じてデータを保護する方法について説明します。',
    ogTitle: 'LadeStack プライバシーポリシー',
    ogDescription: 'クライアントサイド処理アーキテクチャ、データ取り扱い方針、ユーザープライバシー保護の取り組み。',
  },
  header: {
    badge: 'プライバシーとデータ保護',
    title: 'プライバシーポリシー',
    lastUpdated: '最終更新日: 2026年10月',
    effectiveDate: '即時発効',
  },
  disclaimer: {
    title: '正本に関するお知らせ',
    text: '本プライバシーポリシーの英語版が、LadeStackのプライバシー方針に関する正式な正本となります。他言語による翻訳は情報提供および利便性のためにのみ提供されており、法的認証を受けたものではありません。',
  },
  highlights: [
    { icon: 'shield-check', text: 'クライアントサイド実行' },
    { icon: 'lock', text: 'サーバーへのファイル保存なし' },
    { icon: 'check-circle', text: 'ローカルファースト設計' },
  ],
  sections: [
    {
      title: '1. クライアントサイド処理アーキテクチャ',
      paragraphs: [
        'LadeStackはローカルファーストのアーキテクチャ原則に基づいて開発者ツールを設計しています。LS PDF Toolkit、LS Image Compressor、GB Coder Static Editorなどの主要ユーティリティは、WebAssembly、Web Worker、HTML5 Canvas APIを利用してブラウザ内で直接実行されます。',
        'ユーザーが処理するファイル（PDFドキュメント、画像、ソースコード等）はブラウザの一時メモリ上でのみ処理されます。処理中にこれらのファイルがLadeStackのバックエンドサーバーに送信または保存されることはありません。',
      ],
    },
    {
      title: '2. 収集する情報とネットワーク通信',
      paragraphs: [
        '本ウェブサイト上の公開ツールを利用するにあたり、アカウント登録、ログイン認証、クレジットカード情報の入力は必要ありません。ネットワーク通信は以下の通り制限されています:',
      ],
      listItems: [
        '基本的なウェブサーバーアクセスログ: インフラ監視および不正アクセス防止を目的とした、ユーザーエージェント、参照元URL、リクエストパスなどの標準的な診断情報。',
        '任意のサードパーティAI連携: GB Coderにおいてユーザーが外部AIプロバイダーのAPIキーを設定した場合、API通信はブラウザ環境と指定の外部エンドポイント間で直接行われます。',
        '自発的なお問い合わせ: admin@ladestack.in 宛てに送信されたメールは、お問い合わせへの対応のみを目的として処理されます。',
      ],
    },
    {
      title: '3. ローカルストレージとCookie',
      paragraphs: [
        'LadeStackは、ブラウザのローカルストレージ（localStorageやIndexedDB）を必要な機能目的（ダーク/ライトテーマの設定保存、GB Coderにおけるプロジェクト状態の保持）にのみ使用します。',
        'サードパーティの広告トラッキングピクセルやマーケティング用Cookieは使用しておりません。',
      ],
    },
    {
      title: '4. データの保持と削除',
      paragraphs: [
        'LS PDF ToolkitやLS Image Compressorで処理されるファイルはメモリ内にのみ存在するため、ブラウザのタブを閉じるか再読み込みすることで揮発性データは消去されます。',
        'IndexedDBに保存されたGB Coderプロジェクトについては、ブラウザのサイトデータを消去することでいつでもローカル環境から完全に削除できます。',
      ],
    },
  ],
  contactNote: {
    title: '5. お問い合わせ窓口',
    text: '本プライバシーポリシーまたはデータ取り扱いアーキテクチャに関するご質問は、エンジニアリングチームまでお問い合わせください:',
    email: 'admin@ladestack.in',
  },
};
