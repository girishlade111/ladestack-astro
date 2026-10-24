import fs from 'node:fs';
import path from 'node:path';

const testPages = [
  { path: 'dist/blog/machine-learning-pipelines-for-web-developers/index.html', lang: 'en', multilingual: true },
  { path: 'dist/ja/blog/machine-learning-pipelines-for-web-developers/index.html', lang: 'ja', multilingual: true },
  { path: 'dist/es/blog/machine-learning-pipelines-for-web-developers/index.html', lang: 'es', multilingual: true },
  { path: 'dist/blog/building-rag-applications-vector-databases/index.html', lang: 'en', multilingual: true },
  { path: 'dist/ja/blog/building-rag-applications-vector-databases/index.html', lang: 'ja', multilingual: true },
  { path: 'dist/es/blog/building-rag-applications-vector-databases/index.html', lang: 'es', multilingual: true },
  { path: 'dist/blog/generative-ai-for-content-creation/index.html', lang: 'en', multilingual: false },
  { path: 'dist/blog/fine-tuning-llms-domain-specific-tasks/index.html', lang: 'en', multilingual: false },
  { path: 'dist/blog/multi-tenant-saas-architecture-patterns/index.html', lang: 'en', multilingual: false }
];

let failed = 0;

for (const p of testPages) {
  if (!fs.existsSync(p.path)) {
    console.error(`❌ File not found: ${p.path}`);
    failed++;
    continue;
  }
  const html = fs.readFileSync(p.path, 'utf8');

  // Check html lang
  const langMatch = html.match(/<html[^>]*lang=["']([^"']+)["']/i);
  if (!langMatch || langMatch[1] !== p.lang) {
    console.error(`❌ Wrong html lang in ${p.path}: expected ${p.lang}, got ${langMatch ? langMatch[1] : 'none'}`);
    failed++;
  }

  // Check canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    console.error(`❌ Missing canonical in ${p.path}`);
    failed++;
  }

  // Check JSON-LD
  if (!html.includes('"@type":"BlogPosting"') && !html.includes('"@type": "BlogPosting"')) {
    console.error(`❌ Missing BlogPosting schema in ${p.path}`);
    failed++;
  }
  if (!html.includes('"@type":"BreadcrumbList"') && !html.includes('"@type": "BreadcrumbList"')) {
    console.error(`❌ Missing BreadcrumbList schema in ${p.path}`);
    failed++;
  }

  // Check hreflang tags
  const hreflangs = [...html.matchAll(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["']/gi)].map(m => m[1]);
  if (p.multilingual) {
    if (hreflangs.length !== 10) {
      console.error(`❌ Expected 10 hreflang tags in multilingual ${p.path}, got ${hreflangs.length}`);
      failed++;
    }
  } else {
    if (hreflangs.length !== 0) {
      console.error(`❌ Expected 0 hreflang tags in English-only ${p.path}, got ${hreflangs.length}`);
      failed++;
    }
  }

  console.log(`✅ PASS: ${p.path} (lang: ${p.lang}, canonical: ${canonicalMatch?.[1]}, hreflangs: ${hreflangs.length})`);
}

if (failed === 0) {
  console.log('🎉 ALL SEO METADATA CHECKS PASSED PERFECTLY!');
} else {
  console.error(`❌ ${failed} checks failed.`);
  process.exit(1);
}
