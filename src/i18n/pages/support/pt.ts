import type { SupportPageData } from './types';

export const ptSupport: SupportPageData = {
  seo: {
    title: 'Central de Suporte – Ajuda, Documentação e FAQ | LadeStack',
    description: 'Obtenha suporte para as ferramentas para desenvolvedores da LadeStack. Consulte documentações técnicas, tire dúvidas ou fale diretamente com a equipe de engenharia.',
    ogTitle: 'Central de Suporte LadeStack – Ajuda e FAQ',
    ogDescription: 'Encontre respostas diretas sobre arquitetura, tratamento de dados e compatibilidade de navegadores, ou contate a LadeStack diretamente.',
  },
  hero: {
    badge: 'Suporte e Assistência',
    title: 'Como podemos ajudar você?',
    description: 'Solucione problemas de fluxo de trabalho, consulte documentações técnicas, revise as garantias de privacidade ou fale diretamente com nossa equipe de engenharia.',
  },
  channelsSection: {
    heading: 'Canais de Suporte',
    channels: [
      {
        icon: 'mail',
        title: 'Suporte Direto por E-mail',
        description: 'Canal direto com o fundador e a equipe de engenharia para dúvidas de arquitetura, relatos de erros e propostas de parceria.',
        responseTime: '1 a 2 dias úteis',
        action: 'admin@ladestack.in',
        href: 'mailto:admin@ladestack.in',
      },
      {
        icon: 'book-open',
        title: 'Documentação Técnica',
        description: 'Guias abrangentes detalhando a arquitetura do GB Coder, ferramentas WebAssembly do lado do cliente e requisitos de execução local.',
        responseTime: 'Autoatendimento imediato',
        action: 'Explorar Documentação',
        href: '/docs',
      },
      {
        icon: 'message-square',
        title: 'Comunidade GitHub',
        description: 'Rastreador público de problemas, propostas de recursos e discussões em nosso repositório oficial no GitHub.',
        responseTime: 'Problemas públicos',
        action: 'Visitar Repositório GitHub',
        href: 'https://github.com/girishlade111',
      },
    ],
  },
  faqSection: {
    badge: 'Ajuda e FAQ',
    title: 'Perguntas Frequentes',
    description: 'Respostas claras sobre licenciamento comercial, processamento de documentos, compatibilidade e suporte técnico.',
    faqs: [
      {
        question: 'As ferramentas da LadeStack são gratuitas para projetos comerciais?',
        answer: 'Sim. Os códigos criados no GB Coder e os arquivos gerados pelo LS PDF Toolkit ou LS Image Compressor podem ser utilizados livremente em projetos pessoais e comerciais de clientes sem cobrança de royalties de plataforma.',
      },
      {
        question: 'Como os dados são tratados ao processar documentos e código?',
        answer: 'Utilitários do lado do cliente, como o LS PDF Toolkit e o LS Image Compressor, processam arquivos localmente na memória do navegador via WebAssembly e Canvas API. Os arquivos nunca são enviados aos servidores da LadeStack. No GB Coder, os arquivos do projeto permanecem no IndexedDB do navegador, a menos que APIs de IA de terceiros sejam configuradas expressamente.',
      },
      {
        question: 'Quais navegadores são compatíveis com as ferramentas da LadeStack?',
        answer: 'O LS PDF Toolkit, o LS Image Compressor e o GB Coder Static Editor funcionam perfeitamente em todos os navegadores modernos (Chrome, Firefox, Safari, Edge). Para o IDE Avançado com WebContainer do GB Coder, navegadores baseados em Chromium (Chrome, Edge, Brave) oferecem o suporte mais completo; o Firefox possui suporte parcial e o Safari tem restrições conhecidas de sandbox.',
      },
      {
        question: 'Como posso relatar um erro ou sugerir uma nova funcionalidade?',
        answer: 'Você pode abrir uma issue no repositório github.com/girishlade111 ou enviar os passos para reproduzir o problema por e-mail para admin@ladestack.in.',
      },
      {
        question: 'As ferramentas do lado do cliente funcionam offline?',
        answer: 'Após o carregamento inicial no cache do navegador, utilitários estáticos como o LS PDF Toolkit e o LS Image Compressor podem operar sem conexão ativa com a internet, pois todo o processamento é executado no processador local.',
      },
    ],
    ctaText: 'Falar Diretamente com o Suporte',
  },
};
