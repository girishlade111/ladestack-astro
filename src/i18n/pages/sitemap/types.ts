/**
 * src/i18n/pages/sitemap/types.ts
 * Type definitions for the localized Sitemap & Directory page.
 */

export interface SitemapRouteItem {
  title: string;
  href: string;
  desc: string;
}

export interface SitemapPageData {
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
  sections: {
    corePlatform: {
      title: string;
      items: SitemapRouteItem[];
    };
    tools: {
      title: string;
      openTool: string;
      comingSoon: string;
      live: string;
    };
    blogArchive: {
      title: string;
      notice: string;
      visitBlog: string;
    };
    legal: {
      title: string;
      items: SitemapRouteItem[];
    };
  };
}
