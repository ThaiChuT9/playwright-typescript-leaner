import {expect, test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {readCSV} from "../utils/csvReader";

const loginUser = readCSV("test_data/LoginData.csv");

loginUser.forEach((data: any) => {
    test(`Login Test for ${data.username}`, async ({page}) => {
        test.skip(data.run !== "true", `Skipping test for ${data.username} as run is set to false`);

        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(data.username, data.password);
        if(data.expected === "success") {
            await expect(page).toHaveTitle(/Swag Labs/);
            await expect(page).toHaveURL(/inventory.html/);
        } else {
            await expect(page).toHaveURL('https://www.saucedemo.com/');
            await expect(loginPage.errorMessage).toBeVisible();
        }
    })
});