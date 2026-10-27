import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const outDir = path.resolve('scratch/redesign-screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Artifact directory
const artifactDir = 'C:\\Users\\Girish Lade\\.gemini\\antigravity-ide\\brain\\1fe03639-1ae7-4e86-8977-14eb576a3d74';

async function copyToArtifacts(filename) {
  const src = path.join(outDir, filename);
  const dest = path.join(artifactDir, filename);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  
  // 1. Desktop 1440x900
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await desktopContext.newPage();

  console.log('Navigating to homepage (Light mode)...');
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  });
  await page.waitForTimeout(500);

  // Desktop Light Fullpage
  await page.screenshot({ path: path.join(outDir, 'desktop-home-light.png'), fullPage: true });
  await copyToArtifacts('desktop-home-light.png');
  console.log('Saved desktop-home-light.png');

  // Hero section light
  const heroLight = page.locator('#hero');
  if (await heroLight.count() > 0) {
    await heroLight.screenshot({ path: path.join(outDir, 'desktop-hero-light.png') });
    await copyToArtifacts('desktop-hero-light.png');
  }

  // Preserved HowItWorks section Light
  const howItWorksLight = page.locator('#how-it-works');
  if (await howItWorksLight.count() > 0) {
    await howItWorksLight.screenshot({ path: path.join(outDir, 'redesign-how-it-works-light.png') });
    await copyToArtifacts('redesign-how-it-works-light.png');
    console.log('Saved redesign-how-it-works-light.png');
  }

  // Preserved FeaturesBento section Light
  const featuresLight = page.locator('#features');
  if (await featuresLight.count() > 0) {
    await featuresLight.screenshot({ path: path.join(outDir, 'redesign-features-bento-light.png') });
    await copyToArtifacts('redesign-features-bento-light.png');
    console.log('Saved redesign-features-bento-light.png');
  }

  // Header language switcher open (Light)
  const headerLangBtn = page.locator('header [data-lang-trigger]').first();
  await headerLangBtn.click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, 'header-lang-open-light.png'), clip: { x: 900, y: 0, width: 540, height: 450 } });
  await copyToArtifacts('header-lang-open-light.png');
  console.log('Saved header-lang-open-light.png');

  // Close header switcher
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);

  // Footer language switcher open (Light)
  const footerLangBtn = page.locator('footer [data-lang-trigger]').first();
  if (await footerLangBtn.count() > 0) {
    await footerLangBtn.scrollIntoViewIfNeeded();
    await footerLangBtn.click();
    await page.waitForTimeout(300);
    const footerBox = await footerLangBtn.boundingBox();
    if (footerBox) {
      await page.screenshot({
        path: path.join(outDir, 'footer-lang-open-light.png'),
        clip: {
          x: Math.max(0, footerBox.x - 100),
          y: Math.max(0, footerBox.y - 320),
          width: 350,
          height: 380,
        },
      });
      await copyToArtifacts('footer-lang-open-light.png');
      console.log('Saved footer-lang-open-light.png');
    }
    await page.keyboard.press('Escape');
  }

  // 2. Switch to Dark Mode Desktop
  console.log('Switching to Dark mode...');
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });
  await page.waitForTimeout(500);

  // Desktop Dark Fullpage
  await page.screenshot({ path: path.join(outDir, 'desktop-home-dark.png'), fullPage: true });
  await copyToArtifacts('desktop-home-dark.png');
  console.log('Saved desktop-home-dark.png');

  // Preserved HowItWorks section Dark
  if (await howItWorksLight.count() > 0) {
    await howItWorksLight.screenshot({ path: path.join(outDir, 'redesign-how-it-works-dark.png') });
    await copyToArtifacts('redesign-how-it-works-dark.png');
    console.log('Saved redesign-how-it-works-dark.png');
  }

  // Preserved FeaturesBento section Dark
  if (await featuresLight.count() > 0) {
    await featuresLight.screenshot({ path: path.join(outDir, 'redesign-features-bento-dark.png') });
    await copyToArtifacts('redesign-features-bento-dark.png');
    console.log('Saved redesign-features-bento-dark.png');
  }

  // 3. Inner Pages (Desktop)
  const innerPages = [
    { url: 'http://localhost:4321/apps', name: 'apps-page' },
    { url: 'http://localhost:4321/docs', name: 'docs-page' },
    { url: 'http://localhost:4321/gb-coder', name: 'gb-coder-page' },
    { url: 'http://localhost:4321/blog', name: 'blog-index-page' },
    { url: 'http://localhost:4321/blog/gb-coder-dual-engine-architecture', name: 'blog-article-page' },
  ];

  for (const item of innerPages) {
    await page.goto(item.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(outDir, `${item.name}-dark.png`) });
    await copyToArtifacts(`${item.name}-dark.png`);
    console.log(`Saved ${item.name}-dark.png`);
  }

  await desktopContext.close();

  // 4. Mobile 390x844 (iPhone 12/13/14)
  console.log('Testing Mobile Viewport...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  });
  const mobilePage = await mobileContext.newPage();

  // Mobile Light
  await mobilePage.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await mobilePage.evaluate(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  });
  await mobilePage.waitForTimeout(300);
  await mobilePage.screenshot({ path: path.join(outDir, 'mobile-home-light.png'), fullPage: true });
  await copyToArtifacts('mobile-home-light.png');
  console.log('Saved mobile-home-light.png');

  // Mobile Menu + Switcher
  const mobileMenuBtn = mobilePage.locator('[data-menu-open]');
  if (await mobileMenuBtn.count() > 0) {
    await mobileMenuBtn.click();
    await mobilePage.waitForTimeout(400);

    // Open language switcher in mobile drawer
    const drawerLangBtn = mobilePage.locator('[data-mobile-sheet] [data-lang-trigger]');
    if (await drawerLangBtn.count() > 0) {
      await drawerLangBtn.click();
      await mobilePage.waitForTimeout(300);
      await mobilePage.screenshot({ path: path.join(outDir, 'mobile-menu-lang-open.png') });
      await copyToArtifacts('mobile-menu-lang-open.png');
      console.log('Saved mobile-menu-lang-open.png');
    }
  }

  // Mobile Dark
  await mobilePage.evaluate(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });
  await mobilePage.reload({ waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: path.join(outDir, 'mobile-home-dark.png'), fullPage: true });
  await copyToArtifacts('mobile-home-dark.png');
  console.log('Saved mobile-home-dark.png');

  await mobileContext.close();

  // 5. Tablet 768x1024 (iPad Mini / Portrait)
  console.log('Testing Tablet Viewport...');
  const tabletContext = await browser.newContext({
    viewport: { width: 768, height: 1024 },
  });
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await tabletPage.evaluate(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });
  await tabletPage.waitForTimeout(300);
  await tabletPage.screenshot({ path: path.join(outDir, 'tablet-home-dark.png') });
  await copyToArtifacts('tablet-home-dark.png');
  console.log('Saved tablet-home-dark.png');

  await tabletContext.close();
  await browser.close();
  console.log('All QA screenshots captured and copied to artifacts!');
}

run().catch((err) => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
