import { expect, Locator, Page } from "@playwright/test";
import { data } from "../testData/userData";

export class EassyPage {
    page: Page;
    car: Locator;
    animal: Locator;
    school: Locator;
    other: Locator;
    eassyAboutCar: Locator;
    eassyAboutAnimals: Locator;
    eassyAboutSchool: Locator;
    eassyAboutOther: Locator;
    save: Locator;
    nextPage: Locator;
    constructor(page: Page) {
        this.page = page;
        this.car = page.getByRole('checkbox', { name: 'Cars' });
        this.animal = page.getByRole('checkbox', { name: 'Animals' });
        this.school = page.getByRole('checkbox', { name: 'School' });
        this.other = page.getByRole('checkbox', { name: 'Other' });
        this.eassyAboutCar = page.getByRole('textbox', { name: 'Essay about Cars' })
        this.eassyAboutAnimals = page.getByRole('textbox', { name: 'Essay about Animals' })
        this.eassyAboutSchool = page.getByRole('textbox', { name: 'Essay about School' })
        this.eassyAboutOther = page.getByRole('textbox', { name: 'Provide an essay about any' })
        this.save = page.getByRole('button', { name: 'Save' })
        this.nextPage = page.getByRole('button', { name: 'Next Page' })
    }

    async fillEassy(eassyAboutAnimal,eassyAboutSchool) {
        await this.car.check();
        await expect(await this.eassyAboutCar).toBeVisible();
        await this.car.uncheck();
        await this.animal.check();
        await expect(await this.eassyAboutAnimals).toBeVisible();
        await this.animal.uncheck();
        await this.school.check();
        await expect(await this.eassyAboutSchool).toBeVisible();
        await this.school.uncheck();
        await this.other.check();
        await expect(await this.eassyAboutOther).toBeVisible();
        await this.other.uncheck();
        await this.animal.check();
        await this.eassyAboutAnimals.fill(eassyAboutAnimal);
        await this.school.check();
        await this.eassyAboutSchool.fill(eassyAboutSchool);
        await this.nextPage.click({ timeout: 2000 });
    }
    async goto(link: string) {
        await this.page.goto(link);
        await this.page.waitForLoadState("load");
    }
}
