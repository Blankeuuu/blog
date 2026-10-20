// Jedno źródło prawdy dla adresu i tożsamości strony.
// Zmiana domeny: ustaw SITE_ORIGIN i SITE_BASE (np. w workflow) albo edytuj wartości domyślne.
//   GitHub Pages (projekt):  origin = https://blankeuuu.github.io, base = /blog/
//   Własna (sub)domena:      origin = https://notatki.example.pl, base = /

const env = typeof process !== 'undefined' ? process.env : {};

function normalizeBase(value) {
  let base = (value ?? '/blog/').trim();
  if (!base.startsWith('/')) base = `/${base}`;
  if (!base.endsWith('/')) base = `${base}/`;
  return base;
}

export const SITE_ORIGIN = (env.SITE_ORIGIN ?? 'https://blankeuuu.github.io').replace(/\/+$/, '');
export const SITE_BASE = normalizeBase(env.SITE_BASE);

export const SITE = {
  /** Robocza nazwa — zmień tutaj, aby zmienić nazwę w całym serwisie. */
  name: 'blankeu - blog',
  /** Krótka forma używana w dużych kompozycjach typograficznych. */
  wordmark: 'BLANKEU',
  author: 'Szymon Potyra',
  email: 'potyraszymon@gmail.com',
  github: 'https://github.com/Blankeuuu',
  githubLogin: 'Blankeuuu',
  portfolio: 'https://blankeuuu.github.io/portfolio/',
  repository: 'https://github.com/Blankeuuu/blog',
  description:
    'Osobisty blog i devlog Szymona Potyry: notatki, eksperymenty twórcze, elektronika, CAD, druk 3D, programowanie i smart home.',
  locale: 'pl-PL',
  lang: 'pl',
};
