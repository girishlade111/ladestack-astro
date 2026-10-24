import type { GbCoderPageData } from './types';

export const pt: GbCoderPageData = {
  seo: {
    title: 'GB Coder — IDE e Estúdio de Desenvolvimento no Navegador | LadeStack',
    description: 'Crie, execute e pré-visualize código web instantaneamente com o GB Coder. Monaco Editor, pré-visualização DOM em tempo real, execução Node.js via WebContainer e privacidade local. Gratuito.',
    ogTitle: 'GB Coder — IDE e Estúdio de Desenvolvimento no Navegador | LadeStack',
    ogDescription: 'Crie, execute e pré-visualize código web instantaneamente com o GB Coder. Monaco Editor, pré-visualização DOM em tempo real, execução Node.js via WebContainer e privacidade local. Gratuito.',
  },
  hero: {
    badge: 'Estúdio de Desenvolvimento Web no Navegador',
    titleLine: 'Crie, execute e publique código',
    titleHighlight: 'instantaneamente no seu navegador.',
    description: 'O GB Coder combina o Monaco Editor com dois motores de execução: prototipagem web estática imediata em todos os navegadores modernos e ambientes Node.js full-stack em memória via WebContainers.',
    ctaStudio: 'Iniciar GB Coder Studio',
    ctaProjects: 'Iniciar WebContainer IDE',
    trustBadges: [
      'Privacidade no Cliente',
      'Compilação em Milissegundos',
      'Gratuito para Sempre · Sem Paywalls',
    ],
  },
  environments: {
    eyebrow: 'Arquitetura de Execução Dupla',
    title: 'Dois Motores Especializados de Desenvolvimento',
    description: 'Escolha o ambiente ideal para o seu trabalho: prototipagem estática ultrarrápida ou desenvolvimento Node.js completo no navegador.',
    staticCard: {
      badge: 'Suporte Universal em Navegadores',
      engine: 'Sandbox Instantâneo no Cliente',
      title: 'Prototipagem Estática e Multi-Arquivo',
      description: 'Codificação sem configuração para HTML5, CSS3 e JavaScript. Editor Monaco com sincronização DOM em tempo real, destaque de sintaxe, formatação ao salvar e injeção de bibliotecas CDN.',
      features: [
        'Sincronização DOM em milissegundos enquanto você digita',
        'Injeção de bibliotecas CDN externas (Tailwind, Lucide, Bootstrap)',
        'Suporte completo em navegadores modernos desktop e mobile',
      ],
      status: 'Zero espera de compilação',
      cta: 'Começar Prototipagem',
    },
    webContainerCard: {
      badge: 'Micro-SO Full-Stack',
      engine: 'Node.js no Navegador',
      title: 'IDE WebContainer Avançado',
      description: 'Ambiente Node.js full-stack executado diretamente na memória do navegador. Execute npm install, rode scripts de pacotes, inicie servidores Vite e desenvolva com React e Vue.',
      features: [
        'Execução de ambientes Node.js e instalação de pacotes npm',
        'Modelos React e Vue com recarregamento rápido de módulos (HMR)',
        'Sandbox isolado com SharedArrayBuffer e Web Workers',
      ],
      status: 'Suporte a Chromium e Firefox',
      cta: 'Iniciar WebContainer IDE',
    },
  },
  pillars: {
    eyebrow: 'Pilares de Recursos',
    title: 'Desenvolvido para Precisão, Velocidade e Privacidade',
    description: 'Cada recurso do GB Coder foi construído para proporcionar uma experiência profissional de codificação diretamente no seu navegador.',
    items: [
      {
        icon: 'code-2',
        title: 'Editor de Código Monaco',
        badge: 'Motor do VS Code',
        description: 'O editor padrão da indústria que alimenta o VS Code. Validação de sintaxe TypeScript, autocompletar, edição com múltiplos cursores e recolhimento de código.',
      },
      {
        icon: 'eye',
        title: 'Pré-Visualização em Tempo Real',
        badge: 'DOM Sincronizado',
        description: 'Renderiza HTML, CSS e JavaScript moderno enquanto você digita. Inclui janela de pré-visualização destacada e verificação via QR Code para dispositivos na rede local.',
      },
      {
        icon: 'cpu',
        title: 'Micro-SO WebContainer',
        badge: 'Node.js em Memória',
        description: 'Execute processos reais do Node.js, rode scripts npm e inicie servidores de desenvolvimento Vite para prototipar com React e Vue diretamente na memória do navegador.',
      },
      {
        icon: 'shield-check',
        title: 'Persistência Local',
        badge: 'Privacidade no Cliente',
        description: 'Seus projetos são salvos com segurança no IndexedDB do seu dispositivo. Sem cadastros obrigatórios e sem envio de telemetria para servidores remotos.',
      },
      {
        icon: 'layers',
        title: 'Arquitetura Multi-Arquivo',
        badge: 'Estrutura Modular',
        description: 'Organize componentes web complexos em múltiplos arquivos e pastas com um explorador de arquivos limpo e gerenciamento intuitivo de abas.',
      },
      {
        icon: 'download',
        title: 'Backups Seguros',
        badge: 'Arquivos ZIP',
        description: 'Exporte seus projetos para arquivos ZIP padrão a qualquer momento, preservando toda a hierarquia de pastas. Restaure projetos anteriores com um clique.',
      },
    ],
  },
  guardrails: {
    eyebrow: 'Limites Técnicos e Compatibilidade',
    title: 'Runtime WebContainer e Compatibilidade de Navegadores',
    desc1: 'O GB Coder utiliza a tecnologia WebContainers para executar processos genuínos do Node.js em navegadores modernos com suporte a SharedArrayBuffer e isolamento entre origens (COOP/COEP).',
    desc2: 'Para prototipagem simples ou ambientes onde os cabeçalhos de isolamento do WebContainer estão restritos (incluindo o Apple Safari), nosso Editor Estático oferece uma alternativa imediata e sem dependências.',
    supportedHeading: 'Ambientes Suportados',
    environments: [
      { browser: 'Google Chrome', support: 'WebContainer + Editor Estático', highlight: true },
      { browser: 'Microsoft Edge', support: 'WebContainer + Editor Estático', highlight: true },
      { browser: 'Brave Browser', support: 'WebContainer + Editor Estático', highlight: true },
      { browser: 'Mozilla Firefox', support: 'WebContainer (COOP/COEP)', highlight: true },
      { browser: 'Apple Safari', support: 'Modo Editor Estático', highlight: false },
    ],
  },
  faqs: {
    eyebrow: 'Perguntas Técnicas',
    title: 'Perguntas Frequentes',
    description: 'Informações claras e transparentes sobre as capacidades, arquitetura e limites do GB Coder.',
    items: [
      {
        q: 'Como o GB Coder executa código full-stack sem um servidor remoto?',
        a: 'O GB Coder utiliza a tecnologia WebContainer, que roda processos Node.js reais e microssistemas WebAssembly na aba do navegador por meio de SharedArrayBuffer e isolamento COOP/COEP. Servidores e builds funcionam no hardware da sua própria máquina.',
      },
      {
        q: 'Qual é a diferença entre o Editor Estático e o IDE WebContainer?',
        a: 'O Editor Estático multi-arquivo oferece renderização DOM instantânea para HTML, CSS e JavaScript sem atrasos em todos os navegadores. O IDE WebContainer avançado suporta gerenciadores de pacotes Node.js, scripts npm e frameworks como React e Vue.',
      },
      {
        q: 'Meus códigos e projetos são enviados para os servidores da LadeStack?',
        a: 'Não. O GB Coder opera em um modelo estritamente local. Seu código, arquivos e estado do projeto são salvos diretamente no IndexedDB do seu navegador. A LadeStack não armazena nem rastreia seu código em servidores remotos.',
      },
      {
        q: 'Quais navegadores suportam o GB Coder?',
        a: 'O Editor Estático funciona em todos os navegadores modernos, incluindo Apple Safari, Google Chrome, Microsoft Edge e Mozilla Firefox. O IDE WebContainer roda em navegadores baseados em Chromium (Chrome, Edge, Brave) e no Firefox com COOP/COEP ativo. Devido a limitações atuais do WebKit, usuários do Safari podem utilizar o Editor Estático com todos os recursos.',
      },
      {
        q: 'O GB Coder é totalmente gratuito?',
        a: 'Sim, é totalmente gratuito para usar. Não há planos pagos, exigência de cartão de crédito nem cotas diárias de compilação. É desenvolvido e mantido por Girish Lade como parte do ecossistema aberto LadeStack.',
      },
    ],
  },
  cta: {
    title: 'Pronto para escrever, executar e publicar código no navegador?',
    description: 'Inicie o GB Coder agora mesmo sem instalar nada. Experimente hoje a velocidade do Monaco Editor e do Node.js no navegador.',
    launchStudioBtn: 'Iniciar GB Coder Studio',
    exploreAllBtn: 'Explorar Todos os Utilitários',
    footerTagline: 'GB Coder by LadeStack · Arquitetura no Navegador · Gratuito para Usar',
  },
};
