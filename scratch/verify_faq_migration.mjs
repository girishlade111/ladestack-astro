import fs from 'node:fs';
import path from 'node:path';

let pass = true;

// 1. Verify dist/faq/index.html
const faqHtml = fs.readFileSync('dist/faq/index.html', 'utf8');

// Count accordion items
const accordionMatches = faqHtml.match(/class="[^"]*border border-border[^"]*rounded-xl[^"]*"/g) || [];
console.log(`[dist/faq/index.html] Accordion count (expected 29): ${accordionMatches.length}`);
if (accordionMatches.length !== 29) {
  console.error(`❌ Expected 29 accordion items, got ${accordionMatches.length}`);
  pass = false;
} else {
  console.log(`✅ Exactly 29 accordion items found in /faq/index.html`);
}

// Check JSON-LD
const jsonLdMatch = faqHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (jsonLdMatch) {
  const schemas = JSON.parse(jsonLdMatch[1]);
  const faqSchema = schemas.find((s) => s['@type'] === 'FAQPage');
  if (faqSchema && faqSchema.mainEntity && faqSchema.mainEntity.length === 29) {
    console.log(`✅ Valid FAQPage schema with 29 questions in /faq/index.html`);
  } else {
    console.error(`❌ FAQPage schema missing or question count is ${faqSchema?.mainEntity?.length}`);
    pass = false;
  }
} else {
  console.error(`❌ JSON-LD script not found in /faq/index.html`);
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
  const locAccordions = locHtml.match(/class="[^"]*border border-border[^"]*rounded-xl[^"]*"/g) || [];
  if (locAccordions.length !== 29) {
    console.error(`❌ [${locale}] Expected 29 accordion items, got ${locAccordions.length}`);
    pass = false;
  } else {
    console.log(`✅ [${locale}] Exactly 29 accordion items in /${locale}/faq/index.html`);
  }
}

// 3. Verify dist/index.html (Homepage) has NO DeveloperFaq and NO FAQPage schema
const homeHtml = fs.readFileSync('dist/index.html', 'utf8');
if (homeHtml.includes('Frequently Asked Questions') || homeHtml.includes('Everything you need to know about LadeStack utilities')) {
  console.error(`❌ Homepage dist/index.html still contains FAQ section!`);
  pass = false;
} else {
  console.log(`✅ dist/index.html is clean of FAQ section`);
}
const homeJsonLdMatch = homeHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (homeJsonLdMatch) {
  const homeSchemas = JSON.parse(homeJsonLdMatch[1]);
  const homeFaqSchema = homeSchemas.find((s) => s['@type'] === 'FAQPage');
  if (homeFaqSchema) {
    console.error(`❌ dist/index.html still contains FAQPage structured data!`);
    pass = false;
  } else {
    console.log(`✅ dist/index.html has zero FAQPage structured data`);
  }
}

// 4. Verify dist/gb-coder/index.html has NO FAQ section
const gbCoderHtml = fs.readFileSync('dist/gb-coder/index.html', 'utf8');
if (gbCoderHtml.includes('Frequently Asked Questions') || gbCoderHtml.includes('Everything you need to know about GB Coder')) {
  console.error(`❌ dist/gb-coder/index.html still contains FAQ section!`);
  pass = false;
} else {
  console.log(`✅ dist/gb-coder/index.html is clean of FAQ section`);
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
