import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      fileList.push({
        path: filePath,
        relPath: path.relative(DIST_DIR, filePath).replace(/\\/g, '/'),
        size: stat.size,
        ext: path.extname(file).toLowerCase(),
      });
    }
  }
  return fileList;
}

const files = getFiles(DIST_DIR);

const stats = {
  byType: {},
  totalSize: 0,
  largestFiles: [],
  cssFiles: [],
  jsFiles: [],
  imageFiles: [],
};

for (const f of files) {
  stats.totalSize += f.size;
  stats.byType[f.ext] = stats.byType[f.ext] || { count: 0, totalBytes: 0 };
  stats.byType[f.ext].count++;
  stats.byType[f.ext].totalBytes += f.size;

  if (f.ext === '.css') stats.cssFiles.push(f);
  if (f.ext === '.js') stats.jsFiles.push(f);
  if (['.svg', '.png', '.jpg', '.jpeg', '.webp', '.ico'].includes(f.ext)) {
    stats.imageFiles.push(f);
  }
}

stats.largestFiles = [...files].sort((a, b) => b.size - a.size).slice(0, 15);

console.log('=== DIST PAYLOAD STATS ===');
console.log(`Total files: ${files.length}, Total uncompressed size: ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB`);
console.log('Breakdown by Extension:');
for (const [ext, data] of Object.entries(stats.byType)) {
  console.log(`  ${ext || '(none)'}: ${data.count} files, ${(data.totalBytes / 1024).toFixed(1)} KB`);
}

console.log('\nCSS Files in dist/_astro:');
for (const f of stats.cssFiles) {
  console.log(`  ${f.relPath}: ${(f.size / 1024).toFixed(1)} KB`);
}

console.log('\nJS Files in dist/_astro:');
if (stats.jsFiles.length === 0) {
  console.log('  ZERO client-side JavaScript bundles in dist/_astro! (Pure zero-JS static HTML architecture)');
} else {
  for (const f of stats.jsFiles) {
    console.log(`  ${f.relPath}: ${(f.size / 1024).toFixed(1)} KB`);
  }
}

console.log('\nLargest 10 Images:');
const sortedImages = stats.imageFiles.sort((a, b) => b.size - a.size).slice(0, 10);
for (const img of sortedImages) {
  console.log(`  ${img.relPath}: ${(img.size / 1024).toFixed(1)} KB`);
}

fs.writeFileSync(path.resolve('scratch/perf-stats.json'), JSON.stringify(stats, null, 2));
