import type { DocsPageData } from './types';

export const ptDocs: DocsPageData = {
  seo: {
    title: 'Documentação – Arquitetura, Guias e Referência de API | LadeStack',
    description: 'Documentação técnica abrangente das ferramentas LadeStack. Guias de arquitetura, fluxos WebAssembly no cliente e histórico de versões.',
    ogTitle: 'Documentação para Desenvolvedores LadeStack',
    ogDescription: 'Especificações técnicas, guias de arquitetura e tutoriais para GB Coder, LS PDF e LS Image.',
  },
  hero: {
    badge: 'Documentação Técnica',
    title: 'Documentação para Desenvolvedores',
    description: 'Especificações técnicas, guias de arquitetura de execução local e materiais de referência para a plataforma LadeStack.',
    searchPlaceholder: 'Pesquisar documentação, ferramentas, guias…',
    searchAriaLabel: 'Pesquisar documentação, ferramentas, guias',
  },
  categoriesSection: {
    title: 'Guias de Arquitetura Fundamental',
    description: 'Selecione uma categoria abaixo para consultar especificações operacionais detalhadas.',
    viewGuide: 'Ver Guia',
    closeGuide: 'Fechar Guia',
    categories: [
      {
        id: 'getting-started',
        icon: 'book-open',
        title: 'Primeiros Passos',
        description: 'Princípios essenciais de design, modelo de execução no navegador e fluxos local-first',
        overview: 'As ferramentas da LadeStack operam diretamente no navegador do usuário, sem trafegar dados confidenciais por servidores remotos.',
        sections: [
          {
            title: 'Execução Instantânea no Navegador',
            content: 'Inicie as ferramentas sem qualquer processo de instalação. Módulos binários WebAssembly e Web Workers são inicializados na memória local.',
          },
          {
            title: 'Isolamento de Memória e Armazenamento Local',
            content: 'Arquivos de projetos e documentos enviados residem estritamente na RAM e no IndexedDB do navegador. Nada é enviado aos servidores da LadeStack. Recursos de IA opcionais só se comunicam externamente quando configurados.',
          },
          {
            title: 'Exportação de Pacotes de Produção',
            content: 'Exporte ativos estáticos compilados, documentos PDF editados ou formatos de imagem compactados diretamente para seu disco local.',
          },
        ],
      },
      {
        id: 'code-studio',
        icon: 'code-2',
        title: 'Mecanismo GB Coder',
        description: 'Compilação do Editor Estático, emulação Node.js no WebContainer e integração com Monaco',
        overview: 'Visão aprofundada da arquitetura de dois motores do GB Coder: Editor Estático leve e IDE Avançada com WebContainer.',
        sections: [
          {
            title: 'Arquitetura de Dois Motores',
            content: 'O Static Editor analisa HTML, CSS e JavaScript sem atraso de inicialização. O Advanced WebContainer IDE instancia um ambiente Node.js local em navegadores Chromium para executar servidores e pacotes npm.',
          },
          {
            title: 'Integração com Monaco Editor',
            content: 'Edição de código em nível de desktop com realce de sintaxe, autocompletar inteligente, diagnósticos e atalhos de teclado.',
          },
          {
            title: 'Persistência Local e Exportação',
            content: 'Salvamento automático no IndexedDB do navegador e exportação em arquivo ZIP autônomo, sem dependências externas.',
          },
        ],
      },
      {
        id: 'pdf-wasm',
        icon: 'file-text',
        title: 'LS PDF Toolkit',
        description: 'Manipulação de PDF no cliente com WebAssembly e isolamento estrito de memória',
        overview: 'Como o WebAssembly processa e manipula fluxos binários de PDF diretamente na memória RAM do navegador.',
        sections: [
          {
            title: 'Mesclagem e Divisão de Fluxos',
            content: 'Una múltiplos documentos PDF ou extraia intervalos de páginas personalizados sem perda de fidelidade ou tráfego de rede.',
          },
          {
            title: 'Compactação Otimizada em Memória',
            content: 'Otimiza dicionários de objetos e compacta fontes incorporadas localmente para minimizar o peso final do documento.',
          },
          {
            title: 'Segurança no Lado do Cliente',
            content: 'Criptografe e proteja documentos PDF com senha na própria memória RAM antes de salvá-los no disco.',
          },
        ],
      },
      {
        id: 'image-engine',
        icon: 'image',
        title: 'LS Image Engine',
        description: 'Processamento de imagens multiformato via Canvas e WebAssembly com pré-visualização instantânea',
        overview: 'Conversão, compactação e inspeção visual comparativa no cliente através de Web Workers locais.',
        sections: [
          {
            title: 'Ampla Variedade de Formatos',
            content: 'Suporte completo a padrões modernos da web, incluindo AVIF, WebP, PNG, JPEG, SVG e TIFF.',
          },
          {
            title: 'Calibração Fina de Qualidade',
            content: 'Ajuste limites de compactação com perdas e subamostragem de croma com comparação visual antes/depois em tempo real.',
          },
        ],
      },
    ],
  },
  articlesSection: {
    title: 'Artigos Técnicos em Destaque',
    description: 'Tutoriais práticos abordando segurança, limites de privacidade e otimização de ativos web.',
    readArticle: 'Ler Artigo Completo',
    closeArticle: 'Fechar Artigo',
    stepsTitle: 'Etapas de Execução:',
    summaryLabel: 'Resumo:',
    articles: [
      {
        id: 'client-side-privacy',
        title: 'Entendendo a Arquitetura de Privacidade no Cliente',
        category: 'Segurança',
        readTime: '4 min de leitura',
        intro: 'Como a LadeStack protege dados confidenciais por meio do isolamento de memória WebAssembly e do sandbox do navegador.',
        steps: [
          'Alocação de sandbox em memória via Web Workers.',
          'Processamento de bytes em WebAssembly local sem transmissão remota.',
          'Armazenamento isolado em IndexedDB para retenção de estado.',
          'Coleta de lixo imediata ao fechar a aba do navegador.',
        ],
        summary: 'Ao manter o processamento de dados na máquina do usuário, a LadeStack elimina riscos de vazamento em servidores e garante agilidade.',
      },
      {
        id: 'optimizing-assets',
        title: 'Melhores Práticas para Compactação de Ativos Web',
        category: 'Desempenho',
        readTime: '6 min de leitura',
        intro: 'Técnicas eficientes para reduzir o peso de imagens e documentos sem degradação visual perceptível.',
        steps: [
          'Selecione formatos modernos como AVIF ou WebP para imagens rasterizadas.',
          'Calibre parâmetros de quantização com base em inspeção visual direta.',
          'Remova metadados de câmera EXIF e perfis de cor desnecessários.',
          'Monitore o impacto no Largest Contentful Paint (LCP) em dispositivos móveis.',
        ],
        summary: 'A compactação direcionada no lado do cliente economiza largura de banda e melhora expressivamente as pontuações do Core Web Vitals.',
      },
    ],
  },
  changelogSection: {
    title: 'Histórico de Lançamentos da Plataforma',
    description: 'Atualizações recentes, aprimoramentos de arquitetura e ampliação de recursos.',
    items: [
      {
        version: 'v1.0.0',
        date: 'Outubro de 2026',
        type: 'Versão Principal',
        description: 'Redesign completo com temas Obsidian e Precision Emerald, internacionalização em 9 idiomas, melhorias de acessibilidade e desempenho local.',
      },
      {
        version: 'v0.9.4',
        date: 'Agosto de 2026',
        type: 'Melhoria',
        description: 'Novas ferramentas de manipulação de documentos PDF com compactação otimizada em memória no pacote LS PDF.',
      },
      {
        version: 'v0.9.0',
        date: 'Junho de 2026',
        type: 'Lançamento',
        description: 'Lançamento público pioneiro do ambiente de desenvolvimento GB Coder com dois motores integrados ao navegador.',
      },
    ],
  },
};
