/**
 * src/i18n/pages/docs/types.ts
 * Type definitions for the localized Documentation & Guides page.
 */

export interface DocSection {
  title: string;
  content: string;
}

export interface DocCategory {
  id: string;
  icon: string;
  title: string;
  description: string;
  overview: string;
  sections: DocSection[];
}

export interface DocArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  intro: string;
  steps: string[];
  summary: string;
}

export interface ChangelogItem {
  version: string;
  date: string;
  type: string;
  description: string;
}

export interface DocsPageData {
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
    searchPlaceholder: string;
    searchAriaLabel: string;
  };
  categoriesSection: {
    title: string;
    description: string;
    viewGuide: string;
    closeGuide: string;
    categories: DocCategory[];
  };
  articlesSection: {
    title: string;
    description: string;
    readArticle: string;
    closeArticle: string;
    stepsTitle: string;
    summaryLabel: string;
    articles: DocArticle[];
  };
  changelogSection: {
    title: string;
    description: string;
    items: ChangelogItem[];
  };
}
