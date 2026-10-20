import { describe, it, expect } from 'vitest';
import {
  slugify,
  isValidSlug,
  parseYouTubeId,
  isMediaPath,
  withBase,
  filterPublished,
  sortByDateDesc,
  IMAGE_PREFIX,
  IMAGE_EXTENSIONS,
} from '../lib/content-rules.mjs';

describe('content-rules', () => {
  describe('slugify', () => {
    it('poprawnie transliteruje polskie znaki diakrytyczne', () => {
      const input = 'Zażółć gęślą jaźń — Prototyp ESP32!';
      const expected = 'zazolc-gesla-jazn-prototyp-esp32';
      expect(slugify(input)).toBe(expected);
    });

    it('usuwa powtarzające się myślniki i znaki specjalne', () => {
      expect(slugify('test...---slug__123')).toBe('test-slug-123');
    });

    it('obcina zbyt długie slugi do limitu 80 znaków', () => {
      const longInput = 'a'.repeat(100);
      expect(slugify(longInput).length).toBeLessThanOrEqual(80);
    });
  });

  describe('isValidSlug', () => {
    it('akceptuje prawidłowe slugi', () => {
      expect(isValidSlug('moj-pierwszy-wpis')).toBe(true);
      expect(isValidSlug('esp32')).toBe(true);
      expect(isValidSlug('druk-3d-2026')).toBe(true);
    });

    it('odrzuca nieprawidłowe formaty', () => {
      expect(isValidSlug('Moj-Wpis')).toBe(false); // wielkie litery
      expect(isValidSlug('moj_wpis')).toBe(false); // podkreślnik
      expect(isValidSlug('-start-myslnik')).toBe(false);
      expect(isValidSlug('koniec-myslnik-')).toBe(false);
      expect(isValidSlug('')).toBe(false);
      expect(isValidSlug(null)).toBe(false);
    });
  });

  describe('parseYouTubeId', () => {
    it('wyciąga ID z różnych formatów adresów YouTube', () => {
      expect(parseYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
      expect(parseYouTubeId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
      expect(parseYouTubeId('https://youtube-nocookie.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
      expect(parseYouTubeId('https://www.youtube.com/shorts/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
      expect(parseYouTubeId('dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    });

    it('odrzuca nieprawidłowe lub podejrzane adresy', () => {
      expect(parseYouTubeId('https://malicious.com/watch?v=dQw4w9WgXcQ')).toBe(null);
      expect(parseYouTubeId('javascript:alert(1)')).toBe(null);
      expect(parseYouTubeId('')).toBe(null);
    });
  });

  describe('isMediaPath', () => {
    it('akceptuje prawidłowe ścieżki mediów', () => {
      expect(isMediaPath('/images/foto.jpg', IMAGE_PREFIX, IMAGE_EXTENSIONS)).toBe(true);
      expect(isMediaPath('/images/podkatalog/zdjecie.webp', IMAGE_PREFIX, IMAGE_EXTENSIONS)).toBe(true);
    });

    it('odrzuca próby directory traversal i niewłaściwe rozszerzenia', () => {
      expect(isMediaPath('/images/../tajne.txt', IMAGE_PREFIX, IMAGE_EXTENSIONS)).toBe(false);
      expect(isMediaPath('/images/skrypt.exe', IMAGE_PREFIX, IMAGE_EXTENSIONS)).toBe(false);
      expect(isMediaPath('/inne/foto.jpg', IMAGE_PREFIX, IMAGE_EXTENSIONS)).toBe(false);
    });
  });

  describe('withBase', () => {
    it('dokleja bazę do ścieżki względnej', () => {
      expect(withBase('/wpisy/', '/blog/')).toBe('/blog/wpisy/');
      expect(withBase('/wpisy/', '/blog')).toBe('/blog/wpisy/');
      expect(withBase('/wpisy/', '/')).toBe('/wpisy/');
    });

    it('nie dubluje istniejącej bazy ani protokołów', () => {
      expect(withBase('/blog/wpisy/', '/blog/')).toBe('/blog/wpisy/');
      expect(withBase('https://example.com/test', '/blog/')).toBe('https://example.com/test');
    });
  });

  describe('filterPublished', () => {
    const posts = [
      { id: '1', data: { draft: false } },
      { id: '2', data: { draft: true } },
      { id: '3', data: {} },
    ];

    it('odrzuca szkice domyślnie', () => {
      const published = filterPublished(posts);
      expect(published.map((p) => p.id)).toEqual(['1', '3']);
    });

    it('zwraca wszystkie wpisy gdy includeDrafts === true', () => {
      const all = filterPublished(posts, { includeDrafts: true });
      expect(all.length).toBe(3);
    });
  });

  describe('sortByDateDesc', () => {
    it('sortuje wpisy od najnowszego do najstarszego', () => {
      const posts = [
        { id: 'old', data: { date: new Date('2026-01-01') } },
        { id: 'new', data: { date: new Date('2026-10-20') } },
        { id: 'mid', data: { date: new Date('2026-05-15') } },
      ];
      const sorted = sortByDateDesc(posts);
      expect(sorted.map((p) => p.id)).toEqual(['new', 'mid', 'old']);
    });
  });
});
