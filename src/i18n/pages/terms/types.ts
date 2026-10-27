/**
 * src/i18n/pages/terms/types.ts
 * Type definitions for the localized Terms of Service page.
 */

export interface TermsSection {
  title: string;
  paragraphs: string[];
  listItems?: string[];
}

export interface TermsPageData {
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
  sections: TermsSection[];
  contactNote: {
    title: string;
    text: string;
    email: string;
  };
}
