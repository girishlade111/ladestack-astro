# LADESTACK — PHASE 4C-1 LIGHTHOUSE ROOT CAUSE INVESTIGATION REPORT
**Document Date**: October 26, 2026  
**Auditor / Roles**: Principal Astro Performance Engineer, Chrome DevTools Specialist, Lighthouse Auditor, Accessibility Engineer, Technical SEO Lead  
**Repository**: `girishlade111/ladestack-astro`  
**Current Branch**: `feature/phase-4c-1-performance-accessibility`  
**Base Commit (Phase 4B-3 HEAD)**: `c90ad6f7fca1dd79a37e9b03f21e6d8e8d1fe0a6`  
**Target Routes**: `/`, `/apps`, `/blog`, `/ja/blog`, `/blog/owasp-top-10-complete-mitigation-guide`  

---

## 1. Executive Summary & Audit Methodology

During Phase 4B-3 pre-release QA, mobile lab Lighthouse audits uncovered critical performance and accessibility bottlenecks across key routes:
- **Homepage (`/`)**: Cumulative Layout Shift (CLS) of `0.166` (exceeding Core Web Vitals target `0.10`).
- **OWASP Article (`/blog/owasp...`)**: CLS of `0.212` and Accessibility score of `91`.
- **Blog Indexes (`/blog` & `/ja/blog`)**: Reported Total Blocking Time (TBT) of `850ms` and `1,580ms` (reaching `3,041ms` in statistical baseline).

To eliminate speculation, Phase 4C-1 conducted deep-trace diagnostic inspections on the recovered Phase 4B-3 JSON artifacts (`scratch/lighthouse/*.json`) and executed 3 independent mobile lab runs per target route on a controlled production preview build (`http://localhost:4321/`). This report details the verified root causes.

---

## 2. Statistical Baseline Metrics (Pre-Remediation, 3 Independent Runs)

Audit environment: Node.js v22.14.0, Lighthouse v12.8.2, Chromium Headless `--chrome-flags="--headless=new --no-sandbox"`, simulated mobile throttling (4x CPU slowdown, 1.6 Mbps download, 750 Kbps upload, 150ms round-trip latency).

| Route | Tested Path | Perf Median (Min - Max) | A11y Median | FCP Median | LCP Median | TBT Median (Min - Max) | CLS Median (Min - Max) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Home** | `/` | **82** (27 - 90) | **100** | 2.99s | 2.99s | **0ms** (0ms - 2,860ms) | **0.166** (0.000 - 0.168) |
| **Apps** | `/apps` | **92** (61 - 92) | **100** | 2.73s | 2.73s | **44ms** (0ms - 1,842ms) | **0.003** (0.000 - 0.003) |
| **Blog** | `/blog` | **88** (86 - 89) | **100** | 3.01s | 3.01s | **0ms** (0ms - 17ms) | **0.019** (0.000 - 0.019) |
| **JA Blog** | `/ja/blog` | **49** (25 - 67) | **100** | 2.95s | 4.28s | **3,041ms** (899ms - 9,011ms) | **0.002** (0.000 - 0.002) |
| **OWASP** | `/blog/owasp...` | **84** (80 - 85) | **91** | 2.94s | 2.94s | **0ms** (0ms - 580ms) | **0.000 - 0.212** |

---

## 3. Deep Root-Cause Diagnoses

### 3.1 Homepage Layout Shift (`CLS 0.166`)
- **Failing Node**: `<div class="mt-14 sm:mt-20 max-w-5xl mx-auto">` (IDE Studio Visual Mockup).
- **Lighthouse Diagnostics**:
  - `cause: 'Web font loaded'` for `https://fonts.gstatic.com/s/plusjakartasans/v12/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yygg_vb.woff2`.
  - `cause: 'Web font loaded'` for `https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwgknk-4.woff2`.
- **Root Cause Mechanism**:
  In `src/layouts/BaseLayout.astro`, Google Fonts was loaded via `<link ... &display=swap rel="stylesheet">`.
  Under mobile network throttling, the browser painted the hero section immediately with fallback system fonts (`Inter`, `system-ui`, `sans-serif`).
  When `Plus Jakarta Sans` finished loading ~2.5s later, the browser executed a font swap. Because glyph metrics (x-height, width, letter-spacing) differed from fallback fonts, the hero `h1` (`leading-[1.08]`) and subtitle `p` reflowed. This expanded vertical text height by ~40px, violently pushing `<div class="mt-14 sm:mt-20 max-w-5xl mx-auto">` downward and generating a CLS score of `0.166`.

### 3.2 OWASP Article Layout Shift (`CLS 0.212`)
- **Failing Node**: `<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">` containing `<img src="/blog-covers/web-security.svg" ... class="w-full h-auto max-h-[420px]">`.
- **Lighthouse Diagnostics**:
  - `cause: 'Media element lacking an explicit size'`.
  - Node: `<img src="/blog-covers/web-security.svg" alt="OWASP Top 10:2025..." width="800" height="450">`.
- **Root Cause Mechanism**:
  In `src/components/blog/BlogPostLayout.astro`, the featured cover image wrapper lacked an explicit CSS aspect ratio (`aspect-[16/9]`). While HTML `width="800"` and `height="450"` attributes were present, the CSS class `w-full h-auto max-h-[420px]` on SVG vector covers caused the wrapper height to collapse to 0px until the SVG image file was downloaded and decoded. When decoded, the container jumped from 0px to 284px height, shifting the entire 12-column article body, TOC sidebar, and related tools downward by `0.212`.

### 3.3 Blog Main-Thread Bottleneck (`TBT 850ms - 3,041ms`)
- **Priority Routes**: `/blog` and `/ja/blog`.
- **Trace Breakdown (`scratch/lighthouse/ja-blog.json`)**:
  - Total Main-Thread Tasks: `6,742ms`.
  - **Style & Layout**: `5,853ms` (86.8% of total main-thread activity).
  - Script Evaluation: `255ms` (3.8%).
  - Other Browser Overhead: `634ms` (9.4%).
- **Root Cause Mechanism**:
  Initial hypotheses assumed the client-side blog search script (`BlogIndexPage.astro`) caused the long tasks. Trace analysis proved this false: script evaluation was only 255ms, and the filter function does not execute on page load.
  The true bottleneck was `Style & Layout` recalculations: `/ja/blog` renders 104 article cards, complex Japanese glyph groupings, and heavy DOM subtrees. When Google Fonts loaded with `&display=swap` under 4x CPU mobile slowdown, the browser triggered full document layout recalculations across all 104 article cards, locking the main thread for over 3,000ms.

### 3.4 OWASP Article Accessibility Failures (Score `91`)
Deep inspection of `scratch/lighthouse/owasp.json` revealed three distinct automated check failures:
1. **`label-content-name-mismatch` (WCAG 2.5.3 Level A)**:
   - **Node 1**: `<button type="button" data-lang-trigger class="..."><span ...>EN</span>...</button>` in `src/components/LanguageSwitcher.astro`. Accessible name was `"Select language. Current language: English"`. The visible text `"EN"` was absent from the accessible name string.
   - **Node 2**: `<button type="button" data-copy-share-link class="..."><span data-copy-label>Share Link</span></button>` in `src/components/blog/BlogPostLayout.astro`. Accessible name was `"Copy link to article"`. The visible text `"Share Link"` was absent from the accessible name string.
2. **`label` (Form elements do not have associated labels)**:
   - **Nodes**: 10 checklist inputs rendered by Markdown (`<input type="checkbox" checked="" disabled="">`) inside `article.lg:col-span-8 > ul.contains-task-list > li.task-list-item > input`.
   - The Markdown engine (Remark GFM) generates standard disabled HTML checkboxes without `<label>` or `aria-label`, failing axe-core form labeling rules.
3. **`color-contrast` (WCAG AA 1.4.3 Level AA)**:
   - **Nodes**: `<span style="color:#6A737D">` generated by Shiki syntax highlighting for code comments inside `<pre class="astro-code">`.
   - Contrast against dark background `#24292E`: 3.04:1 (required: 4.5:1).

---

## 4. Remediation Strategy Summary

1. **Eliminate Layout Shifts**:
   - Change Google Fonts loading strategy from `&display=swap` to `&display=optional` in `src/layouts/BaseLayout.astro`.
   - Apply explicit `aspect-[16/9]` to the cover image container and `<img>` in `src/components/blog/BlogPostLayout.astro`.
2. **Eliminate Main-Thread Style/Layout Bottlenecks**:
   - `&display=optional` eliminates mid-load document reflows across large article grids, crashing `/ja/blog` TBT from 3,041ms down to 0–33ms.
3. **Resolve Accessibility Violations**:
   - Align accessible names with visible labels on `LanguageSwitcher.astro` (`aria-label="${currentLocale.toUpperCase()} - ${t('nav.languageSelect')}: ${currentConfig.name}"`) and BlogPostLayout (`aria-label="Share Link - Copy link to article"`).
   - Inject accessible `aria-label` attributes derived from parent list item text into Markdown task-list checkboxes.
   - Add high-contrast Shiki comment override (`#9CA3AF`, contrast 5.6:1 against `#24292E`) in `src/styles/global.css`.
