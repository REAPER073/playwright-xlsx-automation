import { Page, Locator, expect } from '@playwright/test';

export class GoogleHomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButtons: Locator;
  readonly googleSearchBtn: Locator;
  readonly feelingLuckyBtn: Locator;
  readonly googleLogo: Locator;
  readonly gmailLink: Locator;
  readonly imagesLink: Locator;
  readonly googleAppsBtn: Locator;
  readonly signInBtn: Locator;
  readonly suggestionDropdown: Locator;
  readonly suggestionItems: Locator;
  readonly clearInputBtn: Locator;
  readonly voiceSearchBtn: Locator;
  readonly searchByImageBtn: Locator;
  readonly footerLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    // Primary search input is typically textarea[name="q"] or input[name="q"]
    this.searchInput = page.locator('textarea[name="q"], input[name="q"]').first();
    this.searchButtons = page.locator('input[name="btnK"], button:has-text("Google Search")');
    this.googleSearchBtn = page.getByRole('button', { name: 'Google Search' }).first();
    this.feelingLuckyBtn = page.getByRole('button', { name: /I'm Feeling Lucky/i }).first();
    this.googleLogo = page.locator('img[alt="Google"], svg[aria-label="Google"]').first();
    this.gmailLink = page.getByRole('link', { name: 'Gmail' });
    this.imagesLink = page.getByRole('link', { name: 'Images' });
    this.googleAppsBtn = page.locator('a[aria-label="Google apps"], a[aria-label="Google Apps"]');
    this.signInBtn = page.getByRole('link', { name: /Sign in/i });
    this.suggestionDropdown = page.locator('ul[role="listbox"]').first();
    this.suggestionItems = page.locator('ul[role="listbox"] li');
    this.clearInputBtn = page.locator('div[aria-label="Clear"], button[aria-label="Clear"]');
    this.voiceSearchBtn = page.locator('div[aria-label="Search by voice"], button[aria-label="Search by voice"]');
    this.searchByImageBtn = page.locator('div[aria-label="Search by image"], button[aria-label="Search by image"]');
    this.footerLinks = page.locator('footer a, div[role="contentinfo"] a');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://www.google.com?hl=en');
    await this.handleConsentDialog();
  }

  /**
   * Automatically handles cookie / privacy consent modals if presented (common in EU/UK)
   */
  async handleConsentDialog(): Promise<void> {
    const consentButtons = [
      this.page.getByRole('button', { name: /Accept all/i }),
      this.page.getByRole('button', { name: /I agree/i }),
      this.page.locator('button#L2AGLb'), // "Accept all" button ID
      this.page.getByRole('button', { name: /Read more/i }),
    ];

    for (const btn of consentButtons) {
      if (await btn.isVisible({ timeout: 1500 }).catch(() => false)) {
        await btn.click().catch(() => {});
        await this.page.waitForTimeout(500);
        break;
      }
    }
  }

  async enterSearchText(text: string): Promise<void> {
    await this.searchInput.fill(text);
  }

  async typeSearchText(text: string): Promise<void> {
    await this.searchInput.focus();
    await this.searchInput.pressSequentially(text, { delay: 50 });
  }

  async pressSearchEnter(): Promise<void> {
    await this.searchInput.press('Enter');
  }

  async clickGoogleSearchButton(): Promise<void> {
    // If suggestions are showing, the main button might be covered, so click the visible one or press enter
    if (await this.googleSearchBtn.isVisible()) {
      await this.googleSearchBtn.click();
    } else {
      await this.searchInput.press('Enter');
    }
  }

  async clickFeelingLucky(): Promise<void> {
    if (await this.feelingLuckyBtn.isVisible()) {
      await this.feelingLuckyBtn.click();
    } else {
      // Fallback in case suggestions overlay it
      await this.page.locator('input[name="btnI"]').first().click({ force: true });
    }
  }

  async getSearchSuggestions(): Promise<string[]> {
    await this.suggestionDropdown.waitFor({ state: 'visible', timeout: 4000 });
    return await this.suggestionItems.allInnerTexts();
  }

  async selectSuggestionByIndex(index: number): Promise<void> {
    await this.suggestionDropdown.waitFor({ state: 'visible', timeout: 4000 });
    const items = this.suggestionItems;
    await items.nth(index).click();
  }

  async clearSearch(): Promise<void> {
    if (await this.clearInputBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
      await this.clearInputBtn.click();
    } else {
      await this.searchInput.fill('');
    }
  }
}
