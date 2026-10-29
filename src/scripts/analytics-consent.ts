/**
 * src/scripts/analytics-consent.ts
 * LadeStack Phase 4E — Unified Analytics & Consent Management
 * Google Analytics 4 (G-C6GRNN3J11) + Microsoft Clarity (z5fy1scjjr)
 *
 * Strict Privacy-First Engineering:
 * - Basic Consent Mode (no external script loaded until explicit affirmative consent)
 * - Strict production hostname restriction (ladestack.in only)
 * - Google Consent Mode v2 (analytics_storage, ad_storage, ad_user_data, ad_personalization)
 * - Microsoft Clarity Consent API v2 (analytics_Storage, ad_Storage)
 * - Zero duplicate tag execution, resilient storage fallback, cookie cleanup on revocation
 */

export const GA_MEASUREMENT_ID = 'G-C6GRNN3J11';
export const CLARITY_PROJECT_ID = 'z5fy1scjjr';
export const CONSENT_STORAGE_KEY = 'ladestack-consent';
export const PRODUCTION_HOSTNAME = 'ladestack.in';

export interface ConsentState {
  v: number;
  ts: number;
  essential: true;
  ga: boolean;
  clarity: boolean;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    __ladestack_ga_loaded?: boolean;
    __ladestack_clarity_loaded?: boolean;
    __ladestack_consent_initialized?: boolean;
  }
}

/**
 * Checks whether the current runtime environment is the authorized production domain.
 */
export function isProductionDomain(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.hostname === PRODUCTION_HOSTNAME;
}

/**
 * Retrieves the stored consent state from localStorage with safe error handling.
 */
export function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed && typeof parsed.ga === 'boolean' && typeof parsed.clarity === 'boolean') {
      return parsed;
    }
  } catch {
    // Graceful fallback when localStorage is blocked or throws
  }
  return null;
}

/**
 * Persists user consent state and applies the appropriate tracking transitions.
 */
export function saveConsent(ga: boolean, clarity: boolean): ConsentState {
  const state: ConsentState = {
    v: 1,
    ts: Date.now(),
    essential: true,
    ga,
    clarity,
  };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota or storage access error
  }

  applyConsent(state);
  dispatchConsentEvent(state);
  return state;
}

/**
 * Revokes all optional consent, updates provider signals to denied,
 * clears tracking cookies, and notifies listeners.
 */
export function revokeConsent(): ConsentState {
  const state = saveConsent(false, false);
  clearAnalyticsCookies();
  return state;
}

/**
 * Dispatches a custom DOM event so in-page UI components can reflect state changes.
 */
function dispatchConsentEvent(state: ConsentState): void {
  if (typeof window === 'undefined') return;
  const event = new CustomEvent('ladestack:consent-change', { detail: state });
  window.dispatchEvent(event);
}

/**
 * Sanitizes current page URL by removing sensitive query parameters.
 */
export function getSanitizedLocation(): string {
  if (typeof window === 'undefined') return 'https://ladestack.in/';
  try {
    const url = new URL(window.location.href);
    const sensitiveParams = ['email', 'token', 'auth', 'key', 'code', 'access_token', 'password'];
    sensitiveParams.forEach((param) => url.searchParams.delete(param));
    return url.origin + url.pathname + (url.search ? url.search : '');
  } catch {
    return window.location.origin + window.location.pathname;
  }
}

/**
 * Loads and initializes Google Analytics 4 strictly when authorized.
 */
export function loadGoogleAnalytics(): void {
  if (typeof window === 'undefined') return;
  if (window.__ladestack_ga_loaded) return;

  // Update consent mode to granted for analytics_storage
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  }

  if (!isProductionDomain()) {
    // Non-production test instrumentation: Mark loaded without injecting external tracker
    window.__ladestack_ga_loaded = true;
    console.info(
      `[LadeStack Analytics] Hostname (${window.location.hostname}) != ${PRODUCTION_HOSTNAME}. GA4 mock initialized.`
    );
    return;
  }

  // Inject official Google Tag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.onload = () => {
    window.__ladestack_ga_loaded = true;
  };

  const firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }

  // Initialize config with sanitized location
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: getSanitizedLocation(),
      send_page_view: true,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }
}

/**
 * Loads and initializes Microsoft Clarity strictly when authorized.
 */
export function loadMicrosoftClarity(): void {
  if (typeof window === 'undefined') return;
  if (window.__ladestack_clarity_loaded) return;

  if (!isProductionDomain()) {
    // Non-production test instrumentation: Mark loaded without injecting external tracker
    window.__ladestack_clarity_loaded = true;
    console.info(
      `[LadeStack Analytics] Hostname (${window.location.hostname}) != ${PRODUCTION_HOSTNAME}. Clarity mock initialized.`
    );
    return;
  }

  // Official Microsoft Clarity loader
  (function (c: Window, l: Document, a: string, r: string, i: string) {
    const w = c as unknown as Record<string, unknown>;
    const existing = w[a] as ((...args: unknown[]) => void) & { q?: unknown[] };
    const clarityFn = existing || function (...args: unknown[]) {
      (clarityFn.q = clarityFn.q || []).push(args);
    };
    w[a] = clarityFn;

    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = `https://www.clarity.ms/tag/${i}`;
    t.onload = () => {
      window.__ladestack_clarity_loaded = true;
    };
    const y = l.getElementsByTagName(r)[0];
    if (y && y.parentNode) {
      y.parentNode.insertBefore(t, y);
    } else {
      l.head.appendChild(t);
    }
  })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);

  // Send Clarity Consent v2 signal
  if (typeof window.clarity === 'function') {
    window.clarity('consentv2', {
      ad_Storage: 'denied',
      analytics_Storage: 'granted',
    });
  }
}

/**
 * Removes analytics cookies on consent revocation across all domain variants.
 */
export function clearAnalyticsCookies(): void {
  if (typeof document === 'undefined') return;
  const targetPrefixes = ['_ga', '_gid', '_gat', '_clck', '_clsk', 'CLID', 'ANONCHK', 'MR', 'MUID', 'SM'];
  const cookies = document.cookie.split(';');

  const domains = [
    '',
    window.location.hostname,
    `.${window.location.hostname}`,
    'ladestack.in',
    '.ladestack.in',
  ];

  for (const cookie of cookies) {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    const shouldDelete = targetPrefixes.some((p) => name === p || name.startsWith(`${p}_`));

    if (shouldDelete) {
      for (const domain of domains) {
        const domainAttr = domain ? `; domain=${domain}` : '';
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainAttr}`;
      }
    }
  }
}

/**
 * Applies a given consent state to active trackers.
 */
export function applyConsent(consent: ConsentState): void {
  // 1. Google Analytics
  if (consent.ga) {
    loadGoogleAnalytics();
  } else {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  }

  // 2. Microsoft Clarity
  if (consent.clarity) {
    loadMicrosoftClarity();
  } else {
    if (typeof window.clarity === 'function') {
      window.clarity('consentv2', {
        ad_Storage: 'denied',
        analytics_Storage: 'denied',
      });
    }
  }
}

/**
 * Bootstrap function executed once on page load.
 */
export function initAnalyticsManager(): void {
  if (typeof window === 'undefined') return;
  if (window.__ladestack_consent_initialized) return;
  window.__ladestack_consent_initialized = true;

  const stored = getStoredConsent();
  if (stored) {
    applyConsent(stored);
  }
}

