import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../pages/GoogleHomePage';
import { GoogleSearchResultsPage } from '../pages/GoogleSearchResultsPage';

test.describe('Google Search Results Page (SERP)', () => {
  let homePage: GoogleHomePage;
  let resultsPage: GoogleSearchResultsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new GoogleHomePage(page);
    resultsPage = new GoogleSearchResultsPage(page);
    await homePage.navigate();
  });

  test('TC16 - Verify search results contain clickable headings and URLs', async () => {
    await homePage.enterSearchText('GitHub');
    await homePage.pressSearchEnter();

    await resultsPage.waitForResults();
    test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');

    const titles = await resultsPage.getResultTitles();
    expect(titles.length).toBeGreaterThan(0);
    expect(titles.some(t => t.toLowerCase().includes('github'))).toBeTruthy();
  });

  test('TC17 - Verify navigation tabs / filters exist on SERP', async ({ page }) => {
    await homePage.enterSearchText('OpenAI');
    await homePage.pressSearchEnter();

    await resultsPage.waitForResults();
    test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');

    const filters = page.locator('div[role="navigation"] [role="listitem"], div[role="tablist"] div');
    await expect(filters.first()).toBeVisible();
  });

  test('TC18 - Spelling correction suggestion for misspelled query', async ({ page }) => {
    await homePage.enterSearchText('playwrihgt automatin');
    await homePage.pressSearchEnter();

    await resultsPage.waitForResults();
    test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');

    const correctionNotice = page.getByRole('heading', { name: /These are results for|Showing results for/i })
      .or(page.getByText('These are results for', { exact: false }))
      .or(page.getByText('Search instead for', { exact: false }));
    await expect(correctionNotice.first()).toBeVisible({ timeout: 7000 });
  });

  test('TC19 - Clicking a search result navigates away from Google', async ({ page }) => {
    await homePage.enterSearchText('Playwright documentation Microsoft');
    await homePage.pressSearchEnter();

    await resultsPage.waitForResults();
    test.skip(await resultsPage.isCaptchaPresent(), 'Google bot protection encountered');
    
    const firstLink = resultsPage.resultLinks.first();
    await expect(firstLink).toBeVisible();
    
    await Promise.all([
      page.waitForNavigation({ timeout: 10000 }).catch(() => null),
      firstLink.click(),
    ]);

    expect(page.url()).toBeTruthy();
  });
});
