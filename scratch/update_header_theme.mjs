import fs from 'node:fs';

const filePath = 'src/components/Header.astro';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update duration from 400 to 750
content = content.replace(
  '<AnimatedThemeToggler variant="circle" duration={400}',
  '<AnimatedThemeToggler variant="circle" duration={750}'
);

// 2. Add Mobile Theme Toggle into mobile drawer
const mobileLangTarget = `      {/* Mobile Language Selector */}
      <div class="mt-6 pt-6 border-t border-border">
        <p class="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
          {t('nav.languageSelect')}
        </p>
        <LanguageSwitcher currentLocale={activeLocale} alternateUrls={alternateUrls} class="w-full" />
      </div>`;

const mobileThemeAddition = `      {/* Mobile Language Selector */}
      <div class="mt-6 pt-6 border-t border-border">
        <p class="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
          {t('nav.languageSelect')}
        </p>
        <LanguageSwitcher currentLocale={activeLocale} alternateUrls={alternateUrls} class="w-full" />
      </div>

      {/* Mobile Theme Switcher */}
      <div class="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <span class="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {t('nav.themeToggle')}
        </span>
        <AnimatedThemeToggler variant="circle" duration={750} aria-label={t('nav.themeToggle')} />
      </div>`;

// Check line endings and replace
if (content.includes(mobileLangTarget.replace(/\n/g, '\r\n'))) {
  content = content.replace(
    mobileLangTarget.replace(/\n/g, '\r\n'),
    mobileThemeAddition.replace(/\n/g, '\r\n')
  );
} else if (content.includes(mobileLangTarget)) {
  content = content.replace(mobileLangTarget, mobileThemeAddition);
} else {
  console.error('Could not find mobileLangTarget in Header.astro');
  process.exit(1);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated Header.astro');

