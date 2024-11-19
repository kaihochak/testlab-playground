import assert from 'assert';
import { Builder, By, until, WebDriver } from 'selenium-webdriver';

describe('Homepage Tests', () => {
  let driver!: WebDriver;

  beforeAll(async () => {
    try {
      console.log('Setting up WebDriver...');
      
      // Set path to ChromeDriver
      const chromedriver = require('chromedriver');
      const chrome = require('selenium-webdriver/chrome');
      
      console.log('ChromeDriver path:', chromedriver.path);
      
      const chromeOptions = new chrome.Options();
      chromeOptions.addArguments('--no-sandbox');
      chromeOptions.addArguments('--disable-dev-shm-usage');
      chromeOptions.addArguments('--headless');
      chromeOptions.addArguments('--disable-gpu');
      
      // Set the service path directly in the builder
      const service = new chrome.ServiceBuilder(chromedriver.path);
      
      console.log('Building WebDriver with options...');
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .setChromeService(service)  // Pass the ServiceBuilder directly
        .build();
      
      console.log('WebDriver built successfully');
      await driver.manage().setTimeouts({ implicit: 10000 });
      await driver.manage().window().maximize();
      console.log('WebDriver setup complete');
    } catch (error) {
      console.error('Error in beforeAll:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw error;
    }
  }, 120000);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  }, 60000);

  test('should load homepage with correct title', async () => {
    try {
      await driver.get('http://localhost:3000');
      
      // Add explicit wait for title
      await driver.wait(until.titleIs('Health Search - Testing Framework Comparison'), 10000);
      
      const title = await driver.getTitle();
      console.log('Title:', title);
      assert.equal(title, 'Health Search - Testing Framework Comparison');
    } catch (error) {
      console.error('Error details:', error);
      throw error;
    }
  }, 120000);  // Increased to 120 seconds
});
