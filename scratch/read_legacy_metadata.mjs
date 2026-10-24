import fs from 'node:fs';

const content = fs.readFileSync('src/data/blogPosts.ts', 'utf8');
const legacyBody = fs.readFileSync('src/data/blogContent.ts', 'utf8');

const slugs = [
  'building-subscription-billing-systems',
  'scaling-saas-applications-million-users',
  'baas-platforms-compared-firebase-supabase-appwrite',
  'building-serverless-backends-with-baas',
  'real-time-data-sync-backend-services'
];

for (const s of slugs) {
  console.log(`========================================`);
  console.log(`SLUG: ${s}`);
  console.log(`========================================`);
  const regex = new RegExp(`{\\s*id:[^}]+slug:\\s*['"]${s}['"][^}]+}`, 'gs');
  const m = content.match(regex);
  if (m) {
    console.log(m[0]);
  } else {
    console.log('Metadata not found directly via regex');
  }

  // Extract legacy content snippet
  const bodyRegex = new RegExp(`['"]?${s}['"]?:\\s*\`([\\s\\S]*?)\`,`, 'g');
  const bodyMatch = bodyRegex.exec(legacyBody);
  if (bodyMatch) {
    console.log(`--- Legacy content excerpt (first 300 chars) ---`);
    console.log(bodyMatch[1].slice(0, 300) + '...\n');
  } else {
    console.log('Legacy body not found via regex\n');
  }
}
