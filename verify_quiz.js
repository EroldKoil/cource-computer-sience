const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:4200');
    console.log('Page loaded');

    // Wait for content
    await page.waitForSelector('h1');
    const title = await page.textContent('h1');
    console.log('Title:', title);

    // Click on a topic with a quiz (Internet/DNS should have it)
    await page.click('text=Internet');
    await page.click('text=DNS');

    // Wait for Topic Content
    await page.waitForSelector('h2');
    const topicTitle = await page.textContent('h2');
    console.log('Topic Title:', topicTitle);

    // Check for Quiz
    await page.waitForSelector('app-quiz');
    console.log('Quiz component found');

    const quizHeader = await page.textContent('app-quiz h3');
    console.log('Quiz Header:', quizHeader);

    // Select an answer
    const options = await page.$$('app-quiz .option-btn');
    console.log('Number of options:', options.length);
    await options[0].click();
    console.log('First option clicked');

    // Submit (if all answered)
    const submitBtn = await page.$('app-quiz .submit-btn');
    if (await submitBtn.isEnabled()) {
        await submitBtn.click();
        console.log('Quiz submitted');

        await page.waitForSelector('.result-message');
        const result = await page.textContent('.result-message p');
        console.log('Result message:', result);
    } else {
        console.log('Submit button is disabled (need to answer all questions)');
    }

    await page.screenshot({ path: 'quiz_verification.png' });
  } catch (error) {
    console.error('Error during verification:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
