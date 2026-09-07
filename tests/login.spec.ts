import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';

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
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login('invalid_user', 'invalid_password');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    loginPage.getErrorMessage();
});