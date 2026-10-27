import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');
const BASE_URL = 'https://ladestack.in';
const LOCALES = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];

// Helper to find all html files
function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getHtmlFiles(DIST_DIR);
console.log(`Discovered ${allFiles.length} HTML files in dist/`);

const results = {
  totalFiles: allFiles.length,
  redirectStubs: [],
  contentPages: [],
  seo: {
    missingTitle: [],
    duplicateTitles: {},
    shortTitles: [],
    longTitles: [],
    missingDescription: [],
    duplicateDescriptions: {},
    shortDescriptions: [],
    longDescriptions: [],
    missingH1: [],
    multipleH1: [],
    emptyH1: [],
    headingSkips: [],
    missingCanonical: [],
    invalidCanonicalHost: [],
    canonicalPathMismatch: [],
    canonicalTrailingSlashError: [],
    missingLang: [],
    langMismatch: [],
    inadvertentNoindex: [],
    redirectMissingNoindex: [],
    missingOgTitle: [],
    missingOgDescription: [],
    missingOgImage: [],
    brokenOgImage: [],
    missingTwitterCard: [],
  },
  structuredData: {
    pagesWithSchema: 0,
    schemaTypes: {},
    syntaxErrors: [],
    schemaDefects: [],
  },
  links: {
    brokenInternalLinks: [],
    brokenInternalAnchors: [],
    targetBlankWithoutNoopener: [],
    trailingSlashInInternalLinks: [],
  },
  images: {
    missingAlt: [],
    missingDimensions: [],
    brokenImages: [],
  },
  accessibility: {
    missingMainLandmark: [],
    missingSkipLink: [],
    emptyButtons: [],
    genericLinkText: [],
  },
  security: {
    mixedContent: [],
    externalScripts: [],
    secretsFound: [],
  }
};

for (const filePath of allFiles) {
  const relPath = path.relative(DIST_DIR, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf-8');

  // Check if redirect stub
  const isRedirect = content.includes('http-equiv="refresh"');
  if (isRedirect) {
    results.redirectStubs.push(relPath);
    if (!content.includes('content="noindex"')) {
      results.seo.redirectMissingNoindex.push(relPath);
    }
    continue;
  }

  results.contentPages.push(relPath);

  // --- Title ---
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    results.seo.missingTitle.push(relPath);
  } else {
    const title = titleMatch[1].trim();
    if (title.length < 15) results.seo.shortTitles.push({ relPath, title, len: title.length });
    if (title.length > 70) results.seo.longTitles.push({ relPath, title, len: title.length });
    results.seo.duplicateTitles[title] = results.seo.duplicateTitles[title] || [];
    results.seo.duplicateTitles[title].push(relPath);
  }

  // --- Description ---
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  if (!descMatch || !descMatch[1].trim()) {
    results.seo.missingDescription.push(relPath);
  } else {
    const desc = descMatch[1].trim();
    if (desc.length < 50) results.seo.shortDescriptions.push({ relPath, desc, len: desc.length });
    if (desc.length > 170) results.seo.longDescriptions.push({ relPath, desc, len: desc.length });
    results.seo.duplicateDescriptions[desc] = results.seo.duplicateDescriptions[desc] || [];
    results.seo.duplicateDescriptions[desc].push(relPath);
  }

  // --- H1 ---
  const h1Matches = [...content.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length === 0) {
    results.seo.missingH1.push(relPath);
  } else if (h1Matches.length > 1) {
    results.seo.multipleH1.push({ relPath, count: h1Matches.length });
  } else {
    const h1Text = h1Matches[0][1].replace(/<[^>]+>/g, '').trim();
    if (!h1Text) results.seo.emptyH1.push(relPath);
  }

  // --- Heading Order (H1-H6) ---
  const headings = [...content.matchAll(/<h([1-6])\b[^>]*>/gi)].map(m => parseInt(m[1], 10));
  let prevLevel = 0;
  for (const lvl of headings) {
    if (prevLevel > 0 && lvl > prevLevel + 1) {
      results.seo.headingSkips.push({ relPath, from: prevLevel, to: lvl });
      break;
    }
    prevLevel = lvl;
  }

  // --- Canonical ---
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  if (!canonicalMatch) {
    results.seo.missingCanonical.push(relPath);
  } else {
    const canonical = canonicalMatch[1];
    if (!canonical.startsWith(BASE_URL)) {
      results.seo.invalidCanonicalHost.push({ relPath, canonical });
    }
    // Expected canonical path calculation
    let expectedPath = '/' + relPath.replace(/\/index\.html$/, '').replace(/^index\.html$/, '');
    if (expectedPath === '/') expectedPath = '';
    const expectedCanonical = `${BASE_URL}${expectedPath}`;
    if (canonical !== expectedCanonical && !(expectedPath === '' && canonical === `${BASE_URL}/`)) {
      results.seo.canonicalPathMismatch.push({ relPath, canonical, expectedCanonical });
    }
    if (canonical.length > BASE_URL.length + 1 && canonical.endsWith('/')) {
      results.seo.canonicalTrailingSlashError.push({ relPath, canonical });
    }
  }

  // --- HTML lang ---
  const langMatch = content.match(/<html\s+lang="([^"]*)"/i);
  if (!langMatch) {
    results.seo.missingLang.push(relPath);
  } else {
    const lang = langMatch[1];
    // derive expected locale
    let expectedLocale = 'en';
    for (const loc of LOCALES) {
      if (loc !== 'en' && (relPath.startsWith(`${loc}/`) || relPath === `${loc}.html`)) {
        expectedLocale = loc;
        break;
      }
    }
    if (lang !== expectedLocale) {
      results.seo.langMismatch.push({ relPath, lang, expectedLocale });
    }
  }

  // --- Robots ---
  const robotsMatch = content.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
  if (robotsMatch) {
    const robots = robotsMatch[1];
    if (robots.includes('noindex') && !relPath.includes('404') && !relPath.includes('admin')) {
      results.seo.inadvertentNoindex.push({ relPath, robots });
    }
  }

  // --- Open Graph ---
  const ogTitle = content.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
  const ogDesc = content.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
  const ogImg = content.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i);
  if (!ogTitle) results.seo.missingOgTitle.push(relPath);
  if (!ogDesc && !relPath.includes('404')) results.seo.missingOgDescription.push(relPath);
  if (!ogImg) results.seo.missingOgImage.push(relPath);
  else {
    const imgUrl = ogImg[1];
    if (imgUrl.startsWith(BASE_URL)) {
      const localPath = path.join(DIST_DIR, imgUrl.replace(BASE_URL, ''));
      if (!fs.existsSync(localPath)) {
        results.seo.brokenOgImage.push({ relPath, imgUrl });
      }
    }
  }

  // --- Twitter Card ---
  const twitterCard = content.match(/<meta\s+name="twitter:card"\s+content="([^"]*)"/i);
  if (!twitterCard) results.seo.missingTwitterCard.push(relPath);

  // --- Structured Data (JSON-LD) ---
  const ldMatches = [...content.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (ldMatches.length > 0) {
    results.structuredData.pagesWithSchema++;
    for (const match of ldMatches) {
      try {
        const parsed = JSON.parse(match[1]);
        const type = parsed['@type'] || (Array.isArray(parsed['@graph']) ? 'Graph' : 'Unknown');
        results.structuredData.schemaTypes[type] = (results.structuredData.schemaTypes[type] || 0) + 1;
        
        // Defect check: invalid context or missing mandatory fields
        if (parsed['@context'] !== 'https://schema.org' && parsed['@context'] !== 'http://schema.org') {
          results.structuredData.schemaDefects.push({ relPath, defect: 'Invalid @context', val: parsed['@context'] });
        }
        if (type === 'BlogPosting') {
          if (!parsed.headline) results.structuredData.schemaDefects.push({ relPath, defect: 'BlogPosting missing headline' });
          if (!parsed.author) results.structuredData.schemaDefects.push({ relPath, defect: 'BlogPosting missing author' });
          if (!parsed.datePublished) results.structuredData.schemaDefects.push({ relPath, defect: 'BlogPosting missing datePublished' });
        }
      } catch (err) {
        results.structuredData.syntaxErrors.push({ relPath, error: err.message });
      }
    }
  }

  // --- Accessibility Landmarks & Skip Link ---
  if (!content.includes('<main') && !relPath.includes('404')) {
    results.accessibility.missingMainLandmark.push(relPath);
  }
  if (!content.includes('href="#main-content"') && !relPath.includes('404')) {
    results.accessibility.missingSkipLink.push(relPath);
  }

  // Empty buttons
  const buttons = [...content.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)];
  for (const btn of buttons) {
    const attrs = btn[1];
    const body = btn[2].replace(/<[^>]+>/g, '').trim();
    const hasAria = /aria-label="[^"]+"/i.test(attrs) || /aria-labelledby="[^"]+"/i.test(attrs);
    if (!body && !hasAria) {
      results.accessibility.emptyButtons.push({ relPath, html: btn[0].substring(0, 80) });
    }
  }

  // --- Images ---
  const images = [...content.matchAll(/<img\b([^>]*)>/gi)];
  for (const img of images) {
    const attrs = img[1];
    if (!/alt="[^"]*"/i.test(attrs)) {
      results.images.missingAlt.push({ relPath, img: img[0].substring(0, 100) });
    }
    const srcMatch = attrs.match(/src="([^"]*)"/i);
    if (srcMatch) {
      const src = srcMatch[1];
      if (src.startsWith('/') && !src.startsWith('//')) {
        const localImgPath = path.join(DIST_DIR, src.split('?')[0].split('#')[0]);
        if (!fs.existsSync(localImgPath)) {
          results.images.brokenImages.push({ relPath, src });
        }
      }
    }
  }

  // --- Links ---
  const linkMatches = [...content.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)];
  for (const l of linkMatches) {
    const attrs = l[1];
    const text = l[2].replace(/<[^>]+>/g, '').trim().toLowerCase();
    
    // Check generic link text
    if (['click here', 'read more', 'learn more', 'here', 'more'].includes(text)) {
      if (!/aria-label="[^"]+"/i.test(attrs)) {
        results.accessibility.genericLinkText.push({ relPath, text, snippet: l[0].substring(0, 100) });
      }
    }

    // target="_blank" security
    if (/target="_blank"/i.test(attrs) && !/rel="[^"]*noopener[^"]*"/i.test(attrs)) {
      results.links.targetBlankWithoutNoopener.push({ relPath, link: l[0].substring(0, 100) });
    }

    const hrefMatch = attrs.match(/href="([^"]*)"/i);
    if (hrefMatch) {
      const href = hrefMatch[1];
      if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/#')) {
        const [cleanPath, hash] = href.split('#');
        // trailing slash check
        if (cleanPath.length > 1 && cleanPath.endsWith('/') && !cleanPath.endsWith('.xml')) {
          results.links.trailingSlashInInternalLinks.push({ relPath, href });
        }
      }
    }
  }

  // --- Security checks ---
  if (/http:\/\/[a-zA-Z0-9.-]+\//i.test(content) && !content.includes('http://www.w3.org')) {
    const matches = [...content.matchAll(/http:\/\/[^\s"'<>]+/gi)]
      .map(m => m[0])
      .filter(u => !u.includes('w3.org') && !u.includes('schema.org'));
    if (matches.length > 0) {
      results.security.mixedContent.push({ relPath, urls: matches });
    }
  }

  // External scripts
  const scripts = [...content.matchAll(/<script\b([^>]*)src="([^"]*)"/gi)];
  for (const s of scripts) {
    const src = s[2];
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
      results.security.externalScripts.push({ relPath, src });
    }
  }

  // Potential secrets
  if (/(?:api[_-]?key|secret|password|bearer|aws[_-]?access)\s*[:=]\s*["'][a-zA-Z0-9_\-]{16,}["']/i.test(content)) {
    results.security.secretsFound.push(relPath);
  }
}

// Check sitemaps
const sitemapIndexPath = path.join(DIST_DIR, 'sitemap-index.xml');
const sitemap0Path = path.join(DIST_DIR, 'sitemap-0.xml');
let sitemapUrls = [];
if (fs.existsSync(sitemap0Path)) {
  const xml = fs.readFileSync(sitemap0Path, 'utf-8');
  const locMatches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  sitemapUrls = locMatches;
}

console.log('--- AUDIT SUMMARY RESULTS ---');
console.log(`Content Pages: ${results.contentPages.length}`);
console.log(`Redirect Stubs: ${results.redirectStubs.length}`);
console.log(`Missing Titles: ${results.seo.missingTitle.length}`);
console.log(`Duplicate Titles: ${Object.values(results.seo.duplicateTitles).filter(arr => arr.length > 1).length} sets`);
console.log(`Short Titles (<15): ${results.seo.shortTitles.length}`);
console.log(`Long Titles (>70): ${results.seo.longTitles.length}`);
console.log(`Missing Meta Descriptions: ${results.seo.missingDescription.length}`);
console.log(`Duplicate Descriptions: ${Object.values(results.seo.duplicateDescriptions).filter(arr => arr.length > 1).length} sets`);
console.log(`Short Descriptions (<50): ${results.seo.shortDescriptions.length}`);
console.log(`Long Descriptions (>170): ${results.seo.longDescriptions.length}`);
console.log(`Missing H1: ${results.seo.missingH1.length}`);
console.log(`Multiple H1s: ${results.seo.multipleH1.length}`);
console.log(`Heading Skips (e.g. H1->H3): ${results.seo.headingSkips.length}`);
console.log(`Missing Canonicals: ${results.seo.missingCanonical.length}`);
console.log(`Canonical Path Mismatches: ${results.seo.canonicalPathMismatch.length}`);
console.log(`Canonical Trailing Slash Errors: ${results.seo.canonicalTrailingSlashError.length}`);
console.log(`Lang Mismatches: ${results.seo.langMismatch.length}`);
console.log(`Inadvertent Noindex: ${results.seo.inadvertentNoindex.length}`);
console.log(`Redirect Missing Noindex: ${results.seo.redirectMissingNoindex.length}`);
console.log(`Missing OG Title: ${results.seo.missingOgTitle.length}`);
console.log(`Missing OG Description: ${results.seo.missingOgDescription.length}`);
console.log(`Broken OG Images: ${results.seo.brokenOgImage.length}`);
console.log(`Missing Twitter Card: ${results.seo.missingTwitterCard.length}`);
console.log(`Structured Data: ${results.structuredData.pagesWithSchema} pages, syntax errors: ${results.structuredData.syntaxErrors.length}, defects: ${results.structuredData.schemaDefects.length}`);
console.log(`Broken Internal Images: ${results.images.brokenImages.length}`);
console.log(`Missing Alt Text: ${results.images.missingAlt.length}`);
console.log(`Target Blank Without Noopener: ${results.links.targetBlankWithoutNoopener.length}`);
console.log(`Trailing Slashes in Internal Links: ${results.links.trailingSlashInInternalLinks.length}`);
console.log(`Generic Link Text ("read more", etc.): ${results.accessibility.genericLinkText.length}`);
console.log(`Empty Buttons: ${results.accessibility.emptyButtons.length}`);
console.log(`Missing Skip Link: ${results.accessibility.missingSkipLink.length}`);
console.log(`Missing Main Landmark: ${results.accessibility.missingMainLandmark.length}`);
console.log(`Mixed Content: ${results.security.mixedContent.length}`);
console.log(`External Scripts: ${results.security.externalScripts.length}`);
console.log(`Potential Secrets: ${results.security.secretsFound.length}`);
console.log(`Sitemap Total URLs in dist/sitemap-0.xml: ${sitemapUrls.length}`);

// Write JSON output for detailed report generation
fs.writeFileSync(path.resolve('scratch/audit-results.json'), JSON.stringify(results, null, 2));
console.log('Saved detailed results to scratch/audit-results.json');
