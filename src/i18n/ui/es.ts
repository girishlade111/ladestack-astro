/**
 * Spanish (es) — UI Strings
 * Natural technical Spanish for modern web developers.
 * Preserves brand names: LadeStack, GB Coder, Astro.
 */
import type { UIStrings } from './en';

export const es: UIStrings = {
  // Navigation
  'nav.platform': 'Plataforma',
  'nav.apps': 'Aplicaciones',
  'nav.codeStudio': 'Estudio de Código',
  'nav.docs': 'Documentación',
  'nav.blog': 'Blog',
  'nav.about': 'Nosotros',
  'nav.support': 'Soporte',
  'nav.contact': 'Contacto',
  'nav.quickJump': 'Salto Rápido',
  'nav.themeToggle': 'Cambiar tema',
  'nav.languageSelect': 'Seleccionar idioma',
  'nav.openMenu': 'Abrir menú',
  'nav.closeMenu': 'Cerrar menú',

  // Footer
  'footer.tagline': 'Herramientas de desarrollo de alto rendimiento en el navegador, creadas para máxima velocidad y privacidad.',
  'footer.status': 'En el Navegador · Ejecución Local',
  'footer.tools': 'Herramientas',
  'footer.resources': 'Recursos',
  'footer.company': 'Compañía',
  'footer.legal': 'Legal',
  'footer.rights': 'Todos los derechos reservados.',
  'footer.emailPrompt': 'Contacta directamente con ingeniería:',
  'footer.copyEmail': 'Copiar correo',
  'footer.copiedEmail': '¡Copiado al portapapeles!',
  'footer.privacy': 'Política de Privacidad',
  'footer.terms': 'Términos de Servicio',

  // Hero Section
  'hero.badge': 'Ejecución en el Navegador · 100% Privacidad en el Cliente',
  'hero.titleLine1': 'Crea, Edita y Optimiza',
  'hero.titleLine2': 'Directamente en tu Navegador.',
  'hero.description':
    'Utilidades para desarrolladores de alto rendimiento con ejecución del lado del cliente. Sin subida de archivos al servidor, sin muros de pago y con velocidad instantánea.',
  'hero.ctaPrimary': 'Explorar 17+ Herramientas',
  'hero.ctaSecondary': 'Iniciar Studio IDE',
  'hero.ctaSecondaryAria': 'Abrir GB Coder IDE en una pestaña nueva',
  'hero.editorFileName': 'CodeStudio.tsx',
  'hero.editorTabName': 'PreviewSandbox.html',
  'hero.editorStatus': 'Ejecución en el Navegador',
  'hero.editorPrivacy': 'Privacidad: Localhost',
  'hero.editorNotification': 'Validación sintáctica y vista previa en sandbox: hilo local del navegador',
  'hero.editorNotificationBadge': 'Listo para publicar',
  'hero.specTitle': 'Especificaciones de Arquitectura',
  'hero.specRuntime': 'Entorno Local',
  'hero.specExecutionModel': 'Modelo de Ejecución',
  'hero.specExecutionValue': 'Entorno de ejecución cliente en navegador',
  'hero.specExecutionBadge': 'Local',
  'hero.specPrivacy': 'Privacidad de Datos',
  'hero.specPrivacyValue': 'Sin almacenamiento en servidor · Exclusivo en cliente',
  'hero.specPrivacyBadge': 'Estricto',
  'hero.specDistribution': 'Distribución',
  'hero.specDistributionValue': 'Arquitectura estática pre-renderizada',
  'hero.specDistributionBadge': 'Estático',
  'hero.browserCompatibility': 'Compatible con todos los navegadores modernos',
  'hero.viewAppsLink': 'Ver todas las herramientas verificadas →',

  // Features Bento
  'features.eyebrow': 'ECOSISTEMA DE HERRAMIENTAS',
  'features.title': 'Diseñado para velocidad, privacidad y soberanía',
  'features.subtitle':
    'Cada herramienta se ejecuta rigurosamente en el entorno de tu navegador. Sin registros obligatorios, sin telemetría en la nube y sin latencia.',
  'features.card1Title': 'GB Coder',
  'features.card1Desc':
    'Editor interactivo de HTML, CSS y JavaScript moderno con compilación en tiempo real, vista previa en iframe y formateo accesible.',
  'features.card1Badge': 'IDE Insignia',
  'features.card2Title': 'Herramientas PDF LS',
  'features.card2Desc':
    '17 utilidades del lado del cliente para unir, dividir, comprimir, proteger, rotar y convertir archivos PDF en memoria local.',
  'features.card2Badge': 'Suite 17 en 1',
  'features.card3Title': 'Optimizador de Imágenes LS',
  'features.card3Desc':
    'Compresión en cliente compatible con más de 9 formatos, incluidos WebP, AVIF, PNG y JPEG, con reducción instantánea de peso.',
  'features.card3Badge': 'Cero Subidas',
  'features.card4Title': 'Herramientas de Carrera Profesional',
  'features.card4Desc':
    'Creador de currículums optimizado para ATS y utilidades de cálculo de alta precisión creadas para ingenieros reales.',
  'features.card4Badge': 'Productividad',

  // How It Works
  'howItWorks.eyebrow': 'SIMPLICIDAD DE FLUJO',
  'howItWorks.title': 'Cómo funciona LadeStack',
  'howItWorks.subtitle': 'Tres principios transparentes definen cada utilidad de nuestra plataforma.',
  'howItWorks.step1Num': '01',
  'howItWorks.step1Title': 'Acceso Inmediato en el Navegador',
  'howItWorks.step1Desc': 'Abre cualquier utilidad y comienza al instante. Sin inicios de sesión, claves de API ni tarjetas de crédito.',
  'howItWorks.step2Num': '02',
  'howItWorks.step2Title': 'Ejecución Local en tu Dispositivo',
  'howItWorks.step2Desc': 'Tus archivos, fragmentos de código y datos se procesan exclusivamente en la memoria de tu equipo.',
  'howItWorks.step3Num': '03',
  'howItWorks.step3Title': 'Descarga Directa y Control Total',
  'howItWorks.step3Desc': 'Exporta tus resultados de inmediato. Ningún dato sale hacia servidores externos.',

  // Use Cases
  'useCases.eyebrow': 'A QUIÉNES SERVIMOS',
  'useCases.title': 'Construido para flujos de trabajo de ingeniería modernos',
  'useCases.subtitle': 'Desde desarrolladores independientes hasta equipos empresariales que priorizan la privacidad.',
  'useCases.case1Title': 'Desarrolladores Frontend',
  'useCases.case1Desc': 'Prototipa interfaces, inspecciona componentes HTML/CSS/JS y valida patrones modernos con respuesta instantánea.',
  'useCases.case2Title': 'Equipos Técnicos',
  'useCases.case2Desc': 'Comprime y gestiona esquemas técnicos y documentos PDF internos sin violar las políticas de seguridad de la empresa.',
  'useCases.case3Title': 'Creadores Enfocados en Privacidad',
  'useCases.case3Desc': 'Trabaja con archivos confidenciales con la certeza absoluta de que tus datos nunca saldrán de tu ordenador.',

  // Product Showcase
  'showcase.eyebrow': 'CATÁLOGO VERIFICADO',
  'showcase.title': 'Explora herramientas en producción',
  'showcase.subtitle': 'Aplicaciones web del lado del cliente totalmente gratuitas, creadas para máxima fiabilidad.',
  'showcase.launchApp': 'Abrir App',
  'showcase.learnMore': 'Saber Más',
  'showcase.inBrowser': 'En el Navegador',
  'showcase.viewAllCatalog': 'Explorar Todas las Aplicaciones →',

  // FAQ
  'faq.eyebrow': 'PREGUNTAS FRECUENTES',
  'faq.title': 'Preguntas Frecuentes',
  'faq.subtitle': 'Todo lo que necesitas saber sobre las herramientas, la privacidad y la arquitectura de LadeStack.',
  'faq.q1': '¿Las utilidades de LadeStack son totalmente gratuitas?',
  'faq.a1':
    'Sí. Todas las herramientas de desarrollo, incluidas GB Coder, las herramientas PDF y el optimizador de imágenes, son gratuitas para siempre para uso personal y proyectos comerciales.',
  'faq.q2': '¿Cómo se protege la privacidad de los datos y archivos?',
  'faq.a2':
    'Todo el procesamiento de código y documentos ocurre estrictamente en la memoria del sandbox local de tu navegador. Ningún archivo se envía a servidores remotos.',
  'faq.q3': '¿Qué navegadores son compatibles?',
  'faq.a3':
    'Todos los navegadores modernos con soporte para HTML5 y Canvas API, incluidos Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge y Brave.',
  'faq.q4': '¿Quién desarrolla y mantiene LadeStack?',
  'faq.a4':
    'LadeStack está diseñado y mantenido por su fundador Girish Lade, con la misión de proporcionar herramientas accesibles y centradas en la privacidad para desarrolladores de todo el mundo.',

  // CTA Banner
  'cta.title': '¿Listo para acelerar tu desarrollo?',
  'cta.subtitle': 'Comienza a utilizar las herramientas en el navegador de LadeStack hoy mismo. No se requiere crear cuenta.',
  'cta.button': 'Ver Todas las Herramientas',

  // SEO Metadata
  'seo.homeTitle': 'LadeStack – Plataforma y Utilidades de Desarrollo en el Navegador',
  'seo.homeDescription':
    'Herramientas de alto rendimiento en el navegador: editor de código, suite PDF 17 en 1, compresión de imágenes. Gratis, ejecución local.',
  'seo.ogTitle': 'LadeStack – Herramientas de Desarrollo y Utilidades en Cliente',
  'seo.ogDescription':
    'Estudio de código en navegador, suite privada de PDF y optimizador de imágenes. 100% privacidad en cliente, gratis para siempre.',
};
