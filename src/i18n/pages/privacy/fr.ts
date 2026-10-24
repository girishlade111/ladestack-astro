import type { PrivacyPageData } from './types';

export const frPrivacy: PrivacyPageData = {
  seo: {
    title: 'Politique de confidentialité – Protection des données et architecture | LadeStack',
    description: 'Découvrez comment LadeStack protège vos données grâce à l’exécution WebAssembly côté client, la persistance IndexedDB locale et des pratiques transparentes.',
    ogTitle: 'Politique de confidentialité LadeStack',
    ogDescription: 'Architecture de traitement côté client, gestion des données et engagements de confidentialité de LadeStack.',
  },
  header: {
    badge: 'Confidentialité & Protection des données',
    title: 'Politique de confidentialité',
    lastUpdated: 'Dernière mise à jour : Octobre 2026',
    effectiveDate: 'Applicable immédiatement',
  },
  disclaimer: {
    title: 'Avis sur la version faisant foi',
    text: 'La version anglaise de cette Politique de confidentialité constitue le texte juridique officiel et faisant foi. Les traductions dans d’autres langues sont fournies uniquement à des fins d’information et de commodité, sans certification juridique indépendante.',
  },
  highlights: [
    { icon: 'shield-check', text: 'Exécution côté client' },
    { icon: 'lock', text: 'Aucun stockage de fichiers sur serveur' },
    { icon: 'check-circle', text: 'Architecture locale prioritaire' },
  ],
  sections: [
    {
      title: '1. Architecture de traitement côté client',
      paragraphs: [
        'LadeStack conçoit ses outils de développement selon un principe architectural local-first. Les utilitaires fondamentaux — notamment LS PDF Toolkit, LS Image Compressor et GB Coder Static Editor — s’exécutent directement au sein de votre navigateur via WebAssembly, Web Workers et les API HTML5 Canvas.',
        'Les fichiers que vous manipulez (tels que documents PDF, images et code source) sont traités exclusivement dans la mémoire vive de votre navigateur. Ces fichiers ne sont ni transmis ni hébergés sur les serveurs de LadeStack pendant le traitement.',
      ],
    },
    {
      title: '2. Informations collectées et interactions réseau',
      paragraphs: [
        'L’utilisation des outils publics sur ce site ne requiert aucune création de compte, identifiant de connexion ni carte de paiement. Les flux réseau sont limités aux éléments suivants :',
      ],
      listItems: [
        'Journaux d’accès standards du serveur web : données de diagnostic courantes comprenant l’agent utilisateur du navigateur, l’URL de provenance et les chemins demandés, servant exclusivement à la sécurité et à la surveillance de l’infrastructure.',
        'Intégrations IA tierces optionnelles : dans GB Coder, l’utilisateur peut configurer ses propres clés API d’IA externe. Les requêtes réseau s’effectuent alors directement entre l’environnement du navigateur et le fournisseur tiers désigné.',
        'Communications volontaires : les courriels adressés à admin@ladestack.in sont traités uniquement afin d’apporter une réponse à votre demande.',
      ],
    },
    {
      title: '3. Stockage local et cookies',
      paragraphs: [
        'LadeStack utilise le stockage local du navigateur (localStorage et IndexedDB) uniquement pour des fonctionnalités indispensables : la mémorisation de vos préférences visuelles (thème clair ou sombre) et la conservation de l’état de vos projets dans GB Coder.',
        'Nous n’utilisons aucun traceur publicitaire tiers ni cookie de ciblage commercial.',
      ],
    },
    {
      title: '4. Conservation et suppression des données',
      paragraphs: [
        'Comme les fichiers traités par LS PDF Toolkit et LS Image Compressor résident uniquement dans la mémoire vive locale, fermer ou recharger l’onglet supprime immédiatement toutes les données de travail de la mémoire système.',
        'Pour les projets GB Coder enregistrés dans IndexedDB, l’utilisateur garde le contrôle total et peut supprimer définitivement ses espaces de travail à tout moment en effaçant les données de site du navigateur.',
      ],
    },
  ],
  contactNote: {
    title: '5. Contact et demandes relatives à la confidentialité',
    text: 'Pour toute question relative à cette politique de confidentialité ou à nos frontières architecturales de traitement, veuillez contacter notre équipe d’ingénierie :',
    email: 'admin@ladestack.in',
  },
};
