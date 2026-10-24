import type { DocsPageData } from './types';

export const trDocs: DocsPageData = {
  seo: {
    title: 'Belgeler – Mimari, Kılavuzlar ve API Referansı | LadeStack',
    description: 'LadeStack geliştirici araçları için kapsamlı teknik belgeler. Mimari kılavuzları, istemci taraflı WebAssembly iş akışları ve sürüm geçmişi.',
    ogTitle: 'LadeStack Geliştirici Belgeleri',
    ogDescription: 'GB Coder, LS PDF ve LS Image araçlarına yönelik teknik özellikler, mimari rehberleri ve öğreticiler.',
  },
  hero: {
    badge: 'Teknik Dokümantasyon',
    title: 'Geliştirici Belgeleri',
    description: 'LadeStack geliştirici platformuna ait teknik şartnameler, yerel çalıştırma mimari kılavuzları ve referans kaynakları.',
    searchPlaceholder: 'Belgelerde, araçlarda veya kılavuzlarda arayın…',
    searchAriaLabel: 'Belgelerde, araçlarda veya kılavuzlarda arama yapın',
  },
  categoriesSection: {
    title: 'Temel Mimari Kılavuzları',
    description: 'Ayrıntılı çalışma özelliklerini incelemek için aşağıdaki mimari kategorilerinden birini seçin.',
    viewGuide: 'Kılavuzu İncele',
    closeGuide: 'Kılavuzu Kapat',
    categories: [
      {
        id: 'getting-started',
        icon: 'book-open',
        title: 'Başlangıç Kılavuzu',
        description: 'Temel tasarım ilkeleri, tarayıcı çalıştırma modeli ve yerel öncelikli iş akışları',
        overview: 'LadeStack araçları, gizli verileri uzak arka uç sunucularına aktarmadan doğrudan kullanıcı tarayıcısında çalışır.',
        sections: [
          {
            title: 'Tarayıcıda Anında Çalıştırma',
            content: 'Kurulum gerektirmeden araçları anında başlatın. WebAssembly ikili modülleri ve Web Worker yapıları doğrudan yerel tarayıcı belleğinde başlatılır.',
          },
          {
            title: 'Yerel Depolama ve Bellek İzolasyonu',
            content: 'Proje dosyaları ve yüklenen belgeler yalnızca tarayıcı RAM’inde ve IndexedDB deposunda barındırılır. LadeStack sunucularına veri aktarılmaz. İsteğe bağlı yapay zeka özellikleri yalnızca siz yapılandırdığınızda dış API’lere bağlanır.',
          },
          {
            title: 'Üretim Paketlerini Dışa Aktarma',
            content: 'Derlenmiş statik web varlıklarını, düzenlenen PDF belgelerini veya sıkıştırılmış görselleri doğrudan yerel diskinize kaydedin.',
          },
        ],
      },
      {
        id: 'code-studio',
        icon: 'code-2',
        title: 'GB Coder Motoru',
        description: 'Statik Editör derlemesi, WebContainer Node.js emülasyonu ve Monaco entegrasyonu',
        overview: 'GB Coder’daki çift motorlu mimarinin ayrıntılı analizi: Hafif Statik Editör ve Gelişmiş WebContainer IDE.',
        sections: [
          {
            title: 'Çift Motorlu Mimari',
            content: 'Static Editor, HTML, CSS ve JavaScript’i başlatma gecikmesi olmadan tarayıcı içinde ayrıştırır. Advanced WebContainer IDE, Chromium tarayıcılarında yerel bir Node.js ortamı oluşturarak geliştirme sunucularını ve npm paketlerini çalıştırır.',
          },
          {
            title: 'Monaco Editor Entegrasyonu',
            content: 'Sözdizimi vurgulama, kod tamamlama, hata tanılama katmanları ve klavye kısayolları ile masaüstü kalitesinde kod düzenleme imkanı.',
          },
          {
            title: 'Yerel Kalıcılık ve Dışa Aktarma',
            content: 'Tarayıcının IndexedDB alanına otomatik proje kaydı ve yerel dağıtım için bağımlılıksız ZIP arşivi dışa aktarımı.',
          },
        ],
      },
      {
        id: 'pdf-wasm',
        icon: 'file-text',
        title: 'LS PDF Toolkit',
        description: 'Bellek içi izolasyon ve WebAssembly ile güçlendirilmiş istemci taraflı PDF işleme',
        overview: 'WebAssembly’nin ikili PDF veri akışlarını doğrudan tarayıcı belleğinde nasıl ayrıştırıp işlediğinin teknik açıklaması.',
        sections: [
          {
            title: 'Akışları Birleştirme ve Ayırma',
            content: 'Sunucuya yükleme yapmadan ve kalite kaybı yaşamadan birden çok PDF belgesini birleştirin veya sayfa aralıklarını ayırın.',
          },
          {
            title: 'Bellek İçi Optimizasyon Sıkıştırması',
            content: 'Son dosya boyutunu en aza indirmek için akış nesnelerini ve gömülü yazı tiplerini yerel olarak optimize eder.',
          },
          {
            title: 'İstemci Taraflı Güvenlik',
            content: 'PDF belgelerini diske kaydetmeden önce doğrudan tarayıcı RAM’inde parola ile koruyun ve şifreleyin.',
          },
        ],
      },
      {
        id: 'image-engine',
        icon: 'image',
        title: 'LS Image Engine',
        description: 'Canvas ve WebAssembly ile çoklu format görsel işleme ve anlık önizleme',
        overview: 'Web Worker yapıları kullanarak istemci tarafında görsel dönüştürme, sıkıştırma ve görsel fark karşılaştırması.',
        sections: [
          {
            title: 'Geniş Format Desteği',
            content: 'AVIF, WebP, PNG, JPEG, SVG ve TIFF dahil olmak üzere modern web standartlarına tam destek.',
          },
          {
            title: 'Kalite Kalibrasyonu',
            content: 'Kayıplı sıkıştırma eşiklerini ve renk alt örneklemesini gerçek zamanlı görsel fark denetleyicisi ile ayarlayın.',
          },
        ],
      },
    ],
  },
  articlesSection: {
    title: 'Öne Çıkan Teknik Makaleler',
    description: 'Güvenlik sınırları, gizlilik korumaları ve web varlığı optimizasyonunu kapsayan teknik rehberler.',
    readArticle: 'Makalenin Tamamını Oku',
    closeArticle: 'Makaleyi Kapat',
    stepsTitle: 'Uygulama Adımları:',
    summaryLabel: 'Özet:',
    articles: [
      {
        id: 'client-side-privacy',
        title: 'İstemci Taraflı Gizlilik Mimarisini Anlamak',
        category: 'Güvenlik',
        readTime: '4 dk okuma süresi',
        intro: 'LadeStack’in WebAssembly bellek izolasyonu ve tarayıcı korumalı alanı (sandbox) ile hassas kullanıcı belgelerini nasıl koruduğunu keşfedin.',
        steps: [
          'Web Worker aracılığıyla tarayıcı bellek korumalı alanı ayrılması.',
          'Uzak sunucuya veri göndermeden yerel WebAssembly bayt işleme.',
          'Durumun korunması için izole edilmiş IndexedDB depolaması.',
          'Tarayıcı sekmesi kapatıldığında anında bellek temizliği (garbage collection).',
        ],
        summary: 'Veri işlemini kullanıcının cihazında tutarak LadeStack, sunucu tarafındaki depolama risklerini ortadan kaldırır ve yüksek hız sağlar.',
      },
      {
        id: 'optimizing-assets',
        title: 'Web Varlık Sıkıştırması İçin En İyi Uygulamalar',
        category: 'Performans',
        readTime: '6 dk okuma süresi',
        intro: 'Görsel kaliteyi belirgin şekilde bozmadan görsel ve belge boyutlarını büyük ölçüde azaltma teknikleri.',
        steps: [
          'Raster grafikler için modern AVIF veya WebP formatlarını seçin.',
          'Görsel farkları denetleyerek kayıplı sıkıştırma parametrelerini optimize edin.',
          'Gereksiz EXIF kamera meta verilerini ve renk profillerini kaldırın.',
          'Mobil cihazlarda Largest Contentful Paint (LCP) performansını ölçün.',
        ],
        summary: 'Hedefe yönelik istemci taraflı sıkıştırma, bant genişliği tüketimini düşürür ve Core Web Vitals metriklerinde ölçülebilir iyileşme sağlar.',
      },
    ],
  },
  changelogSection: {
    title: 'Platform Sürüm Geçmişi',
    description: 'En son platform sürümleri, mimari yenilikler ve yetenek genişletmeleri.',
    items: [
      {
        version: 'v1.0.0',
        date: 'Ekim 2026',
        type: 'Ana Sürüm',
        description: 'Obsidian ve Precision Emerald tasarım yenilemesi, 9 dilde yerelleştirme, gelişmiş erişilebilirlik ve istemci performansı iyileştirmeleri.',
      },
      {
        version: 'v0.9.4',
        date: 'Ağustos 2026',
        type: 'İyileştirme',
        description: 'LS PDF araç setine bellek içi sıkıştırma ve yeni istemci taraflı belge işleme yetenekleri eklendi.',
      },
      {
        version: 'v0.9.0',
        date: 'Haziran 2026',
        type: 'Özellik',
        description: 'GB Coder tarayıcı yerel çift motorlu geliştirme ortamının ilk genel lansmanı.',
      },
    ],
  },
};
