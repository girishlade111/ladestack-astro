import fs from 'node:fs';
import path from 'node:path';

console.log('--- VALIDATING VERCEL EDGE REDIRECT CONFIGURATION ---');

const vercelPath = path.resolve('vercel.json');
if (!fs.existsSync(vercelPath)) {
  console.error('[FAIL] vercel.json not found');
  process.exit(1);
}

let config;
try {
  config = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  console.log('[PASS] Valid JSON syntax');
} catch (err) {
  console.error('[FAIL] Invalid JSON syntax:', err.message);
  process.exit(1);
}

if (!Array.isArray(config.redirects)) {
  console.error('[FAIL] Missing or invalid redirects array');
  process.exit(1);
}

const expectedMappings = [
  { source: '/projects', destination: '/apps' },
  { source: '/file-sharing-platform', destination: '/apps' },
  { source: '/api-testing-platform', destination: '/apps' },
  { source: '/ai-code-viewer-ai', destination: '/gb-coder' },
  { source: '/blog/1', destination: '/blog/future-of-ai-in-software-development' },
  { source: '/blog/2', destination: '/blog/building-ai-powered-code-review-systems' },
  { source: '/blog/3', destination: '/blog/machine-learning-pipelines-for-web-developers' },
  { source: '/blog/4', destination: '/blog/generative-ai-for-content-creation' },
  { source: '/blog/5', destination: '/blog/building-rag-applications-vector-databases' },
  { source: '/blog/6', destination: '/blog/fine-tuning-llms-domain-specific-tasks' },
  { source: '/sitemap-pages.xml', destination: '/sitemap-index.xml' },
  { source: '/sitemap-blog.xml', destination: '/sitemap-index.xml' },
];

if (config.redirects.length !== 12) {
  console.error(`[FAIL] Expected exactly 12 redirects, found ${config.redirects.length}`);
  process.exit(1);
}

const sources = new Set();
const destinations = new Set();

for (const exp of expectedMappings) {
  const match = config.redirects.find((r) => r.source === exp.source);
  if (!match) {
    console.error(`[FAIL] Missing redirect for source: ${exp.source}`);
    process.exit(1);
  }

  if (match.destination !== exp.destination) {
    console.error(`[FAIL] Mismatched destination for ${exp.source}: expected ${exp.destination}, got ${match.destination}`);
    process.exit(1);
  }

  if (match.statusCode !== 301) {
    console.error(`[FAIL] Expected statusCode 301 for ${exp.source}, got ${match.statusCode}`);
    process.exit(1);
  }

  if ('permanent' in match) {
    console.error(`[FAIL] Found forbidden "permanent" property in rule for ${exp.source}`);
    process.exit(1);
  }

  // Check target destination existence in dist/
  let targetExists = false;
  if (exp.destination.endsWith('.xml')) {
    targetExists = fs.existsSync(path.join('dist', exp.destination));
  } else {
    targetExists = fs.existsSync(path.join('dist', exp.destination.replace(/^\//, ''), 'index.html'));
  }

  if (!targetExists) {
    console.error(`[FAIL] Target destination does not exist in dist/: ${exp.destination}`);
    process.exit(1);
  }

  sources.add(match.source);
  destinations.add(match.destination);
  console.log(`[PASS] ${match.source} -> ${match.destination} (301, target verified)`);
}

// Loop detection: No destination should be a source
for (const dest of destinations) {
  if (sources.has(dest)) {
    console.error(`[FAIL] Redirect loop detected: ${dest} is both a destination and a source`);
    process.exit(1);
  }
}

console.log('[PASS] Zero redirect loops detected');

// Content shadowing check: None of the sources should be a generated content page (other than redirect stub)
for (const src of sources) {
  const srcPath = src.endsWith('.xml')
    ? path.join('dist', src)
    : path.join('dist', src.replace(/^\//, ''), 'index.html');

  if (fs.existsSync(srcPath) && fs.statSync(srcPath).isFile()) {
    const html = fs.readFileSync(srcPath, 'utf8');
    if (!html.includes('http-equiv="refresh"') && !src.endsWith('.xml')) {
      console.error(`[FAIL] Source shadows real content page: ${src}`);
      process.exit(1);
    }
  }
}

console.log('[PASS] No redirect shadows active content');
console.log('\nDECLARATION: EDGE_REDIRECT_CONFIG_PREPARED');
console.log('(Note: Deployed edge HTTP status code verification requires production Vercel edge deployment.)');
