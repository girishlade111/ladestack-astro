import type { TermsPageData } from './types';

export const trTerms: TermsPageData = {
  seo: {
    title: 'Kullanım Koşulları – Platform Kullanımı ve Lisanslama | LadeStack',
    description: 'LadeStack geliştirici araçlarını yöneten Kullanım Koşullarını, fikri mülkiyet haklarını, istemci taraflı çalıştırma sınırlarını ve yasal sorumluluk reddini inceleyin.',
    ogTitle: 'LadeStack Kullanım Koşulları',
    ogDescription: 'LadeStack geliştirici araçlarının kullanım şartları, çıktı sahipliği ve ticari kullanım hakları.',
  },
  header: {
    badge: 'Yasal ve Koşullar',
    title: 'Kullanım Koşulları',
    lastUpdated: 'Son Güncelleme: Ekim 2026',
    effectiveDate: 'Derhal Geçerlidir',
  },
  disclaimer: {
    title: 'Yetkili Metin Bildirimi',
    text: 'Bu Kullanım Koşullarının İngilizce sürümü, LadeStack’in kullanım şartlarını belirleyen tek yetkili ve yasal metindir. Diğer dillere yapılan çeviriler yalnızca bilgilendirme ve kolaylık sağlamak amacıyla sunulmuş olup bağımsız bir hukuk onayından geçmemiştir.',
  },
  sections: [
    {
      title: '1. Koşulların Kabulü',
      paragraphs: [
        'LadeStack platformuna (ladestack.in), bağlı alt alan adlarına veya burada sunulan tarayıcı tabanlı araçlara erişerek ya da bunları kullanarak, bu Kullanım Koşullarına bağlı kalmayı yasal olarak kabul etmiş sayılırsınız. Bu koşulların herhangi bir kısmını kabul etmiyorsanız, platforma erişimi derhal sonlandırmalısınız.',
      ],
    },
    {
      title: '2. İzin Verilen Kullanım ve Çıktı Sahipliği',
      paragraphs: [
        'LadeStack web araçlarını kişisel, eğitim, araştırma ve ticari yazılım geliştirme amacıyla kullanmanız için size münhasır olmayan, dünya çapında geçerli ve telifsiz bir lisans verilir.',
        'LadeStack araçları kullanılarak oluşturulan veya derlenen tüm kaynak kodlar, mimariler, belgeler ve görseller tamamen sizin fikri mülkiyetiniz olarak kalır. LadeStack, istemci tarafında işlediğiniz dosyalar veya kodlar üzerinde herhangi bir mülkiyet veya telif hakkı iddia etmez.',
      ],
    },
    {
      title: '3. Teknik Çalıştırma ve Ortam Gereksinimleri',
      paragraphs: [
        'LadeStack geliştirici araçları öncelikle WebAssembly, Web Worker ve modern tarayıcı API’leri kullanılarak istemci tarafında çalıştırılır. Performans ve stabilite, yerel cihaz donanımınıza ve tarayıcınıza doğrudan bağlıdır.',
        'GB Coder, modern tarayıcılarla uyumlu bir Static Editor ve Chromium tabanlı tarayıcılar için optimize edilmiş bir Advanced WebContainer IDE sunar. Çalışma ortamınızın gerekli teknik önkoşulları karşılamasını sağlamak sizin sorumluluğunuzdadır.',
      ],
    },
    {
      title: '4. Garantilerin Reddi',
      paragraphs: [
        'LadeStack tarafından sağlanan hizmetler ve araçlar "OLDUĞU GİBİ" (AS IS) ve "MEVCUT OLDUĞU ŞEKİLDE" (AS AVAILABLE) sunulmakta olup açık veya zımni hiçbir garanti verilmemektedir.',
        'Araçlarımızın kesintisiz veya hatasız çalışacağını veya tarayıcı güncellemelerinden kaynaklanan geçici uyumluluk dalgalanmalarından etkilenmeyeceğini garanti etmeyiz.',
      ],
    },
    {
      title: '5. Sorumluluğun Sınırlandırılması',
      paragraphs: [
        'Yürürlükteki yasaların izin verdiği azami ölçüde, LadeStack, kurucusu veya katkıda bulunanlar, araçlarımızın kullanımından veya kullanılamamasından doğan doğrudan, dolaylı, arızi veya cezai zararlardan sorumlu tutulamaz.',
      ],
    },
    {
      title: '6. Koşullarda Değişiklikler',
      paragraphs: [
        'Bu Kullanım Koşullarını dilediğimiz zaman değiştirme hakkımız saklıdır. Değişiklikler belgenin başındaki "Son Güncelleme" tarihine yansıtılır. Değişikliklerin yayınlanmasının ardından araçları kullanmaya devam etmeniz, güncellenen koşulları kabul ettiğiniz anlamına gelir.',
      ],
    },
  ],
  contactNote: {
    title: '7. Yasal ve Lisans Soruları',
    text: 'Bu Kullanım Koşulları veya lisanslama hakkında sorularınız için lütfen iletişime geçin:',
    email: 'admin@ladestack.in',
  },
};
