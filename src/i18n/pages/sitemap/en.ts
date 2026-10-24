import type { SitemapPageData } from './types';

export const enSitemap: SitemapPageData = {
  seo: {
    title: 'Sitemap & Site Directory | LadeStack',
    description: 'Explore the full human-readable directory of LadeStack: developer tools, documentation, architecture guides, and platform resources.',
    ogTitle: 'LadeStack Sitemap & Site Directory',
    ogDescription: 'A complete directory of all pages, tools, documentation, and technical articles across LadeStack.',
  },
  hero: {
    badge: 'Navigation & Index',
    title: 'Site Index & Directory',
    description: 'A complete, accessible directory of all pages, tools, documentation, and engineering publications on the LadeStack platform.',
  },
  sections: {
    corePlatform: {
      title: 'Core Platform Routes',
      items: [
        { title: 'Home', href: '/', desc: 'Platform landing page featuring live tool showcase and interactive code demo' },
        { title: 'About LadeStack', href: '/about', desc: 'Founder biography, engineering principles, and verified product portfolio' },
        { title: 'GB Coder', href: '/gb-coder', desc: 'Browser-native IDE with Monaco Editor, Static Editor, and Advanced WebContainer environment' },
        { title: 'Products & Utilities', href: '/apps', desc: 'Verified catalog of in-browser client-side developer utilities' },
        { title: 'Documentation', href: '/docs', desc: 'Technical specifications, architecture guides, and platform release history' },
        { title: 'Support Center', href: '/support', desc: 'Technical assistance channels, browser compatibility guides, and FAQ' },
        { title: 'Contact Us', href: '/contact', desc: 'Direct founder inbox, engineering channels, and feedback forms' },
      ],
    },
    tools: {
      title: 'Developer Tools & Applications',
      openTool: 'Open Tool',
      comingSoon: 'Coming Soon',
      live: 'Live',
    },
    blogArchive: {
      title: 'Engineering Blog Archive (27 Articles)',
      notice: 'Note: Engineering blog articles are currently available in English only. Complete multilingual translation of articles is scheduled for Phase 3.',
      visitBlog: 'Visit Blog Index →',
    },
    legal: {
      title: 'Legal & Privacy Governance',
      items: [
        { title: 'Privacy Policy', href: '/privacy', desc: 'Client-side processing architecture, data boundaries, and local storage policy' },
        { title: 'Terms of Service', href: '/terms', desc: 'Commercial usage rights, licensing terms, and liability limitations' },
      ],
    },
  },
};
