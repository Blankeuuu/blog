import { readFileSync, existsSync } from 'node:fs';
import YAML from 'yaml';
import { TAG_SLUGS } from '../src/data/tags.mjs';

const configPath = '.pages.yml';
if (!existsSync(configPath)) {
  console.error('[BŁĄD] Plik .pages.yml nie istnieje w głównym katalogu.');
  process.exit(1);
}

const raw = readFileSync(configPath, 'utf8');
let doc;
try {
  doc = YAML.parse(raw);
} catch (err) {
  console.error('[BŁĄD] Nieprawidłowy format YAML w .pages.yml:', err);
  process.exit(1);
}

let errorCount = 0;

// 1. Walidacja sekcji media
if (!doc.media || !Array.isArray(doc.media)) {
  console.error('[BŁĄD] .pages.yml musi zawierać tablicę `media`.');
  errorCount++;
} else {
  const imagesMedia = doc.media.find((m) => m.name === 'images');
  const filesMedia = doc.media.find((m) => m.name === 'files');
  if (!imagesMedia || imagesMedia.input !== 'src/assets/images' || imagesMedia.output !== '/images') {
    console.error('[BŁĄD] Media `images` musi wskazywać input: src/assets/images oraz output: /images');
    errorCount++;
  }
  if (!filesMedia || filesMedia.input !== 'public/files' || filesMedia.output !== '/files') {
    console.error('[BŁĄD] Media `files` musi wskazywać input: public/files oraz output: /files');
    errorCount++;
  }
}

// 2. Walidacja sekcji content
const postsCollection = doc.content?.find((c) => c.name === 'posts');
if (!postsCollection) {
  console.error('[BŁĄD] .pages.yml musi zawierać kolekcję `posts`.');
  errorCount++;
} else {
  if (postsCollection.path !== 'src/content/posts') {
    console.error('[BŁĄD] Kolekcja `posts` musi mieć path: src/content/posts');
    errorCount++;
  }

  // Sprawdź tagi
  const tagsField = postsCollection.fields?.find((f) => f.name === 'tags');
  if (!tagsField || !tagsField.options?.values) {
    console.error('[BŁĄD] Pole `tags` w kolekcji posts musi zawierać listę options.values');
    errorCount++;
  } else {
    const cmsTagSlugs = tagsField.options.values.map((v) => (typeof v === 'string' ? v : v.name));
    for (const tag of TAG_SLUGS) {
      if (!cmsTagSlugs.includes(tag)) {
        console.error(`[BŁĄD] Tag z kodu '${tag}' nie istnieje w opcjach .pages.yml`);
        errorCount++;
      }
    }
  }

  // Sprawdź bloki multimedialne
  const blocksField = postsCollection.fields?.find((f) => f.name === 'blocks');
  if (!blocksField || blocksField.type !== 'block' || !blocksField.blocks) {
    console.error('[BŁĄD] Pole `blocks` musi być typu `block` z listą podbloków');
    errorCount++;
  } else {
    const blockNames = blocksField.blocks.map((b) => b.name);
    const requiredBlocks = ['text', 'image', 'gallery', 'code', 'video', 'model'];
    for (const req of requiredBlocks) {
      if (!blockNames.includes(req)) {
        console.error(`[BŁĄD] Brak definicji bloku '${req}' w .pages.yml`);
        errorCount++;
      }
    }
  }
}

if (errorCount > 0) {
  console.error(`Walidacja .pages.yml zakończona niepowodzeniem: ${errorCount} błędów.`);
  process.exit(1);
} else {
  console.log('[PASS] Konfiguracja Pages CMS (.pages.yml) jest w 100% poprawna i spójna.');
}
