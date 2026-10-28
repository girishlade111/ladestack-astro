import fs from 'node:fs';
import path from 'node:path';

console.log('============================================================');
console.log('LADESTACK — SEO PHASE 2B VERIFICATION SUITE');
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

function extractMeta(html, name, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  const doubleRegex = new RegExp(`<meta\\s+${attr}="${name}"\\s+content="([^"]*)"`, 'i');
  const singleRegex = new RegExp(`<meta\\s+${attr}='${name}'\\s+content='([^']*)'`, 'i');
  const doubleAltRegex = new RegExp(`<meta\\s+content="([^"]*)"\\s+${attr}="${name}"`, 'i');
  const singleAltRegex = new RegExp(`<meta\\s+content='([^']*)'\\s+${attr}='${name}'`, 'i');

  const m1 = html.match(doubleRegex);
  if (m1) return m1[1];
  const m2 = html.match(singleRegex);
  if (m2) return m2[1];
  const m3 = html.match(doubleAltRegex);
  if (m3) return m3[1];
  const m4 = html.match(singleAltRegex);
  if (m4) return m4[1];
  return null;
}

// -------------------------------------------------------------
// SUITE 1: SEO.astro Effective Description Logic Unit Audit
// -------------------------------------------------------------
console.log('\n--- SUITE 1: SEO.astro Effective Description Logic ---');
const seoContent = fs.readFileSync('src/components/SEO.astro', 'utf8');

assert(
  seoContent.includes('const effectiveOgDescription = openGraph.description ?? description;'),
  'SEO.astro defines effectiveOgDescription prioritizing openGraph.description over base description'
);
assert(
  seoContent.includes('const effectiveTwitterDescription = twitter.description ?? openGraph.description ?? description;'),
  'SEO.astro defines effectiveTwitterDescription prioritizing twitter.description then openGraph.description then base description'
);
assert(
  seoContent.includes('{effectiveOgDescription && <meta property="og:description" content={effectiveOgDescription} />}'),
  'SEO.astro renders og:description based on effectiveOgDescription without requiring base description'
);
assert(
  seoContent.includes('{effectiveTwitterDescription && <meta name="twitter:description" content={effectiveTwitterDescription} />}'),
  'SEO.astro renders twitter:description based on effectiveTwitterDescription without requiring base description'
);

// -------------------------------------------------------------
// SUITE 2: All 242 Indexable Pages On-Page Metadata Integrity
// -------------------------------------------------------------
console.log('\n--- SUITE 2: Sitewide Indexable HTML Pages Metadata Audit ---');

function walk(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      files = files.concat(walk(full));
    } else if (full.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const allHtml = walk('dist');
let indexableCount = 0;
let redirectCount = 0;
let missingTitles = 0;
let missingDescriptions = 0;
let missingOgDescriptions = 0;
let missingTwitterDescriptions = 0;
let duplicateOgDescriptions = 0;
let emptyMetaContent = 0;

for (const file of allHtml) {
  const rel = path.relative('dist', file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');

  if (html.includes('http-equiv="refresh"')) {
    redirectCount++;
    continue;
  }
  if (rel === '404.html') continue;

  indexableCount++;

  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;
  if (!title) missingTitles++;

  const desc = extractMeta(html, 'description');
  if (!desc) missingDescriptions++;

  const ogDesc = extractMeta(html, 'og:description', true);
  if (!ogDesc) missingOgDescriptions++;

  const twitterDesc = extractMeta(html, 'twitter:description');
  if (!twitterDesc) missingTwitterDescriptions++;

  // Check duplicate tags
  const ogDescMatches = html.match(/property=["']og:description["']/gi);
  if (ogDescMatches && ogDescMatches.length > 1) duplicateOgDescriptions++;

  // Check empty content="" tags
  if (html.match(/<meta[^>]+content=["']\s*["'][^>]*>/i)) emptyMetaContent++;
}

assert(indexableCount === 242, `Exactly 242 canonical indexable pages audited (found ${indexableCount})`);
assert(redirectCount === 12, `Exactly 12 redirect stubs audited (found ${redirectCount})`);
assert(missingTitles === 0, `All indexable pages have non-empty <title> tags (missing: ${missingTitles})`);
assert(missingDescriptions === 0, `All indexable pages have non-empty meta descriptions (missing: ${missingDescriptions})`);
assert(missingOgDescriptions === 0, `All indexable pages have non-empty og:description tags (missing: ${missingOgDescriptions})`);
assert(missingTwitterDescriptions === 0, `All indexable pages have non-empty twitter:description tags (missing: ${missingTwitterDescriptions})`);
assert(duplicateOgDescriptions === 0, `Zero duplicate og:description tags detected (found ${duplicateOgDescriptions})`);
assert(emptyMetaContent === 0, `Zero empty content="" meta tags detected (found ${emptyMetaContent})`);

// -------------------------------------------------------------
// SUITE 3: Nine-Language Metadata Consistency & og:locale
// -------------------------------------------------------------
console.log('\n--- SUITE 3: Nine-Language Metadata & og:locale Audit ---');

const expectedOgLocales = {
  en: 'en_US',
  ja: 'ja_JP',
  ko: 'ko_KR',
  zh: 'zh_CN',
  ru: 'ru_RU',
  tr: 'tr_TR',
  fr: 'fr_FR',
  pt: 'pt_PT',
  es: 'es_ES',
};

let ogLocaleMismatches = 0;
for (const [loc, expectedOg] of Object.entries(expectedOgLocales)) {
  const testFile = loc === 'en' ? 'dist/about/index.html' : `dist/${loc}/about/index.html`;
  const html = fs.readFileSync(testFile, 'utf8');
  const actualOg = extractMeta(html, 'og:locale', true);
  if (actualOg !== expectedOg) {
    ogLocaleMismatches++;
    console.error(`Locale ${loc} og:locale mismatch: expected ${expectedOg}, got ${actualOg}`);
  }
}
assert(ogLocaleMismatches === 0, 'All 9 locales emit their exact standard og:locale tags');

// -------------------------------------------------------------
// SUITE 4: Structured Data Preservation Audit
// -------------------------------------------------------------
console.log('\n--- SUITE 4: Structured Data Preservation Audit ---');

const faqHtml = fs.readFileSync('dist/faq/index.html', 'utf8');
assert(faqHtml.includes('"@type":"FAQPage"') || faqHtml.includes('"@type": "FAQPage"'), 'FAQPage schema preserved on /faq');

const gbHtml = fs.readFileSync('dist/gb-coder/index.html', 'utf8');
assert(gbHtml.includes('"@type":"SoftwareApplication"') || gbHtml.includes('"@type": "SoftwareApplication"'), 'SoftwareApplication schema preserved on /gb-coder');

const homeHtml = fs.readFileSync('dist/index.html', 'utf8');
assert(homeHtml.includes('"name":"LadeStack"'), 'Organization brand name "LadeStack" preserved on homepage');
assert(homeHtml.includes('https://www.linkedin.com/in/girish-lade/'), 'Founder LinkedIn destination preserved on homepage');

// -------------------------------------------------------------
// SUITE 5: Social Raster Images & SVG Hero Preservation
// -------------------------------------------------------------
console.log('\n--- SUITE 5: Social Raster Images & SVG Hero Preservation ---');

const sampleBlogHtml = fs.readFileSync('dist/blog/client-side-pdf-manipulation-webassembly/index.html', 'utf8');
const blogOgImage = extractMeta(sampleBlogHtml, 'og:image', true);
const blogTwitterImage = extractMeta(sampleBlogHtml, 'twitter:image');
const heroImgMatch = sampleBlogHtml.match(/<img[^>]+src=["']([^"']+)["'][^>]*class=["'][^"']*object-cover[^"']*["']/i);

assert(blogOgImage === 'https://ladestack.in/blog-covers/pdf-wasm-processing.png', `Blog og:image points to raster PNG (${blogOgImage})`);
assert(blogTwitterImage === 'https://ladestack.in/blog-covers/pdf-wasm-processing.png', `Blog twitter:image points to raster PNG (${blogTwitterImage})`);
assert(heroImgMatch && heroImgMatch[1] === '/blog-covers/pdf-wasm-processing.svg', `Visible article hero retains original vector SVG (${heroImgMatch ? heroImgMatch[1] : 'NONE'})`);

// -------------------------------------------------------------
// Verdict
// -------------------------------------------------------------
console.log('\n============================================================');
if (failures === 0) {
  console.log('🎉 ALL PHASE 2B VERIFICATION SUITE ASSERTIONS PASSED!');
  console.log('STATUS: SEO_PHASE_2B_VERIFIED');
  process.exit(0);
} else {
  console.error(`❌ FAILED with ${failures} assertion failures.`);
  process.exit(1);
}
