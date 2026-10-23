/**
 * LadeStack i18n Utilities
 * Helper functions for locale resolution, route translation, and hreflang links.
 */

import { DEFAULT_LOCALE, LOCALES, LOCALE_CONFIG, type Locale } from './config';
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

/**
 * Checks whether a string is a supported locale.
 */
export function isValidLocale(lang: string | undefined | null): lang is Locale {
  if (!lang) return false;
  return (LOCALES as readonly string[]).includes(lang);
}

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
 * Generates the localized path for a given route and target locale.
 * Respects unprefixed default locale 'en' and trailingSlash: 'never'.
 *
 * Examples:
 *   getLocalizedPath('/', 'en') => '/'
 *   getLocalizedPath('/', 'ja') => '/ja'
 *   getLocalizedPath('/about', 'en') => '/about'
 *   getLocalizedPath('/about', 'ja') => '/ja/about'
 *   getLocalizedPath('/ja', 'en') => '/'
 *   getLocalizedPath('/ja', 'ko') => '/ko'
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  const basePath = stripLocaleFromPath(pathname);

  if (targetLocale === DEFAULT_LOCALE) {
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
