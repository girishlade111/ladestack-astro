import type { SitemapPageData } from './types';

export const esSitemap: SitemapPageData = {
  seo: {
    title: 'Mapa del Sitio y Directorio | LadeStack',
    description: 'Explore el directorio completo de LadeStack: herramientas de desarrollo, documentación técnica, guías de arquitectura y publicaciones.',
    ogTitle: 'LadeStack Mapa del Sitio y Directorio',
    ogDescription: 'Directorio completo de todas las páginas, herramientas, guías y artículos técnicos de LadeStack.',
  },
  hero: {
    badge: 'Navegación y Directorio',
    title: 'Índice del Sitio y Directorio',
    description: 'Un mapa completo y accesible de todas las páginas, herramientas, documentación técnica y artículos de ingeniería de LadeStack.',
  },
  sections: {
    corePlatform: {
      title: 'Rutas Principales de la Plataforma',
      items: [
        { title: 'Inicio', href: '/', desc: 'Página de inicio con muestra de herramientas en vivo y demostración interactiva de código' },
        { title: 'Acerca de LadeStack', href: '/about', desc: 'Trayectoria del fundador, principios de ingeniería y catálogo verificado de productos' },
        { title: 'GB Coder', href: '/gb-coder', desc: 'IDE en el navegador con Monaco Editor, Editor Estático y entorno WebContainer' },
        { title: 'Productos y Utilidades', href: '/apps', desc: 'Catálogo de herramientas de desarrollo con ejecución en el lado del cliente' },
        { title: 'Documentación', href: '/docs', desc: 'Especificaciones técnicas, guías de arquitectura e historial de versiones' },
        { title: 'Centro de Soporte', href: '/support', desc: 'Canales de soporte técnico, guías de compatibilidad de navegadores y FAQ' },
        { title: 'Contacto', href: '/contact', desc: 'Buzón directo del fundador, canales de ingeniería y formularios de consulta' },
      ],
    },
    tools: {
      title: 'Herramientas y Aplicaciones',
      openTool: 'Abrir Herramienta',
      comingSoon: 'Próximamente',
      live: 'Disponible',
    },
    blogArchive: {
      title: 'Archivo del Blog de Ingeniería (27 Artículos)',
      notice: 'Nota: Los artículos del blog de ingeniería se encuentran actualmente publicados únicamente en inglés. La localización completa de artículos está programada para la Fase 3.',
      visitBlog: 'Ver Índice del Blog →',
    },
    legal: {
      title: 'Marco Legal y Privacidad',
      items: [
        { title: 'Política de Privacidad', href: '/privacy', desc: 'Arquitectura de procesamiento local, fronteras de datos y almacenamiento' },
        { title: 'Términos de Servicio', href: '/terms', desc: 'Derechos de uso comercial, términos de licencia y límites de responsabilidad' },
      ],
    },
  },
};
