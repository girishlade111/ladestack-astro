import type { PrivacyPageData } from './types';

export const zhPrivacy: PrivacyPageData = {
  seo: {
    title: '隐私权政策 – 数据保护与系统架构 | LadeStack',
    description: '了解 LadeStack 如何依托客户端 WebAssembly 执行、本地 IndexedDB 存储与透明规则保障您的数据安全。',
    ogTitle: 'LadeStack 隐私权政策',
    ogDescription: '客户端数据处理架构、数据收集边界与用户隐私保护原则。',
  },
  header: {
    badge: '隐私权与数据保护',
    title: '隐私权政策',
    lastUpdated: '最后更新日期：2026年10月',
    effectiveDate: '即时生效',
  },
  disclaimer: {
    title: '权威版本声明',
    text: '本隐私权政策的英文版本为界定 LadeStack 隐私实践的唯一权威法律文本。其他语言的翻译版本仅为便于阅读与参考而提供，未经独立法律顾问认证。',
  },
  highlights: [
    { icon: 'shield-check', text: '隐私优先分析（需明确授权）' },
    { icon: 'shield-check', text: '纯客户端本地运行' },
    { icon: 'lock', text: '服务器绝不存储文件' },
    { icon: 'check-circle', text: '本地优先系统设计' },
  ],
  sections: [
    {
      title: '1. 客户端本地处理架构',
      paragraphs: [
        'LadeStack 秉承本地优先的设计原则构建开发者工具。核心工具（包括 LS PDF Toolkit、LS Image Compressor 与 GB Coder Static Editor）完全借助 WebAssembly、Web Worker 与 HTML5 Canvas API 在您的浏览器环境中直接运算。',
        '您所操作的文件（如 PDF 文档、图片素材和代码）仅在您设备的内存中流转，在整个处理过程中绝不会被传输或存储至 LadeStack 的后端服务器。',
      ],
    },
    {
      title: '2. 数据收集与网络通信范围',
      paragraphs: [
        '使用本站公开的开发者工具无需注册账户、输入登录凭证或绑定支付卡。网络层面的通信交互严格受限于以下范围：',
      ],
      listItems: [
        '选择性遥测与访问分析（严格经授权后启用）：我们不投放任何跨站广告追踪器或商业数据收集像素。默认情况下，所有第三方追踪完全处于拦截状态。仅当您在隐私偏好面板中明确同意后，才会启用：(a) Google Analytics 4（衡量 ID: G-C6GRNN3J11），在 Consent Mode v2 下以广告存储完全关闭的方式统计访问；(b) Microsoft Clarity（项目 ID: z5fy1scjjr），在 Consent API v2 下生成匿名交互热力图，且所有表单与输入框均通过 data-clarity-mask 实施严格遮盖脱敏。您可随时通过“Cookie 设置”查看、更改或撤回授权。',
        '基础 Web 服务器访问日志：记录浏览器 User-Agent、来源页面与请求路径等标准诊断数据，仅用于监控系统健康与抵御恶意攻击。',
        '可选的第三方 AI 接入：在 GB Coder 中，若您主动配置了外部 AI 服务的 API 密钥，网络请求将由您的浏览器环境直接发送至指定的第三方接口。',
        '自发来信与咨询：通过邮件客户端发送至 admin@ladestack.in 的邮件内容，仅用于答复您的技术或商务咨询。',
      ],
    },
    {
      title: '3. 本地存储与 Cookie',
      paragraphs: [
        'LadeStack 仅出于必要的平台功能目的使用浏览器本地存储（localStorage 与 IndexedDB），包括深浅主题偏好持久化、GB Coder 代码草稿恢复以及用户隐私选择（键名："ladestack-consent"）。',
        '仅在获得您的明确同意后，Google Analytics 与 Microsoft Clarity 才会生成必要的测量 Cookie（如 _ga、_clck）。这些 Cookie 严禁用于广告定向，并在您撤回授权时自动从您的设备中清除。',
      ],
    },
    {
      title: '4. 数据保留与即时清理',
      paragraphs: [
        '鉴于 LS PDF Toolkit 和 LS Image Compressor 所处理的文件仅存在于易失性内存中，关闭或刷新浏览器标签页即可将所有临时处理数据从设备 RAM 中彻底销毁。',
        '对于保存在 IndexedDB 中的 GB Coder 工程，用户拥有完全的自主控制权，可随时通过清理浏览器站点数据进行彻底删除。',
      ],
    },
  ],
  contactNote: {
    title: '5. 联系方式与隐私咨询',
    text: '如果您对本隐私政策或系统的数据处理边界有任何疑问，请随时联系我们的工程团队：',
    email: 'admin@ladestack.in',
  },
};
