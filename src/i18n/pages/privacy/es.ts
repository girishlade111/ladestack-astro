import type { PrivacyPageData } from './types';

export const esPrivacy: PrivacyPageData = {
  seo: {
    title: 'Política de Privacidad – Protección de Datos y Arquitectura | LadeStack',
    description: 'Conozca cómo LadeStack protege sus datos mediante ejecución WebAssembly en el cliente, persistencia local con IndexedDB y prácticas transparentes.',
    ogTitle: 'Política de Privacidad de LadeStack',
    ogDescription: 'Arquitectura de procesamiento en el cliente, tratamiento de datos y compromisos de privacidad de LadeStack.',
  },
  header: {
    badge: 'Privacidad y Protección de Datos',
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: Octubre de 2026',
    effectiveDate: 'Efectiva de forma inmediata',
  },
  disclaimer: {
    title: 'Aviso sobre la Versión Auténtica',
    text: 'La versión en inglés de esta Política de Privacidad constituye el único texto legal vinculante y auténtico de LadeStack. Las traducciones a otros idiomas se proporcionan exclusivamente con fines informativos y de conveniencia, sin certificación legal independiente.',
  },
  highlights: [
    { icon: 'shield-check', text: 'Ejecución en el Cliente' },
    { icon: 'lock', text: 'Sin Almacenamiento en Servidor' },
    { icon: 'check-circle', text: 'Arquitectura Local-First' },
  ],
  sections: [
    {
      title: '1. Arquitectura de Procesamiento en el Lado del Cliente',
      paragraphs: [
        'LadeStack diseña sus herramientas bajo el principio arquitectónico de prioridad local (local-first). Las utilidades principales — incluyendo LS PDF Toolkit, LS Image Compressor y GB Coder Static Editor — se ejecutan directamente en su navegador mediante WebAssembly, Web Workers y APIs de Canvas HTML5.',
        'Los archivos que usted manipula (como documentos PDF, imágenes o código fuente) se procesan exclusivamente en la memoria RAM volátil de su navegador. Dichos archivos no se transmiten ni se almacenan en servidores de LadeStack durante las operaciones.',
      ],
    },
    {
      title: '2. Información Recopilada e Interacciones de Red',
      paragraphs: [
        'No solicitamos registro de cuenta, credenciales de inicio de sesión ni datos bancarios para utilizar las herramientas públicas de este sitio web. Las interacciones de red se limitan a:',
      ],
      listItems: [
        'Registros de acceso básicos del servidor web: información técnica estándar que incluye el agente de usuario del navegador, la página de origen y las rutas solicitadas, con el fin exclusivo de mantener la seguridad y mitigar ataques.',
        'Integraciones opcionales de IA de terceros: en GB Coder, los usuarios pueden configurar voluntariamente claves de API de proveedores de IA externos. Las solicitudes salientes se realizan directamente desde el navegador del usuario al punto de enlace de dicho proveedor.',
        'Comunicaciones voluntarias: los mensajes enviados a admin@ladestack.in se procesan únicamente con el propósito de resolver y responder a su consulta.',
      ],
    },
    {
      title: '3. Almacenamiento Local y Cookies',
      paragraphs: [
        'LadeStack utiliza el almacenamiento local del navegador (localStorage e IndexedDB) únicamente para finalidades operativas esenciales: guardar preferencias de interfaz (modo claro u oscuro) y mantener el estado de los proyectos en GB Coder.',
        'No implementamos píxeles de seguimiento publicitario de terceros ni cookies comerciales de marketing.',
      ],
    },
    {
      title: '4. Conservación y Eliminación de Datos',
      paragraphs: [
        'Dado que los archivos procesados por LS PDF Toolkit y LS Image Compressor se encuentran únicamente en la memoria de trabajo temporal, cerrar o actualizar la pestaña del navegador elimina de inmediato toda la información de la memoria del sistema.',
        'Para los proyectos de GB Coder almacenados en IndexedDB, el usuario conserva el control absoluto y puede suprimirlos definitivamente en cualquier momento borrando los datos del sitio en su navegador.',
      ],
    },
  ],
  contactNote: {
    title: '5. Contacto y Consultas sobre Privacidad',
    text: 'Si tiene preguntas sobre esta Política de Privacidad o sobre los límites arquitectónicos de manejo de datos, comuníquese con nuestro equipo técnico:',
    email: 'admin@ladestack.in',
  },
};
