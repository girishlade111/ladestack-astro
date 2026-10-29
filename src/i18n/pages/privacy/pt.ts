import type { PrivacyPageData } from './types';

export const ptPrivacy: PrivacyPageData = {
  seo: {
    title: 'Política de Privacidade – Proteção de Dados e Arquitetura | LadeStack',
    description: 'Saiba como a LadeStack protege seus dados por meio de execução WebAssembly no cliente, persistência local em IndexedDB e práticas transparentes.',
    ogTitle: 'Política de Privacidade LadeStack',
    ogDescription: 'Arquitetura de processamento no cliente, práticas de manuseio de dados e limites de privacidade do usuário.',
  },
  header: {
    badge: 'Privacidade e Proteção de Dados',
    title: 'Política de Privacidade',
    lastUpdated: 'Última Atualização: Outubro de 2026',
    effectiveDate: 'Válida Imediatamente',
  },
  disclaimer: {
    title: 'Aviso sobre a Versão Autêntica',
    text: 'A versão em inglês desta Política de Privacidade constitui o único texto legal autêntico da LadeStack. As traduções para outros idiomas são disponibilizadas unicamente para fins informativos e de conveniência, sem certificação jurídica independente.',
  },
  highlights: [
    { icon: 'shield-check', text: 'Analítica com Privacidade (Sob Consentimento)' },
    { icon: 'shield-check', text: 'Execução no Lado do Cliente' },
    { icon: 'lock', text: 'Sem Armazenamento de Arquivos em Servidor' },
    { icon: 'check-circle', text: 'Arquitetura Local-First' },
  ],
  sections: [
    {
      title: '1. Arquitetura de Processamento no Lado do Cliente',
      paragraphs: [
        'A LadeStack projeta ferramentas de desenvolvimento sob o princípio arquitetural local-first. Os utilitários principais — incluindo o LS PDF Toolkit, o LS Image Compressor e o GB Coder Static Editor — são executados diretamente no ambiente do seu navegador por meio de WebAssembly, Web Workers e APIs HTML5 Canvas.',
        'Os arquivos manipulados por você (como documentos PDF, imagens e código-fonte) são processados exclusivamente na memória volátil do navegador. Esses arquivos não são transmitidos nem armazenados em servidores da LadeStack durante a manipulação.',
      ],
    },
    {
      title: '2. Informações Coletadas e Interações de Rede',
      paragraphs: [
        'Não exigimos criação de conta, credenciais de login ou dados de pagamento para usar as ferramentas públicas deste site. As interações de rede estão restritas aos seguintes âmbitos:',
      ],
      listItems: [
        'Telemetria Opcional e Análise de Experiência (Apenas Mediante Consentimento Prévio): Não utilizamos rastreadores publicitários nem pixels de segmentação de marketing. Por padrão, todas as ferramentas de terceiros estão totalmente bloqueadas. Apenas quando você concede consentimento afirmativo em nossas Preferências de Privacidade, habilitamos: (a) Google Analytics 4 (ID de Medição: G-C6GRNN3J11) para medições agregadas de páginas sob o Google Consent Mode v2, com armazenamento de anúncios desativado; (b) Microsoft Clarity (ID do Projeto: z5fy1scjjr) para diagnósticos de navegação sob a Clarity Consent API v2, com todos os campos de formulário estritamente mascarados (data-clarity-mask). O consentimento pode ser alterado ou revogado a qualquer momento em "Definições de Cookies".',
        'Registros básicos de acesso ao servidor web: dados comuns de diagnóstico, como user-agent do navegador, URL de referência e rotas solicitadas, utilizados exclusivamente para integridade da infraestrutura e mitigação de tráfego malicioso.',
        'Integrações opcionais de IA de terceiros: no GB Coder, o usuário pode configurar voluntariamente suas próprias chaves de API de IA. As requisições de saída ocorrem diretamente entre o navegador do usuário e o provedor terceiro designado.',
        'Comunicações voluntárias: mensagens enviadas para admin@ladestack.in são utilizadas unicamente com o propósito de atender e responder à sua solicitação.',
      ],
    },
    {
      title: '3. Armazenamento Local e Cookies',
      paragraphs: [
        'A LadeStack utiliza o armazenamento local do navegador (localStorage e IndexedDB) apenas para propósitos operacionais essenciais: salvar a preferência de tema, manter o estado dos projetos no GB Coder e registrar suas decisões de privacidade ("ladestack-consent").',
        'Cookies analíticos (_ga, _clck) só são emitidos após autorização voluntária. Eles não possuem finalidade publicitária e são removidos imediatamente do seu navegador caso o consentimento seja revogado.',
      ],
    },
    {
      title: '4. Retenção e Exclusão de Dados',
      paragraphs: [
        'Como os arquivos manipulados no LS PDF Toolkit e no LS Image Compressor residem unicamente na memória de trabalho, fechar ou atualizar a aba do navegador descarta imediatamente os dados da RAM do sistema.',
        'Para projetos do GB Coder salvos no IndexedDB, o usuário retém o controle absoluto e pode excluir seus dados a qualquer momento limpando os dados de site no navegador.',
      ],
    },
  ],
  contactNote: {
    title: '5. Contato e Dúvidas sobre Privacidade',
    text: 'Se você tiver dúvidas sobre esta Política de Privacidade ou sobre os limites arquiteturais de processamento de dados, entre em contato com nossa equipe:',
    email: 'admin@ladestack.in',
  },
};
