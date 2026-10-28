import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { chromium } from 'playwright';

console.log('============================================================');
console.log('LADESTACK — SEO PHASE 2A AUTOMATED VERIFICATION SUITE');
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
// SUITE 1: Blog Articles OG/Twitter Raster Image Audit
// -------------------------------------------------------------
console.log('\n--- SUITE 1: Blog Articles Social Image Metadata Audit ---');

const locales = ['en', 'es', 'fr', 'ja', 'ko', 'pt', 'ru', 'tr', 'zh'];
const distDir = 'dist';

let totalBlogPostsAudited = 0;
let ogImageSvgLeaks = 0;
let twitterImageSvgLeaks = 0;
let missingPngFiles = 0;
let visibleCoverSvgVerified = 0;
let visibleCoverSvgMismatches = 0;
let dimensionsMismatch = 0;

function checkHtmlFile(filePath, isBlogArticle = true) {
  const html = fs.readFileSync(filePath, 'utf8');

  // Skip redirect stubs
  if (html.includes('http-equiv="refresh"')) return;

  // Extract og:image
  const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  const ogWidthMatch = html.match(/<meta\s+property=["']og:image:width["']\s+content=["']([^"']+)["']/i);
  const ogHeightMatch = html.match(/<meta\s+property=["']og:image:height["']\s+content=["']([^"']+)["']/i);
  const ogAltMatch = html.match(/<meta\s+property=["']og:image:alt["']\s+content=["']([^"']+)["']/i);

  // Extract twitter:image
  const twitterImageMatch = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
  const twitterCardMatch = html.match(/<meta\s+name=["']twitter:card["']\s+content=["']([^"']+)["']/i);

  if (isBlogArticle) {
    totalBlogPostsAudited++;

    const ogImage = ogImageMatch ? ogImageMatch[1] : null;
    const twitterImage = twitterImageMatch ? twitterImageMatch[1] : null;
    const ogWidth = ogWidthMatch ? ogWidthMatch[1] : null;
    const ogHeight = ogHeightMatch ? ogHeightMatch[1] : null;
    const twitterCard = twitterCardMatch ? twitterCardMatch[1] : null;

    if (!ogImage || ogImage.endsWith('.svg')) {
      ogImageSvgLeaks++;
      console.error(`  SVG or missing og:image in ${filePath}: ${ogImage}`);
    }

    if (!twitterImage || twitterImage.endsWith('.svg')) {
      twitterImageSvgLeaks++;
      console.error(`  SVG or missing twitter:image in ${filePath}: ${twitterImage}`);
    }

    if (ogWidth !== '1200' || ogHeight !== '630') {
      dimensionsMismatch++;
      console.error(`  Dimensions mismatch in ${filePath}: ${ogWidth}x${ogHeight}`);
    }

    // Verify PNG file physically exists in dist/
    if (ogImage) {
      const urlPath = ogImage.replace(/^https:\/\/ladestack\.in/, '');
      const localFile = path.join(distDir, urlPath.startsWith('/') ? urlPath.slice(1) : urlPath);
      if (!fs.existsSync(localFile)) {
        missingPngFiles++;
        console.error(`  Physical PNG not found in dist for ${filePath}: ${localFile}`);
      }
    }

    // Verify article-visible hero image is still SVG
    const heroImgMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*class=["'][^"']*object-cover[^"']*["']/i);
    if (heroImgMatch) {
      const heroSrc = heroImgMatch[1];
      if (heroSrc.endsWith('.svg')) {
        visibleCoverSvgVerified++;
      } else {
        visibleCoverSvgMismatches++;
        console.error(`  Hero image is not SVG in ${filePath}: ${heroSrc}`);
      }
    }
  }
}

// 1. Audit English blog posts
const enBlogDir = path.join(distDir, 'blog');
if (fs.existsSync(enBlogDir)) {
  for (const item of fs.readdirSync(enBlogDir)) {
    const itemPath = path.join(enBlogDir, item);
    if (fs.statSync(itemPath).isDirectory() && !item.match(/^\d+$/)) {
      const indexPath = path.join(itemPath, 'index.html');
      if (fs.existsSync(indexPath)) checkHtmlFile(indexPath, true);
    }
  }
}

// 2. Audit translated blog posts across 8 locales
for (const loc of locales) {
  if (loc === 'en') continue;
  const locBlogDir = path.join(distDir, loc, 'blog');
  if (fs.existsSync(locBlogDir)) {
    for (const item of fs.readdirSync(locBlogDir)) {
      const itemPath = path.join(locBlogDir, item);
      if (fs.statSync(itemPath).isDirectory()) {
        const indexPath = path.join(itemPath, 'index.html');
        if (fs.existsSync(indexPath)) checkHtmlFile(indexPath, true);
      }
    }
  }
}

assert(totalBlogPostsAudited === 134, `Expected exactly 134 blog articles audited, found ${totalBlogPostsAudited}`);
assert(ogImageSvgLeaks === 0, `Zero SVG og:image leaks across all blog articles (found ${ogImageSvgLeaks})`);
assert(twitterImageSvgLeaks === 0, `Zero SVG twitter:image leaks across all blog articles (found ${twitterImageSvgLeaks})`);
assert(missingPngFiles === 0, `All social PNG images physically present in dist/ (missing: ${missingPngFiles})`);
assert(dimensionsMismatch === 0, `All og:image:width=1200 and og:image:height=630 confirmed (mismatches: ${dimensionsMismatch})`);
assert(visibleCoverSvgVerified === 134, `All 134 blog articles preserve original SVG hero image in visible layout (verified: ${visibleCoverSvgVerified})`);
assert(visibleCoverSvgMismatches === 0, `Zero visible cover regressions to non-SVG (mismatches: ${visibleCoverSvgMismatches})`);

// -------------------------------------------------------------
// SUITE 2: Raster Asset Integrity Audit
// -------------------------------------------------------------
console.log('\n--- SUITE 2: Raster Social Asset Integrity & Metadata Audit ---');

const coversDir = path.join(distDir, 'blog-covers');
const pngFiles = fs.readdirSync(coversDir).filter(f => f.endsWith('.png'));

assert(pngFiles.length >= 19, `At least 19 unique PNG cover cards present in dist/blog-covers/ (found ${pngFiles.length})`);

let invalidImageFiles = 0;
for (const pngFile of pngFiles) {
  const filePath = path.join(coversDir, pngFile);
  const buf = fs.readFileSync(filePath);
  
  // Check PNG magic bytes: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
  const isPngMagic = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47;
  if (!isPngMagic) {
    invalidImageFiles++;
    console.error(`Invalid PNG signature: ${pngFile}`);
  }

  const meta = await sharp(buf).metadata();
  if (meta.width !== 1200 || meta.height !== 630 || meta.format !== 'png') {
    invalidImageFiles++;
    console.error(`Corrupt or wrong dimensions for ${pngFile}: ${meta.width}x${meta.height}, format ${meta.format}`);
  }
}

assert(invalidImageFiles === 0, `All ${pngFiles.length} generated PNG social cards are valid 1200x630 PNG images`);

// -------------------------------------------------------------
// SUITE 3: Non-Blog Page Social Image Stability
// -------------------------------------------------------------
console.log('\n--- SUITE 3: Sitewide Non-Blog Social Metadata Stability ---');

const corePages = ['about', 'faq', 'apps', 'docs', 'contact', 'support', 'privacy', 'terms', 'gb-coder'];
let nonBlogOgImageValid = 0;

for (const p of corePages) {
  const pagePath = path.join(distDir, p, 'index.html');
  if (fs.existsSync(pagePath)) {
    const html = fs.readFileSync(pagePath, 'utf8');
    const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    if (ogMatch && ogMatch[1].endsWith('.png')) {
      nonBlogOgImageValid++;
    } else {
      console.error(`Non-blog page ${p} missing PNG og:image: ${ogMatch ? ogMatch[1] : 'NONE'}`);
    }
  }
}

assert(nonBlogOgImageValid === corePages.length, `All ${corePages.length} core non-blog pages use valid PNG og:image`);

// -------------------------------------------------------------
// SUITE 4: Browser QA with Playwright
// -------------------------------------------------------------
console.log('\n--- SUITE 4: Browser Headless Visual and DOM QA ---');

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

// Test representative English blog article
const enSample = path.resolve('dist/blog/client-side-pdf-manipulation-webassembly/index.html');
await page.goto(`file:///${enSample.replace(/\\/g, '/')}`);

const enOgImage = await page.$eval('meta[property="og:image"]', el => el.getAttribute('content'));
const enOgWidth = await page.$eval('meta[property="og:image:width"]', el => el.getAttribute('content'));
const enTwitterImage = await page.$eval('meta[name="twitter:image"]', el => el.getAttribute('content'));
const enVisibleHeroSrc = await page.$eval('img[alt*="PDF"]', el => el.getAttribute('src'));

assert(enOgImage === 'https://ladestack.in/blog-covers/pdf-wasm-processing.png', `EN Blog og:image is ${enOgImage}`);
assert(enOgWidth === '1200', `EN Blog og:image:width is 1200`);
assert(enTwitterImage === 'https://ladestack.in/blog-covers/pdf-wasm-processing.png', `EN Blog twitter:image is ${enTwitterImage}`);
assert(enVisibleHeroSrc === '/blog-covers/pdf-wasm-processing.svg', `EN Visible hero preserves original SVG: ${enVisibleHeroSrc}`);

// Test representative Japanese blog article
const jaSample = path.resolve('dist/ja/blog/client-side-pdf-manipulation-webassembly/index.html');
await page.goto(`file:///${jaSample.replace(/\\/g, '/')}`);

const jaOgImage = await page.$eval('meta[property="og:image"]', el => el.getAttribute('content'));
const jaVisibleHeroSrc = await page.$eval('img[alt*="PDF"]', el => el.getAttribute('src'));

assert(jaOgImage === 'https://ladestack.in/blog-covers/pdf-wasm-processing.png', `JA Blog og:image is ${jaOgImage}`);
assert(jaVisibleHeroSrc === '/blog-covers/pdf-wasm-processing.svg', `JA Visible hero preserves original SVG: ${jaVisibleHeroSrc}`);

await browser.close();

// -------------------------------------------------------------
// Final Verdict
// -------------------------------------------------------------
console.log('\n============================================================');
if (failures === 0) {
  console.log('🎉 ALL PHASE 2A SOCIAL IMAGE VERIFICATION SUITE ASSERTIONS PASSED!');
  console.log('STATUS: SEO_PHASE_2A_VERIFIED');
  process.exit(0);
} else {
  console.error(`❌ SUITE FAILED with ${failures} assertion failures.`);
  process.exit(1);
}
