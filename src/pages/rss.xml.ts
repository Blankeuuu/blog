import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/posts';
import { SITE, getSiteOrigin, getPostUrl } from '../lib/urls';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const site = getSiteOrigin();

  return rss({
    title: SITE.name,
    description: SITE.description,
    site,
    customData: `<language>${SITE.lang}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: getPostUrl(post.data.slug),
      categories: post.data.tags,
    })),
  });
};
