# LADESTACK ENTERPRISE DESIGN SYSTEM SPECIFICATION
**Version:** 2.0.0 (Enterprise Redesign)  
**Architecture:** Astro + Tailwind CSS + Semantic HSL Tokens  
**Repository:** `girishlade111/ladestack-astro`  
**Branch:** `feature/phase-4d-enterprise-redesign`

---

## 1. Principles of Enterprise Craft

1. **Restraint Over Decoration:** Zero gratuitous gradients, glowing borders, or arbitrary floating cards. Color and contrast carry structural meaning.
2. **Token-Driven Single Source of Truth:** All color, spacing, radius, and elevation values resolve to CSS custom properties defined in `src/styles/global.css`.
3. **No Fluff & No Slop:** Zero emoji anywhere in code, copy, or icons. No em-dashes in UI labels. No one-sided tinted borders.
4. **Universal Accessibility:** WCAG 2.2 AA compliant contrast across both light and dark themes. 100% keyboard navigable with visible focus states.
5. **Preserved Bento Integrity:** Style isolation (`.preserved-bento-lock`) ensures the locked "How LadeStack operates" workflow section retains its original emerald bento layout and aesthetics.

---

## 2. Design Tokens Architecture

### 2.1 Color Palette & Semantic Roles

```css
:root {
  /* Surface & Base (Light) */
  --background: 210 40% 98%;          /* #f8fafc slate-50 */
  --foreground: 222 47% 11%;          /* #0f172a slate-900 */
  --surface: 0 0% 100%;               /* #ffffff */
  --surface-muted: 210 40% 96%;        /* #f1f5f9 slate-100 */
  --border: 214 32% 91%;              /* #e2e8f0 slate-200 */
  --border-strong: 215 25% 82%;       /* #cbd5e1 slate-300 */
  --muted-foreground: 215 16% 47%;    /* #64748b slate-500 */

  /* Enterprise Brand (Precision Royal Blue) */
  --brand: 221 83% 53%;               /* #2563eb blue-600 */
  --brand-hover: 224 76% 48%;         /* #1d4ed8 blue-700 */
  --brand-foreground: 0 0% 100%;      /* White */
  --brand-subtle: 221 83% 53% / 0.08;
  --brand-border: 221 83% 53% / 0.20;

  /* Semantic Feedback */
  --success: 142 71% 45%;             /* Emerald */
  --destructive: 0 84% 60%;           /* Crimson */
  --warning: 38 92% 50%;              /* Amber */
}

.dark {
  /* Surface & Base (Dark) */
  --background: 222 47% 6%;           /* #0a0f1d deep slate */
  --foreground: 210 40% 98%;          /* #f8fafc */
  --surface: 222 47% 9%;              /* #0d1527 card surface */
  --surface-muted: 217 33% 14%;       /* #172033 secondary surface */
  --border: 217 33% 18%;              /* Hairline card border */
  --border-strong: 217 33% 26%;
  --muted-foreground: 215 20% 65%;

  /* Enterprise Brand (Vibrant Royal Blue) */
  --brand: 217 91% 60%;               /* #3b82f6 blue-500 */
  --brand-hover: 217 91% 68%;         /* #60a5fa blue-400 */
  --brand-foreground: 222 47% 6%;
  --brand-subtle: 217 91% 60% / 0.12;
  --brand-border: 217 91% 60% / 0.28;

  /* Semantic Feedback */
  --success: 142 71% 45%;
  --destructive: 0 84% 60%;
  --warning: 38 92% 50%;
}
```

### 2.2 Preserved Bento Isolation Lock

```css
.preserved-bento-lock {
  --brand: 161 94% 24%;
  --brand-hover: 161 94% 19%;
  --brand-foreground: 0 0% 100%;
  --brand-subtle: 161 94% 24% / 0.08;
  --brand-border: 161 94% 24% / 0.20;
}
.dark .preserved-bento-lock {
  --brand: 160 84% 39%;
  --brand-hover: 158 64% 52%;
  --brand-foreground: 222 47% 6%;
  --brand-subtle: 160 84% 39% / 0.12;
  --brand-border: 160 84% 39% / 0.28;
}
```

---

## 3. Typography Scale

| Token Class | Font Size / Line Height | Tracking | Usage |
| :--- | :--- | :--- | :--- |
| `text-3xl sm:text-5xl md:text-6xl` | 36px–60px / 1.1 | `-0.025em` | Page & Hero Headlines |
| `text-2xl sm:text-3xl` | 24px–30px / 1.25 | `-0.02em` | Section Titles |
| `text-lg sm:text-xl` | 18px–20px / 1.4 | `-0.01em` | Featured Cards & Subtitles |
| `text-base` | 16px / 1.6 | Normal | Primary Body Copy |
| `text-sm` | 14px / 1.5 | Normal | Supporting Descriptions, Meta |
| `text-xs font-mono` | 12px / 1.4 | `0.05em` | Badges, Status Chips, Tags |

---

## 4. Component Rules

* **Buttons (`Button.astro`):**
  * `primary`: Solid royal blue (`bg-brand text-brand-foreground hover:bg-brand-hover`).
  * `secondary`: Subtle outline (`border border-border bg-surface hover:bg-surface-muted text-foreground`).
  * `ghost`: Flat transparent button (`hover:bg-surface-muted text-muted-foreground hover:text-foreground`).
* **Badges (`Badge.astro`):**
  * `brand`: `bg-brand/10 border-brand/20 text-brand`.
  * `success`: `bg-success/10 border-success/20 text-success`.
  * `destructive`: `bg-destructive/10 border-destructive/20 text-destructive`.
* **Cards:**
  * Clean full-boundary hairline borders (`border border-border`).
  * Surface background (`bg-surface`).
  * Soft elevation (`shadow-soft` in light, border luminance in dark).
  * Subtle hover accentuation (`hover:border-brand/40 transition-colors`).
* **Dropdowns & Language Selectors:**
  * Fully keyboard operable (`Tab`, `Escape`, `Enter`).
  * Native `<a>` link fallbacks for zero-JS resilience.
  * Directional positioning support (`down` in header/mobile; `up` in footer).
