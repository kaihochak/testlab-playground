# Testing Framework Comparison

This project demonstrates how to implement and run tests using different testing frameworks:
- Playwright
- Selenium
- Cypress (Coming Soon)
- Puppeteer (Coming Soon)

## Table of Contents
- [Testing Framework Comparison](#testing-framework-comparison)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
  - [Test Cases](#test-cases)
  - [Framework-specific Setup](#framework-specific-setup)
    - [Playwright](#playwright)
      - [Prerequisites](#prerequisites)
      - [Installation](#installation)
      - [Running Tests](#running-tests)
      - [Project Structure](#project-structure-1)
    - [Selenium](#selenium)
    - [Coming Soon](#coming-soon)
  - [Contributing](#contributing)



## Project Structure

tests/
├── playwright/
│   └── example.spec.ts    # Playwright test cases
└── selenium/
    └── example.spec.ts    # Selenium test cases

## Getting Started

1. Install dependencies:
`npm install`

2. Start the development server:
`npm run dev`

3. Run tests:
# Run Playwright tests
`npm run test:playwright`

# Run Selenium tests
`npm run test:selenium`

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

This project uses Playwright for end-to-end testing.

#### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

#### Installation
1. Install Playwright:
```bash
npm init playwright@latest
```

2. Install browser dependencies:
```bash
npx playwright install
```

#### Running Tests
```bash
# Run all tests
npx playwright test

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests in UI mode
npx playwright test --ui
```

#### Project Structure
```
tests/
└── playwright/
    └── example.spec.ts    # Playwright test cases
```


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
