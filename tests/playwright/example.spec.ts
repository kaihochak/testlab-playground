import { test, expect } from '@playwright/test';

// Test 1 - Homepage has correct title
test('homepage has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Health Search - Testing Framework Comparison');
});

// Test 2 - Shows error for invalid search
test('shows error for invalid search', async ({ page }) => {
  await page.goto('/');
  // Wait for the page to be in a ready state
  await page.waitForLoadState('domcontentloaded');
  
  const searchInput = await page.waitForSelector('input[type="text"], input[type="search"]', { timeout: 5000 });
  await searchInput.fill('zzzzzzz');
  
  // Wait for and click the search button
  const searchButton = await page.waitForSelector('button[type="submit"]');
  await searchButton.click();
  
  // This should fail because we expect an error message that doesn't exist
  await expect(page.getByText('No results found')).toBeVisible({ timeout: 3000 });
});
