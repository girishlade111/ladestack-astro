import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = 'public/blog-covers';
const svgs = fs.readdirSync(dir).filter((f) => f.endsWith('.svg')).sort();

console.log(`Found ${svgs.length} SVG cover files to convert into 1200x630 raster PNGs.`);

const results = [];

for (const svgFile of svgs) {
  const baseName = path.basename(svgFile, '.svg');
  const pngFile = `${baseName}.png`;
  const svgPath = path.join(dir, svgFile);
  const pngPath = path.join(dir, pngFile);

  const svgBuffer = fs.readFileSync(svgPath);

  // Render to 1200x630 PNG with high density for sharp vector details
  const pngBuffer = await sharp(svgBuffer, { density: 300 })
    .resize(1200, 630, {
      fit: 'cover',
      position: 'center',
    })
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
    })
    .toBuffer();

  fs.writeFileSync(pngPath, pngBuffer);

  const meta = await sharp(pngBuffer).metadata();
  const stat = fs.statSync(pngPath);

  results.push({
    svgFile,
    pngFile,
    width: meta.width,
    height: meta.height,
    format: meta.format,
    sizeBytes: stat.size,
    valid: meta.width === 1200 && meta.height === 630 && meta.format === 'png',
  });
}

console.log('\n--- Generated Raster Social Images Inventory ---');
let allValid = true;
for (const r of results) {
  const status = r.valid ? 'OK' : 'FAIL';
  if (!r.valid) allValid = false;
  console.log(`[${status}] ${r.svgFile} -> ${r.pngFile} (${r.width}x${r.height}, ${(r.sizeBytes / 1024).toFixed(1)} KB)`);
}

if (!allValid) {
  console.error('\n❌ Some images failed validation!');
  process.exit(1);
} else {
  console.log(`\n🎉 Successfully generated and verified ${results.length} raster social images!`);
}
