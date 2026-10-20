import { getCollection, type CollectionEntry } from 'astro:content';
import { filterPublished, sortByDateDesc } from './content-rules.mjs';

export type PostEntry = CollectionEntry<'posts'>;

/**
 * Zwraca opublikowane wpisy, posortowane od najnowszych.
 * W trybie standardowym odrzuca szkice (draft === true).
 */
export async function getPublishedPosts(includeDrafts: boolean = false): Promise<PostEntry[]> {
  try {
    const all = await getCollection('posts');
    const filtered = filterPublished(all, { includeDrafts });
    return sortByDateDesc(filtered);
  } catch (err) {
    console.warn('Brak kolekcji posts lub błąd pobierania:', err);
    return [];
  }
}

/**
 * Zwraca wpisy z danym tagiem.
 */
export async function getPostsByTag(tagSlug: string): Promise<PostEntry[]> {
  const posts = await getPublishedPosts();
  return posts.filter((p) => p.data.tags?.includes(tagSlug as any));
}

/**
 * Zlicza wpisy w podziale na tagi.
 */
export async function getTagCounts(): Promise<Record<string, number>> {
  const posts = await getPublishedPosts();
  const counts: Record<string, number> = {};
  for (const post of posts) {
    for (const tag of post.data.tags || []) {
      counts[tag] = (counts[tag] || 0) + 1;
    }
  }
  return counts;
}

/**
 * Szacuje czas czytania w minutach (standard 200 słów/minutę w języku polskim).
 */
export function estimateReadingTime(content: string = ''): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
