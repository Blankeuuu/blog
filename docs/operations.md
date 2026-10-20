# Procedury operacyjne i utrzymanie — blankeu - blog

Podręcznik operacyjny dla właściciela serwisu: wdrożenia, konfiguracja GitHub Pages, integracja Pages CMS oraz zarządzanie domeną.

## 1. Wdrożenie na GitHub Pages

Repozytorium skonfigurowane jest jako strona projektu na koncie `Blankeuuu`.

- **Adres źródłowy:** `https://github.com/Blankeuuu/blog`
- **Docelowy adres URL:** `https://blankeuuu.github.io/blog/`
- **Ścieżka bazowa (base):** `/blog/`

### Konfiguracja repozytorium GitHub

W ustawieniach repozytorium na GitHub (`Settings` → `Pages`):
1. **Source:** Wybierz opcję `GitHub Actions`.
2. Nie wybieraj gałęzi `gh-pages` — publikacja odbywa się przez oficjalny workflow `actions/deploy-pages@v4`.

### Wyzwalanie wdrożenia

- **Automatyczne:** Każdy commit wypchnięty do gałęzi `main` (ręcznie przez Gita lub automatycznie przez Pages CMS po zapisaniu wpisu) wyzwala pipeline `.github/workflows/deploy.yml`.
- **Ręczne:** W zakładce `Actions` wybierz workflow `Deploy to GitHub Pages` i kliknij `Run workflow`.

---

## 2. Podłączenie i autoryzacja Pages CMS

Pages CMS działa w modelu hosted na [app.pagescms.org](https://app.pagescms.org).

1. Zaloguj się na platformie przy użyciu konta GitHub `Blankeuuu`.
2. Przy pierwszym logowaniu zezwól aplikacji Pages CMS na dostęp do repozytorium `blog`.
3. Uprawnienia Pages CMS obejmują:
   - Odczyt i zapis zawartości (`Contents: Read & Write`) w celu tworzenia commitów z plikami `.md` i mediami.
   - Odczyt metadanych (`Metadata: Read`).
4. Pages CMS używa pliku `.pages.yml` znajdującego się w katalogu głównym gałęzi `main` do wygenerowania panelu administracyjnego.

---

## 3. Dodawanie nowych tagów i tematów

Aby dodać nowy obszar tematyczny:
1. Otwórz `src/data/tags.mjs` i dopisz nowy wpis do tablicy `TAGS`:
   ```javascript
   { slug: 'nowy-temat', label: 'Nowy temat', short: 'NOW' }
   ```
2. Otwórz `.pages.yml` i dopisz wartość w sekcji `tags` -> `options.values`:
   ```yaml
   - name: nowy-temat
     label: Nowy temat
   ```
3. Uruchom `npm run validate`, aby potwierdzić spójność konfiguracji.

---

## 4. Migracja na własną domenę

W przypadku podpięcia własnej domeny lub subdomeny (np. `https://notatki.potyra.pl`):
1. W pliku `site.config.mjs` zaktualizuj:
   ```javascript
   export const SITE_ORIGIN = 'https://notatki.potyra.pl';
   export const SITE_BASE = '/';
   ```
2. Utwórz plik `public/CNAME` zawierający domenę `notatki.potyra.pl`.
3. W panelu DNS dostawcy domeny skonfiguruj rekord CNAME wskazujący na `blankeuuu.github.io`.
4. W ustawieniach repozytorium GitHub (`Settings` → `Pages`) wpisz własną domenę i zaznacz opcję `Enforce HTTPS`.
