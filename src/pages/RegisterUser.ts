import { Locator, Page } from "@playwright/test"

export class RegisterUser{
    page:Page;
    emailAddress:Locator;
    nextButton:Locator;
    firstName:Locator;
    lastName:Locator;
    mobileNumber:Locator;
    createPassword:Locator;
    confirmCheckbox:Locator;
    submitButton:Locator;
    
    constructor(page:Page){
        this.page=page;
        this.emailAddress= page.getByRole('textbox', { name: 'Email Address' })
        this.nextButton= page.getByRole('button', { name: 'Next' })
        this.firstName= page.getByRole('textbox', { name: 'First Name' })
        this.lastName= page.getByRole('textbox', { name: 'Last Name' })
        this.mobileNumber=page.getByRole('textbox', { name: '1 (702) 123-' })
        this.createPassword=page.getByRole('textbox', { name: 'Create a Password' })
        this.confirmCheckbox= page.getByRole('checkbox', { name: 'I confirm that I am at least' })
        this.submitButton=page.getByRole('button', { name: 'Submit' })
    }

    async doRegistration(){
        try {
            await this.page.waitForLoadState("domcontentloaded");
            await this.page.waitForTimeout(10000);
            var randomnumber = Math.floor(Math.random() * (99999999 - 999999) + 999999);
            var emailString= "piyush"+randomnumber+"@gmail.com";
            var fName="Piyush"+randomnumber;
            var lName="Dhawas"+randomnumber;
            var contactNumber="7276226164"
            var pass="Kaleido@1010d"
            await this.emailAddress.fill(emailString);
            await this.nextButton.click();
            await this.firstName.fill(fName);
            await this.lastName.fill(lName);
            await this.mobileNumber.fill(contactNumber);
            await this.createPassword.fill(pass);
            await this.confirmCheckbox.check();
            await this.submitButton.click();  
        } catch (error) {
            console.log(error)
        }     
    }
}