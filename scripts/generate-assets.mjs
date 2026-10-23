import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');

// 1. Generate logo.png (512x512)
const logoSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c1017"/>
      <stop offset="100%" stop-color="#040608"/>
    </linearGradient>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background rounded card -->
  <rect width="512" height="512" rx="104" fill="url(#bgGrad)"/>
  <rect x="2" y="2" width="508" height="508" rx="102" fill="none" stroke="#1f2937" stroke-width="4"/>
  <rect x="32" y="32" width="448" height="448" rx="80" fill="none" stroke="#10b981" stroke-opacity="0.15" stroke-width="2"/>

  <!-- Center emblem container -->
  <rect x="120" y="120" width="272" height="272" rx="56" fill="url(#emeraldGrad)" filter="url(#glow)"/>
  
  <!-- Code bracket icon in center -->
  <g fill="none" stroke="#ffffff" stroke-width="24" stroke-linecap="round" stroke-linejoin="round">
    <path d="M216 200 L160 256 L216 312"/>
    <path d="M296 200 L352 256 L296 312"/>
    <path d="M272 184 L240 328"/>
  </g>
</svg>
`;

// 2. Generate og-image.png (1200x630)
const ogImageSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ogBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16"/>
      <stop offset="50%" stop-color="#0c111c"/>
      <stop offset="100%" stop-color="#05070c"/>
    </linearGradient>
    <linearGradient id="ogEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <radialGradient id="ambientGlow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#ogBg)"/>
  <rect width="1200" height="630" fill="url(#ambientGlow)"/>
  <rect x="20" y="20" width="1160" height="590" rx="24" fill="none" stroke="#1f293d" stroke-width="2"/>

  <!-- Logo Badge -->
  <rect x="80" y="80" width="72" height="72" rx="18" fill="url(#ogEmerald)"/>
  <g fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M106 102 L92 116 L106 130"/>
    <path d="M126 102 L140 116 L126 130"/>
    <path d="M120 98 L112 134"/>
  </g>

  <!-- Brand Name -->
  <text x="172" y="128" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="34" font-weight="700" fill="#f8fafc" letter-spacing="-0.5">Lade Stack</text>
  <text x="350" y="126" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="#10b981" letter-spacing="1">DEV ECOSYSTEM</text>

  <!-- Main Headline -->
  <text x="80" y="270" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="56" font-weight="800" fill="#f8fafc" letter-spacing="-1.5">Build, Review, and Ship</text>
  <text x="80" y="340" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="56" font-weight="800" fill="#10b981" letter-spacing="-1.5">with AI Precision.</text>

  <!-- Description -->
  <text x="80" y="415" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="400" fill="#94a3b8">In-browser code studio, private PDF tools, image optimizer, and developer utilities.</text>
  <text x="80" y="450" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="400" fill="#94a3b8">Client-side execution · 100% private · Free forever.</text>

  <!-- Footer Pills -->
  <rect x="80" y="515" width="220" height="42" rx="10" fill="#141c2c" stroke="#1f293d" stroke-width="1.5"/>
  <text x="190" y="541" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="#10b981">Local WASM Engine</text>

  <rect x="320" y="515" width="220" height="42" rx="10" fill="#141c2c" stroke="#1f293d" stroke-width="1.5"/>
  <text x="430" y="541" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="#f8fafc">Zero Cloud Upload</text>

  <rect x="560" y="515" width="220" height="42" rx="10" fill="#141c2c" stroke="#1f293d" stroke-width="1.5"/>
  <text x="670" y="541" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="#f8fafc">https://ladestack.in</text>
</svg>
`;

// 3. Generate og-about.png (1200x630)
const ogAboutSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="aboutBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16"/>
      <stop offset="60%" stop-color="#0d131f"/>
      <stop offset="100%" stop-color="#05070c"/>
    </linearGradient>
    <linearGradient id="aboutEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#aboutBg)"/>
  <rect x="20" y="20" width="1160" height="590" rx="24" fill="none" stroke="#1f293d" stroke-width="2"/>

  <!-- Logo Badge -->
  <rect x="80" y="80" width="72" height="72" rx="18" fill="url(#aboutEmerald)"/>
  <g fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M106 102 L92 116 L106 130"/>
    <path d="M126 102 L140 116 L126 130"/>
    <path d="M120 98 L112 134"/>
  </g>

  <text x="172" y="128" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="34" font-weight="700" fill="#f8fafc">Lade Stack</text>
  <text x="350" y="126" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="#10b981" letter-spacing="1">ABOUT &amp; MISSION</text>

  <text x="80" y="270" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="54" font-weight="800" fill="#f8fafc" letter-spacing="-1.5">Empowering Developers</text>
  <text x="80" y="340" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="54" font-weight="800" fill="#10b981" letter-spacing="-1.5">Through Client-Side Privacy.</text>

  <text x="80" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="400" fill="#94a3b8">Founded by Girish Lade — eliminating paywalls, latency, and cloud compromises.</text>
  <text x="80" y="455" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="400" fill="#94a3b8">Architected on WebAssembly for in-browser sovereignty.</text>

  <rect x="80" y="515" width="260" height="42" rx="10" fill="#141c2c" stroke="#1f293d" stroke-width="1.5"/>
  <text x="210" y="541" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="#10b981">Founded by Girish Lade</text>

  <rect x="360" y="515" width="220" height="42" rx="10" fill="#141c2c" stroke="#1f293d" stroke-width="1.5"/>
  <text x="470" y="541" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="#f8fafc">https://ladestack.in/about</text>
</svg>
`;

async function run() {
  await sharp(Buffer.from(logoSvg)).png().toFile(path.join(publicDir, 'logo.png'));
  console.log('✓ Created public/logo.png (512x512)');

  await sharp(Buffer.from(ogImageSvg)).png().toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ Created public/og-image.png (1200x630)');

  await sharp(Buffer.from(ogAboutSvg)).png().toFile(path.join(publicDir, 'og-about.png'));
  console.log('✓ Created public/og-about.png (1200x630)');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
