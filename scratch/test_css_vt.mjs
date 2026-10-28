import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { background: #090D16; color: white; min-height: 100vh; margin: 0; font-family: sans-serif; }
        body.light { background: #F8FAFC; color: #090D16; }
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
      </style>
    </head>
    <body>
      <div style="padding: 40px;">
        <h1>Theme Test</h1>
        <button id="toggle" style="padding: 12px 20px;">Toggle Theme</button>
      </div>

      <script>
        const btn = document.getElementById('toggle');
        btn.addEventListener('click', () => {
          const rect = btn.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          const maxRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
          );

          // Dynamic style tag for CSS keyframe animation
          const styleId = 'theme-vt-dynamic-style';
          let styleEl = document.getElementById(styleId);
          if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = styleId;
            document.head.appendChild(styleEl);
          }

          const duration = 700;
          styleEl.textContent = \`
            @keyframes ls-theme-expand {
              from {
                clip-path: circle(0px at \${x}px \${y}px);
              }
              to {
                clip-path: circle(\${maxRadius}px at \${x}px \${y}px);
              }
            }
            ::view-transition-new(root) {
              animation: ls-theme-expand \${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
            }
            ::view-transition-old(root) {
              animation: none !important;
            }
          \`;

          const transition = document.startViewTransition(() => {
            document.body.classList.toggle('light');
          });

          transition.finished.finally(() => {
            if (styleEl && styleEl.parentNode) {
              styleEl.remove();
            }
            console.log('Transition completed cleanly!');
          });
        });
      </script>
    </body>
    </html>
  `);

  page.on('console', msg => console.log('PAGE:', msg.text()));

  console.log('Triggering click...');
  await page.click('#toggle');

  // Check midway through animation (350ms)
  await page.waitForTimeout(350);
  const midClip = await page.evaluate(() => {
    // In Chromium, we can inspect computed style or check if transition is active
    return document.documentElement.classList.contains('light');
  });
  console.log('Midway check:', midClip);

  await page.waitForTimeout(450);
  console.log('Finished waiting.');

  await browser.close();
}

test().catch(console.error);

