import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { background: white; color: black; }
        body.dark { background: black; color: white; }
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
      </style>
    </head>
    <body>
      <button id="toggle">Toggle</button>
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

          const transition = document.startViewTransition(() => {
            document.body.classList.toggle('dark');
          });

          transition.ready.then(() => {
            const anim = document.documentElement.animate(
              {
                clipPath: [
                  \`circle(0px at \${x}px \${y}px)\`,
                  \`circle(\${maxRadius}px at \${x}px \${y}px)\`
                ]
              },
              {
                duration: 500,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)'
              }
            );
            window.__anim = anim;
            console.log('Animation created successfully:', anim);
          }).catch(err => {
            console.error('Ready error:', err);
            window.__err = err.message;
          });
        });
      </script>
    </body>
    </html>
  `);

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  await page.click('#toggle');
  await page.waitForTimeout(600);

  const animState = await page.evaluate(() => {
    return {
      hasAnim: !!window.__anim,
      playState: window.__anim?.playState,
      err: window.__err
    };
  });
  console.log('Animation state:', animState);

  await browser.close();
}

test().catch(console.error);
