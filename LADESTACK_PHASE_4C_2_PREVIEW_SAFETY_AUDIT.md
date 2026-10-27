# LADESTACK — PHASE 4C-2 PREVIEW DEPLOYMENT SAFETY AUDIT
**Document Date**: October 26, 2026  
**Auditor / Roles**: Vercel Deployment Safety Auditor, DevSecOps Specialist, Git Release Safety Engineer  
**Repository**: `girishlade111/ladestack-astro`  
**Active Branch**: `feature/phase-4c-2-preview-readiness`  

---

## 1. Executive Summary & Deployment Safety Preflight

Before requesting operator authorization for preview deployment, Phase 4C-2 audited the remote Vercel hosting environment and production domain mappings using authenticated Vercel CLI inspection (`vercel project ls`, `vercel project inspect`).

### Critical Audit Findings:
1. **Current Production Domain Owner**:
   The apex domain `https://ladestack.in` and `https://www.ladestack.in` are currently attached to Vercel project **`lade-stack-ai-dev-hub`** (Project ID: `prj_WbMiooHZ6H32HrdEzP2U9zlnxDOP`).
2. **Production Project Framework Setting**:
   `lade-stack-ai-dev-hub` is configured with **`Framework Preset: Vite`** and Node.js `22.x`.
3. **Subdomain Infrastructure Isolation**:
   Independent production subdomains (`code.ladestack.in`, `img.ladestack.in`, `pdf.ladestack.in`, `md2pdf.ladestack.in`, `resume.ladestack.in`) are hosted across distinct Vercel projects and remain completely isolated from the apex domain.
4. **Local Workspace Linkage**:
   The local Astro repository (`ladestack-astro`) is **NOT** linked to any remote Vercel project (no `.vercel/project.json` exists in the local directory).

---

## 2. Risk Evaluation of Deployment Pathways

### 2.1 Threat Scenario A: Blind Remote Git Push to `origin/master`
- **Severity**: CRITICAL.
- **Consequence**: If `girishlade111/ladestack-astro`'s `master` branch is connected to `lade-stack-ai-dev-hub`, a push to master would trigger an automatic production deployment. Because the remote project has `Framework Preset: Vite`, the build would execute `vite build` instead of Astro, potentially crashing the live production website or overwriting the active Vite release prematurely.
- **Safety Rule Enforced**: Remote `master` branch is strictly untouched (0 pushes executed).

### 2.2 Threat Scenario B: Pushing Feature Branch to GitHub
- **Severity**: HIGH.
- **Consequence**: If automatic preview deployments are enabled on GitHub repository pushes, Vercel may generate a preview deployment under the existing Vite project settings, causing build failures.
- **Safety Rule Enforced**: Feature branches are kept strictly local. No git push to `origin` will occur without explicit user consent.

### 2.3 Threat Scenario C: Accidental Production Domain Re-aliasing
- **Severity**: CRITICAL.
- **Consequence**: If a developer runs `vercel --prod` from the Astro directory and links to `lade-stack-ai-dev-hub`, Vercel would update the production alias `https://ladestack.in` to point to the new unverified deployment.
- **Safety Rule Enforced**: Production domain aliases are completely locked. No deployment commands will touch `ladestack.in`.

---

## 3. Recommended Isolated Preview Deployment Protocol

When the operator authorizes preview deployment, the following strictly isolated protocol MUST be executed:

1. **Create an Isolated Preview Project**:
   Do NOT link to `lade-stack-ai-dev-hub`.
   Link to or create a dedicated Astro project: `ladestack-astro-preview`.
   Set `Framework Preset: Astro` and Node.js `24.x`.
2. **Deploy Without Production Aliases**:
   Deploy exclusively to a generated preview URL (e.g., `https://ladestack-astro-preview-[hash].vercel.app`).
   Ensure zero domain aliases (`ladestack.in`, `www.ladestack.in`) are associated with the preview project.
3. **Inspect Edge Headers & 301 Redirects on Preview**:
   Perform curl inspection on the preview URL to verify:
   - Status 301 edge redirects on legacy routes.
   - `Content-Security-Policy-Report-Only` header presence.
   - Absence of dangerous HSTS `includeSubDomains`.
4. **Final Cutover (Future Phase 5)**:
   Only after complete preview sign-off will the production domain alias be transferred to the Astro project in Vercel project settings.
