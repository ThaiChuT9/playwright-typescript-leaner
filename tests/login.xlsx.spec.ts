import { expect, test } from "@playwright/test";
import { readXlsxFile } from "../utils/xlsxReader";
import { LoginPage } from "../pages/LoginPage";
const loginUser = readXlsxFile("test_data/loginData.xlsx", "Sheet1");

test.describe("Login Driven Test - XLSX", () => {
    for (const data of loginUser as any[]) {
        test(`Login Test for ${data.username}`, async ({page}) =>{
            test.skip(data.run !== 'true', `Skipping test for ${data.username} as run is set to false`);
            
            const loginPage = new LoginPage(page);
            await loginPage.gotoLoginPage();
            await loginPage.login(data.username, data.password);

            if (data.expected == 'success' ){
                await expect(page).toHaveTitle(/Swag Labs/);
                await expect(page).toHaveURL(/inventory.html/);
            } else {
                await expect(page).toHaveURL('https://www.saucedemo.com/');
                await expect(loginPage.errorMessage).toBeVisible();
            }
            
        })
    }
})
