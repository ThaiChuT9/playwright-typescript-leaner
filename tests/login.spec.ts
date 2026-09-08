import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import loginUser from '../test_data/loginUser.json';

test("Login Test", async ({page}) => {
    await page.goto('https://www.saucedemo.com/');

    // Add login logic here
    const usernameInput = page.locator('[data-test="username"]');
    const passwordInput = page.locator('[data-test="password"]');
    const loginButton = page.locator('[data-test="login-button"]');

    await usernameInput.fill(loginUser.validUser.username);
    await passwordInput.fill(loginUser.validUser.password);
    await loginButton.click();

    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page).toHaveURL(/inventory.html/);
});

test("Login Test with Invalid Credentials", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(
        loginUser.invalidUser.username, 
        loginUser.invalidUser.password
    );
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(/Epic sadface: Sorry, this user has been locked out./);
});

test("Login Test with Empty Username Credentials", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login('', loginUser.invalidUser.password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(/Epic sadface: Username is required/);
});
