import f from 'node:fs';

const j = JSON.parse(f.readFileSync('migration/manifest-pretty.json', 'utf8'));
const src = f.readFileSync('astro/src/data/blogPosts.ts', 'utf8');
const slugs = new Set([...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));
console.log('ported slugs: ' + slugs.size);

const staticPages = {
  '/': 'index',
  '/about': 'about',
  '/blog': 'blog/index',
  '/contact': 'contact',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/support': 'support',
  '/docs': 'docs',
  '/ai-code-viewer-ai': 'ai-code-viewer-ai',
  '/apps': 'apps/index',
  '/apps/admin': 'apps/admin',
};

let ok = 0;
const missing = [];
for (const u of j.sitemap.included_paths) {
  const p = new URL(u).pathname;
  if (staticPages[p]) {
    if (f.existsSync('astro/src/pages/' + staticPages[p] + '.astro')) ok++;
    else missing.push(u);
  } else if (p.startsWith('/blog/')) {
    if (slugs.has(p.slice(6))) ok++;
    else missing.push(u);
  } else {
    missing.push(u + ' (no manifest route)');
  }
}
console.log(`sitemap URLs resolving to a built page: ${ok}/${j.sitemap.included_paths.length}`);
console.log('UNRESOLVED:');
missing.forEach((m) => console.log(' - ' + m));

// Internal-link check: every internal href must resolve to a built page or slug
const linkRe = /href="(\/[^"]*)"/g;
const known = new Set(Object.keys(staticPages));
function walk(dir) {
  return f.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = dir + '/' + e.name;
    return e.isDirectory() ? walk(p) : p.endsWith('.astro') ? [p] : [];
  });
}
const files = walk('astro/src');
const bad = [];
for (const file of files) {
  const content = f.readFileSync(file.trim(), 'utf8');
  for (const m of content.matchAll(linkRe)) {
    const href = m[1];
    const last = href.split('/').pop();
    if (last.includes('.')) continue; // static asset (e.g. /favicon.ico) served from public/
    if (href.startsWith('/blog/')) {
      // concrete slug link (`/blog/${post.slug}` template counts as slug-family)
      if (!slugs.has(href.slice(6)) && !href.includes('${')) bad.push(`${file} -> ${href}`);
    } else if (!known.has(href)) {
      bad.push(`${file} -> ${href}`);
    }
  }
}
console.log('internal links checked across ' + files.length + ' astro files');
console.log(bad.length ? 'BROKEN:\n' + bad.join('\n') : 'all internal hrefs resolve: OK');
