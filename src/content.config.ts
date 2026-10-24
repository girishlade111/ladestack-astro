import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { LOCALES } from './i18n/config';

/**
 * LadeStack Astro Content Collections Configuration
 * Professional Multilingual Markdown Blog System
 * Strictly supports 9 locales: en (unprefixed default), ja, ko, zh, ru, tr, fr, pt, es.
 */
const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
    generateId: ({ entry, data }) => {
      // Formats unique ID as locale/slug or file path without extension
      const fileSlug = entry.replace(/\\/g, '/').replace(/\.[^/.]+$/, '');
      if (data?.locale && data?.slug) {
        return `${data.locale}/${data.slug}`;
      }
      return fileSlug;
    },
  }),
  schema: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    locale: z.enum(LOCALES),
    slug: z.string().min(2, 'Slug must be specified'),
    translationKey: z.string().min(2, 'translationKey is required to link multilingual variants'),
    author: z.string().default('Girish Lade'),
    publishedAt: z.union([z.string(), z.date()]),
    updatedAt: z.union([z.string(), z.date()]).optional(),
    category: z.string().default('Engineering'),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().default('/blog-covers/ai-development.svg'),
    coverAlt: z.string().default('LadeStack Engineering Blog Cover'),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    canonicalOverride: z.string().optional(),
    relatedProduct: z.string().optional(),
    contentType: z.enum(['deep-dive', 'tutorial', 'architecture', 'guide']).default('deep-dive'),
  }),
});

export const collections = {
  blog,
};
