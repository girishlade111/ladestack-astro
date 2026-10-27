# LADESTACK PHASE 4C-3: ISOLATED VERCEL PREVIEW RELEASE GATE
## READ-ONLY PREFLIGHT EXECUTION PLAN & PRODUCTION SAFETY AUDIT

**Gate Status**: `READY_FOR_EXPLICIT_PREVIEW_AUTHORIZATION`  
**Date**: October 26, 2026  
**Auditor**: Principal Vercel Release Engineer & Git Safety Auditor  
**Local Branch**: `feature/phase-4c-2-preview-readiness`  
**Current HEAD SHA**: `4bd1824e58d8d4e5405fa0f886ae9c90e8d7ca28`  
**Target Action**: AWAITING EXPLICIT OPERATOR APPROVAL BEFORE EXECUTION  

---

## 1. Source & Git Safety Verification

| Parameter | Verified Value | Status |
| :--- | :--- | :--- |
| **Current Branch** | `feature/phase-4c-2-preview-readiness` | VERIFIED |
| **Commit SHA (HEAD)** | `4bd1824e58d8d4e5405fa0f886ae9c90e8d7ca28` | VERIFIED |
| **Ancestor Baselines** | `6845988` (Phase 4C-2), `d4447e3` (Phase 4C-1), `c90ad6f` (Phase 4B-3), `3ed6739` (Phase 3D-D), `2528b3b` (Remote master) | CLEAN ANCESTRY |
| **Working Tree** | `nothing to commit, working tree clean` | PRISTINE |
| **Local Git Safety Rules** | Zero pushes to `origin/master`, zero rebase, zero force-pushes | ENFORCED |
| **Total Markdown Articles** | Exactly 134 articles (30 English, 104 across 8 non-EN locales: 13 each) | 100% PRESERVED |
| **Original 27 Legacy Slugs** | Exactly 27 historical articles present with canonical tags pointing to `https://ladestack.in/blog/<slug>/` | 100% PRESERVED |
| **Legacy HTTP 301 Redirects** | Exactly 12 edge 301 redirects configured in `vercel.json` | 100% PRESERVED |
| **Sitemap URLs** | Exactly 233 URLs across 9 locales generated in `dist/sitemap-0.xml` | 100% PRESERVED |
| **Regression Matrix** | 16 of 16 regression suites PASSED with exit code 0 | 100% PASS |
| **Astro Production Build** | 234 pages generated successfully in 1m 2s (`npm run build`) | ZERO ERRORS |

---

## 2. Vercel Account & Production Architecture

Read-only inspection via authenticated Vercel CLI (`65.2.0` on Node `26.4.0`):

```bash
npx vercel whoami
# User: girishlade111-5769
# Scope: girishlade111-gmailcoms-projects (girishlade111-gmailcom's projects)
```

### Production Project (PROTECTED - DO NOT TOUCH)
- **Project Name**: `lade-stack-ai-dev-hub`
- **Project ID**: `prj_WbMiooHZ6H32HrdEzP2U9zlnxDOP`
- **Owner Scope**: `girishlade111-gmailcom's projects`
- **Created**: 17 September 2025 21:38:06
- **Framework Preset**: `Vite`
- **Node.js Version**: `22.x`
- **Build Command**: `npm run build` or `vite build`
- **Output Directory**: None (Default Vite `dist`)
- **Active Deployment ID**: `dpl_8TjAtyFiitzseof623rkaMXLD8iG` (Fri Oct 02 2026 13:31:44 PDT)
- **Production Aliases**:
  - `https://www.ladestack.in`
  - `https://ladestack.in`
  - `https://lade-stack-ai-dev-hub-girishlade111-gmailcoms-projects.vercel.app`
  - `https://lade-stack-ai-dev-hub-git-main-girishlade111-gmailcoms-projects.vercel.app`

### Account Domain Inventory
- `ladestack.in`: Third Party Registrar (Spaceship DNS: `launch1.spaceship.net`, `launch2.spaceship.net`)
- Project Subdomains running independently:
  - `code.ladestack.in` -> `gb-coder-public-alpha`
  - `img.ladestack.in` -> `image-squeeze-express`
  - `pdf.ladestack.in` -> `ls-pdf`
  - `md2pdf.ladestack.in` -> `md2pdf`
  - `resume.ladestack.in` -> `swift-resume-builder`
  - `land.ladestack.in` -> `bharat-land-helper`
  - `drive.ladestack.in` -> `driving-vibes`

> [!CAUTION]
> Under NO circumstances should local Astro source code be linked to `lade-stack-ai-dev-hub`.
> Doing so would deploy the new Astro build directly to the live production domain (`ladestack.in`), violating the pre-release isolation boundary.

---

## 3. Isolated Preview Project Architecture

Inspection result for `ladestack-astro-preview`:
```json
{
  "status": "error",
  "reason": "project_not_found",
  "message": "There is no project for \"ladestack-astro-preview\""
}
```

The project **does not exist yet**. It must be created cleanly as a separate entity upon operator authorization.

### Proposed Project Specifications:
- **Project Name**: `ladestack-astro-preview`
- **Scope / Team**: `girishlade111-gmailcoms-projects`
- **Framework Preset**: `Astro`
- **Node.js Version**: `24.x` (aligned with user modern apps on Vercel)
- **Root Directory**: `.`
- **Custom Domains**: **NONE** (Only automatic preview URLs: `*.vercel.app`)
- **Git Linkage**: **NONE** (No Git push needed; manual CLI upload ensures complete isolation)
- **Environment Secrets**: Zero production secrets required (static Astro architecture)
- **DNS Impact**: **ZERO** (Production DNS records on Spaceship remain completely untouched)

---

## 4. Exact Execution Workflow (Post-Approval)

When explicit operator authorization is received, the following sequence will be executed:

```powershell
# 1. Create the isolated preview project on Vercel
npx vercel project create ladestack-astro-preview --scope girishlade111-gmailcoms-projects

# 2. Link current working directory strictly to the new preview project
npx vercel link --project ladestack-astro-preview --scope girishlade111-gmailcoms-projects --yes

# 3. SAFETY ASSERTION: Verify .vercel/project.json
# Confirm projectId is NOT prj_WbMiooHZ6H32HrdEzP2U9zlnxDOP
node -e "const p = JSON.parse(require('fs').readFileSync('.vercel/project.json')); if (p.projectId === 'prj_WbMiooHZ6H32HrdEzP2U9zlnxDOP') { console.error('CRITICAL: LINKED TO PRODUCTION!'); process.exit(1); } else { console.log('SAFE: Linked to ' + p.projectId); }"

# 4. Deploy isolated preview build
npx vercel deploy --scope girishlade111-gmailcoms-projects
```

### Prohibited Commands:
- `vercel --prod` (Forbidden: Creates production deployments)
- `vercel deploy --prod` (Forbidden)
- `vercel promote` (Forbidden: Changes production aliases)
- `vercel rollback` (Forbidden)
- `vercel domains add` (Forbidden: No custom domain changes)
- `vercel alias` (Forbidden: No alias manipulation)
- `git push origin master` (Forbidden: Zero remote git modifications)

### Metadata Cleanliness:
- `.vercel/` and `.vercel/project.json` are strictly ignored in `.gitignore:28`.
- `.env` and `.env.local` are strictly ignored in `.gitignore:23-24`.
- No credentials or link artifacts can leak into Git commits.

---

## 5. Preview SEO & Access Protection

1. **Search Engine Shielding**:
   - Vercel automatically injects `X-Robots-Tag: noindex, nofollow` on all non-production preview deployments (`*.vercel.app`).
   - Production canonical links (`<link rel="canonical" href="https://ladestack.in/..."/>`) remain intact in the HTML, validating SEO tag syntax without causing search engines to index preview domains.
2. **Global Noindex Prohibition**:
   - No hardcoded `<meta name="robots" content="noindex">` is added to Astro source code, preserving production readiness.
3. **Authentication & Bypass**:
   - If Vercel deployment protection (Vercel Authentication / password protection) is enforced on preview URLs, verification scripts will supply the appropriate bypass token or header (`x-vercel-protection-bypass`) rather than misreporting HTTP 401/403 as application errors.

---

## 6. Live Verification Test Matrix (Post-Deploy)

Once preview deployment completes, automated HTTP testing against the real preview URL will verify:

| Target Route / Asset | Expected Response | Verification Method |
| :--- | :--- | :--- |
| **English Homepage (`/`)** | HTTP 200 OK, full HTML, zero hydration errors | Real HTTP GET |
| **8 Localized Homepages (`/{locale}/`)** | HTTP 200 OK, localized HTML, correct hreflang alternate links | Real HTTP GET |
| **Apps Gallery (`/apps/`)** | HTTP 200 OK, utility tools rendered | Real HTTP GET |
| **Blog Index (`/blog/`) & i18n Indexes** | HTTP 200 OK, 13 articles per locale | Real HTTP GET |
| **27 Historical Articles** | HTTP 200 OK, exact slug match, canonical tag matching `https://ladestack.in/blog/<slug>/` | Real HTTP GET |
| **12 Legacy Redirect Rules** | HTTP 301 Moved Permanently, `Location:` points to canonical target | Real HTTP GET (no follow) |
| **Non-Existent Route (`/non-existent-page`)** | HTTP 404 Not Found, branded 404 page | Real HTTP GET |
| **Sitemap Index (`/sitemap-index.xml`)** | HTTP 200 OK, `Content-Type: application/xml`, references `sitemap-0.xml` | XML schema audit |
| **Route Sitemap (`/sitemap-0.xml`)** | HTTP 200 OK, 233 valid route URLs | XML URL count audit |
| **Robots Policy (`/robots.txt`)** | HTTP 200 OK, points to sitemap index | Real HTTP GET |
| **Security Headers** | `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin` | Header validation |
| **CSP Mode** | `Content-Security-Policy-Report-Only` active with reporting URI | Header validation |
| **HSTS Scope** | No unexpected `includeSubDomains` affecting other subdomains | Header validation |
| **Lighthouse Performance** | Real mobile lab run on preview URL | Lighthouse CLI |

---

## 7. Production Safety Baseline Snapshot

Recorded on **October 26, 2026 17:51 UTC**:

```http
HTTP/1.1 307 Temporary Redirect
Location: https://www.ladestack.in/
Server: Vercel
Strict-Transport-Security: max-age=63072000
X-Vercel-Id: bom1::v9h6m-1793037115998-23df294f87c4

HTTP/1.1 200 OK
Server: Vercel
Content-Type: text/html; charset=utf-8
Content-Length: 12299
Etag: "08c97678af10618355f22fba9d21a8e5"
Strict-Transport-Security: max-age=63072000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-Xss-Protection: 1; mode=block
X-Vercel-Cache: HIT
X-Vercel-Id: bom1::xtswh-1793037116383-9edf8a431bd1
```

- **Live Production Deployment**: `dpl_8TjAtyFiitzseof623rkaMXLD8iG`
- **Live Production Project ID**: `prj_WbMiooHZ6H32HrdEzP2U9zlnxDOP`
- **Live DNS Configuration**: Spaceship Nameservers with Vercel ALIAS records.

After the isolated preview deployment is completed, a comparison against this exact snapshot will be performed to confirm zero changes occurred on the live production service.

---

## 8. Release Gate Decision

```
========================================================================
STATUS: READY_FOR_EXPLICIT_PREVIEW_AUTHORIZATION
========================================================================
```

- **Preflight Complete**: Git repository, regression suites, Astro build, Vercel account, and production isolation are 100% verified.
- **Execution Blocked**: No remote project has been created. No files have been uploaded. No Git branch has been pushed.
- **Next Step**: Await user explicit command to proceed with isolated project creation and preview deployment.
