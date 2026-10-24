import type { SupportPageData } from './types';

export const esSupport: SupportPageData = {
  seo: {
    title: 'Centro de Soporte – Ayuda, Documentación y Preguntas Frecuentes | LadeStack',
    description: 'Obtenga asistencia técnica sobre las herramientas de desarrollo de LadeStack. Consulte la documentación, resuelva dudas o contacte directamente con nuestro equipo de ingeniería.',
    ogTitle: 'Centro de Soporte LadeStack – Ayuda y Preguntas Frecuentes',
    ogDescription: 'Encuentre respuestas precisas sobre arquitectura, privacidad y compatibilidad de navegadores, o comuníquese con LadeStack directamente.',
  },
  hero: {
    badge: 'Soporte y Asistencia',
    title: '¿En qué podemos ayudarle?',
    description: 'Resuelva dudas de flujo de trabajo, explore documentación técnica, revise las políticas de privacidad o comuníquese directamente con nuestro equipo de ingeniería.',
  },
  channelsSection: {
    heading: 'Canales de Soporte',
    channels: [
      {
        icon: 'mail',
        title: 'Asistencia Directa por Correo',
        description: 'Canal de comunicación directo con el fundador y el equipo técnico para consultas de arquitectura, informes de errores y colaboraciones.',
        responseTime: '1–2 días hábiles',
        action: 'admin@ladestack.in',
        href: 'mailto:admin@ladestack.in',
      },
      {
        icon: 'book-open',
        title: 'Documentación Técnica',
        description: 'Guías exhaustivas que detallan la arquitectura de GB Coder, las herramientas de WebAssembly del lado del cliente y los requisitos locales.',
        responseTime: 'Autoservicio instantáneo',
        action: 'Explorar Documentación',
        href: '/docs',
      },
      {
        icon: 'message-square',
        title: 'Comunidad en GitHub',
        description: 'Seguimiento de problemas de código abierto, propuestas de nuevas funciones y debates técnicos en nuestro repositorio oficial de GitHub.',
        responseTime: 'Incidencias públicas',
        action: 'Visitar Repositorio en GitHub',
        href: 'https://github.com/girishlade111',
      },
    ],
  },
  faqSection: {
    badge: 'Ayuda y Preguntas Frecuentes',
    title: 'Preguntas Frecuentes',
    description: 'Respuestas claras sobre licencias de uso, procesamiento local de documentos, compatibilidad y soporte técnico.',
    faqs: [
      {
        question: '¿Las herramientas de LadeStack son gratuitas para proyectos comerciales?',
        answer: 'Sí. El código generado en GB Coder y los archivos procesados por LS PDF Toolkit o LS Image Compressor pueden utilizarse con total libertad en proyectos personales o comerciales sin regalías de plataforma.',
      },
      {
        question: '¿Cómo se gestionan los datos al procesar documentos y código?',
        answer: 'Las utilidades del lado del cliente como LS PDF Toolkit y LS Image Compressor procesan los archivos localmente en la memoria del navegador mediante WebAssembly y APIs de Canvas. Los archivos nunca se envían a los servidores de LadeStack. En GB Coder, los proyectos se almacenan en el IndexedDB local de su navegador, a menos que configure voluntariamente APIs de IA de terceros.',
      },
      {
        question: '¿Qué navegadores son compatibles con las herramientas de LadeStack?',
        answer: 'LS PDF Toolkit, LS Image Compressor y GB Coder Static Editor funcionan con fluidez en todos los navegadores modernos (Chrome, Firefox, Safari, Edge). Para el IDE Avanzado con WebContainer de GB Coder, los navegadores basados en Chromium (Chrome, Edge, Brave) ofrecen el soporte más completo; Firefox cuenta con compatibilidad parcial y Safari presenta limitaciones conocidas de entorno seguro.',
      },
      {
        question: '¿Cómo puedo informar sobre un error o solicitar una nueva funcionalidad?',
        answer: 'Puede abrir una incidencia en nuestro repositorio github.com/girishlade111 o enviar un correo detallando los pasos de reproducción a admin@ladestack.in.',
      },
      {
        question: '¿Las herramientas del lado del cliente funcionan sin conexión?',
        answer: 'Una vez cargadas en la memoria caché del navegador, herramientas estáticas como LS PDF Toolkit y LS Image Compressor operan sin conexión a internet continua, ya que todos los cálculos se realizan en su procesador local.',
      },
    ],
    ctaText: 'Contactar Directamente con Soporte',
  },
};
