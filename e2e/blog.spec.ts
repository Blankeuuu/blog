import { test, expect } from '@playwright/test';

test.describe('Blog Szymona Potyry — E2E', () => {
  test('Strona główna renderuje plakat hero, polskie metadane i ASCII', async ({ page }) => {
    await page.goto('./');

    // Sprawdź metadane
    await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
    await expect(page).toHaveTitle(/blankeu - blog/);

    // Sprawdź nagłówek hero
    const heading = page.locator('h1');
    await expect(heading).toContainText('BLANKEU');

    // Sprawdź kontener ASCII
    const ascii = page.locator('.ascii-container');
    await expect(ascii.first()).toBeVisible();

    // Sprawdź brak horyzontalnego przewijania
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasOverflow).toBe(false);
  });

  test('Przełącznik motywu (jasny / ciemny) modyfikuje atrybut data-theme', async ({ page, isMobile }) => {
    await page.goto('./');

    const toggleBtn = isMobile
      ? page.locator('#mobile-theme-toggle')
      : page.locator('#theme-toggle-btn');

    if (isMobile) {
      // Otwórz menu mobilne
      await page.locator('#mobile-menu-btn').click();
    }

    await expect(toggleBtn).toBeVisible();

    const initialTheme = await page.locator('html').getAttribute('data-theme');
    await toggleBtn.click();
    const nextTheme = await page.locator('html').getAttribute('data-theme');

    expect(nextTheme).not.toBe(initialTheme);
  });

  test('Wyszukiwarka modalna otwiera się przyciskiem i zamyka klawiszem ESC', async ({ page }) => {
    await page.goto('./');

    const searchDialog = page.locator('#search-dialog');
    await expect(searchDialog).toHaveClass(/hidden/);

    // Kliknij pierwszy widoczny przycisk szukaj
    await page.locator('[data-search-trigger]:visible').first().click();
    await expect(searchDialog).not.toHaveClass(/hidden/);

    // Wpisz frazę
    const input = page.locator('#search-input');
    await expect(input).toBeFocused();
    await input.fill('ESP32');

    // Zamknij klawiszem Escape
    await page.keyboard.press('Escape');
    await expect(searchDialog).toHaveClass(/hidden/);
  });

  test('Nawigacja do archiwum i tagów działa prawidłowo', async ({ page, isMobile }) => {
    await page.goto('./');

    if (isMobile) {
      await page.locator('#mobile-menu-btn').click();
      await page.locator('#mobile-menu a:has-text("ARCHIWUM")').click();
    } else {
      await page.locator('header nav.hidden a:has-text("ARCHIWUM")').click();
    }

    await expect(page).toHaveURL(/.*\/archiwum\/?/);
    await expect(page.locator('h1')).toContainText('Archiwum chronologiczne');
  });
});
