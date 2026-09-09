import { Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly shoppingCart: Locator;
    readonly productItems: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.shoppingCart = page.locator('.shopping_cart_link');
        this.productItems = page.locator('[data-test="inventory-item"]');
    }

    async addItemToCart(productName: string): Promise<void> {
        const productItem = this.productItems.filter({ hasText: productName });
        await productItem.getByRole('button', { name: 'Add to cart' }).click();
    }

    async openCart(): Promise<void> {
        await this.page.locator('.shopping_cart_link').click();
    }


}