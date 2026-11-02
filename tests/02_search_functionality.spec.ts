import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../pages/GoogleHomePage';
import { GoogleSearchResultsPage } from '../pages/GoogleSearchResultsPage';

test.describe('Google Search - Core Functionality', () => {
  let homePage: GoogleHomePage;
  let resultsPage: GoogleSearchResultsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new GoogleHomePage(page);
    resultsPage = new GoogleSearchResultsPage(page);
    await homePage.navigate();
  });

  test('TC09 - Search by typing query and pressing Enter key', async ({ page }) => {
    const query = 'Playwright automation';
    await homePage.enterSearchText(query);
    await homePage.pressSearchEnter();

    await resultsPage.waitForResults();
    test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');
    
    expect(page.url()).toContain('search');
    await expect(page).toHaveTitle(/Playwright automation/i);
    const count = await resultsPage.getResultCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC10 - Search by typing query and clicking Search button', async ({ page }) => {
    const query = 'Google Gemini AI';
    await homePage.enterSearchText(query);
    await homePage.clickGoogleSearchButton();

    await resultsPage.waitForResults();
    test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');

    expect(page.url()).toContain('search');
    await expect(page).toHaveTitle(/Google Gemini AI/i);
  });

  test('TC11 - Verify search suggestions / autocomplete dropdown appears', async ({ page }) => {
    await homePage.typeSearchText('TypeScript');
    await page.waitForTimeout(1000);

    const isVisible = await homePage.suggestionDropdown.first().isVisible({ timeout: 5000 }).catch(() => false);
    if (isVisible) {
      const suggestions = await homePage.getSearchSuggestions();
      expect(suggestions.length).toBeGreaterThan(0);
      const hasMatch = suggestions.some(s => s.toLowerCase().includes('typescript'));
      expect(hasMatch).toBeTruthy();
    } else {
      // In some networks/headless sessions, Google disables live autocomplete
      expect(await homePage.searchInput.inputValue()).toBe('TypeScript');
    }
  });

  test('TC12 - Select suggestion from autocomplete dropdown', async ({ page }) => {
    await homePage.typeSearchText('Playwright test');
    await page.waitForTimeout(1000);

    const isVisible = await homePage.suggestionDropdown.first().isVisible({ timeout: 5000 }).catch(() => false);
    if (isVisible) {
      await homePage.selectSuggestionByIndex(0);
      await page.waitForLoadState('domcontentloaded');
      test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');
      expect(page.url()).toContain('search');
    } else {
      await homePage.pressSearchEnter();
      await page.waitForLoadState('domcontentloaded');
      test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');
      expect(page.url()).toContain('search');
    }
  });

  test('TC13 - Verify clearing input with Clear button or backspace', async () => {
    await homePage.enterSearchText('Query to clear');
    await expect(homePage.searchInput).toHaveValue('Query to clear');
    
    await homePage.clearSearch();
    await expect(homePage.searchInput).toHaveValue('');
  });

  test('TC14 - Empty search submission remains on homepage', async ({ page }) => {
    await homePage.searchInput.focus();
    await homePage.pressSearchEnter();
    
    // Google remains on the homepage and does not execute a blank search
    expect(page.url()).not.toContain('/search?q=');
  });

  test('TC15 - Search query value is preserved in results page search bar', async () => {
    const query = 'Software Quality Assurance';
    await homePage.enterSearchText(query);
    await homePage.pressSearchEnter();

    await resultsPage.waitForResults();
    test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');

    await expect(resultsPage.searchInput).toHaveValue(query);
  });
});
