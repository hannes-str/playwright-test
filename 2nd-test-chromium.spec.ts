import { chromium, Browser, Page } from "playwright";

(async () => {
  let browser: Browser;
  let page: Page;

  try {
    // Launch the browser
    browser = await chromium.launch();

    // Create a new page
    page = await browser.newPage();

    // Navigate to the local file 2nd.html
    await page.goto(`file://${__dirname}/2nd.html`);

    // Type the search term "Chromium" in the input box and trigger the input event
    const searchTerm = "Chromium";
    await page.fill("#searchInput", searchTerm);

    // Wait for the search to take effect
    await page.waitForTimeout(500); // Adjust the wait time based on the animation and any debounce or throttle applied to the search.

    // Check if the fact containing 'Chromium' is visible
    const factContainingChromium = await page.waitForSelector(`.fact:has-text("${searchTerm}")`);
    if (factContainingChromium) {
      console.log(`Test passed! Found a fact containing '${searchTerm}'.`);
    } else {
      console.error(`Test failed! Did not find a fact containing '${searchTerm}'.`);
    }
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  } finally {
    // Close the browser
    if (browser) {
      await browser.close();
    }
  }
})();

