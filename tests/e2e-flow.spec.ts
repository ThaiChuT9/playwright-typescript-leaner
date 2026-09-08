import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import User from '../test_data/User.json';

test.describe('flow to cart', () => {
    test('user login and add item', async ({page}) =>{
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await test.step('go to login', async()=>{
            await loginPage.gotoLoginPage();
        });

        await test.step('login with valid user', async() =>{
            await loginPage.login(
                User.validUser.username,
                User.validUser.password
            );
            await expect(page).toHaveURL(/inventory.html/);
            await expect(inventoryPage.pageTitle).toHaveText('Products');
        });

        await test.step('add 1 item', async()=> {
            await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
            await expect(inventoryPage.shoppingCart).toHaveText('1');
        });

        await test.step('view cart', async()=>{
            await inventoryPage.openCart();
            await expect(page).toHaveURL(/cart.html/);
            await expect(page.locator('.title')).toHaveText('Your Cart');
        });
    });
});