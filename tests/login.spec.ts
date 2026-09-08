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
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/Epic sadface: Username and password do not match any user in this service/);
});

test("Login Test with Empty Username Credentials", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login('', loginUser.invalidUser.password);
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/Epic sadface: Username is required/);
});
