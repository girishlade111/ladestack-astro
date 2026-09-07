/**
 * categories.ts — blog category metadata shared by blog/index.astro and
 * blog/[slug].astro. Ported 1:1 from the source Blog/BlogPost components.
 */

export const categories = [
  'All',
  'AI Development',
  'Generative AI',
  'SaaS Architecture',
  'Backend as a Service',
  'API Design & Scaling',
  'Cloud Computing',
  'Virtual Machines',
  'DevOps & CI/CD',
  'Security in Web Apps',
  'AI Production Systems',
];

export interface CategoryColors {
  bg: string;
  text: string;
  border: string;
  dot: string;
}

const FALLBACK: CategoryColors = {
  bg: 'bg-muted',
  text: 'text-muted-foreground',
  border: 'border-border',
  dot: 'bg-muted-foreground',
};

export const CATEGORY_COLORS: Record<string, CategoryColors> = {
  'AI Development': { bg: 'bg-violet-500/10', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-500/20', dot: 'bg-violet-500' },
  'Generative AI': { bg: 'bg-pink-500/10', text: 'text-pink-600 dark:text-pink-400', border: 'border-pink-500/20', dot: 'bg-pink-500' },
  'SaaS Architecture': { bg: 'bg-sky-500/10', text: 'text-sky-600 dark:text-sky-400', border: 'border-sky-500/20', dot: 'bg-sky-500' },
  'Backend as a Service': { bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-500/20', dot: 'bg-orange-500' },
  'API Design & Scaling': { bg: 'bg-cyan-500/10', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-500/20', dot: 'bg-cyan-500' },
  'Cloud Computing': { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/20', dot: 'bg-blue-500' },
  'Virtual Machines': { bg: 'bg-teal-500/10', text: 'text-teal-600 dark:text-teal-400', border: 'border-teal-500/20', dot: 'bg-teal-500' },
  'DevOps & CI/CD': { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/20', dot: 'bg-amber-500' },
  'Security in Web Apps': { bg: 'bg-red-500/10', text: 'text-red-600 dark:text-red-400', border: 'border-red-500/20', dot: 'bg-red-500' },
  'AI Production Systems': { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
};

export function categoryColors(category: string): CategoryColors {
  return CATEGORY_COLORS[category] ?? FALLBACK;
}

export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop';
