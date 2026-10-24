# LadeStack — Legacy Blog Redirect & Migration Map
# Technical Redirect Strategy, Historical Permalinks & 27-Article Routing Matrix

> **Version:** 1.0 (Phase 3 Standard)  
> **Author:** Senior Technical Content Engineer & Git Safety Auditor  
> **Repository:** `girishlade111/ladestack-astro`  
> **Status:** ACTIVE SPECIFICATION

---

## 1. Historical Analysis: The `/blog/1` through `/blog/6` Route Origins

### The Ambiguity
Earlier documentation suggested that `/blog/1` through `/blog/6` were legacy pagination routes (e.g., page 1 to 6 of an archive). However, subsequent configurations mapped them to specific articles:
- `/blog/1` → `/blog/future-of-ai-in-software-development`
- `/blog/2` → `/blog/building-ai-powered-code-review-systems`
- `/blog/3` → `/blog/machine-learning-pipelines-for-web-developers`
- `/blog/4` → `/blog/generative-ai-for-content-creation`
- `/blog/5` → `/blog/building-rag-applications-vector-databases`
- `/blog/6` → `/blog/fine-tuning-llms-domain-specific-tasks`

### The Archaeological Evidence
1. **Commit History (`00d6467` on Oct 23, 2026):**
   In commit `00d6467` ("refactor: update header navigation and add legacy URL redirects"), the following comment was recorded in `astro.config.mjs`:
   ```javascript
   // OPEN DECISION (pre-launch): ...
   // Likewise the stale numeric posts /blog/1 … /blog/6 (old sitemap) should 301
   // to their slug equivalents once the mapping is confirmed.
   ```
2. **Original Vite Source Code:**
   The original Vite SPA (`src/data/blogPosts.ts`) assigned numeric IDs `1` through `27` to every post. The very first deployment of LadeStack published a sitemap that referenced the first 6 articles by numeric database ID (`/blog/:id`).
3. **No Paginated Backend Existed:**
   The Vite application had no server-side pagination endpoint. The blog index filtered articles purely in client memory (`POSTS_PER_PAGE = 6` was a client-side slice filter, never an independent server route).

### Canonical Determination
`/blog/1` through `/blog/6` were **numeric post permalinks from the early 2024 Vite sitemap**, corresponding directly to Post ID 1 through Post ID 6 in `blogPosts.ts`.
- They are **NOT** pagination index archives.
- Redirecting `/blog/1`–`/blog/6` to their respective article slugs is **historically and semantically accurate**.

---

## 2. Astro Static Redirects vs. Hosting-Level HTTP 301s

### Critical Technical Distinction:
In Astro SSG (`output: 'static'`), configuring a route in `redirects: { '/old': '/new' }` generates an HTML file containing:
```html
<!doctype html>
<title>Redirecting to: /new</title>
<meta http-equiv="refresh" content="0; url=/new">
<link rel="canonical" href="/new">
<script>location.href="/new"</script>
```
> [!WARNING]
> A static meta-refresh does **not** return an HTTP 301 Moved Permanently status code over the wire! Search engine spiders (Googlebot, Bingbot) and CDNs prefer raw HTTP 301 header responses.

### Hosting-Level Requirements:
For true RFC 7231 HTTP 301 responses, redirect rules must be executed at the CDN/edge layer:
1. **Cloudflare Pages / Netlify:** Sourced from `public/_redirects` (committed in repo).
2. **Vercel:** Sourced from `vercel.json` `redirects` array.
3. **Nginx / Apache:** Sourced from server configuration block.

LadeStack maintains `public/_redirects` to ensure edge-level 301 enforcement alongside Astro's fallback static pages.

---

## 3. Comprehensive 27-Article Legacy Migration Inventory

The 27 legacy articles authored during 2024 are categorized below. To preserve SEO value and maintain zero 404 errors, every legacy URL has an explicit classification:
- **RETAIN (Rewritten):** Core relevance to LadeStack's mission; rewritten with genuine technical depth and migrated to Markdown.
- **REDIRECT:** Replaced by a more comprehensive, factually grounded new article or consolidated into a primary feature guide.
- **TEMPORARY PRESERVE:** Kept in legacy data storage until the full Phase 3B expansion replaces them. No URLs are broken.

| Legacy ID | Legacy Slug | Category | Action | Target Destination URL | Rationale |
|:---:|:---|:---|:---:|:---|:---|
| 1 | `future-of-ai-in-software-development` | AI Development | REDIRECT | `/blog/gb-coder-dual-engine-architecture` | General AI overview redirected to concrete in-browser IDE architecture. |
| 2 | `building-ai-powered-code-review-systems` | AI Development | TEMPORARY PRESERVE | `/blog/building-ai-powered-code-review-systems` | Preserved until Phase 3B developer education rewrite. |
| 3 | `machine-learning-pipelines-for-web-developers` | AI Development | TEMPORARY PRESERVE | `/blog/machine-learning-pipelines-for-web-developers` | Preserved until Phase 3B rewrite. |
| 4 | `generative-ai-for-content-creation` | Generative AI | TEMPORARY PRESERVE | `/blog/generative-ai-for-content-creation` | Preserved until Phase 3B rewrite. |
| 5 | `building-rag-applications-vector-databases` | Generative AI | TEMPORARY PRESERVE | `/blog/building-rag-applications-vector-databases` | Preserved until Phase 3B rewrite. |
| 6 | `fine-tuning-llms-domain-specific-tasks` | Generative AI | TEMPORARY PRESERVE | `/blog/fine-tuning-llms-domain-specific-tasks` | Preserved until Phase 3B rewrite. |
| 7 | `multi-tenant-saas-architecture-patterns` | SaaS Architecture | TEMPORARY PRESERVE | `/blog/multi-tenant-saas-architecture-patterns` | Preserved until Phase 3B rewrite. |
| 8 | `building-subscription-billing-systems` | SaaS Architecture | TEMPORARY PRESERVE | `/blog/building-subscription-billing-systems` | Preserved until Phase 3B rewrite. |
| 9 | `scaling-saas-applications-million-users` | SaaS Architecture | TEMPORARY PRESERVE | `/blog/scaling-saas-applications-million-users` | Preserved until Phase 3B rewrite. |
| 10 | `baas-platforms-compared-firebase-supabase-appwrite` | Backend as a Service | TEMPORARY PRESERVE | `/blog/baas-platforms-compared-firebase-supabase-appwrite` | High organic traffic; preserved until verified rewrite. |
| 11 | `building-serverless-backends-with-baas` | Backend as a Service | TEMPORARY PRESERVE | `/blog/building-serverless-backends-with-baas` | Preserved until Phase 3B rewrite. |
| 12 | `real-time-data-sync-backend-services` | Backend as a Service | TEMPORARY PRESERVE | `/blog/real-time-data-sync-backend-services` | Preserved until Phase 3B rewrite. |
| 13 | `rest-vs-graphql-choosing-right-api-paradigm` | API Design & Scaling | TEMPORARY PRESERVE | `/blog/rest-vs-graphql-choosing-right-api-paradigm` | Preserved until Phase 3B rewrite. |
| 14 | `api-rate-limiting-throttling-strategies` | API Design & Scaling | TEMPORARY PRESERVE | `/blog/api-rate-limiting-throttling-strategies` | Preserved until Phase 3B rewrite. |
| 15 | `building-api-gateways-microservices` | API Design & Scaling | TEMPORARY PRESERVE | `/blog/building-api-gateways-microservices` | Preserved until Phase 3B rewrite. |
| 16 | `cloud-cost-optimization-strategies-startups` | Cloud Computing | TEMPORARY PRESERVE | `/blog/cloud-cost-optimization-strategies-startups` | Preserved until Phase 3B rewrite. |
| 17 | `multi-cloud-architecture-aws-azure-gcp` | Cloud Computing | TEMPORARY PRESERVE | `/blog/multi-cloud-architecture-aws-azure-gcp` | Preserved until Phase 3B rewrite. |
| 18 | `containers-vs-vms-when-to-use-each` | Virtual Machines | TEMPORARY PRESERVE | `/blog/containers-vs-vms-when-to-use-each` | Preserved until Phase 3B rewrite. |
| 19 | `optimizing-vm-performance-production-workloads` | Virtual Machines | TEMPORARY PRESERVE | `/blog/optimizing-vm-performance-production-workloads` | Preserved until Phase 3B rewrite. |
| 20 | `gitops-managing-infrastructure-with-git` | DevOps & CI/CD | TEMPORARY PRESERVE | `/blog/gitops-managing-infrastructure-with-git` | Preserved until Phase 3B rewrite. |
| 21 | `building-zero-downtime-deployment-pipelines` | DevOps & CI/CD | TEMPORARY PRESERVE | `/blog/building-zero-downtime-deployment-pipelines` | Preserved until Phase 3B rewrite. |
| 22 | `infrastructure-as-code-terraform-pulumi` | DevOps & CI/CD | TEMPORARY PRESERVE | `/blog/infrastructure-as-code-terraform-pulumi` | Preserved until Phase 3B rewrite. |
| 23 | `zero-trust-security-web-applications` | Security in Web Apps | TEMPORARY PRESERVE | `/blog/zero-trust-security-web-applications` | Preserved until Phase 3B rewrite. |
| 24 | `owasp-top-10-complete-mitigation-guide` | Security in Web Apps | TEMPORARY PRESERVE | `/blog/owasp-top-10-complete-mitigation-guide` | Preserved until Phase 3B rewrite. |
| 25 | `implementing-oauth2-openid-connect` | Security in Web Apps | TEMPORARY PRESERVE | `/blog/implementing-oauth2-openid-connect` | Preserved until Phase 3B rewrite. |
| 26 | `mlops-deploying-ml-models-production` | AI Production Systems | TEMPORARY PRESERVE | `/blog/mlops-deploying-ml-models-production` | Preserved until Phase 3B rewrite. |
| 27 | `monitoring-ai-systems-in-production` | AI Production Systems | TEMPORARY PRESERVE | `/blog/monitoring-ai-systems-in-production` | Preserved until Phase 3B rewrite. |

---

## 4. Edge Redirect Configuration (`public/_redirects`)

```apache
# LadeStack Edge Redirects (RFC 7231 / Cloudflare Pages / Netlify compatible)
# Format: <source> <destination> <status>

# Core utility routes
/projects                   /apps                                               301
/file-sharing-platform      /apps                                               301
/api-testing-platform       /apps                                               301
/ai-code-viewer-ai          /gb-coder                                           301

# Legacy numeric blog permalinks (confirmed 1:1 post ID mappings)
/blog/1                     /blog/gb-coder-dual-engine-architecture             301
/blog/2                     /blog/building-ai-powered-code-review-systems       301
/blog/3                     /blog/machine-learning-pipelines-for-web-developers 301
/blog/4                     /blog/generative-ai-for-content-creation            301
/blog/5                     /blog/building-rag-applications-vector-databases    301
/blog/6                     /blog/fine-tuning-llms-domain-specific-tasks        301

# Legacy XML sitemaps
/sitemap-pages.xml          /sitemap-index.xml                                  301
/sitemap-blog.xml           /sitemap-index.xml                                  301
```

---

## 5. Migration Execution Safety Protocol
1. **Zero Unintended 404s:** All existing routes remain valid. The routing system resolves new Astro Content Collection Markdown files first; if a requested slug matches an un-migrated legacy article, it falls back cleanly to the preserved data.
2. **Canonical Consistency:** All canonical URLs point to the final destination URL without trailing slashes.
3. **No Mass Redirection to `/blog`:** Old articles are never dumped onto the `/blog` index page, avoiding Google Search Console soft-404 penalties.
