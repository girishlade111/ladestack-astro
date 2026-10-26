# LADESTACK PHASE 4A — RELEASE RISK REGISTER
**Prioritized Inventory of Pre-Production Defects, Exposure Risks, and Mitigation Strategies**

---

## 1. Severity Classification Model

- **P0 — Release Blocker**: Data loss, broken historical canonical URLs, active remote code execution, severe credential leak, or complete site-wide layout/routing crash. Deployment must be immediately aborted.
- **P1 — High**: Major indexability errors, widespread localization defects, broken interactive/visual components, or unconfigured edge redirects. Must be remediated before public launch.
- **P2 — Medium**: Sub-optimal performance payloads, security header absence, minor reverse tabnabbing risks, or build-time dependency advisories. Remediate in controlled implementation phase.
- **P3 — Low**: Cosmetic polish, non-blocking editorial titles, comment contrast refinements, or documentation comment staleness. Non-blocking quality enhancements.

---

## 2. Complete Risk & Defect Inventory

| Issue ID | Severity | Category | Title | Affected Scope | Complexity |
| :--- | :---: | :---: | :--- | :--- | :---: |
| **DEFECT-UI-001** | **P1** | UI / Assets | 36 Broken App Card Image Icons on `/apps` | 9 locales × 4 cards (36 instances) | Low |
| **DEFECT-SEO-001** | **P1** | SEO / Content | Duplicate `<h1>` Elements on 19 Blog Articles | 19 Markdown articles across locales | Low |
| **DEFECT-I18N-001** | **P1** | International SEO | Hardcoded English Title & Description on Localized Blog Indexes | 8 non-English blog index pages | Low |
| **DEFECT-HOST-001** | **P1** | Hosting / Edge | Legacy URLs Serve Static HTML 200 Meta-Refresh Instead of 301 | 12 redirect routes | Low |
| **DEFECT-SEC-001** | **P2** | Security | Reverse Tabnabbing Risk on `gb-coder` External Anchors | 18 link instances on `/gb-coder` | Low |
| **DEFECT-SEC-002** | **P2** | Security / Headers | Total Absence of Production HTTP Security Headers and CSP | All 246 endpoints | Medium |
| **DEFECT-SEC-003** | **P2** | Security / Dependencies | 13 Dependency Vulnerabilities in npm Lockfile | Build-time toolchain | Low |
| **DEFECT-PERF-001** | **P2** | Performance | 2.25MB Hero PNG Fallback & 1.69MB Orphan Unused Images | `public/hero/` & `public/img/` | Low |
| **DEFECT-I18N-002** | **P2** | International UX | Quick Jump Search Modal Hardcodes Unprefixed English URLs | All non-English pages (Cmd+K) | Low |
| **DEFECT-PERF-002** | **P3** | Performance / Privacy | External Google Fonts Stylesheet Render-Blocking CDN Roundtrip | `src/layouts/BaseLayout.astro` | Medium |
| **DEFECT-A11Y-001** | **P3** | WCAG 2.2 AA | Low Contrast on Code Block Comment Text (`text-muted-foreground/60`) | `HeroSection.astro` | Low |
| **DEFECT-SEO-002** | **P3** | Technical SEO | 107 Page Titles Exceed 70 Characters in Search Preview | Blog articles across locales | Low |
| **DEFECT-DOC-001** | **P3** | Documentation | Stale Comments Referencing Missing `migration-seo-manifest.json` | `package.json`, `astro.config.mjs` | Low |

---

## 3. High-Severity (P1) Defect Profiles

### DEFECT-UI-001: 36 Broken Card Image Icons on `/apps` Across All 9 Locales
- **Issue ID**: `DEFECT-UI-001`
- **Severity**: **P1 — High**
- **Category**: UI / UX / Assets
- **Affected URL or Template**: `https://ladestack.in/apps` and `https://ladestack.in/{locale}/apps` (`ja`, `ko`, `zh`, `ru`, `tr`, `fr`, `pt`, `es`)
- **File Paths**:
  - `src/i18n/pages/apps/en.ts` (lines 53, 62, 71, 80)
  - `src/i18n/pages/apps/ja.ts`
  - `src/i18n/pages/apps/ko.ts`
  - `src/i18n/pages/apps/zh.ts`
  - `src/i18n/pages/apps/ru.ts`
  - `src/i18n/pages/apps/tr.ts`
  - `src/i18n/pages/apps/fr.ts`
  - `src/i18n/pages/apps/pt.ts`
  - `src/i18n/pages/apps/es.ts`
  - `src/components/pages/AppsPage.astro` (line 122)
- **Reproduction Steps**:
  1. Build site: `npm run build`.
  2. Start preview server: `npx astro preview`.
  3. Navigate to `http://localhost:4321/apps` in any browser.
  4. Inspect the 4 app cards (PDF Studio, Image Optimizer, Swift Resume, Bharat Land).
- **Evidence**:
  Browser renders broken image icons. HTML output shows:
  `<img src="/icons/pdf.svg" alt="PDF Studio" ...>`
  `<img src="/icons/image.svg" alt="Image Optimizer" ...>`
  `<img src="/icons/resume.svg" alt="Swift Resume" ...>`
  `<img src="/icons/land.svg" alt="Bharat Land Records" ...>`
  File system check: `public/icons/` does not exist.
- **Expected Result**: Valid project SVG icons rendered cleanly in card headers.
- **Actual Result**: 4 HTTP 404 image errors per page across all 9 language variants (36 broken requests).
- **Root Cause Hypothesis**: Migration author created mockup data with placeholder `/icons/` paths instead of referencing actual SVGs located in `public/` (`/ls-pdf-project.svg`, `/ls-img-project.svg`, etc.).
- **Recommended Fix**: Update dictionary files `src/i18n/pages/apps/*.ts` to reference existing `public/*.svg` files or render inline Lucide icons.
- **Regression Test Needed**: Automated image existence check validating all `<img src>` paths in `dist/`.
- **Estimated Complexity**: Low (15 minutes).

---

### DEFECT-SEO-001: Duplicate `<h1>` Headings on 19 Markdown Blog Articles
- **Issue ID**: `DEFECT-SEO-001`
- **Severity**: **P1 — High**
- **Category**: Technical SEO / Content Architecture
- **Affected URL or Template**:
  - `blog/building-rag-applications-vector-databases` (en, es, fr, ja, ko, pt, ru, tr, zh - 9 pages)
  - `blog/machine-learning-pipelines-for-web-developers` (es, fr, ja, ko, pt, ru, tr, zh - 8 pages)
  - `blog/fine-tuning-llms-domain-specific-tasks` (en - 1 page)
  - `blog/multi-tenant-saas-architecture-patterns` (en - 1 page)
- **File Paths**:
  - `src/components/blog/BlogPostLayout.astro` (line 205)
  - `src/content/blog/{locale}/{slug}.md`
- **Reproduction Steps**:
  1. Build site: `npm run build`.
  2. Inspect `dist/blog/building-rag-applications-vector-databases/index.html`.
  3. Count `<h1>` tags in the HTML document.
- **Evidence**:
  AST inspection via `node scratch/run-full-audit.mjs` returned count: 2 for 19 pages:
  - Layout renders: `<h1 class="...">{data.title}</h1>`
  - Markdown body renders: `<h1>{title}</h1>` from `# Heading` on line 26.
- **Expected Result**: Exactly one `<h1>` per HTML page.
- **Actual Result**: Two identical `<h1>` elements rendered sequentially in DOM.
- **Root Cause Hypothesis**: Markdown editorial author copied titles into both frontmatter `title:` and the first line of markdown body.
- **Recommended Fix**: Delete the redundant `# Heading` line from the top of the 19 Markdown files.
- **Regression Test Needed**: Automated check ensuring `h1Matches.length === 1` for all 234 content pages.
- **Estimated Complexity**: Low (15 minutes).

---

### DEFECT-I18N-001: Hardcoded English Title and Description on Localized Blog Indexes
- **Issue ID**: `DEFECT-I18N-001`
- **Severity**: **P1 — High**
- **Category**: International SEO / Localization
- **Affected URL or Template**: `/{locale}/blog` (`ja`, `ko`, `zh`, `ru`, `tr`, `fr`, `pt`, `es` - 8 pages)
- **File Paths**: `src/components/blog/BlogIndexPage.astro` (lines 75–76)
- **Reproduction Steps**:
  1. Inspect `dist/ja/blog/index.html` and `dist/zh/blog/index.html`.
  2. Read `<title>` and `<meta name="description">` tags.
- **Evidence**:
  ```html
  <title>Blog – Engineering Insights &amp; Technical Guides | LadeStack</title>
  <meta name="description" content="Explore technical architecture deep-dives, WebAssembly benchmarks, client-side security guides, and developer tooling insights from the LadeStack team.">
  ```
- **Expected Result**: Japanese title (e.g. `ブログ – エンジニアリングの洞察と技術ガイド | LadeStack`) and localized description.
- **Actual Result**: English metadata rendered verbatim across all 8 non-English blog indexes.
- **Root Cause Hypothesis**: `BlogIndexPage.astro` hardcoded English literals into `<BaseLayout>` rather than retrieving localized strings from `src/i18n/pages/blog/{locale}.ts`.
- **Recommended Fix**: Update `BlogIndexPage.astro` to call `useTranslations(locale)` for title and description.
- **Regression Test Needed**: Extend `npm run test:i18n` to assert localized titles across all 9 blog index pages.
- **Estimated Complexity**: Low (15 minutes).

---

### DEFECT-HOST-001: Legacy URLs Serve Static HTML 200 Meta-Refresh Instead of 301
- **Issue ID**: `DEFECT-HOST-001`
- **Severity**: **P1 — High**
- **Category**: Hosting / Edge Routing
- **Affected URL or Template**: 12 legacy redirect endpoints (`/projects`, `/file-sharing-platform`, `/api-testing-platform`, `/ai-code-viewer-ai`, `/blog/1` through `/blog/6`, `/sitemap-pages.xml`, `/sitemap-blog.xml`)
- **File Paths**: `astro.config.mjs`, `public/_redirects`
- **Reproduction Steps**:
  1. Build site: `npm run build`.
  2. Serve `dist/` with a standard static HTTP server (`node scratch/test-http-redirects.mjs`).
  3. Send `GET /projects` and inspect HTTP response status and headers.
- **Evidence**:
  ```
  GET /projects -> Status: 200 OK
  Body: <!doctype html><title>Redirecting to: /apps</title><meta http-equiv="refresh" content="0;url=/apps">...
  ```
- **Expected Result**: HTTP 301 Moved Permanently with `Location: /apps` header at network level.
- **Actual Result**: HTTP 200 OK with client-side HTML meta refresh.
- **Root Cause Hypothesis**: Astro static generation outputs HTML redirect stubs. Without hosting platform redirect rules (such as `vercel.json`), static hosts serve the HTML file as a 200 OK document.
- **Recommended Fix**: Add `vercel.json` with an explicit `redirects` array matching `astro.config.mjs`.
- **Regression Test Needed**: Edge deployment redirect test asserting HTTP 301 status on all 12 routes.
- **Estimated Complexity**: Low (20 minutes).

---

## 4. Medium-Severity (P2) Defect Profiles

### DEFECT-SEC-001: Reverse Tabnabbing on `gb-coder`
- **Severity**: P2 — Medium
- **Location**: `src/components/pages/GbCoderPage.astro` (lines 156, 190)
- **Problem**: `<a href="https://code.ladestack.in/" target="_blank">` omits `rel="noopener noreferrer"`.
- **Remediation**: Add `rel="noopener noreferrer"` attribute to prevent `window.opener` abuse.

### DEFECT-SEC-002: Missing Production Security Headers
- **Severity**: P2 — Medium
- **Location**: Edge hosting configuration (`vercel.json` / `_headers`)
- **Problem**: No `Content-Security-Policy`, `HSTS`, `X-Frame-Options`, `X-Content-Type-Options`, or `Referrer-Policy` deployed.
- **Remediation**: Create platform header configuration deploying strict OWASP-compliant security headers.

### DEFECT-SEC-003: 13 Build-Time Dependency Vulnerabilities
- **Severity**: P2 — Medium
- **Location**: `package-lock.json`
- **Problem**: `npm audit` reports 7 high and 6 moderate vulnerabilities in sub-dependencies (vite, undici, zod, sharp).
- **Remediation**: Execute `npm audit fix` during Phase 4B implementation.

### DEFECT-PERF-001: 2.25MB Hero PNG Fallback & 1.69MB Orphan Images
- **Severity**: P2 — Medium
- **Location**: `public/hero/background.png` and `public/img/girish1..4.jpg`
- **Problem**: 2.25MB PNG fallback inflates bundle; 1.69MB of unused portrait files copied to `dist/`.
- **Remediation**: Re-compress `background.png` to <150KB and delete orphan files `girish1..4.jpg`.

### DEFECT-I18N-002: Quick Jump Search Modal Strips Locale Context
- **Severity**: P2 — Medium
- **Location**: `src/components/Header.astro` (lines 204–237)
- **Problem**: Quick Jump links hardcode English routes (`/apps`, `/blog`, etc.) on localized pages.
- **Remediation**: Wrap quick jump links with `getLocalizedPath(route, activeLocale)`.

---

## 5. Low-Severity (P3) Defect Profiles

### DEFECT-PERF-002: External Google Fonts CDN Request
- **Severity**: P3 — Low
- **Location**: `src/layouts/BaseLayout.astro` (lines 61–66)
- **Problem**: External stylesheet link to `fonts.googleapis.com` causes render-blocking network hops and GDPR concerns.
- **Remediation**: Self-host fonts using `@fontsource` packages.

### DEFECT-A11Y-001: Code Block Comment Opacity Contrast
- **Severity**: P3 — Low
- **Location**: `src/components/sections/HeroSection.astro` (line 118)
- **Problem**: `text-muted-foreground/60` drops contrast to ~2.8:1 on light background.
- **Remediation**: Remove `/60` opacity modifier.

### DEFECT-SEO-002: 107 Article Titles Exceed 70 Characters in SERP Preview
- **Severity**: P3 — Low
- **Location**: Multiple blog frontmatter `title:` fields
- **Problem**: Long titles truncate in search snippets.
- **Remediation**: Provide optional concise `seoTitle` frontmatter property.

### DEFECT-DOC-001: Stale Reference to `migration-seo-manifest.json`
- **Severity**: P3 — Low
- **Location**: `package.json`, `astro.config.mjs`
- **Problem**: Code comments reference a non-existent external JSON manifest.
- **Remediation**: Update comments to document the verified in-repo baseline.
