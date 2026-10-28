import fs from 'node:fs';

const filePath = 'src/components/Footer.astro';
let content = fs.readFileSync(filePath, 'utf8');

const target = `{ label: t('nav.docs'), href: '/docs' },`;
const replacement = `{ label: t('nav.docs'), href: '/docs' },\r\n      { label: t('nav.faq'), href: '/faq' },`;

if (!content.includes(target)) {
  console.error('Target not found in Footer.astro');
  process.exit(1);
}

content = content.replace(target, replacement);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated Footer.astro');
