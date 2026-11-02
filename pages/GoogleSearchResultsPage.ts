import { Page, Locator } from '@playwright/test';

export class GoogleSearchResultsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchResultsContainer: Locator;
  readonly resultHeadings: Locator;
  readonly resultLinks: Locator;
  readonly spellingSuggestion: Locator;
  readonly navigationFilters: Locator;
  readonly captchaNotice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('textarea[name="q"], input[name="q"]').first();
    this.searchResultsContainer = page.locator('#rso, #search, #center_col');
    this.resultHeadings = page.locator('#rso h3, #search h3');
    this.resultLinks = page.locator('#rso a:has(h3)');
    this.spellingSuggestion = page.locator('#fprsl, a:has-text("Did you mean:")');
    this.navigationFilters = page.locator('div[role="navigation"] [role="listitem"] a, div[role="tablist"] a');
    this.captchaNotice = page.locator('iframe[title*="reCAPTCHA"], text="unusual traffic", text="I\'m not a robot"');
  }

  async isCaptchaPresent(): Promise<boolean> {
    return await this.captchaNotice.first().isVisible({ timeout: 1500 }).catch(() => false);
  }

  async waitForResults(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    if (await this.isCaptchaPresent()) {
      return;
    }
    await this.page.waitForURL(/search/, { timeout: 10000 }).catch(() => {});
    await this.searchResultsContainer.first().waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});
  }

  async getResultCount(): Promise<number> {
    return await this.resultHeadings.count();
  }

  async getResultTitles(): Promise<string[]> {
    return await this.resultHeadings.allInnerTexts();
  }

  async getFirstResultTitle(): Promise<string> {
    return (await this.resultHeadings.first().innerText()).trim();
  }

  async clickFirstResult(): Promise<void> {
    await this.resultLinks.first().click();
  }

  async hasNoResultsMessage(): Promise<boolean> {
    const noResultsLocator = this.page.getByText('did not match any documents')
      .or(this.page.getByText('No results found for'))
      .or(this.page.getByText('Make sure that all words are spelled correctly'));
    return await noResultsLocator.first().isVisible({ timeout: 6000 }).catch(() => false);
  }
}
