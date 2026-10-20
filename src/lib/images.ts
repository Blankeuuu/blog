import type { ImageMetadata } from 'astro';

// Ładujemy wszystkie obrazy z src/assets/images
const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpeg,jpg,png,gif,webp,avif}');

/**
 * Rozwiązuje ścieżkę z CMS (np. "/images/foto.jpg") do obiektu ImageMetadata z Astro.
 * Zwraca null, jeśli plik nie istnieje w katalogu src/assets/images.
 */
export async function resolveImage(imagePath: string): Promise<ImageMetadata | null> {
  if (!imagePath) return null;

  // Usuwamy przedrostek /images/ lub images/
  const cleanPath = imagePath.replace(/^\/?images\//, '');
  const candidateKeys = [
    `/src/assets/images/${cleanPath}`,
    `src/assets/images/${cleanPath}`,
  ];

  for (const key of candidateKeys) {
    if (images[key]) {
      const mod = await images[key]();
      return mod.default;
    }
  }

  return null;
}
