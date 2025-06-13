import { expect, Locator, Page } from "@playwright/test";
import {data} from "../testData/userData";

export class ExtracurricularActivitiesPage {
    page: Page;
    addEntry: Locator;
    activityName: Locator;
    yearsInvolved: Locator;
    leadershipRole: Locator;
    description: Locator;
    add: Locator;
    save: Locator;
    nextPage: Locator;
    form_renderer: Locator;
    constructor(page: Page) {
        this.page = page,
            this.addEntry = page.getByRole('button', { name: 'Add Entry' })
        this.activityName = page.getByRole('textbox', { name: 'Extracurricular Activity Name' })
        this.yearsInvolved = page.getByRole('textbox', { name: 'Total Number of Years Involved' })
        this.leadershipRole = page.getByRole('textbox', { name: 'List any leadership roles,' })
        this.description = page.getByRole('textbox', { name: 'Description of Involvement' })
        this.add = page.getByRole('button', { name: 'Add', exact: true })
        this.save = page.getByRole('button', { name: 'Save' });
        this.nextPage = page.getByRole('button', { name: 'Next Page' })
        this.form_renderer = page.locator('#form-renderer')
    }

    async extracurricularActivities(activity_1,yrInvolved,role,discription,expectedText,activity_2,activity_3,activity_4) {
        
        await this.fillExtracurricularActivities(activity_1, yrInvolved, role, discription);
        await this.nextPage.click();
        await expect(await this.form_renderer).toContainText(expectedText);
        await this.fillExtracurricularActivities(activity_2, yrInvolved, role, discription);
        await this.fillExtracurricularActivities(activity_3, yrInvolved, role, discription);
        await this.fillExtracurricularActivities(activity_4, yrInvolved, role, discription);
        await this.page.waitForTimeout(3000);
        await this.nextPage.click();
    }


    async goto(link: string) {
        await this.page.goto(link);
        await this.page.waitForLoadState("load");
    }
    async fillExtracurricularActivities(activity: string, yrInvolved: string, role: string, discription: string) {
        try {
            await this.page.waitForTimeout(2000);
            await this.addEntry.click();
            await this.activityName.fill(activity);
            await this.yearsInvolved.fill(yrInvolved);
            await this.leadershipRole.fill(role);
            await this.description.fill(discription);
            await this.add.click();
            await this.page.waitForLoadState("domcontentloaded");
            //await this.save.click();
            console.log("Extra Cussricular Activity details Filled Successfully for: " + activity);
        } catch (error) {
            console.log(error);
        }
    }


}