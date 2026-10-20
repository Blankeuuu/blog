# Strategia testowania i wyniki weryfikacji — blankeu - blog

Zestawienie komend weryfikacyjnych, procedur testowych oraz rzeczywistych wyników.

## 1. Narzędzia i poziomy weryfikacji

| Poziom | Narzędzie | Zakres |
|---|---|---|
| **Spójność danych** | `scripts/validate-content.mjs` | Sprawdzenie schematu frontmatter Zod, istnienia odwołań do plików obrazów i modeli. |
| **Spójność CMS** | `scripts/validate-cms.mjs` | Sprawdzenie poprawności `.pages.yml` i zgodności listy tagów z `src/data/tags.mjs`. |
| **Bezpieczeństwo CI/CD** | `scripts/validate-workflow.mjs` | Kontrola uprawnień i kroków w `.github/workflows/deploy.yml`. |
| **Typowanie statyczne** | `astro check` | Weryfikacja statyczna TypeScript i szablonów `.astro`. |
| **Testy jednostkowe** | `vitest` | Determinizm silnika ASCII, reguły transliteracji slugów, walidacja schematu Zod, filtracja szkiców. |
| **Kompilacja statyczna** | `astro build` + `pagefind` | Generowanie stron statycznych i budowa indeksu wyszukiwarki dla języka polskiego. |
| **Weryfikacja wyjścia** | `scripts/check-dist.mjs` | Testy obecności atrybutu `lang="pl"`, braku wycieków szkiców, obecności indeksu Pagefind i sitemapy. |
| **Testy End-to-End** | `playwright` | Testy w rzeczywistej przeglądarce Chromium (desktop 1280px oraz mobile 393px): interakcje, brak overflow, motywy, wyszukiwarka. |

---

## 2. Rzeczywiste wyniki weryfikacji (PASS)

```
> npm run verify

[PASS] Walidacja treści: 3 plików zweryfikowanych pomyślnie.
[PASS] Konfiguracja Pages CMS (.pages.yml) jest w 100% poprawna i spójna.
[PASS] Workflow GitHub Actions (.github/workflows/deploy.yml) poprawny.

> astro check
Result (43 files): 0 errors, 0 warnings, 0 hints

> vitest run
 Test Files  3 passed (3)
      Tests  28 passed (28)
   Duration  511ms

> astro build && pagefind --site dist
Discovered 1 language: pl
Indexed 13 pages, Indexed 352 words

> astro build && pagefind --site dist-fixtures (fixtures test)
Found a data-pagefind-body element on the site.
Indexed 2 pages, Indexed 427 words

> test:dist
[PASS] Indeks Pagefind obecny (45555 bajtów).
[PASS] Weryfikacja dist zakończona sukcesem (13 stron HTML, zero wycieków szkiców).
[PASS] Weryfikacja dist-fixtures zakończona sukcesem (15 stron HTML, zero wycieków szkiców).

> npx playwright test
Running 8 tests using 1 worker
  8 passed (12.8s)
```
