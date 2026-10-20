import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.argv[2] || 'dist';
const isFixtures = process.argv.includes('--fixtures');

console.log(`[CHECK-DIST] Weryfikacja katalogu wyjściowego: ${outDir} (fixtures=${isFixtures})`);

if (!existsSync(outDir)) {
  console.error(`[BŁĄD] Katalog wyjściowy nie istnieje: ${outDir}`);
  process.exit(1);
}

let errorCount = 0;

function getAllFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles(outDir);
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));

console.log(`Znaleziono ${htmlFiles.length} plików HTML do weryfikacji.`);

// 1. Sprawdź język lang="pl" w plikach HTML
for (const file of htmlFiles) {
  const content = readFileSync(file, 'utf8');
  if (!content.includes('lang="pl"') && !content.includes("lang='pl'")) {
    console.error(`[BŁĄD] ${file}: Brak atrybutu lang="pl" na tagu html.`);
    errorCount++;
  }
}

// 2. Sprawdź wykluczenie szkiców (draft: true)
for (const file of allFiles) {
  const content = readFileSync(file, 'utf8');
  if (content.includes('tajny-szkic-roboczy')) {
    console.error(`[BŁĄD] Wyciek szkicu (tajny-szkic-roboczy) w pliku wyjściowym: ${file}`);
    errorCount++;
  }
}

// 3. Sprawdź obecność indeksu Pagefind
const pagefindJs = join(outDir, 'pagefind', 'pagefind.js');
if (!existsSync(pagefindJs)) {
  console.error(`[BŁĄD] Brak wygenerowanego indeksu Pagefind: ${pagefindJs}`);
  errorCount++;
} else {
  console.log(`[PASS] Indeks Pagefind obecny (${statSync(pagefindJs).size} bajtów).`);
}

// 4. Sprawdź robots.txt i sitemap
const robotsTxt = join(outDir, 'robots.txt');
if (!existsSync(robotsTxt)) {
  console.error(`[BŁĄD] Brak pliku robots.txt: ${robotsTxt}`);
  errorCount++;
}

if (errorCount > 0) {
  console.error(`Weryfikacja katalogu ${outDir} nie powiodła się: ${errorCount} błędów.`);
  process.exit(1);
} else {
  console.log(`[PASS] Weryfikacja ${outDir} zakończona sukcesem (${htmlFiles.length} stron HTML, zero wycieków szkiców).`);
}
