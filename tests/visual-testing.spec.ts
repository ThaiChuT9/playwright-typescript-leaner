import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import loginUser from '../test_data/loginUser.json';

test.describe('visual testing', () => {
    test('login page visual testing', async({page})=> {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveScreenshot('login-page.png', {
            fullPage: true,
        });
        console.log("Screenshot saved successfully!");
    })

    // Visual test of a specific element
    test('element visual testing', async({page})=> {
        await page.goto('https://www.saucedemo.com/');
        const element = page.locator('.login_logo');
        await expect(element).toHaveScreenshot('element-visual-testing.png');
        console.log("Element screenshot saved successfully!");
    })

    //Masking sensitive infor in screenshots
    test('Masking sensitive infor', async({page})=> {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await expect(page).toHaveScreenshot('login-page.png', {
            fullPage: true,
            mask: [loginPage.usernameInput, loginPage.passwordInput]
        });
        console.log("Screenshot saved successfully!");
    })
})