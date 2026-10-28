import fs from 'node:fs';

const filePath = 'src/styles/global.css';
let content = fs.readFileSync(filePath, 'utf8');

const target = `/* View Transitions API Animated Theme Toggler */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* Scoped to AnimatedThemeToggler — the toggler sets the data-attribute and the variable only during a theme toggle */
html[data-magicui-theme-vt="active"]::view-transition-group(root) {
  animation-duration: var(--magicui-theme-toggle-vt-duration, 400ms);
}

html[data-magicui-theme-vt="active"]::view-transition-new(root) {
  clip-path: var(--magicui-theme-vt-clip-from, none);
}`;

const replacement = `/* View Transitions API & Mobile Fallback Animated Theme Toggler */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* Scoped to AnimatedThemeToggler — the toggler sets the data-attribute and the variable only during a theme toggle */
html[data-magicui-theme-vt="active"]::view-transition-group(root) {
  animation-duration: var(--magicui-theme-toggle-vt-duration, 750ms);
}

html[data-magicui-theme-vt="active"]::view-transition-new(root) {
  clip-path: var(--magicui-theme-vt-clip-from, none);
}

/* Ensure theme transition animations execute reliably across all devices and mobile battery-saver profiles */
html[data-magicui-theme-vt="active"]::view-transition-group(root),
html[data-magicui-theme-vt="active"]::view-transition-new(root),
html[data-magicui-theme-vt="active"]::view-transition-old(root),
#theme-transition-fallback-ripple {
  animation-duration: var(--magicui-theme-toggle-vt-duration, 750ms) !important;
  animation-iteration-count: 1 !important;
}`;

if (content.includes(target.replace(/\n/g, '\r\n'))) {
  content = content.replace(target.replace(/\n/g, '\r\n'), replacement.replace(/\n/g, '\r\n'));
} else if (content.includes(target)) {
  content = content.replace(target, replacement);
} else {
  console.error('Target not found in global.css');
  process.exit(1);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated global.css');
