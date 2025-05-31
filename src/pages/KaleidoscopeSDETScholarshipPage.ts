import { Locator, Page } from "@playwright/test";

export class KaleidoscopeSDETScholarshipPage{
    page:Page;
    loginButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.loginButton=page.getByRole('button', { name: 'Log In to Apply' })
    }

    async gotoRegistrationPage(){
        await this.loginButton.click();
    }
}