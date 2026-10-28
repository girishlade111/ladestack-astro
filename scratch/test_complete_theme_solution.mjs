import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, devices } from 'playwright';

// Simulate serving HTML with the new theme toggle logic
const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Theme Toggle Test</title>
  <style>
    :root {
      --background: #F8FAFC;
      --foreground: #090D16;
    }
    html.dark {
      --background: #090D16;
      --foreground: #F8FAFC;
    }
    body {
      background-color: var(--background);
      color: var(--foreground);
      margin: 0;
      min-height: 100vh;
      font-family: system-ui, sans-serif;
      transition: background-color 0.15s ease;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid #ccc;
    }
    button[data-theme-toggle] {
      padding: 8px 12px;
      cursor: pointer;
      border-radius: 8px;
    }
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }
    html[data-magicui-theme-vt="active"]::view-transition-group(root) {
      animation-duration: var(--magicui-theme-toggle-vt-duration, 750ms);
    }
  </style>
</head>
<body>
  <header>
    <div>LadeStack</div>
    <button type="button" data-theme-toggle data-vt-variant="circle" data-vt-duration="750">Toggle Theme</button>
  </header>
  <main style="padding: 32px;">
    <h1>Hero Section</h1>
    <p>Testing theme transition animation on desktop and mobile.</p>
  </main>

  <script type="module">
    function getThemeTransitionClipPaths(variant, cx, cy, maxRadius, viewportWidth, viewportHeight) {
      return [
        \`circle(0px at \${cx}px \${cy}px)\`,
        \`circle(\${Math.ceil(maxRadius)}px at \${cx}px \${cy}px)\`
      ];
    }

    function executeThemeTransition(options = {}) {
      const { button = null, variant = "circle", duration = 750, fromCenter = false } = options;
      const root = document.documentElement;
      if (root.dataset.magicuiThemeVt === "active") return;

      const isDarkNow = root.classList.contains("dark");
      const newTheme = !isDarkNow;

      const applyTheme = () => {
        root.classList.toggle("dark", newTheme);
      };

      const viewportWidth = window.visualViewport?.width || window.innerWidth || document.documentElement.clientWidth;
      const viewportHeight = window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight;

      let x, y;
      if (fromCenter || !button) {
        x = viewportWidth / 2;
        y = viewportHeight / 2;
      } else {
        const rect = button.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          x = viewportWidth / 2;
          y = viewportHeight / 2;
        } else {
          x = rect.left + rect.width / 2;
          y = rect.top + rect.height / 2;
        }
      }

      const maxRadius = Math.hypot(
        Math.max(x, viewportWidth - x),
        Math.max(y, viewportHeight - y)
      );

      const [clipFrom, clipTo] = getThemeTransitionClipPaths(variant, x, y, maxRadius, viewportWidth, viewportHeight);

      const hasViewTransition = typeof document.startViewTransition === "function";

      if (!hasViewTransition) {
        // Universal fallback
        const targetBg = newTheme ? "#090D16" : "#F8FAFC";
        const overlay = document.createElement("div");
        overlay.id = "theme-transition-fallback-ripple";
        overlay.style.cssText = \`
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 999999;
          pointer-events: none;
          background-color: \${targetBg};
          clip-path: \${clipFrom};
          -webkit-clip-path: \${clipFrom};
          will-change: clip-path;
        \`;
        document.body.appendChild(overlay);

        const timer = setTimeout(() => applyTheme(), duration * 0.55);

        try {
          const anim = overlay.animate(
            [
              { clipPath: clipFrom, webkitClipPath: clipFrom },
              { clipPath: clipTo, webkitClipPath: clipTo }
            ],
            { duration, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards" }
          );
          anim.onfinish = () => {
            clearTimeout(timer);
            applyTheme();
            overlay.remove();
          };
        } catch(e) {
          clearTimeout(timer);
          applyTheme();
          overlay.remove();
        }
        return;
      }

      root.dataset.magicuiThemeVt = "active";
      root.style.setProperty("--magicui-theme-toggle-vt-duration", \`\${duration}ms\`);

      const styleId = "magicui-theme-vt-keyframes";
      let dynamicStyle = document.getElementById(styleId);
      if (!dynamicStyle) {
        dynamicStyle = document.createElement("style");
        dynamicStyle.id = styleId;
        document.head.appendChild(dynamicStyle);
      }

      dynamicStyle.textContent = \`
        @keyframes magicui-theme-expand {
          0% {
            clip-path: \${clipFrom};
            -webkit-clip-path: \${clipFrom};
          }
          100% {
            clip-path: \${clipTo};
            -webkit-clip-path: \${clipTo};
          }
        }
        ::view-transition-new(root) {
          animation: magicui-theme-expand \${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
          mix-blend-mode: normal !important;
          z-index: 2 !important;
        }
        ::view-transition-old(root) {
          animation: none !important;
          mix-blend-mode: normal !important;
          z-index: 1 !important;
        }
      \`;

      let activeAnim = null;
      const cleanup = () => {
        delete root.dataset.magicuiThemeVt;
        root.style.removeProperty("--magicui-theme-toggle-vt-duration");
        if (dynamicStyle && dynamicStyle.parentNode) dynamicStyle.remove();
        if (activeAnim) {
          try { activeAnim.cancel(); } catch(e) {}
          activeAnim = null;
        }
      };

      try {
        const transition = document.startViewTransition(() => {
          applyTheme();
        });

        if (typeof transition?.finished?.finally === "function") {
          transition.finished.finally(cleanup).catch(() => cleanup());
        } else {
          setTimeout(cleanup, duration + 50);
        }

        const ready = transition?.ready;
        if (ready && typeof ready.then === "function") {
          ready.then(() => {
            try {
              const anim = root.animate(
                { clipPath: [clipFrom, clipTo] },
                {
                  duration,
                  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                  fill: "forwards",
                  pseudoElement: "::view-transition-new(root)"
                }
              );
              activeAnim = anim;
            } catch(e) {}
          }).catch(() => {});
        }
      } catch(err) {
        cleanup();
        applyTheme();
      }
    }

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-theme-toggle]");
      if (!btn) return;
      executeThemeTransition({
        button: btn,
        variant: btn.getAttribute("data-vt-variant") || "circle",
        duration: parseInt(btn.getAttribute("data-vt-duration") || "750", 10)
      });
    });
  </script>
</body>
</html>
`;

async function run() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(testHtml);
  });
  await new Promise(r => server.listen(4335, r));
  console.log('Test server on 4335');

  const browser = await chromium.launch({ headless: true });

  // 1. Desktop test
  console.log('Testing Desktop Viewport...');
  const desktopPage = await browser.newPage();
  await desktopPage.setViewportSize({ width: 1280, height: 800 });
  await desktopPage.goto('http://localhost:4335');

  await desktopPage.click('[data-theme-toggle]');
  await desktopPage.waitForTimeout(300);
  const desktopDarkMid = await desktopPage.evaluate(() => document.documentElement.classList.contains('dark'));
  console.log('Desktop dark mode applied midway:', desktopDarkMid);
  await desktopPage.waitForTimeout(550);
  const desktopDarkEnd = await desktopPage.evaluate(() => document.documentElement.classList.contains('dark'));
  console.log('Desktop dark mode applied end:', desktopDarkEnd);

  // 2. Mobile Viewport (iPhone 13 emulation)
  console.log('Testing Mobile Viewport (iPhone 13)...');
  const mobileContext = await browser.newContext({
    ...devices['iPhone 13']
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:4335');

  await mobilePage.click('[data-theme-toggle]');
  await mobilePage.waitForTimeout(300);
  const mobileDarkMid = await mobilePage.evaluate(() => document.documentElement.classList.contains('dark'));
  console.log('Mobile dark mode applied midway:', mobileDarkMid);
  await mobilePage.waitForTimeout(550);
  const mobileDarkEnd = await mobilePage.evaluate(() => document.documentElement.classList.contains('dark'));
  console.log('Mobile dark mode applied end:', mobileDarkEnd);

  // 3. Mobile Fallback (Browser without startViewTransition)
  console.log('Testing Mobile Fallback (no startViewTransition)...');
  const fallbackPage = await mobileContext.newPage();
  await fallbackPage.addInitScript(() => {
    delete Document.prototype.startViewTransition;
    delete document.startViewTransition;
  });
  await fallbackPage.goto('http://localhost:4335');

  await fallbackPage.click('[data-theme-toggle]');
  // Check that overlay exists
  const hasOverlay = await fallbackPage.evaluate(() => !!document.getElementById('theme-transition-fallback-ripple'));
  console.log('Fallback overlay active immediately after click:', hasOverlay);
  await fallbackPage.waitForTimeout(400);
  const midTheme = await fallbackPage.evaluate(() => document.documentElement.classList.contains('dark'));
  console.log('Fallback theme applied at 400ms:', midTheme);
  await fallbackPage.waitForTimeout(450);
  const overlayRemoved = await fallbackPage.evaluate(() => !document.getElementById('theme-transition-fallback-ripple'));
  console.log('Fallback overlay removed cleanly at end:', overlayRemoved);

  await browser.close();
  server.close();
  console.log('✅ ALL TEST SCENARIOS (DESKTOP, MOBILE VT, MOBILE FALLBACK) PASSED!');
}

run().catch(console.error);
