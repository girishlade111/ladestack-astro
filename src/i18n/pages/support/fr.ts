import type { SupportPageData } from './types';

export const frSupport: SupportPageData = {
  seo: {
    title: 'Centre d’assistance – Aide, documentation et FAQ | LadeStack',
    description: 'Obtenez de l’aide sur les outils pour développeurs LadeStack. Consultez la documentation technique, trouvez des réponses ou contactez directement notre équipe.',
    ogTitle: 'Centre d’assistance LadeStack – Aide et FAQ',
    ogDescription: 'Trouvez des réponses claires sur l’architecture, la confidentialité et la compatibilité des navigateurs, ou contactez directement LadeStack.',
  },
  hero: {
    badge: 'Support & Assistance',
    title: 'Comment pouvons-nous vous aider ?',
    description: 'Résolvez vos problèmes d’utilisation, explorez la documentation technique, examinez les garanties de confidentialité ou contactez directement nos ingénieurs.',
  },
  channelsSection: {
    heading: 'Canaux d’assistance',
    channels: [
      {
        icon: 'mail',
        title: 'Assistance directe par e-mail',
        description: 'Liaison directe avec le fondateur et l’équipe d’ingénierie pour les questions d’architecture, rapports de bugs et partenariats.',
        responseTime: '1 à 2 jours ouvrés',
        action: 'admin@ladestack.in',
        href: 'mailto:admin@ladestack.in',
      },
      {
        icon: 'book-open',
        title: 'Documentation technique',
        description: 'Guides complets détaillant l’architecture de GB Coder, les outils WebAssembly côté client et les prérequis d’exécution locale.',
        responseTime: 'Accès immédiat en libre-service',
        action: 'Consulter la documentation',
        href: '/docs',
      },
      {
        icon: 'message-square',
        title: 'Communauté GitHub',
        description: 'Suivi public des anomalies, suggestions de fonctionnalités et discussions communautaires sur notre dépôt GitHub officiel.',
        responseTime: 'Issues publiques',
        action: 'Visiter le dépôt GitHub',
        href: 'https://github.com/girishlade111',
      },
    ],
  },
  faqSection: {
    badge: 'Aide & FAQ',
    title: 'Foire aux questions',
    description: 'Des réponses précises sur les licences commerciales, le traitement des documents, les navigateurs et le support technique.',
    faqs: [
      {
        question: 'Les outils LadeStack sont-ils utilisables gratuitement pour des projets commerciaux ?',
        answer: 'Oui. Le code créé dans GB Coder ainsi que les fichiers générés par LS PDF Toolkit ou LS Image Compressor peuvent être exploités librement dans le cadre de travaux personnels ou commerciaux, sans redevance de plateforme.',
      },
      {
        question: 'Comment les données sont-elles traitées lors de la manipulation de documents et de code ?',
        answer: 'Les utilitaires côté client tels que LS PDF Toolkit et LS Image Compressor traitent les fichiers localement dans la mémoire du navigateur à l’aide de WebAssembly et des API Canvas. Les fichiers ne sont jamais téléversés vers les serveurs LadeStack. Pour GB Coder, les fichiers de projet restent enregistrés dans l’IndexedDB de votre navigateur, sauf si vous configurez expressément des API d’IA tierces.',
      },
      {
        question: 'Quels navigateurs sont compatibles avec les outils LadeStack ?',
        answer: 'LS PDF Toolkit, LS Image Compressor et GB Coder Static Editor fonctionnent de manière fluide sur tous les navigateurs modernes (Chrome, Firefox, Safari, Edge). Pour l’IDE Avancé de GB Coder avec WebContainer, les navigateurs basés sur Chromium (Chrome, Edge, Brave) offrent l’environnement le plus complet ; Firefox offre une prise en charge partielle et Safari présente des restrictions de bac à sable connues.',
      },
      {
        question: 'Comment signaler un bug ou proposer une nouvelle fonctionnalité ?',
        answer: 'Vous pouvez ouvrir une issue sur notre dépôt github.com/girishlade111 ou transmettre les étapes de reproduction par e-mail à admin@ladestack.in.',
      },
      {
        question: 'Les outils côté client fonctionnent-ils hors ligne ?',
        answer: 'Une fois chargés dans la mémoire cache du navigateur, les outils statiques comme LS PDF Toolkit et LS Image Compressor s’exécutent sur votre processeur local sans exiger de connexion réseau continue.',
      },
    ],
    ctaText: 'Contacter directement l’assistance',
  },
};
