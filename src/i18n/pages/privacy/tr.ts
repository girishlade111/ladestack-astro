import type { PrivacyPageData } from './types';

export const trPrivacy: PrivacyPageData = {
  seo: {
    title: 'Gizlilik Politikası – Veri Koruma ve Mimari | LadeStack',
    description: 'LadeStack’in istemci taraflı WebAssembly çalıştırması, yerel IndexedDB depolaması ve şeffaf veri ilkeleriyle verilerinizi nasıl koruduğunu öğrenin.',
    ogTitle: 'LadeStack Gizlilik Politikası',
    ogDescription: 'İstemci taraflı veri işleme mimarisi, veri toplama sınırları ve kullanıcı gizliliği güvenceleri.',
  },
  header: {
    badge: 'Gizlilik ve Veri Koruma',
    title: 'Gizlilik Politikası',
    lastUpdated: 'Son Güncelleme: Ekim 2026',
    effectiveDate: 'Derhal Geçerlidir',
  },
  disclaimer: {
    title: 'Yetkili Metin Bildirimi',
    text: 'Bu Gizlilik Politikasının İngilizce sürümü, LadeStack’in gizlilik uygulamalarını belirleyen tek yetkili ve yasal metindir. Diğer dillere yapılan çeviriler yalnızca bilgilendirme ve kolaylık sağlamak amacıyla sunulmuş olup bağımsız bir hukuk onayından geçmemiştir.',
  },
  highlights: [
    { icon: 'shield-check', text: 'İstemci Taraflı Çalıştırma' },
    { icon: 'lock', text: 'Sunucuda Dosya Saklanmaz' },
    { icon: 'check-circle', text: 'Yerel Öncelikli Mimari' },
  ],
  sections: [
    {
      title: '1. İstemci Taraflı İşleme Mimarisi',
      paragraphs: [
        'LadeStack, geliştirici araçlarını yerel öncelikli (local-first) mimari prensibiyle tasarlar. LS PDF Toolkit, LS Image Compressor ve GB Coder Static Editor dahil temel araçlar, WebAssembly, Web Worker ve HTML5 Canvas API’leri kullanılarak doğrudan tarayıcınızın çalışma zamanında yürütülür.',
        'İşlediğiniz dosyalar (PDF belgeleri, görseller ve kodlar) yalnızca tarayıcınızın geçici belleğinde (RAM) tutulur. Bu dosyalar işlem sırasında LadeStack arka uç sunucularına iletilmez ve orada saklanmaz.',
      ],
    },
    {
      title: '2. Toplanan Bilgiler ve Ağ Etkileşimleri',
      paragraphs: [
        'Bu web sitesindeki genel geliştirici araçlarına erişmek için hesap kaydı, kullanıcı girişi veya ödeme kartı bilgisi gerekmez. Ağ düzeyindeki etkileşimler aşağıdaki kapsamla sınırlıdır:',
      ],
      listItems: [
        'Temel web sunucusu erişim günlükleri: Altyapı kararlılığını sağlamak ve kötüye kullanımları önlemek amacıyla tarayıcı kullanıcı aracısı (user-agent), yönlendiren adres ve istenen dosya yollarını içeren standart tanı verileri.',
        'İsteğe bağlı üçüncü taraf yapay zeka entegrasyonları: GB Coder’da kullanıcılar harici yapay zeka sağlayıcılarının API anahtarlarını isteğe bağlı olarak yapılandırabilir. Bu durumda giden istekler kullanıcının tarayıcısından doğrudan ilgili üçüncü taraf uç noktasına iletilir.',
        'Gönüllü iletişimler: admin@ladestack.in adresine e-posta yoluyla gönderilen mesajlar yalnızca sorunuza yanıt vermek amacıyla işlenir.',
      ],
    },
    {
      title: '3. Yerel Depolama ve Çerezler',
      paragraphs: [
        'LadeStack, tarayıcının yerel depolama mekanizmalarını (localStorage ve IndexedDB) yalnızca gerekli işlevsel amaçlar için kullanır: Tema tercihlerini (karanlık/aydınlık) saklamak ve GB Coder projelerini sayfa yenilemeleri arasında korumak.',
        'Üçüncü taraf reklam izleme pikselleri veya ticari pazarlama çerezleri kesinlikle kullanılmaz.',
      ],
    },
    {
      title: '4. Veri Saklama ve Silme',
      paragraphs: [
        'LS PDF Toolkit ve LS Image Compressor tarafından işlenen dosyalar yalnızca geçici sistem belleğinde yer aldığından, tarayıcı sekmesini kapatmak veya yenilemek çalışan verileri anında sistem RAM’inden temizler.',
        'IndexedDB’ye kaydedilen GB Coder projeleri üzerinde kullanıcılar tam kontrole sahiptir ve istedikleri zaman tarayıcı site verilerini temizleyerek bu verileri kalıcı olarak silebilirler.',
      ],
    },
  ],
  contactNote: {
    title: '5. İletişim ve Gizlilik Soruları',
    text: 'Bu Gizlilik Politikası veya veri işleme mimarimiz hakkında sorularınız varsa, lütfen mühendislik ekibimizle iletişime geçin:',
    email: 'admin@ladestack.in',
  },
};
