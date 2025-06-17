import { Locator, Page } from "@playwright/test";

export class UserDetailsPage {
    page: Page;
    streetAddress: Locator;
    additionStreetAddress: Locator
    state: Locator;
    city: Locator;
    zipCode: Locator;
    country: Locator;
    nextPage: Locator;
    role: Locator;
    constructor(page: Page) {
        this.streetAddress = page.getByRole('textbox', { name: 'Street Address', exact: true })
        this.additionStreetAddress = page.getByRole('textbox', { name: 'Additional Street Address' })
        this.state = page.getByRole('textbox', { name: 'State (Full)' })
        this.role = page.locator("//div[@role='option']")
        this.city = page.getByRole('textbox', { name: 'City' })
        this.zipCode = page.getByRole('textbox', { name: 'Zip Code' })
        this.country = page.getByRole('textbox', { name: 'Country' })
        this.nextPage = page.getByRole('button', { name: 'Next Page' })
    }

    async goto(link: string) {
        await this.page.goto(link);
        await this.page.waitForLoadState("load");
    }

    async fillUserDetails(data: any) {
        try {
            await this.streetAddress.fill(data.streetAddress);
            await this.additionStreetAddress.fill(data.additionalStreetAddress);
            await this.state.click();
            await this.role.locator("//*[text()='" + data.state + "']").click();
            await this.city.fill(data.city);
            await this.zipCode.fill(data.zipCode);
            await this.country.click();
            await this.role.locator("//*[text()='" + data.country + "']").click();
            try {
                await this.nextPage.click();
            }
            catch (error) {
                if (await this.page.getByText('Failed to save').isVisible({ timeout: 3000 })) {
                    await this.page.reload();
                    await this.nextPage.click();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}