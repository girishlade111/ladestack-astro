# LadeStack — Astro Migration

A complete rebuild of the **LadeStack** brand site ([ladestack.in](https://ladestack.in)) in [Astro](https://astro.build), migrated 1:1 from the original Vite + React SPA with SEO and routing parity verified against a migration manifest.

## Features

- **1:1 SEO + routing match** — every route, canonical URL, and redirect rule from the original site is reproduced; `trailingSlash: 'never'` keeps canonicals exactly like `https://ladestack.in/about`
- **Static pages** — Home, About, Contact, Support, Docs, Privacy, Terms, custom 404, and a featured `ai-code-viewer-ai` showcase page
- **Apps catalog** — `/apps` directory page listing LadeStack products (data-driven from `src/data/apps.json`), with an `/apps/admin` back-office route (excluded from indexing)
- **Blog** — `/blog` index + dynamic `[slug]` pages for 28 posts, with reading-time, covers, and categories from `src/data/blogPosts.ts` / `blogContent.ts`
- **SEO-first** — `@astrojs/sitemap` with custom priorities/changefreq, per-page meta via the `SEO.astro` component, `robots.txt` rules
- **Zero-JS-by-default island architecture** — Astro ships almost no client JS, keeping the marketing site fast
- **Styling** — Tailwind CSS 3 + `tailwindcss-animate` + `@tailwindcss/typography`, Lucide and Simple Icons via static SVG icon components

## Tech Stack

- [Astro](https://astro.build) 7 (static output)
- TypeScript 5 (strict)
- Tailwind CSS 3 + PostCSS + Autoprefixer
- `@astrojs/sitemap` 3
- No backend, no database, no env vars — 100% static

## Quick Start

```bash
npm install
npm run dev      # local dev server → http://localhost:4321
npm run build    # static build → ./dist
npm run preview  # preview the production build
```

Requires Node.js 18+ (tested with Node 24).

## Project Structure

```
├── astro.config.mjs        # site URL, trailingSlash: 'never', sitemap config
├── src/
│   ├── pages/              # routes: index, about, blog/[slug], apps/, 404, …
│   ├── components/         # Astro UI components (Header, Hero, Products, …)
│   ├── layouts/            # BaseLayout with global head/SEO
│   ├── data/               # apps.json, blogPosts.ts, blogContent.ts, categories.ts
│   └── lib/markdown.ts     # markdown rendering helper for blog posts
├── public/                 # static assets (favicons, project SVGs, blog covers)
└── validate.mjs            # migration validator: checks ported slugs against
                            # migration/manifest-pretty.json (legacy script)
```

## Deploy

The live brand site is served from **https://ladestack.in**. This repo also ships a GitHub Pages preview: the static build is produced with Astro's `base: '/ladestack-astro'` so root-absolute links (`/apps`, `/blog`, …) resolve correctly under the `girishlade111.github.io/ladestack-astro/` subpath. Canonical URLs and the sitemap still point at `https://ladestack.in` (the production domain), per the migration manifest.

## Notes

- The original Vite SPA used a pure client-side rewrite with no redirects, so `redirects: {}` is intentional.
- Three legacy sitemap URLs (`/projects`, `/file-sharing-platform`, `/api-testing-platform`) have no route in the migration manifest and currently 404 — see the `OPEN DECISION` comment in `astro.config.mjs` before regenerating the sitemap for production.

## Credits

Built by [Girish Lade](https://github.com/girishlade111) — [ladestack.in](https://ladestack.in)
