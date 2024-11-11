import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

jest.setTimeout(30000);

describe('Health Search Tests', () => {
  let driver: WebDriver;

  beforeAll(async () => {
    const options = new Options();
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('homepage has correct title', async () => {
    await driver.get('http://localhost:3000');
    await driver.wait(until.titleMatches(/Health Search/), 5000);
    const title = await driver.getTitle();
    expect(title).toBe('Health Search - Testing Framework Comparison');
  }, 10000);

  it('shows error for invalid search', async () => {
    await driver.get('http://localhost:3000');
    
    // Wait for page load
    await driver.wait(until.elementLocated(By.css('body')), 5000);
    
    // Find and fill search input
    const searchInput = await driver.wait(
      until.elementLocated(By.css('input[type="text"], input[type="search"]')),
      5000
    );
    await searchInput.sendKeys('zzzzzzz');
    
    // Find and click search button
    const searchButton = await driver.wait(
      until.elementLocated(By.css('button[type="submit"]')),
      5000
    );
    await searchButton.click();
    
    // Wait for and verify error message
    const errorMessage = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'No results found')]")),
      3000
    );
    expect(await errorMessage.isDisplayed()).toBe(true);
  }, 10000);
}); 
