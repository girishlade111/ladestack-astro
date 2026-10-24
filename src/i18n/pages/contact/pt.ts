import type { ContactPageData } from './types';

export const pt: ContactPageData = {
  seo: {
    title: 'Contato – Suporte Direto ao Desenvolvedor LadeStack',
    description: 'Entre em contato com a LadeStack para dúvidas sobre ferramentas, feedback e suporte técnico. Assistência direta em admin@ladestack.in.',
    ogTitle: 'Contato – Suporte Direto ao Desenvolvedor LadeStack',
    ogDescription: 'Entre em contato com a LadeStack para dúvidas sobre ferramentas, feedback e suporte técnico. Assistência direta em admin@ladestack.in.',
  },
  hero: {
    badge: 'Comunicação Direta',
    title: 'Entre em Contato',
    description: 'Dúvidas sobre nossas ferramentas no cliente, propostas de recursos ou necessidades de equipe? Mande-nos uma mensagem.',
  },
  cards: [
    { icon: 'mail', label: 'E-mail Direto', title: 'admin@ladestack.in', sub: 'Caixa de entrada do fundador', href: 'mailto:admin@ladestack.in' },
    { icon: 'message-square', label: 'Suporte Técnico', title: 'Ajuda Técnica', sub: 'Arquitetura e bugs', href: 'mailto:admin@ladestack.in' },
    { icon: 'map-pin', label: 'Localização', title: 'Mumbai, Índia', sub: 'Operação remota global', href: null },
    { icon: 'globe', label: 'Arquitetura', title: 'Ferramentas no Cliente', sub: 'Execução local no navegador', href: null },
  ],
  form: {
    title: 'Enviar Mensagem',
    description: 'Lemos as mensagens regularmente e respondemos com prontidão.',
    fallbackPrefix: 'Caso prefira enviar diretamente pelo seu cliente de e-mail:',
    fallbackLinkText: 'admin@ladestack.in',
    nameLabel: 'Nome Completo',
    namePlaceholder: 'Carlos Silva',
    emailLabel: 'Endereço de E-mail',
    emailPlaceholder: 'carlos@example.com',
    subjectLabel: 'Assunto',
    subjectPlaceholder: 'Dúvida sobre o GB Coder ou utilitários no cliente',
    messageLabel: 'Mensagem',
    messagePlaceholder: 'Descreva sua pergunta, relatório de erro ou sugestão de funcionalidade em detalhes...',
    submitButton: 'Enviar Mensagem',
    successMessage: 'Obrigado! Sua mensagem foi preparada. Se o seu cliente de e-mail não abriu automaticamente, escreva diretamente para admin@ladestack.in.',
  },
  faqs: {
    eyebrow: 'Dúvidas Frequentes',
    title: 'Perguntas Frequentes sobre Contato',
    description: 'Prazos de resposta, colaborações e disponibilidade da plataforma.',
    items: [
      {
        q: 'Em quanto tempo receberei uma resposta?',
        a: 'Revisamos as mensagens periodicamente e costumamos responder em 1 a 2 dias úteis.',
      },
      {
        q: 'Posso relatar um erro ou sugerir novos recursos?',
        a: 'Com certeza! Escreva para admin@ladestack.in ou abra uma Issue em nosso repositório no GitHub: github.com/girishlade111.',
      },
      {
        q: 'Vocês oferecem integrações customizadas para equipes de engenharia?',
        a: 'Sim. Se a sua equipe precisa de versões auto-hospedadas de nossas ferramentas ou fluxos offline específicos, fale conosco.',
      },
      {
        q: 'A LadeStack está disponível globalmente sem restrições?',
        a: 'Sim, nossa plataforma pode ser acessada em qualquer navegador moderno no mundo todo, sem bloqueios regionais ou cobranças.',
      },
    ],
  },
};
