import type { DocsPageData } from './types';

export const enDocs: DocsPageData = {
  seo: {
    title: 'Documentation – Architecture, Guides & API Reference | LadeStack',
    description: 'Comprehensive documentation for LadeStack developer tools. Architecture guides, client-side WebAssembly workflows, GB Coder dual-engine, and platform changelog.',
    ogTitle: 'LadeStack Developer Documentation & Architecture Guides',
    ogDescription: 'Technical specifications, execution architecture guides, and tutorials for GB Coder, LS PDF, MD2PDF, Swift Resume, and Bharat Land Converter.',
  },
  hero: {
    badge: 'Technical Documentation',
    title: 'Developer Documentation',
    description: 'Technical specifications, execution architecture guides, and operational references for the LadeStack developer platform and client-side web utilities.',
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
        overview: 'LadeStack tools execute in the user browser without routing confidential payload data through remote backend processing servers. All computing is kept strictly client-side.',
        sections: [
          {
            title: 'Direct Browser Execution & Zero-Install Runtime',
            content: 'LadeStack applications initialize instantaneously without requiring command-line installations, system dependencies, or local environment configurations. Client-side WebAssembly binaries, Web Workers, and JavaScript libraries load directly into volatile browser RAM.',
          },
          {
            title: 'Local Storage & Memory Scope (RAM & IndexedDB)',
            content: 'Working documents and source code reside exclusively within browser memory (RAM) and local IndexedDB databases. Files are never uploaded to remote servers during manipulation. Optional AI features connect directly from the client to third-party endpoints only when explicitly configured.',
          },
          {
            title: 'Hardware-Level Thread Isolation via Web Workers',
            content: 'Heavy computation tasks — such as binary PDF byte manipulation, image re-encoding, and syntax parsing — are offloaded to dedicated Web Workers. This ensures that the browser UI thread remains fluid at a constant 60 FPS during intensive file processing.',
          },
          {
            title: 'Exporting Production Bundles & Local Artifacts',
            content: 'Compiled static web assets, modified PDF documents, rendered Markdown files, and ATS-optimized resumes are serialized and exported directly to local disk as vector files or ZIP archives with zero network transmission.',
          },
        ],
      },
      {
        id: 'code-studio',
        icon: 'code-2',
        title: 'GB Coder Engine',
        description: 'Static Editor compilation, WebContainer Node.js emulation, and Monaco integration (code.ladestack.in)',
        overview: 'Detailed breakdown of the dual-engine architecture in GB Coder (https://code.ladestack.in/): lightweight Static Editor and Advanced WebContainer IDE.',
        sections: [
          {
            title: 'Dual Engine Architecture: Static Editor vs. WebContainers',
            content: 'GB Coder offers two complementary execution models. The Static Editor parses HTML5, CSS3, and JavaScript in-browser with zero initialization delay inside a sandboxed iframe. The Advanced WebContainer IDE provisions a local Node.js environment in Chromium and Firefox browsers for running dev servers, npm packages, and terminal commands directly inside the browser tab.',
          },
          {
            title: 'Monaco Editor Integration & Language Services',
            content: 'Desktop-class code editing powered by Microsoft Monaco Editor. Features include syntax highlighting, intelligent code auto-completion, live TypeScript diagnostic overlays, multi-cursor editing, bracket matching, and standard keyboard shortcuts.',
          },
          {
            title: 'Local Persistence & Zero-Dependency ZIP Export',
            content: 'Projects, folder structures, and active buffers are asynchronously persisted to browser IndexedDB, surviving page refreshes and browser restarts. Developers can export their complete project as a standalone ZIP archive at any moment for local hosting.',
          },
          {
            title: 'Bring-Your-Own-Key (BYOK) AI Code Assistance',
            content: 'Optional AI code generation connects directly from your browser to external providers (such as OpenAI, Anthropic, or Google Gemini) using your private API key. Outbound requests are unproxied, and keys remain stored in local encrypted browser state.',
          },
        ],
      },
      {
        id: 'pdf-wasm',
        icon: 'file-text',
        title: 'LS PDF & MD2PDF Suites',
        description: 'Client-side PDF manipulation powered by WebAssembly & Markdown compilation (pdf & md2pdf.ladestack.in)',
        overview: 'How WebAssembly and browser layout engines handle binary PDF streams, cross-reference tables, and Markdown AST parsing directly in browser RAM with zero server uploads.',
        sections: [
          {
            title: 'In-Memory WebAssembly PDF Stream Processing',
            content: 'LS PDF (https://pdf.ladestack.in/) utilizes WebAssembly binaries and pdf-lib to parse binary cross-reference (XRef) tables, embedded font dictionaries, and stream objects directly in browser memory without sending a single byte over the wire.',
          },
          {
            title: '17 Client-Side PDF Toolkit Operations',
            content: 'Complete suite of 17 utilities: merging multiple documents, splitting custom page ranges, in-memory stream compression, page rotation, page reordering, watermark stamping, and 128/256-bit AES password encryption before disk download.',
          },
          {
            title: 'MD2PDF Markdown Parsing & KaTeX Typesetting',
            content: 'MD2PDF (https://md2pdf.ladestack.in/) converts GitHub-Flavored Markdown (GFM) into publication-grade vector PDF documents. It includes live KaTeX LaTeX mathematical typesetting, PrismJS syntax highlighting, and reactive split-screen preview.',
          },
          {
            title: 'Print CSS & High-Fidelity Vector PDF Generation',
            content: 'Precision `@page` dimensioning (A4, Letter, Legal), custom margin controls, and CSS page-break rules (`break-inside: avoid`) ensure crisp vector typography and accurate pagination without raster artifacting.',
          },
        ],
      },
      {
        id: 'image-engine',
        icon: 'layers',
        title: 'Productivity Engines',
        description: 'Bharat Land Converter, Swift Resume Builder, and LS Image Compressor (land & resume.ladestack.in)',
        overview: 'Client-side image conversion, precise regional Indian land unit metrology, and ATS-optimized resume compilation running entirely in-browser.',
        sections: [
          {
            title: 'Bharat Land Converter: State-Wise Metrology Math',
            content: 'Bharat Land Converter (https://land.ladestack.in/) algorithmically maps traditional Indian regional land metrics (Bigha, Guntha, Ground, Cent, Biswa, Kanal, Marla, Kattha) to international SI standards (Acre, Hectare, Sq Meter, Sq Foot) with state-specific conversion factors.',
          },
          {
            title: 'Swift Resume: ATS Optimization & Vector Compilation',
            content: 'Swift Resume (https://resume.ladestack.in/) features structured JSON data schemas optimized for Applicant Tracking Systems (ATS). Users create modular professional profiles with live preview and generate clean, single-page vector PDFs.',
          },
          {
            title: 'LS Image Compressor: Multi-Format WebAssembly Codecs',
            content: 'LS Image Compressor (https://img.ladestack.in/) converts and compresses AVIF, WebP, PNG, JPEG, SVG, and TIFF formats using the HTML5 Canvas API and WebAssembly codecs with real-time before-and-after visual inspection.',
          },
          {
            title: 'Offline Capability & Progressive Web Architecture',
            content: 'All tools are designed to function offline once cached in the browser. Service workers and local storage allow continuous productivity without an active internet connection.',
          },
        ],
      },
    ],
  },
  articlesSection: {
    title: 'Featured Technical Articles',
    description: 'Technical walkthroughs covering security, privacy boundaries, in-browser compilation, and asset optimization.',
    readArticle: 'Read Full Article',
    closeArticle: 'Close Article',
    stepsTitle: 'Execution Architecture & Steps:',
    summaryLabel: 'Architectural Summary:',
    articles: [
      {
        id: 'client-side-privacy',
        title: 'Understanding Client-Side Privacy Architecture',
        category: 'Security',
        readTime: '4 min read',
        intro: 'How LadeStack protects sensitive user documents through local WebAssembly isolation, zero-upload processing, and browser sandbox execution.',
        steps: [
          'Browser memory sandbox allocation via Web Workers.',
          'Local WebAssembly byte processing without remote transmission.',
          'Isolated IndexedDB storage for state retention.',
          'Immediate garbage collection upon browser tab close.',
        ],
        summary: 'By keeping data processing on the client machine, LadeStack eliminates server-side document storage risks while ensuring swift processing speeds.',
      },
      {
        id: 'gb-coder-architecture',
        title: 'Inside GB Coder: Dual-Engine WebContainers & Monaco Architecture',
        category: 'IDE Architecture',
        readTime: '6 min read',
        intro: 'Deep dive into running local Node.js environments and static web applications directly inside modern browser tabs with zero server lag.',
        steps: [
          'Monaco Editor initialization with language server protocol (LSP) and syntax tokenization.',
          'Static Editor iframe isolation with postMessage event streaming for live preview.',
          'WebContainer POSIX virtualization boot via WebAssembly and SharedArrayBuffer.',
          'In-browser npm package resolution, terminal emulator binding, and hot module replacement.',
        ],
        summary: 'GB Coder brings desktop IDE productivity to the web by executing full Node.js runtimes locally within Chromium and Firefox environments.',
      },
      {
        id: 'optimizing-assets',
        title: 'Best Practices for Web Asset Compression',
        category: 'Performance',
        readTime: '5 min read',
        intro: 'Techniques to reduce image payloads and document transfer sizes without noticeable perceptual degradation using client-side codecs.',
        steps: [
          'Select next-generation AVIF or WebP targets for raster graphics.',
          'Calibrate lossy quantization parameters against perceptual visual difference.',
          'Strip redundant EXIF camera metadata and color profiles.',
          'Audit resulting Largest Contentful Paint (LCP) impact on mobile devices.',
        ],
        summary: 'Targeted client-side compression reduces bandwidth consumption and delivers measurable Core Web Vitals improvements.',
      },
      {
        id: 'markdown-pdf-compilation',
        title: 'High-Fidelity Document Compilation: Markdown & KaTeX to Vector PDF',
        category: 'Document Engine',
        readTime: '5 min read',
        intro: 'Architectural walkthrough of MD2PDF: compiling GitHub-Flavored Markdown and LaTeX math formulas into publication-grade vector PDF files.',
        steps: [
          'Markdown string tokenization into an Abstract Syntax Tree (AST).',
          'Mathematical expression detection and KaTeX mathematical typesetting pass.',
          'PrismJS syntax token injection for highlighted source code blocks.',
          'Print CSS rule application with page-break controls and browser PDF print serialization.',
        ],
        summary: 'MD2PDF enables researchers and engineers to produce beautiful academic papers and technical documentation in-browser with zero server roundtrips.',
      },
    ],
  },
  changelogSection: {
    title: 'Platform Release History',
    description: 'Recent platform releases, architectural enhancements, and capability expansions across the LadeStack ecosystem.',
    items: [
      {
        version: 'v1.0.0',
        date: 'October 2026',
        type: 'Major Release',
        description: 'Obsidian & Precision Emerald redesign, complete 9-language internationalization, improved accessibility, MD2PDF suite integration, and client-side performance enhancements.',
      },
      {
        version: 'v0.9.6',
        date: 'September 2026',
        type: 'New Product',
        description: 'Launch of MD2PDF in-browser Markdown to vector PDF compiler with KaTeX math rendering and custom print CSS themes.',
      },
      {
        version: 'v0.9.4',
        date: 'August 2026',
        type: 'Improvement',
        description: 'Expanded client-side PDF document manipulation tools with optimized in-memory compression in the LS PDF suite.',
      },
      {
        version: 'v0.9.2',
        date: 'July 2026',
        type: 'Feature',
        description: 'Launch of Bharat Land Converter and Swift Resume ATS-optimized builder with local IndexedDB state management.',
      },
      {
        version: 'v0.9.0',
        date: 'June 2026',
        type: 'Feature',
        description: 'Initial public launch of GB Coder browser-native dual-engine development environment (https://code.ladestack.in/).',
      },
    ],
  },
};
