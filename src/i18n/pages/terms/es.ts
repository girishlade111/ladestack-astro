import type { TermsPageData } from './types';

export const esTerms: TermsPageData = {
  seo: {
    title: 'Términos de Servicio – Uso de la Plataforma y Licencias | LadeStack',
    description: 'Consulte los Términos de Servicio de las herramientas de LadeStack, titularidad de propiedad intelectual, ejecución en el cliente y limitaciones de responsabilidad.',
    ogTitle: 'Términos de Servicio de LadeStack',
    ogDescription: 'Términos de Servicio, propiedad intelectual de los resultados y derechos de uso comercial de las herramientas LadeStack.',
  },
  header: {
    badge: 'Legal y Términos',
    title: 'Términos de Servicio',
    lastUpdated: 'Última actualización: Octubre de 2026',
    effectiveDate: 'Efectivo de forma inmediata',
  },
  disclaimer: {
    title: 'Aviso sobre la Versión Auténtica',
    text: 'La versión en inglés de estos Términos de Servicio constituye el único texto legal vinculante y auténtico de LadeStack. Las traducciones a otros idiomas se proporcionan exclusivamente con fines informativos y de conveniencia, sin certificación legal independiente.',
  },
  sections: [
    {
      title: '1. Aceptación de los Términos',
      paragraphs: [
        'Al acceder o utilizar la plataforma LadeStack (ladestack.in), sus subdominios asociados o cualquier utilidad en el navegador aquí provista, usted acepta quedar legalmente vinculado por estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, debe suspender el acceso y uso de inmediato.',
      ],
    },
    {
      title: '2. Uso Permitido y Titularidad de los Resultados',
      paragraphs: [
        'Se le otorga una licencia no exclusiva, mundial y libre de regalías para utilizar las aplicaciones web de LadeStack con fines personales, académicos, de investigación y desarrollo comercial de software.',
        'Todo el código fuente, arquitecturas de software, archivos compilados, documentos e imágenes creados o modificados mediante las herramientas de LadeStack permanecen como su exclusiva propiedad intelectual. LadeStack no reclama ningún derecho de propiedad ni regalías sobre los archivos o código que usted procese en nuestro software del lado del cliente.',
      ],
    },
    {
      title: '3. Ejecución Técnica y Requisitos del Entorno',
      paragraphs: [
        'Las herramientas para desarrolladores de LadeStack operan principalmente del lado del cliente mediante WebAssembly, Web Workers y APIs de navegadores modernos. El rendimiento y la estabilidad dependen directamente de las especificaciones de su hardware y de su navegador.',
        'GB Coder incluye un Editor Estático compatible con navegadores modernos y un IDE Avanzado con WebContainer optimizado preferentemente para navegadores basados en Chromium. Es su responsabilidad asegurarse de que su entorno cumpla con los requisitos técnicos indispensables.',
      ],
    },
    {
      title: '4. Exclusión de Garantías',
      paragraphs: [
        'Los servicios y herramientas de LadeStack se entregan "TAL CUAL" (AS IS) y "SEGÚN DISPONIBILIDAD" (AS AVAILABLE), sin garantías expresas o implícitas de ninguna índole.',
        'No garantizamos que las herramientas funcionen de forma ininterrumpida o libre de errores, ni que estén exentas de fluctuaciones transitorias de compatibilidad causadas por actualizaciones de software de terceros.',
      ],
    },
    {
      title: '5. Limitación de Responsabilidad',
      paragraphs: [
        'En la máxima medida permitida por la ley aplicable, ni LadeStack, ni su fundador, ni sus colaboradores serán responsables por ningún daño directo, indirecto, incidental o emergente derivado del uso o de la imposibilidad de uso de las herramientas.',
      ],
    },
    {
      title: '6. Modificaciones de los Términos',
      paragraphs: [
        'Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. Cualquier cambio se reflejará en la fecha de "Última actualización" en el encabezado de este documento. El uso continuo de las herramientas tras la publicación de los cambios constituye la aceptación de los términos revisados.',
      ],
    },
  ],
  contactNote: {
    title: '7. Consultas Legales e Institucionales',
    text: 'Si tiene preguntas sobre estos Términos de Servicio o licenciamiento, comuníquese con nosotros:',
    email: 'admin@ladestack.in',
  },
};
