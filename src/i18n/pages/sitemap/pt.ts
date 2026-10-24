import type { SitemapPageData } from './types';

export const ptSitemap: SitemapPageData = {
  seo: {
    title: 'Mapa do Site e Diretório | LadeStack',
    description: 'Explore o diretório completo da LadeStack: ferramentas de desenvolvimento, documentação técnica, guias e publicações de engenharia.',
    ogTitle: 'LadeStack Mapa do Site e Diretório',
    ogDescription: 'Diretório completo de todas as páginas, ferramentas, guias e artigos técnicos da LadeStack.',
  },
  hero: {
    badge: 'Navegação e Índice',
    title: 'Índice do Site e Diretório',
    description: 'Um mapa acessível e completo de todas as páginas, ferramentas, documentações e publicações de engenharia da LadeStack.',
  },
  sections: {
    corePlatform: {
      title: 'Rotas Principais da Plataforma',
      items: [
        { title: 'Início', href: '/', desc: 'Página inicial com demonstração interativa de ferramentas e código em tempo real' },
        { title: 'Sobre a LadeStack', href: '/about', desc: 'Biografia do fundador, princípios de engenharia e portfólio de produtos' },
        { title: 'GB Coder', href: '/gb-coder', desc: 'IDE no navegador com Monaco Editor, Editor Estático e ambiente WebContainer' },
        { title: 'Produtos e Utilitários', href: '/apps', desc: 'Catálogo de utilitários de desenvolvimento com execução no cliente' },
        { title: 'Documentação', href: '/docs', desc: 'Especificações técnicas, guias de arquitetura e histórico de lançamentos' },
        { title: 'Central de Suporte', href: '/support', desc: 'Canais de assistência técnica, compatibilidade de navegadores e FAQ' },
        { title: 'Fale Conosco', href: '/contact', desc: 'Canal direto com o fundador, dúvidas técnicas e formulários de feedback' },
      ],
    },
    tools: {
      title: 'Ferramentas e Aplicativos',
      openTool: 'Abrir Ferramenta',
      comingSoon: 'Em Breve',
      live: 'Disponível',
    },
    blogArchive: {
      title: 'Arquivo do Blog de Engenharia (27 Artigos)',
      notice: 'Nota: Os artigos do blog de engenharia estão disponíveis atualmente apenas em inglês. A tradução completa dos artigos está agendada para a Fase 3.',
      visitBlog: 'Acessar Índice do Blog →',
    },
    legal: {
      title: 'Governança Jurídica e Privacidade',
      items: [
        { title: 'Política de Privacidade', href: '/privacy', desc: 'Arquitetura de processamento local, limites de dados e política de armazenamento' },
        { title: 'Termos de Serviço', href: '/terms', desc: 'Direitos de uso comercial, termos de licenciamento e limites de responsabilidade' },
      ],
    },
  },
};
