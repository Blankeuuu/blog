// Reguły treści współdzielone przez schemat Astro, skrypty walidacyjne i testy.
// Czysty JavaScript (bez zależności od Astro), aby dało się go uruchomić w Node i Vitest.

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const SLUG_MAX = 80;

/** Przedrostki ścieżek zapisywanych przez Pages CMS (bez bazy /blog/). */
export const IMAGE_PREFIX = '/images/';
export const FILE_PREFIX = '/files/';

/** Katalogi w repozytorium odpowiadające przedrostkom. */
export const IMAGE_DIR = 'src/assets/images';
export const FILE_DIR = 'public/files';

export const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'];
export const MODEL_EXTENSIONS = ['glb'];
export const VIDEO_EXTENSIONS = ['mp4', 'webm'];

/** Nazwa pliku wpisu: RRRR-MM-DD-slug.md (data utworzenia + slug). */
export const POST_FILENAME_PATTERN = /^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;

/** @param {unknown} value */
export function isValidSlug(value) {
  return typeof value === 'string' && value.length <= SLUG_MAX && SLUG_PATTERN.test(value);
}

/**
 * Zamienia polskie znaki i dowolny tekst na bezpieczny slug.
 * @param {string} input
 */
export function slugify(input) {
  const map = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };
  return input
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (c) => map[/** @type {keyof typeof map} */ (c)])
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, SLUG_MAX)
    .replace(/-+$/g, '');
}

/**
 * Pages CMS może zapisać puste pola jako "" lub null. Traktujemy je jak brak wartości.
 * @param {unknown} value
 */
export function emptyToUndefined(value) {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'string' && value.trim() === '') return undefined;
  return value;
}

/**
 * Wyciąga 11-znakowy identyfikator filmu z adresu YouTube lub zwraca null.
 * Akceptuje wyłącznie domeny YouTube — dowolne iframe'y nie są obsługiwane.
 * @param {unknown} input
 * @returns {string | null}
 */
export function parseYouTubeId(input) {
  if (typeof input !== 'string') return null;
  const value = input.trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(value)) return value;
  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  const host = url.hostname.replace(/^www\.|^m\./, '');
  let id = null;
  if (host === 'youtu.be') {
    id = url.pathname.slice(1).split('/')[0];
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com' || host === 'music.youtube.com') {
    if (url.pathname === '/watch') id = url.searchParams.get('v');
    else {
      const m = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/);
      if (m) id = m[1];
    }
  }
  return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
}

/**
 * Czy ścieżka wskazuje na plik w bibliotece mediów danego typu.
 * @param {unknown} value
 * @param {string} prefix
 * @param {string[]} extensions
 */
export function isMediaPath(value, prefix, extensions) {
  if (typeof value !== 'string') return false;
  if (!value.startsWith(prefix)) return false;
  if (value.includes('..') || value.includes('\\')) return false;
  const ext = value.split('.').pop()?.toLowerCase() ?? '';
  return extensions.includes(ext);
}

/**
 * Dokleja bazę serwisu do ścieżki rozpoczynającej się od "/".
 * @param {string} path
 * @param {string} base np. "/blog/"
 */
export function withBase(path, base) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith('//') || path.startsWith('#')) return path;
  const b = base.endsWith('/') ? base : `${base}/`;
  if (path.startsWith(b)) return path;
  return b + path.replace(/^\/+/, '');
}

/**
 * Filtrowanie szkiców. Szkice widać wyłącznie w trybie deweloperskim.
 * @template {{ data: { draft?: boolean } }} T
 * @param {T[]} posts
 * @param {{ includeDrafts?: boolean }} [opts]
 * @returns {T[]}
 */
export function filterPublished(posts, opts = {}) {
  return opts.includeDrafts ? posts : posts.filter((p) => p.data.draft !== true);
}

/**
 * Sortowanie od najnowszych.
 * @template {{ data: { date: Date } }} T
 * @param {T[]} posts
 */
export function sortByDateDesc(posts) {
  return [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
