/**
 * French (fr) — UI Strings
 * Natural technical French for developers and technical teams.
 * Preserves brand names: LadeStack, GB Coder, Astro.
 */
import type { UIStrings } from './en';

export const fr: UIStrings = {
  // Navigation
  'nav.platform': 'Plateforme',
  'nav.apps': 'Applications',
  'nav.codeStudio': 'Studio de Code',
  'nav.docs': 'Documentation',
  'nav.blog': 'Blog',
  'nav.about': 'À propos',
  'nav.support': 'Support',
  'nav.contact': 'Contact',
  'nav.quickJump': 'Accès Rapide',
  'nav.themeToggle': 'Changer de thème',
  'nav.languageSelect': 'Choisir la langue',
  'nav.openMenu': 'Ouvrir le menu',
  'nav.closeMenu': 'Fermer le menu',

  // Footer
  'footer.tagline': 'Outils pour développeurs haute performance, exécutés dans le navigateur, conçus pour la rapidité et la confidentialité.',
  'footer.status': 'Dans le navigateur · Exécution locale',
  'footer.tools': 'Outils',
  'footer.resources': 'Ressources',
  'footer.company': 'Société',
  'footer.legal': 'Mentions légales',
  'footer.rights': 'Tous droits réservés.',
  'footer.emailPrompt': 'Contactez directement l’équipe technique :',
  'footer.copyEmail': 'Copier l’adresse email',
  'footer.copiedEmail': 'Copié dans le presse-papier !',
  'footer.privacy': 'Politique de confidentialité',
  'footer.terms': 'Conditions d’utilisation',

  // Hero Section
  'hero.badge': 'Exécution dans le navigateur · Confidentialité 100% côté client',
  'hero.titleLine1': 'Créez, éditez et optimisez',
  'hero.titleLine2': 'directement dans votre navigateur.',
  'hero.description':
    'Utilitaires de développement haute performance avec exécution côté client. Aucun téléversement vers des serveurs, aucun abonnement payant et une réactivité instantanée.',
  'hero.ctaPrimary': 'Découvrir 17+ outils',
  'hero.ctaSecondary': 'Lancer le Studio IDE',
  'hero.ctaSecondaryAria': 'Lancer GB Coder IDE dans un nouvel onglet',
  'hero.editorFileName': 'CodeStudio.tsx',
  'hero.editorTabName': 'PreviewSandbox.html',
  'hero.editorStatus': 'Exécution dans le navigateur',
  'hero.editorPrivacy': 'Confidentialité : Localhost',
  'hero.editorNotification': 'Validation syntaxique et bac à sable : thread local du navigateur',
  'hero.editorNotificationBadge': 'Prêt au déploiement',
  'hero.specTitle': 'Spécifications de l’architecture',
  'hero.specRuntime': 'Environnement local',
  'hero.specExecutionModel': 'Modèle d’exécution',
  'hero.specExecutionValue': 'Environnement d’exécution côté client',
  'hero.specExecutionBadge': 'Local',
  'hero.specPrivacy': 'Confidentialité',
  'hero.specPrivacyValue': 'Aucun stockage sur serveur · Exécution client exclusive',
  'hero.specPrivacyBadge': 'Strict',
  'hero.specDistribution': 'Distribution',
  'hero.specDistributionValue': 'Architecture statique pré-générée',
  'hero.specDistributionBadge': 'Statique',
  'hero.browserCompatibility': 'Fonctionne sur tous les navigateurs modernes',
  'hero.viewAppsLink': 'Voir tous les outils vérifiés →',

  // Features Bento
  'features.eyebrow': 'ÉCOSYSTÈME D’OUTILS',
  'features.title': 'Conçu pour la vitesse, la confidentialité et la souveraineté',
  'features.subtitle':
    'Chaque utilitaire s’exécute strictement dans le moteur de votre navigateur. Pas d’inscription obligatoire, pas de télémétrie cloud et zéro latence.',
  'features.card1Title': 'GB Coder',
  'features.card1Desc':
    'Éditeur interactif HTML, CSS et JavaScript moderne avec compilation en temps réel, prévisualisation live dans un iframe et formatage accessible.',
  'features.card1Badge': 'IDE Vedette',
  'features.card2Title': 'Boîte à outils PDF LS',
  'features.card2Desc':
    '17 utilitaires côté client pour fusionner, diviser, compresser, protéger, faire pivoter et convertir vos PDF en mémoire locale.',
  'features.card2Badge': 'Suite 17-en-1',
  'features.card3Title': 'Optimiseur d’images LS',
  'features.card3Desc':
    'Compression côté client prenant en charge plus de 9 formats dont WebP, AVIF, PNG et JPEG pour une réduction instantanée du poids.',
  'features.card3Badge': 'Zéro téléversement',
  'features.card4Title': 'Utilitaires de carrière et productivité',
  'features.card4Desc':
    'Générateur de CV optimisé pour les ATS et utilitaires de précision conçus pour les véritables besoins des ingénieurs.',
  'features.card4Badge': 'Productivité',

  // How It Works
  'howItWorks.eyebrow': 'SIMPLICITÉ DU PROCESSUS',
  'howItWorks.title': 'Comment fonctionne GB Coder',
  'howItWorks.subtitle': 'Trois principes directeurs clairs sous-tendent chaque outil de notre plateforme.',
  'howItWorks.step1Num': '01',
  'howItWorks.step1Title': 'Accès immédiat sur navigateur',
  'howItWorks.step1Desc': 'Ouvrez n’importe quel outil et travaillez aussitôt. Aucun compte, clé API ou carte bancaire requis.',
  'howItWorks.step2Num': '02',
  'howItWorks.step2Title': 'Exécution locale sur votre machine',
  'howItWorks.step2Desc': 'Vos fichiers, extraits de code et médias sont traités uniquement dans la mémoire vive de votre appareil.',
  'howItWorks.step3Num': '03',
  'howItWorks.step3Title': 'Téléchargement direct et contrôle',
  'howItWorks.step3Desc': 'Exportez vos résultats immédiatement. Aucune donnée ne transite par un serveur externe.',

  // Use Cases
  'useCases.eyebrow': 'POUR QUI',
  'useCases.title': 'Pensé pour les flux de travail techniques modernes',
  'useCases.subtitle': 'Des développeurs indépendants aux équipes d’entreprise soucieuses de la confidentialité des données.',
  'useCases.case1Title': 'Développeurs Frontend',
  'useCases.case1Desc': 'Prototypes d’interfaces, inspection de composants HTML/CSS/JS et validation instantanée de designs modernes.',
  'useCases.case2Title': 'Équipes techniques',
  'useCases.case2Desc': 'Compresser et organiser des documents PDF techniques et schémas internes sans enfreindre les politiques de sécurité.',
  'useCases.case3Title': 'Développeurs exigeants sur la confidentialité',
  'useCases.case3Desc': 'Traitez des données sensibles avec l’assurance totale qu’aucun fichier ne quitte votre poste de travail.',

  // Product Showcase
  'showcase.eyebrow': 'CATALOGUE VÉRIFIÉ',
  'showcase.title': 'Découvrez nos applications en ligne',
  'showcase.subtitle': 'Des outils web côté client, entièrement gratuits et pensés pour la fiabilité.',
  'showcase.launchApp': 'Ouvrir l’application',
  'showcase.learnMore': 'En savoir plus',
  'showcase.inBrowser': 'Dans le navigateur',
  'showcase.viewAllCatalog': 'Voir tout le catalogue d’applications →',

  // FAQ
  'faq.eyebrow': 'FOIRE AUX QUESTIONS',
  'faq.title': 'Questions fréquentes',
  'faq.subtitle': 'Tout ce que vous devez savoir sur les outils, la confidentialité et l’architecture de LadeStack.',
  'faq.q1': 'Les outils LadeStack sont-ils vraiment gratuits ?',
  'faq.a1':
    'Oui. Tous les outils pour développeurs, y compris GB Coder, la suite PDF et l’optimiseur d’images, sont gratuits pour toujours, pour vos projets personnels comme commerciaux.',
  'faq.q2': 'Comment la confidentialité de mes fichiers est-elle assurée ?',
  'faq.a2':
    'L’ensemble des opérations sur les documents et le code s’exécute exclusivement dans le bac à sable local de votre navigateur. Aucun fichier n’est envoyé vers un serveur distant.',
  'faq.q3': 'Quels navigateurs web sont pris en charge ?',
  'faq.a3':
    'Tous les navigateurs récents supportant les standards HTML5 et Canvas API : Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge et Brave.',
  'faq.q4': 'Qui conçoit et maintient LadeStack ?',
  'faq.a4':
    'LadeStack est conçu et maintenu par son fondateur Girish Lade, avec pour objectif d’offrir des outils de développement accessibles et respectueux de la vie privée à l’échelle mondiale.',

  // CTA Banner
  'cta.title': 'Prêt à accélérer vos développements ?',
  'cta.subtitle': 'Commencez à utiliser les utilitaires de développement LadeStack dès aujourd’hui. Aucune création de compte requise.',
  'cta.button': 'Explorer tous les outils',

  // SEO Metadata
  'seo.homeTitle': 'LadeStack – Plateforme de développement et utilitaires dans le navigateur',
  'seo.homeDescription':
    'Outils de développement haute performance dans le navigateur : éditeur de code, boîte à outils PDF 17-en-1, compression d’images. Gratuit, exécution locale.',
  'seo.ogTitle': 'LadeStack – Outils de développement et utilitaires côté client',
  'seo.ogDescription':
    'Studio de code dans le navigateur, suite PDF privée et compresseur d’images. Confidentialité 100% côté client, gratuit à vie.',
};
