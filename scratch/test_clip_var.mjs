import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        :root {
          --clip-from: circle(0px at 100px 100px);
          --clip-to: circle(500px at 100px 100px);
        }
        @keyframes expand {
          from { clip-path: var(--clip-from); }
          to { clip-path: var(--clip-to); }
        }
        #box {
          width: 300px;
          height: 300px;
          background: red;
          animation: expand 1s linear infinite;
        }
      </style>
    </head>
    <body>
      <div id="box"></div>
      <script>
        const el = document.getElementById('box');
        setTimeout(() => {
          const comp = getComputedStyle(el).clipPath;
          window.__clip = comp;
        }, 500);
      </script>
    </body>
    </html>
  `);

  await page.waitForTimeout(600);
  const clip = await page.evaluate(() => window.__clip);
  console.log('Computed clipPath at 500ms:', clip);

  await browser.close();
}

test().catch(console.error);

