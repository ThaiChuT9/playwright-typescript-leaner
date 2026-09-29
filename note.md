#CSS selector:
1. Select by id: await page.locator('#username').fill('username');
2. Select by attribute: await page.locator('input[attribute="value"]').click();
3. Select by class: await page.locator('.cart_item').click();

#Xpath selector
1. Match by tag and id: await page.locator('xpath=//input[@id="username"]').fill('username');
2. Partical text match: await page.locator('xpath=//h3[contains(text(), 'item name')]').click();
