import fs from 'fs';

const locales = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];

console.log('=== VERIFYING NINE-LOCALE BLOG CARDS AND ISOLATION ===\n');

let allValid = true;

for (const loc of locales) {
  const filePath = loc === 'en' ? 'dist/blog/index.html' : `dist/${loc}/blog/index.html`;
  const html = fs.readFileSync(filePath, 'utf8');

  // Extract all article cards
  const cardRegex = /<article data-post-card[\s\S]*?<\/article>/g;
  const cards = html.match(cardRegex) || [];

  const expectedCount = loc === 'en' ? 30 : 13;
  const actualCount = cards.length;

  console.log(`Locale: ${loc.toUpperCase()}`);
  console.log(`  Expected cards: ${expectedCount}, Found cards: ${actualCount}`);

  if (actualCount !== expectedCount) {
    console.error(`  ❌ Card count mismatch for ${loc}: expected ${expectedCount}, got ${actualCount}`);
    allValid = false;
  }

  // Extract all hrefs from these cards
  const hrefs = cards.map(c => {
    const m = c.match(/href="([^"]+)"/);
    return m ? m[1] : null;
  }).filter(Boolean);

  const expectedPrefix = loc === 'en' ? '/blog/' : `/${loc}/blog/`;
  const invalidHrefs = hrefs.filter(href => !href.startsWith(expectedPrefix));

  if (invalidHrefs.length > 0) {
    console.error(`  ❌ Cross-locale URL leak in ${loc}:`, invalidHrefs);
    allValid = false;
  } else {
    console.log(`  ✅ All ${hrefs.length} cards strictly use prefix '${expectedPrefix}'`);
  }

  // Verify no duplicates
  const uniqueHrefs = new Set(hrefs);
  if (uniqueHrefs.size !== actualCount) {
    console.error(`  ❌ Duplicate card URLs found in ${loc}: ${actualCount - uniqueHrefs.size} duplicates`);
    allValid = false;
  } else {
    console.log(`  ✅ All ${actualCount} cards have unique URLs`);
  }
  console.log('');
}

if (!allValid) {
  console.error('FAILED: International blog card integrity audit detected errors.');
  process.exit(1);
} else {
  console.log('SUCCESS: All 9 locale blog indexes strictly isolated, exactly matching inventory.');
}
