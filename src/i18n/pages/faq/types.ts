/**
 * src/i18n/pages/faq/types.ts
 * Type definitions for the dedicated FAQ page across all 9 supported languages.
 */

export interface FaqPageData {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  nav: {
    generalTab: string;
    gbCoderTab: string;
  };
  generalSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  gbCoderSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cta: {
    title: string;
    description: string;
    contactBtn: string;
    docsBtn: string;
  };
}
