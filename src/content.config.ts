import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import galleries from './data/galleries.json';

const aktuality = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/aktuality' }),
  schema: z.object({
    title: z.string(),
    date: z.string().date(),
    summary: z.string(),
    cover: z.string(),
    coverAlt: z.string(),
    shareImage: z.string(),
    gallery: z.string().refine((name) => Object.hasOwn(galleries, name), 'Neznámá galerie').optional(),
  }),
});

export const collections = { aktuality };
