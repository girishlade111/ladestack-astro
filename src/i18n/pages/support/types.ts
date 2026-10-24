/**
 * src/i18n/pages/support/types.ts
 * Type definitions for the localized Support Center page.
 */

export interface SupportChannel {
  icon: string;
  title: string;
  description: string;
  responseTime: string;
  action: string;
  href: string;
}

export interface SupportFAQ {
  question: string;
  answer: string;
}

export interface SupportPageData {
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
  channelsSection: {
    heading: string;
    channels: SupportChannel[];
  };
  faqSection: {
    badge: string;
    title: string;
    description: string;
    faqs: SupportFAQ[];
    ctaText: string;
  };
}
