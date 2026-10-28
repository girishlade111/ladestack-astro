import fs from 'fs';
import path from 'path';

const navFaqMap = {
  en: 'FAQ',
  ja: 'FAQ',
  ko: 'FAQ',
  zh: '常见问题',
  ru: 'FAQ',
  tr: 'SSS',
  fr: 'FAQ',
  pt: 'FAQ',
  es: 'Preguntas Frecuentes',
};

// 1. Update UIStrings interface in en.ts
const enPath = path.resolve('src/i18n/ui/en.ts');
let enContent = fs.readFileSync(enPath, 'utf-8');

if (!enContent.includes("'nav.faq': string;")) {
  enContent = enContent.replace(
    "'nav.closeMenu': string;",
    "'nav.closeMenu': string;\n  'nav.faq': string;"
  );
  fs.writeFileSync(enPath, enContent, 'utf-8');
  console.log('Updated UIStrings interface in en.ts');
}

// 2. Add 'nav.faq' entry to all 9 locale dictionaries
const locales = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];

for (const loc of locales) {
  const filePath = path.resolve(`src/i18n/ui/${loc}.ts`);
  let content = fs.readFileSync(filePath, 'utf-8');

  if (!content.includes("'nav.faq':")) {
    const val = navFaqMap[loc];
    content = content.replace(
      /'nav\.closeMenu':\s*['"][^'"]*['"],?/,
      (match) => `${match}\n  'nav.faq': '${val}',`
    );
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Added nav.faq to ${loc}.ts`);
  }
}

console.log('Finished updating nav.faq across all UI dictionaries.');

