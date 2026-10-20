// Kontrolowana lista tagów (tematów). Aby dodać tag:
// 1. dopisz obiekt poniżej (slug: małe litery, cyfry i myślniki),
// 2. dopisz tę samą wartość w `.pages.yml` (pole `tags` → options.values),
// 3. `npm run validate` sprawdzi zgodność obu list.

/** @type {ReadonlyArray<{ slug: string; label: string; short: string }>} */
export const TAGS = [
  { slug: 'refleksje', label: 'Refleksje', short: 'REF' },
  { slug: 'fotografia', label: 'Fotografia i eksperymenty', short: 'FOT' },
  { slug: 'diy-maker', label: 'DIY / Maker', short: 'DIY' },
  { slug: 'ai-agenci', label: 'AI i agenci kodujący', short: 'AI' },
  { slug: 'elektronika-esp32', label: 'Elektronika i ESP32', short: 'ESP' },
  { slug: 'cad-freecad', label: 'CAD i FreeCAD', short: 'CAD' },
  { slug: 'druk-3d', label: 'Druk 3D', short: '3DP' },
  { slug: 'programowanie', label: 'Programowanie', short: 'DEV' },
  { slug: 'smart-home', label: 'Smart Home', short: 'SH' },
];

export const TAG_SLUGS = TAGS.map((t) => t.slug);

/** @param {string} slug */
export function tagLabel(slug) {
  return TAGS.find((t) => t.slug === slug)?.label ?? slug;
}
