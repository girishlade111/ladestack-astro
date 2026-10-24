import type { TermsPageData } from './types';

export const frTerms: TermsPageData = {
  seo: {
    title: 'Conditions d’utilisation – Utilisation de la plateforme et licences | LadeStack',
    description: 'Consultez les Conditions d’utilisation des outils pour développeurs LadeStack, la propriété intellectuelle, l’exécution côté client et les exclusions de responsabilité.',
    ogTitle: 'Conditions d’utilisation LadeStack',
    ogDescription: 'Conditions d’utilisation, propriété intellectuelle des créations et droits d’exploitation commerciale des outils LadeStack.',
  },
  header: {
    badge: 'Mentions légales & Conditions',
    title: 'Conditions d’utilisation',
    lastUpdated: 'Dernière mise à jour : Octobre 2026',
    effectiveDate: 'Applicable immédiatement',
  },
  disclaimer: {
    title: 'Avis sur la version faisant foi',
    text: 'La version anglaise de ces Conditions d’utilisation constitue le texte juridique officiel et faisant foi. Les traductions dans d’autres langues sont fournies uniquement à des fins d’information et de commodité, sans certification juridique indépendante.',
  },
  sections: [
    {
      title: '1. Acceptation des conditions',
      paragraphs: [
        'En accédant ou en utilisant la plateforme LadeStack (ladestack.in), ses sous-domaines associés ou tout utilitaire en ligne fourni, vous acceptez d’être légalement lié par les présentes Conditions d’utilisation. Si vous refusez l’une quelconque de ces conditions, vous devez immédiatement cesser tout accès et toute utilisation.',
      ],
    },
    {
      title: '2. Usage autorisé et propriété des résultats',
      paragraphs: [
        'Une licence non exclusive, mondiale et libre de redevances vous est accordée pour utiliser les applications web LadeStack à des fins personnelles, pédagogiques, de recherche ou de développement logiciel commercial.',
        'L’intégralité des codes sources, architectures, fichiers compilés, documents et images générés ou transformés au moyen des outils LadeStack demeure votre propriété intellectuelle exclusive. LadeStack ne revendique aucun droit de propriété ni redevance sur les fichiers ou codes que vous traitez au moyen de nos logiciels côté client.',
      ],
    },
    {
      title: '3. Exécution technique et exigences environnementales',
      paragraphs: [
        'Les outils LadeStack s’exécutent principalement côté client grâce à WebAssembly, aux Web Workers et aux API des navigateurs modernes. Le niveau de performance et la stabilité dépendent directement des ressources matérielles de votre appareil et de votre navigateur.',
        'GB Coder intègre un Éditeur Statique compatible avec les navigateurs modernes récents et un IDE Avancé WebContainer conçu principalement pour les navigateurs Chromium. Il vous incombe de vérifier que votre environnement d’exécution respecte les prérequis techniques nécessaires.',
      ],
    },
    {
      title: '4. Exclusion de garanties',
      paragraphs: [
        'Les services et outils LadeStack sont fournis « EN L’ÉTAT » (AS IS) et « SELON DISPONIBILITÉ » (AS AVAILABLE), sans garantie expresse ou tacite d’aucune sorte.',
        'Nous ne garantissons pas un fonctionnement ininterrompu, exempt d’erreurs ou préservé de fluctuations temporaires de compatibilité consécutives aux mises à jour logicielles de tiers.',
      ],
    },
    {
      title: '5. Limitation de responsabilité',
      paragraphs: [
        'Dans toute la mesure permise par les lois en vigueur, LadeStack, son fondateur ou ses contributeurs ne sauraient être tenus responsables des dommages directs, indirects, consécutifs ou accessoires résultant de l’utilisation ou de l’impossibilité d’utiliser les outils.',
      ],
    },
    {
      title: '6. Modifications des conditions',
      paragraphs: [
        'Nous nous réservons le droit de réviser les présentes Conditions d’utilisation à tout moment. Toute modification sera reflétée par la date de « Dernière mise à jour » en haut de ce document. La poursuite de l’utilisation des outils après publication des modifications vaut acceptation sans réserve des conditions révisées.',
      ],
    },
  ],
  contactNote: {
    title: '7. Questions juridiques et institutionnelles',
    text: 'Pour toute demande relative aux présentes Conditions d’utilisation ou aux licences, veuillez contacter :',
    email: 'admin@ladestack.in',
  },
};
