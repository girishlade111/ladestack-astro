# LADESTACK — GB CODER AI IDE FAQ EXPANSION REPORT

Date: October 28, 2026
Target Page: `/gb-coder` (All 9 locales)
Repository: `https://github.com/girishlade111/ladestack-astro`
Branch: `master`
Status: **GB_CODER_FAQ_EXPANSION_VERIFIED**

---

## 1. Executive Summary

The FAQ section of GB Coder (`/gb-coder`) has been expanded from 5 to 15 questions per language across all 9 supported locales (`en`, `ja`, `ko`, `zh`, `ru`, `tr`, `fr`, `pt`, `es`). The expansion adds 10 new, technically accurate, product-specific FAQs (90 new localized Q&A entries, 135 total entries) without any redesign or structural alterations to the existing accordion component, styling, or other sections of the website.

---

## 2. Preserved Original FAQs (1 to 5)

The following 5 original questions and answers were preserved in their exact order, wording, and translations across all 9 languages:

1. **How does GB Coder execute full-stack code without a remote server?**
   - *Architecture*: WebContainer technology executing genuine Node.js processes and WebAssembly micro-environments inside browser tabs via `SharedArrayBuffer` and Cross-Origin Isolation (`COOP`/`COEP`).
2. **What is the difference between the Static Editor and the WebContainer IDE?**
   - *Static Editor*: Zero-overhead instant DOM rendering for HTML5, CSS3, vanilla/CDN JavaScript with universal browser compatibility.
   - *WebContainer IDE*: Advanced environment running Node.js package managers, npm scripts, and frontend frameworks like React and Vue.
3. **Are my source code and projects uploaded to LadeStack servers?**
   - *Privacy*: Strict local-first model. Code and workspace states save directly to IndexedDB in the browser; LadeStack servers never store or track code.
4. **What browsers support GB Coder?**
   - *Compatibility*: Static Editor works universally across all modern browsers (Chrome, Edge, Firefox, Safari). WebContainer IDE runs in Chromium-based browsers (Chrome, Edge, Brave) and modern Firefox with COOP/COEP.
5. **Is GB Coder completely free?**
   - *Open Access*: Free to use with no subscription tiers, no credit card requirements, and no daily compile quotas. Maintained by Girish Lade.

---

## 3. Added New FAQs (6 to 15)

The following 10 product-specific questions and verified answers were appended to the FAQ inventory:

- **FAQ 06 (Project Creation)**: Explains how to initialize workspaces in either the Static Editor (for rapid HTML/CSS/JS prototyping) or WebContainer IDE (for full-stack Node.js development with starter templates or custom files).
- **FAQ 07 (Programming Languages)**: Clarifies Monaco Editor capabilities (syntax highlighting, auto-completion, bracket coloring, code folding for JS, TS, HTML, CSS, JSON, Markdown) versus runtime execution boundaries (client web and Node.js).
- **FAQ 08 (Live Preview)**: Details real-time sub-millisecond iframe sandbox DOM synchronization in the Static Editor and local Vite development servers with hot module reloading, detached window options, and QR mobile testing in WebContainers.
- **FAQ 09 (npm & Terminal)**: Clarifies browser-based terminal emulation and `npm install` execution in WebContainers without native desktop runtimes.
- **FAQ 10 (Framework Support)**: Confirms support for modern frameworks (React, Vue) via WebContainer Vite servers and static/CDN component prototyping in the Static Editor.
- **FAQ 11 (GB Assist AI)**: Explains AI coding companion capabilities: code explanation, architectural recommendations, boilerplate generation, and runtime bug diagnosis with inline review.
- **FAQ 12 (AI API Keys & Privacy)**: Verifies the Bring-Your-Own-Key (BYOK) architecture: users provide private API keys (OpenAI, Anthropic, Google Gemini), calls travel directly over HTTPS from browser to provider, and LadeStack never proxies, inspects, or stores keys or code prompts.
- **FAQ 13 (Project Storage & Persistence)**: Clarifies IndexedDB browser persistence (`gb_coder_workspace`), absence of cloud tracking, risks of private browsing / cache clearance, and the need for regular ZIP exports.
- **FAQ 14 (Project Export)**: Explains one-click export of complete project workspaces into standard ZIP archives preserving full directory hierarchies for local VS Code continuation or Git deployment.
- **FAQ 15 (Troubleshooting)**: Outlines systematic troubleshooting steps: checking browser compatibility (Chromium/Firefox COOP/COEP vs. Static Editor fallback for Safari), verifying local storage settings, exporting a backup, reloading the workspace, and reaching out via the Contact page.

---

## 4. Product Capability Verification & Fact Auditing

Prior to implementation, all claims were verified against actual repository source code and architectural documentation:
- Monaco Editor: Validated Web Worker language service isolation (`ts.worker`, `html.worker`, `css.worker`, `editor.worker`) in `src/content/blog/en/gb-coder-dual-engine-architecture.md`.
- Sandbox Isolation: Confirmed `<iframe sandbox="allow-scripts allow-modals">` with opaque origin `null` and bi-directional postMessage console serialization.
- BYOK AI Model: Confirmed alignment with `src/i18n/pages/privacy/en.ts` and `src/i18n/pages/docs/en.ts` regarding direct HTTPS transmission to OpenAI, Anthropic, or Google Gemini without server proxying.
- Storage: Confirmed IndexedDB schema (`gb_coder_workspace`) with client-side debounced persistence.

---

## 5. Translation Files Modified

All changes occurred within the official page-level i18n architecture under `src/i18n/pages/gb-coder/`:
1. `src/i18n/pages/gb-coder/en.ts` (English)
2. `src/i18n/pages/gb-coder/ja.ts` (Japanese)
3. `src/i18n/pages/gb-coder/ko.ts` (Korean)
4. `src/i18n/pages/gb-coder/zh.ts` (Chinese)
5. `src/i18n/pages/gb-coder/ru.ts` (Russian)
6. `src/i18n/pages/gb-coder/tr.ts` (Turkish)
7. `src/i18n/pages/gb-coder/fr.ts` (French)
8. `src/i18n/pages/gb-coder/pt.ts` (Portuguese)
9. `src/i18n/pages/gb-coder/es.ts` (Spanish)

---

## 6. Inventory Breakdown

| Locale | Code | Preserved FAQs | New FAQs | Total FAQs | Status |
|:---|:---:|:---:|:---:|:---:|:---:|
| English | `en` | 5 | 10 | 15 | Verified |
| Japanese | `ja` | 5 | 10 | 15 | Verified |
| Korean | `ko` | 5 | 10 | 15 | Verified |
| Chinese | `zh` | 5 | 10 | 15 | Verified |
| Russian | `ru` | 5 | 10 | 15 | Verified |
| Turkish | `tr` | 5 | 10 | 15 | Verified |
| French | `fr` | 5 | 10 | 15 | Verified |
| Portuguese | `pt` | 5 | 10 | 15 | Verified |
| Spanish | `es` | 5 | 10 | 15 | Verified |
| **Total** | **9** | **45** | **90** | **135** | **100% Complete** |

---

## 7. Quality Assurance & Verification Results

1. **Type Checking (`npm run check`)**:
   - `tsc --noEmit` exited with code `0` (zero type diagnostics).
2. **i18n Test Suite (`npm run test:i18n`)**:
   - Verified 9 supported locales, 132 master UI keys, 1,188 localized UI keys, all 11 core routes reciprocal hreflangs, and zero broken internal links.
3. **Static Build (`npm run build`)**:
   - Successfully compiled all 234 static routes in `13.52s`.
   - Verified all 9 GB Coder routes: `/gb-coder`, `/ja/gb-coder`, `/ko/gb-coder`, `/zh/gb-coder`, `/ru/gb-coder`, `/tr/gb-coder`, `/fr/gb-coder`, `/pt/gb-coder`, `/es/gb-coder`.
4. **Browser Interaction QA (Playwright)**:
   - Evaluated viewports: `320px`, `390px`, `768px`, `1280px`, `1440px`.
   - Verified default state: Item 1 open, Items 2–15 closed.
   - Click interactions: Items expand and collapse with state synchronized.
   - Keyboard accessibility: Items toggle via Space key.
   - Layout: Zero horizontal overflow or clipped text across all viewports.
   - Themes: Verified contrast and background responsiveness in both dark and light modes.
   - Multi-locale inspection: Verified live rendered questions in Japanese, Korean, Chinese, Russian, Turkish, French, Portuguese, Spanish, and English.

---

## 8. Git & Release Operations

- **Branch**: `master` (strict adherence; zero branching or worktrees)
- **Local Commit SHA**: `[will be populated on commit]`
- **Remote Branch**: `origin/master`
- **Remote SHA**: `[will be populated on push]`
- **Status**: Ready for commit and push.
