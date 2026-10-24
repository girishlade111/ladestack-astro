import type { SupportPageData } from './types';

export const zhSupport: SupportPageData = {
  seo: {
    title: '支持中心 – 帮助、技术文档与常见问题 | LadeStack',
    description: '获取 LadeStack 开发者工具的技术支持。查阅架构文档、排查指南，或直接联系我们的工程团队。',
    ogTitle: 'LadeStack 支持中心 – 帮助与常见问题',
    ogDescription: '获取关于工具架构、数据处理隐私与浏览器兼容性的明确解答，或直接联系 LadeStack。',
  },
  hero: {
    badge: '支持与协助',
    title: '我们能为您提供什么帮助？',
    description: '排查工作流问题、查阅技术文档、了解本地数据处理规范，或直接与我们的工程团队取得联系。',
  },
  channelsSection: {
    heading: '支持渠道',
    channels: [
      {
        icon: 'mail',
        title: '邮件直接支持',
        description: '直接联系创始人与工程团队，咨询系统架构、提交缺陷报告或探讨技术合作。',
        responseTime: '1至2个工作日内',
        action: 'admin@ladestack.in',
        href: 'mailto:admin@ladestack.in',
      },
      {
        icon: 'book-open',
        title: '技术文档库',
        description: '全面介绍 GB Coder 架构、客户端 WebAssembly 工具与本地执行环境要求的使用指南。',
        responseTime: '即时自主查阅',
        action: '查阅文档',
        href: '/docs',
      },
      {
        icon: 'message-square',
        title: 'GitHub 社区',
        description: '在我们的官方 GitHub 仓库提交开源 Issue、功能建议并参与技术讨论。',
        responseTime: '公开工单追踪',
        action: '访问 GitHub 仓库',
        href: 'https://github.com/girishlade111',
      },
    ],
  },
  faqSection: {
    badge: '帮助与常见问题',
    title: '常见问题解答',
    description: '关于商业授权、文档隐私处理、浏览器兼容性及技术支持的真实说明。',
    faqs: [
      {
        question: 'LadeStack 工具可以免费用于商业项目吗？',
        answer: '可以。在 GB Coder 中编写的代码以及通过 LS PDF Toolkit 和 LS Image Compressor 生成的处理成果，均可自由用于个人与商业客户项目，无需支付任何平台版税。',
      },
      {
        question: '在处理文档和代码时，数据是如何管理的？',
        answer: 'LS PDF Toolkit 和 LS Image Compressor 等客户端工具使用 WebAssembly 与 Canvas API 在浏览器本地内存中执行处理，文件绝不会上传到 LadeStack 服务器。对于 GB Coder，项目文件完整保留在浏览器的 IndexedDB 本地数据库中，除非您主动配置并调用可选的第三方 AI API。',
      },
      {
        question: 'LadeStack 工具支持哪些浏览器？',
        answer: 'LS PDF Toolkit、LS Image Compressor 和 GB Coder Static Editor 在所有现代主流浏览器（Chrome、Firefox、Safari、Edge）中均可稳定运行。对于 GB Coder Advanced IDE 的 WebContainer 容器，Chromium 内核浏览器（Chrome、Edge、Brave 等）提供最完备的支持；Firefox 具备部分支持，Safari 则存在已知的 WebContainer 沙箱运行限制。',
      },
      {
        question: '如何反馈软件缺陷或提出新功能建议？',
        answer: '您可以通过访问 github.com/girishlade111 仓库提交 Issue，或将可复现的详细步骤发送至邮箱 admin@ladestack.in。',
      },
      {
        question: '客户端工具支持离线使用吗？',
        answer: '静态工具（如 LS PDF Toolkit 和 LS Image Compressor）在初次加载到浏览器缓存后，由于运算完全依赖本地 CPU，可以在没有网络连接的情况下正常工作。',
      },
    ],
    ctaText: '直接联系技术支持',
  },
};
