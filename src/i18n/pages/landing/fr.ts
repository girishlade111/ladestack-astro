import type { LandingPageData } from './types';

export const fr: LandingPageData = {
  missionVision: {
    eyebrow: 'À PROPOS DE LADESTACK',
    title: "Bâtir l'avenir du",
    titleHighlight: 'développement IA',
    subtitle:
      'Un écosystème SaaS propulsé par l’IA conçu pour offrir à chaque développeur des outils de niveau entreprise à vitesse startup : gratuit, ouvert et durable.',
    stats: [
      { value: '8K+', label: 'Développeurs' },
      { value: '80+', label: 'Projets créés' },
      { value: '100+', label: 'Pays' },
      { value: '99%', label: 'Disponibilité' },
    ],
    mission: {
      eyebrow: 'Notre Mission',
      tagline: 'Pourquoi nous existons',
      headline: "Démocratiser l'outillage IA",
      body: "Démocratiser les outils de développement avancés en fournissant des solutions d'IA d'entreprise réduisant radicalement le temps de développement, accessibles à tous indépendamment du budget.",
      context:
        "Nous croyons que l'écart entre un développeur indépendant et une équipe FAANG ne doit pas se mesurer aux outils. Quand les outils équilibrent le terrain, seules la créativité et l'exécution comptent.",
      timelineTitle: 'Évolution de la Plateforme',
      timeline: [
        {
          year: '2024',
          label: 'Fondation',
          desc: "LadeStack naît de la volonté de démocratiser l'IA pour les développeurs.",
          detail: 'Début avec un prototype d’éditeur de code IA, itéré avec 500 pionniers pour définir la direction du produit.',
        },
        {
          year: '2025',
          label: 'Lancement Plateforme',
          desc: 'L’éditeur de code IA déployé auprès de plus de 10 000 développeurs mondiaux.',
          detail: 'Sortie de l’éditeur complet avec compilation temps réel, suggestions intelligentes et support multilingue.',
        },
        {
          year: '2026',
          label: 'Écosystème Complet',
          desc: '5 outils IA unifiés en une suite de développement cohérente.',
          detail: 'Tests d’API, générateur web, partage de fichiers et Doc AI rejoignent la plateforme pour compléter la suite.',
        },
      ],
    },
    vision: {
      eyebrow: 'Notre Vision',
      tagline: 'Notre destination',
      headline: 'L’IA absorbe la complexité',
      body: 'Un monde où chacun peut déployer des logiciels d’entreprise : l’IA gère la complexité technique, permettant aux ingénieurs de se consacrer à la créativité et à l’impact.',
      features: [
        { icon: 'code-2', text: 'Assistance au code par IA' },
        { icon: 'zap', text: 'Optimisation intelligente du code' },
        { icon: 'shield', text: 'Sécurité de niveau entreprise' },
        { icon: 'globe', text: 'Collaboration mondiale des développeurs' },
        { icon: 'users', text: 'Développement axé sur la communauté' },
        { icon: 'layers', text: 'Écosystème unifié multi-outils' },
      ],
    },
    approach: {
      title: 'Ouvert par défaut',
      body: 'Outils fondamentaux open-source, feuille de route publique et tarifs transparents. La confiance est le seul avantage concurrentiel illimité.',
      badges: ['12K+ étoiles', '200+ contributeurs', 'Feuille de route publique'],
    },
  },

  coreValues: {
    eyebrow: 'VALEURS ET PRINCIPES',
    title: 'Ce qui guide chacune de',
    titleHighlight: 'nos créations',
    subtitle:
      'Principes d’ingénierie fondamentaux guidant notre architecture logicielle, nos garanties de confidentialité et notre accès ouvert.',
    values: [
      {
        id: '01',
        number: '01',
        title: 'Innovation Native IA',
        tagline: 'L’intelligence à chaque frappe',
        badge: 'IA Contextuelle',
        badgeIcon: 'zap',
        description:
          'Une IA de pointe directement intégrée aux outils de développement : automatisation des tâches répétitives et anticipation des besoins de travail.',
        bullets: [
          'Complétion de code sensible au contexte',
          'Synthèse multilingue instantanée',
          'Adaptation dynamique à la base de code',
        ],
      },
      {
        id: '02',
        number: '02',
        title: 'Autonomie des Développeurs',
        tagline: 'Puissance entreprise sans barrières',
        badge: '100% Gratuit',
        badgeIcon: 'shield-check',
        description:
          'Des outils professionnels rendus librement accessibles aux créateurs indépendants comme aux équipes internationales.',
        bullets: [
          'Fonctionnalités essentielles illimitées',
          'Aucune carte bancaire requise',
          'Collaboration d’équipe intégrée',
        ],
      },
      {
        id: '03',
        number: '03',
        title: 'Qualité de Production',
        tagline: 'Éprouvé sur le terrain, pas une bêta',
        badge: '99.9% Disponibilité SLA',
        badgeIcon: 'cpu',
        description:
          'Testé en conditions réelles avec redondance de basculement, déploiements sans interruption et chiffrement de bout en bout.',
        bullets: [
          'Garantie de disponibilité à 99,9%',
          'Normes de conformité SOC 2',
          'Chiffrement intégral de bout en bout',
        ],
      },
      {
        id: '04',
        number: '04',
        title: 'Ouvert et Transparent',
        tagline: 'Rien à cacher, tout à partager',
        badge: 'Open Source',
        badgeIcon: 'git-fork',
        description:
          'Algorithmes fondamentaux open-source avec feuille de route publique et fonctionnalités votées par la communauté.',
        bullets: [
          'Architecture centrale open source',
          'Feuille de route produit publique',
          'Votes communautaires pour les fonctionnalités',
        ],
      },
    ],
    principlesEyebrow: 'Principes Directeurs',
    principles: [
      'Open Source',
      'Natif IA',
      'Développeur d’Abord',
      'Zéro Verrouillage',
      'Gratuit Toujours',
      'Porté par la Communauté',
      'Transparent',
      'Prêt pour Entreprise',
      'Conforme SOC 2',
      'Confidentialité d’Abord',
    ],
  },

  metricsImpact: {
    eyebrow: 'IMPACT ET RÉSULTATS',
    title: 'Des chiffres qui parlent',
    titleHighlight: 'd’eux-mêmes',
    subtitle: 'Un impact concret sur les développeurs : mesurable, reproductible et en constante expansion.',
    heroStats: [
      {
        value: '10x',
        label: 'Développement Plus Rapide',
        sub: 'vs code manuel',
        icon: 'zap',
      },
      {
        value: '8K+',
        label: 'Développeurs Actifs',
        sub: 'dans le monde entier',
        icon: 'users',
      },
      {
        value: '99.9%',
        label: 'Disponibilité Plateforme',
        sub: 'SLA niveau entreprise',
        icon: 'trending-up',
      },
      {
        value: '98%',
        label: 'Satisfaction Développeur',
        sub: 'score de satisfaction',
        icon: 'heart',
      },
    ],
    toolMetricsTitle: 'Gains de Productivité Constatés',
    toolMetricsSubtitle: 'Accélération mesurée sur les principaux flux de travail',
    toolMetrics: [
      {
        tool: 'Éditeur de Code IA',
        icon: 'code-2',
        metrics: [
          { label: 'Code rédigé par IA', value: 73 },
          { label: 'Réduction des anomalies', value: 61 },
          { label: 'Temps de relecture épargné', value: 55 },
        ],
      },
      {
        tool: 'Testeur d’API',
        icon: 'zap',
        metrics: [
          { label: 'Couverture de tests accrue', value: 88 },
          { label: 'Effort manuel réduit', value: 79 },
          { label: 'Déploiements accélérés', value: 64 },
        ],
      },
      {
        tool: 'Générateur de Docs',
        icon: 'trending-up',
        metrics: [
          { label: 'Temps de rédaction réduit', value: 82 },
          { label: 'Précision technique accrue', value: 91 },
          { label: 'Vitesse d’onboarding', value: 68 },
        ],
      },
    ],
    benchmarksTitle: 'Performances et Fiabilité',
    benchmarks: [
      { label: 'Accélération', value: '92%', sub: 'Gain d’exécution en environnement réel' },
      { label: 'Disponibilité SLA', value: '99.9%', sub: 'Disponibilité continue garantie' },
      { label: 'Satisfaction', value: '98%', sub: 'Score net de recommandation' },
      { label: 'Portée Globale', value: '85%', sub: 'Distribution en bordure à faible latence' },
    ],
  },

  freeForever: {
    eyebrow: 'PROMESSE 100% GRATUIT POUR TOUJOURS',
    title: 'Puissance IA Entreprise.',
    titleHighlight: 'Zéro Facturation.',
    subtitle:
      'Nous pensons que les outils d’ingénierie de haute précision ne doivent pas être restreints par des paywalls. Chaque développeur accède à des capacités d’entreprise sans carte bancaire.',
    commitments: [
      {
        number: '01',
        title: 'Outils IA Essentiels Illimités',
        badge: '5+ Produits en Ligne',
        badgeIcon: 'code-2',
        description:
          'Accès complet à l’Éditeur de Code IA, la Suite PDF 17-en-1, le Compresseur d’Images LS, Swift Resume et le Convertisseur Bharat Land.',
        bullets: ['Aucun quota journalier', 'Ensemble complet de fonctionnalités', 'Mises à jour gratuites en continu'],
      },
      {
        number: '02',
        title: 'Zéro Paywalls ni Périodes d’Essai',
        badge: 'Sans Carte Bancaire',
        badgeIcon: 'shield-check',
        description:
          'Gratuit pour toujours signifie exactement cela : pas de compte à rebours de 14 jours, pas de factures cachées ni de coordonnées bancaires.',
        bullets: ['Accès instantané en un clic', 'Aucun abonnement forcé', 'Totalement libre pour projets commerciaux'],
      },
      {
        number: '03',
        title: '100% Confidentialité et Sécurité',
        badge: 'Exécution Navigateur',
        badgeIcon: 'lock',
        description:
          'Le traitement des PDF et des images s’exécute intégralement côté client dans votre navigateur. Vos données et votre code ne quittent jamais votre machine.',
        bullets: ['Aucun transfert de fichier distant', 'Respect des standards SOC 2', 'Chiffrement local en mémoire'],
      },
      {
        number: '04',
        title: 'Communauté et Éthique Ouverte',
        badge: 'Porté par la Communauté',
        badgeIcon: 'heart-handshake',
        description:
          'Conçu au grand jour avec une feuille de route publique, des fonctionnalités votées par la communauté et des fondations open source.',
        bullets: ['Feuille de route publique sur GitHub', 'Suggestions de fonctionnalités communautaires', 'Communauté de plus de 8 000 développeurs'],
      },
    ],
  },

  developerCommunity: {
    eyebrow: 'COMMUNAUTÉ DÉVELOPPEURS',
    title: 'Conçu avec les développeurs,',
    titleHighlight: 'pour les développeurs',
    subtitle:
      'Un écosystème ouvert et dynamique où chaque outil résulte d’un échange continu avec ses utilisateurs. Rejoignez, contribuez et progressez avec une communauté qui déploie ensemble.',
    stats: [
      { value: '8K+', label: 'Développeurs', icon: 'users' },
      { value: '12K+', label: 'Projets créés', icon: 'layers' },
      { value: '100+', label: 'Pays', icon: 'globe' },
      { value: '4.1 / 5', label: 'Note moyenne', icon: 'star' },
    ],
    channelsTitle: 'Écosystème Communautaire',
    channels: [
      {
        icon: 'code-2',
        label: 'Open Source',
        stat: '2.4K étoiles',
        description: 'Forkez, participez et façonnez les outils IA de demain aux côtés de milliers de contributeurs.',
        cta: 'Voir sur GitHub',
        url: 'https://github.com/girishlade111',
      },
      {
        icon: 'message-square',
        label: 'Communauté Discord',
        stat: '8K membres',
        description: 'Assistance en temps réel, partages de projets et entraide avec plus de 8 000 développeurs.',
        cta: 'Rejoindre Discord',
        url: 'https://discord.gg/ladestack',
      },
      {
        icon: 'book-open',
        label: 'Documentation',
        stat: '200+ guides',
        description: 'Guides exhaustifs, références d’API et tutoriels détaillés conçus pour tous les niveaux.',
        cta: 'Lire la Doc',
        url: '/docs',
      },
      {
        icon: 'rocket',
        label: 'Modèles de Démarrage',
        stat: '60+ modèles',
        description: 'Modèles prêts pour la production selon les meilleures pratiques. Déployez en quelques instants.',
        cta: 'Explorer les Modèles',
        url: '/apps',
      },
      {
        icon: 'globe',
        label: 'Événements Globaux',
        stat: '24 à venir',
        description: 'Hackathons, webinaires et ateliers organisés dans le monde entier : apprenez et échangez.',
        cta: 'Découvrir les Événements',
        url: '/blog',
      },
      {
        icon: 'zap',
        label: 'Défis Hebdomadaires',
        stat: 'Chaque semaine',
        description: 'Défis de code assistés par IA chaque semaine. Gagnez des badges et hissez-vous au classement.',
        cta: 'Participer au Défi',
        url: '/apps',
      },
    ],
  },
};
