import fs from 'node:fs';

const filePath = 'src/layouts/BaseLayout.astro';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  "parseInt(btn.getAttribute('data-vt-duration') || '400', 10)",
  "parseInt(btn.getAttribute('data-vt-duration') || '750', 10)"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated BaseLayout.astro');
