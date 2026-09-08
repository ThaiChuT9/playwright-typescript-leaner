import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import loginUser2 from '../test_data/loginUser2.json';

loginUser2.forEach((data) => {
    if(!data.run) {
        test.skip(`Skipping test for ${data.username} as run is set to false`, async ({page}) => {});
    }
    test(`Login Test for ${data.username}`, async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(data.username, data.password);
        if(data.expected == "success") {
            await expect(page).toHaveTitle(/Swag Labs/);
            await expect(page).toHaveURL(/inventory.html/);
        } else {
            await expect(page).toHaveURL('https://www.saucedemo.com/');
            await expect(loginPage.errorMessage).toBeVisible();
        }
    });

});