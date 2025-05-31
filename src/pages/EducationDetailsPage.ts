import { Locator, Page } from "@playwright/test";

export class EducationDetailsPage {
    page: Page;
    highSchoolName: Locator;
    highSchoolStreet: Locator;
    additionalHighScoolStreet: Locator;
    highSchoolCity: Locator;
    highSchoolState: Locator;
    zipCode: Locator;
    gpa: Locator;
    yearGraduation: Locator;
    uploadFile: Locator;
    save: Locator;
    nextPage: Locator;
    role: Locator;

    constructor(page: Page) {
        this.page = page;
        this.highSchoolName = page.getByRole('textbox', { name: 'High School Name' })
        this.highSchoolStreet = page.getByRole('textbox', { name: 'High School Street Address', exact: true })
        this.additionalHighScoolStreet = page.getByRole('textbox', { name: 'Additional High School Street' })
        this.highSchoolCity = page.getByRole('textbox', { name: 'High School City' })
        this.highSchoolState = page.getByRole('textbox', { name: 'High School State (Full)' })
        this.role = page.locator("//div[@role='option']");
        this.zipCode = page.getByRole('textbox', { name: 'High School Zip Code' })
        this.gpa = page.getByRole('textbox', { name: 'GPA' });
        this.yearGraduation = page.getByRole('textbox', { name: 'Year of High School Graduation' })
        this.uploadFile = page.getByRole('button', { name: 'Upload File' })
        this.save = page.getByRole('button', { name: 'Save' })
        this.nextPage = page.getByRole('button', { name: 'Next Page' })

    }
    async fillEducationalDetails(shighschoolName: string, hsStreetAddress: string, additionalAddress: string, hsCity: string, hsState: string, zipCode: string, gpa: string, yearGraduation: string, inputFile: string) {
        var shighschoolName = "Shivaji Science Arts junior college"
        var hsStreetAddress = "Anandwan square"
        var additionalAddress = "Tilak ward"
        var hsCity = "Warora"
        var hsState = "Maine"
        var zipCode = "422907"
        var gpa = "8"
        var yearGraduation = "2012"
        var inputFile = "My School Transcript.pdf"
        await this.highSchoolName.fill(shighschoolName);
        await this.highSchoolStreet.fill(hsStreetAddress);
        await this.additionalHighScoolStreet.fill(additionalAddress);
        await this.highSchoolCity.fill(hsCity);
        await this.highSchoolState.click();
        await this.role.locator("//*[text()='" + hsState + "']").click();
        //await this.highSchoolState.fill(hsState);
        await this.zipCode.fill(zipCode);
        await this.gpa.fill(gpa);
        await this.yearGraduation.fill(yearGraduation);
        const [upload] = await Promise.all([
            this.page.waitForEvent("filechooser"),
            this.uploadFile.click()
        ])
        await upload.setFiles(["C://Kaleidoscope//my School Transcript.pdf"])
        //await this.uploadFile.click();
        //await this.uploadFile.setInputFiles(inputFile);
        //await this.save.click()
        await this.page.waitForTimeout(10000);
        await this.nextPage.click();
    }
}




// await page.getByRole('textbox', { name: 'High School Name' }).click();
//   await page.getByRole('textbox', { name: 'High School Name' }).fill('Shivaji Science Arts junior college');
//   await page.getByRole('textbox', { name: 'High School Street Address', exact: true }).click();
//   await page.getByRole('textbox', { name: 'High School Street Address', exact: true }).fill('Anandwan square ');
//   await page.goto('https://apply.mykaleidoscope.com/program/a0DTP00000H3PUy2AN/applicant/application/a0ETP0000098bbW2AQ/page/d61ea0fe-5552-41f0-9de7-e358e7f82552');
//   await page.getByRole('textbox', { name: 'Additional High School Street' }).click();
//   await page.getByRole('textbox', { name: 'Additional High School Street' }).fill('Tilak ward');
//   await page.getByRole('textbox', { name: 'High School City' }).click();
//   await page.getByRole('textbox', { name: 'High School City' }).fill('Warora');
//   await page.getByRole('textbox', { name: 'High School State (Full)' }).click();
//   await page.getByRole('textbox', { name: 'High School State (Full)' }).fill('Ma');
//   await page.getByText('Maine').click();
//   await page.getByRole('textbox', { name: 'High School State (Full)' }).press('Tab');
//   await page.getByRole('textbox', { name: 'High School Zip Code' }).fill('422907');
//   await page.getByRole('textbox', { name: 'High School Zip Code' }).press('Tab');
//   await page.getByRole('textbox', { name: 'GPA' }).fill('8');
//   await page.getByRole('textbox', { name: 'GPA' }).press('Tab');
//   await page.getByRole('button').filter({ hasText: /^$/ }).first().click(); //check this
//   await page.getByRole('textbox', { name: 'Year of High School Graduation' }).fill('1008');
//   await page.goto('https://apply.mykaleidoscope.com/program/a0DTP00000H3PUy2AN/applicant/application/a0ETP0000098bbW2AQ/page/d61ea0fe-5552-41f0-9de7-e358e7f82552');
//   await page.getByRole('textbox', { name: 'Year of High School Graduation' }).fill('10082012');
//   await page.getByRole('textbox', { name: 'Year of High School Graduation' }).press('Tab');
//   await page.getByRole('button').filter({ hasText: /^$/ }).click();
//   await page.getByRole('textbox', { name: 'Year of High School Graduation' }).click();
//   await page.getByRole('textbox', { name: 'Year of High School Graduation' }).fill('01/07/2012');
//   await page.getByRole('textbox', { name: 'Year of High School Graduation' }).press('Tab');
//   await page.getByRole('button').filter({ hasText: /^$/ }).click();
//   await page.getByRole('textbox', { name: 'Year of High School Graduation' }).click();
//   await page.getByRole('textbox', { name: 'Year of High School Graduation' }).fill('2012');
//   await page.getByRole('textbox', { name: 'Year of High School Graduation' }).press('Tab');
//   await page.getByRole('textbox', { name: 'Year of High School Graduation' }).click();
//   await page.getByRole('button', { name: '6 January 2012', exact: true }).click();
//   await page.getByRole('textbox', { name: 'Year of High School Graduation' }).press('Tab');
//   await page.getByRole('button').filter({ hasText: /^$/ }).click();
//   await page.getByRole('textbox', { name: 'Year of High School Graduation' }).click();
//   await page.getByRole('textbox', { name: 'Year of High School Graduation' }).fill('2012');
//   await page.getByRole('textbox', { name: 'Year of High School Graduation' }).press('Tab');
//   await page.getByRole('button', { name: 'Upload File' }).click();
//   await page.getByRole('button', { name: 'Upload File' }).setInputFiles('My School Transcript.pdf');
//   await page.goto('https://apply.mykaleidoscope.com/program/a0DTP00000H3PUy2AN/applicant/application/a0ETP0000098bbW2AQ/page/d61ea0fe-5552-41f0-9de7-e358e7f82552');
//   await page.getByRole('button', { name: 'Save' }).click();
//   await page.getByRole('button', { name: 'Next Page' }).click();