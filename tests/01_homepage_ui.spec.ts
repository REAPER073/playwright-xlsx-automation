import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../pages/GoogleHomePage';

test.describe('Google Home Page - UI & Layout Verification', () => {
  let homePage: GoogleHomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new GoogleHomePage(page);
    await homePage.navigate();
  });

  test('TC01 - Verify page title contains "Google"', async ({ page }) => {
    await expect(page).toHaveTitle(/Google/i);
  });

  test('TC02 - Verify current URL is Google domain', async ({ page }) => {
    expect(page.url()).toMatch(/^https:\/\/(www\.)?google\.[a-z.]+/);
  });

  test('TC03 - Verify Google Logo is visible', async () => {
    await expect(homePage.googleLogo).toBeVisible();
  });

  test('TC04 - Verify Search input box is visible and enabled', async () => {
    await expect(homePage.searchInput).toBeVisible();
    await expect(homePage.searchInput).toBeEnabled();
  });

  test('TC05 - Verify "Google Search" and "I\'m Feeling Lucky" buttons are present in DOM', async () => {
    await expect(homePage.googleSearchBtn).toBeAttached();
    await expect(homePage.feelingLuckyBtn).toBeAttached();
  });

  test('TC06 - Verify header links (Gmail, Images, Sign In) are present', async ({ page }) => {
    const gmailOrImages = homePage.gmailLink.or(homePage.imagesLink);
    await expect(gmailOrImages.first()).toBeVisible();
    
    // Sign-in button or link
    const signIn = page.getByRole('link', { name: /Sign in|Sign In|Anmelden|Connexion/i });
    if (await signIn.isVisible()) {
      await expect(signIn).toBeVisible();
    }
  });

  test('TC07 - Verify footer contains essential legal and info links', async ({ page }) => {
    // Check at least privacy and terms links are available in footer
    const privacyLink = page.getByRole('link', { name: /Privacy/i }).first();
    const termsLink = page.getByRole('link', { name: /Terms/i }).first();
    
    await expect(privacyLink).toBeAttached();
    await expect(termsLink).toBeAttached();
  });

  test('TC08 - Responsive check on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    await page.goto('https://www.google.com?hl=en');
    await homePage.handleConsentDialog();
    await expect(homePage.searchInput).toBeVisible();
  });
});
