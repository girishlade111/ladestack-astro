import fs from 'node:fs';

console.log('=== PHASE 4D-3 REDIRECT INTEGRITY SUITE ===');

// 1. Read vercel.json
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const vercelRedirects = vercelConfig.redirects;

console.log(`vercel.json redirects count: ${vercelRedirects.length} (Expected: 14)`);
if (vercelRedirects.length !== 14) {
  throw new Error(`Expected 14 redirects in vercel.json, got ${vercelRedirects.length}`);
}

// 2. Read public/_redirects
const publicRedirectsRaw = fs.readFileSync('public/_redirects', 'utf8');
const publicRedirectLines = publicRedirectsRaw.split('\n')
  .map(l => l.trim())
  .filter(l => l && !l.startsWith('#'));

console.log(`public/_redirects lines count: ${publicRedirectLines.length} (Expected: 14)`);
if (publicRedirectLines.length !== 14) {
  throw new Error(`Expected 14 redirects in public/_redirects, got ${publicRedirectLines.length}`);
}

// 3. Read astro.config.mjs
const astroConfigRaw = fs.readFileSync('astro.config.mjs', 'utf8');
const redirectMatches = [...astroConfigRaw.matchAll(/'([^']+)':\s*'([^']+)'/g)];
console.log(`astro.config.mjs redirects entries: ${redirectMatches.length} (Expected: 14)`);
if (redirectMatches.length !== 14) {
  throw new Error(`Expected 14 redirects in astro.config.mjs, got ${redirectMatches.length}`);
}

// Check uniqueness of sources
const sources = vercelRedirects.map(r => r.source);
const uniqueSources = new Set(sources);
if (uniqueSources.size !== sources.length) {
  throw new Error('Duplicate redirect sources found in vercel.json');
}

// Check status codes
for (const r of vercelRedirects) {
  if (r.statusCode !== 301) {
    throw new Error(`Redirect ${r.source} -> ${r.destination} has statusCode ${r.statusCode}, expected 301`);
  }
}

// Check that new rules are present
const hasAiCodeViewer = vercelRedirects.some(r => r.source === '/projects/ai-code-viewer' && r.destination === '/gb-coder');
const hasBlog14 = vercelRedirects.some(r => r.source === '/blog/14' && r.destination === '/blog/api-rate-limiting-throttling-strategies');

if (!hasAiCodeViewer) throw new Error('Missing /projects/ai-code-viewer -> /gb-coder rule');
if (!hasBlog14) throw new Error('Missing /blog/14 -> /blog/api-rate-limiting-throttling-strategies rule');

// Check for loops (source === destination or chains that loop)
for (const r of vercelRedirects) {
  if (r.source === r.destination) throw new Error(`Self-redirect detected on ${r.source}`);
}

console.log('ALL 14 REDIRECTS VALIDATED SUCCESSFULLY!');

