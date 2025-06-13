import { expect, Locator, Page } from "@playwright/test";
import { data } from "../testData/userData";

export class ReviewPage {
    page: Page;
    application: Locator;
    submitButton: Locator;
    continueApplication: Locator;
    firstName: Locator;
    knowYouList: Locator;
    locatorToValidate: Locator;
    extraCurricularActivities: Locator;
    highSchoolInfo: Locator;
    essay: Locator;
    constructor(page: Page) {
        this.page = page;
        this.application = page.getByRole('tab', { name: 'Application' });
        this.submitButton = page.getByRole('button', { name: 'Submit' })
        this.continueApplication = page.getByRole('link', { name: 'Continue Application' })
        this.knowYouList = page.getByRole('button', { name: '1.Lets get to know you!' })
        this.extraCurricularActivities = page.getByRole('button', { name: '2.Extracurricular Activities' })
        this.highSchoolInfo = page.getByRole('button', { name: '3.High School Information' })
        this.essay = page.getByRole('button', { name: '4.Essay' })

    }
    async checkSubmission() {
        const pageURL = await this.page.url();
        await this.submitApplication();
        await this.page.waitForNavigation();
        await this.goToNewURL(pageURL);
        await expect(await this.submitButton).toBeDisabled();
        await expect(this.page.getByText('Edit').first()).not.toBeVisible();
    }
    
    async reviewFilledDetails(firstName, lastName, email: string, streetAddress, additionalStreetAddress, state, city, zipCode, country, activity_1, yrInvolved, role, discription, activity_2, activity_3, activity_4, shighschoolName, hsStreetAddress, additionalAddress, hsCity, hsState, gpa, yearGraduation, essayWritten, eassyAboutAnimal, eassyAboutSchool) {
        await this.application.click();
        await this.knowYouList.click();
        await this.expectFieldValue("First Name", firstName);
        await this.expectFieldValue("Last Name", lastName);
        await this.expectFieldValue("Email Address", email);
        await this.expectFieldValue("Street Address", streetAddress);
        await this.expectFieldValue("Additional Street Address", additionalStreetAddress);
        await this.expectFieldValue("State (Full)", state);
        await this.expectFieldValue("City", city);
        await this.expectFieldValue("Zip Code", zipCode);
        await this.expectFieldValue("Country", country);
        await this.knowYouList.click();
        //----Extra
        await this.extraCurricularActivities.click();
        await this.clickActivityLocator(activity_1);
        await this.expectFieldValueExtraCurricularActivity(activity_1, "Extracurricular Activity Name", activity_1);
        await this.expectFieldValueExtraCurricularActivity(activity_1, "Total Number of Years Involved", yrInvolved);
        await this.expectFieldValueExtraCurricularActivity(activity_1, "List any leadership roles, offices, honors and recognitions related to this activity  ", role);
        await this.expectFieldValueExtraCurricularActivity(activity_1, "Description of Involvement", discription);
        await this.clickActivityLocator(activity_1);
        await this.clickActivityLocator(activity_2);
        await this.expectFieldValueExtraCurricularActivity(activity_2, "Extracurricular Activity Name", activity_2);
        await this.expectFieldValueExtraCurricularActivity(activity_2, "Total Number of Years Involved", yrInvolved);
        await this.expectFieldValueExtraCurricularActivity(activity_2, "List any leadership roles, offices, honors and recognitions related to this activity  ", role);
        await this.expectFieldValueExtraCurricularActivity(activity_2, "Description of Involvement", discription);
        await this.clickActivityLocator(activity_2);
        await this.clickActivityLocator(activity_3);
        await this.expectFieldValueExtraCurricularActivity(activity_3, "Extracurricular Activity Name", activity_3);
        await this.expectFieldValueExtraCurricularActivity(activity_3, "Total Number of Years Involved", yrInvolved);
        await this.expectFieldValueExtraCurricularActivity(activity_3, "List any leadership roles, offices, honors and recognitions related to this activity  ", role);
        await this.expectFieldValueExtraCurricularActivity(activity_3, "Description of Involvement", discription);
        await this.clickActivityLocator(activity_3);
        await this.clickActivityLocator(activity_4);
        await this.expectFieldValueExtraCurricularActivity(activity_4, "Extracurricular Activity Name", activity_4);
        await this.expectFieldValueExtraCurricularActivity(activity_4, "Total Number of Years Involved", yrInvolved);
        await this.expectFieldValueExtraCurricularActivity(activity_4, "List any leadership roles, offices, honors and recognitions related to this activity  ", role);
        await this.expectFieldValueExtraCurricularActivity(activity_4, "Description of Involvement", discription);
        await this.clickActivityLocator(activity_4);
        await this.extraCurricularActivities.click();
        //--high school info
        await this.highSchoolInfo.click();
        await this.expectFieldValue("High School Name", shighschoolName);
        await this.expectFieldValue("High School Street Address", hsStreetAddress);
        await this.expectFieldValue("Additional High School Street Address", additionalAddress);
        await this.expectFieldValue("High School City", hsCity);
        await this.expectFieldValue("High School State (Full)", hsState);
        await this.expectFieldValue("High School Zip Code", zipCode);
        await this.expectFieldValue("GPA", gpa);
        await this.expectFieldValue("Year of High School Graduation", yearGraduation);
        await this.expectFieldValue("GPA", gpa);
        await this.highSchoolInfo.click();
        //--essay
        await this.essay.click();
        await this.expectFieldValue("Please select the essay types you want to write about:", essayWritten);
        await this.expectFieldValue("Essay about Animals", eassyAboutAnimal);
        await this.expectFieldValue("Essay about School", eassyAboutSchool);
        await this.essay.click();
    }



    async goto(link: string) {
        await this.page.goto(link);
        await this.page.waitForLoadState("load");
    }

    async clickActivityLocator(activity: string) {
        try {
            await this.page.getByRole('button', { name: activity }).click({ timeout: 2000 });
        } catch (error) {
            console.log(error);
        }
    }
    async expectFieldValue(str: string, expectedStr: string) {
        try {
            await expect(await this.page.locator("//p[text()='" + str + "']/following-sibling::p")).toContainText(expectedStr);
        } catch (error) {
            console.log(error);
        }
    }
    async expectFieldValueExtraCurricularActivity(activity: string, str: string, expectedStr: string) {
        try {
            await expect(await this.page.locator("//*[text()='" + activity + "']/parent::*/parent::*/following-sibling::*//*[text()='" + str + "']/following-sibling::*")).toContainText(expectedStr);
        } catch (error) {
            console.log(error);
        }
    }
    async submitApplication() {
        await this.submitButton.click();
        await this.page.waitForTimeout(5000);
    }
    async goToNewURL(url: string) {
        await this.page.goto(url, { timeout: 5000 });
    }

}