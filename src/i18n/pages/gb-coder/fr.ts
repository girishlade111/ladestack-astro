import type { GbCoderPageData } from './types';

export const fr: GbCoderPageData = {
  seo: {
    title: 'GB Coder — IDE et studio de développement dans le navigateur | LadeStack',
    description: 'Créez, exécutez et prévisualisez du code web instantanément avec GB Coder. Monaco Editor, prévisualisation DOM en direct, runtime Node.js WebContainer et confidentialité locale. Gratuit.',
    ogTitle: 'GB Coder — IDE et studio de développement dans le navigateur | LadeStack',
    ogDescription: 'Créez, exécutez et prévisualisez du code web instantanément avec GB Coder. Monaco Editor, prévisualisation DOM en direct, runtime Node.js WebContainer et confidentialité locale. Gratuit.',
  },
  hero: {
    badge: 'Studio de développement web dans le navigateur',
    titleLine: 'Développez, exécutez et déployez du code',
    titleHighlight: 'instantanément dans votre navigateur.',
    description: 'GB Coder associe Monaco Editor à deux moteurs d’exécution : prototypage web statique immédiat sur tous les navigateurs modernes, et environnements Node.js full-stack en mémoire via WebContainers.',
    ctaStudio: 'Lancer GB Coder Studio',
    ctaProjects: 'Lancer l’IDE WebContainer',
    trustBadges: [
      'Confidentialité côté client',
      'Compilation ultra-rapide',
      'Gratuit à vie · Zéro barrière payante',
    ],
  },
  environments: {
    eyebrow: 'Architecture à double exécution',
    title: 'Deux moteurs de code spécialisés',
    description: 'Choisissez l’environnement adapté à vos besoins : prototypage statique ultra-rapide ou développement Node.js complet dans le navigateur.',
    staticCard: {
      badge: 'Compatibilité universelle',
      engine: 'Bac à sable client instantané',
      title: 'Prototypage statique et multi-fichiers',
      description: 'Développement sans configuration pour HTML5, CSS3 et JavaScript. Éditeur Monaco avec synchronisation DOM en direct, coloration syntaxique, formatage automatique et injection de bibliothèques CDN.',
      features: [
        'Synchronisation DOM en quelques millisecondes pendant la frappe',
        'Injection de bibliothèques CDN externes (Tailwind, Lucide, Bootstrap)',
        'Pris en charge sur tous les navigateurs modernes (bureau et mobile)',
      ],
      status: 'Zéro délai de build',
      cta: 'Commencer à prototyper',
    },
    webContainerCard: {
      badge: 'Micro-OS Full-Stack',
      engine: 'Node.js dans le navigateur',
      title: 'IDE WebContainer avancé',
      description: 'Environnement Node.js full-stack s’exécutant directement dans la mémoire du navigateur. Exécutez npm install, lancez des scripts de packages, démarrez des serveurs Vite et développez avec React et Vue.',
      features: [
        'Exécution de runtimes Node.js et installation de paquets npm',
        'Modèles React et Vue avec rechargement à chaud (HMR)',
        'Bac à sable isolé avec SharedArrayBuffer et Web Workers',
      ],
      status: 'Support Chromium et Firefox',
      cta: 'Lancer l’IDE WebContainer',
    },
  },
  pillars: {
    eyebrow: 'Fonctionnalités piliers',
    title: 'Conçu pour la précision, la rapidité et la confidentialité',
    description: 'Chaque fonctionnalité de GB Coder a été pensée pour apporter des capacités de niveau professionnel directement dans votre navigateur.',
    items: [
      {
        icon: 'code-2',
        title: 'Éditeur de code Monaco',
        badge: 'Moteur VS Code',
        description: 'L’éditeur de référence qui propulse VS Code. Validation syntaxique TypeScript, autocomplétion, curseurs multiples, correspondance des parenthèses et repliage du code.',
      },
      {
        icon: 'eye',
        title: 'Prévisualisation en direct',
        badge: 'DOM synchronisé',
        description: 'Rendu instantané de vos fichiers HTML, CSS et JavaScript pendant votre frappe. Inclut une fenêtre de prévisualisation détachable et un QR code pour tester sur mobile via le réseau local.',
      },
      {
        icon: 'cpu',
        title: 'Micro-OS WebContainer',
        badge: 'Node.js en mémoire',
        description: 'Exécutez de vrais processus Node.js, lancez des scripts npm et démarrez des serveurs de développement Vite pour prototyper avec React et Vue en mémoire.',
      },
      {
        icon: 'shield-check',
        title: 'Persistance locale',
        badge: 'Confidentialité client',
        description: 'Vos projets sont sauvegardés de manière sécurisée dans l’IndexedDB de votre appareil. Aucune inscription obligatoire ni envoi de télémétrie vers des serveurs distants.',
      },
      {
        icon: 'layers',
        title: 'Architecture multi-fichiers',
        badge: 'Structure modulaire',
        description: 'Organisez des composants web complexes sur plusieurs fichiers et dossiers grâce à un explorateur de fichiers clair et une gestion fluide des onglets.',
      },
      {
        icon: 'download',
        title: 'Sauvegarde sécurisée',
        badge: 'Archives ZIP',
        description: 'Exportez vos projets sous forme d’archives ZIP complètes à tout moment en préservant l’arborescence des dossiers. Restaurez vos projets en un clic.',
      },
    ],
  },
  guardrails: {
    eyebrow: 'Cadre technique et compatibilité',
    title: 'Runtime WebContainer et prise en charge des navigateurs',
    desc1: 'GB Coder utilise la technologie WebContainers pour exécuter de véritables processus Node.js dans les navigateurs modernes supportant SharedArrayBuffer et l’isolation multi-origines (COOP/COEP).',
    desc2: 'Pour le prototypage léger ou dans les environnements où les en-têtes d’isolation WebContainer sont restreints (notamment Apple Safari), notre Éditeur Statique offre une alternative immédiate sans dépendance externe.',
    supportedHeading: 'Environnements pris en charge',
    environments: [
      { browser: 'Google Chrome', support: 'WebContainer + Éditeur Statique', highlight: true },
      { browser: 'Microsoft Edge', support: 'WebContainer + Éditeur Statique', highlight: true },
      { browser: 'Brave Browser', support: 'WebContainer + Éditeur Statique', highlight: true },
      { browser: 'Mozilla Firefox', support: 'WebContainer (COOP/COEP)', highlight: true },
      { browser: 'Apple Safari', support: 'Mode Éditeur Statique', highlight: false },
    ],
  },
  faqs: {
    eyebrow: 'Questions techniques',
    title: 'Foire aux questions',
    description: 'Des informations claires et transparentes sur les capacités, l’architecture et les limites de GB Coder.',
    items: [
      {
        q: 'Comment GB Coder exécute-t-il du code full-stack sans serveur distant ?',
        a: 'GB Coder exploite la technologie WebContainer, qui exécute de véritables processus Node.js et des micro-environnements WebAssembly directement dans l’onglet de votre navigateur via SharedArrayBuffer et l’isolation cross-origin (COOP/COEP). Les serveurs de développement et étapes de compilation tournent entièrement sur le matériel de votre machine.',
      },
      {
        q: 'Quelle est la différence entre l’Éditeur Statique et l’IDE WebContainer ?',
        a: 'L’Éditeur Statique multi-fichiers assure un rendu DOM instantané pour le HTML, CSS et JavaScript sans délai sur tous les navigateurs. L’IDE WebContainer avancé permet d’exécuter des gestionnaires de paquets Node.js, des scripts npm et des frameworks comme React et Vue.',
      },
      {
        q: 'Mon code source et mes projets sont-ils envoyés sur les serveurs de LadeStack ?',
        a: 'Non. GB Coder repose sur un modèle strictement local. Votre code, vos fichiers et l’état de vos projets sont enregistrés directement dans l’IndexedDB de votre navigateur. LadeStack ne stocke ni ne suit votre code sur des serveurs distants.',
      },
      {
        q: 'Quels navigateurs sont compatibles avec GB Coder ?',
        a: 'L’Éditeur Statique fonctionne sur tous les navigateurs modernes, y compris Apple Safari, Google Chrome, Microsoft Edge et Mozilla Firefox. L’IDE WebContainer fonctionne sur les navigateurs basés sur Chromium (Chrome, Edge, Brave) et sur Firefox avec COOP/COEP activé. En raison des contraintes actuelles de WebKit, les utilisateurs de Safari peuvent utiliser l’Éditeur Statique complet.',
      },
      {
        q: 'GB Coder est-il totalement gratuit ?',
        a: 'Oui, son utilisation est entièrement gratuite. Il n’y a aucun niveau payant, aucune carte bancaire requise et aucun quota quotidien. Il est développé et maintenu par Girish Lade au sein de l’écosystème ouvert LadeStack.',
      },
      {
        q: "Comment créer un nouveau projet dans GB Coder ?",
        a: "Ouvrez GB Coder et choisissez l'environnement adapté à votre projet. Pour un prototypage côté client ultra-rapide en HTML, CSS et JavaScript, lancez le Static Editor. Pour des projets complets Node.js avec paquets npm et frameworks modernes, démarrez un espace de travail dans le WebContainer IDE et sélectionnez un modèle de départ ou créez de nouveaux fichiers.",
      },
      {
        q: "Quels langages de programmation puis-je écrire et éditer dans GB Coder ?",
        a: "GB Coder s'appuie sur le moteur Monaco Editor de Microsoft pour offrir la coloration syntaxique, l'autocomplétion, la correspondance des parenthèses et le pliage de code pour JavaScript, TypeScript, HTML, CSS, JSON et Markdown. Si l'édition prend en charge de multiples langages, l'exécution directe dans le navigateur est optimisée pour les technologies web et les environnements Node.js.",
      },
      {
        q: "Puis-je prévisualiser mon site web en direct pendant que j'écris du code ?",
        a: "Oui. GB Coder intègre une prévisualisation en direct et en temps réel. Avec le Static Editor, les modifications du DOM sont synchronisées dans une iframe sandbox isolée avec une latence inférieure à la milliseconde au fil de votre saisie. Dans le WebContainer IDE, l'aperçu est servi par des serveurs de développement locaux avec rechargement à chaud (HMR), fenêtre détachée et test par code QR sur réseau local.",
      },
      {
        q: "Puis-je installer des paquets npm et exécuter des commandes de terminal dans GB Coder ?",
        a: "Oui, dans l'environnement WebContainer IDE. Le moteur WebContainer exécute d'authentiques processus Node.js directement dans la mémoire de votre navigateur, ce qui vous permet de lancer des commandes de terminal, d'exécuter npm install pour les paquets compatibles et de lancer des scripts de build sans serveur distant ni installation locale.",
      },
      {
        q: "Puis-je développer des projets avec des frameworks JavaScript modernes dans GB Coder ?",
        a: "Oui. Le WebContainer IDE prend en charge les frameworks front-end modernes tels que React et Vue grâce à des modèles de démarrage préconfigurés et des serveurs de développement Vite. Les builds statiques ou composants intégrés via CDN peuvent également être prototypés directement dans le Static Editor.",
      },
      {
        q: "En quoi l'assistant IA GB Assist peut-il m'aider pendant le développement ?",
        a: "GB Assist est un compagnon de code intelligent conçu pour expliquer du code complexe, suggérer des améliorations d'architecture, générer du code réutilisable et diagnostiquer les erreurs d'exécution. Toutes les suggestions s'affichent directement dans l'éditeur pour vous permettre de vérifier et valider les modifications avant de les intégrer.",
      },
      {
        q: "Dois-je fournir ma propre clé API pour utiliser les fonctionnalités IA dans GB Coder ?",
        a: "Oui. GB Coder applique un modèle Bring-Your-Own-Key (BYOK). Vous configurez votre propre clé API privée issue de fournisseurs compatibles tels qu'OpenAI, Anthropic ou Google Gemini. Les requêtes sont transmises directement de votre navigateur vers le fournisseur en HTTPS ; LadeStack ne relaie, n'inspecte et ne stocke jamais vos clés API ni vos invites de code.",
      },
      {
        q: "Comment mes projets et mes modifications de code sont-ils sauvegardés dans GB Coder ?",
        a: "GB Coder enregistre vos fichiers de projet, votre arborescence et l'état de votre espace de travail localement dans votre navigateur grâce à IndexedDB. Votre code n'est jamais transféré ni stocké sur les serveurs de LadeStack. Comme les données résident sur votre appareil, vider le cache, utiliser la navigation privée ou effacer les données de site peut réinitialiser vos projets. Exportez régulièrement des archives ZIP pour vos travaux importants.",
      },
      {
        q: "Puis-je télécharger ou exporter les fichiers de mon projet GB Coder ?",
        a: "Oui. Vous pouvez exporter l'intégralité de votre espace de travail sous forme d'archive ZIP standard à tout moment. L'archive téléchargée conserve l'arborescence complète des dossiers, le code source et les fichiers de configuration, vous permettant de continuer le développement localement dans VS Code ou de déployer votre code sur n'importe quel hébergeur ou dépôt Git.",
      },
      {
        q: "Que faire si l'éditeur, le terminal ou l'aperçu en direct cesse de fonctionner ?",
        a: "Vérifiez d'abord que votre navigateur prend en charge l'environnement sélectionné. Le WebContainer IDE nécessite un navigateur basé sur Chromium (Chrome, Edge, Brave) ou Firefox récent avec SharedArrayBuffer et isolation cross-origin (COOP/COEP) activés ; si votre navigateur n'est pas compatible (comme Safari), utilisez le Static Editor. En cas de problème, exportez une sauvegarde de vos fichiers puis actualisez la page. Si le souci persiste, contactez l'équipe via la page Contact de LadeStack.",
      },
    ],
  },
  cta: {
    title: 'Prêt à coder, tester et déployer dans votre navigateur ?',
    description: 'Lancez GB Coder dès maintenant sans aucune installation. Découvrez Monaco Editor et les flux de travail Node.js dans le navigateur dès aujourd’hui.',
    launchStudioBtn: 'Lancer GB Coder Studio',
    exploreAllBtn: 'Explorer tous les utilitaires',
    footerTagline: 'GB Coder par LadeStack · Architecture dans le navigateur · Gratuit à vie',
  },
};
