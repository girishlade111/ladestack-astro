import type { LandingPageData } from './types';

export const en: LandingPageData = {
  missionVision: {
    eyebrow: 'ABOUT LADESTACK',
    title: 'Building the future of',
    titleHighlight: 'AI development',
    subtitle:
      'An AI-powered SaaS ecosystem designed to give every developer enterprise-grade tools at startup velocity — free, open, and built to last.',
    stats: [
      { value: '8K+', label: 'Developers' },
      { value: '80+', label: 'Projects Built' },
      { value: '100+', label: 'Countries' },
      { value: '99%', label: 'Uptime' },
    ],
    mission: {
      eyebrow: 'Our Mission',
      tagline: 'Why we exist',
      headline: 'Democratize AI tooling',
      body: 'Democratize advanced development tools by providing enterprise-grade AI solutions that dramatically reduce development time — available to every developer, regardless of team size or budget.',
      context:
        "We believe the gap between a solo developer and a FAANG team shouldn't be measured in tooling. When the tools level the playing field, creativity and execution are all that matters.",
      timelineTitle: 'Platform Evolution',
      timeline: [
        {
          year: '2024',
          label: 'Foundation',
          desc: 'Lade Stack born from a vision to democratize AI dev tools.',
          detail: 'Started with a single AI code editor prototype, iterating with 500 early adopters to shape the product direction.',
        },
        {
          year: '2025',
          label: 'Platform Launch',
          desc: 'AI Code Editor shipped to 10,000+ developers worldwide.',
          detail: 'Released full AI Code Editor with real-time compilation, intelligent suggestions, and multi-language support.',
        },
        {
          year: '2026',
          label: 'Full Ecosystem',
          desc: '5 AI-powered products. One unified developer suite.',
          detail: 'API Testing, Website Builder, File Sharing, and Doc AI join the platform — completing the Lade Suite.',
        },
      ],
    },
    vision: {
      eyebrow: 'Our Vision',
      tagline: "Where we're heading",
      headline: 'AI handles complexity',
      body: 'A world where anyone can ship enterprise-quality software — AI handling the complexity, developers focusing on creativity and impact.',
      features: [
        { icon: 'code-2', text: 'AI-powered code assistance' },
        { icon: 'zap', text: 'Intelligent code optimization' },
        { icon: 'shield', text: 'Enterprise-grade security' },
        { icon: 'globe', text: 'Global developer collaboration' },
        { icon: 'users', text: 'Community-driven development' },
        { icon: 'layers', text: 'Unified multi-tool ecosystem' },
      ],
    },
    approach: {
      title: 'Open by default',
      body: 'Core tools open-sourced, roadmap public, pricing transparent. Trust is the only moat that compounds without limits.',
      badges: ['12K+ stars', '200+ contributors', 'Public roadmap'],
    },
  },

  coreValues: {
    eyebrow: 'VALUES & PRINCIPLES',
    title: 'What drives everything',
    titleHighlight: 'we build',
    subtitle:
      'Core engineering principles powering our software architecture, privacy guarantees, and open developer access.',
    values: [
      {
        id: '01',
        number: '01',
        title: 'AI-First Innovation',
        tagline: 'Intelligence in every keystroke',
        badge: 'Context-Aware AI',
        badgeIcon: 'zap',
        description:
          'Cutting-edge AI woven directly into developer tools — automating repetitive tasks and anticipating workflow needs before you even type.',
        bullets: [
          'Context-aware code completions',
          'Multi-language synthesis',
          'Real-time codebase adaptation',
        ],
      },
      {
        id: '02',
        number: '02',
        title: 'Developer Empowerment',
        tagline: 'Enterprise power, zero gatekeeping',
        badge: '100% Free Tier',
        badgeIcon: 'shield-check',
        description:
          'Professional-grade developer tooling made freely accessible to indie hackers and global enterprise teams alike.',
        bullets: [
          'Unlimited free core features',
          'No credit card required',
          'Built-in team collaboration',
        ],
      },
      {
        id: '03',
        number: '03',
        title: 'Production Quality',
        tagline: 'Battle-tested, not beta-grade',
        badge: '99.9% SLA Uptime',
        badgeIcon: 'cpu',
        description:
          'Stress-tested against real enterprise workloads with failover redundancy, zero-downtime deploys, and end-to-end encryption.',
        bullets: [
          '99.9% uptime guarantee',
          'SOC 2 Type II compliance',
          'End-to-end encryption',
        ],
      },
      {
        id: '04',
        number: '04',
        title: 'Open & Transparent',
        tagline: 'Nothing to hide, everything to share',
        badge: 'Open Source',
        badgeIcon: 'git-fork',
        description:
          'Core algorithms open-sourced with a public roadmap and community-driven features. We build in the open because trust compounds.',
        bullets: [
          'Open-source core architecture',
          'Public product roadmap',
          'Community-driven feature votes',
        ],
      },
    ],
    principlesEyebrow: 'Guiding Principles',
    principles: [
      'Open Source',
      'AI-Native',
      'Developer-First',
      'Zero Lock-In',
      'Free Forever',
      'Community-Driven',
      'Transparent',
      'Enterprise-Ready',
      'SOC 2 Compliant',
      'Privacy-First',
    ],
  },

  metricsImpact: {
    eyebrow: 'IMPACT & RESULTS',
    title: 'Numbers that speak',
    titleHighlight: 'for themselves',
    subtitle: 'Real impact on real developers — measurable, repeatable, and growing every day.',
    heroStats: [
      {
        value: '10x',
        label: 'Faster Development',
        sub: 'vs. manual coding',
        icon: 'zap',
      },
      {
        value: '8K+',
        label: 'Active Developers',
        sub: 'worldwide, growing daily',
        icon: 'users',
      },
      {
        value: '99.9%',
        label: 'Platform Uptime',
        sub: 'enterprise-grade SLA',
        icon: 'trending-up',
      },
      {
        value: '98%',
        label: 'Developer Satisfaction',
        sub: 'happiness score',
        icon: 'heart',
      },
    ],
    toolMetricsTitle: 'Workflow Productivity Gains',
    toolMetricsSubtitle: 'Measured acceleration across key developer workflows',
    toolMetrics: [
      {
        tool: 'AI Code Editor',
        icon: 'code-2',
        metrics: [
          { label: 'Code written by AI', value: 73 },
          { label: 'Bug reduction', value: 61 },
          { label: 'Review time saved', value: 55 },
        ],
      },
      {
        tool: 'API Tester',
        icon: 'zap',
        metrics: [
          { label: 'Test coverage boost', value: 88 },
          { label: 'Manual effort cut', value: 79 },
          { label: 'Faster releases', value: 64 },
        ],
      },
      {
        tool: 'Doc Generator',
        icon: 'trending-up',
        metrics: [
          { label: 'Docs time reduced', value: 82 },
          { label: 'Accuracy improved', value: 91 },
          { label: 'Onboarding speed', value: 68 },
        ],
      },
    ],
    benchmarksTitle: 'Reliability & Speed Benchmarks',
    benchmarks: [
      { label: 'Speed Boost', value: '92%', sub: 'Runtime performance gain' },
      { label: 'Uptime SLA', value: '99.9%', sub: 'Continuous availability' },
      { label: 'Satisfaction', value: '98%', sub: 'Developer net promoter score' },
      { label: 'Global Reach', value: '85%', sub: 'Low latency edge distribution' },
    ],
  },

  freeForever: {
    eyebrow: '100% FREE FOREVER PROMISE',
    title: 'Enterprise AI Power.',
    titleHighlight: 'Zero Price Tag.',
    subtitle:
      "We believe high-caliber developer tools shouldn't be locked behind paywalls. Every developer gets enterprise capability with zero credit card required.",
    commitments: [
      {
        number: '01',
        title: 'Unlimited Core AI Tools',
        badge: '5+ Live Products',
        badgeIcon: 'code-2',
        description:
          'Full access to AI Code Editor, 17-in-1 LS PDF Toolkit, LS Image Compressor, Swift Resume, and Bharat Land Converter.',
        bullets: ['No daily usage caps', 'Full feature set included', 'Continuous free updates'],
      },
      {
        number: '02',
        title: 'Zero Paywalls or Trials',
        badge: 'No Credit Card',
        badgeIcon: 'shield-check',
        description:
          'Free forever means free forever — no 14-day trial countdowns, no surprise billing, and no credit card required to start.',
        bullets: ['Instant 1-click access', 'No forced subscription upgrades', 'Free for commercial projects'],
      },
      {
        number: '03',
        title: '100% Privacy & Security',
        badge: 'In-Browser Privacy',
        badgeIcon: 'lock',
        description:
          'PDFs and image processing happen 100% client-side in your browser. Your sensitive files and code never hit external servers.',
        bullets: ['Zero server uploads for files', 'SOC 2 compliance standards', 'Local storage encryption'],
      },
      {
        number: '04',
        title: 'Community & Open Ethos',
        badge: 'Community Driven',
        badgeIcon: 'heart-handshake',
        description:
          'Built in the open with public roadmaps, community-voted features, and open-source foundations shaping our future.',
        bullets: ['Public GitHub roadmap', 'Community feature requests', '8K+ developer community'],
      },
    ],
  },

  developerCommunity: {
    eyebrow: 'DEVELOPER COMMUNITY',
    title: 'Built with developers,',
    titleHighlight: 'for developers',
    subtitle:
      'A thriving open ecosystem where every tool is a conversation between us and the people who use them. Join, contribute, and grow with a global community that ships together.',
    stats: [
      { value: '8K+', label: 'Developers', icon: 'users' },
      { value: '12K+', label: 'Projects Built', icon: 'layers' },
      { value: '100+', label: 'Countries', icon: 'globe' },
      { value: '4.1 / 5', label: 'Avg Rating', icon: 'star' },
    ],
    channelsTitle: 'Community Ecosystem',
    channels: [
      {
        icon: 'code-2',
        label: 'Open Source',
        stat: '2.4K stars',
        description: 'Fork, contribute, and shape the future of AI-powered dev tools with thousands of contributors.',
        cta: 'View on GitHub',
        url: 'https://github.com/girishlade111',
      },
      {
        icon: 'message-square',
        label: 'Discord Community',
        stat: '8K members',
        description: 'Real-time help, project showcases, and collaboration with 8K+ developers worldwide.',
        cta: 'Join Discord',
        url: 'https://discord.gg/ladestack',
      },
      {
        icon: 'book-open',
        label: 'Documentation',
        stat: '200+ guides',
        description: 'Comprehensive guides, API references, and step-by-step tutorials for every skill level.',
        cta: 'Read Docs',
        url: '/docs',
      },
      {
        icon: 'rocket',
        label: 'Starter Templates',
        stat: '60+ templates',
        description: 'Production-ready templates built on best practices. Ship your next project in seconds.',
        cta: 'Browse Templates',
        url: '/apps',
      },
      {
        icon: 'globe',
        label: 'Global Events',
        stat: '24 upcoming',
        description: 'Hackathons, webinars, and workshops hosted worldwide — learn, build, and connect.',
        cta: 'See Events',
        url: '/blog',
      },
      {
        icon: 'zap',
        label: 'Weekly Challenges',
        stat: 'Active weekly',
        description: 'AI-powered coding challenges every week. Earn badges, climb the leaderboard, win prizes.',
        cta: 'Join Challenge',
        url: '/apps',
      },
    ],
  },
};
