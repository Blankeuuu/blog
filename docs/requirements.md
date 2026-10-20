# Wymagania i kryteria akceptacji — blankeu - blog

Zestawienie wymagań projektowych oraz ich stan weryfikacji.

## 1. Tożsamość i art direction

- [x] Osobna tożsamość wizualna względem portfolio głównego (brak klonowania ciemnego Vercel style).
- [x] Inspiracja plakatem typograficznym: papier kość słoniowa (`#F3F0E4`), kobaltowy błękit (`#075AB3`), nasycona magenta (`#D11160`), atrament (`#171717`).
- [x] Automatyczne i manualne motywy: jasny oraz ciemny (`#10141B`, `#68A8FF`, `#FF559A`, `#F1EDE4`).
- [x] Dyskretny link do głównego Maker Portfolio w nagłówku i stopce.
- [x] Wyłącznie język polski w interfejsie redakcyjnym i metadanych strony (`lang="pl"`).

## 2. Strona główna — plakat cyfrowy

- [x] Pełnoekranowy plakat hero o asymetrycznej kompozycji z wielkim napisem `BLANKEU`.
- [x] Generatywny silnik ASCII zoptymalizowany pod kątem znaków `M @ Z J 0 / % # : .`.
- [x] Reakcja na ruch kursora myszy i płynne przewijanie z poszanowaniem `prefers-reduced-motion`.
- [x] Intencjonalny, elegancki stan pusty (Empty State) w języku polskim w przypadku braku opublikowanych wpisów.
- [x] Dostęp do archiwum, filtrów tematycznych i wyszukiwarki.

## 3. Doświadczenie czytania artykułu

- [x] Balans: 50% ekspresyjna tożsamość plakatu w nagłówku / 50% komfortowa czytelność w kolumnie tekstu (65–75 znaków w wierszu).
- [x] Spis treści (TOC) dla dłuższych wpisów.
- [x] Szacowany czas czytania w minutach.
- [x] Nawigacja poprzedni / następny wpis.
- [x] Wsparcie dla bloków multimedialnych: tekst Markdown, pojedyncze zdjęcia, galerie, bloki kodu z kopiowaniem, wideo YouTube (click-to-load) oraz modele 3D GLB.

## 4. CMS i zarządzanie treścią

- [x] Konfiguracja Pages CMS w `.pages.yml` zgodna z oficjalną specyfikacją.
- [x] Brak zewnętrznych baz danych — stan zapisywany w plikach Markdown w gicie.
- [x] Tryb szkiców (`draft: true`) wyklucza wpisy z buildu, wyszukiwarki, mapy strony i RSS.
- [x] Zoptymalizowane ścieżki mediów pod kątem podścieżki `/blog/` na GitHub Pages.

## 5. Dostępność i SEO

- [x] Zgodność z WCAG 2.2 AA (kontrast, nawigacja klawiaturą, widoczne wskaźniki fokusu, aria-hidden na elementach ozdobnych).
- [x] Poprawne opisy alternatywne dla wszystkich obrazów i modeli 3D.
- [x] Pełne metadane Open Graph, Twitter Cards, kanoniczne adresy URL.
- [x] Wygenerowana mapa witryny (`sitemap-index.xml`) i kanał `rss.xml`.
- [x] Plik `robots.txt` wskazujący mapę witryny.
