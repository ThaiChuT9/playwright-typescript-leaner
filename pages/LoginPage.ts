import {Page, Locator} from '@playwright/test';


export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('username');
        this.passwordInput = page.getByPlaceholder('password');
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async gotoLoginPage()  {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    
}