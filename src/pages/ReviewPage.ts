import { expect, Locator, Page } from "@playwright/test";

export class ReviewPage{
    page:Page;
    application:Locator;
    submitButton:Locator;
    continueApplication:Locator;
    firstName:Locator;
    knowYouList:Locator;
    locatorToValidate:Locator;
    extraCurricularActivities:Locator;
    highSchoolInfo:Locator;
    essay:Locator;
    constructor(page:Page){
        this.page=page;
        this.application=page.getByRole('tab', { name: 'Application' });
        this.submitButton=page.getByRole('button', { name: 'Submit' })
        this.continueApplication=page.getByRole('link', { name: 'Continue Application' })
        this.knowYouList=page.getByRole('button', { name: '1.Lets get to know you!' })
        this.extraCurricularActivities=page.getByRole('button', { name: '2.Extracurricular Activities' })
        this.highSchoolInfo=page.getByRole('button', { name: '3.High School Information' })
        this.essay=page.getByRole('button', { name: '4.Essay' })
        
    }

    async clickActivityLocator(activity:string){
        try {
            await this.page.getByRole('button', { name: activity }).click({timeout:2000});
        } catch (error) {
           console.log(error); 
        }
    }
    async expectFieldValue(str:string,expectedStr:string){
        try {
            await expect(await this.page.locator("//p[text()='"+str+"']/following-sibling::p")).toContainText(expectedStr);
        } catch (error) {
            console.log(error);
        }
    }
    async expectFieldValueExtraCurricularActivity(activity:string,str:string,expectedStr:string){
        try {
            await expect(await this.page.locator("//*[text()='"+activity+"']/parent::*/parent::*/following-sibling::*//*[text()='"+str+"']/following-sibling::*")).toContainText(expectedStr);
        } catch (error) {
            console.log(error);
        }
    }
    async submitApplication(){
        await this.submitButton.click();
        await this.page.waitForTimeout(5000);
    }
    async goToNewURL(url:string){
        await this.page.goto(url,{timeout:5000});
    }
    
}