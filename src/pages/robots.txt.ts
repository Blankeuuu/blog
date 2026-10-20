import type { APIRoute } from 'astro';
import { getSiteOrigin, resolvePath } from '../lib/urls';

export const GET: APIRoute = () => {
  const sitemapUrl = `${getSiteOrigin()}${resolvePath('/sitemap-index.xml')}`;

  const content = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
