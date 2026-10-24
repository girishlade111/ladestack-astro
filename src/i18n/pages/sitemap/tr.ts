import type { SitemapPageData } from './types';

export const trSitemap: SitemapPageData = {
  seo: {
    title: 'Site Haritası ve Dizin | LadeStack',
    description: 'LadeStack’in geliştirici araçları, teknik dokümantasyon, mimari rehberleri ve blog yazılarını içeren eksiksiz dizinini inceleyin.',
    ogTitle: 'LadeStack Site Haritası ve Dizin',
    ogDescription: 'LadeStack platformundaki tüm sayfaların, araçların, belgelerin ve teknik yayınların tam dizini.',
  },
  hero: {
    badge: 'Gezinme ve Dizin',
    title: 'Site İndeksi ve Dizin',
    description: 'LadeStack platformundaki tüm sayfaların, araçların, belgelerin ve mühendislik yayınlarının erişilebilir tam haritası.',
  },
  sections: {
    corePlatform: {
      title: 'Temel Platform Rotaları',
      items: [
        { title: 'Ana Sayfa', href: '/', desc: 'Canlı araç tanıtımları ve etkileşimli kod demosu içeren platform ana sayfası' },
        { title: 'LadeStack Hakkında', href: '/about', desc: 'Kurucu biyografisi, mühendislik ilkeleri ve doğrulanmış ürün portföyü' },
        { title: 'GB Coder', href: '/gb-coder', desc: 'Monaco Editör, Statik Editör ve WebContainer ortamı içeren tarayıcı yerel IDE' },
        { title: 'Ürünler ve Araçlar', href: '/apps', desc: 'Tarayıcı içinde çalışan istemci taraflı geliştirici araçları kataloğu' },
        { title: 'Dokümantasyon', href: '/docs', desc: 'Teknik şartnameler, mimari rehberleri ve platform sürüm geçmişi' },
        { title: 'Destek Merkezi', href: '/support', desc: 'Teknik yardım kanalları, tarayıcı uyumluluk kılavuzları ve SSS' },
        { title: 'İletişim', href: '/contact', desc: 'Kurucu doğrudan posta kutusu, mühendislik kanalları ve geri bildirim' },
      ],
    },
    tools: {
      title: 'Geliştirici Araçları ve Uygulamalar',
      openTool: 'Aracı Aç',
      comingSoon: 'Yakında',
      live: 'Yayında',
    },
    blogArchive: {
      title: 'Mühendislik Blog Arşivi (27 Makale)',
      notice: 'Not: Mühendislik blog makaleleri şu anda yalnızca İngilizce olarak yayınlanmaktadır. Makalelerin çok dilli yerelleştirmesi Aşama 3 için planlanmıştır.',
      visitBlog: 'Blog Dizinini Ziyaret Et →',
    },
    legal: {
      title: 'Yasal ve Gizlilik Yönetimi',
      items: [
        { title: 'Gizlilik Politikası', href: '/privacy', desc: 'İstemci taraflı işleme mimarisi, veri sınırları ve yerel depolama ilkeleri' },
        { title: 'Kullanım Koşulları', href: '/terms', desc: 'Ticari kullanım hakları, lisanslama şartları ve sorumluluk sınırlamaları' },
      ],
    },
  },
};
