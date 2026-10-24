import type { DocsPageData } from './types';

export const esDocs: DocsPageData = {
  seo: {
    title: 'Documentación – Arquitectura, Guías y Referencia de API | LadeStack',
    description: 'Documentación técnica completa para desarrolladores de LadeStack. Guías de arquitectura, flujos WebAssembly en el cliente y registro de cambios.',
    ogTitle: 'Documentación para Desarrolladores LadeStack',
    ogDescription: 'Especificaciones técnicas, guías de arquitectura y tutoriales paso a paso para GB Coder, LS PDF y LS Image.',
  },
  hero: {
    badge: 'Documentación Técnica',
    title: 'Documentación para Desarrolladores',
    description: 'Especificaciones técnicas, guías de arquitectura de ejecución local y documentación de referencia de la plataforma LadeStack.',
    searchPlaceholder: 'Buscar en la documentación, herramientas, guías…',
    searchAriaLabel: 'Buscar en la documentación, herramientas, guías',
  },
  categoriesSection: {
    title: 'Guías de Arquitectura Fundamental',
    description: 'Seleccione una categoría a continuación para examinar las especificaciones de funcionamiento detalladas.',
    viewGuide: 'Ver Guía',
    closeGuide: 'Cerrar Guía',
    categories: [
      {
        id: 'getting-started',
        icon: 'book-open',
        title: 'Primeros Pasos',
        description: 'Principios de diseño, modelo de ejecución en el navegador y flujos orientados a la privacidad local',
        overview: 'Las herramientas de LadeStack se ejecutan directamente en el navegador del usuario sin enviar datos confidenciales a servidores remotos.',
        sections: [
          {
            title: 'Ejecución Inmediata en Navegador',
            content: 'Inicie las herramientas de inmediato sin instalaciones previas. Los binarios WebAssembly y Web Workers se inicializan en la memoria RAM del navegador.',
          },
          {
            title: 'Almacenamiento Local y Aislamiento de Memoria',
            content: 'Los archivos de proyectos y documentos se mantienen exclusivamente en la memoria RAM y el IndexedDB del navegador. No se transfieren datos a los servidores de LadeStack. Las funciones opcionales de IA solo se comunican con APIs externas si las habilita expresamente.',
          },
          {
            title: 'Exportación de Entregables de Producción',
            content: 'Guarde directamente en su disco local paquetes web estáticos compilados, documentos PDF editados o imágenes optimizadas.',
          },
        ],
      },
      {
        id: 'code-studio',
        icon: 'code-2',
        title: 'Motor GB Coder',
        description: 'Compilación en el Editor Estático, emulación de Node.js con WebContainer e integración de Monaco',
        overview: 'Análisis detallado de la arquitectura de doble motor en GB Coder: Editor Estático ligero e IDE Avanzado con WebContainer.',
        sections: [
          {
            title: 'Arquitectura de Doble Motor',
            content: 'El Static Editor analiza HTML, CSS y JavaScript sin demoras de inicio. El Advanced WebContainer IDE aprovisiona un entorno Node.js local en navegadores Chromium para ejecutar servidores de desarrollo y módulos npm.',
          },
          {
            title: 'Integración con Monaco Editor',
            content: 'Experiencia de edición de código de nivel profesional con resaltado de sintaxis, autocompletado, panel de diagnóstico y atajos de teclado completos.',
          },
          {
            title: 'Persistencia Local y Exportación',
            content: 'Guardado continuo de proyectos en el IndexedDB del navegador y exportación en archivo ZIP independiente para ejecución local.',
          },
        ],
      },
      {
        id: 'pdf-wasm',
        icon: 'file-text',
        title: 'Herramientas LS PDF',
        description: 'Manipulación de archivos PDF en el cliente mediante WebAssembly y aislamiento en memoria',
        overview: 'Cómo WebAssembly procesa y modifica flujos de datos binarios de PDF directamente en la memoria del navegador.',
        sections: [
          {
            title: 'Fusión y División de Documentos',
            content: 'Una varios archivos PDF o extraiga rangos de páginas específicos de forma local sin pérdidas de calidad ni llamadas a servidores.',
          },
          {
            title: 'Compresión en Memoria',
            content: 'Optimiza la estructura interna del documento y comprime fuentes incrustadas localmente para reducir el tamaño final del archivo.',
          },
          {
            title: 'Seguridad en el Lado del Cliente',
            content: 'Aplique cifrado y contraseñas a sus documentos PDF en la memoria RAM del navegador antes de descargarlos al disco.',
          },
        ],
      },
      {
        id: 'image-engine',
        icon: 'image',
        title: 'Motor LS Image',
        description: 'Procesamiento de imágenes multiformato con Canvas y WebAssembly con previsualización en tiempo real',
        overview: 'Conversión, compresión e inspección comparativa de imágenes en el cliente mediante Web Workers.',
        sections: [
          {
            title: 'Amplia Compatibilidad de Formatos',
            content: 'Soporte completo para los estándares web modernos, incluyendo AVIF, WebP, PNG, JPEG, SVG y TIFF.',
          },
          {
            title: 'Calibración de Calidad',
            content: 'Ajuste umbrales de compresión con pérdidas y submuestreo cromático con inspección visual comparativa en vivo.',
          },
        ],
      },
    ],
  },
  articlesSection: {
    title: 'Artículos Técnicos Destacados',
    description: 'Guías prácticas que abordan la seguridad, las barreras de privacidad y la optimización de recursos web.',
    readArticle: 'Leer Artículo Completo',
    closeArticle: 'Cerrar Artículo',
    stepsTitle: 'Pasos de Ejecución:',
    summaryLabel: 'Resumen:',
    articles: [
      {
        id: 'client-side-privacy',
        title: 'Comprensión de la Arquitectura de Privacidad en el Cliente',
        category: 'Seguridad',
        readTime: '4 min de lectura',
        intro: 'Cómo LadeStack salvaguarda la información confidencial mediante aislamiento de memoria WebAssembly y el entorno seguro del navegador.',
        steps: [
          'Asignación de espacio seguro en memoria a través de Web Workers.',
          'Procesamiento binario local con WebAssembly sin transferencia por red.',
          'Almacenamiento estanco en IndexedDB para la preservación de estado.',
          'Liberación inmediata de memoria al cerrar la pestaña del navegador.',
        ],
        summary: 'Al mantener el procesamiento en el dispositivo del usuario, LadeStack elimina los riesgos de almacenamiento en servidores externos y garantiza máxima velocidad.',
      },
      {
        id: 'optimizing-assets',
        title: 'Mejores Prácticas para la Compresión de Recursos Web',
        category: 'Rendimiento',
        readTime: '6 min de lectura',
        intro: 'Técnicas eficaces para reducir el tamaño de imágenes y documentos sin pérdida visual apreciable.',
        steps: [
          'Elegir formatos de nueva generación como AVIF o WebP para gráficos rasterizados.',
          'Calibrar parámetros de cuantización con base en inspección visual comparativa.',
          'Eliminar metadatos EXIF de cámara y perfiles de color prescindibles.',
          'Evaluar la mejora en el Largest Contentful Paint (LCP) en pantallas móviles.',
        ],
        summary: 'La compresión precisa en el cliente disminuye el consumo de ancho de banda y mejora tangiblemente las métricas de Core Web Vitals.',
      },
    ],
  },
  changelogSection: {
    title: 'Historial de Versiones de la Plataforma',
    description: 'Actualizaciones recientes de la plataforma, mejoras arquitectónicas y nuevas funciones.',
    items: [
      {
        version: 'v1.0.0',
        date: 'Octubre de 2026',
        type: 'Versión Principal',
        description: 'Rediseño visual con temas Obsidian y Precision Emerald, internacionalización en 9 idiomas, mejoras de accesibilidad y rendimiento en el cliente.',
      },
      {
        version: 'v0.9.4',
        date: 'Agosto de 2026',
        type: 'Mejora',
        description: 'Incorporación de nuevas herramientas para manipulación de PDF con compresión optimizada en memoria en la suite LS PDF.',
      },
      {
        version: 'v0.9.0',
        date: 'Junio de 2026',
        type: 'Lanzamiento',
        description: 'Lanzamiento público inicial del entorno de desarrollo GB Coder con doble motor integrado en el navegador.',
      },
    ],
  },
};
