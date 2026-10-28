/**
 * Chinese (zh) — UI Strings
 * Clean, standard technical Chinese for developer platforms.
 * Preserves brand names: LadeStack, GB Coder, Astro.
 */
import type { UIStrings } from './en';

export const zh: UIStrings = {
  // Navigation
  'nav.platform': '平台',
  'nav.apps': '应用中心',
  'nav.codeStudio': '代码工坊',
  'nav.docs': '文档',
  'nav.blog': '博客',
  'nav.about': '关于我们',
  'nav.support': '技术支持',
  'nav.contact': '联系我们',
  'nav.quickJump': '快速导航',
  'nav.themeToggle': '切换主题',
  'nav.languageSelect': '选择语言',
  'nav.openMenu': '打开菜单',
  'nav.closeMenu': '关闭菜单',

  // Footer
  'footer.tagline': '专为速度与数据隐私而打造的高性能浏览器端开发者工具。',
  'footer.status': '浏览器内 · 本地运行',
  'footer.tools': '开发工具',
  'footer.resources': '资源中心',
  'footer.company': '关于',
  'footer.legal': '条款与政策',
  'footer.rights': '保留所有权利。',
  'footer.emailPrompt': '直接联系工程团队：',
  'footer.copyEmail': '复制邮箱地址',
  'footer.copiedEmail': '已复制到剪贴板！',
  'footer.privacy': '隐私政策',
  'footer.terms': '服务条款',

  // Hero Section
  'hero.badge': '浏览器内本地运行 · 100% 客户端隐私保护',
  'hero.titleLine1': '在浏览器中直接',
  'hero.titleLine2': '构建、编写与优化。',
  'hero.description':
    '基于客户端本地运行的高性能开发者工具套件。无需上传数据至服务器，无付费墙限制，所有工具开箱即用、疾速响应。',
  'hero.ctaPrimary': '探索 17+ 款工具',
  'hero.ctaSecondary': '启动 Studio IDE',
  'hero.ctaSecondaryAria': '在新标签页中启动 GB Coder IDE',
  'hero.editorFileName': 'CodeStudio.tsx',
  'hero.editorTabName': 'PreviewSandbox.html',
  'hero.editorStatus': '浏览器端运行',
  'hero.editorPrivacy': '隐私模式：本地环境',
  'hero.editorNotification': '语法校验与沙箱预览：本地浏览器线程',
  'hero.editorNotificationBadge': '准备就绪',
  'hero.specTitle': '技术架构规格',
  'hero.specRuntime': '本地运行时',
  'hero.specExecutionModel': '执行架构',
  'hero.specExecutionValue': '客户端浏览器原生运行时',
  'hero.specExecutionBadge': '本地',
  'hero.specPrivacy': '数据安全',
  'hero.specPrivacyValue': '零云端存储 · 仅在客户端运算',
  'hero.specPrivacyBadge': '严密',
  'hero.specDistribution': '分发架构',
  'hero.specDistributionValue': '静态预渲染架构',
  'hero.specDistributionBadge': '静态',
  'hero.browserCompatibility': '全面兼容所有现代主流浏览器',
  'hero.viewAppsLink': '查看全部已上线工具 →',

  // Features Bento
  'features.eyebrow': '工具生态',
  'features.title': '为极致性能、隐私防护与数据主权而生',
  'features.subtitle':
    '每一款工具都在您的浏览器运行时中严密执行。无需注册繁琐账户，无云端数据追踪，实现零延迟操作体验。',
  'features.card1Title': 'GB Coder',
  'features.card1Desc':
    '交互式 HTML、CSS 与现代 JavaScript 编辑器，支持实时编译、iframe 独立沙箱预览以及无障碍代码规范化。',
  'features.card1Badge': '旗舰 IDE',
  'features.card2Title': 'LS PDF 工具箱',
  'features.card2Desc':
    '提供 17 项客户端实用工具，在本地内存中直接完成 PDF 合并、拆分、压缩、加密、旋转及格式转换。',
  'features.card2Badge': '17 合 1 套件',
  'features.card3Title': 'LS 图片优化器',
  'features.card3Desc':
    '支持 WebP、AVIF、PNG、JPEG 等 9 种以上主流格式的客户端压缩算法，瞬时实现文件体积大幅瘦身。',
  'features.card3Badge': '零上传',
  'features.card4Title': '开发者效率工具',
  'features.card4Desc':
    '针对实际工程研发工作流精心设计的 ATS 友好型简历生成器与高精度区域换算工具。',
  'features.card4Badge': '生产力',

  // How It Works
  'howItWorks.eyebrow': '简捷高效的工作流',
  'howItWorks.title': 'GB Coder 运作流程',
  'howItWorks.subtitle': '平台上的每一项工具均遵循三条直观透明的基本原则。',
  'howItWorks.step1Num': '01',
  'howItWorks.step1Title': '即开即用，直接访问',
  'howItWorks.step1Desc': '打开任意工具即可立即投入工作。无需账号登录，无需 API 秘钥，亦无需绑定信用卡。',
  'howItWorks.step2Num': '02',
  'howItWorks.step2Title': '客户端本地安全运算',
  'howItWorks.step2Desc': '您的文件、代码片段及素材资源完全在当前设备的内存中安全处理，绝不外泄。',
  'howItWorks.step3Num': '03',
  'howItWorks.step3Title': '即时导出，自主掌控',
  'howItWorks.step3Desc': '处理完毕后即可在本地直接下载成果物，全过程无任何数据经过第三方服务器。',

  // Use Cases
  'useCases.eyebrow': '服务对象',
  'useCases.title': '赋能现代软件工程工作流',
  'useCases.subtitle': '无论是独立全栈开发者，还是对数据合规有严苛要求的企业研发团队。',
  'useCases.case1Title': '前端工程师',
  'useCases.case1Desc': '快速搭建 UI 原型，审查 HTML/CSS/JS 组件结构，并在实时热反馈中验证现代网页设计模式。',
  'useCases.case2Title': '技术研发团队',
  'useCases.case2Desc': '在严格遵循企业内网数据安全政策的前提下，安全压缩与整理专有技术图纸及内部 PDF 资料。',
  'useCases.case3Title': '注重隐私的技术创作者',
  'useCases.case3Desc': '在确保敏感信息绝对不脱离本机设备的前提下，安心进行各项本地化数据与文档处理。',

  // Product Showcase
  'showcase.eyebrow': '精选目录',
  'showcase.title': '探索现已上线的生产级工具',
  'showcase.subtitle': '完全免费、坚固可靠的客户端网页应用程序。',
  'showcase.launchApp': '打开工具',
  'showcase.learnMore': '了解详情',
  'showcase.inBrowser': '浏览器端运行',
  'showcase.viewAllCatalog': '浏览全部应用目录 →',

  // FAQ
  'faq.eyebrow': '常见解答',
  'faq.title': '常见问题',
  'faq.subtitle': '关于 LadeStack 工具套件、数据隐私机制与系统架构的详细解答。',
  'faq.q1': 'LadeStack 的工具是完全免费的吗？',
  'faq.a1':
    '是的。包括 GB Coder、LS PDF 工具箱与 LS 图片优化器在内的所有开发工具，对个人日常使用以及商业客户项目均永久免费。',
  'faq.q2': 'LadeStack 如何保障用户文件与数据的隐私安全？',
  'faq.a2':
    '所有的文档及源代码运算均严格局限在您浏览器本地的沙箱内存之中。任何文件都不会被上传至远程服务器。',
  'faq.q3': '支持哪些网页浏览器？',
  'faq.a3':
    '支持所有具备现代 HTML5 和 Canvas API 支持的常青浏览器，涵盖 Google Chrome、Mozilla Firefox、Apple Safari、Microsoft Edge 以及 Brave。',
  'faq.q4': 'LadeStack 由谁创建并维护？',
  'faq.a4':
    'LadeStack 由创始人 Girish Lade 亲自架构与开发维护，致力于为全球工程师打造纯粹、以隐私为第一基准的平民化开发工具体系。',
  'faq.q5': '我可以使用 LadeStack 做什么？',
  'faq.a5':
    'LadeStack 汇集了开发者工具、代码辅助工具、文档处理工具、图像工具以及各类效率应用。欢迎浏览应用目录页面，探索并挑选契合您工作流程的实用工具。',
  'faq.q6': '使用 LadeStack 工具需要注册账号吗？',
  'faq.a6':
    'LadeStack 的多数工具均可无需创建账号直接使用。个别特定应用可能有不同的要求，建议查阅相应工具页面的详细说明。',
  'faq.q7': '开始使用前是否需要安装任何本地软件？',
  'faq.a7':
    'LadeStack 提供的各项工具可直接在主流支持的现代浏览器中运行。只需进入应用页面选定工具即可即刻使用，无需额外下载或安装任何桌面客户端。',
  'faq.q8': '可以在手机或平板设备上使用 LadeStack 吗？',
  'faq.a8':
    'LadeStack 网站适配桌面端、平板与移动设备。不过，部分复杂的专业级开发工具在大屏幕设备上体验更佳，且可能受到移动端浏览器特性的限制。',
  'faq.q9': '如何上手使用 GB Coder？',
  'faq.a9':
    '通过导航菜单或应用目录打开 GB Coder 页面，点击启动链接即可进入编辑器。GB Coder 为您提供基于浏览器的全能开发环境，方便编写和调试代码。',
  'faq.q10': 'LadeStack 网站支持哪些语言？',
  'faq.a10':
    'LadeStack 官方网站支持英语、日语、韩语、中文、俄语、土耳其语、法语、葡萄牙语和西班牙语。您可以通过导航栏或页脚的语言切换器自由切换。部分独立文章或专属工具的可用语言可能有所不同。',
  'faq.q11': 'LadeStack 支持深色和浅色外观主题吗？',
  'faq.a11':
    '支持。LadeStack 完整提供深色与浅色两种主题以满足您的视觉偏好。点击导航栏中的主题切换按钮即可实时转换，且在同一浏览器的各个页面间会自动保留您的主题选择。',
  'faq.q12': '我可以复制或下载由 LadeStack 工具生成的处理结果吗？',
  'faq.a12':
    '复制和下载功能视具体工具而定。在支持的工具中，您可以使用内置的复制、导出或下载按钮保存结果。请参阅具体工具界面中提供的输出选项。',
  'faq.q13': '如何获取 LadeStack 新发布的工具与升级动态？',
  'faq.a13':
    '您可以访问应用页面查看最新的 LadeStack 工具集合，也可以阅读网站博客了解产品更新、技术深度文章与最新资讯。我们将持续推出新功能与实用工具。',
  'faq.q14': '如何反馈产品缺陷或提出新功能建议？',
  'faq.a14':
    '您可以通过 LadeStack 的联系（Contact）页面提交意见反馈、故障报告或功能建议。报告问题时，请注明所涉及的工具、您的浏览器版本及复现步骤，以便我们迅速跟进排查。',

  // CTA Banner
  'cta.title': '准备好让您的开发工作流倍道而进了吗？',
  'cta.subtitle': '立即体验 LadeStack 浏览器端开发者实用工具套件。无需注册，即刻启程。',
  'cta.button': '浏览全部工具',

  // SEO Metadata
  'seo.homeTitle': 'LadeStack – 浏览器端开发者平台与实用工具套件',
  'seo.homeDescription':
    '高性能浏览器端开发工具：代码编辑器、17 合 1 私密 PDF 工具箱、图片压缩与职业效率工具。完全免费，客户端本地运行。',
  'seo.ogTitle': 'LadeStack – 开发者工具与客户端实用套件',
  'seo.ogDescription':
    '浏览器内代码工作室、私密 PDF 工具箱与图片压缩器。100% 客户端本地运算保护隐私，永久免费。',
};
