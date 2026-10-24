---
title: "GB Coder'ın Derinlikleri: Tarayıcı Tabanlı Geliştirme İçin Çift Motorlu Mimari"
description: "Monaco Editor'ün zengin sözdizimi zekası ile sıfır gecikmeli izole korumalı alan çalıştırmasını birleştiren GB Coder mimari analizi."
locale: "tr"
slug: "gb-coder-dual-engine-architecture"
translationKey: "gb-coder-dual-engine-architecture"
author: "Girish Lade"
publishedAt: "2026-03-15"
updatedAt: "2026-10-24"
category: "Architecture"
tags: ["GB Coder", "Mimari", "JavaScript", "Monaco Editor", "WebAssembly", "Web IDE"]
coverImage: "/blog-covers/gb-coder-architecture.svg"
coverAlt: "GB Coder Çift Motorlu Mimari Şeması"
draft: false
featured: true
relatedProduct: "GB Coder"
contentType: "architecture"
---

Modern tarayıcı tabanlı kod düzenleyicileri temel bir teknik ikilemle karşı karşıyadır: Geliştiriciler Visual Studio Code kalitesinde zengin dil zekası, otomatik tamamlama ve anında hata denetimi beklerken, aynı zamanda ana kullanıcı arayüzü iş parçacığını (UI thread) kilitlemeyen sıfır gecikmeli canlı önizleme çalıştırması isterler.

LadeStack'in amiral gemisi web IDE'si olan **GB Coder**'ı inşa ederken, yüksek maliyetli ve yavaş bulut konteyner modelleri yerine istemci odaklı bir **Çift Motorlu Mimari (Dual-Engine Architecture)** geliştirdik. Bu makalede GB Coder'ın Monaco Editor, yalıtılmış iframe korumalı alanları (sandbox) ve yapılandırılmış RPC mesaj kanallarını koordine ederek doğrudan istemci tarayıcısında milisaniyenin altında yürütme döngülerini nasıl başardığını inceliyoruz.

---

## Tarayıcı İçi IDE'lerin Mimari Zorlukları

Geleneksel web kodlama araçları genellikle iki uç noktadan birine dayanır:

1. **Uzak Bulut Sanal Makineleri:** Her dosya değişikliği WebSockets üzerinden uzak bir sunucu konteynerine (Docker veya Firecracker microVM) iletilir. Tam POSIX uyumluluğu sağlansa da bu durum ağ gecikmesine, yüksek sunucu maliyetlerine ve çevrimdışı çalışamama sorununa yol açar.
2. **Ana İş Parçacığında Doğrudan Çalıştırma:** Basit araçlar kullanıcı kodunu doğrudan `eval()` veya kısıtlamasız DOM enjeksiyonu ile üst pencerede çalıştırır. Tek bir `while(true)` sonsuz döngüsü tüm tarayıcı sekmesini dondurur, kaydedilmemiş verileri yok eder ve ciddi XSS açıkları oluşturur.

GB Coder, **Dil Zekası (Statik Motor)** ile **Çalışma Zamanı Yürütmesini (Dinamik Sandbox)** birbirinden ayırarak bu kısıtlamaları aşar.

```
┌────────────────────────────────────────────────────────┐
│                   ANA TARAYICI BAĞLAMI                 │
│                                                        │
│  ┌─────────────────────────┐  postMessage (RPC)        │
│  │   Monaco Editor Core    │ ──────────────────────┐   │
│  │ (AST / Sözdizimi / Lint)│                       │   │
│  └─────────────────────────┘                       │   │
└────────────────────────────────────────────────────┼───┘
                                                     │
                                                     ▼
┌────────────────────────────────────────────────────────┐
│               YALITILMIŞ IFRAME BAĞLAMI                │
│               sandbox="allow-scripts"                  │
│                                                        │
│  ┌─────────────────────────┐  Blob Object URL          │
│  │  Sanal DOM & Konsol Çık.│ ◄──────────────────────   │
│  │ (Temiz Bağımsız Pencere)│                           │
│  └─────────────────────────┘                           │
└────────────────────────────────────────────────────────┘
```

---

## Motor 1: Monaco Editor Entegrasyonu ve Arka Plan İş Parçacıkları

Düzenleyici yüzeyi Microsoft'un Monaco Editor çekirdeği üzerine inşa edilmiştir ve bağımsız Web Workers üzerinde çalışır. Bu sayede ağır AST ayrıştırma, parantez eşleme ve TypeScript tür denetimleri ana arayüz iş parçacığıyla asla rekabet etmez.

```typescript
// Monaco dil iş parçacığı havuzu başlatma
import * as monaco from 'monaco-editor';

self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: string, label: string): string {
    if (label === 'typescript' || label === 'javascript') {
      return '/workers/ts.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars') {
      return '/workers/html.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return '/workers/css.worker.bundle.js';
    }
    return '/workers/editor.worker.bundle.js';
  }
};
```

Dil derleme işlemlerini arka plana devrederek GB Coder, binlerce satırlık dosyalarda dahi akıcı bir 60 FPS yazma performansı sağlar.

---

## Motor 2: Yalıtılmış Korumalı Alan (Sandbox)

Ana uygulamanın güvenliğini ve kararlılığını tehlikeye atmadan canlı yürütme çıktısını işlemek için GB Coder, `<iframe>` konteyneri içinde dinamik olarak yalıtılmış bir HTML belgesi oluşturur.

```html
<iframe
  id="gb-preview-frame"
  sandbox="allow-scripts allow-modals"
  csp="default-src 'self' 'unsafe-inline' blob: data:; img-src * data: blob:;"
  src="about:blank"
  title="GB Coder Live Execution Preview"
  aria-label="Live Execution Sandbox"
></iframe>
```

Buradaki en kritik tasarım kararı **`allow-same-origin` özelliğinin kasıtlı olarak hariç tutulmasıdır**. Bu özellik olmadan iframe kaynağı benzersiz ve opak (`null`) kabul edilir. Kötü amaçlı bir kod çalıştırılsa bile şunlara erişemez:
- `ladestack.in` LocalStorage anahtarları ve belirteçleri
- Çerezler veya oturum verileri
- IDE kabuğuna ve navigasyonuna ait ana DOM ağacı

---

## İki Yönlü RPC İletişimi: Konsol Dinleme

GB Coder içindeki terminal paneline yürütme günlüklerini aktarmak için korumalı alan yerel `console` yöntemlerini dinler ve pencereler arasında güvenle serileştirir:

```javascript
// Korumalı alana enjekte edilen önyükleme betiği
(function installConsoleProxy() {
  const originalLog = console.log;
  const originalError = console.error;

  function serialize(data) {
    try {
      return JSON.parse(JSON.stringify(data));
    } catch (e) {
      return String(data);
    }
  }

  console.log = function (...args) {
    window.parent.postMessage({
      type: 'GB_CODER_CONSOLE_EVENT',
      level: 'log',
      payload: args.map(serialize),
      timestamp: Date.now()
    }, '*');
    originalLog.apply(console, args);
  };

  console.error = function (...args) {
    window.parent.postMessage({
      type: 'GB_CODER_CONSOLE_EVENT',
      level: 'error',
      payload: args.map(serialize),
      timestamp: Date.now()
    }, '*');
    originalError.apply(console, args);
  };
})();
```

Ana uygulama gelen iletinin önizleme iframe öğesinden geldiğini doğruladıktan sonra konsol terminaline yansıtır:

```typescript
window.addEventListener('message', (event: MessageEvent) => {
  const previewFrame = document.getElementById('gb-preview-frame') as HTMLIFrameElement;
  if (!previewFrame || event.source !== previewFrame.contentWindow) {
    return;
  }

  const { type, level, payload } = event.data ?? {};
  if (type === 'GB_CODER_CONSOLE_EVENT') {
    appendTerminalMessage(level, payload);
  }
});
```

---

## Mimari Karşılaştırma Tablosu

| Mimari Nitelik | Geleneksel Bulut IDE (Docker) | Ana İş Parçacığında Eval | GB Coder Çift Motor |
|:---|:---:|:---:|:---:|
| **Yürütme Gecikmesi** | 300ms – 1200ms (ağ) | < 1ms (tehlikeli) | **< 2ms (yerel bellek)** |
| **Çevrimdışı Çalışma**| ❌ İnternet zorunlu | ⚠️ Kararsız | **✅ %100 Çevrimdışı Hazır** |
| **Kilitlenme Koruması**| ✅ Ana sistem korunur | ❌ Tüm sekme donar | **✅ iframe ile tam koruma** |
| **Veri Gizliliği** | ⚠️ Kod buluta yüklenir | ✅ Yerel | **✅ %100 Sıfır Yükleme** |
| **Kullanıcı Başı Sunucu Maliyeti** | Aylık $5 – $25 | $0 | **$0 (İstemci Donanımı)** |

---

## IndexedDB ile Güvenli Durum Kalıcılığı

Beklenmedik sekme kapanmalarına karşı verileri korumak amacıyla GB Coder, projeyi 300ms gecikmeli dengeleme (debounce) ile yerel IndexedDB veritabanında saklar.

```typescript
import { openDB } from 'idb';

const DB_NAME = 'gb_coder_workspace';
const STORE_NAME = 'project_files';

export async function persistActiveBuffer(filename: string, content: string): Promise<void> {
  const db = await openDB(DB_NAME, 1, {
    upgrade(database) {
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'filename' });
      }
    }
  });

  await db.put(STORE_NAME, {
    filename,
    content,
    updatedAt: Date.now()
  });
}
```

---

## Sonuç

Çift Motorlu Mimari, profesyonel web geliştirici araçları sunmak için devasa sunucu çiftliklerine ihtiyaç olmadığını kanıtlamaktadır. Monaco Web Workers ile yalıtılmış iframe korumalı alanını bir araya getiren GB Coder, eşsiz hız, tam gizlilik ve sıfır altyapı maliyeti sunar.

GB Coder'ı doğrudan test etmek için [LadeStack GB Coder tanıtımını](/tr/gb-coder) ziyaret edebilir veya [code.ladestack.in](https://code.ladestack.in/) üzerinden web IDE'yi başlatabilirsiniz. Daha fazla teknik detay için [geliştirici belgelerimizi](/tr/docs) inceleyebilirsiniz.
