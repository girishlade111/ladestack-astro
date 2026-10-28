import type { GbCoderPageData } from './types';

export const es: GbCoderPageData = {
  seo: {
    title: 'GB Coder — IDE y Estudio de Desarrollo en el Navegador | LadeStack',
    description: 'Cree, ejecute y previsualice código web al instante con GB Coder. Monaco Editor, vista previa en tiempo real del DOM, ejecución Node.js con WebContainer y privacidad local. Gratis.',
    ogTitle: 'GB Coder — IDE y Estudio de Desarrollo en el Navegador | LadeStack',
    ogDescription: 'Cree, ejecute y previsualice código web al instante con GB Coder. Monaco Editor, vista previa en tiempo real del DOM, ejecución Node.js con WebContainer y privacidad local. Gratis.',
  },
  hero: {
    badge: 'Estudio de Desarrollo Web en el Navegador',
    titleLine: 'Cree, ejecute y publique código',
    titleHighlight: 'al instante en su navegador.',
    description: 'GB Coder combina Monaco Editor con dos motores de ejecución: prototipado web estático e inmediato en todos los navegadores modernos, y entornos Node.js full-stack en memoria mediante WebContainers.',
    ctaStudio: 'Iniciar GB Coder Studio',
    ctaProjects: 'Iniciar WebContainer IDE',
    trustBadges: [
      'Privacidad en el Cliente',
      'Compilación en Milisegundos',
      'Gratis para Siempre · Sin Muros de Pago',
    ],
  },
  environments: {
    eyebrow: 'Arquitectura de Doble Ejecución',
    title: 'Dos Motores Especializados de Desarrollo',
    description: 'Elija el entorno óptimo para su flujo de trabajo: prototipado estático ultrarrápido o desarrollo Node.js completo en el navegador.',
    staticCard: {
      badge: 'Compatibilidad Universal',
      engine: 'Sandbox Instantáneo en el Cliente',
      title: 'Prototipado Estático y Multifichero',
      description: 'Programación sin configuración para HTML5, CSS3 y JavaScript. Editor Monaco con sincronización DOM en tiempo real, resaltado de sintaxis, formato al guardar e inyección de librerías CDN.',
      features: [
        'Sincronización DOM en milisegundos mientras escribe',
        'Inyección de bibliotecas CDN externas (Tailwind, Lucide, Bootstrap)',
        'Compatible con todos los navegadores modernos de escritorio y móviles',
      ],
      status: 'Sin demoras de compilación',
      cta: 'Comenzar Prototipado',
    },
    webContainerCard: {
      badge: 'Micro-SO Full-Stack',
      engine: 'Node.js en el Navegador',
      title: 'IDE WebContainer Avanzado',
      description: 'Entorno Node.js full-stack ejecutado directamente en la memoria del navegador. Ejecute npm install, corra scripts de paquetes, inicie servidores Vite y trabaje con plantillas de React y Vue.',
      features: [
        'Ejecución de entornos Node.js e instalación de paquetes npm',
        'Plantillas de React y Vue con recarga rápida de módulos (HMR)',
        'Sandbox aislado con SharedArrayBuffer y Web Workers',
      ],
      status: 'Compatible con Chromium y Firefox',
      cta: 'Iniciar WebContainer IDE',
    },
  },
  pillars: {
    eyebrow: 'Pilares de Funcionalidad',
    title: 'Diseñado para Precisión, Rapidez y Privacidad',
    description: 'Cada característica de GB Coder ha sido creada para ofrecer una experiencia de nivel profesional directamente en su navegador.',
    items: [
      {
        icon: 'code-2',
        title: 'Editor de Código Monaco',
        badge: 'Motor de VS Code',
        description: 'El editor estándar que impulsa VS Code. Validación de sintaxis TypeScript, autocompletado, multicursor, correspondencia de corchetes y plegado de código.',
      },
      {
        icon: 'eye',
        title: 'Vista Previa en Tiempo Real',
        badge: 'DOM Sincronizado',
        description: 'Renderiza HTML, CSS y JavaScript moderno a medida que escribe. Incluye ventana flotante independiente y código QR para probar en dispositivos móviles de la red local.',
      },
      {
        icon: 'cpu',
        title: 'Micro-SO WebContainer',
        badge: 'Node.js en Memoria',
        description: 'Ejecute procesos Node.js reales, lance scripts npm y levante servidores de desarrollo Vite para prototipar con React y Vue en la memoria del navegador.',
      },
      {
        icon: 'shield-check',
        title: 'Persistencia Local',
        badge: 'Privacidad en el Cliente',
        description: 'Sus proyectos se guardan de forma segura en el IndexedDB de su equipo. Sin registros obligatorios ni envío de telemetría a servidores remotos.',
      },
      {
        icon: 'layers',
        title: 'Arquitectura Multifichero',
        badge: 'Estructura Modular',
        description: 'Organice componentes web complejos en múltiples archivos y carpetas mediante un explorador limpio y gestión fluida de pestañas.',
      },
      {
        icon: 'download',
        title: 'Copias de Seguridad Seguras',
        badge: 'Archivos ZIP',
        description: 'Exporte sus proyectos a archivos ZIP estándar en cualquier momento preservando toda la estructura de carpetas. Restaure proyectos con un solo clic.',
      },
    ],
  },
  guardrails: {
    eyebrow: 'Límites Técnicos y Compatibilidad',
    title: 'Runtime WebContainer y Compatibilidad de Navegadores',
    desc1: 'GB Coder utiliza la tecnología WebContainers para ejecutar procesos genuinos de Node.js en navegadores modernos que admiten SharedArrayBuffer y aislamiento entre orígenes (COOP/COEP).',
    desc2: 'Para prototipado rápido o en entornos donde las cabeceras de aislamiento de WebContainer están restringidas (incluido Apple Safari), nuestro Editor Estático ofrece una alternativa inmediata sin dependencias externas.',
    supportedHeading: 'Entornos Compatibles',
    environments: [
      { browser: 'Google Chrome', support: 'WebContainer + Editor Estático', highlight: true },
      { browser: 'Microsoft Edge', support: 'WebContainer + Editor Estático', highlight: true },
      { browser: 'Brave Browser', support: 'WebContainer + Editor Estático', highlight: true },
      { browser: 'Mozilla Firefox', support: 'WebContainer (COOP/COEP)', highlight: true },
      { browser: 'Apple Safari', support: 'Modo Editor Estático', highlight: false },
    ],
  },
  faqs: {
    eyebrow: 'Preguntas Técnicas',
    title: 'Preguntas Frecuentes',
    description: 'Información clara y transparente sobre las capacidades, arquitectura y límites de GB Coder.',
    items: [
      {
        q: '¿Cómo ejecuta GB Coder código full-stack sin un servidor remoto?',
        a: 'GB Coder utiliza la tecnología WebContainer, que ejecuta procesos reales de Node.js y microentornos WebAssembly directamente en la pestaña de su navegador mediante SharedArrayBuffer y aislamiento COOP/COEP. Los servidores de desarrollo y compilaciones funcionan en el hardware de su propio equipo.',
      },
      {
        q: '¿Cuál es la diferencia entre el Editor Estático y el IDE WebContainer?',
        a: 'El Editor Estático multifichero proporciona renderizado DOM instantáneo para HTML, CSS y JavaScript sin esperas en todos los navegadores. El IDE WebContainer avanzado ejecuta gestores de paquetes Node.js, scripts npm y frameworks modernos como React y Vue.',
      },
      {
        q: '¿Se sube mi código fuente o proyectos a los servidores de LadeStack?',
        a: 'No. GB Coder opera bajo un modelo estrictamente local. Su código, archivos y estado del proyecto se guardan directamente en el IndexedDB de su navegador. LadeStack no almacena ni rastrea su código en servidores externos.',
      },
      {
        q: '¿Qué navegadores son compatibles con GB Coder?',
        a: 'El Editor Estático funciona en todos los navegadores modernos, incluidos Apple Safari, Google Chrome, Microsoft Edge y Mozilla Firefox. El IDE WebContainer funciona en navegadores basados en Chromium (Chrome, Edge, Brave) y en Firefox con COOP/COEP activo. Debido a limitaciones actuales de WebKit, los usuarios de Safari pueden utilizar el Editor Estático completo.',
      },
      {
        q: '¿Es GB Coder completamente gratis?',
        a: 'Sí, su uso es totalmente gratuito. No hay planes de suscripción, no se requiere tarjeta de crédito ni existen cuotas de compilación. Es desarrollado y mantenido por Girish Lade como parte del ecosistema abierto LadeStack.',
      },
      {
        q: "¿Cómo creo un nuevo proyecto en GB Coder?",
        a: "Abra GB Coder y elija el entorno de desarrollo que mejor se adapte a su proyecto. Para prototipado rápido del lado del cliente con HTML, CSS y JavaScript, inicie el Static Editor. Para proyectos full-stack de Node.js con paquetes npm y frameworks modernos, inicie un espacio de trabajo en el WebContainer IDE y elija una plantilla inicial o cree nuevos archivos.",
      },
      {
        q: "¿Qué lenguajes de programación puedo escribir y editar en GB Coder?",
        a: "GB Coder incorpora el motor Monaco Editor de Microsoft para ofrecer resaltado de sintaxis, autocompletado inteligente, coincidencia de corchetes y plegado de código en lenguajes como JavaScript, TypeScript, HTML, CSS, JSON y Markdown. Aunque permite editar múltiples formatos, la ejecución directa en el navegador está optimizada para tecnologías web y entornos Node.js.",
      },
      {
        q: "¿Puedo obtener una vista previa en tiempo real de mi sitio web mientras escribo código?",
        a: "Sí. GB Coder incluye vista previa en vivo y en tiempo real. En el Static Editor, las modificaciones del DOM se sincronizan en un iframe aislado con una latencia inferior a un milisegundo a medida que escribe. En el WebContainer IDE, la vista previa se sirve mediante servidores de desarrollo locales con recarga rápida de módulos (HMR), ventana independiente y pruebas con código QR en red local.",
      },
      {
        q: "¿Puedo instalar paquetes npm y ejecutar comandos de terminal dentro de GB Coder?",
        a: "Sí, dentro del entorno WebContainer IDE. El motor WebContainer ejecuta procesos reales de Node.js directamente en la memoria del navegador, lo que le permite ejecutar comandos de terminal, instalar paquetes compatibles mediante npm install y ejecutar scripts de compilación sin depender de servidores remotos ni instalaciones de escritorio.",
      },
      {
        q: "¿Puedo desarrollar proyectos utilizando frameworks modernos de JavaScript en GB Coder?",
        a: "Sí. El WebContainer IDE admite frameworks front-end modernos como React y Vue mediante plantillas prediseñadas y servidores de desarrollo Vite. Los proyectos estáticos o componentes cargados a través de CDN también se pueden prototipar directamente en el Static Editor.",
      },
      {
        q: "¿En qué puede ayudarme el asistente de inteligencia artificial GB Assist al programar?",
        a: "GB Assist es un asistente de código inteligente diseñado para explicar código complejo, proponer mejoras arquitectónicas, generar código repetitivo funcional y depurar errores en tiempo de ejecución. Todas las sugerencias se muestran de forma integrada en el editor para que pueda revisar y validar los cambios antes de incorporarlos a su proyecto.",
      },
      {
        q: "¿Necesito mi propia clave de API para usar las funciones de IA en GB Coder?",
        a: "Sí. GB Coder opera bajo el modelo Bring-Your-Own-Key (BYOK). Puede configurar su propia clave de API privada de proveedores compatibles como OpenAI, Anthropic o Google Gemini. Las solicitudes se envían directamente desde su navegador al proveedor a través de HTTPS; LadeStack nunca actúa como intermediario, ni inspecciona ni almacena sus claves de API o instrucciones de código.",
      },
      {
        q: "¿Cómo se guardan mis proyectos y modificaciones de código en GB Coder?",
        a: "GB Coder almacena sus archivos de proyecto, estructura de carpetas y estado del espacio de trabajo localmente en su navegador mediante IndexedDB. Su código nunca se sube ni se almacena en los servidores de LadeStack. Dado que los datos residen en el navegador local, borrar el historial, usar modo incógnito o restablecer el almacenamiento puede eliminar sus proyectos. Exporte periódicamente copias de seguridad en formato ZIP.",
      },
      {
        q: "¿Puedo descargar o exportar los archivos de mi proyecto de GB Coder?",
        a: "Sí. Puede exportar todo su espacio de trabajo en cualquier momento como un archivo ZIP estándar. El archivo descargado preserva la estructura completa de carpetas, código fuente y archivos de configuración, permitiéndole continuar el desarrollo en su escritorio con VS Code o implementar su proyecto en cualquier servicio de alojamiento o repositorio Git.",
      },
      {
        q: "¿Qué debo hacer si el editor, la terminal o la vista previa dejan de funcionar?",
        a: "En primer lugar, compruebe que su navegador sea compatible con el entorno seleccionado. El WebContainer IDE requiere navegadores basados en Chromium (Chrome, Edge, Brave) o Firefox actualizado con SharedArrayBuffer y aislamiento de origen cruzado (COOP/COEP) habilitados; si utiliza un navegador incompatible (como Safari), cambie al Static Editor. Si los problemas persisten, exporte una copia de seguridad y recargue la página. Si la incidencia continúa, envíe un aviso mediante la página Contact de LadeStack.",
      },
    ],
  },
  cta: {
    title: '¿Listo para programar, ejecutar y publicar código en el navegador?',
    description: 'Inicie GB Coder ahora mismo sin descargas ni instalaciones. Experimente la velocidad de Monaco Editor y Node.js en su navegador hoy mismo.',
    launchStudioBtn: 'Iniciar GB Coder Studio',
    exploreAllBtn: 'Explorar Todas las Utilidades',
    footerTagline: 'GB Coder by LadeStack · Arquitectura en el Navegador · Gratis para Usar',
  },
};
