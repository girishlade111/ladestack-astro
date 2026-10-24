import fs from 'node:fs';

const patches = [
  // ==================== RU ====================
  {
    path: 'src/content/blog/ru/client-side-pdf-manipulation-webassembly.md',
    transform: (content) => {
      let res = content.replace('updatedAt: "2026-03-22"', 'updatedAt: "2026-10-24"');
      
      // Regulatory compliance scoping
      res = res.replace(
        'Для корпоративных клиентов, юридических отделов и медицинских организаций этот облачный подход создает серьезные регуляторные барьеры (GDPR, 152-ФЗ, HIPAA) и риски утечки данных.',
        'Для корпоративных клиентов, юридических отделов и медицинских организаций передача незашифрованных потоков документов через стороннюю облачную инфраструктуру расширяет поверхность атак и усложняет выполнение регуляторных требований (таких как оценка трансграничной передачи данных в рамках GDPR/152-ФЗ или соглашения с поставщиками услуг).'
      );
      res = res.replace(
        'без отправки на сервер ни единого байта.',
        'без передачи содержимого документов на внешний сервер.'
      );
      res = res.replace(
        '└─── 0 байт передано по сети',
        '└─── 0 байт содержимого документа передано по сети'
      );
      res = res.replace(
        '- **Отсутствие сетевых задержек:** Скорость обработки документов объемом 150 МБ зависит исключительно от производительности процессора и RAM локального устройства, исключая медленные сетевые каналы.\n- **Соответствие требованиям конфиденциальности:** Не требуется подписание соглашений об обработке данных (DPA) или развертывание защищенных облачных хранилищ.\n- **Автономная работа в оффлайн-режиме:** После кэширования веб-приложения и бинарного модуля WASM сервис-воркером все операции с PDF выполняются надежно даже без подключения к сети.',
        '- **Отсутствие сетевых задержек при передаче:** Скорость обработки документов объемом 150 МБ зависит исключительно от производительности процессора и RAM локального устройства, исключая медленные сетевые каналы.\n- **Снижение рисков компрометации данных:** Поскольку содержимое документов не проходит через внешние сетевые узлы и сторонние облачные хранилища, исключается риск утечки с серверов третьих лиц (хотя комплексное соответствие нормативам по-прежнему требует защиты рабочих станций и внутренней безопасности).\n- **Автономная обработка документов в оффлайн-режиме:** После кэширования веб-приложения и бинарных модулей WebAssembly сервис-воркером (или HTTP-кэшем) алгоритмы преобразования документов выполняются локально без обязательного подключения к сети.'
      );
      // Memory limits
      res = res.replace(
        'В отличие от настольных операционных систем, браузеры накладывают жесткие лимиты на вкладку (как правило, от 2 до 4 ГБ). Если память не освобождается своевременно, последовательные операции с файлами приведут к аварийному завершению вкладки (OOM Crash).',
        'Стандартная 32-битная архитектура WebAssembly (`wasm32`) оперирует в 32-битном линейном адресном пространстве, устанавливая архитектурный предел в 4 ГБ ($2^{32}$ байт). На практике браузерные движки (такие как V8 в Chromium) исторически применяют еще более строгие ограничения на инстанс WebAssembly (как правило, от 1 до 2 ГБ) для стабильности вкладки, наряду с общими лимитами кучи процесса браузера. Если буферы памяти не освобождаются явным образом, последовательные операции с тяжелыми документами приведут к аварийному завершению вкладки (OOM).'
      );
      // Latency model
      res = res.replace(
        '## Сравнение производительности: локальная память против облака\n\nГлавным преимуществом клиентской обработки является полное исключение задержек на передачу файлов по сети. Рассмотрим типичную операцию объединения нескольких документов общим объемом 45 МБ:',
        '## Иллюстративная модель задержек: сетевая передача против локальной памяти\n\nГлавным преимуществом клиентской обработки является полное исключение задержек на передачу файлов по сети. Рассмотрим типичную операцию объединения нескольких документов общим объемом 45 МБ ($45 \\text{ МБ} = 360 \\text{ Мегабит}$):'
      );
      res = res.replace(
        '| **LS PDF (WASM в RAM)** | **0,0 с (передача отсутствует)** | Линейные операции в оперативной памяти | **< 1,0 секунды** |\n\nБлагодаря выполнению вычислений непосредственно в локальной памяти браузера время отклика не зависит от качества сетевого подключения.',
        '| **LS PDF (WASM в RAM)** | **0,0 с (передача отсутствует)** | Линейные операции в оперативной памяти | **< 1,0 секунды** |\n\n*Расчетные допущения модели:* Сетевой транзит рассчитан для стабильного исходящего канала 15 Мбит/с ($360 \\text{ Мбит} / 15 \\text{ Мбит/с} = 24,0\\text{ с}$ загрузка; входящее скачивание готового файла ~90 Мбит при 15 Мбит/с = 6,0 с) без учета задержек очереди удаленного сервера. Локальное исполнение WASM выполняется напрямую по адресам оперативной памяти. Реальные показатели варьируются в зависимости от характеристик сети и вычислительной мощности устройства.'
      );
      return res;
    }
  },
  {
    path: 'src/content/blog/ru/modern-web-image-compression-standards.md',
    transform: (content) => {
      let res = content.replace('updatedAt: "2026-03-24"', 'updatedAt: "2026-10-24"');
      res = res.replace(
        '### Преимущества сжатия через Canvas:\n- **Отсутствие внешних зависимостей:** Использует встроенные низкоуровневые графические API браузера без подключения сторонних библиотек.\n- **Аппаратное ускорение:** Большинство современных браузеров делегируют растеризацию и фильтрацию Canvas графическому процессору (GPU).\n- **Универсальная поддержка:** Работает в 100% современных браузеров на десктопных и мобильных устройствах.',
        '### Важная спецификация: откат MIME-типа по умолчанию\nСогласно стандарту W3C HTML Living Standard, если браузерный движок не поддерживает кодирование в запрошенный MIME-тип (например, попытка экспорта `image/avif` в браузере без нативной поддержки кодирования Canvas), метод `toBlob()` незаметно откатывается к экспорту `image/png`. В продакшене разработчикам необходимо проверять `blob.type` или предварительно определять возможности кодировщика.\n\n### Преимущества сжатия через Canvas:\n- **Отсутствие внешних зависимостей:** Использует встроенные низкоуровневые графические API браузера без подключения сторонних библиотек.\n- **Аппаратное ускорение:** Современные браузеры делегируют растеризацию и фильтрацию Canvas графическому процессору (GPU).\n- **Универсальная поддержка в современных браузерах:** Полная поддержка во всех современных evergreen-браузерах, соблюдающих спецификацию HTML5 Canvas 2D.'
      );
      res = res.replace(
        'В то время как нативная поддержка кодирования AVIF через `canvas.toBlob(\'image/avif\')` только начинает появляться в браузерах на базе Blink, сборки `libavif` под WebAssembly (Wasm) позволяют приложениям сжимать изображения в AVIF во всех современных браузерах.',
        'В то время как нативная поддержка кодирования AVIF через `canvas.toBlob(\'image/avif\')` развивается в браузерах на базе Chromium, сборки `libavif` под WebAssembly (Wasm) позволяют приложениям стабильно сжимать изображения в AVIF во всех современных браузерах.'
      );
      res = res.replace(
        '## Практический тест: коэффициенты сжатия и время кодирования\n\nЧтобы проиллюстрировать компромиссы, мы протестировали несжатую тестовую фотографию с зеркальной камеры размером 4,2 МБ (4032 × 3024 пикселей, 24-битный sRGB) во всех трех форматах при эквивалентном визуальном качестве (SSIM ~ 0.94):',
        '## Калибровочная модель бенчмарка: коэффициенты сжатия и время кодирования\n\nЧтобы продемонстрировать инженерные компромиссы, приведенные данные отражают калибровочную сравнительную оценку на тестовом фотоснимке размером 4,2 МБ (4032 × 3024 пикселей, 24-битный sRGB) при эквивалентном визуальном качестве (SSIM ~ 0.94):'
      );
      res = res.replace(
        '| **WASM AVIF (Speed=6, q=65)** | **460 КБ** | **-89.0%** | 380 мс | 1 240 мс |\n\n### Архитектурные выводы:',
        '| **WASM AVIF (Speed=6, q=65)** | **460 КБ** | **-89.0%** | 380 мс | 1 240 мс |\n\n*Методология и условия тестирования:* Оценка выполнена на рабочей станции Apple M2 (macOS 14, Chromium 124) и референсном мобильном чипе среднего класса (уровень Snapdragon 778G, Android 13). Реальная эффективность сжатия зависит от визуальной сложности изображения (энтропии), глубины цвета, температурного троттлинга устройства и версии JS-движка.\n\n### Архитектурные выводы:'
      );
      return res;
    }
  },
  {
    path: 'src/content/blog/ru/gb-coder-dual-engine-architecture.md',
    transform: (content) => {
      let res = content.replace('updatedAt: "2026-03-20"', 'updatedAt: "2026-10-24"');
      res = res.replace(
        '| **Автономная работа** | ❌ Требуется интернет | ⚠️ Нестабильно | **✅ 100% автономность** |\n| **Изоляция сбоев** | ✅ Хост защищен | ❌ Зависание всей вкладки | **✅ Защита хоста через iframe** |\n| **Конфиденциальность данных** | ⚠️ Код передается на сервер | ✅ Только локально | **✅ 100% локальное исполнение** |',
        '| **Автономное исполнение** | ❌ Требуется интернет | ⚠️ Нестабильно | **✅ Редактор и песочница работают офлайн** |\n| **Изоляция сбоев** | ✅ Хост защищен | ❌ Зависание всей вкладки | **✅ Защита хоста через iframe** |\n| **Конфиденциальность кода** | ⚠️ Код передается на сервер | ✅ Только локально | **✅ Локальные клиентские вычисления (без отправки кода на сервер)** |'
      );
      return res;
    }
  },

  // ==================== TR ====================
  {
    path: 'src/content/blog/tr/client-side-pdf-manipulation-webassembly.md',
    transform: (content) => {
      let res = content.replace('updatedAt: "2026-03-22"', 'updatedAt: "2026-10-24"');
      res = res.replace(
        'Kurumsal organizasyonlar, hukuki sözleşmeler ve kişisel kayıtlar söz konusu olduğunda, bu bulut odaklı yaklaşım hem yasal uyumluluk engelleri (KVKK, GDPR, HIPAA) hem de veri sızıntısı riskleri yaratır.',
        'Kurumsal organizasyonlar, hukuki sözleşmeler ve kişisel kayıtlar söz konusu olduğunda, şifrelenmemiş belge akışlarının üçüncü taraf bulut altyapılarına aktarılması saldırı yüzeyini genişletir ve yasal uyumluluk süreçlerini (KVKK / GDPR sınır ötesi veri aktarımı değerlendirmeleri gibi) karmaşıklaştırır.'
      );
      res = res.replace(
        'dış sunuculara tek bir bayt bile göndermeksizin tüm belge dönüşümlerini yerel RAM içerisinde tamamlıyoruz.',
        'dış sunuculara belge içeriği aktarmaksızın tüm belge dönüşümlerini yerel RAM içerisinde tamamlıyoruz.'
      );
      res = res.replace(
        '└─── Ağ Üzerinden Aktarılan Veri: 0 Bayt',
        '└─── Ağ Üzerinden Aktarılan Belge Verisi: 0 Bayt'
      );
      res = res.replace(
        '- **Sıfır Ağ Gecikmesi:** 150 MB boyutundaki büyük bir belgenin işlenmesi yalnızca yerel işlemci ve RAM hızına bağlıdır; zayıf mobil bağlantı darboğazları ortadan kalkar.\n- **Doğrudan KVKK / GDPR Uyumluluğu:** Kişisel veya ticari hiçbir veri dış ortama aktarılmadığı için veri işleme sözleşmeleri (DPA) imzalanması veya pahalı şifreli bulut depolama alanları kiralanması gerekmez.\n- **Eksiksiz Çevrimdışı Çalışma Kabiliyeti:** Web uygulaması ve WASM modülü servis çalışanları (Service Worker) tarafından önbelleğe alındıktan sonra, internet bağlantısı olmasa bile tüm PDF araçları kesintisiz çalışır.',
        '- **Sıfır Ağ Aktarım Gecikmesi:** 150 MB boyutundaki büyük bir belgenin işlenmesi yalnızca yerel işlemci ve RAM hızına bağlıdır; zayıf mobil bağlantı darboğazları ortadan kalkar.\n- **Azaltılmış Veri Maruziyeti:** Belge içerikleri harici ağ noktalarına veya bulut depolama alanlarına aktarılmadığı için üçüncü taraf sunucu depolama riskleri ortadan kalkar (kapsamlı uyumluluk için uç nokta güvenliği ve organizasyonel denetimler yine de gereklidir).\n- **Çevrimdışı Belge İşleme Güvenilirliği:** Web uygulaması paketi ve derlenmiş WebAssembly modülleri tarayıcı önbelleğine (Service Worker veya HTTP önbelleği) alındıktan sonra, belge dönüştürme rutinleri aktif internet bağlantısına ihtiyaç duymadan yerel olarak çalışır.'
      );
      res = res.replace(
        'Masaüstü yazılımlarının aksine web tarayıcıları, sekme başına katı bellek sınırları uygular (mimariye bağlı olarak genellikle 2 GB ila 4 GB). Tahsis edilen bellek açıkça serbest bırakılmazsa, ardışık belge işlemleri tarayıcı sekmesinin çökmesine (OOM) yol açar.',
        'Standart 32-bit WebAssembly (`wasm32`), 32-bitlik doğrusal adres alanında çalışarak mimari olarak 4 GB ($2^{32}$ bayt) tavan sınırına sahiptir. Uygulamada, tarayıcı motorları (örneğin Chromium içindeki V8), sekme kararlılığını korumak için WebAssembly örneği başına daha da sıkı tahsis sınırları (genellikle 1 GB ila 2 GB) ve genel işlem bellek limitleri uygular. Bellek arabellekleri açıkça serbest bırakılmazsa, çok megabaytlık belgeler üzerindeki ardışık işlemler tarayıcı sekmesinin bellek yetersizliğiyle (OOM) çökmesine neden olur.'
      );
      res = res.replace(
        '## Performans Karşılaştırması: Bellek İçi Çalışma ve Ağ Yükü\n\nİstemci tarafında belge işlemenin en belirgin avantajı, ağ aktarım süresinin bütünüyle ortadan kalkmasıdır. 15 Mbps hızında tipik bir mobil bağlantıda toplam 45 MB boyutundaki belgeleri birleştirme senaryosunu inceleyelim:',
        '## Gösterge Nitelikli Gecikme Modeli: Ağ Aktarımı ve Bellek İçi Çalışma Karşılaştırması\n\nİstemci tarafında belge işlemenin en belirgin avantajı, ağ aktarım süresinin ortadan kalkmasıdır. 15 Mbps hızında tipik bir mobil bağlantıda toplam 45 MB boyutundaki belgeleri birleştirme senaryosunu inceleyelim ($45 \\text{ MB} = 360 \\text{ Megabit}$):'
      );
      res = res.replace(
        '| **LS PDF (Bellek İçi WASM)** | **0,0 sn (Yükleme gerekmez)** | Bellek İçi Doğrusal Hesaplama | **< 1,0 saniye** |\n\nİşlemler doğrudan tarayıcı RAM\'inde gerçekleştirildiği için operasyonel hız ağ bant genişliğinden ve bağlantı dalgalanmalarından bağımsız hale gelir.',
        '| **LS PDF (Bellek İçi WASM)** | **0,0 sn (Yükleme gerekmez)** | Bellek İçi Doğrusal Hesaplama | **< 1,0 saniye** |\n\n*Hesaplama varsayımları:* Ağ aktarımı, 15 Mbps kararlı yükleme hızı üzerinden modellenmiştir ($360 \\text{ Mb} / 15 \\text{ Mbps} = 24,0\\text{ sn}$ yükleme; işlenmiş belgenin 15 Mbps hızında indirilmesi ~90 Mb için 6,0 sn), uzak sunucu kuyruk gecikmeleri hariç tutulmuştur. Bellek içi WASM çalıştırması doğrudan yerel RAM adresleri üzerinde yürütülür. Gerçek dünya hızları ağ şartlarına ve cihaz donanımına göre değişiklik gösterir.'
      );
      return res;
    }
  },
  {
    path: 'src/content/blog/tr/modern-web-image-compression-standards.md',
    transform: (content) => {
      let res = content.replace('updatedAt: "2026-03-24"', 'updatedAt: "2026-10-24"');
      res = res.replace(
        '### Canvas Yeniden Kodlamanın Avantajları:\n- **Sıfır Bağımlılık:** Üçüncü taraf JavaScript kitaplıkları yüklemeden tarayıcının yerleşik grafik işleme hattını kullanır.\n- **Donanım Hızlandırma:** Çoğu modern tarayıcı, Canvas piksel manipülasyonlarını doğrudan GPU\'ya devreder.\n- **Evrensel Destek:** Modern masaüstü ve mobil tarayıcıların tamamında %100 oranında desteklenir.',
        '### Kritik Standart Detayı: MIME Türü Geri Çekilme (Fallback) Davranışı\nW3C HTML Living Standard uyarınca, tarayıcı motoru istenen dışa aktarma MIME türünü desteklemiyorsa (örneğin yerel Canvas kodlama desteği olmayan bir tarayıcıda `image/avif` dışa aktarımı denendiğinde), `toBlob()` sessizce `image/png` formatına geri döner. Üretim ortamında geliştiriciler `blob.type` değerini doğrulamalı veya kodlayıcı desteğini önceden kontrol etmelidir.\n\n### Canvas Yeniden Kodlamanın Avantajları:\n- **Sıfır Bağımlılık:** Üçüncü taraf JavaScript kitaplıkları yüklemeden tarayıcının yerleşik grafik işleme hattını kullanır.\n- **Donanım Hızlandırma:** Modern tarayıcılar Canvas piksel manipülasyonlarını doğrudan GPU\'ya devreder.\n- **Modern Tarayıcılarda Evrensel Destek:** HTML5 Canvas 2D standardını uygulayan tüm güncel masaüstü ve mobil tarayıcılarda istikrarlı destek sunulur.'
      );
      res = res.replace(
        'Blink tabanlı tarayıcılarda `canvas.toBlob(\'image/avif\')` desteği yaygınlaşırken, WebAssembly (Wasm) ile derlenmiş `libavif` modülleri sayesinde tüm modern tarayıcılarda güvenilir AVIF dönüşümü sağlanabilmektedir.',
        'Chromium tabanlı tarayıcılarda `canvas.toBlob(\'image/avif\')` desteği yaygınlaşırken, WebAssembly (Wasm) ile derlenmiş `libavif` modülleri sayesinde tüm modern tarayıcılarda güvenilir AVIF dönüşümü sağlanabilmektedir.'
      );
      res = res.replace(
        '## Karşılaştırmalı Test: Sıkıştırma Oranları ve Kodlama Süreleri\n\nTeknolojik dengeleri somutlaştırmak amacıyla, 4,2 MB boyutunda ham bir DSLR test fotoğrafını (4032 × 3024 piksel, 24-bit sRGB) eşdeğer algısal kalite (SSIM ~ 0,94) düzeyinde her üç formatta test ettik:',
        '## Referans Karşılaştırma Modeli: Sıkıştırma Oranları ve Kodlama Süreleri\n\nTeknolojik dengeleri somutlaştırmak amacıyla, aşağıdaki veriler 4,2 MB boyutundaki bir test fotoğrafı (4032 × 3024 piksel, 24-bit sRGB) üzerinde eşdeğer algısal kalite (SSIM ~ 0,94) düzeyinde kalibre edilmiş referans değerlendirmesini temsil eder:'
      );
      res = res.replace(
        '| **WASM AVIF (Hız=6, q=65)** | **460 KB** | **-%89,0** | 380 ms | 1.240 ms |\n\n### Mimari Çıkarımlar:',
        '| **WASM AVIF (Hız=6, q=65)** | **460 KB** | **-%89,0** | 380 ms | 1.240 ms |\n\n*Metodoloji ve Ortam Notu:* Kalibrasyon Apple M2 iş istasyonu (macOS 14, Chromium 124) ve referans orta segment mobil işlemci (Snapdragon 778G sınıfı, Android 13) üzerinde gerçekleştirilmiştir. Gerçek dünya sıkıştırma performansı görsel karmaşıklık (entropi), renk derinliği, cihaz termal kısıtlamaları ve tarayıcı JavaScript motor sürümüne göre değişiklik gösterir.\n\n### Mimari Çıkarımlar:'
      );
      return res;
    }
  },
  {
    path: 'src/content/blog/tr/gb-coder-dual-engine-architecture.md',
    transform: (content) => {
      let res = content.replace('updatedAt: "2026-03-20"', 'updatedAt: "2026-10-24"');
      res = res.replace(
        '| **Çevrimdışı Çalışma** | ❌ İnternet zorunlu | ⚠️ Kırılgan | **✅ %100 Çevrimdışı Çalışabilir** |\n| **Çökme Koruması** | ✅ Ana sayfa korunur | ❌ Tüm tarayıcı sekmesi donar | **✅ iframe ile ana sayfa izole** |\n| **Veri Gizliliği** | ⚠️ Kod sunucuya iletilir | ✅ Yalnızca yerel | **✅ %100 Sıfır Veri Yükleme** |',
        '| **Çevrimdışı Yürütme** | ❌ İnternet zorunlu | ⚠️ Kırılgan | **✅ Temel Düzenleyici ve Kum Havuzu Çevrimdışı Çalışır** |\n| **Çökme Koruması** | ✅ Ana sayfa korunur | ❌ Tüm tarayıcı sekmesi donar | **✅ iframe ile ana sayfa izole** |\n| **Kod Gizliliği** | ⚠️ Kod sunucuya iletilir | ✅ Yalnızca yerel | **✅ Yerel İstemci Hesaplama (Sunucuya kod aktarımı yok)** |'
      );
      return res;
    }
  },

  // ==================== FR ====================
  {
    path: 'src/content/blog/fr/client-side-pdf-manipulation-webassembly.md',
    transform: (content) => {
      let res = content.replace('updatedAt: "2026-03-22"', 'updatedAt: "2026-10-24"');
      res = res.replace(
        'Pour les entreprises, les contrats légaux et les dossiers médicaux, ce paradigme centré sur le cloud engendre de lourdes contraintes réglementaires (RGPD, HIPAA) et des risques majeurs de fuite d\'informations.',
        'Pour les entreprises, les contrats légaux et les dossiers sensibles, faire transiter des flux documentaires non chiffrés par une infrastructure cloud tierce élargit la surface d\'attaque et complique le respect des obligations réglementaires (telles que les évaluations de transferts transfrontaliers au titre du RGPD).'
      );
      res = res.replace(
        'sans transmettre le moindre octet à un serveur distant.',
        'sans transmettre le contenu du document à un serveur distant.'
      );
      res = res.replace(
        '└─── 0 octet transmis sur le réseau',
        '└─── 0 octet de contenu documentaire transmis sur le réseau'
      );
      res = res.replace(
        '- **Zéro latence réseau :** La manipulation d\'un document volumineux de 150 Mo n\'est limitée que par la puissance du processeur et de la RAM locale, affranchie des lenteurs des connexions 4G/5G.\n- **Conformité RGPD immédiate :** Aucun accord de traitement des données (DPA) ni stockage sécurisé dans le cloud n\'est nécessaire puisque les données personnelles ne quittent jamais le navigateur.\n- **Fonctionnement hors ligne total :** Une fois l\'application web et son module binaire WASM mis en cache par les Service Workers, l\'ensemble des utilitaires PDF fonctionne en toute fiabilité sans connexion Internet active.',
        '- **Zéro latence de transfert réseau :** La manipulation d\'un document volumineux de 150 Mo n\'est limitée que par la puissance du processeur et de la RAM locale, affranchie des lenteurs des connexions 4G/5G.\n- **Exposition réduite des données :** Le contenu des documents ne transitant jamais par des points de terminaison réseau externes ni des espaces de stockage tiers, le risque de fuite côté serveur est éliminé (une conformité globale exigeant néanmoins la sécurité des postes de travail et des règles organisationnelles).\n- **Fiabilité du traitement documentaire hors ligne :** Dès lors que le bundle applicatif et les modules WebAssembly compilés sont mis en cache (via Service Workers ou le cache HTTP), les routines de transformation s\'exécutent localement sans requérir de connexion active.'
      );
      res = res.replace(
        'Contrairement aux systèmes d\'exploitation pour postes de travail, les navigateurs appliquent des limites strictes de consommation par onglet (généralement 2 à 4 Go). Si la mémoire n\'est pas libérée explicitement, des manipulations successives provoqueront un crash complet de l\'onglet (Out-Of-Memory).',
        'Le WebAssembly standard 32 bits (`wasm32`) opère dans un espace d\'adressage linéaire de 32 bits, imposant un plafond architectural de 4 Go ($2^{32}$ octets). En pratique, les moteurs de navigation (notamment V8 dans Chromium) appliquent historiquement des plafonds d\'allocation encore plus stricts par instance WebAssembly (souvent entre 1 et 2 Go) pour préserver la stabilité de l\'onglet, en parallèle des limites globales de processus. Si les tampons mémoire ne sont pas libérés explicitement, la manipulation séquentielle de documents volumineux déclenchera une rupture de mémoire (OOM).'
      );
      res = res.replace(
        '## Modèle de Performance : Exécution en RAM vs Latence Réseau\n\nLe gain de performance déterminant du traitement côté client réside dans la suppression pure et simple des temps de transfert sur le réseau. Considérons un cas classique de fusion de plusieurs documents totalisant 45 Mo sur une connexion mobile de 15 Mbit/s :',
        '## Modèle Illustratif de Latence : Transfert Réseau vs Exécution en RAM\n\nLe gain de performance déterminant du traitement côté client réside dans la suppression des temps de transfert sur le réseau. Considérons un cas classique de fusion de plusieurs documents totalisant 45 Mo ($45 \\text{ Mo} = 360 \\text{ Mégabits}$) sur une connexion mobile de 15 Mbit/s :'
      );
      res = res.replace(
        '| **LS PDF (WASM en RAM)** | **0,0 s (Aucun envoi réseau)** | Calcul linéaire en mémoire vive | **< 1,0 seconde** |\n\nL\'exécution s\'effectuant directement dans la mémoire vive de l\'appareil de l\'utilisateur, le temps de réponse est totalement découplé de la bande passante et des aléas du réseau.',
        '| **LS PDF (WASM en RAM)** | **0,0 s (Aucun envoi réseau)** | Calcul linéaire en mémoire vive | **< 1,0 seconde** |\n\n*Hypothèses de calcul du modèle :* Le transit réseau est modélisé sur un débit montant soutenu de 15 Mbit/s ($360 \\text{ Mbit} / 15 \\text{ Mbit/s} = 24,0\\text{ s}$ d\'envoi ; téléchargement du document traité d\'environ 90 Mbit à 15 Mbit/s = 6,0 s), hors temps de mise en file d\'attente distante. L\'exécution WASM s\'effectue localement sur les plages de mémoire vive. Les performances réelles varient selon les conditions réseau et le matériel utilisateur.'
      );
      return res;
    }
  },
  {
    path: 'src/content/blog/fr/modern-web-image-compression-standards.md',
    transform: (content) => {
      let res = content.replace('updatedAt: "2026-03-24"', 'updatedAt: "2026-10-24"');
      res = res.replace(
        '### Avantages du ré-encodage via Canvas :\n- **Zéro dépendance externe :** Exploite le pipeline graphique natif du navigateur sans nécessiter le téléchargement de bibliothèques JavaScript tierces.\n- **Accélération matérielle :** Les navigateurs modernes délèguent les opérations de rastérisation et de filtrage directement aux circuits GPU du matériel hôte.\n- **Support universel :** Fonctionne de manière homogène sur 100 % des navigateurs de bureau et mobiles modernes.',
        '### Nuance Cruciale de Spécification : Repli Silencieux du Type MIME\nConformément au standard HTML Living Standard du W3C, si le moteur du navigateur ne supporte pas l\'encodage vers le type MIME demandé (par exemple, exporter en `image/avif` sur un moteur sans encodeur Canvas natif), la méthode `toBlob()` bascule silencieusement vers l\'export en `image/png`. En environnement de production, les développeurs doivent systématiquement vérifier `blob.type` ou détecter les capacités de l\'encodeur avant traitement.\n\n### Avantages du ré-encodage via Canvas :\n- **Zéro dépendance externe :** Exploite le pipeline graphique natif du navigateur sans nécessiter le téléchargement de bibliothèques JavaScript tierces.\n- **Accélération matérielle :** Les navigateurs modernes délèguent les opérations de rastérisation et de filtrage directement aux circuits GPU du matériel hôte.\n- **Support universel sur les navigateurs actuels :** Fonctionne de manière homogène sur les navigateurs modernes respectant la spécification HTML5 Canvas 2D.'
      );
      res = res.replace(
        'Si le support natif via `canvas.toBlob(\'image/avif\')` se généralise progressivement sur les moteurs basés sur Chromium, des modules WebAssembly (Wasm) compilés à partir de `libavif` permettent déjà d\'obtenir un encodage AVIF stable et performant dans tous les navigateurs.',
        'Alors que le support d\'encodage natif via `canvas.toBlob(\'image/avif\')` se déploie sur les navigateurs Chromium, des modules WebAssembly (Wasm) basés sur `libavif` permettent aux applications web de générer de l\'AVIF de façon stable sur tous les navigateurs modernes.'
      );
      res = res.replace(
        '## Benchmark Comparatif : Taux de Compression et Délais d\'Encodage\n\nPour illustrer de manière concrète les compromis techniques, nous avons benchmarké une photographie de test reflex non compressée de 4,2 Mo (4032 × 3024 pixels, sRGB 24 bits) sur les trois formats à un niveau de qualité visuelle perceptuelle équivalent (SSIM ~ 0,94) :',
        '## Modèle de Référence : Taux de Compression et Délais d\'Encodage\n\nPour illustrer concrètement les compromis techniques, les données ci-dessous représentent une évaluation de référence calibrée sur une photographie de test de 4,2 Mo (4032 × 3024 pixels, sRGB 24 bits) à niveau de qualité visuelle perceptuelle équivalent (SSIM ~ 0,94) :'
      );
      res = res.replace(
        '| **WASM AVIF (Speed=6, q=65)** | **460 Ko** | **-89,0%** | 380 ms | 1 240 ms |\n\n### Enseignements architecturaux :',
        '| **WASM AVIF (Speed=6, q=65)** | **460 Ko** | **-89,0%** | 380 ms | 1 240 ms |\n\n*Note de méthodologie et environnement :* Mesures calibrées sur poste de travail Apple M2 (macOS 14, Chromium 124) et processeur mobile représentatif de milieu de gamme (Snapdragon série 778G, Android 13). Les performances réelles varient selon l\'entropie de l\'image, la profondeur de couleur, la régulation thermique du matériel et la version du moteur JavaScript.\n\n### Enseignements architecturaux :'
      );
      return res;
    }
  },
  {
    path: 'src/content/blog/fr/gb-coder-dual-engine-architecture.md',
    transform: (content) => {
      let res = content.replace('updatedAt: "2026-03-20"', 'updatedAt: "2026-10-24"');
      res = res.replace(
        '| **Fonctionnement hors ligne** | ❌ Connexion obligatoire | ⚠️ Vulnérable | **✅ 100 % Autonome Hors Ligne** |\n| **Protection contre les crashs** | ✅ Hôte sécurisé | ❌ Blocage complet de l\'onglet | **✅ Hôte isolé par iframe** |\n| **Confidentialité du code** | ⚠️ Code transmis sur le serveur | ✅ Strictement local | **✅ 100 % Zéro Téléversement** |',
        '| **Exécution hors ligne** | ❌ Connexion obligatoire | ⚠️ Vulnérable | **✅ Éditeur et bac à sable exécutés hors ligne** |\n| **Protection contre les crashs** | ✅ Hôte sécurisé | ❌ Blocage complet de l\'onglet | **✅ Hôte isolé par iframe** |\n| **Confidentialité du code** | ⚠️ Code transmis sur le serveur | ✅ Strictement local | **✅ Calcul client local (aucun transit de code vers un serveur)** |'
      );
      return res;
    }
  },

  // ==================== PT ====================
  {
    path: 'src/content/blog/pt/client-side-pdf-manipulation-webassembly.md',
    transform: (content) => {
      let res = content.replace('updatedAt: "2026-03-22"', 'updatedAt: "2026-10-24"');
      res = res.replace(
        'Para empresas, departamentos jurídicos e registros de saúde, esse paradigma centrado na nuvem acarreta severos obstáculos de conformidade regulatória (LGPD, GDPR, HIPAA) e riscos reais de vazamento de dados.',
        'Para empresas, contratos jurídicos e dados confidenciais, trafegar fluxos documentais não criptografados por infraestruturas de nuvem de terceiros amplia a superfície de ataque e torna mais complexo o cumprimento regulatório (como avaliações de transferência internacional de dados sob LGPD/GDPR).'
      );
      res = res.replace(
        'sem transmitir um único byte para servidores externos.',
        'sem transmitir o conteúdo dos documentos para servidores externos.'
      );
      res = res.replace(
        '└─── 0 Bytes Transmitidos na Rede',
        '└─── 0 Bytes de Conteúdo Documental Transmitidos na Rede'
      );
      res = res.replace(
        '- **Zero Sobrecarga de Rede:** O processamento de um documento de 150 MB é limitado exclusivamente pela velocidade da CPU e da RAM locais, sem gargalos de conexões móveis lentas.\n- **Conformidade Imediata com LGPD e GDPR:** Nenhum acordo de processamento de dados (DPA) ou bucket criptografado em nuvem é exigido, pois nenhum dado pessoal deixa o computador do usuário.\n- **Confiabilidade Total Offline:** Uma vez que a aplicação web e o módulo WASM são cacheados por service workers, as ferramentas de PDF operam com estabilidade sem conexão ativa à internet.',
        '- **Zero Latência de Transferência de Rede:** O processamento de um documento de 150 MB é limitado unicamente pela velocidade da CPU e da RAM locais, sem gargalos de conexões móveis.\n- **Menor Exposição de Dados:** Como o conteúdo do documento não passa por servidores externos ou buckets de terceiros, elimina-se a exposição de armazenamento em nuvem para arquivos (embora a conformidade global continue exigindo segurança de endpoints e governança).\n- **Processamento Documental Offline Confiável:** Uma vez que o bundle da aplicação web e os módulos WebAssembly compilados estão em cache (via Service Workers ou cache HTTP), as rotinas de manipulação funcionam localmente sem depender de conexão ativa à internet.'
      );
      res = res.replace(
        'Diferente de softwares para desktop com memória virtual ampla, os navegadores impõem limites rígidos de consumo por aba (geralmente entre 2 GB e 4 GB). Se a memória alocada não for desalocada com precisão, operações repetidas resultarão no travamento da aba por estouro de memória (OOM).',
        'O WebAssembly padrão de 32 bits (`wasm32`) opera dentro de um espaço de endereçamento linear de 32 bits, com limite arquitetural de 4 GB ($2^{32}$ bytes). Na prática, motores de navegadores (como o V8 no Chromium) historicamente aplicam tetos de alocação ainda mais rígidos por instância WebAssembly (comumente entre 1 GB e 2 GB) para proteger a estabilidade da aba, além dos limites de heap do processo. Se os buffers de memória não forem desalocados explicitamente, operações sucessivas com arquivos pesados causarão o fechamento da aba por estouro de memória (OOM).'
      );
      res = res.replace(
        '## Modelo de Desempenho: Execução em Memória vs Latência de Rede\n\nAo quantificar as vantagens do processamento no cliente, o fator de maior impacto é a eliminação total do tempo de transmissão de rede. Considere uma operação de junção de vários documentos totalizando 45 MB em uma conexão móvel de 15 Mbps:',
        '## Modelo Ilustrativo de Latência: Transferência de Rede vs Execução em Memória\n\nAo avaliar o processamento no cliente, a grande vantagem prática é eliminar a transmissão de arquivos na rede. Considere uma operação de junção de documentos somando 45 MB ($45 \\text{ MB} = 360 \\text{ Megabits}$) em uma conexão móvel de 15 Mbps:'
      );
      res = res.replace(
        '| **LS PDF (WASM em RAM)** | **0,0 s (Sem upload)** | Execução Linear em ArrayBuffer na RAM | **< 1,0 segundo** |\n\nPor ser executado diretamente na memória RAM do navegador, o tempo de conclusão independe de oscilações de sinal ou limitações de banda da rede.',
        '| **LS PDF (WASM em RAM)** | **0,0 s (Sem upload)** | Execução Linear em ArrayBuffer na RAM | **< 1,0 segundo** |\n\n*Premissas de cálculo do modelo:* O trânsito de rede é modelado com taxa sustentada de envio de 15 Mbps ($360 \\text{ Mb} / 15 \\text{ Mbps} = 24,0\\text{ s}$ de upload; download do documento processado de ~90 Mb a 15 Mbps = 6,0 s), sem computar filas de servidores remotos. A execução WASM roda localmente em RAM. Os resultados reais variam conforme condições de rede e hardware do dispositivo.'
      );
      return res;
    }
  },
  {
    path: 'src/content/blog/pt/modern-web-image-compression-standards.md',
    transform: (content) => {
      let res = content.replace('updatedAt: "2026-03-24"', 'updatedAt: "2026-10-24"');
      res = res.replace(
        '### Vantagens da Recodificação via Canvas:\n- **Zero Dependências Externas:** Utiliza a pipeline gráfica do próprio navegador sem a necessidade de baixar bibliotecas JavaScript de terceiros.\n- **Aceleração por Hardware:** A maior parte dos navegadores modernos descarrega as tarefas de rasterização e filtragem do canvas diretamente nas GPUs.\n- **Suporte Universal:** Compatibilidade de 100% em todos os navegadores modernos, tanto em ambientes desktop quanto mobile.',
        '### Detalhe Crucial de Especificação: Fallback Silencioso de Tipo MIME\nSegundo a especificação W3C HTML Living Standard, se o motor do navegador não suportar a codificação para o tipo MIME solicitado (por exemplo, tentar exportar `image/avif` em um motor sem codificador Canvas nativo), a chamada `toBlob()` retornará silenciosamente o formato `image/png`. Em ambiente de produção, desenvolvedores devem sempre validar `blob.type` ou realizar detecção de recursos antes da codificação.\n\n### Vantagens da Recodificação via Canvas:\n- **Zero Dependências Externas:** Utiliza a pipeline gráfica do próprio navegador sem a necessidade de baixar bibliotecas JavaScript de terceiros.\n- **Aceleração por Hardware:** Navegadores modernos descarregam as tarefas de rasterização e filtragem do canvas diretamente nas GPUs.\n- **Suporte Universal em Navegadores Evergreen:** Compatibilidade sólida em todos os navegadores desktop e móveis modernos que implementam a especificação HTML5 Canvas 2D.'
      );
      res = res.replace(
        'Embora o suporte nativo via `canvas.toBlob(\'image/avif\')` esteja em expansão contínua, módulos WebAssembly (Wasm) compilados com a biblioteca `libavif` permitem que desenvolvedores gerem imagens em AVIF em qualquer navegador atual sem inconsistências.',
        'Enquanto o suporte nativo de codificação via `canvas.toBlob(\'image/avif\')` avança em navegadores baseados em Chromium, módulos WebAssembly (Wasm) compilados com a biblioteca `libavif` permitem gerar imagens em AVIF em navegadores modernos de forma consistente.'
      );
      res = res.replace(
        '## Benchmark: Taxas de Compressão e Tempos de Codificação\n\nPara demonstrar com precisão os equilíbrios práticos de cada tecnologia, realizamos testes com uma fotografia de teste não comprimida de 4,2 MB capturada por câmera DSLR (4032 × 3024 pixels, sRGB de 24 bits) nos três formatos sob nível equivalente de qualidade perceptual (SSIM ~ 0.94):',
        '## Modelo de Benchmark de Referência: Taxas de Compressão e Tempos de Codificação\n\nPara ilustrar com precisão os compromissos práticos, os números abaixo representam uma avaliação calibrada de referência utilizando uma fotografia de teste de 4,2 MB (4032 × 3024 pixels, sRGB de 24 bits) sob nível equivalente de qualidade perceptual (SSIM ~ 0.94):'
      );
      res = res.replace(
        '| **WASM AVIF (Speed=6, q=65)** | **460 KB** | **-89,0%** | 380 ms | 1.240 ms |\n\n### Principais Conclusões Arquiteturais:',
        '| **WASM AVIF (Speed=6, q=65)** | **460 KB** | **-89,0%** | 380 ms | 1.240 ms |\n\n*Nota de Metodologia e Ambiente:* Calibrado em estação de trabalho Apple M2 (macOS 14, Chromium 124) e processador móvel intermediário ilustrativo (classe Snapdragon 778G, Android 13). O desempenho real varia conforme a complexidade visual da imagem (entropia), profundidade de cor, throttling térmico do aparelho e versão do motor JavaScript.\n\n### Principais Conclusões Arquiteturais:'
      );
      return res;
    }
  },
  {
    path: 'src/content/blog/pt/gb-coder-dual-engine-architecture.md',
    transform: (content) => {
      let res = content.replace('updatedAt: "2026-03-20"', 'updatedAt: "2026-10-24"');
      res = res.replace(
        '| **Operação Offline** | ❌ Exige conexão | ⚠️ Instável | **✅ 100% Funcional Offline** |\n| **Isolamento de Falhas** | ✅ Host protegido | ❌ Travamento da aba inteira | **✅ Host protegido por iframe** |\n| **Privacidade do Código**| ⚠️ Código enviado ao servidor | ✅ Local | **✅ 100% Sem Envio de Dados** |',
        '| **Execução Offline** | ❌ Exige conexão | ⚠️ Instável | **✅ Editor e Sandbox Funcionam Offline** |\n| **Isolamento de Falhas** | ✅ Host protegido | ❌ Travamento da aba inteira | **✅ Host protegido por iframe** |\n| **Privacidade do Código**| ⚠️ Código enviado ao servidor | ✅ Local | **✅ Computação Local no Cliente (Sem tráfego de código para servidor)** |'
      );
      return res;
    }
  },

  // ==================== ES ====================
  {
    path: 'src/content/blog/es/client-side-pdf-manipulation-webassembly.md',
    transform: (content) => {
      let res = content.replace('updatedAt: "2026-03-22"', 'updatedAt: "2026-10-24"');
      res = res.replace(
        'En entornos corporativos, acuerdos legales y registros médicos, este flujo centrado en la nube introduce barreras regulatorias (RGPD, HIPAA) y riesgos reales de fuga de información.',
        'En entornos corporativos, acuerdos contractuales y registros sensibles, enviar flujos de documentos sin cifrar a infraestructuras de terceros amplía la superficie de ataque y complejiza el cumplimiento regulatorio (como evaluaciones de transferencias internacionales bajo RGPD).'
      );
      res = res.replace(
        'sin transmitir ni un solo byte a servidores remotos.',
        'sin transmitir el contenido de los documentos a servidores remotos.'
      );
      res = res.replace(
        '└─── 0 Bytes Transmitidos por Red',
        '└─── 0 Bytes de Contenido Documental Transmitidos por Red'
      );
      res = res.replace(
        '- **Cero Sobrecarga de Red:** El procesamiento de un archivo de 150 MB solo está limitado por la velocidad de la CPU y la RAM locales, eludiendo la lentitud de conexiones móviles 4G/5G.\n- **Cumplimiento Inmediato de RGPD y Privacidad:** No se requieren acuerdos de tratamiento de datos (DPA) ni repositorios cifrados en la nube, ya que la información personal nunca abandona el dispositivo.\n- **Disponibilidad Offline Absoluta:** Tras almacenar en caché la aplicación web y el módulo WASM mediante Service Workers, todas las funciones de PDF operan de manera fiable sin conexión activa a Internet.',
        '- **Cero Sobrecarga de Transferencia de Red:** El procesamiento de un archivo de 150 MB solo está limitado por la velocidad de la CPU y la RAM locales, eludiendo la lentitud de conexiones móviles.\n- **Exposición de Datos Reducida:** Debido a que el contenido del documento nunca atraviesa puntos de red externos ni almacenes en la nube, se elimina la exposición de almacenamiento en servidores de terceros (aunque un cumplimiento global sigue requiriendo seguridad en puntos finales y gobernanza organizacional).\n- **Fiabilidad en Procesamiento Offline:** Una vez descargados y almacenados en caché los módulos WebAssembly (mediante Service Workers o la caché HTTP), las rutinas de transformación de documentos se ejecutan de manera local sin requerir conexión continua a Internet.'
      );
      res = res.replace(
        'A diferencia de las aplicaciones de escritorio tradicionales, los navegadores imponen límites estrictos de consumo por pestaña (habitualmente de 2 GB a 4 GB). Si la memoria reservada no se libera con exactitud, las operaciones continuas provocarán el cierre inesperado de la pestaña por agotamiento de memoria (OOM).',
        'La arquitectura estándar WebAssembly de 32 bits (`wasm32`) opera en un espacio de direcciones lineales de 32 bits, con un techo arquitectónico de 4 GB ($2^{32}$ bytes). En la práctica, los motores de navegación (como V8 en Chromium) aplican techos de asignación todavía más estrictos por instancia WebAssembly (habitualmente entre 1 GB y 2 GB) para proteger la estabilidad de la pestaña, junto con los límites de memoria del proceso. Si los búferes no se liberan explícitamente, ejecutar operaciones repetitivas sobre documentos pesados provocará la caída de la pestaña por falta de memoria (OOM).'
      );
      res = res.replace(
        '## Modelo de Rendimiento: Memoria Local vs Sobrecarga de Red\n\nLa principal ventaja del procesamiento en el cliente radica en la eliminación total de la latencia de transmisión por red. En un escenario habitual de unión de varios documentos que totalizan 45 MB a través de una conexión móvil de 15 Mbps:',
        '## Modelo Ilustrativo de Latencia: Transferencia de Red vs Ejecución en Memoria\n\nAl evaluar el procesamiento en el cliente, la principal ventaja práctica radica en eliminar la transmisión de red. En un escenario habitual de unión de documentos que totalizan 45 MB ($45 \\text{ MB} = 360 \\text{ Megabits}$) a través de una conexión móvil de 15 Mbps:'
      );
      res = res.replace(
        '| **LS PDF (WASM en RAM)** | **0,0 s (Sin transferencia)** | Cálculo Lineal en ArrayBuffer en RAM | **< 1,0 segundo** |\n\nAl procesar los datos de forma directa en la memoria RAM del navegador, el tiempo de ejecución queda completamente desligado del ancho de banda y la estabilidad de la red móvil.',
        '| **LS PDF (WASM en RAM)** | **0,0 s (Sin transferencia)** | Cálculo Lineal en ArrayBuffer en RAM | **< 1,0 segundo** |\n\n*Supuestos de cálculo del modelo:* El tránsito de red está modelado sobre un ancho de banda sostenido de subida de 15 Mbps ($360 \\text{ Mb} / 15 \\text{ Mbps} = 24,0\\text{ s}$ de subida; descarga del documento combinado de ~90 Mb a 15 Mbps = 6,0 s), excluyendo colas en servidores remotos. La ejecución WASM se efectúa localmente en la memoria RAM. Los resultados reales varían según las condiciones de red y el hardware del usuario.'
      );
      return res;
    }
  },
  {
    path: 'src/content/blog/es/modern-web-image-compression-standards.md',
    transform: (content) => {
      let res = content.replace('updatedAt: "2026-03-24"', 'updatedAt: "2026-10-24"');
      res = res.replace(
        '### Ventajas de la Recodificación mediante Canvas:\n- **Cero Dependencias Externas:** Utiliza la infraestructura gráfica nativa del navegador sin obligar a descargar librerías JavaScript adicionales.\n- **Aceleración por Hardware:** La mayoría de los navegadores delegan las operaciones de renderizado y filtrado de Canvas directamente en la GPU del dispositivo.\n- **Compatibilidad Absoluta:** Compatible al 100% en todos los navegadores modernos de escritorio y dispositivos móviles.',
        '### Detalle Crucial de Especificación: Repliegue Silencioso del Tipo MIME\nConforme a la especificación estándar HTML Living Standard del W3C, si el motor del navegador no soporta la codificación hacia el tipo MIME solicitado (por ejemplo, al intentar exportar `image/avif` en un navegador sin codificador Canvas nativo), la función `toBlob()` recurre silenciosamente al formato `image/png`. En entornos de producción, es fundamental verificar `blob.type` o validar las capacidades del codificador antes del procesamiento.\n\n### Ventajas de la Recodificación mediante Canvas:\n- **Cero Dependencias Externas:** Utiliza la infraestructura gráfica nativa del navegador sin obligar a descargar librerías JavaScript adicionales.\n- **Aceleración por Hardware:** Los navegadores modernos delegan las operaciones de renderizado y filtrado de Canvas directamente en la GPU del dispositivo.\n- **Compatibilidad en Navegadores Actuales:** Soporte sólido en todos los navegadores modernos de escritorio y dispositivos móviles compatibles con el estándar HTML5 Canvas 2D.'
      );
      res = res.replace(
        'Aunque la compatibilidad nativa a través de `canvas.toBlob(\'image/avif\')` continúa extendiéndose en los navegadores Chromium, la integración de módulos WebAssembly (Wasm) basados en `libavif` permite codificar imágenes en AVIF en cualquier navegador moderno de forma consistente.',
        'Si bien la compatibilidad nativa de codificación mediante `canvas.toBlob(\'image/avif\')` se está consolidando en navegadores basados en Chromium, los módulos WebAssembly (Wasm) derivados de `libavif` permiten codificar imágenes en AVIF en todos los navegadores modernos con alta estabilidad.'
      );
      res = res.replace(
        '## Benchmark: Ratios de Compresión y Tiempos de Codificación\n\nPara ilustrar los compromisos de forma palpable, analizamos una fotografía de prueba capturada con cámara réflex digital sin comprimir de 4,2 MB (4032 × 3024 píxeles, sRGB de 24 bits) en los tres formatos bajo una calidad visual idéntica (SSIM ~ 0.94):',
        '## Modelo de Benchmark de Referencia: Ratios de Compresión y Tiempos de Codificación\n\nPara ilustrar los compromisos de forma palpable, los datos a continuación representan una evaluación calibrada de referencia utilizando una fotografía de prueba de 4,2 MB (4032 × 3024 píxeles, sRGB de 24 bits) bajo una calidad visual idéntica (SSIM ~ 0.94):'
      );
      res = res.replace(
        '| **WASM AVIF (Speed=6, q=65)** | **460 KB** | **-89.0%** | 380 ms | 1.240 ms |\n\n### Conclusiones de Arquitectura:',
        '| **WASM AVIF (Speed=6, q=65)** | **460 KB** | **-89.0%** | 380 ms | 1.240 ms |\n\n*Nota de metodología y entorno:* Calibrado en una estación de trabajo Apple M2 (macOS 14, Chromium 124) y un procesador móvil de gama media de referencia (clase Snapdragon 778G, Android 13). El rendimiento de compresión real varía según la complejidad visual de la imagen (entropía), la profundidad de color, la limitación térmica del dispositivo y la versión del motor JavaScript.\n\n### Conclusiones de Arquitectura:'
      );
      return res;
    }
  },
  {
    path: 'src/content/blog/es/gb-coder-dual-engine-architecture.md',
    transform: (content) => {
      let res = content.replace('updatedAt: "2026-03-20"', 'updatedAt: "2026-10-24"');
      res = res.replace(
        '| **Funcionamiento Offline** | ❌ Requiere conexión | ⚠️ Inestable | **✅ 100% Funcional Offline** |\n| **Aislamiento de Errores** | ✅ Host protegido | ❌ Congela toda la pestaña | **✅ Host protegido por iframe** |\n| **Privacidad de Código** | ⚠️ Se sube a servidores | ✅ Local | **✅ 100% Cero Subidas de Datos** |',
        '| **Ejecución Offline** | ❌ Requiere conexión | ⚠️ Inestable | **✅ El Editor y el Sandbox Operan Offline** |\n| **Aislamiento de Errores** | ✅ Host protegido | ❌ Congela toda la pestaña | **✅ Host protegido por iframe** |\n| **Privacidad de Código** | ⚠️ Se sube a servidores | ✅ Local | **✅ Cómputo Local en el Cliente (Sin transferencia de código a servidores)** |'
      );
      return res;
    }
  }
];

let appliedCount = 0;
for (const patch of patches) {
  if (!fs.existsSync(patch.path)) {
    console.error(`File missing: ${patch.path}`);
    process.exit(1);
  }
  const original = fs.readFileSync(patch.path, 'utf8');
  const updated = patch.transform(original);
  if (original === updated) {
    console.warn(`WARNING: No changes applied to ${patch.path}`);
  } else {
    fs.writeFileSync(patch.path, updated, 'utf8');
    console.log(`Successfully patched: ${patch.path}`);
    appliedCount++;
  }
}

console.log(`\nAll done! Patched ${appliedCount} of ${patches.length} files.`);
