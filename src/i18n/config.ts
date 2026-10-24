/**
 * LadeStack i18n Configuration
 * Strictly supports exactly nine languages:
 * en (default, unprefixed), ja, ko, zh, ru, tr, fr, pt, es.
 * Negative constraints: NO Hindi, German, or Dutch. Language-only tags.
 */

export const LOCALES = ['en', 'ja', 'ko', 'zh', 'ru', 'tr', 'fr', 'pt', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleMeta {
  code: Locale;
  name: string; // Native name
  englishName: string;
  ogLocale: string;
  dir: 'ltr' | 'rtl';
}

export const LOCALE_CONFIG: Record<Locale, LocaleMeta> = {
  en: {
    code: 'en',
    name: 'English',
    englishName: 'English',
    ogLocale: 'en_US',
    dir: 'ltr',
  },
  ja: {
    code: 'ja',
    name: '日本語',
    englishName: 'Japanese',
    ogLocale: 'ja_JP',
    dir: 'ltr',
  },
  ko: {
    code: 'ko',
    name: '한국어',
    englishName: 'Korean',
    ogLocale: 'ko_KR',
    dir: 'ltr',
  },
  zh: {
    code: 'zh',
    name: '简体中文',
    englishName: 'Chinese',
    ogLocale: 'zh_CN',
    dir: 'ltr',
  },
  ru: {
    code: 'ru',
    name: 'Русский',
    englishName: 'Russian',
    ogLocale: 'ru_RU',
    dir: 'ltr',
  },
  tr: {
    code: 'tr',
    name: 'Türkçe',
    englishName: 'Turkish',
    ogLocale: 'tr_TR',
    dir: 'ltr',
  },
  fr: {
    code: 'fr',
    name: 'Français',
    englishName: 'French',
    ogLocale: 'fr_FR',
    dir: 'ltr',
  },
  pt: {
    code: 'pt',
    name: 'Português',
    englishName: 'Portuguese',
    ogLocale: 'pt_PT',
    dir: 'ltr',
  },
  es: {
    code: 'es',
    name: 'Español',
    englishName: 'Spanish',
    ogLocale: 'es_ES',
    dir: 'ltr',
  },
};

export const NON_DEFAULT_LOCALES = LOCALES.filter((loc) => loc !== DEFAULT_LOCALE);

/**
 * Checks whether a string is a supported locale.
 */
export function isValidLocale(lang: string | undefined | null): lang is Locale {
  if (!lang) return false;
  return (LOCALES as readonly string[]).includes(lang);
}

/**
 * Central Route Availability Registry
 * Explicitly records which locales possess real, verified translations for each route.
 * Guarantees:
 * - Hreflang alternates are ONLY emitted for routes with confirmed translations.
 * - Language switcher fallback is transparent, predictable, and never generates 404 links.
 */
export const ROUTE_LOCALE_REGISTRY: Record<string, readonly Locale[]> = {
  '/': LOCALES, // Homepage exists in all 9 languages
  '/about': LOCALES,
  '/gb-coder': LOCALES,
  '/apps': LOCALES,
  '/docs': ['en'],
  '/blog': ['en'],
  '/contact': LOCALES,
  '/support': LOCALES,
  '/privacy': ['en'],
  '/terms': ['en'],
  '/sitemap': ['en'],
};
