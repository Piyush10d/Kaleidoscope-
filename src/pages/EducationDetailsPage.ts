import { Locator, Page } from "@playwright/test";
import path from 'path';


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


    async goto(link:string){
        await this.page.goto(link);
        await this.page.waitForLoadState("load");
    }
    
    async fillEducationalDetails(data:any) {
        try {
            await this.highSchoolName.fill(data.shighschoolName);
            await this.highSchoolStreet.fill(data.hsStreetAddress);
            await this.additionalHighScoolStreet.fill(data.additionalAddress);
            await this.highSchoolCity.fill(data.hsCity);
            await this.highSchoolState.click();
            await this.role.locator("//*[text()='" + data.hsState + "']").click();
            await this.zipCode.fill(data.zipCode);
            await this.gpa.fill(data.gpa);
            await this.yearGraduation.fill(data.yearGraduation);
            const [upload] = await Promise.all([
                this.page.waitForEvent("filechooser"),
                this.uploadFile.click()
            ])
            await upload.setFiles([process.cwd()+ "//src//testData//My School Transcript.pdf"])
            await this.page.waitForSelector("//span[text()='" + data.inputFile + "']");
            await this.nextPage.click();
            try {
                await this.page.waitForTimeout(5000);
                await this.nextPage.click();
            } catch (error) {
                console.log("click next page")
            }
            console.log("Education Details filled successfully");
        } catch (error) {
            console.log(error);
        }

    }
}