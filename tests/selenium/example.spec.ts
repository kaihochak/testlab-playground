import { Builder, By, until, WebDriver } from 'selenium-webdriver';

describe('Homepage Tests', () => {

  // All the extra stuff is to get the ChromeDriver working
  let driver!: WebDriver;

  beforeAll(async () => {
    try {
      const chromedriver = require('chromedriver');
      const chrome = require('selenium-webdriver/chrome');
      
      const chromeOptions = new chrome.Options();
      chromeOptions.addArguments('--no-sandbox');
      chromeOptions.addArguments('--disable-dev-shm-usage');
      chromeOptions.addArguments('--headless');
      chromeOptions.addArguments('--disable-gpu');
      
      const service = new chrome.ServiceBuilder(chromedriver.path);
      
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .setChromeService(service)
        .build();

      await driver.manage().setTimeouts({ implicit: 10000 });
      await driver.manage().window().maximize();
    } catch (error) {
      console.error('Error in beforeAll:', error);
      throw error;
    }
  }, 120000);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  // Tests

  // Test 1 - Homepage has correct title
  test('homepage has correct title', async () => {
    await driver.get('http://localhost:3000');
    const title = await driver.getTitle();
    expect(title).toBe('Health Search - Testing Framework Comparison');
  }, 30000);

  // Test 2 - Shows no results message for invalid search
  test('shows no results message for invalid search', async () => {
    await driver.get('http://localhost:3000');
    await driver.wait(until.elementLocated(By.css('#search-input, .search-input, input[placeholder*="search" i]')), 5000);
    
    const searchInput = await driver.findElement(By.css('#search-input, .search-input, input[placeholder*="search" i]'));
    await searchInput.sendKeys('zzzzzzz');
    
    const noResultsMessage = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'No results found for your search criteria.')]")),
      3000
    );
    expect(await noResultsMessage.isDisplayed()).toBe(true);
  }, 30000);

  // Test 3 - Shows results for valid search
  test('shows results for valid search', async () => {
    await driver.get('http://localhost:3000');
    await driver.wait(until.elementLocated(By.css('#search-input, .search-input, input[placeholder*="search" i]')), 5000);
    
    const searchInput = await driver.findElement(By.css('#search-input, .search-input, input[placeholder*="search" i]'));
    await searchInput.sendKeys('Covid');
    
    const resultElement = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'COVID-19 Vaccination Progress')]")),
      3000
    );
    expect(await resultElement.isDisplayed()).toBe(true);
  }, 30000);

  // Test 4 - Make a failed test (expect result not to be visible)
  test('failed test', async () => {
    await driver.get('http://localhost:3000');
    await driver.wait(until.elementLocated(By.css('#search-input, .search-input, input[placeholder*="search" i]')), 5000);
    
    const searchInput = await driver.findElement(By.css('#search-input, .search-input, input[placeholder*="search" i]'));
    await searchInput.sendKeys('Covid');
    
    const resultElement = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Diabetes Prevalence in Southeast Asia')]")),
      3000
    );
    expect(await resultElement.isDisplayed()).toBe(true);
  }, 30000);
});
