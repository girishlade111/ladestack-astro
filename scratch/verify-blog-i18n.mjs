import fs from 'node:fs';
import path from 'node:path';

const locales = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];

console.log('--- VERIFYING ALL 9 BLOG INDEX PAGES ---');

const expectedMetadata = {
  en: {
    title: 'Blog – Engineering Insights & Technical Guides | LadeStack',
    descPrefix: 'Explore technical architecture deep-dives',
    ogTitle: 'LadeStack Engineering Blog',
  },
  ja: {
    title: 'ブログ – エンジニアリングインサイト＆技術ガイド | LadeStack',
    descPrefix: 'LadeStackチームによる技術アーキテクチャ',
    ogTitle: 'LadeStack エンジニアリングブログ',
  },
  ko: {
    title: '블로그 – 엔지니어링 인사이트 및 기술 가이드 | LadeStack',
    descPrefix: 'LadeStack 팀이 전하는 기술 아키텍처',
    ogTitle: 'LadeStack 엔지니어링 블로그',
  },
  zh: {
    title: '博客 – 工程深度解析与技术指南 | LadeStack',
    descPrefix: '探索 LadeStack 团队带来的技术架构',
    ogTitle: 'LadeStack 技术工程博客',
  },
  ru: {
    title: 'Блог – Инженерные инсайты и технические руководства | LadeStack',
    descPrefix: 'Технические архитектурные обзоры',
    ogTitle: 'Инженерный блог LadeStack',
  },
  tr: {
    title: 'Blog – Mühendislik İçgörüleri ve Teknik Rehberler | LadeStack',
    descPrefix: 'LadeStack ekibinden teknik mimari',
    ogTitle: 'LadeStack Mühendislik Bloğu',
  },
  fr: {
    title: "Blog – Perspectives d'ingénierie et guides techniques | LadeStack",
    descPrefix: "Analyses d'architecture technique",
    ogTitle: "Blog d'ingénierie LadeStack",
  },
  pt: {
    title: 'Blog – Insights de Engenharia e Guias Técnicos | LadeStack',
    descPrefix: 'Explore análises de arquitetura técnica',
    ogTitle: 'Blog de Engenharia LadeStack',
  },
  es: {
    title: 'Blog – Perspectivas de Ingeniería y Guías Técnicas | LadeStack',
    descPrefix: 'Explore análisis de arquitectura técnica',
    ogTitle: 'Blog de Ingeniería de LadeStack',
  },
};

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

let allPassed = true;

for (const loc of locales) {
  const filePath = loc === 'en'
    ? path.join('dist', 'blog', 'index.html')
    : path.join('dist', loc, 'blog', 'index.html');

  if (!fs.existsSync(filePath)) {
    console.error(`[FAIL] File missing: ${filePath}`);
    allPassed = false;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');

  // Title check
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const actualTitle = titleMatch ? decodeHtmlEntities(titleMatch[1].trim()) : '';

  // Meta description check
  const descMatch = html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i);
  const actualDesc = descMatch ? decodeHtmlEntities(descMatch[1].trim()) : '';

  // Canonical check
  const canonicalMatch = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
  const actualCanonical = canonicalMatch ? canonicalMatch[1].trim() : '';
  const expectedCanonical = loc === 'en' ? 'https://ladestack.in/blog' : `https://ladestack.in/${loc}/blog`;

  // OG Title check
  const ogTitleMatch = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i);
  const actualOgTitle = ogTitleMatch ? decodeHtmlEntities(ogTitleMatch[1].trim()) : '';

  // OG Desc check
  const ogDescMatch = html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i);
  const actualOgDesc = ogDescMatch ? decodeHtmlEntities(ogDescMatch[1].trim()) : '';

  // Hreflang count check
  const hreflangs = [...html.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"/gi)];

  const expected = expectedMetadata[loc];
  const titleOk = actualTitle === expected.title;
  const descOk = actualDesc.startsWith(expected.descPrefix) && actualDesc.length >= 50 && actualDesc.length <= 170;
  const canonicalOk = actualCanonical === expectedCanonical;
  const ogTitleOk = actualOgTitle === expected.ogTitle;
  const hreflangOk = hreflangs.length >= 10; // 9 languages + x-default

  if (titleOk && descOk && canonicalOk && ogTitleOk && hreflangOk) {
    console.log(`[PASS] ${loc.toUpperCase()}:`);
    console.log(`  Title:     "${actualTitle}"`);
    console.log(`  Desc:      "${actualDesc.slice(0, 50)}..." (${actualDesc.length} chars)`);
    console.log(`  Canonical: ${actualCanonical}`);
    console.log(`  OG Title:  "${actualOgTitle}"`);
    console.log(`  Hreflangs: ${hreflangs.length} reciprocal links`);
  } else {
    console.error(`[FAIL] ${loc.toUpperCase()}:`);
    console.error(`  Title match: ${titleOk} (expected "${expected.title}", got "${actualTitle}")`);
    console.error(`  Desc match:  ${descOk} (actual len: ${actualDesc.length})`);
    console.error(`  Canonical:   ${canonicalOk} (expected "${expectedCanonical}", got "${actualCanonical}")`);
    console.error(`  OG Title:    ${ogTitleOk} (expected "${expected.ogTitle}", got "${actualOgTitle}")`);
    console.error(`  Hreflangs:   ${hreflangs.length}`);
    allPassed = false;
  }
}

if (!allPassed) {
  process.exit(1);
}
console.log('\nAll 9 blog index pages fully verified with localized metadata!');
