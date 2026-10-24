/**
 * src/i18n/pages/privacy/types.ts
 * Type definitions for the localized Privacy Policy page.
 */

export interface PrivacySection {
  title: string;
  paragraphs: string[];
  listItems?: string[];
}

export interface PrivacyPageData {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  header: {
    badge: string;
    title: string;
    lastUpdated: string;
    effectiveDate: string;
  };
  disclaimer: {
    title: string;
    text: string;
  };
  highlights: Array<{
    icon: string;
    text: string;
  }>;
  sections: PrivacySection[];
  contactNote: {
    title: string;
    text: string;
    email: string;
  };
}
