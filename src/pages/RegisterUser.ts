import { Locator, Page } from "@playwright/test"

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
    signIn:Locator;

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
        this.signIn=page.getByRole('button', { name: 'Sign In' })
    }

    async doRegistration() {
        try {
            var fName: any;
            await this.page.waitForLoadState("domcontentloaded");
            await this.page.waitForTimeout(10000);
            var randomnumber = Math.floor(Math.random() * (99999999 - 999999) + 999999);
            var emailString = "piyush" + randomnumber + "@gmail.com";
            console.log("New resistered Email id is: "+emailString);
            fName = "Piyush" + randomnumber;
            var lName = "Dhawas" + randomnumber;
            var contactNumber = "7276226164"
            var pass = "Kaleido@1010d"
            await this.emailAddress.fill(emailString);
            await this.nextButton.click();
            if (await this.enterPassword.isVisible()) {
                await this.enterPassword.fill("Apply@1010d");
                await this.signIn.click();
                await this.page.waitForLoadState("domcontentloaded");
            }
            else {
                await this.firstName.fill(fName);
                await this.lastName.fill(lName);
                await this.mobileNumber.fill(contactNumber);
                await this.createPassword.fill(pass);
                await this.confirmCheckbox.check();
                await this.submitButton.click();
                await this.page.waitForLoadState("domcontentloaded");
            }

        } catch (error) {
            console.log(error)
        }
        finally {
            return fName;
        }
    }

}