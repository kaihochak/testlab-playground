"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";

export function TestingComparison() {
  const [selectedFramework, setSelectedFramework] = useState("");

  const frameworks = [
    {
      name: "Playwright",
      pros: ["Modern, powerful API", "Auto-wait capabilities", "Cross-browser support"],
      cons: ["Newer framework", "Smaller community"],
      bestFor: "Modern web apps, cross-browser testing",
      testCode: `
import { test, expect } from '@playwright/test';

test('search functionality', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Type in the search input
  await page.fill('[data-testid="search-input"]', 'diabetes');
  
  // Click the search button
  await page.click('[data-testid="search-button"]');
  
  // Wait for results and verify
  const results = await page.locator('[data-testid="search-results"]');
  await expect(results).toBeVisible();
  
  // Verify specific result exists
  const diabetesResult = await page.getByText('Diabetes prevalence in Asia');
  await expect(diabetesResult).toBeVisible();
});`
    },
    {
      name: "Selenium",
      pros: ["Mature ecosystem", "Large community", "Multiple language bindings"],
      cons: ["Slower execution", "Complex setup"],
      bestFor: "Legacy applications, enterprise testing",
      testCode: `
import { Builder, By, until } from 'selenium-webdriver';

describe('Search Functionality', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('should perform search', async () => {
    await driver.get('http://localhost:3000');
    
    // Find and fill search input
    const searchInput = await driver.findElement(By.css('[data-testid="search-input"]'));
    await searchInput.sendKeys('diabetes');
    
    // Click search button
    const searchButton = await driver.findElement(By.css('[data-testid="search-button"]'));
    await searchButton.click();
    
    // Wait for results and verify
    const results = await driver.wait(
      until.elementLocated(By.css('[data-testid="search-results"]')),
      5000
    );
    expect(await results.isDisplayed()).toBe(true);
  });
});`
    },
    {
      name: "Cypress",
      pros: ["Real-time reloading", "Time-travel debugging", "Easy setup"],
      cons: ["Limited cross-browser support", "Same-origin limitations"],
      bestFor: "Modern JavaScript applications",
      testCode: `
describe('Search Functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should perform search and display results', () => {
    // Type in search input
    cy.get('[data-testid="search-input"]')
      .type('diabetes');
    
    // Click search button
    cy.get('[data-testid="search-button"]')
      .click();
    
    // Verify results appear
    cy.get('[data-testid="search-results"]')
      .should('be.visible');
    
    // Verify specific result
    cy.contains('Diabetes prevalence in Asia')
      .should('be.visible');
  });
});`
    },
    {
      name: "Puppeteer",
      pros: ["Chrome DevTools protocol", "Fast execution", "Performance testing"],
      cons: ["Chrome/Chromium only", "Less intuitive API"],
      bestFor: "Chrome-specific testing, performance testing",
      testCode: `
import puppeteer from 'puppeteer';

describe('Search Functionality', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should perform search', async () => {
    await page.goto('http://localhost:3000');
    
    // Type in search input
    await page.type('[data-testid="search-input"]', 'diabetes');
    
    // Click search button
    await page.click('[data-testid="search-button"]');
    
    // Wait for results and verify
    await page.waitForSelector('[data-testid="search-results"]');
    
    const resultsVisible = await page.$eval(
      '[data-testid="search-results"]',
      el => el.offsetParent !== null
    );
    expect(resultsVisible).toBe(true);
  });
});`
    }
  ];

  return (
    <Card className="p-6 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <h2 className="text-2xl font-bold mb-6">Testing Framework Comparison</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Framework</TableHead>
              <TableHead>Pros</TableHead>
              <TableHead>Cons</TableHead>
              <TableHead>Best For</TableHead>
              <TableHead>Try It</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {frameworks.map((framework) => (
              <TableRow key={framework.name}>
                <TableCell className="font-medium">
                  {framework.name}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {framework.pros.map((pro) => (
                      <Badge key={pro} variant="secondary" className="bg-green-950 text-green-200 dark:bg-green-200/10 dark:text-green-200">
                        {pro}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {framework.cons.map((con) => (
                      <Badge key={con} variant="secondary" className="bg-red-950 text-red-200 dark:bg-red-200/10 dark:text-red-200">
                        {con}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{framework.bestFor}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedFramework(framework.name)}
                      >
                        View Test
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{framework.name} Test Example</DialogTitle>
                      </DialogHeader>
                      <Tabs defaultValue="code" className="w-full">
                        <TabsList>
                          <TabsTrigger value="code">Test Code</TabsTrigger>
                          <TabsTrigger value="run">Run Test</TabsTrigger>
                        </TabsList>
                        <TabsContent value="code">
                          <CodeBlock code={framework.testCode} language="typescript" />
                        </TabsContent>
                        <TabsContent value="run">
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              To run this test, execute the following command in your terminal:
                            </p>
                            <CodeBlock 
                              code={`npm run test:${framework.name.toLowerCase()}`} 
                              language="bash" 
                            />
                            <div className="mt-4 p-4 bg-muted rounded-md">
                              <h4 className="font-semibold mb-2">Requirements:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Ensure the development server is running (npm run dev)</li>
                                <li>Have the required testing dependencies installed</li>
                                {framework.name === "Selenium" && (
                                  <li>WebDriver for your preferred browser must be installed</li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}