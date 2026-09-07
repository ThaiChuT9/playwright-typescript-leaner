import {test, expect} from '@playwright/test';

test("Login Test", async ({page}) => {
    await page.goto('https://www.saucedemo.com/');

    // Add login logic here
    const usernameInput = page.locator('[data-test="username"]');
    const passwordInput = page.locator('[data-test="password"]');
    const loginButton = page.locator('[data-test="login-button"]');

    await usernameInput.fill('standard_user');
    await passwordInput.fill('secret_sauce');
    await loginButton.click();

    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page).toHaveURL(/inventory.html/);
});

test("Login Test with Invalid Credentials", async ({page}) => {
    await page.goto('https://www.saucedemo.com/');

    // Add login logic here
    const usernameInput = page.locator('[data-test="username"]');
    const passwordInput = page.locator('[data-test="password"]');
    const loginButton = page.locator('[data-test="login-button"]');

    await usernameInput.fill('invalid_user');
    await passwordInput.fill('invalid_password');
    await loginButton.click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
});