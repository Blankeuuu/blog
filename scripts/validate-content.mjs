import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import YAML from 'yaml';
import { postSchema } from '../src/lib/schema.ts';

function parseFrontmatter(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { frontmatter: {}, body: content };
  return {
    frontmatter: YAML.parse(match[1]) || {},
    body: content.slice(match[0].length),
  };
}

const folders = ['src/content/posts', 'src/fixtures/posts'];
let errorCount = 0;
let fileCount = 0;

for (const folder of folders) {
  if (!existsSync(folder)) continue;
  const files = readdirSync(folder).filter((f) => f.endsWith('.md'));

  for (const file of files) {
    fileCount++;
    const fullPath = join(folder, file);
    try {
      const { frontmatter } = parseFrontmatter(fullPath);
      const parsed = postSchema.safeParse(frontmatter);
      if (!parsed.success) {
        console.error(`[BŁĄD] ${fullPath}: Niepoprawne dane frontmatter:`);
        for (const issue of parsed.error.issues) {
          console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
        }
        errorCount++;
        continue;
      }

      // Sprawdź czy pliki mediów istnieją
      const data = parsed.data;
      if (data.cover) {
        const coverRel = data.cover.replace(/^\/?images\//, '');
        const coverPath = join('src/assets/images', coverRel);
        if (!existsSync(coverPath)) {
          console.error(`[BŁĄD] ${fullPath}: Plik okładki nie istnieje: ${coverPath}`);
          errorCount++;
        }
      }

      for (const b of data.blocks || []) {
        if (b.type === 'image') {
          const imgRel = b.image.replace(/^\/?images\//, '');
          const imgPath = join('src/assets/images', imgRel);
          if (!existsSync(imgPath)) {
            console.error(`[BŁĄD] ${fullPath}: Zdjęcie w bloku nie istnieje: ${imgPath}`);
            errorCount++;
          }
        }
        if (b.type === 'gallery') {
          for (const item of b.images) {
            const imgRel = item.image.replace(/^\/?images\//, '');
            const imgPath = join('src/assets/images', imgRel);
            if (!existsSync(imgPath)) {
              console.error(`[BŁĄD] ${fullPath}: Zdjęcie w galerii nie istnieje: ${imgPath}`);
              errorCount++;
            }
          }
        }
        if (b.type === 'model') {
          const fileRel = b.file.replace(/^\/?files\//, '');
          const filePath = join('public/files', fileRel);
          if (!existsSync(filePath)) {
            console.error(`[BŁĄD] ${fullPath}: Model 3D nie istnieje: ${filePath}`);
            errorCount++;
          }
        }
      }
    } catch (err) {
      console.error(`[BŁĄD] ${fullPath}: Błąd odczytu pliku:`, err);
      errorCount++;
    }
  }
}

if (errorCount > 0) {
  console.error(`Walidacja treści zakończona niepowodzeniem: ${errorCount} błędów w ${fileCount} plikach.`);
  process.exit(1);
} else {
  console.log(`[PASS] Walidacja treści: ${fileCount} plików zweryfikowanych pomyślnie.`);
}
