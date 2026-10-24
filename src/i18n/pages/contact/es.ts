import type { ContactPageData } from './types';

export const es: ContactPageData = {
  seo: {
    title: 'Contacto – Soporte Directo para Desarrolladores LadeStack',
    description: 'Contacte a LadeStack para consultas sobre herramientas, comentarios y asistencia técnica. Atención directa en admin@ladestack.in.',
    ogTitle: 'Contacto – Soporte Directo para Desarrolladores LadeStack',
    ogDescription: 'Contacte a LadeStack para consultas sobre herramientas, comentarios y asistencia técnica. Atención directa en admin@ladestack.in.',
  },
  hero: {
    badge: 'Comunicación Directa',
    title: 'Póngase en Contacto',
    description: '¿Preguntas sobre nuestras herramientas en el cliente, propuestas de funciones o necesidades para equipos? Escríbanos.',
  },
  cards: [
    { icon: 'mail', label: 'Correo Directo', title: 'admin@ladestack.in', sub: 'Buzón personal del fundador', href: 'mailto:admin@ladestack.in' },
    { icon: 'message-square', label: 'Soporte Técnico', title: 'Ayuda Técnica', sub: 'Arquitectura e incidencias', href: 'mailto:admin@ladestack.in' },
    { icon: 'map-pin', label: 'Sede', title: 'Bombay, India', sub: 'Operación remota global', href: null },
    { icon: 'globe', label: 'Arquitectura', title: 'Herramientas Locales', sub: 'Ejecución en navegador', href: null },
  ],
  form: {
    title: 'Enviar Mensaje',
    description: 'Revisamos periódicamente los mensajes y respondemos con prontitud.',
    fallbackPrefix: 'Si prefiere escribir directamente desde su cliente de correo:',
    fallbackLinkText: 'admin@ladestack.in',
    nameLabel: 'Nombre Completo',
    namePlaceholder: 'Juan Pérez',
    emailLabel: 'Correo Electrónico',
    emailPlaceholder: 'juan@example.com',
    subjectLabel: 'Asunto',
    subjectPlaceholder: 'Consulta sobre GB Coder o utilidades del cliente',
    messageLabel: 'Mensaje',
    messagePlaceholder: 'Describa su pregunta, informe de error o sugerencia en detalle...',
    submitButton: 'Enviar Mensaje',
    successMessage: '¡Gracias! Su mensaje ha sido preparado. Si su cliente de correo no se abrió automáticamente, escriba directamente a admin@ladestack.in.',
  },
  faqs: {
    eyebrow: 'Dudas Frecuentes',
    title: 'Preguntas Frecuentes de Contacto',
    description: 'Tiempos de respuesta, opciones de colaboración y disponibilidad de la plataforma.',
    items: [
      {
        q: '¿En cuánto tiempo recibiré respuesta?',
        a: 'Revisamos los mensajes de forma periódica y solemos responder en un plazo de 1 a 2 días laborables.',
      },
      {
        q: '¿Puedo reportar un error o proponer una mejora?',
        a: '¡Por supuesto! Escríbanos a admin@ladestack.in o abra una incidencia en nuestro repositorio de GitHub en github.com/girishlade111.',
      },
      {
        q: '¿Ofrecen integraciones a medida para equipos de ingeniería?',
        a: 'Sí. Si su equipo requiere despliegues autoalojados de nuestras herramientas o flujos de trabajo locales, contáctenos directamente.',
      },
      {
        q: '¿Está LadeStack disponible en todo el mundo sin restricciones?',
        a: 'Sí, nuestra plataforma es accesible globalmente desde cualquier navegador moderno sin bloqueos regionales ni muros de suscripción.',
      },
    ],
  },
};
