import fs from 'node:fs';
import path from 'node:path';

const locales = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'];

for (const loc of locales) {
  // Update building-api-gateways-microservices
  const f1 = path.join('src/content/blog', loc, 'building-api-gateways-microservices.md');
  if (fs.existsSync(f1)) {
    let content = fs.readFileSync(f1, 'utf8');
    content = content.replace(/publishedAt:\s*["'][^"']+["']/, 'publishedAt: "2024-09-15"');
    content = content.replace(/coverImage:\s*["'][^"']+["']/, 'coverImage: "/blog-covers/api-architecture.svg"');
    fs.writeFileSync(f1, content, 'utf8');
    console.log('Updated f1:', f1);
  }

  // Update cloud-cost-optimization-strategies-startups
  const f2 = path.join('src/content/blog', loc, 'cloud-cost-optimization-strategies-startups.md');
  if (fs.existsSync(f2)) {
    let content = fs.readFileSync(f2, 'utf8');
    content = content.replace(/publishedAt:\s*["'][^"']+["']/, 'publishedAt: "2024-09-22"');
    content = content.replace(/coverImage:\s*["'][^"']+["']/, 'coverImage: "/blog-covers/cloud-security.svg"');
    fs.writeFileSync(f2, content, 'utf8');
    console.log('Updated f2:', f2);
  }
}
