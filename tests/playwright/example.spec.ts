import { test, expect } from '@playwright/test';

// Test 1 - Homepage has correct title
test('homepage has correct title', async ({ page }) => {
  await page.goto('/'); // Navigate to the homepage
  await expect(page).toHaveTitle('Health Search - Testing Framework Comparison'); // Check the title
});

// Test 2 - Shows no results message for invalid search
test('shows no results message for invalid search', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  
  const searchInput = await page.waitForSelector('#search-input, .search-input, input[placeholder*="search" i]', { timeout: 5000 });
  await searchInput.fill('zzzzzzz');
  
  await expect(page.getByText('No results found for your search criteria.')).toBeVisible({ timeout: 3000 });
});

// Test 3 - Shows results for valid search
test('shows results for valid search', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const searchInput = await page.waitForSelector('#search-input, .search-input, input[placeholder*="search" i]', { timeout: 5000 });
  await searchInput.fill('Covid');

  await expect(page.getByText('COVID-19 Vaccination Progress')).toBeVisible({ timeout: 3000 });
});

// Test 4 - Make a failed test (expect result not to be visible)
test('failed test', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const searchInput = await page.waitForSelector('#search-input, .search-input, input[placeholder*="search" i]', { timeout: 5000 });
  await searchInput.fill('Covid');

  await expect(page.getByText('Diabetes Prevalence in Southeast Asia')).toBeVisible({ timeout: 3000 });
});
