import fs from 'node:fs';
import path from 'node:path';
import { blogPosts } from '../src/data/blogPosts.ts';

const DIST_DIR = path.resolve('dist');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith('.html')) {
      results.push(path.relative(DIST_DIR, full).replace(/\\/g, '/'));
    }
  });
  return results;
}

const allHtml = walk(DIST_DIR);
console.log('Total HTML files in dist:', allHtml.length);

const legacySlugs = blogPosts.map(p => p.slug);
console.log('Original legacy articles in blogPosts.ts:', legacySlugs.length);

const generatedLegacyArticles = [];
const missingLegacyArticles = [];

for (const slug of legacySlugs) {
  const relPath = `blog/${slug}/index.html`;
  if (allHtml.includes(relPath)) {
    generatedLegacyArticles.push(slug);
  } else {
    missingLegacyArticles.push(slug);
  }
}

console.log('Generated Legacy Articles in dist/blog/:', generatedLegacyArticles.length);
if (missingLegacyArticles.length > 0) {
  console.log('Missing Legacy Articles:', missingLegacyArticles);
} else {
  console.log('✅ ALL 27 legacy articles are present in dist/blog/ !');
}

// Check new markdown articles
const newMarkdownSlugs = [
  'gb-coder-dual-engine-architecture',
  'client-side-pdf-manipulation-webassembly',
  'modern-web-image-compression-standards',
];

const LOCALES = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];

console.log('\n--- Multilingual Markdown Articles in dist ---');
for (const slug of newMarkdownSlugs) {
  const localizedFound = [];
  for (const loc of LOCALES) {
    const p = loc === 'en' ? `blog/${slug}/index.html` : `${loc}/blog/${slug}/index.html`;
    if (allHtml.includes(p)) {
      localizedFound.push(loc);
    }
  }
  console.log(`[${slug}]: found in ${localizedFound.length} locales:`, localizedFound);
}

// Categorize all 150 HTML files
const blogIndexHtml = allHtml.filter(p => p.match(/^([a-z]{2}\/)?blog\/index\.html$/));
const blogPostHtml = allHtml.filter(p => p.includes('blog/') && !p.endsWith('blog/index.html') && !p.match(/^blog\/[1-6]\//));
const blogRedirectHtml = allHtml.filter(p => p.match(/^blog\/[1-6]\//));
const nonBlogRedirectHtml = allHtml.filter(p => ['projects/index.html', 'file-sharing-platform/index.html', 'api-testing-platform/index.html', 'ai-code-viewer-ai/index.html', 'sitemap-pages.xml/index.html', 'sitemap-blog.xml/index.html'].includes(p));
const coreLocalizedHtml = allHtml.filter(p => !p.includes('blog/') && !p.startsWith('sitemap-') && p !== '404.html' && !nonBlogRedirectHtml.includes(p));

console.log('\n--- Full HTML Breakdown ---');
console.log(`Blog Indexes (9 locales):`, blogIndexHtml.length);
console.log(`Blog Article Pages (27 legacy + 3 EN pilots + 8 localized GB Coder = 38):`, blogPostHtml.length);
console.log(`Blog Numeric Redirects (/blog/1 through /blog/6):`, blogRedirectHtml.length);
console.log(`Other Static Redirects (projects, etc.):`, nonBlogRedirectHtml.length);
console.log(`Core Localized Pages (10 routes × 9 locales = 90):`, coreLocalizedHtml.length);
console.log(`404 Page:`, allHtml.includes('404.html') ? 1 : 0);
console.log(`Sum of breakdown:`, blogIndexHtml.length + blogPostHtml.length + blogRedirectHtml.length + nonBlogRedirectHtml.length + coreLocalizedHtml.length + 1);
