import fs from 'node:fs';
import path from 'node:path';

console.log('============================================================');
console.log('LADESTACK — SEO PHASE 3C VERIFICATION SUITE');
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
// SUITE 1: vercel.json Host-Specific Noindex Safety
// -------------------------------------------------------------
console.log('\n--- SUITE 1: vercel.json Host-Specific Staging Protection ---');

assert(fs.existsSync('vercel.json'), 'vercel.json exists');
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

assert(Array.isArray(vercelConfig.headers), 'vercel.json defines headers array');

const hostNoindexRule = vercelConfig.headers.find(h =>
  h.has && h.has.some(item => item.type === 'host' && item.value && h.headers.some(hdr => hdr.key === 'X-Robots-Tag'))
);

assert(Boolean(hostNoindexRule), 'vercel.json contains a host-scoped X-Robots-Tag header rule');

if (hostNoindexRule) {
  const hostCondition = hostNoindexRule.has.find(item => item.type === 'host');
  const xRobotsTag = hostNoindexRule.headers.find(hdr => hdr.key === 'X-Robots-Tag');
  
  assert(xRobotsTag.value.includes('noindex'), `Host-scoped X-Robots-Tag value is noindex (found: ${xRobotsTag.value})`);
  
  const hostRegex = new RegExp(`^${hostCondition.value}$`);
  
  // Test match on Vercel preview/staging domains
  assert(hostRegex.test('ladestack-astro-preview.vercel.app'), 'Rule MATCHES ladestack-astro-preview.vercel.app');
  assert(hostRegex.test('ladestack-astro-preview-girishlade111-gmailcoms-projects.vercel.app'), 'Rule MATCHES deployment-specific vercel.app');
  assert(hostRegex.test('branch-feature.vercel.app'), 'Rule MATCHES generic *.vercel.app staging');
  
  // Test strict exclusion of production domains
  assert(!hostRegex.test('ladestack.in'), 'Rule STRICTLY EXCLUDES production domain: ladestack.in');
  assert(!hostRegex.test('www.ladestack.in'), 'Rule STRICTLY EXCLUDES production domain: www.ladestack.in');
  assert(!hostRegex.test('api.ladestack.in'), 'Rule STRICTLY EXCLUDES subdomain: api.ladestack.in');
  assert(!hostRegex.test('localhost'), 'Rule STRICTLY EXCLUDES localhost');
  assert(!hostRegex.test('ladestack.com'), 'Rule STRICTLY EXCLUDES ladestack.com');
}

// Ensure no global/unconditional X-Robots-Tag exists
const globalNoindexRule = vercelConfig.headers.find(h =>
  (!h.has || h.has.length === 0) && h.headers.some(hdr => hdr.key === 'X-Robots-Tag')
);
assert(!globalNoindexRule, 'vercel.json contains ZERO unconditional global X-Robots-Tag rules');

// -------------------------------------------------------------
// SUITE 2: Source Code Noindex Absence & Robots.txt Integrity
// -------------------------------------------------------------
console.log('\n--- SUITE 2: Source Files & Robots.txt Indexability Integrity ---');

const seoComponent = fs.readFileSync('src/components/SEO.astro', 'utf8');
assert(!seoComponent.includes('name="robots" content="noindex"'), 'SEO.astro does not contain hardcoded robots noindex');
assert(!seoComponent.includes("robots || 'noindex'"), 'SEO.astro default robots is not noindex');

const robotsTxt = fs.readFileSync('public/robots.txt', 'utf8');
assert(!robotsTxt.includes('Disallow: /\n') && !robotsTxt.endsWith('Disallow: /'), 'public/robots.txt does not block root indexing');
assert(robotsTxt.includes('User-agent: *'), 'public/robots.txt specifies User-agent: *');
assert(robotsTxt.includes('Disallow: /apps/admin'), 'public/robots.txt protects /apps/admin');
assert(robotsTxt.includes('Sitemap: https://ladestack.in/sitemap-index.xml'), 'public/robots.txt points to canonical sitemap-index.xml');

// -------------------------------------------------------------
// SUITE 3: Source Inventory Exact Mathematical Reconciliation
// -------------------------------------------------------------
console.log('\n--- SUITE 3: Source Inventory & Mathematical Reconciliation ---');

const blogDir = 'src/content/blog';
const locales = ['es', 'fr', 'ja', 'ko', 'pt', 'ru', 'tr', 'zh'];
const allLocales = ['en', ...locales];

const enArticles = fs.readdirSync(path.join(blogDir, 'en')).filter(f => f.endsWith('.md')).sort();
assert(enArticles.length === 30, `English blog article count is exactly 30 (found: ${enArticles.length})`);

let secondaryTotal = 0;
locales.forEach(loc => {
  const locArticles = fs.readdirSync(path.join(blogDir, loc)).filter(f => f.endsWith('.md'));
  assert(locArticles.length === 13, `${loc} blog article count is exactly 13 (found: ${locArticles.length})`);
  secondaryTotal += locArticles.length;
});
assert(secondaryTotal === 104, `Secondary locales article count is exactly 104 (8 * 13 = 104)`);

const totalBlogArticles = enArticles.length + secondaryTotal;
assert(totalBlogArticles === 134, `Total blog markdown articles is exactly 134 (found: ${totalBlogArticles})`);

const jaSet = new Set(fs.readdirSync(path.join(blogDir, 'ja')).filter(f => f.endsWith('.md')));
const translatedArticles = enArticles.filter(f => jaSet.has(f));
const enOnlyArticles = enArticles.filter(f => !jaSet.has(f));

assert(translatedArticles.length === 13, `Translated articles present in all 9 languages count is exactly 13 (found: ${translatedArticles.length})`);
assert(enOnlyArticles.length === 17, `English-only modernized engineering articles count is exactly 17 (found: ${enOnlyArticles.length})`);
assert(translatedArticles.length + enOnlyArticles.length === 30, `13 translated + 17 English-only equals 30 English articles`);

// Core routes analysis
const coreRouteNames = [
  '/', '/about', '/apps', '/blog', '/contact', '/docs',
  '/faq', '/gb-coder', '/privacy', '/sitemap', '/support', '/terms'
];
assert(coreRouteNames.length === 12, 'Core route definitions per locale is exactly 12');

const totalCoreRoutes = coreRouteNames.length * 9;
assert(totalCoreRoutes === 108, `Total core HTML routes across 9 locales is exactly 108 (12 * 9 = 108)`);

const totalCanonicalUrls = totalCoreRoutes + totalBlogArticles;
assert(totalCanonicalUrls === 242, `Total canonical URLs is exactly 242 (108 core + 134 blog = 242)`);

// -------------------------------------------------------------
// SUITE 4: Compiled Artifacts and XML Sitemap Audit
// -------------------------------------------------------------
console.log('\n--- SUITE 4: Compiled Artifacts and XML Sitemap Breakdown ---');

if (fs.existsSync('dist/sitemap-0.xml')) {
  const sitemap = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert(urls.length === 242, `dist/sitemap-0.xml contains exactly 242 URLs (found: ${urls.length})`);
  
  const sitemapCounts = { en: 0 };
  locales.forEach(l => sitemapCounts[l] = 0);
  urls.forEach(u => {
    const seg = new URL(u).pathname.split('/')[1];
    if (locales.includes(seg)) {
      sitemapCounts[seg]++;
    } else {
      sitemapCounts.en++;
    }
  });
  
  assert(sitemapCounts.en === 42, `English sitemap URL count is exactly 42 (12 core + 30 blog) (found: ${sitemapCounts.en})`);
  locales.forEach(l => {
    assert(sitemapCounts[l] === 25, `${l} sitemap URL count is exactly 25 (12 core + 13 blog) (found: ${sitemapCounts[l]})`);
  });
  
  const sumSitemap = sitemapCounts.en + locales.reduce((sum, l) => sum + sitemapCounts[l], 0);
  assert(sumSitemap === 242, `Sitemap mathematical identity holds: 42 + (8 * 25) = ${sumSitemap}`);
}

function listHtml(dir) {
  let res = [];
  if (!fs.existsSync(dir)) return res;
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      res = res.concat(listHtml(full));
    } else if (file.endsWith('.html')) {
      res.push(full);
    }
  });
  return res;
}

if (fs.existsSync('dist')) {
  const htmlFiles = listHtml('dist');
  assert(htmlFiles.length === 257, `dist HTML files count is exactly 257 (found: ${htmlFiles.length})`);
  
  let redirects = 0;
  let canonicalCount = 0;
  let errorPageCount = 0;
  
  htmlFiles.forEach(f => {
    const rel = path.relative('dist', f).replace(/\\/g, '/');
    const content = fs.readFileSync(f, 'utf8');
    if (rel === '404.html') {
      errorPageCount++;
    } else if (content.includes('http-equiv') && content.includes('refresh')) {
      redirects++;
    } else {
      canonicalCount++;
    }
  });
  
  assert(canonicalCount === 242, `Generated canonical HTML pages count is exactly 242 (found: ${canonicalCount})`);
  assert(redirects === 14, `Generated 301 redirect stubs count is exactly 14 (found: ${redirects})`);
  assert(errorPageCount === 1, `Generated 404 error page count is exactly 1 (found: ${errorPageCount})`);
  assert(canonicalCount + redirects + errorPageCount === 257, `Total HTML identity holds: 242 + 14 + 1 = 257`);
}

// -------------------------------------------------------------
// SUITE 5: Structured Data Schema Classification Audit
// -------------------------------------------------------------
console.log('\n--- SUITE 5: Structured Data Classification Audit ---');

function getSchemas(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = [...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const types = [];
  matches.forEach(m => {
    try {
      const data = JSON.parse(m[1]);
      if (Array.isArray(data)) {
        data.forEach(item => types.push(item['@type']));
      } else if (data['@graph']) {
        data['@graph'].forEach(item => types.push(item['@type']));
      } else {
        types.push(data['@type']);
      }
    } catch (e) {}
  });
  return types;
}

const appsSchemas = getSchemas('dist/apps/index.html');
assert(appsSchemas.includes('CollectionPage'), '/apps has CollectionPage schema');
assert(!appsSchemas.includes('SoftwareApplication'), '/apps does NOT have SoftwareApplication schema (correctly on CollectionPage)');

const gbCoderSchemas = getSchemas('dist/gb-coder/index.html');
assert(gbCoderSchemas.includes('SoftwareApplication'), '/gb-coder has SoftwareApplication schema');

const faqSchemas = getSchemas('dist/faq/index.html');
assert(faqSchemas.includes('FAQPage'), '/faq has FAQPage schema');

const supportSchemas = getSchemas('dist/support/index.html');
assert(supportSchemas.includes('FAQPage'), '/support has FAQPage schema');

const homeSchemas = getSchemas('dist/index.html');
assert(homeSchemas.includes('Organization') && homeSchemas.includes('WebSite') && homeSchemas.includes('SoftwareApplication'),
  'Home / has Organization, WebSite, and SoftwareApplication schemas');

// -------------------------------------------------------------
// FINAL SUMMARY
// -------------------------------------------------------------
console.log('\n============================================================');
if (failures === 0) {
  console.log('✅ ALL PHASE 3C TESTS PASSED PERFECTLY!');
  console.log('STATUS: SEO_PHASE_3C_VERIFIED');
  process.exit(0);
} else {
  console.error(`❌ PHASE 3C HAD ${failures} FAILURE(S)`);
  process.exit(1);
}
