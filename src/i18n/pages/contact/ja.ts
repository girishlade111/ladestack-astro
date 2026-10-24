import type { ContactPageData } from './types';

export const ja: ContactPageData = {
  seo: {
    title: 'お問い合わせ – LadeStack 開発者サポート',
    description: 'LadeStackの開発者ツールに関するお問い合わせ、フィードバック、技術支援。admin@ladestack.in まで直接ご連絡ください。',
    ogTitle: 'お問い合わせ – LadeStack 開発者サポート',
    ogDescription: 'LadeStackの開発者ツールに関するお問い合わせ、フィードバック、技術支援。admin@ladestack.in まで直接ご連絡ください。',
  },
  hero: {
    badge: 'ダイレクトコミュニケーション',
    title: 'お問い合わせ',
    description: 'クライアントサイドツール、機能要望、エンタープライズ対応についてのご質問はお気軽にご連絡ください。',
  },
  cards: [
    { icon: 'mail', label: '代表メール', title: 'admin@ladestack.in', sub: '創設者直通の受信トレイ', href: 'mailto:admin@ladestack.in' },
    { icon: 'message-square', label: '技術サポート', title: 'テクニカルヘルプ', sub: 'アーキテクチャ・バグ報告', href: 'mailto:admin@ladestack.in' },
    { icon: 'map-pin', label: '所在地', title: 'インド・ムンバイ', sub: 'グローバルリモート体制', href: null },
    { icon: 'globe', label: 'アーキテクチャ', title: 'クライアントサイド', sub: 'ブラウザ内でローカル実行', href: null },
  ],
  form: {
    title: 'メッセージを送信',
    description: 'メッセージは定期的に確認し、迅速に返信いたします。',
    fallbackPrefix: 'メールクライアントから直接送信される場合はこちら：',
    fallbackLinkText: 'admin@ladestack.in',
    nameLabel: 'お名前',
    namePlaceholder: '山田 太郎',
    emailLabel: 'メールアドレス',
    emailPlaceholder: 'yamada@example.com',
    subjectLabel: '件名',
    subjectPlaceholder: 'GB Coderまたはクライアントサイドツールに関するお問い合わせ',
    messageLabel: 'メッセージ本文',
    messagePlaceholder: 'ご質問、不具合の報告、機能のご提案などを詳しくご記入ください...',
    submitButton: 'メッセージを送信',
    successMessage: 'ありがとうございます。メッセージの準備が整いました。メーラーが起動しない場合は、直接 admin@ladestack.in までご連絡ください。',
  },
  faqs: {
    eyebrow: 'よくあるご質問',
    title: 'サポート・FAQ',
    description: 'お問い合わせ、コラボレーション、利用環境についての一般的な回答です。',
    items: [
      {
        q: '返信までどのくらい時間がかかりますか？',
        a: '定期的にメッセージを確認しており、通常1〜2営業日以内に迅速に返信いたします。',
      },
      {
        q: 'バグ報告や機能要望を送信できますか？',
        a: 'もちろんです。admin@ladestack.in へのメール、または GitHub（github.com/girishlade111）の Issue にて受け付けております。',
      },
      {
        q: '企業チーム向けのカスタム導入相談は可能ですか？',
        a: 'はい。クライアントサイドツールの社内ホスティングやオフライン環境向けの特化型ワークフローが必要な場合は直接ご相談ください。',
      },
      {
        q: 'LadeStackは世界中どこからでも利用できますか？',
        a: 'はい。最新のブラウザがあれば、地域制限や有料登録の壁なしに全世界からアクセス可能です。',
      },
    ],
  },
};
