import type { DocsPageData } from './types';

export const frDocs: DocsPageData = {
  seo: {
    title: 'Documentation – Architecture, guides et référence API | LadeStack',
    description: 'Documentation technique complète des outils LadeStack. Guides d’architecture, flux WebAssembly côté client et historique des versions.',
    ogTitle: 'Documentation développeur LadeStack',
    ogDescription: 'Spécifications techniques, architecture et tutoriels pour GB Coder, LS PDF et LS Image.',
  },
  hero: {
    badge: 'Documentation technique',
    title: 'Documentation pour développeurs',
    description: 'Spécifications techniques, guides d’architecture d’exécution locale et ressources de référence pour la plateforme LadeStack.',
    searchPlaceholder: 'Rechercher dans la documentation, outils, guides…',
    searchAriaLabel: 'Rechercher dans la documentation, outils, guides',
  },
  categoriesSection: {
    title: 'Guides d’architecture fondamentaux',
    description: 'Sélectionnez une catégorie ci-dessous pour découvrir les spécifications opérationnelles détaillées.',
    viewGuide: 'Consulter le guide',
    closeGuide: 'Fermer le guide',
    categories: [
      {
        id: 'getting-started',
        icon: 'book-open',
        title: 'Prise en main',
        description: 'Principes de conception, modèle d’exécution dans le navigateur et flux local-first',
        overview: 'Les outils LadeStack s’exécutent directement dans le navigateur sans acheminer de données confidentielles vers des serveurs distants.',
        sections: [
          {
            title: 'Exécution immédiate dans le navigateur',
            content: 'Démarrez vos outils sans aucune installation préalable. Les binaires WebAssembly et les Web Workers s’initialisent directement dans la mémoire de votre navigateur.',
          },
          {
            title: 'Stockage local et mémoire sécurisée',
            content: 'Les fichiers de projet et documents téléversés demeurent exclusivement dans la RAM et l’IndexedDB locale. Aucun fichier n’est envoyé aux serveurs LadeStack. Les fonctions d’IA facultatives ne contactent des API tierces que si vous les activez expressément.',
          },
          {
            title: 'Exportation de bundles de production',
            content: 'Exportez instantanément vos fichiers web statiques compilés, vos documents PDF modifiés ou vos images compressées vers votre stockage local.',
          },
        ],
      },
      {
        id: 'code-studio',
        icon: 'code-2',
        title: 'Moteur GB Coder',
        description: 'Compilation de l’Éditeur Statique, émulation Node.js dans WebContainer et intégration Monaco',
        overview: 'Analyse détaillée de l’architecture à double moteur de GB Coder : Éditeur Statique ultra-rapide et IDE Avancé WebContainer.',
        sections: [
          {
            title: 'Architecture à double moteur',
            content: 'L’Éditeur Statique analyse HTML, CSS et JavaScript sans aucun délai d’initialisation. L’IDE Avancé WebContainer déploie un environnement local Node.js sur les navigateurs Chromium pour faire tourner serveurs de dev et packages npm.',
          },
          {
            title: 'Intégration de Monaco Editor',
            content: 'Expérience d’édition de code de niveau bureau avec coloration syntaxique, auto-complétion intelligente, diagnostics et raccourcis clavier complets.',
          },
          {
            title: 'Persistance locale et export',
            content: 'Enregistrement automatique des projets dans l’IndexedDB locale et exportation d’archives ZIP autonomes prêtes à déployer.',
          },
        ],
      },
      {
        id: 'pdf-wasm',
        icon: 'file-text',
        title: 'LS PDF Toolkit',
        description: 'Manipulation de PDF côté client propulsée par WebAssembly avec isolation mémoire',
        overview: 'Explication de la façon dont WebAssembly traite et modifie les flux PDF binaires directement dans la mémoire du navigateur.',
        sections: [
          {
            title: 'Fusion et découpage de flux',
            content: 'Combinez plusieurs fichiers PDF ou extrayez des plages de pages personnalisées sans perte de qualité ni aller-retour serveur.',
          },
          {
            title: 'Compression optimisée en mémoire',
            content: 'Optimise les flux d’objets et compresse les polices intégrées localement pour réduire la taille finale des documents.',
          },
          {
            title: 'Sécurité côté client',
            content: 'Chiffrez et protégez vos documents PDF par mot de passe directement dans la RAM du navigateur avant l’export.',
          },
        ],
      },
      {
        id: 'image-engine',
        icon: 'image',
        title: 'LS Image Engine',
        description: 'Traitement d’images multiformat via Canvas et WebAssembly avec prévisualisation directe',
        overview: 'Conversion, compression et inspection comparative en temps réel via des Web Workers exécutés en local.',
        sections: [
          {
            title: 'Prise en charge étendue des formats',
            content: 'Support complet des normes modernes du web : AVIF, WebP, PNG, JPEG, SVG et TIFF.',
          },
          {
            title: 'Calibration de la qualité',
            content: 'Ajustez les seuils de compression avec perte et le sous-échantillonnage de la chrominance avec un comparateur visuel avant/après en direct.',
          },
        ],
      },
    ],
  },
  articlesSection: {
    title: 'Articles techniques à la une',
    description: 'Guides pas à pas portant sur la sécurité, les limites de confidentialité et l’optimisation des ressources web.',
    readArticle: 'Lire l’article complet',
    closeArticle: 'Fermer l’article',
    stepsTitle: 'Étapes d’exécution :',
    summaryLabel: 'Résumé :',
    articles: [
      {
        id: 'client-side-privacy',
        title: 'Comprendre l’architecture de confidentialité côté client',
        category: 'Sécurité',
        readTime: '4 min de lecture',
        intro: 'Comment LadeStack protège vos données sensibles grâce à l’isolation mémoire de WebAssembly et au bac à sable du navigateur.',
        steps: [
          'Allocation d’un bac à sable en mémoire via les Web Workers.',
          'Traitement binaire local avec WebAssembly sans transfert réseau.',
          'Conservation d’état dans un stockage IndexedDB hermétique.',
          'Ramasse-miettes immédiat lors de la fermeture de l’onglet.',
        ],
        summary: 'En confinant les calculs à la machine de l’utilisateur, LadeStack supprime les risques de fuites sur serveur tout en garantissant une réactivité maximale.',
      },
      {
        id: 'optimizing-assets',
        title: 'Bonnes pratiques pour la compression d’actifs web',
        category: 'Performance',
        readTime: '6 min de lecture',
        intro: 'Techniques pour réduire le poids des images et documents sans compromis perceptible sur la qualité visuelle.',
        steps: [
          'Adopter les formats de nouvelle génération AVIF ou WebP pour les graphismes matriciels.',
          'Calibrer les paramètres de quantification avec contrôle visuel direct.',
          'Nettoyer les métadonnées d’appareil photo EXIF et profils colorimétriques superflus.',
          'Mesurer les gains de Largest Contentful Paint (LCP) sur supports mobiles.',
        ],
        summary: 'Une compression ciblée côté client allège considérablement la consommation de bande passante et booste les scores Core Web Vitals.',
      },
    ],
  },
  changelogSection: {
    title: 'Historique des versions',
    description: 'Mises à jour récentes de la plateforme, évolutions d’architecture et nouvelles fonctionnalités.',
    items: [
      {
        version: 'v1.0.0',
        date: 'Octobre 2026',
        type: 'Version majeure',
        description: 'Refonte complète aux couleurs Obsidian & Precision Emerald, internationalisation intégrale en 9 langues, accessibilité et performances côté client.',
      },
      {
        version: 'v0.9.4',
        date: 'Août 2026',
        type: 'Amélioration',
        description: 'Nouveaux outils de manipulation de documents PDF côté client avec compression optimisée en mémoire.',
      },
      {
        version: 'v0.9.0',
        date: 'Juin 2026',
        type: 'Lancement',
        description: 'Lancement public initial de l’environnement de développement à double moteur GB Coder.',
      },
    ],
  },
};
