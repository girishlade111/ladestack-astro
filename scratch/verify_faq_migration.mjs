import fs from 'node:fs';

let pass = true;

// 1. Verify dist/faq/index.html
const faqHtml = fs.readFileSync('dist/faq/index.html', 'utf8');

// Count accordion items
const accordionMatches = faqHtml.match(/<details\s+class="accordion-item/g) || [];
console.log(`[dist/faq/index.html] Accordion item count (expected 29): ${accordionMatches.length}`);
if (accordionMatches.length !== 29) {
  console.error(`❌ Expected 29 accordion items, got ${accordionMatches.length}`);
  pass = false;
} else {
  console.log(`✅ Exactly 29 accordion items found in /faq/index.html`);
}

// Check JSON-LD
const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
let match;
let foundFaqSchema = null;
while ((match = jsonLdRegex.exec(faqHtml)) !== null) {
  try {
    const parsed = JSON.parse(match[1]);
    if (parsed['@type'] === 'FAQPage') {
      foundFaqSchema = parsed;
    }
  } catch (e) {}
}

if (foundFaqSchema && Array.isArray(foundFaqSchema.mainEntity) && foundFaqSchema.mainEntity.length === 29) {
  console.log(`✅ Valid FAQPage schema with 29 questions in /faq/index.html`);
} else {
  console.error(`❌ FAQPage schema missing or question count is ${foundFaqSchema?.mainEntity?.length}`);
  pass = false;
}

// 2. Verify all 8 localized faq pages
const locales = ['ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];
for (const locale of locales) {
  const locFaqPath = `dist/${locale}/faq/index.html`;
  if (!fs.existsSync(locFaqPath)) {
    console.error(`❌ Missing ${locFaqPath}`);
    pass = false;
    continue;
  }
  const locHtml = fs.readFileSync(locFaqPath, 'utf8');
  const locAccordions = locHtml.match(/<details\s+class="accordion-item/g) || [];
  if (locAccordions.length !== 29) {
    console.error(`❌ [${locale}] Expected 29 accordion items, got ${locAccordions.length}`);
    pass = false;
  } else {
    console.log(`✅ [${locale}] Exactly 29 accordion items in /${locale}/faq/index.html`);
  }
}

// 3. Verify dist/index.html (Homepage) has NO DeveloperFaq and NO FAQPage schema
const homeHtml = fs.readFileSync('dist/index.html', 'utf8');
const homeFaqDetails = homeHtml.match(/<details\s+class="accordion-item/g) || [];
if (homeFaqDetails.length > 0) {
  console.error(`❌ Homepage dist/index.html still contains ${homeFaqDetails.length} accordion items!`);
  pass = false;
} else {
  console.log(`✅ dist/index.html has 0 accordion items (FAQ section cleanly removed)`);
}

let homeFaqSchema = null;
const homeLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
let hMatch;
while ((hMatch = homeLdRegex.exec(homeHtml)) !== null) {
  try {
    const parsed = JSON.parse(hMatch[1]);
    if (parsed['@type'] === 'FAQPage') {
      homeFaqSchema = parsed;
    }
  } catch (e) {}
}

if (homeFaqSchema) {
  console.error(`❌ dist/index.html still contains FAQPage structured data!`);
  pass = false;
} else {
  console.log(`✅ dist/index.html has zero FAQPage structured data`);
}

// 4. Verify dist/gb-coder/index.html has NO FAQ section
const gbCoderHtml = fs.readFileSync('dist/gb-coder/index.html', 'utf8');
const gbDetails = gbCoderHtml.match(/<details\s+class="accordion-item/g) || [];
if (gbDetails.length > 0) {
  console.error(`❌ dist/gb-coder/index.html still contains ${gbDetails.length} accordion items!`);
  pass = false;
} else {
  console.log(`✅ dist/gb-coder/index.html has 0 accordion items (FAQ section cleanly removed)`);
}

// 5. Verify footer link to /faq
if (homeHtml.includes('href="/faq"')) {
  console.log(`✅ Footer contains link to /faq`);
} else {
  console.error(`❌ Footer missing link to /faq`);
  pass = false;
}

if (!pass) {
  process.exit(1);
}
console.log('\n🎉 ALL FAQ MIGRATION VERIFICATION CHECKS PASSED!');
