import { Locator, Page } from '@playwright/test';

export class CheckOutPage {
    readonly page: Page;
    readonly checkoutBtn: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueBtn: Locator;
    readonly finishBtn: Locator;
    readonly orderConfirmation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.finishBtn = page.getByRole('button', { name: 'Finish' });
        this.orderConfirmation = page.locator('.complete-header');
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutBtn.click();
    }

    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueBtn.click();
    }

    async finishCheckout(): Promise<void> {
        await this.finishBtn.click();
    }
}