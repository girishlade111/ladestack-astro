import fs from 'node:fs';

const filePath = 'src/components/pages/GbCoderPage.astro';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove Accordion imports
content = content.replace(
  /\r?\nimport Accordion from '\.\.\/ui\/Accordion\.astro';\r?\nimport AccordionItem from '\.\.\/ui\/AccordionItem\.astro';/,
  ''
);

// 2. Remove FAQ section
const faqSectionRegex = /\r?\n\s*\{\/\* ── FAQ SECTION ── \*\/\}\r?\n\s*<section class="py-16 sm:py-24 border-b border-border bg-surface-muted\/20">[\s\S]*?<\/section>/;

if (!faqSectionRegex.test(content)) {
  console.error('FAQ section regex did not match!');
  process.exit(1);
}

content = content.replace(faqSectionRegex, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated GbCoderPage.astro');
