import { chromium, Locator, Page } from "@playwright/test"

export class RegisterUser {
    page: Page;
    emailAddress: Locator;
    nextButton: Locator;
    firstName: Locator;
    lastName: Locator;
    mobileNumber: Locator;
    createPassword: Locator;
    confirmCheckbox: Locator;
    submitButton: Locator;
    enterPassword: Locator;
    signIn: Locator;
    logIn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailAddress = page.getByRole('textbox', { name: 'Email Address' })
        this.nextButton = page.getByRole('button', { name: 'Next' })
        this.firstName = page.getByRole('textbox', { name: 'First Name' })
        this.lastName = page.getByRole('textbox', { name: 'Last Name' })
        this.mobileNumber = page.getByRole('textbox', { name: '1 (702) 123-' })
        this.createPassword = page.getByRole('textbox', { name: 'Create a Password' })
        this.confirmCheckbox = page.getByRole('checkbox', { name: 'I confirm that I am at least' })
        this.submitButton = page.getByRole('button', { name: 'Submit' })
        this.enterPassword = page.getByRole('textbox', { name: 'Enter Your Password' })
        this.signIn = page.getByRole('button', { name: 'Sign In' })
        this.logIn = page.getByRole('button', { name: 'Log In to Apply' })
    }

    async goto(link:string){
        await this.page.goto(link);
        await this.page.waitForLoadState("load");
    }

    async launchURL(url: string) {
        try {
            // var newpage;
            //const browser = await chromium.launch({ headless: false });
            //const context = await browser.newContext();
            //this.page = await context.newPage();
            await this.page.goto(url);
            await this.logIn.click();
            //newpage = this.page;
        } catch (error) {
            console.log(error);
        }

    }
    async doRegistration(email: string, firstName: string, lastName: string, contactNumber: string, password: string) {
        try {
            await this.page.waitForLoadState("domcontentloaded");
            await this.emailAddress.fill(email);
            await this.nextButton.click();
            if (await this.enterPassword.isVisible()) {
                await this.enterPassword.fill(password);
                await this.signIn.click();
                await this.page.waitForLoadState("domcontentloaded");
            }
            else {
                await this.firstName.fill(firstName);
                await this.lastName.fill(lastName);
                await this.page.waitForLoadState("domcontentloaded");
                await this.mobileNumber.fill(contactNumber);
                await this.createPassword.fill(password);
                await this.confirmCheckbox.check();
                await this.submitButton.click();
                await this.page.waitForLoadState("domcontentloaded");
            }
            console.log("User successfully Registerd with emailID : " + email);

        } catch (error) {
            console.log(error)
        }
    }
}