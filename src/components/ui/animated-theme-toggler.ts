/**
 * Animated Theme Toggler helpers and View Transitions API clip-path engine.
 * Supports: circle, square, triangle, diamond, hexagon, rectangle, star.
 * Universal support for Desktop, Tablet, and Mobile across all engines:
 * - Chromium (Chrome/Edge desktop & Android)
 * - WebKit (Safari 18+ on iOS/macOS via dynamic CSS keyframes)
 * - Universal fallback ripple for non-supporting browsers (Firefox, iOS <18, in-app WebViews)
 */

export type TransitionVariant =
  | "circle"
  | "square"
  | "triangle"
  | "diamond"
  | "hexagon"
  | "rectangle"
  | "star";

export function polygonCollapsed(point: string, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => point).join(", ");
  return `polygon(${pairs})`;
}

export function getThemeTransitionClipPaths(
  variant: TransitionVariant = "circle",
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number
): [string, string] {
  const toX = (x: number) => `${(x / viewportWidth) * 100}%`;
  const toY = (y: number) => `${(y / viewportHeight) * 100}%`;
  const point = (x: number, y: number) => `${toX(x)} ${toY(y)}`;

  switch (variant) {
    case "circle":
      return [
        `circle(0px at ${cx}px ${cy}px)`,
        `circle(${Math.ceil(maxRadius)}px at ${cx}px ${cy}px)`,
      ];
    case "square": {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const halfSide = Math.max(halfW, halfH) * 1.05;
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ].join(", ");
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }
    case "triangle": {
      const scale = maxRadius * 2.2;
      const dx = (Math.sqrt(3) / 2) * scale;
      const verts = [
        point(cx, cy - scale),
        point(cx + dx, cy + 0.5 * scale),
        point(cx - dx, cy + 0.5 * scale),
      ].join(", ");
      return [polygonCollapsed(point(cx, cy), 3), `polygon(${verts})`];
    }
    case "diamond": {
      const R = maxRadius * Math.SQRT2;
      const end = [
        point(cx, cy - R),
        point(cx + R, cy),
        point(cx, cy + R),
        point(cx - R, cy),
      ].join(", ");
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }
    case "hexagon": {
      const R = maxRadius * Math.SQRT2;
      const verts: string[] = [];
      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 3;
        verts.push(point(cx + R * Math.cos(a), cy + R * Math.sin(a)));
      }
      return [
        polygonCollapsed(point(cx, cy), 6),
        `polygon(${verts.join(", ")})`,
      ];
    }
    case "rectangle": {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const end = [
        point(cx - halfW, cy - halfH),
        point(cx + halfW, cy - halfH),
        point(cx + halfW, cy + halfH),
        point(cx - halfW, cy + halfH),
      ].join(", ");
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }
    case "star": {
      const R = maxRadius * Math.SQRT2 * 1.03;
      const innerRatio = 0.42;
      const starPolygon = (radius: number) => {
        const verts: string[] = [];
        for (let i = 0; i < 5; i++) {
          const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
          verts.push(
            point(
              cx + radius * Math.cos(outerA),
              cy + radius * Math.sin(outerA)
            )
          );
          const innerA = outerA + Math.PI / 5;
          verts.push(
            point(
              cx + radius * innerRatio * Math.cos(innerA),
              cy + radius * innerRatio * Math.sin(innerA)
            )
          );
        }
        return `polygon(${verts.join(", ")})`;
      };
      const startR = Math.max(2, R * 0.025);
      return [starPolygon(startR), starPolygon(R)];
    }
    default:
      return [
        `circle(0px at ${cx}px ${cy}px)`,
        `circle(${Math.ceil(maxRadius)}px at ${cx}px ${cy}px)`,
      ];
  }
}

export interface ThemeTransitionOptions {
  button?: HTMLElement | null;
  variant?: TransitionVariant;
  duration?: number;
  fromCenter?: boolean;
  theme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
}

export function executeThemeTransition(options: ThemeTransitionOptions = {}): void {
  const {
    button = null,
    variant = "circle",
    duration = 750,
    fromCenter = false,
    theme,
    onThemeChange,
  } = options;

  const root = document.documentElement;
  if (root.dataset.magicuiThemeVt === "active") return;

  const isControlled = theme !== undefined;
  const isDarkNow = isControlled ? theme === "dark" : root.classList.contains("dark");
  const newTheme = !isDarkNow;

  const applyTheme = () => {
    root.classList.toggle("dark", newTheme);
    try {
      localStorage.setItem("ladestack-theme", newTheme ? "dark" : "light");
      localStorage.setItem("theme", newTheme ? "dark" : "light");
    } catch {}
    if (onThemeChange) {
      onThemeChange(newTheme ? "dark" : "light");
    }
  };

  // Viewport calculation with visualViewport support for mobile dynamic toolbars
  const viewportWidth =
    window.visualViewport?.width ||
    window.innerWidth ||
    document.documentElement.clientWidth;
  const viewportHeight =
    window.visualViewport?.height ||
    window.innerHeight ||
    document.documentElement.clientHeight;

  let x: number;
  let y: number;
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

  const clipPath = getThemeTransitionClipPaths(
    variant,
    x,
    y,
    maxRadius,
    viewportWidth,
    viewportHeight
  );

  const [clipFrom, clipTo] = clipPath;

  const hasViewTransition =
    typeof document.startViewTransition === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── FALLBACK FOR BROWSERS WITHOUT VIEW TRANSITIONS (iOS <18, Firefox, WebViews) ──
  if (!hasViewTransition) {
    const targetBg = newTheme ? "#090D16" : "#F8FAFC";
    const overlay = document.createElement("div");
    overlay.id = "theme-transition-fallback-ripple";
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      z-index: 999999;
      pointer-events: none;
      background-color: ${targetBg};
      clip-path: ${clipFrom};
      -webkit-clip-path: ${clipFrom};
      will-change: clip-path;
    `;
    document.body.appendChild(overlay);

    const switchTimer = setTimeout(() => {
      applyTheme();
    }, duration * 0.55);

    try {
      const anim = overlay.animate(
        [
          { clipPath: clipFrom, webkitClipPath: clipFrom },
          { clipPath: clipTo, webkitClipPath: clipTo },
        ],
        {
          duration,
          easing: variant === "star" ? "linear" : "cubic-bezier(0.4, 0, 0.2, 1)",
          fill: "forwards",
        }
      );

      const cleanupFallback = () => {
        clearTimeout(switchTimer);
        applyTheme();
        if (overlay.parentNode) {
          overlay.remove();
        }
      };

      anim.onfinish = cleanupFallback;
      anim.oncancel = cleanupFallback;
    } catch (e) {
      clearTimeout(switchTimer);
      applyTheme();
      if (overlay.parentNode) overlay.remove();
    }
    return;
  }

  // ── NATIVE VIEW TRANSITIONS (CHROME / EDGE / SAFARI 18+) ──
  root.dataset.magicuiThemeVt = "active";
  root.style.setProperty("--magicui-theme-toggle-vt-duration", `${duration}ms`);
  root.style.setProperty("--magicui-theme-vt-clip-from", clipFrom);
  root.style.setProperty("--magicui-theme-vt-clip-to", clipTo);

  // Injected CSS keyframes for WebKit (Safari 18) and compositor-accelerated animation
  const styleId = "magicui-theme-vt-keyframes";
  let dynamicStyle = document.getElementById(styleId) as HTMLStyleElement | null;
  if (!dynamicStyle) {
    dynamicStyle = document.createElement("style");
    dynamicStyle.id = styleId;
    document.head.appendChild(dynamicStyle);
  }

  dynamicStyle.textContent = `
    @keyframes magicui-theme-expand {
      0% {
        clip-path: ${clipFrom};
        -webkit-clip-path: ${clipFrom};
      }
      100% {
        clip-path: ${clipTo};
        -webkit-clip-path: ${clipTo};
      }
    }
    ::view-transition-new(root) {
      animation: magicui-theme-expand ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
      mix-blend-mode: normal !important;
      z-index: 2 !important;
    }
    ::view-transition-old(root) {
      animation: none !important;
      mix-blend-mode: normal !important;
      z-index: 1 !important;
    }
  `;

  let activeAnim: Animation | null = null;
  const cleanup = () => {
    delete root.dataset.magicuiThemeVt;
    root.style.removeProperty("--magicui-theme-toggle-vt-duration");
    root.style.removeProperty("--magicui-theme-vt-clip-from");
    root.style.removeProperty("--magicui-theme-vt-clip-to");
    if (dynamicStyle && dynamicStyle.parentNode) {
      dynamicStyle.remove();
    }
    if (activeAnim) {
      try {
        activeAnim.cancel();
      } catch {}
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
      ready
        .then(() => {
          try {
            const anim = root.animate(
              {
                clipPath: [clipFrom, clipTo],
              },
              {
                duration,
                easing: variant === "star" ? "linear" : "cubic-bezier(0.4, 0, 0.2, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
              }
            );
            activeAnim = anim;
          } catch (animErr) {
            // Safari 18 executes the injected CSS keyframe animation smoothly
          }
        })
        .catch(() => {});
    }
  } catch (err) {
    cleanup();
    applyTheme();
  }
}
