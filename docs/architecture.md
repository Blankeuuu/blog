# Architektura systemu — blankeu - blog

Dokumentacja architektury technicznej, granic modułów i przepływu danych.

## 1. Przegląd architektury

Serwis jest w pełni statyczną aplikacją internetową generowaną podczas kompilacji (**SSG — Static Site Generation**) za pomocą **Astro 7**. Nie wymaga dedykowanego serwera backendowego ani relacyjnej bazy danych — stan artykułów przechowywany jest bezpośrednio w repozytorium Git w postaci plików Markdown (`.md`) z nagłówkiem YAML frontmatter.

```
+-------------------------------------------------------------+
|                         Pages CMS                           |
|       (Edytor w przeglądarce podłączony przez GitHub App)    |
+------------------------------+------------------------------+
                               | Git Commit (main)
                               v
+-------------------------------------------------------------+
|                    GitHub Actions CI/CD                     |
|           validate -> check -> test -> build -> deploy      |
+------------------------------+------------------------------+
                               | Static Artifacts
                               v
+-------------------------------------------------------------+
|                     GitHub Pages (CDN)                      |
|           HTML / CSS / JS / WebP / Pagefind / GLB           |
+-------------------------------------------------------------+
```

## 2. Warstwa danych i Content Layer API

Dane artykułów są ładowane przez wbudowany loader `glob()` zdefiniowany w `src/content.config.ts`. Schemat wpisów walidowany jest za pomocą biblioteki **Zod** (`src/lib/schema.ts`):

- **Struktura blokowa (`type: block`):** Każdy wpis może zawierać sekwencję bloków multimedialnych:
  - `text` — treść w formacie Markdown, renderowana do bezpiecznego HTML.
  - `image` — pojedyncze zdjęcie ze ścieżką do biblioteki mediów, wymaganym atrybutem `alt`, opcjonalnym podpisem i wyborem szerokości.
  - `gallery` — lista zdjęć renderowana w układzie wielokolumnowym.
  - `code` — blok kodu z syntax highlighting Shiki, nazwą pliku i przyciskiem kopiowania.
  - `video` — bezpieczny embed filmu YouTube (tryb click-to-load) lub plik MP4/WebM.
  - `model` — plik binarny 3D (`.glb`) renderowany za pomocą komponentu `<model-viewer>`.

## 3. Silnik generatywny ASCII

Zlokalizowany w `src/components/ascii/engine.ts`. Cechy kluczowe:
- **Determinizm:** Generacja oparta o generator liczb pseudolosowych PRNG (Mulberry32) inicjalizowany ziarnem (`seed`). Ten sam wpis ma zawsze identyczną grafikę.
- **Wielowarstwowość:** Łączy szum wartościowy 2D (Value Noise), syntezę falową (FBM) oraz ostre cięcia (strata / glitch) inspirowane muzyką breakcore i plakatem risograph.
- **Podwójny cykl życia:**
  1. *SSR/SSG:* Generuje gotowy ciąg znaków wewnątrz znacznika `<pre>` z atrybutem `aria-hidden="true"`, gwarantując natychmiastowe wyświetlanie bez opóźnień i bez wymogu JavaScriptu.
  2. *Klient:* Opcjonalny skrypt reaguje na pozycję kursora myszy (`pointermove`) i animuje siatkę znaków w pętli `requestAnimationFrame` z ograniczeniem do 24 fps, pauzując się automatycznie za pomocą `IntersectionObserver`, gdy element znajduje się poza widokiem.

## 4. Wyszukiwarka pełnotekstowa Pagefind

- Narzędzie `pagefind` analizuje katalog wyjściowy `dist/` po zakończeniu buildu Astro.
- Zbudowany indeks jest zoptymalizowany pod kątem języka polskiego (`pl`), uwzględniając polskie znaki diakrytyczne i odmianę wyrazów.
- Indeksowane są wyłącznie elementy oznaczone atrybutem `data-pagefind-body` na stronach artykułów, co eliminuje szum nawigacyjny i stopki z wyników wyszukiwania.

## 5. Optymalizacja obrazów i zasobów

- Zdjęcia znajdujące się w `src/assets/images/` podlegają przetwarzaniu przez procesor Sharp w Astro, generując zestawy `srcset` o zróżnicowanych szerokościach (640, 960, 1280, 1920, 2560 px) w formacie WebP/AVIF.
- Ciężkie zasoby (skrypt `model-viewer`, iframe YouTube) ładowane są leniwie wyłącznie po interakcji użytkownika lub obecności odpowiedniego elementu w drzewie DOM.
