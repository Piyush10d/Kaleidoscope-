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

    async fillUserDetails(streetAddress: string, additionalStreetAddress: string, state: string, city: string, zipCode: string, country: string) {
        try {
            await this.streetAddress.fill(streetAddress);
            await this.additionStreetAddress.fill(additionalStreetAddress);
            await this.state.click();
            await this.role.locator("//*[text()='" + state + "']").click();
            await this.city.fill(city);
            await this.zipCode.fill(zipCode);
            await this.country.click();
            await this.role.locator("//*[text()='" + country + "']").click();
            await this.nextPage.click();
            if (await this.page.getByText('Failed to save').isVisible({ timeout: 3000 })) {
                await this.page.reload();
                await this.nextPage.click();
            }
            console.log("User Details Filled Successfully");
        } catch (error) {
            console.log(error);
        }
    }
}