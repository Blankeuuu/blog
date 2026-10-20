import { SITE_BASE, SITE_ORIGIN, SITE } from '../../site.config.mjs';
import { withBase } from './content-rules.mjs';

export function getBaseUrl(): string {
  return SITE_BASE;
}

export function getSiteOrigin(): string {
  return SITE_ORIGIN;
}

/**
 * Zwraca pełną względną ścieżkę z uwzględnieniem SITE_BASE (/blog/).
 */
export function resolvePath(path: string): string {
  return withBase(path, SITE_BASE);
}

/**
 * Zwraca absolutny adres URL (np. dla OpenGraph i RSS).
 */
export function absoluteUrl(path: string): string {
  const relative = resolvePath(path);
  return `${SITE_ORIGIN}${relative}`;
}

export function getPostUrl(slug: string): string {
  return resolvePath(`/wpisy/${slug}/`);
}

export function getTagsUrl(): string {
  return resolvePath('/tag/');
}

export function getTagUrl(tag: string): string {
  return tag ? resolvePath(`/tag/${tag}/`) : resolvePath('/tag/');
}

export function getArchiveUrl(): string {
  return resolvePath('/archiwum/');
}

export function getPostsUrl(): string {
  return resolvePath('/wpisy/');
}

export function getRssUrl(): string {
  return resolvePath('/rss.xml');
}

export { SITE };
