import type { ContactPageData } from './types';

export const tr: ContactPageData = {
  seo: {
    title: 'İletişim – LadeStack Doğrudan Geliştirici Desteği',
    description: "Geliştirici araçları, geri bildirimler ve teknik destek için LadeStack ile iletişime geçin. Doğrudan e-posta: admin@ladestack.in.",
    ogTitle: 'İletişim – LadeStack Doğrudan Geliştirici Desteği',
    ogDescription: "Geliştirici araçları, geri bildirimler ve teknik destek için LadeStack ile iletişime geçin. Doğrudan e-posta: admin@ladestack.in.",
  },
  hero: {
    badge: 'Doğrudan İletişim',
    title: 'Bizimle İletişime Geçin',
    description: 'İstemci tarafı araçlarımız, özellik önerileri veya kurumsal ihtiyaçlarınız hakkındaki sorularınız için bize yazın.',
  },
  cards: [
    { icon: 'mail', label: 'Doğrudan E-posta', title: 'admin@ladestack.in', sub: 'Kurucu doğrudan gelen kutusu', href: 'mailto:admin@ladestack.in' },
    { icon: 'message-square', label: 'Teknik Destek', title: 'Mühendislik Yardımı', sub: 'Mimari ve hata bildirimleri', href: 'mailto:admin@ladestack.in' },
    { icon: 'map-pin', label: 'Merkez', title: 'Mumbai, Hindistan', sub: 'Küresel uzaktan çalışma', href: null },
    { icon: 'globe', label: 'Mimari', title: 'İstemci Tarafı', sub: 'Tarayıcıda yerel yürütme', href: null },
  ],
  form: {
    title: 'Mesaj Gönderin',
    description: 'Gelen iletileri düzenli olarak inceliyor ve en kısa sürede yanıtlıyoruz.',
    fallbackPrefix: 'E-posta istemcinizden doğrudan yazmayı tercih ediyorsanız:',
    fallbackLinkText: 'admin@ladestack.in',
    nameLabel: 'Adınız Soyadınız',
    namePlaceholder: 'Ahmet Yılmaz',
    emailLabel: 'E-posta Adresiniz',
    emailPlaceholder: 'ahmet@example.com',
    subjectLabel: 'Konu',
    subjectPlaceholder: 'GB Coder veya istemci araçları hakkında soru',
    messageLabel: 'Mesajınız',
    messagePlaceholder: 'Sorunuzu, hata bildirimini veya özellik önerinizi ayrıntılı olarak açıklayın...',
    submitButton: 'Mesajı Gönder',
    successMessage: 'Teşekkürler! Mesajınız hazırlandı. E-posta programınız açılmadıysa lütfen doğrudan admin@ladestack.in adresine yazın.',
  },
  faqs: {
    eyebrow: 'Sıkça Sorulanlar',
    title: 'İletişim ve Destek SSS',
    description: 'Yanıt süreleri, iş birlikleri ve küresel erişilebilirlik hakkında bilgiler.',
    items: [
      {
        q: 'Ne kadar sürede yanıt alabilirim?',
        a: 'Mesajları düzenli olarak kontrol ediyoruz ve genellikle 1–2 iş günü içinde ayrıntılı yanıt veriyoruz.',
      },
      {
        q: 'Hata bildiriminde bulunabilir veya yeni özellik talep edebilir miyim?',
        a: "Evet! Lütfen admin@ladestack.in adresine e-posta gönderin veya github.com/girishlade111 adresindeki GitHub depomuzda bir Issue açın.",
      },
      {
        q: 'Mühendislik ekipleri için özel entegrasyonlar sunuyor musunuz?',
        a: 'Evet. Ekibiniz istemci tarafı araçlarımızın yerel/kendi sunucularınızda barındırılan sürümlerine ihtiyaç duyuyorsa bizimle iletişime geçebilirsiniz.',
      },
      {
        q: 'LadeStack küresel olarak kısıtlama olmadan kullanılabilir mi?',
        a: 'Evet, platformumuza modern tarayıcılardan dünyanın her yerinden herhangi bir bölgesel engel veya ücret duvarı olmadan erişilebilir.',
      },
    ],
  },
};
