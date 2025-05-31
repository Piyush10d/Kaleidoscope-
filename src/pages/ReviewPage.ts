import { Locator, Page } from "@playwright/test";

export class ReviewPage{
    page:Page;
    application:Locator;
    submitButton:Locator;
    continueApplication:Locator;
    constructor(page:Page){
        this.page=page;
        this.application=page.getByRole('tab', { name: 'Application' });
        this.submitButton=page.getByRole('button', { name: 'Submit' })
        this.continueApplication=page.getByRole('link', { name: 'Continue Application' })
    }
    async reviewApplicaton(){
        await this.application.click();
    }
    async submitApplication(){
        await this.submitButton.click();
        await this.page.waitForTimeout(5000);
    }
    async goToNewURL(url:string){
        await this.page.goto(url,{timeout:5000});
        //await this.page.waitForTimeout(5000);
    }
    
}