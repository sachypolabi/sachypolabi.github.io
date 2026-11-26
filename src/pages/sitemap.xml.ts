import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { navigation } from '../data/club';

export const GET: APIRoute = async ({ site }) => {
  const articles = await getCollection('aktuality');
  const routes = [...navigation.map(({ path }) => path), ...articles.map(({ id }) => `/l/${id}/`)];
  const entries = routes.map((route) => `  <url><loc>${new URL(route, site).href}</loc></url>`);
  return new Response([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n'), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
