const { chromium } = require('playwright');
const path = require('path');

async function runTest() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Construct the correct absolute path to your index.html file
  const indexPath = path.join(__dirname, 'index.html');
  await page.goto(`file://${indexPath}`);

  console.log('Test Started');

  // Test Funny Button 1
  await page.click('text="Funny Button 1"');
  console.log('Clicked Funny Button 1');
  await page.waitForTimeout(1000); // Wait for the alert to appear
  await page.keyboard.press('Enter'); // Dismiss the alert

  // Test Funny Button 2
  await page.click('text="Funny Button 2"');
  console.log('Clicked Funny Button 2');
  await page.waitForTimeout(1000); // Wait for the alert to appear
  await page.keyboard.press('Enter'); // Dismiss the alert

  // Test Funny Input Form
  await page.fill('.funny-input', 'This is a funny test input!');
  console.log('Filled Funny Input Form');
  await page.click('text="Submit"');
  console.log('Clicked Submit Button');
  await page.waitForTimeout(1000); // Wait for the alert to appear
  await page.keyboard.press('Enter'); // Dismiss the alert

  console.log('Test Completed');

  await browser.close();
}

runTest();

