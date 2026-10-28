import fs from 'fs';
import path from 'path';

const enPath = path.resolve('src/i18n/ui/en.ts');
let enContent = fs.readFileSync(enPath, 'utf-8');

// Replace in the dictionary object
enContent = enContent.replace(
  "  'nav.closeMenu': 'Close menu',",
  "  'nav.closeMenu': 'Close menu',\n  'nav.faq': 'FAQ',"
);
fs.writeFileSync(enPath, enContent, 'utf-8');
console.log('Added nav.faq to en.ts dictionary');

