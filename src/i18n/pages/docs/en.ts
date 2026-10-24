import type { DocsPageData } from './types';

export const enDocs: DocsPageData = {
  seo: {
    title: 'Documentation – Architecture, Guides & API Reference | LadeStack',
    description: 'Comprehensive documentation for LadeStack developer tools. Architecture guides, client-side WebAssembly workflows, and platform changelog.',
    ogTitle: 'LadeStack Developer Documentation',
    ogDescription: 'Technical specifications, architecture guides, and tutorials for GB Coder, LS PDF, and LS Image tools.',
  },
  hero: {
    badge: 'Technical Documentation',
    title: 'Developer Documentation',
    description: 'Technical specifications, execution architecture guides, and reference material for the LadeStack developer platform.',
    searchPlaceholder: 'Search documentation, tools, guides…',
    searchAriaLabel: 'Search documentation, tools, guides',
  },
  categoriesSection: {
    title: 'Core Architecture Guides',
    description: 'Select an architecture category below to view detailed operational specifications.',
    viewGuide: 'View Guide',
    closeGuide: 'Close Guide',
    categories: [
      {
        id: 'getting-started',
        icon: 'book-open',
        title: 'Getting Started',
        description: 'Core design principles, browser execution model, and local-first workflows',
        overview: 'LadeStack tools execute in the user browser without routing confidential payload data through remote backend processing servers.',
        sections: [
          {
            title: 'Direct Browser Execution',
            content: 'Launch tools instantly without installation. Client-side WebAssembly binaries and Web Workers initialize directly in local browser memory.',
          },
          {
            title: 'Local Storage & Memory Scope',
            content: 'Project files and uploaded documents reside strictly within browser RAM and IndexedDB. No files are transmitted to LadeStack servers. Optional AI features connect to external APIs only when explicitly enabled.',
          },
          {
            title: 'Exporting Production Bundles',
            content: 'Export compiled static web assets, modified PDF documents, or compressed image formats immediately to local storage.',
          },
        ],
      },
      {
        id: 'code-studio',
        icon: 'code-2',
        title: 'GB Coder Engine',
        description: 'Static Editor compilation, WebContainer Node.js emulation, and Monaco integration',
        overview: 'Detailed breakdown of the dual-engine architecture in GB Coder: lightweight Static Editor and Advanced WebContainer IDE.',
        sections: [
          {
            title: 'Dual Engine Architecture',
            content: 'The Static Editor parses HTML, CSS, and JavaScript in-browser with zero initialization delay. The Advanced WebContainer IDE provisions a local Node.js environment in Chromium browsers for running dev servers and npm packages.',
          },
          {
            title: 'Monaco Editor Integration',
            content: 'Desktop-class code editing with syntax highlighting, auto-completion, diagnostic overlays, and keyboard shortcuts.',
          },
          {
            title: 'Local Persistence & Export',
            content: 'Automatic project saving to browser IndexedDB with zero-dependency ZIP archive export for local deployment.',
          },
        ],
      },
      {
        id: 'pdf-wasm',
        icon: 'file-text',
        title: 'LS PDF Toolkit',
        description: 'Client-side PDF manipulation powered by WebAssembly with in-memory isolation',
        overview: 'How WebAssembly handles binary PDF stream parsing and manipulation directly within client browser memory.',
        sections: [
          {
            title: 'Merging & Splitting Streams',
            content: 'Concatenate multiple PDF documents or extract custom page ranges locally without quality loss or server roundtrips.',
          },
          {
            title: 'In-Memory Compression',
            content: 'Optimizes stream dictionary objects and compresses embedded assets locally to minimize final file weight.',
          },
          {
            title: 'Client-Side Security',
            content: 'Encrypt and password-protect PDF documents entirely in browser RAM before disk export.',
          },
        ],
      },
      {
        id: 'image-engine',
        icon: 'image',
        title: 'LS Image Engine',
        description: 'Multi-format canvas and WebAssembly image processing with instant preview',
        overview: 'Client-side image conversion, compression, and visual difference comparison using Web Workers.',
        sections: [
          {
            title: 'Broad Format Support',
            content: 'Full client-side support for modern web standards including AVIF, WebP, PNG, JPEG, SVG, and TIFF.',
          },
          {
            title: 'Quality Calibration',
            content: 'Adjust lossy compression thresholds and chroma subsampling with real-time before-and-after visual inspection.',
          },
        ],
      },
    ],
  },
  articlesSection: {
    title: 'Featured Technical Articles',
    description: 'Technical walkthroughs covering security, privacy boundaries, and asset optimization.',
    readArticle: 'Read Full Article',
    closeArticle: 'Close Article',
    stepsTitle: 'Execution Steps:',
    summaryLabel: 'Summary:',
    articles: [
      {
        id: 'client-side-privacy',
        title: 'Understanding Client-Side Privacy Architecture',
        category: 'Security',
        readTime: '4 min read',
        intro: 'How LadeStack protects sensitive user documents through local WebAssembly isolation and browser sandbox execution.',
        steps: [
          'Browser memory sandbox allocation via Web Workers.',
          'Local WebAssembly byte processing without remote transmission.',
          'Isolated IndexedDB storage for state retention.',
          'Immediate garbage collection upon browser tab close.',
        ],
        summary: 'By keeping data processing on the client machine, LadeStack eliminates server-side document storage risks while ensuring swift processing speeds.',
      },
      {
        id: 'optimizing-assets',
        title: 'Best Practices for Web Asset Compression',
        category: 'Performance',
        readTime: '6 min read',
        intro: 'Techniques to reduce image payloads and document transfer sizes without noticeable perceptual degradation.',
        steps: [
          'Select next-generation AVIF or WebP targets for raster graphics.',
          'Calibrate lossy quantization parameters against perceptual visual difference.',
          'Strip redundant EXIF camera metadata and color profiles.',
          'Audit resulting Largest Contentful Paint (LCP) impact on mobile devices.',
        ],
        summary: 'Targeted client-side compression reduces bandwidth consumption and delivers measurable Core Web Vitals improvements.',
      },
    ],
  },
  changelogSection: {
    title: 'Platform Release History',
    description: 'Recent platform releases, architectural enhancements, and capability expansions.',
    items: [
      {
        version: 'v1.0.0',
        date: 'October 2026',
        type: 'Major Release',
        description: 'Obsidian & Precision Emerald redesign, complete 9-language internationalization, improved accessibility, and client-side performance enhancements.',
      },
      {
        version: 'v0.9.4',
        date: 'August 2026',
        type: 'Improvement',
        description: 'Expanded client-side PDF document manipulation tools with optimized in-memory compression in the LS PDF suite.',
      },
      {
        version: 'v0.9.0',
        date: 'June 2026',
        type: 'Feature',
        description: 'Initial public launch of GB Coder browser-native dual-engine development environment.',
      },
    ],
  },
};
