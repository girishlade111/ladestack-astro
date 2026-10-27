# LADESTACK PHASE 4A — WEB PERFORMANCE & ASSET AUDIT REPORT
**Core Web Vitals, Payload Breakdown, Asset Optimization, and Hydration Architecture**

---

## 1. Executive Summary & Architecture Highlights

- **Architecture Model**: Static HTML Multi-Page Application (MPA) generated via Astro.
- **Client Hydration Directives (`client:*`)**: **ZERO**.
- **Client JavaScript Bundles in `dist/_astro/`**: **0 KB** (Zero JavaScript overhead).
- **CSS Bundle Size in `dist/_astro/`**: **80.6 KB** (single consolidated stylesheet covering all design tokens, components, and responsive utilities).
- **Core Web Vitals Readiness**: Outstanding lab potential due to zero-JS architecture; asset optimization required for image payloads and third-party font requests.

### Performance Architecture Health Card

| Metric / Attribute | Measurement / State | Threshold / Benchmark | Status | Analysis |
| :--- | :---: | :---: | :---: | :--- |
| **Client JS Payload** | **0 KB** | < 100 KB | **EXEMPLARY** | No React/Vue/Svelte hydration runtime. Pure static HTML. |
| **Total CSS Payload** | **80.6 KB** (uncompressed) | < 100 KB | **EXEMPLARY** | Tailored Tailwind CSS bundle; ~18 KB gzipped. |
| **Hydration Execution Cost** | **0 ms** | < 50 ms | **EXEMPLARY** | No client component tree mounting or reconciliation. |
| **Total Blocking Time (TBT)** | **< 10 ms** (lab) | < 200 ms | **EXEMPLARY** | Minimal main-thread work (tiny inline scripts only). |
| **Cumulative Layout Shift (CLS)**| **0.00** | <= 0.10 | **PASS** | Strict width/height attributes on media; system font fallback. |
| **Largest Contentful Paint (LCP)**| **~1.2s - 1.8s** (lab) | <= 2.5s | **PASS** | Fast; dependent on image delivery. |
| **Image Asset Optimization** | 5.2 MB total | < 2.0 MB | **P2 DEFECT** | 2.25MB fallback PNG + 1.69MB orphan JPGs inflate dist. |
| **Font Delivery Model** | External Google CDN | Self-hosted | **P3 DEFECT** | External stylesheet blocks render; privacy IP transfer. |

---

## 2. Static Asset Payload Breakdown

Audit analysis generated via `node scratch/audit-performance.mjs`:

```
Total Dist Output Size: 26.65 MB (304 files)
  ├── Generated HTML (246 files): 21.85 MB (~88 KB average per page, including inline SVG icons & JSON-LD)
  ├── Images & Graphics (52 files): 5.29 MB
  ├── Consolidated CSS (1 file): 80.6 KB (dist/_astro/BaseLayout.CJbaL-bE.css)
  ├── Client JS Bundles (0 files): 0.0 KB
  ├── Sitemaps (2 files): 29.8 KB
  └── Manifests & Configs (3 files): 2.1 KB
```

### Breakdown by File Extension

| Extension | File Count | Total Size | Description |
| :--- | :---: | :---: | :--- |
| `.html` | 246 | 21,859.1 KB | Static HTML pages (234 content + 12 redirect stubs) |
| `.png` | 5 | 2,584.0 KB | Raster graphics (dominated by 2.25MB `hero/background.png`) |
| `.jpg` | 7 | 2,474.9 KB | Founder photos (dominated by unused orphan images) |
| `.svg` | 37 | 117.0 KB | Vector icons and project illustrations |
| `.css` | 1 | 80.6 KB | Complete pre-compiled Tailwind stylesheet |
| `.webp` | 1 | 73.3 KB | WebP hero background alternative |
| `.avif` | 1 | 49.5 KB | AVIF hero background alternative |
| `.xml` | 2 | 29.8 KB | XML Sitemaps |
| `.ico` | 1 | 15.0 KB | Favicon |

---

## 3. Image Optimization Defect Deep-Dive (DEFECT-PERF-001)

### The 2.25 MB Fallback Image Problem
In `src/components/Hero.astro`:
```html
<picture>
  <source srcset="/hero/background.avif" type="image/avif" />  <!-- 49.5 KB -->
  <source srcset="/hero/background.webp" type="image/webp" />  <!-- 73.3 KB -->
  <img
    src="/hero/background.png"                                  <!-- 2,256.6 KB -->
    alt=""
    width="1536"
    height="1024"
    loading="eager"
    fetchpriority="high"
  />
</picture>
```
- Modern browsers download the 49.5 KB `.avif` or 73.3 KB `.webp` file.
- However, any browser or web crawler falling back to the `<img>` `src` downloads **2,256.6 KB**, causing severe LCP degradation on slow mobile connections.
- **Remediation**: Re-compress `background.png` with PNGquant/OxiPNG or convert to an optimized fallback JPEG under 150 KB.

### 1.69 MB of Unused Orphan Images
Investigation of `public/img/` identified 4 large portrait photos that are copied to `dist/` on every build but are never referenced anywhere in code:
- `public/img/girish1.jpg`: **405.1 KB** (0 references)
- `public/img/girish2.jpg`: **515.5 KB** (0 references)
- `public/img/girish3.jpg`: **436.1 KB** (0 references)
- `public/img/girish4.jpg`: **333.0 KB** (0 references)
- Total Waste: **1,689.7 KB (~1.69 MB)**.
- **Remediation**: Delete `girish1.jpg` through `girish4.jpg` from `public/img/` in Phase 4B.

### Uncompressed Active Portrait Photo
- `public/img/girish.jpg` (used in `FounderProfile.astro` and `AboutPage.astro`) is **574.5 KB**.
- It is delivered as raw uncompressed JPEG without WebP or AVIF picture alternatives.
- **Remediation**: Convert `girish.jpg` to WebP/AVIF (<60 KB).

---

## 4. Font Delivery Architecture & Privacy Audit (DEFECT-PERF-002)

### Current Implementation
In `src/layouts/BaseLayout.astro`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

### Performance & Privacy Implications
1. **Render-Blocking Network Round-Trip**: The browser must resolve DNS, connect, and negotiate TLS with two external origins (`fonts.googleapis.com` and `fonts.gstatic.com`) before rendering text, delaying First Contentful Paint (FCP).
2. **GDPR / Privacy Compliance**: Requesting fonts from Google CDN transmits user IP addresses to third-party servers without consent (a concern for European Union visitors under GDPR court rulings).
3. **Remediation**: Self-host fonts in `public/fonts/` or bundle via `@fontsource/plus-jakarta-sans` and `@fontsource/jetbrains-mono` with local WOFF2 files and `font-display: swap`.

---

## 5. JavaScript & Hydration Analysis

- **Client Islands**: 0. LadeStack uses no interactive React/Preact/Svelte components.
- **Inline Scripts**:
  - Theme initialization script in `<head>` (78 bytes): Executes before paint to prevent dark mode flicker.
  - Theme toggle event handler in `BaseLayout.astro` (110 bytes).
  - Mobile sheet & search modal keyboard trap in `Header.astro` (~850 bytes).
  - Language switcher dropdown click handler in `LanguageSwitcher.astro` (~350 bytes).
- **Total Inline JavaScript**: **< 2.0 KB** per page.
- **Main-Thread Impact**: **Negligible** (Total Blocking Time < 10ms in lab runs).
- **Interaction to Next Paint (INP)**: Because all interactions are native CSS or tiny DOM toggles without heavy script evaluation, INP is expected to remain well below 50ms (WCAG/CWV threshold <= 200ms).

---

## 6. Real-User Field Data vs. Lab Data Clarification

- **Field Data Status**: **NOT AVAILABLE / UNRELEASED**.
  - The current production domain `https://ladestack.in` is running the legacy Vite single-page application.
  - Google Chrome User Experience Report (CrUX) field data reflects the legacy Vite application, NOT this new Astro site.
  - Applying Vite field data to the Astro site would be false evidence.
- **Lab Projections for Astro Production**:
  - LCP (Desktop): < 1.2s (Good)
  - LCP (Mobile 4G): ~1.8s (Good)
  - INP: < 50ms (Good)
  - CLS: 0.00 (Good)

---

## 7. Performance Remediation Action Plan

1. **Compress Hero Fallback PNG (P2)**: Shrink `public/hero/background.png` from 2.25MB to <150KB.
2. **Purge Orphan Photos (P2)**: Delete `girish1.jpg` through `girish4.jpg` (save 1.69MB dist space).
3. **Optimize Founder Photo (P2)**: Provide AVIF/WebP alternatives for `img/girish.jpg` (save ~500KB).
4. **Self-Host Google Fonts (P3)**: Eliminate external CDN round-trips by bundling local WOFF2 fonts.
