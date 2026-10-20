import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { postSchema } from './lib/schema';

const isFixtures = process.env.JOURNAL_FIXTURES === '1';

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: isFixtures ? 'src/fixtures/posts' : 'src/content/posts',
  }),
  schema: postSchema,
});

export const collections = {
  posts,
};
