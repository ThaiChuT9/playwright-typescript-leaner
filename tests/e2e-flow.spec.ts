import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckOutPage } from '../pages/CheckOutPage';
import { CartPage } from '../pages/CartPage';
import User from '../test_data/User.json';

test.describe('flow to checkout', () => {
    test('user login, add an item and checkout', async ({page}) =>{
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkOutPage = new CheckOutPage(page);

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

        await test.step('verify cart item', async()=>{
            await expect(cartPage.cartItems).toHaveCount(1);
            const cartItem = cartPage.cartItems.first();
            const productDescription =
                'Get your testing superhero on with the Sauce Labs bolt T-shirt.';
            await expect(cartItem.getByRole('link', { name: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
            await expect(cartItem).toContainText('$15.99');
            await expect(cartItem).toContainText(productDescription);
        });

        await test.step('proceed to checkout', async()=>{
            await checkOutPage.proceedToCheckout();
            await expect(page).toHaveURL(/checkout-step-one.html/);
            await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
        });

        await test.step('fill checkout form', async()=>{
            await checkOutPage.fillCheckoutForm(
                User.validUser.firstname,
                User.validUser.lastname,
                User.validUser.zip
            );
        });

        await test.step('checkout overview', async()=>{
            await expect(page).toHaveURL(/checkout-step-two.html/);
            await expect(page.locator('.title')).toHaveText('Checkout: Overview');
            await expect(page.locator('.cart_item')).toHaveCount(1);
            await expect(cartPage.cartItems).toHaveCount(1);
        });

        await test.step('finish checkout', async()=>{
            await checkOutPage.finishCheckout();
            await expect(page).toHaveURL(/checkout-complete.html/);
            await expect(checkOutPage.orderConfirmation).toHaveText('Thank you for your order!');
        });
    });
});