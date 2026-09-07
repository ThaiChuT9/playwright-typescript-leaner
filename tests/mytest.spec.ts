import {test, expect} from '@playwright/test';

test('Don Toliver', async ({page}) => {
    await page.goto('https://youtube.com/');
    // accecpt cookies
    const acceptButton = page.getByRole('button', {name: /accept|chấp nhận/i});
    if (await acceptButton.isVisible({timeout: 2000})) {
        await acceptButton.click();
    }

    const searchInput = page.locator('input[name = "search_query"]');
    await searchInput.fill('Don Toliver');
    await searchInput.press('Enter');

    await expect(page).toHaveURL(/search_query=Don\+Toliver/);
    await expect(page.getByRole('heading', {name: /Don Toliver/i }).first()).toBeVisible();
});