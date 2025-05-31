import { Locator, Page } from "@playwright/test";

export class EassyPage{
    page:Page;
    car:Locator;
    animal:Locator;
    school:Locator;
    other:Locator;
    eassyAboutCar:Locator;
    eassyAboutAnimals:Locator;
    eassyAboutSchool:Locator;
    eassyAboutOther:Locator;
    save:Locator;
    nextPage:Locator;
    constructor(page:Page){
        this.page=page;
        this.car=page.getByRole('checkbox', { name: 'Cars' });
        this.animal=page.getByRole('checkbox', { name: 'Animals' });
        this.school=page.getByRole('checkbox', { name: 'School' });
        this.other=page.getByRole('checkbox', { name: 'Other' });
        this.eassyAboutCar=page.getByRole('textbox', { name: 'Essay about Cars' })
        this.eassyAboutAnimals=page.getByRole('textbox', { name: 'Essay about Animals' })
        this.eassyAboutSchool=page.getByRole('textbox', { name: 'Essay about School' })
        this.eassyAboutOther=page.getByRole('textbox', { name: 'Provide an essay about any' })
        this.save=page.getByRole('button', { name: 'Save' })
        this.nextPage=page.getByRole('button', { name: 'Next Page' })
    }
}
