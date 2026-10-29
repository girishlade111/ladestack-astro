import fs from 'node:fs';
import path from 'node:path';

console.log('============================================================');
console.log('LADESTACK — SEO PHASE 2C VERIFICATION SUITE');
console.log('============================================================');

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failures++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// -------------------------------------------------------------
// SUITE 1: Source BaseLayout.astro Font Delivery Audit
// -------------------------------------------------------------
console.log('\n--- SUITE 1: BaseLayout.astro Typography Delivery ---');
const baseLayout = fs.readFileSync('src/layouts/BaseLayout.astro', 'utf8');

assert(
  baseLayout.includes('<link rel="preconnect" href="https://fonts.googleapis.com" />'),
  'BaseLayout.astro has preconnect to https://fonts.googleapis.com'
);
assert(
  baseLayout.includes('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />'),
  'BaseLayout.astro has preconnect to https://fonts.gstatic.com with crossorigin'
);
assert(
  baseLayout.includes('rel="preload"') &&
    baseLayout.includes('href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600;700&display=swap"'),
  'BaseLayout.astro preloads streamlined Geist + Geist Mono font stylesheet'
);
assert(
  baseLayout.includes('media="print"') &&
    baseLayout.includes("this.media='all'"),
  'BaseLayout.astro loads font stylesheet asynchronously without blocking initial render'
);
assert(
  baseLayout.includes('<noscript>') &&
    baseLayout.includes('family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600;700'),
  'BaseLayout.astro provides noscript fallback for font stylesheet'
);
assert(
  !baseLayout.includes('Plus+Jakarta+Sans'),
  'BaseLayout.astro does NOT request unused Plus Jakarta Sans'
);
assert(
  !baseLayout.includes('JetBrains+Mono'),
  'BaseLayout.astro does NOT request unused JetBrains Mono'
);
assert(
  !baseLayout.includes('Geist:wght@300'),
  'BaseLayout.astro does NOT request unused Geist 300 weight'
);

// -------------------------------------------------------------
// SUITE 2: Compiled dist/ HTML Font Audit Across Locales
// -------------------------------------------------------------
console.log('\n--- SUITE 2: Compiled dist/ HTML Artifacts Font Delivery ---');
const samplePages = [
  'dist/index.html',
  'dist/apps/index.html',
  'dist/gb-coder/index.html',
  'dist/blog/index.html',
  'dist/ja/index.html',
  'dist/zh/blog/index.html',
  'dist/ko/gb-coder/index.html',
  'dist/fr/faq/index.html',
  'dist/es/about/index.html',
  'dist/blog/client-side-pdf-manipulation-webassembly/index.html',
];

for (const p of samplePages) {
  assert(fs.existsSync(p), `Generated page exists: ${p}`);
  if (fs.existsSync(p)) {
    const html = fs.readFileSync(p, 'utf8');
    assert(
      html.includes('family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600;700'),
      `${p} contains streamlined Geist + Geist Mono font links`
    );
    assert(
      !html.includes('Plus+Jakarta+Sans'),
      `${p} has zero occurrences of Plus Jakarta Sans`
    );
    assert(
      !html.includes('JetBrains+Mono'),
      `${p} has zero occurrences of JetBrains Mono`
    );
    assert(
      html.includes('<noscript>'),
      `${p} contains noscript fallback for font delivery`
    );
  }
}

// -------------------------------------------------------------
// SUITE 3: Robots.txt & Crawler Readiness Audit
// -------------------------------------------------------------
console.log('\n--- SUITE 3: Robots.txt & Crawler Readiness Audit ---');
assert(fs.existsSync('public/robots.txt'), 'public/robots.txt exists');
assert(fs.existsSync('dist/robots.txt'), 'dist/robots.txt exists');

const robotsTxt = fs.readFileSync('dist/robots.txt', 'utf8');
assert(robotsTxt.includes('User-agent: *'), 'robots.txt includes wildcard User-agent: *');
assert(robotsTxt.includes('Disallow: /apps/admin'), 'robots.txt protects /apps/admin');
assert(robotsTxt.includes('Sitemap: https://ladestack.in/sitemap-index.xml'), 'robots.txt references sitemap-index.xml');
assert(!robotsTxt.includes('Disallow: /blog'), 'robots.txt allows crawler indexing of blog articles');
assert(!robotsTxt.includes('Disallow: /apps\n') && !robotsTxt.includes('Disallow: /apps\r\n'), 'robots.txt allows crawler access to public apps showcase');

// -------------------------------------------------------------
// SUITE 4: Sitemap & Total Artifact Integrity
// -------------------------------------------------------------
console.log('\n--- SUITE 4: Sitemap & Artifact Baseline Count ---');
function countFiles(dir, ext) {
  let count = 0;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      count += countFiles(full, ext);
    } else if (full.endsWith(ext)) {
      count++;
    }
  }
  return count;
}

const totalHtml = countFiles('dist', '.html');
assert(totalHtml === 257, `Generated HTML count is exactly 257 (242 canonical + 14 redirects + 1 404) (found: ${totalHtml})`);

const sitemapIndex = fs.readFileSync('dist/sitemap-index.xml', 'utf8');
assert(sitemapIndex.includes('sitemap-0.xml'), 'dist/sitemap-index.xml points to sitemap-0.xml');

const sitemap0 = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
const locMatches = sitemap0.match(/<loc>/g) || [];
assert(locMatches.length === 242, `Sitemap-0 contains exactly 242 canonical URLs (found: ${locMatches.length})`);

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n============================================================');
if (failures === 0) {
  console.log('✅ ALL PHASE 2C TESTS PASSED PERFECTLY!');
  console.log('============================================================');
  process.exit(0);
} else {
  console.error(`❌ ${failures} TEST(S) FAILED IN PHASE 2C!`);
  console.log('============================================================');
  process.exit(1);
}

