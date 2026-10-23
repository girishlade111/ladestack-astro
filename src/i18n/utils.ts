/**
 * LadeStack i18n Utilities
 * Helper functions for locale resolution, route translation, and hreflang links.
 */

import { DEFAULT_LOCALE, LOCALES, LOCALE_CONFIG, isValidLocale, type Locale } from './config';
import type { UIStrings } from './ui/en';
import { en } from './ui/en';
import { ja } from './ui/ja';
import { ko } from './ui/ko';
import { zh } from './ui/zh';
import { ru } from './ui/ru';
import { tr } from './ui/tr';
import { fr } from './ui/fr';
import { pt } from './ui/pt';
import { es } from './ui/es';

export const TRANSLATIONS: Record<Locale, UIStrings> = {
  en,
  ja,
  ko,
  zh,
  ru,
  tr,
  fr,
  pt,
  es,
};

export type TranslationKey = keyof UIStrings;

/**
 * Returns a translation function for a specific locale.
 */
export function useTranslations(locale: Locale = DEFAULT_LOCALE) {
  const dictionary = TRANSLATIONS[locale] ?? TRANSLATIONS[DEFAULT_LOCALE];
  const fallback = TRANSLATIONS[DEFAULT_LOCALE];

  return function t(key: TranslationKey): string {
    return dictionary[key] ?? fallback[key] ?? key;
  };
}

export { isValidLocale };

/**
 * Extracts the current locale from a URL or pathname.
 * Root or unprefixed paths return the default locale 'en'.
 */
export function getLangFromUrl(url: URL | string): Locale {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const segments = pathname.replace(/^\/+/, '').split('/');
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment) && firstSegment !== DEFAULT_LOCALE) {
    return firstSegment;
  }

  return DEFAULT_LOCALE;
}

/**
 * Strips any locale prefix from a pathname.
 * Examples:
 *   '/ja' => '/'
 *   '/ja/' => '/'
 *   '/ja/apps' => '/apps'
 *   '/about' => '/about'
 */
export function stripLocaleFromPath(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const segments = normalized.replace(/^\/+/, '').split('/');
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment) && firstSegment !== DEFAULT_LOCALE) {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }

  return normalized;
}

/**
/**
 * Known routes that have verified localized versions.
 * In Phase 2A: only the homepage ('/') is localized into all 9 languages.
 * Future phases (2B, 3) will expand this list.
 */
export const LOCALIZED_ROUTES: readonly string[] = ['/'];

/**
 * Checks if a given route has localized versions.
 */
export function isRouteLocalized(pathname: string): boolean {
  const basePath = stripLocaleFromPath(pathname);
  return LOCALIZED_ROUTES.includes(basePath);
}

/**
 * Generates the localized path for a given route and target locale.
 * Respects unprefixed default locale 'en' and trailingSlash: 'never'.
 * Only prefixes routes that have confirmed localized versions to prevent broken 404 links.
 *
 * Examples:
 *   getLocalizedPath('/', 'en') => '/'
 *   getLocalizedPath('/', 'ja') => '/ja'
 *   getLocalizedPath('/apps', 'ja') => '/apps' (un-localized route falls back to canonical)
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  const basePath = stripLocaleFromPath(pathname);

  if (targetLocale === DEFAULT_LOCALE) {
    return basePath;
  }

  // If this route is not localized, return base English path to prevent 404s
  if (!isRouteLocalized(basePath)) {
    return basePath;
  }

  if (basePath === '/') {
    return `/${targetLocale}`;
  }

  return `/${targetLocale}${basePath}`;
}

export interface HreflangLink {
  lang: string;
  href: string;
}

/**
 * Generates reciprocal hreflang alternate links for SEO.
 * Only emits alternates for locales where real translated pages exist.
 * When full multi-locale coverage is available, includes x-default.
 */
export function getHreflangLinks(
  pathname: string,
  availableLocales: readonly Locale[] = LOCALES,
  siteUrl: string = 'https://ladestack.in'
): HreflangLink[] {
  // If only 1 locale exists for this route, do not emit fake self-referential hreflangs
  if (availableLocales.length <= 1) {
    return [];
  }

  const links: HreflangLink[] = [];

  for (const loc of availableLocales) {
    const locPath = getLocalizedPath(pathname, loc);
    const fullUrl = `${siteUrl}${locPath === '/' ? '' : locPath}`;
    links.push({
      lang: loc,
      href: fullUrl,
    });
  }

  // If default locale 'en' is available, set x-default to the default English URL
  if (availableLocales.includes(DEFAULT_LOCALE)) {
    const defaultPath = getLocalizedPath(pathname, DEFAULT_LOCALE);
    const defaultUrl = `${siteUrl}${defaultPath === '/' ? '' : defaultPath}`;
    links.push({
      lang: 'x-default',
      href: defaultUrl,
    });
  }

  return links;
}
