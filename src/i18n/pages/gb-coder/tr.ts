import type { GbCoderPageData } from './types';

export const tr: GbCoderPageData = {
  seo: {
    title: 'GB Coder — Tarayıcı İçi IDE ve Geliştirme Stüdyosu | LadeStack',
    description: 'GB Coder ile doğrudan tarayıcınızda kod yazın, çalıştırın ve önizleyin. Monaco Editor, anlık DOM önizlemesi, WebContainer Node.js ve yerel gizlilik. Ücretsiz.',
    ogTitle: 'GB Coder — Tarayıcı İçi IDE ve Geliştirme Stüdyosu | LadeStack',
    ogDescription: 'GB Coder ile doğrudan tarayıcınızda kod yazın, çalıştırın ve önizleyin. Monaco Editor, anlık DOM önizlemesi, WebContainer Node.js ve yerel gizlilik. Ücretsiz.',
  },
  hero: {
    badge: 'Tarayıcı Öncelikli Web Geliştirme Stüdyosu',
    titleLine: 'Kodunuzu doğrudan tarayıcınızda',
    titleHighlight: 'anında oluşturun, çalıştırın ve dağıtın.',
    description: 'GB Coder, Monaco Editor ile çift yürütme motorunu birleştirir: tüm modern tarayıcılarda anlık statik web prototipleme ve WebContainers ile bellek içi Node.js tam yığın geliştirme.',
    ctaStudio: "GB Coder Studio'yu Başlat",
    ctaProjects: "WebContainer IDE'yi Başlat",
    trustBadges: [
      'İstemci Tarafı Gizlilik',
      'Milisaniyelik Derleme',
      'Sonsuza Kadar Ücretsiz · Paywall Yok',
    ],
  },
  environments: {
    eyebrow: 'Çift Yürütme Mimarisi',
    title: 'Amaca Uygun İki Kodlama Motoru',
    description: 'İş akışınız için en uygun ortamı seçin: ultra hızlı statik web prototipleme veya tarayıcıda tam kapsamlı Node.js geliştirme.',
    staticCard: {
      badge: 'Evrensel Tarayıcı Desteği',
      engine: 'Anlık İstemci Kum Havuzu',
      title: 'Statik ve Çok Dosyalı Prototipleme',
      description: 'HTML5, CSS3 ve JavaScript için sıfır kurulumlu kodlama. Monaco editörü ile gerçek zamanlı DOM senkronizasyonu, sözdizimi vurgulama, kaydederken biçimlendirme ve CDN betik enjeksiyonu.',
      features: [
        'Yazarken milisaniyenin altında DOM senkronizasyonu',
        'Harici CDN kütüphanesi enjeksiyonu (Tailwind, Lucide, Bootstrap)',
        'Modern masaüstü ve mobil tarayıcılar genelinde destek',
      ],
      status: 'Sıfır derleme gecikmesi',
      cta: 'Prototiplemeye Başla',
    },
    webContainerCard: {
      badge: 'Tam Yığın Mikro İşletim Sistemi',
      engine: 'Tarayıcıda Node.js',
      title: 'Gelişmiş WebContainer IDE',
      description: 'Doğrudan tarayıcı belleğinde çalışan tam yığın Node.js ortamı. npm install çalıştırın, paket betiklerini yürütün, Vite sunucularını başlatın ve React/Vue şablonlarıyla geliştirin.',
      features: [
        'Node.js çalışma zamanları ve npm paket kurulumları',
        'Hızlı modül yenilemeli (HMR) React ve Vue şablonları',
        'SharedArrayBuffer ve Web Worker tabanlı yalıtılmış kum havuzu',
      ],
      status: 'Chromium ve Firefox Desteği',
      cta: "WebContainer IDE'yi Başlat",
    },
  },
  pillars: {
    eyebrow: 'Temel Özellikler',
    title: 'Hassasiyet, Hız ve Gizlilik İçin Tasarlandı',
    description: "GB Coder'ın her özelliği, tarayıcınızda kurumsal düzeyde kodlama yetenekleri sunmak için geliştirildi.",
    items: [
      {
        icon: 'code-2',
        title: 'Monaco Kod Editörü',
        badge: 'VS Code Motoru',
        description: "VS Code'un arkasındaki endüstri standardı kod editörü. TypeScript sözdizimi doğrulaması, otomatik tamamlama, çoklu imleç ve kod katlama özellikleri içerir.",
      },
      {
        icon: 'eye',
        title: 'Anlık Canlı Önizleme',
        badge: 'Senkronize DOM',
        description: 'Siz yazarken HTML, CSS ve modern JavaScript’i anında işler. Ayrı pencerede önizleme ve yerel ağdaki cihazlar için mobil QR kod denetimi sunar.',
      },
      {
        icon: 'cpu',
        title: 'WebContainer Mikro İşletim Sistemi',
        badge: 'Bellek İçi Node.js',
        description: 'Gerçek Node.js süreçlerini çalıştırın, npm betiklerini tetikleyin ve Vite geliştirme sunucularını doğrudan tarayıcı belleğinde başlatın.',
      },
      {
        icon: 'shield-check',
        title: 'Yerel Öncelikli Kalıcılık',
        badge: 'İstemci Gizliliği',
        description: 'Çalışma alanları cihazınızdaki IndexedDB’ye güvenle kaydedilir. Zorunlu hesap kaydı veya arka planda sunucuya telemetri gönderimi yoktur.',
      },
      {
        icon: 'layers',
        title: 'Çok Dosyalı Mimari',
        badge: 'Modüler Yapı',
        description: 'Temiz bir dosya gezgini ve sekme yönetimi ile karmaşık web bileşenlerini birden çok dosya ve dizinde düzenleyin.',
      },
      {
        icon: 'download',
        title: 'Güvenli Yedekleme',
        badge: 'ZIP Arşivleri',
        description: 'Çalışma alanlarını dizin yapısını koruyarak istediğiniz zaman standart ZIP arşivi olarak dışa aktarın. Tek tıkla içe aktararak projelerinizi geri yükleyin.',
      },
    ],
  },
  guardrails: {
    eyebrow: 'Teknik Standartlar ve Destek Sınırları',
    title: 'WebContainer Çalışma Zamanı ve Tarayıcı Uyumluluğu',
    desc1: "GB Coder; SharedArrayBuffer ve çapraz kaynak yalıtımını (COOP/COEP) destekleyen modern tarayıcılarda WebContainers kullanarak gerçek Node.js süreçlerini çalıştırır.",
    desc2: 'Hafif prototipleme veya yalıtım başlıklarının kısıtlandığı ortamlar için (Apple Safari dahil), Statik Editörümüz harici bağımlılık olmadan anında alternatif sağlar.',
    supportedHeading: 'Desteklenen Ortamlar',
    environments: [
      { browser: 'Google Chrome', support: 'WebContainer + Statik Editör', highlight: true },
      { browser: 'Microsoft Edge', support: 'WebContainer + Statik Editör', highlight: true },
      { browser: 'Brave Browser', support: 'WebContainer + Statik Editör', highlight: true },
      { browser: 'Mozilla Firefox', support: 'WebContainer (COOP/COEP)', highlight: true },
      { browser: 'Apple Safari', support: 'Statik Editör Modu', highlight: false },
    ],
  },
  faqs: {
    eyebrow: 'Teknik Sorular & Cevaplar',
    title: 'Sıkça Sorulan Sorular',
    description: "GB Coder'ın yetenekleri, mimarisi ve çalışma sınırları hakkında şeffaf ve net bilgiler.",
    items: [
      {
        q: 'GB Coder uzak sunucu olmadan tam yığın kodu nasıl çalıştırır?',
        a: "GB Coder; SharedArrayBuffer ve COOP/COEP yalıtımını kullanan WebContainer teknolojisi sayesinde tarayıcı sekmenizde gerçek Node.js süreçlerini ve WebAssembly mikro ortamlarını çalıştırır. Geliştirme sunucuları ve derleme adımları tamamen yerel donanımınızda gerçekleşir.",
      },
      {
        q: 'Statik Editör ile WebContainer IDE arasındaki fark nedir?',
        a: 'Statik ve Çok Dosyalı Editör; HTML, CSS ve vanilla JS için tüm tarayıcılarda sıfır gecikmeli DOM çıktısı sağlar. Gelişmiş WebContainer IDE ise Node.js paket yöneticilerini, npm betiklerini ve React/Vue gibi modern çatıları çalıştırır.',
      },
      {
        q: 'Kaynak kodlarım ve projelerim LadeStack sunucularına yüklenir mi?',
        a: 'Hayır. GB Coder katı bir yerel öncelikli modelle çalışır. Kodunuz, varlıklarınız ve proje durumlarınız tarayıcınızın IndexedDB deposuna kaydedilir. LadeStack kodlarınızı sunucularda saklamaz ve izlemez.',
      },
      {
        q: 'GB Coder hangi tarayıcıları destekler?',
        a: 'Statik Editör; Apple Safari, Google Chrome, Microsoft Edge ve Mozilla Firefox dahil tüm modern tarayıcılarda çalışır. Gelişmiş WebContainer IDE ise Chromium tabanlı tarayıcılarda (Chrome, Edge, Brave) ve COOP/COEP etkin modern Firefox üzerinde çalışır. Mevcut WebKit sınırlamaları nedeniyle Safari kullanıcıları zengin özellikli Statik Editörü kullanabilir.',
      },
      {
        q: 'GB Coder tamamen ücretsiz mi?',
        a: 'Evet, kullanımı tamamen ücretsizdir. Abonelik ücreti, kredi kartı zorunluluğu veya günlük derleme kotası yoktur. LadeStack açık geliştirici ekosisteminin bir parçası olarak Girish Lade tarafından geliştirilmekte ve sürdürülmektedir.',
      },
      {
        q: "GB Coder içinde nasıl yeni bir proje oluşturabilirim?",
        a: "GB Coder'ı açın ve çalışma alanınız için uygun ortamı seçin. HTML, CSS ve JavaScript ile hızlı istemci tarafı prototipleme yapmak için Static Editor modunu başlatın. npm paketleri ve ön uç çatıları içeren tam yığın Node.js projeleri için WebContainer IDE üzerinde bir çalışma alanı açabilir, hazır başlangıç şablonlarından birini seçebilir veya yeni dosyalar oluşturabilirsiniz.",
      },
      {
        q: "GB Coder içinde hangi programlama dillerini yazabilir ve düzenleyebilirim?",
        a: "GB Coder, JavaScript, TypeScript, HTML, CSS, JSON ve Markdown dahil olmak üzere birçok dil için sözdizimi vurgulama, otomatik tamamlama, parantez eşleştirme ve kod daraltma özellikleri sunan Microsoft Monaco Editor motorunu kullanır. Çok sayıda dilde düzenleme yapabilirsiniz; ancak tarayıcı içi doğrudan kod çalıştırma Web teknolojileri ve Node.js çalışma ortamlarına odaklanmıştır.",
      },
      {
        q: "Kod yazarken web sitemi canlı olarak önizleyebilir miyim?",
        a: "Evet. GB Coder gerçek zamanlı canlı önizleme olanağı sunar. Static Editor modunda kod yazdıkça DOM değişiklikleri yalıtılmış bir iframe kum havuzunda milisaniyenin altında bir gecikmeyle anında güncellenir. WebContainer IDE modunda ise önizleme, yerel geliştirme sunucuları ve sıcak modül yenileme (HMR) aracılığıyla sunulur; ayrıca harici pencere ve yerel ağ QR kod testi desteklenir.",
      },
      {
        q: "GB Coder içinde npm paketleri yükleyebilir ve terminal komutları çalıştırabilir miyim?",
        a: "Evet, WebContainer IDE ortamında çalıştırabilirsiniz. WebContainer motoru, doğrudan tarayıcı belleğinde gerçek Node.js süreçleri yürütür. Bu sayede uzak bir sunucuya veya masaüstü çalışma zamanına ihtiyaç duymadan terminal komutları girebilir, uyumlu paketler için npm install çalıştırabilir ve derleme betiklerini yürütebilirsiniz.",
      },
      {
        q: "GB Coder içinde modern JavaScript çatıları (framework) kullanarak proje geliştirebilir miyim?",
        a: "Evet. WebContainer IDE, hazır başlangıç şablonları ve Vite geliştirme sunucuları ile React ve Vue gibi modern ön uç çatılarını destekler. Statik çatı derlemeleri veya CDN üzerinden eklenen bileşenler doğrudan Static Editor ortamında da prototiplenebilir.",
      },
      {
        q: "GB Assist yapay zeka asistanı kodlama sırasında bana nasıl yardımcı olabilir?",
        a: "GB Assist; karmaşık kodları açıklama, mimari iyileştirmeler önerme, işlevsel şablon kodlar üretme ve çalışma zamanı hatalarını inceleme konularında yardımcı olan akıllı bir kodlama yardımcısıdır. Tüm öneriler satır içi olarak sunulur, böylece projenize dahil etmeden önce değişiklikleri inceleyip onaylayabilirsiniz.",
      },
      {
        q: "GB Coder'daki yapay zeka özelliklerini kullanmak için kendi API anahtarım gerekli mi?",
        a: "Evet. GB Coder yapay zeka özellikleri için Kendi Anahtarını Getir (BYOK - Bring-Your-Own-Key) mimarisini uygular. OpenAI, Anthropic veya Google Gemini gibi desteklenen sağlayıcılardan edindiğiniz özel API anahtarınızı tanımlarsınız. İstekler tarayıcınızdan sağlayıcıya doğrudan HTTPS üzerinden iletilir; LadeStack hiçbir zaman API anahtarlarınızı veya kod istemlerinizi aracı olarak işlemez, incelemez veya kaydetmez.",
      },
      {
        q: "GB Coder'da projelerim ve kod değişikliklerim nasıl kaydedilir?",
        a: "GB Coder; proje dosyalarınızı, dizin yapınızı ve çalışma alanı durumunuzu IndexedDB kullanarak tarayıcınızın yerel depolama alanına kaydeder. Kodlarınız asla LadeStack sunucularına yüklenmez. Veriler yerel tarayıcıda saklandığı için tarayıcı geçmişini temizlemek, gizli pencere kullanmak veya site verilerini sıfırlamak projeleri silebilir. Önemli çalışmalarınız için düzenli olarak ZIP yedekleri dışa aktarın.",
      },
      {
        q: "GB Coder proje dosyalarımı indirebilir veya dışa aktarabilir miyim?",
        a: "Evet. Çalışma alanınızın tamamını istediğiniz zaman standart bir ZIP arşivi olarak dışa aktarabilirsiniz. İndirilen arşiv klasör yapınızı, kaynak kodlarınızı ve yapılandırma dosyalarınızı eksiksiz korur; böylece masaüstünüzdeki VS Code üzerinde çalışmaya devam edebilir veya projenizi doğrudan bir sunucuya ve Git deposuna dağıtabilirsiniz.",
      },
      {
        q: "Düzenleyici, terminal veya canlı önizleme çalışmayı durdurursa ne yapmalıyım?",
        a: "Öncelikle kullandığınız tarayıcının seçilen ortamı desteklediğinden emin olun. WebContainer IDE; SharedArrayBuffer ve çapraz kaynak yalıtımı (COOP/COEP) etkin Chromium tabanlı tarayıcılar (Chrome, Edge, Brave) veya güncel Firefox gerektirir. Safari gibi desteklenmeyen tarayıcılarda Static Editor moduna geçin. Sorun devam ederse çalışmalarınızın yedeğini dışa aktarın ve sayfayı yenileyin. Sorun çözülmezse LadeStack Contact sayfası üzerinden destek talebi iletebilirsiniz.",
      },
    ],
  },
  cta: {
    title: 'Tarayıcınızda kod yazmaya, çalıştırmaya ve yayınlamaya hazır mısınız?',
    description: "GB Coder'ı hiçbir yükleme yapmadan hemen başlatın. Monaco Editor ve tarayıcı içi Node.js iş akışlarını bugün deneyimleyin.",
    launchStudioBtn: "GB Coder Studio'yu Başlat",
    exploreAllBtn: 'Tüm Araçları Keşfedin',
    footerTagline: 'GB Coder by LadeStack · Tarayıcı Öncelikli Mimari · Ücretsiz Kullanım',
  },
};
