import { readFileSync, existsSync } from 'node:fs';
import YAML from 'yaml';

const workflowPath = '.github/workflows/deploy.yml';
if (!existsSync(workflowPath)) {
  console.error('[BŁĄD] Workflow .github/workflows/deploy.yml nie istnieje.');
  process.exit(1);
}

const raw = readFileSync(workflowPath, 'utf8');
let doc;
try {
  doc = YAML.parse(raw);
} catch (err) {
  console.error('[BŁĄD] Nieprawidłowy format YAML w deploy.yml:', err);
  process.exit(1);
}

let errorCount = 0;

// Sprawdź zdarzenia on
if (!doc.on?.push?.branches?.includes('main')) {
  console.error('[BŁĄD] Workflow musi reagować na zdarzenie push do gałęzi main.');
  errorCount++;
}
if (!('workflow_dispatch' in doc.on)) {
  console.error('[BŁĄD] Workflow musi wspierać manualne uruchomienie (workflow_dispatch).');
  errorCount++;
}

// Sprawdź uprawnienia
const perms = doc.permissions;
if (!perms || perms.pages !== 'write' || perms['id-token'] !== 'write') {
  console.error('[BŁĄD] Workflow musi posiadać uprawnienia pages: write oraz id-token: write.');
  errorCount++;
}

if (errorCount > 0) {
  console.error(`Walidacja workflow zakończona niepowodzeniem: ${errorCount} błędów.`);
  process.exit(1);
} else {
  console.log('[PASS] Workflow GitHub Actions (.github/workflows/deploy.yml) poprawny.');
}
