import type { SupportPageData } from './types';

export const trSupport: SupportPageData = {
  seo: {
    title: 'Destek Merkezi – Yardım, Belgeler ve SSS | LadeStack',
    description: 'LadeStack geliştirici araçları için teknik destek alın. Belgeleri inceleyin, sorun giderme yanıtlarını okuyun veya mühendislik ekibimizle doğrudan iletişime geçin.',
    ogTitle: 'LadeStack Destek Merkezi – Yardım ve SSS',
    ogDescription: 'Mimari, veri işleme ilkeleri ve tarayıcı uyumluluğu hakkında net yanıtlar bulun veya LadeStack ile doğrudan iletişim kurun.',
  },
  hero: {
    badge: 'Destek ve Yardım',
    title: 'Size nasıl yardımcı olabiliriz?',
    description: 'İş akışlarındaki sorunları giderin, teknik belgeleri inceleyin, gizlilik ilkelerini öğrenin veya mühendislik ekibimizle doğrudan iletişime geçin.',
  },
  channelsSection: {
    heading: 'Destek Kanalları',
    channels: [
      {
        icon: 'mail',
        title: 'Doğrudan E-posta Desteği',
        description: 'Mimari sorular, hata bildirimleri ve iş birliği talepleri için kurucuya ve mühendislik ekibine doğrudan ulaşın.',
        responseTime: '1–2 iş günü',
        action: 'admin@ladestack.in',
        href: 'mailto:admin@ladestack.in',
      },
      {
        icon: 'book-open',
        title: 'Teknik Dokümantasyon',
        description: 'GB Coder mimarisini, istemci taraflı WebAssembly araçlarını ve yerel çalıştırma gereksinimlerini açıklayan kılavuzlar.',
        responseTime: 'Anında kendi kendine hizmet',
        action: 'Belgeleri İnceleyin',
        href: '/docs',
      },
      {
        icon: 'message-square',
        title: 'GitHub Topluluğu',
        description: 'Açık kaynak hata takipçisi, özellik önerileri ve genel GitHub depomuzdaki topluluk tartışmaları.',
        responseTime: 'Genel sorunlar',
        action: 'GitHub Deposunu Ziyaret Edin',
        href: 'https://github.com/girishlade111',
      },
    ],
  },
  faqSection: {
    badge: 'Yardım ve SSS',
    title: 'Sıkça Sorulan Sorular',
    description: 'Araç kullanılabilirliği, belge işleme, tarayıcı uyumluluğu ve teknik destek hakkında kesin ve net yanıtlar.',
    faqs: [
      {
        question: 'LadeStack araçları ticari projelerde ücretsiz olarak kullanılabilir mi?',
        answer: 'Evet. GB Coder içinde oluşturulan kodlar ile LS PDF Toolkit ve LS Image Compressor çıktısı belgeler, herhangi bir platform telif ücreti olmaksızın kişisel ve ticari müşteri projelerinde serbestçe kullanılabilir.',
      },
      {
        question: 'Belgeler ve kodlar işlenirken veriler nasıl yönetilir?',
        answer: 'LS PDF Toolkit ve LS Image Compressor gibi istemci taraflı araçlar, WebAssembly ve Canvas API kullanarak dosyaları doğrudan tarayıcı belleğinde işler. Dosyalar LadeStack sunucularına asla yüklenmez. GB Coder için proje dosyaları, isteğe bağlı üçüncü taraf yapay zeka API’leri yapılandırılmadığı sürece tarayıcınızın IndexedDB deposunda yerel olarak saklanır.',
      },
      {
        question: 'LadeStack araçlarıyla hangi tarayıcılar uyumludur?',
        answer: 'LS PDF Toolkit, LS Image Compressor ve GB Coder Static Editor tüm modern güncel tarayıcılarda (Chrome, Firefox, Safari, Edge) sorunsuz çalışır. GB Coder Advanced IDE WebContainer ortamı için Chromium tabanlı tarayıcılar (Chrome, Edge, Brave vb.) en eksiksiz desteği sunar; Firefox kısmi desteğe sahiptir ve Safari’de bilinen WebContainer kısıtlamaları bulunmaktadır.',
      },
      {
        question: 'Bir hatayı nasıl bildirebilirim veya yeni bir özellik nasıl önerebilirim?',
        answer: 'github.com/girishlade111 adresindeki depomuzda bir sorun (issue) açarak veya tekrarlanabilir adımları admin@ladestack.in adresine e-posta göndererek geri bildirimde bulunabilirsiniz.',
      },
      {
        question: 'İstemci taraflı araçlar çevrimdışı çalışır mı?',
        answer: 'Tarayıcı önbelleğine bir kez yüklendikten sonra, LS PDF Toolkit ve LS Image Compressor gibi statik araçlar işlemlerini yerel işlemcinizde (CPU) yürüttüğü için sürekli internet bağlantısı olmadan da çalışabilir.',
      },
    ],
    ctaText: 'Destek Ekibine Doğrudan Ulaşın',
  },
};
