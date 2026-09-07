import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ---------------------------------------------------------------------------
// Canonical site URL — sourced from migration-seo-manifest.json → site_config
//   site_url: "https://ladestack.in"
//   default_locale: "en"
//   trailing_slash: false  →  trailingSlash: 'never' below
// ---------------------------------------------------------------------------
const SITE = 'https://ladestack.in';

// ---------------------------------------------------------------------------
// Redirects — sourced from migration-seo-manifest.json → redirects.
// The manifest lists ZERO redirects (the Vite app used a pure SPA rewrite with
// no next.config.js redirects() or middleware redirects), so this stays an
// empty object for a strict 1:1 match. Add entries here only if a future audit
// introduces legacy-URL 301s:
//
//   redirects: {
//     '/old-path': { status: 301, destination: '/new-path' },
//   },
//
// OPEN DECISION (pre-launch): these 3 URLs exist in public/sitemap.xml but have
// NO route in the manifest and currently 404 on the live site. Either recreate
// them as Astro pages or add 301s here before submitting the new sitemap:
//   '/projects'              → e.g. { status: 301, destination: '/apps' }
//   '/file-sharing-platform' → e.g. { status: 301, destination: '/apps' }
//   '/api-testing-platform'  → e.g. { status: 301, destination: '/apps' }
// Likewise the stale numeric posts /blog/1 … /blog/6 (old sitemap) should 301
// to their slug equivalents once the mapping is confirmed.
// ---------------------------------------------------------------------------

export default defineConfig({
  site: SITE,
  // Manifest trailing_slash=false → never emit trailing slashes, so generated
  // URLs match the manifest canonicals exactly (https://ladestack.in/about).
  trailingSlash: 'never',

  redirects: {},

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
