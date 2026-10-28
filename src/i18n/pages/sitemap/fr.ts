import type { SitemapPageData } from './types';

export const frSitemap: SitemapPageData = {
  seo: {
    title: 'Plan du site et répertoire | LadeStack',
    description: 'Explorez le répertoire complet de LadeStack : outils pour développeurs, documentation, guides d’architecture et ressources.',
    ogTitle: 'LadeStack Plan du site et répertoire',
    ogDescription: 'Le répertoire complet de l’ensemble des pages, outils, guides et articles techniques de LadeStack.',
  },
  hero: {
    badge: 'Navigation & Index',
    title: 'Index et répertoire du site',
    description: 'Une cartographie complète et accessible de l’ensemble des pages, outils, documentations et publications techniques de LadeStack.',
  },
  sections: {
    corePlatform: {
      title: 'Pages principales de la plateforme',
      items: [
        { title: 'Accueil', href: '/', desc: 'Page d’accueil présentant nos outils en direct et une démonstration de code interactive' },
        { title: 'À propos de LadeStack', href: '/about', desc: 'Parcours du fondateur, principes d’ingénierie et catalogue vérifié' },
        { title: 'GB Coder', href: '/gb-coder', desc: 'IDE intégré au navigateur avec Monaco Editor, Éditeur Statique et WebContainer' },
        { title: 'Produits & Utilitaires', href: '/apps', desc: 'Catalogue vérifié d’outils pour développeurs s’exécutant côté client' },
        { title: 'Documentation', href: '/docs', desc: 'Spécifications techniques, guides d’architecture et historique des versions' },
        { title: 'Centre d’assistance', href: '/support', desc: 'Canaux d’aide technique, compatibilité des navigateurs et FAQ' },
        { title: 'Contactez-nous', href: '/contact', desc: 'Boîte de réception directe du fondateur et formulaires de retour' },
              { title: 'Foire Aux Questions (FAQ)', href: '/faq', desc: 'Questions fréquemment posées sur les fonctionnalités, la confidentialité, GB Coder et les outils de développement' },
      ],
    },
    tools: {
      title: 'Outils et applications pour développeurs',
      openTool: 'Ouvrir l’outil',
      comingSoon: 'Bientôt disponible',
      live: 'En ligne',
    },
    blogArchive: {
      title: 'Archives du blog d’ingénierie (27 articles)',
      notice: 'Note : Les articles de blog technique sont actuellement rédigés en anglais uniquement. La localisation complète des articles est prévue en Phase 3.',
      visitBlog: 'Consulter l’index du blog →',
    },
    legal: {
      title: 'Gouvernance légale et confidentialité',
      items: [
        { title: 'Politique de confidentialité', href: '/privacy', desc: 'Architecture de traitement local, périmètre des données et stockage' },
        { title: 'Conditions d’utilisation', href: '/terms', desc: 'Droits d’usage commercial, conditions de licence et limitation de responsabilité' },
      ],
    },
  },
};
