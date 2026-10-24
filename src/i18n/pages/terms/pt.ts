import type { TermsPageData } from './types';

export const ptTerms: TermsPageData = {
  seo: {
    title: 'Termos de Serviço – Uso da Plataforma e Licenciamento | LadeStack',
    description: 'Analise os Termos de Serviço das ferramentas LadeStack, titularidade de propriedade intelectual, limites de execução local e isenções legais.',
    ogTitle: 'Termos de Serviço LadeStack',
    ogDescription: 'Termos de Serviço, titularidade intelectual dos projetos e direitos de uso comercial das ferramentas LadeStack.',
  },
  header: {
    badge: 'Legal e Termos',
    title: 'Termos de Serviço',
    lastUpdated: 'Última Atualização: Outubro de 2026',
    effectiveDate: 'Válido Imediatamente',
  },
  disclaimer: {
    title: 'Aviso sobre a Versão Autêntica',
    text: 'A versão em inglês destes Termos de Serviço constitui o único texto legal autêntico da LadeStack. As traduções para outros idiomas são disponibilizadas unicamente para fins informativos e de conveniência, sem certificação jurídica independente.',
  },
  sections: [
    {
      title: '1. Aceitação dos Termos',
      paragraphs: [
        'Ao acessar ou utilizar a plataforma LadeStack (ladestack.in), seus subdomínios vinculados ou quaisquer utilitários baseados em navegador aqui disponibilizados, você concorda em cumprir e vincular-se juridicamente a estes Termos de Serviço. Caso discorde de qualquer parte destes termos, você deve interromper o acesso e uso imediatamente.',
      ],
    },
    {
      title: '2. Uso Permitido e Titularidade dos Resultados',
      paragraphs: [
        'É concedida a você uma licença não exclusiva, mundial e isenta de royalties para utilizar os aplicativos web da LadeStack para fins pessoais, acadêmicos, de pesquisa e de desenvolvimento comercial de software.',
        'Todos os códigos-fonte, arquiteturas de software, arquivos compilados, documentos e imagens criados ou modificados através das ferramentas da LadeStack permanecem de sua exclusiva propriedade intelectual. A LadeStack não reivindica quaisquer direitos de propriedade ou royalties sobre arquivos ou códigos processados por você em nossos softwares executados no cliente.',
      ],
    },
    {
      title: '3. Execução Técnica e Requisitos de Ambiente',
      paragraphs: [
        'As ferramentas de desenvolvimento da LadeStack operam primariamente no lado do cliente utilizando WebAssembly, Web Workers e APIs modernas de navegador. O desempenho e a estabilidade dependem diretamente do hardware do seu dispositivo e das características do seu navegador.',
        'O GB Coder oferece um Editor Estático compatível com os principais navegadores modernos e uma IDE Avançada com WebContainer voltada preferencialmente a navegadores baseados em Chromium. É de sua responsabilidade assegurar que seu ambiente local satisfaça os pré-requisitos técnicos exigidos.',
      ],
    },
    {
      title: '4. Isenção de Garantias',
      paragraphs: [
        'Os serviços e ferramentas da LadeStack são fornecidos "NO ESTADO EM QUE SE ENCONTRAM" (AS IS) e "CONFORME DISPONÍVEIS" (AS AVAILABLE), sem garantias expressas ou tácitas de qualquer espécie.',
        'Não garantimos que as ferramentas operarão de maneira ininterrupta, livre de erros ou protegida contra variações temporárias de compatibilidade decorrentes de atualizações de software de terceiros.',
      ],
    },
    {
      title: '5. Limitação de Responsabilidade',
      paragraphs: [
        'Na extensão máxima permitida pela legislação aplicável, a LadeStack, seu fundador ou colaboradores não serão responsáveis por quaisquer danos diretos, indiretos, incidentais ou consequenciais resultantes do uso ou da incapacidade de usar as ferramentas.',
      ],
    },
    {
      title: '6. Alterações nos Termos',
      paragraphs: [
        'Reservamo-nos o direito de revisar estes Termos de Serviço a qualquer momento. Qualquer alteração será refletida na data de "Última Atualização" no topo deste documento. O uso continuado das ferramentas após a publicação de modificações constitui aceitação plena dos termos revisados.',
      ],
    },
  ],
  contactNote: {
    title: '7. Dúvidas Jurídicas e Institucionais',
    text: 'Para dúvidas referentes a estes Termos de Serviço ou licenciamento, entre em contato:',
    email: 'admin@ladestack.in',
  },
};
