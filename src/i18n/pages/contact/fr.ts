import type { ContactPageData } from './types';

export const fr: ContactPageData = {
  seo: {
    title: 'Contact – Support Développeur Direct LadeStack',
    description: 'Contactez LadeStack pour vos questions sur nos outils, vos retours et une assistance technique. E-mail direct : admin@ladestack.in.',
    ogTitle: 'Contact – Support Développeur Direct LadeStack',
    ogDescription: 'Contactez LadeStack pour vos questions sur nos outils, vos retours et une assistance technique. E-mail direct : admin@ladestack.in.',
  },
  hero: {
    badge: 'Communication Directe',
    title: 'Contactez-nous',
    description: 'Des questions sur nos outils côté client, des suggestions de fonctionnalités ou des besoins d’équipe ? Envoyez-nous un message.',
  },
  cards: [
    { icon: 'mail', label: 'E-mail Direct', title: 'admin@ladestack.in', sub: 'Boîte de réception du fondateur', href: 'mailto:admin@ladestack.in' },
    { icon: 'message-square', label: 'Support Développeur', title: 'Aide Technique', sub: 'Architecture & signalement de bugs', href: 'mailto:admin@ladestack.in' },
    { icon: 'map-pin', label: 'Siège Social', title: 'Mumbai, Inde', sub: 'Opérations distantes mondiales', href: null },
    { icon: 'globe', label: 'Architecture', title: 'Outils Côté Client', sub: 'Exécution locale dans le navigateur', href: null },
  ],
  form: {
    title: 'Envoyer un Message',
    description: 'Nous lisons régulièrement vos messages et répondons dans les plus brefs délais.',
    fallbackPrefix: 'Pour nous écrire directement depuis votre logiciel de messagerie :',
    fallbackLinkText: 'admin@ladestack.in',
    nameLabel: 'Nom complet',
    namePlaceholder: 'Jean Dupont',
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'jean@example.com',
    subjectLabel: 'Objet',
    subjectPlaceholder: 'Question concernant GB Coder ou les utilitaires côté client',
    messageLabel: 'Message',
    messagePlaceholder: 'Veuillez décrire votre question, le bug rencontré ou votre suggestion de fonctionnalité...',
    submitButton: 'Envoyer le message',
    successMessage: 'Merci ! Votre message a été préparé. Si votre logiciel de messagerie ne s’est pas ouvert automatiquement, écrivez directement à admin@ladestack.in.',
  },
  faqs: {
    eyebrow: 'Questions Fréquentes',
    title: 'Foire Aux Questions de Contact',
    description: 'Délais de réponse, opportunités de collaboration et disponibilité de la plateforme.',
    items: [
      {
        q: 'Quel est le délai habituel de réponse ?',
        a: 'Nous consultons régulièrement les messages et répondons généralement sous 1 à 2 jours ouvrés.',
      },
      {
        q: 'Puis-je signaler un bug ou proposer une nouvelle fonctionnalité ?',
        a: 'Oui, tout à fait ! Écrivez-nous à admin@ladestack.in ou ouvrez un ticket sur notre dépôt GitHub à github.com/girishlade111.',
      },
      {
        q: 'Proposez-vous des intégrations sur mesure pour les équipes techniques ?',
        a: 'Oui. Si votre équipe a besoin de versions auto-hébergées de nos outils ou de flux de travail hors ligne spécifiques, contactez-nous directement.',
      },
      {
        q: 'LadeStack est-il accessible dans le monde entier sans restriction ?',
        a: 'Oui, notre plateforme est accessible sur tous les navigateurs modernes à l’échelle mondiale, sans géoblocage ni barrière d’abonnement.',
      },
    ],
  },
};
