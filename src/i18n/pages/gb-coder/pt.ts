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
      {
        q: "Como crio um novo projeto no GB Coder?",
        a: "Abra o GB Coder e escolha o ambiente mais adequado para o seu fluxo de trabalho. Para prototipagem rápida no lado do cliente com HTML, CSS e JavaScript, inicie o Static Editor. Para projetos full-stack em Node.js com pacotes npm e frameworks modernos, abra uma área de trabalho no WebContainer IDE e selecione um modelo inicial ou crie novos arquivos.",
      },
      {
        q: "Quais linguagens de programação posso escrever e editar no GB Coder?",
        a: "O GB Coder utiliza o motor Monaco Editor da Microsoft para oferecer destaque de sintaxe, preenchimento automático, correspondência de colchetes e recolhimento de código para linguagens como JavaScript, TypeScript, HTML, CSS, JSON e Markdown. Embora permita editar múltiplos formatos, a execução direta no navegador é focada em tecnologias web e ambientes Node.js.",
      },
      {
        q: "Posso visualizar meu site em tempo real enquanto escrevo o código?",
        a: "Sim. O GB Coder conta com visualização dinâmica em tempo real. No Static Editor, as alterações no DOM são sincronizadas em um iframe seguro com latência submilissegundo conforme você digita. No WebContainer IDE, a visualização é servida por servidores de desenvolvimento locais com hot module reloading (HMR), opções de janela destacada e testes via código QR na rede local.",
      },
      {
        q: "Posso instalar pacotes npm e executar comandos de terminal no GB Coder?",
        a: "Sim, dentro do ambiente WebContainer IDE. O motor WebContainer executa processos legítimos do Node.js diretamente na memória do navegador, permitindo executar comandos de terminal, instalar pacotes compatíveis via npm install e rodar scripts de compilação sem a necessidade de servidores remotos ou programas instalados no computador.",
      },
      {
        q: "Posso desenvolver projetos utilizando frameworks modernos de JavaScript no GB Coder?",
        a: "Sim. O WebContainer IDE suporta frameworks front-end modernos como React e Vue, com modelos de início pré-configurados e servidores de desenvolvimento Vite. Compilações estáticas de frameworks ou bibliotecas importadas via CDN também podem ser prototipadas diretamente no Static Editor.",
      },
      {
        q: "Como o assistente de inteligência artificial GB Assist pode me ajudar enquanto programo?",
        a: "O GB Assist é um companheiro de código inteligente desenvolvido para explicar lógicas complexas, sugerir melhorias de arquitetura, gerar código funcional e investigar erros em tempo de execução. Todas as sugestões são exibidas diretamente no editor para que você revise e aprove as alterações antes de aplicá-las ao projeto.",
      },
      {
        q: "Preciso de uma chave de API própria para utilizar os recursos de IA no GB Coder?",
        a: "Sim. O GB Coder opera no modelo Bring-Your-Own-Key (BYOK). Você configura sua própria chave de API privada emitida por provedores suportados, como OpenAI, Anthropic ou Google Gemini. As requisições são transmitidas diretamente do seu navegador para o provedor via HTTPS; a LadeStack nunca intermedeia, inspeciona ou armazena suas chaves de API nem os prompts de código.",
      },
      {
        q: "Como meus projetos e alterações de código são salvos no GB Coder?",
        a: "O GB Coder salva seus arquivos, estrutura de diretórios e estado da área de trabalho localmente no navegador por meio de IndexedDB. Seu código nunca é enviado ou armazenado em servidores da LadeStack. Como a persistência depende do armazenamento local do navegador, limpar dados do site ou navegar no modo anônimo pode remover os projetos. Exporte backups regulares em ZIP para garantir a segurança dos seus trabalhos.",
      },
      {
        q: "Posso baixar ou exportar os arquivos do meu projeto no GB Coder?",
        a: "Sim. Você pode exportar todo o seu espaço de trabalho a qualquer momento em um arquivo ZIP padrão. O download preserva a estrutura completa de pastas, códigos-fonte e arquivos de configuração, permitindo que você continue o desenvolvimento no VS Code localmente ou publique seu projeto em qualquer plataforma de hospedagem ou repositório Git.",
      },
      {
        q: "O que devo fazer se o editor, terminal ou visualização ao vivo parar de funcionar?",
        a: "Primeiro verifique se o seu navegador oferece suporte ao ambiente selecionado. O WebContainer IDE requer navegadores baseados em Chromium (Chrome, Edge, Brave) ou Firefox atualizado com SharedArrayBuffer e isolamento de origem cruzada (COOP/COEP) ativos; caso use um navegador sem suporte (como o Safari), utilize o Static Editor. Se houver falhas, exporte um backup dos arquivos e recarregue a página. Se o problema persistir, entre em contato pela página Contact da LadeStack.",
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
