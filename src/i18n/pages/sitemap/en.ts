import type { SitemapPageData } from './types';

export const enSitemap: SitemapPageData = {
  seo: {
    title: 'Sitemap & Site Directory | LadeStack',
    description: 'Explore the full human-readable directory of LadeStack: developer tools, documentation, architecture guides, legal governance, and platform resources.',
    ogTitle: 'LadeStack Sitemap & Site Directory',
    ogDescription: 'A complete directory of all pages, tools, documentation, and technical articles across LadeStack.',
  },
  hero: {
    badge: 'Navigation & Index',
    title: 'Site Index & Directory',
    description: 'A complete, accessible directory of all pages, live developer utilities, architecture guides, and engineering publications on the LadeStack platform.',
  },
  sections: {
    corePlatform: {
      title: 'Core Platform Routes',
      items: [
        { title: 'Home', href: '/', desc: 'Platform landing page featuring live tool showcase, Obsidian design system, and client-side code demonstrations' },
        { title: 'About LadeStack', href: '/about', desc: 'Engineering principles, local-first philosophy, architecture standards, and verified product portfolio' },
        { title: 'GB Coder IDE', href: '/gb-coder', desc: 'In-browser IDE with Monaco Editor, Static Execution Engine, and Advanced WebContainer Node.js environment' },
        { title: 'Products & Utilities', href: '/apps', desc: 'Verified catalog of in-browser client-side developer utilities, including LS PDF, MD2PDF, Swift Resume, and Bharat Land Converter' },
        { title: 'Documentation & Guides', href: '/docs', desc: 'Comprehensive technical specifications, operational architecture guides, and platform release history' },
        { title: 'Support Center', href: '/support', desc: 'Technical assistance channels, browser compatibility specifications, FAQs, and contact forms' },
        { title: 'Contact Us', href: '/contact', desc: 'Direct engineering inbox (admin@ladestack.in), GitHub issue tracker (github.com/girishlade111), and inquiry forms' },
      ],
    },
    tools: {
      title: 'Developer Tools & Applications (Direct Web Links)',
      openTool: 'Launch Tool',
      comingSoon: 'Coming Soon',
      live: 'Live Web App',
    },
    blogArchive: {
      title: 'Engineering Blog Archive (27 Technical Articles)',
      notice: 'Note: Engineering blog articles are currently available in English. Complete multilingual translation across all 9 languages is scheduled for Phase 3.',
      visitBlog: 'Visit Blog Index →',
    },
    legal: {
      title: 'Legal & Privacy Governance',
      items: [
        { title: 'Privacy Policy', href: '/privacy', desc: '100% client-side data protection, zero-upload document architecture, local IndexedDB persistence, and GDPR/DPDP Act compliance' },
        { title: 'Terms of Service', href: '/terms', desc: '100% user IP ownership over outputs, free commercial licensing, client-side runtime terms, and limitation of liability' },
      ],
    },
  },
};
