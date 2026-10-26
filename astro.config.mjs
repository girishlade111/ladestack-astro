import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ---------------------------------------------------------------------------
// Canonical site URL — sourced from verified in-repo historical baseline
//   site_url: "https://ladestack.in"
//   default_locale: "en"
//   trailing_slash: false  →  trailingSlash: 'never' below
// ---------------------------------------------------------------------------
const SITE = 'https://ladestack.in';

// ---------------------------------------------------------------------------
// Redirects — Phase 4B-1 verified edge redirects (12 rules total).
// Preserves historical routes, legacy sitemap URLs, and stale numeric posts
// mapped to canonical slug equivalents.
// ---------------------------------------------------------------------------

export default defineConfig({
  site: SITE,
  // In-repo baseline trailing_slash=false → never emit trailing slashes, so generated
  // URLs match canonicals exactly (https://ladestack.in/about).
  trailingSlash: 'never',

  // ---------------------------------------------------------------------------
  // Native Astro i18n configuration
  // 9 supported locales: en (default, unprefixed), ja, ko, zh, ru, tr, fr, pt, es.
  // ---------------------------------------------------------------------------
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  redirects: {
    '/projects': '/apps',
    '/file-sharing-platform': '/apps',
    '/api-testing-platform': '/apps',
    '/ai-code-viewer-ai': '/gb-coder',
    '/blog/1': '/blog/future-of-ai-in-software-development',
    '/blog/2': '/blog/building-ai-powered-code-review-systems',
    '/blog/3': '/blog/machine-learning-pipelines-for-web-developers',
    '/blog/4': '/blog/generative-ai-for-content-creation',
    '/blog/5': '/blog/building-rag-applications-vector-databases',
    '/blog/6': '/blog/fine-tuning-llms-domain-specific-tasks',
    '/sitemap-pages.xml': '/sitemap-index.xml',
    '/sitemap-blog.xml': '/sitemap-index.xml',
  },

  integrations: [
    sitemap({
      // Every path in manifest sitemap.included_paths must be generated and
      // accessible. @astrojs/sitemap crawls the static build output, so the
      // 10 static routes + 27 getStaticPaths() blog slugs are picked up
      // automatically. Exclude non-indexable output:
      //   /apps/admin  → robots index:false + robots.txt Disallow
      //   /404         → robots index:false (error page, never in sitemap)
      filter: (page) =>
        !page.endsWith('/apps/admin') &&
        !page.endsWith('/apps/admin/') &&
        !page.endsWith('/404') &&
        !page.endsWith('/404/'),
      // Keep sitemap priorities aligned with the manifest defaults
      // (changefreq "weekly", priority "0.8"; homepage 1.0).
      serialize: (item) => {
        if (item.url === `${SITE}/`) {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        } else if (item.url.startsWith(`${SITE}/blog/`)) {
          item.changefreq = 'monthly';
          item.priority = 0.7;
        } else if (
          item.url === `${SITE}/privacy` ||
          item.url === `${SITE}/terms`
        ) {
          item.changefreq = 'yearly';
          item.priority = 0.3;
        } else {
          item.changefreq = item.changefreq ?? 'weekly';
          item.priority = item.priority ?? 0.8;
        }
        return item;
      },
    }),
  ],
});
