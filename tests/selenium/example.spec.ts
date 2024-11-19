import assert from 'assert';
import { Builder, By, until, WebDriver } from 'selenium-webdriver';

(async function test() {
  let driver: WebDriver | undefined; // Initialize as undefined

  try {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000');

    let title = await driver.getTitle();
    console.log('Title:', title);
    assert.equal(title, 'Health Search - Testing Framework Comparison');

    await driver.manage().setTimeouts({ implicit: 500 });
    await driver.manage().window().maximize();
  } catch (error) {
    console.error('Error details:', error);
    throw error;
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
})();
