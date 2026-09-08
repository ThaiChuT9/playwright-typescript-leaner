import { test, expect } from "@playwright/test"
import { readData } from "../utils/dataReader";
import { LoginPage } from "../pages/LoginPage";

const loginCSV = readData("test_data/LoginData.csv");
const loginXlsx = readData("test_data/loginData.xlsx", "Sheet1");
const loginJson = readData("test_data/loginUser2.json");

test.describe("Login Tests - Unified Data Reader", () => {
    [
        { data: loginCSV, type: "CSV" },
        { data: loginXlsx, type: "XLSX" },
        { data: loginJson, type: "JSON" }
    ].forEach(({ data, type }) => {
        data.forEach((data: any) => {
            test(`Login Test for ${data.username} using ${type}`, async ({ page }) => {
                const shouldRun = data.run === true || data.run === "true";
                test.skip(!shouldRun, `Skipping test for ${data.username} as run is set to false`);
                const loginPage = new LoginPage(page);
                await test.step('Go to login page', async () => {
                    await loginPage.gotoLoginPage();
                });
                await test.step('Login with ' + data.username + ' and ' + data.password, async () => {
                    await loginPage.login(data.username, data.password);
                });
                await test.step('Verify Login', async () => {
                    if (data.expected == "success") {
                        await expect(page).toHaveTitle(/Swag Labs/);
                        await expect(page).toHaveURL(/inventory.html/);
                    } else {
                        await expect(page).toHaveURL('https://www.saucedemo.com/');
                        await expect(loginPage.errorMessage).toBeVisible();
                    }
                })
            });
        });
    });
});
