import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../pages/GoogleHomePage';
import { GoogleSearchResultsPage } from '../pages/GoogleSearchResultsPage';

test.describe('Google Search - Edge Cases & Security', () => {
  let homePage: GoogleHomePage;
  let resultsPage: GoogleSearchResultsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new GoogleHomePage(page);
    resultsPage = new GoogleSearchResultsPage(page);
    await homePage.navigate();
  });

  test('TC20 - Nonsense query shows "did not match any documents"', async ({ page }) => {
    // Exact match quotes ensure Google forces a no-match response rather than fuzzy indexing
    const nonsenseQuery = '"xyzzyplughqwe1234567890gibberishnonexistent777888999000"';
    await homePage.enterSearchText(nonsenseQuery);
    await homePage.pressSearchEnter();

    await resultsPage.waitForResults();
    test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');

    const noResultsFound = await resultsPage.hasNoResultsMessage();
    expect(noResultsFound).toBeTruthy();
  });

  test('TC21 - Special characters & symbols search handles gracefully', async ({ page }) => {
    const specialChars = '!@#$%^&*()_+-={}|[]:";<>?,./';
    await homePage.enterSearchText(specialChars);
    await homePage.pressSearchEnter();

    await resultsPage.waitForResults();
    test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');

    expect(page.url()).toContain('search');
    await expect(page).toHaveTitle(/!@#|Google/);
  });

  test('TC22 - International unicode & emojis search', async ({ page }) => {
    const unicodeQuery = 'Python 🐍 自动化测试 日本語';
    await homePage.enterSearchText(unicodeQuery);
    await homePage.pressSearchEnter();

    await resultsPage.waitForResults();
    test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');

    expect(page.url()).toContain('search');
    await expect(resultsPage.searchInput).toHaveValue(unicodeQuery);
  });

  test('TC23 - Extremely long query (Boundary test)', async ({ page }) => {
    const longQuery = 'QA_Automation_'.repeat(40); // 560 characters
    await homePage.enterSearchText(longQuery);
    await homePage.pressSearchEnter();

    await resultsPage.waitForResults();
    test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');

    expect(page.url()).toContain('search');
  });

  test('TC24 - XSS injection attempt is safely sanitized', async ({ page }) => {
    let dialogTriggered = false;
    page.on('dialog', async (dialog) => {
      dialogTriggered = true;
      await dialog.dismiss();
    });

    const xssPayload = '<script>alert("XSS")</script>';
    await homePage.enterSearchText(xssPayload);
    await homePage.pressSearchEnter();

    await resultsPage.waitForResults();
    test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');

    expect(dialogTriggered).toBeFalsy();
    const injectedScripts = await page.locator('script:has-text("alert(\\"XSS\\")")').count();
    expect(injectedScripts).toBe(0);
  });

  test('TC25 - SQL injection string handled safely', async ({ page }) => {
    const sqliPayload = "' OR '1'='1' -- ";
    await homePage.enterSearchText(sqliPayload);
    await homePage.pressSearchEnter();

    await resultsPage.waitForResults();
    test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');

    expect(page.url()).toContain('search');
  });
});
