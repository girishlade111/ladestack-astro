import fs from 'node:fs';

for (const loc of ['fr', 'tr']) {
  const p = `src/content/blog/${loc}/client-side-pdf-manipulation-webassembly.md`;
  if (fs.existsSync(p)) {
    const lines = fs.readFileSync(p, 'utf8').split('\n');
    console.log(`\n=== ${loc.toUpperCase()} PDF (lines 18-50) ===`);
    console.log(lines.slice(17, 50).join('\n'));
    console.log(`\n=== ${loc.toUpperCase()} PDF (lines 85-130) ===`);
    console.log(lines.slice(84, 130).join('\n'));
  }
}
