import type { PrivacyPageData } from './types';

export const enPrivacy: PrivacyPageData = {
  seo: {
    title: 'Privacy Policy – Data Protection & Architecture | LadeStack',
    description: 'Learn how LadeStack protects your data through client-side WebAssembly execution, local IndexedDB persistence, and transparent data practices.',
    ogTitle: 'LadeStack Privacy Policy',
    ogDescription: 'Client-side processing architecture, data handling practices, and user privacy boundaries at LadeStack.',
  },
  header: {
    badge: 'Privacy & Data Protection',
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated: October 2026',
    effectiveDate: 'Effective Immediately',
  },
  disclaimer: {
    title: 'Authoritative Version Notice',
    text: 'The English version of this Privacy Policy represents the authoritative statement of LadeStack’s privacy practices. Translations into other languages are provided for informational and convenience purposes only and have not been certified by independent legal counsel.',
  },
  highlights: [
    { icon: 'shield-check', text: 'Client-Side Execution' },
    { icon: 'lock', text: 'No Server Storage for Files' },
    { icon: 'check-circle', text: 'Local-First Architecture' },
  ],
  sections: [
    {
      title: '1. Client-Side Processing Architecture',
      paragraphs: [
        'LadeStack designs developer tools with a local-first architectural principle. Core utilities — including the LS PDF Toolkit, LS Image Compressor, and GB Coder Static Editor — execute directly within your browser runtime using WebAssembly, Web Workers, and HTML5 Canvas APIs.',
        'Files that you manipulate (such as PDF documents, images, and static code) are processed locally in your browser’s volatile memory. These files are not transmitted to or stored on LadeStack backend servers during manipulation.',
      ],
    },
    {
      title: '2. Information We Collect and Network Interactions',
      paragraphs: [
        'We do not require account registration, login credentials, or payment card details to access public developer tools on this website. Network interactions are structured as follows:',
      ],
      listItems: [
        'Basic web server access logs: standard diagnostic information including browser user-agent, referring URL, and requested resource paths for infrastructure monitoring and DDoS mitigation.',
        'Optional third-party AI integrations: in GB Coder, users may optionally configure external AI provider API keys. Outbound API requests are made directly between the user’s browser environment and the designated third-party API endpoint.',
        'Voluntary communications: inquiries sent to admin@ladestack.in through email clients are processed solely to respond to your specific inquiry.',
      ],
    },
    {
      title: '3. Local Storage and Cookies',
      paragraphs: [
        'LadeStack uses browser local storage mechanisms (such as localStorage and IndexedDB) exclusively for necessary functional purposes: preserving user interface preferences (such as dark or light theme) and persisting project files within GB Coder across page reloads.',
        'We do not deploy third-party advertising tracking pixels or commercial marketing cookies.',
      ],
    },
    {
      title: '4. Data Retention and Erasure',
      paragraphs: [
        'Because files processed by LS PDF Toolkit and LS Image Compressor reside solely in local memory, closing or refreshing the browser tab purges volatile working data from system RAM.',
        'For GB Coder projects saved to IndexedDB, users retain full control and can delete local workspaces directly from their browser at any time by clearing site data.',
      ],
    },
  ],
  contactNote: {
    title: '5. Contact and Privacy Inquiries',
    text: 'If you have questions regarding this Privacy Policy or our architectural data handling boundaries, please contact our engineering team at:',
    email: 'admin@ladestack.in',
  },
};
