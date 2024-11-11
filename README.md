# Testing Framework Comparison

This project demonstrates how to implement and run tests using different testing frameworks:
- Playwright
- Selenium
- Cypress (Coming Soon)
- Puppeteer (Coming Soon)

## Project Structure

tests/
├── playwright/
│   └── example.spec.ts    # Playwright test cases
└── selenium/
    └── example.spec.ts    # Selenium test cases

## Getting Started

1. Install dependencies:
npm install

2. Start the development server:
npm run dev

3. Run tests:
# Run Playwright tests
npm run test:playwright

# Run Selenium tests
npm run test:selenium

# Cypress and Puppeteer coming soon

## Test Cases

Each framework implements the same test cases for comparison:

1. Homepage Title Test
   - Verifies the page title is correct

2. Invalid Search Test
   - Enters invalid search term
   - Verifies error message appears

## Framework-specific Setup

### Playwright
- Uses @playwright/test
- Configuration in playwright.config.ts
- Tests in tests/playwright/

### Selenium
- Uses selenium-webdriver with Jest
- Configuration in jest.config.js
- Tests in tests/selenium/

### Coming Soon
- Cypress implementation
- Puppeteer implementation

## Contributing

Feel free to contribute by:
1. Adding more test cases
2. Implementing Cypress tests
3. Implementing Puppeteer tests
4. Improving existing tests
