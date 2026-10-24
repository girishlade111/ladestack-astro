import type { DocsPageData } from './types';

export const jaDocs: DocsPageData = {
  seo: {
    title: 'ドキュメント – アーキテクチャ、ガイド＆APIリファレンス | LadeStack',
    description: 'LadeStack開発者ツールの包括的ドキュメント。アーキテクチャガイド、クライアントサイドWebAssemblyワークフロー、更新履歴。',
    ogTitle: 'LadeStack 開発者ドキュメント',
    ogDescription: 'GB Coder、LS PDF、LS Imageツールの技術仕様、アーキテクチャガイド、チュートリアル。',
  },
  hero: {
    badge: '技術ドキュメント',
    title: '開発者ドキュメント',
    description: 'LadeStack開発者プラットフォームの技術仕様、実行アーキテクチャガイド、およびリファレンス情報です。',
    searchPlaceholder: 'ドキュメント、ツール、ガイドを検索…',
    searchAriaLabel: 'ドキュメント、ツール、ガイドの検索',
  },
  categoriesSection: {
    title: 'コアアーキテクチャガイド',
    description: '以下のカテゴリを選択すると、詳細な動作仕様とガイドをご確認いただけます。',
    viewGuide: 'ガイドを見る',
    closeGuide: 'ガイドを閉じる',
    categories: [
      {
        id: 'getting-started',
        icon: 'book-open',
        title: '導入ガイド',
        description: '基本原則、ブラウザ実行モデル、ローカルファーストのワークフロー',
        overview: 'LadeStackツールは、機密データをリモートサーバーへ転送することなく、ユーザーのブラウザ内で直接実行されます。',
        sections: [
          {
            title: 'ブラウザでの即時実行',
            content: 'インストール不要で即座にツールを起動できます。WebAssemblyバイナリとWeb Workerがブラウザのローカルメモリ上で初期化されます。',
          },
          {
            title: 'ローカルストレージとメモリ管理',
            content: 'プロジェクトファイルやアップロード文書は、ブラウザのRAMとIndexedDB内にのみ保持されます。LadeStackサーバーへのファイル転送は行われません。任意のAI機能は明示的に設定された場合にのみ外部APIと通信します。',
          },
          {
            title: 'プロダクション成果物のエクスポート',
            content: 'ビルドされた静的Webアセット、編集済みPDF、圧縮画像ファイルをローカルストレージへ即時エクスポートできます。',
          },
        ],
      },
      {
        id: 'code-studio',
        icon: 'code-2',
        title: 'GB Coder エンジン',
        description: '静的エディタのコンパイル、WebContainerのNode.jsエミュレーション、Monacoの統合',
        overview: 'GB Coderのデュアルエンジン（軽量な静的エディタと高度なWebContainer IDE）の詳細なアーキテクチャ解説です。',
        sections: [
          {
            title: 'デュアルエンジンアーキテクチャ',
            content: 'Static EditorはHTML、CSS、JavaScriptを初期化待ち時間なしでブラウザ内で解析します。Advanced WebContainer IDEはChromium系ブラウザでローカルNode.js環境を構築し、開発サーバーやnpmパッケージを実行します。',
          },
          {
            title: 'Monaco Editorの統合',
            content: 'シンタックスハイライト、コード補完、診断オーバーレイ、キーボードショートカットを備えたデスクトップ級のエディタ体験を提供します。',
          },
          {
            title: 'ローカル永続化とエクスポート',
            content: 'ブラウザのIndexedDBへの自動プロジェクト保存と、ローカル配信用ZIPアーカイブのエクスポートに対応しています。',
          },
        ],
      },
      {
        id: 'pdf-wasm',
        icon: 'file-text',
        title: 'LS PDF Toolkit',
        description: 'メモリ内分離とWebAssemblyによるクライアントサイドPDF操作',
        overview: 'WebAssemblyがバイナリPDFストリームをブラウザメモリ内で直接解析・操作する仕組みです。',
        sections: [
          {
            title: 'ストリームの結合と分割',
            content: 'サーバーを介さず、品質低下なしで複数のPDFドキュメントを結合したり特定ページを抽出したりできます。',
          },
          {
            title: 'メモリ内最適化圧縮',
            content: 'ストリームオブジェクトや埋め込みフォントをローカルで最適化し、ファイルサイズを最小化します。',
          },
          {
            title: 'クライアントサイドセキュリティ',
            content: 'ディスクへの書き出し前に、ブラウザのRAM内で直接PDFドキュメントの暗号化とパスワード設定を行います。',
          },
        ],
      },
      {
        id: 'image-engine',
        icon: 'image',
        title: 'LS Image Engine',
        description: 'CanvasとWebAssemblyを活用したマルチフォーマット画像処理とリアルタイムプレビュー',
        overview: 'Web Workerを使用したクライアントサイド画像変換、圧縮、視覚的差異の比較機能です。',
        sections: [
          {
            title: '幅広いフォーマット対応',
            content: 'AVIF、WebP、PNG、JPEG、SVG、TIFFなど最新のWeb標準画像フォーマットに完全対応しています。',
          },
          {
            title: '画質調整とプレビュー',
            content: '非可逆圧縮の閾値やクロマサブサンプリングを調整しながら、処理前後の視覚的差異をリアルタイムで確認できます。',
          },
        ],
      },
    ],
  },
  articlesSection: {
    title: '注目の技術記事',
    description: 'セキュリティ、プライバシー境界、アセット最適化を解説した技術ガイドです。',
    readArticle: '記事全文を読む',
    closeArticle: '記事を閉じる',
    stepsTitle: '実行ステップ:',
    summaryLabel: '要約:',
    articles: [
      {
        id: 'client-side-privacy',
        title: 'クライアントサイド・プライバシーアーキテクチャの理解',
        category: 'セキュリティ',
        readTime: '読了目安 4分',
        intro: 'LadeStackがWebAssemblyのメモリ分離とブラウザサンドボックスにより、機密ドキュメントをどのように保護しているかを解説します。',
        steps: [
          'Web Workerによるブラウザメモリサンドボックスの割り当て。',
          'リモート送信を伴わないローカルWebAssemblyバイト処理。',
          '状態保持のための分離されたIndexedDBストレージ。',
          'タブ終了時の即時ガベージコレクション。',
        ],
        summary: 'データ処理をクライアントマシン内で完結させることで、LadeStackはサーバー側の保管リスクを排除しつつ高速な処理を実現しています。',
      },
      {
        id: 'optimizing-assets',
        title: 'Webアセット圧縮のベストプラクティス',
        category: 'パフォーマンス',
        readTime: '読了目安 6分',
        intro: '視覚的な劣化を伴わずに画像ペイロードとドキュメントサイズを大幅に削減する技術を紹介します。',
        steps: [
          'ラスターグラフィックスには次世代のAVIFまたはWebPを選択。',
          '視覚的差異を確認しながら非可逆量子化パラメータを調整。',
          '不要なEXIFカメラメタデータやカラープロファイルを削除。',
          'モバイル端末でのLargest Contentful Paint (LCP) の改善度を検証。',
        ],
        summary: '的確なクライアントサイド圧縮により、ネットワーク帯域の消費を抑え、Core Web Vitalsを明確に向上させることができます。',
      },
    ],
  },
  changelogSection: {
    title: 'プラットフォーム更新履歴',
    description: '最新のリリース、アーキテクチャ改善、機能拡張の履歴です。',
    items: [
      {
        version: 'v1.0.0',
        date: '2026年10月',
        type: 'メジャーリリース',
        description: 'Obsidian＆Precision Emeraldデザインへの刷新、9言語対応の多言語化、アクセシビリティの向上、クライアントサイド性能の強化。',
      },
      {
        version: 'v0.9.4',
        date: '2026年8月',
        type: '改善',
        description: 'LS PDFスイートに最適化されたメモリ内圧縮とクライアントサイドPDF操作ツールを追加。',
      },
      {
        version: 'v0.9.0',
        date: '2026年6月',
        type: '機能追加',
        description: 'GB Coderブラウザネイティブ・デュアルエンジン開発環境の初期パブリックローンチ。',
      },
    ],
  },
};
