import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../pages/GoogleHomePage';
import { GoogleSearchResultsPage } from '../pages/GoogleSearchResultsPage';

test.describe('Google Navigation, Advanced Search & Shortcuts', () => {
  let homePage: GoogleHomePage;
  let resultsPage: GoogleSearchResultsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new GoogleHomePage(page);
    resultsPage = new GoogleSearchResultsPage(page);
    await homePage.navigate();
  });

  test('TC26 - "I\'m Feeling Lucky" button functionality', async ({ page }) => {
    await homePage.clickFeelingLucky();
    await page.waitForLoadState('domcontentloaded');

    const currentUrl = page.url();
    expect(currentUrl).not.toEqual('https://www.google.com/');
  });

  test('TC27 - Navigate to Google Images via header link', async ({ page }) => {
    const imagesLink = homePage.imagesLink.first();
    if (await imagesLink.isVisible()) {
      await imagesLink.click();
      await page.waitForLoadState('domcontentloaded');
      expect(page.url()).toContain('imghp');
      await expect(page).toHaveTitle(/Images|Google Images/i);
    }
  });

  test('TC28 - Advanced search operator (site: filter)', async ({ page }) => {
    const operatorQuery = 'site:playwright.dev locators';
    await homePage.enterSearchText(operatorQuery);
    await homePage.pressSearchEnter();

    await resultsPage.waitForResults();
    test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');

    const titles = await resultsPage.getResultTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test('TC29 - Keyboard accessibility: Tab navigation focuses search bar or interactive elements', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(['INPUT', 'TEXTAREA', 'BUTTON', 'A', 'DIV']).toContain(focusedTag);
  });
});
