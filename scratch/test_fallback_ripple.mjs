import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { background: #090D16; color: white; min-height: 100vh; margin: 0; font-family: sans-serif; transition: background 0.3s; }
        body.light { background: #F8FAFC; color: #090D16; }
      </style>
    </head>
    <body>
      <div style="padding: 40px;">
        <h1>Fallback Ripple Test</h1>
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

          const isDark = !document.body.classList.contains('light');
          const newThemeIsDark = !isDark;
          const targetBg = newThemeIsDark ? '#090D16' : '#F8FAFC';

          const overlay = document.createElement('div');
          overlay.style.cssText = \`
            position: fixed;
            inset: 0;
            width: 100vw;
            height: 100vh;
            z-index: 999999;
            pointer-events: none;
            background-color: \${targetBg};
            clip-path: circle(0px at \${x}px \${y}px);
            will-change: clip-path;
          \`;
          document.body.appendChild(overlay);

          const duration = 700;
          const anim = overlay.animate(
            [
              { clipPath: \`circle(0px at \${x}px \${y}px)\` },
              { clipPath: \`circle(\${maxRadius}px at \${x}px \${y}px)\` }
            ],
            {
              duration: duration,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
              fill: 'forwards'
            }
          );

          // Apply theme switch at 80% of animation so seamless under the circle
          setTimeout(() => {
            document.body.classList.toggle('light');
          }, duration * 0.7);

          anim.onfinish = () => {
            overlay.remove();
            console.log('Fallback ripple finished and removed cleanly!');
          };
        });
      </script>
    </body>
    </html>
  `);

  page.on('console', msg => console.log('PAGE:', msg.text()));

  await page.click('#toggle');
  await page.waitForTimeout(800);

  const hasClass = await page.evaluate(() => document.body.classList.contains('light'));
  console.log('Light class applied:', hasClass);

  await browser.close();
}

test().catch(console.error);
