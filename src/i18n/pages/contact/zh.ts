import type { ContactPageData } from './types';

export const zh: ContactPageData = {
  seo: {
    title: '联系我们 – LadeStack 开发者直接支持',
    description: '就开发者工具咨询、使用反馈与技术支持与 LadeStack 取得联系。直通邮箱：admin@ladestack.in。',
    ogTitle: '联系我们 – LadeStack 开发者直接支持',
    ogDescription: '就开发者工具咨询、使用反馈与技术支持与 LadeStack 取得联系。直通邮箱：admin@ladestack.in。',
  },
  hero: {
    badge: '直接沟通',
    title: '联系我们',
    description: '关于客户端工具、功能改进建议或企业私有化支持的问题？随时向我们留言。',
  },
  cards: [
    { icon: 'mail', label: '直通邮箱', title: 'admin@ladestack.in', sub: '创始人直通收件箱', href: 'mailto:admin@ladestack.in' },
    { icon: 'message-square', label: '技术协助', title: '工程支持', sub: '系统架构 & 缺陷反馈', href: 'mailto:admin@ladestack.in' },
    { icon: 'map-pin', label: '总部所在地', title: '印度 孟买', sub: '全球远程分布式运作', href: null },
    { icon: 'globe', label: '系统架构', title: '纯客户端运算', sub: '浏览器本地沙箱运行', href: null },
  ],
  form: {
    title: '发送消息',
    description: '我们会认真查阅每一封来信并尽快给您回复。',
    fallbackPrefix: '如需通过本机邮件客户端直接发送，请写信至：',
    fallbackLinkText: 'admin@ladestack.in',
    nameLabel: '您的姓名',
    namePlaceholder: '张三',
    emailLabel: '电子邮箱地址',
    emailPlaceholder: 'zhangsan@example.com',
    subjectLabel: '邮件主题',
    subjectPlaceholder: '关于 GB Coder 或客户端工具的咨询',
    messageLabel: '详细内容',
    messagePlaceholder: '请详细描述您的问题、缺陷报告或功能建议...',
    submitButton: '发送邮件',
    successMessage: '感谢您的来信！消息已准备完毕。如果未能自动拉起邮件客户端，请直接向 admin@ladestack.in 发送邮件。',
  },
  faqs: {
    eyebrow: '常见疑问',
    title: '联系与支持答疑',
    description: '关于沟通时效、业务协作与平台可访问性的说明。',
    items: [
      {
        q: '通常多久能收到回复？',
        a: '我们会定期查阅来信，通常在 1–2 个工作日内给予您详尽的答复。',
      },
      {
        q: '可以反馈缺陷或提出新功能需求吗？',
        a: '非常欢迎！请发送邮件至 admin@ladestack.in，或在我们的 GitHub 仓库（github.com/girishlade111）提交 Issue。',
      },
      {
        q: '是否为工程团队提供定制化集成或私有部署方案？',
        a: '可以。如果您的技术团队需要纯内网自托管版本或离线定制流程，请直接与我们沟通。',
      },
      {
        q: 'LadeStack 是否在全球范围内无障碍可用？',
        a: '是的，只需使用现代标准浏览器，即可在世界各地无门槛访问，没有任何地区封锁或强制订阅墙。',
      },
    ],
  },
};
