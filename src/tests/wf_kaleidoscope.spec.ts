import { expect, test } from './fixture';
import { data } from "../testData/userData"


const email = "test_" + Date.now() + "@gmail.com";
test.describe.configure({ mode: "serial" });


test.describe("END TO END WORKFLOW", async () => {
    test("Register new User", async ({ registerUser }) => {
        await registerUser.launchURL(data.URL);
        await registerUser.doRegistration(email, data.firstName, data.lastName, data.contactNumber, data.password);
    })
    test("Fill User details", async ({ userDetailsPage }) => {
        await userDetailsPage.fillUserDetails(data.streetAddress, data.additionalStreetAddress, data.state, data.city, data.zipCode, data.country);
    })
    test("Fill Extracurricular Activities", async ({ extracurricularActivitiesPage }) => {
        await extracurricularActivitiesPage.fillExtracurricularActivities(data.activity_1, data.yrInvolved, data.role, data.discription);
        await extracurricularActivitiesPage.nextPage.click();
        await expect(await extracurricularActivitiesPage.form_renderer).toContainText(data.expectedText);
        await extracurricularActivitiesPage.fillExtracurricularActivities(data.activity_2, data.yrInvolved, data.role, data.discription);
        await extracurricularActivitiesPage.fillExtracurricularActivities(data.activity_3, data.yrInvolved, data.role, data.discription);
        await extracurricularActivitiesPage.fillExtracurricularActivities(data.activity_4, data.yrInvolved, data.role, data.discription);
        await extracurricularActivitiesPage.page.waitForTimeout(3000);
        await extracurricularActivitiesPage.nextPage.click();
    })

    test("Fill Education Details", async ({ educationDetailsPage }) => {
        await educationDetailsPage.fillEducationalDetails(data.shighschoolName, data.hsStreetAddress, data.additionalAddress, data.hsCity, data.hsState, data.zipCode, data.gpa, data.yearGraduation, data.inputFile);
    })

    test("Check eassy boxes", async ({ eassyPage }) => {
        await eassyPage.car.check();
        await expect(await eassyPage.eassyAboutCar).toBeVisible();
        await eassyPage.car.uncheck();
        await eassyPage.animal.check();
        await expect(await eassyPage.eassyAboutAnimals).toBeVisible();
        await eassyPage.animal.uncheck();
        await eassyPage.school.check();
        await expect(await eassyPage.eassyAboutSchool).toBeVisible();
        await eassyPage.school.uncheck();
        await eassyPage.other.check();
        await expect(await eassyPage.eassyAboutOther).toBeVisible();
        await eassyPage.other.uncheck();
        await eassyPage.animal.check();
        await eassyPage.eassyAboutAnimals.fill(data.eassyAboutAnimal);
        await eassyPage.school.check();
        await eassyPage.eassyAboutSchool.fill(data.eassyAboutSchool);
        await eassyPage.nextPage.click({ timeout: 2000 });

    })


    test("Review page", async ({ reviewPage }) => {
        test.setTimeout(30000 * 3);
        await reviewPage.application.click();
        await reviewPage.knowYouList.click();
        await reviewPage.expectFieldValue("First Name", data.firstName);
        await reviewPage.expectFieldValue("Last Name", data.lastName);
        await reviewPage.expectFieldValue("Email Address", email);
        await reviewPage.expectFieldValue("Street Address", data.streetAddress);
        await reviewPage.expectFieldValue("Additional Street Address", data.additionalStreetAddress);
        await reviewPage.expectFieldValue("State (Full)", data.state);
        await reviewPage.expectFieldValue("City", data.city);
        await reviewPage.expectFieldValue("Zip Code", data.zipCode);
        await reviewPage.expectFieldValue("Country", data.country);
        await reviewPage.knowYouList.click();
        //----Extra
        await reviewPage.extraCurricularActivities.click();
        await reviewPage.clickActivityLocator(data.activity_1);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_1, "Extracurricular Activity Name", data.activity_1);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_1, "Total Number of Years Involved", data.yrInvolved);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_1, "List any leadership roles, offices, honors and recognitions related to this activity  ", data.role);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_1, "Description of Involvement", data.discription);
        await reviewPage.clickActivityLocator(data.activity_1);
        await reviewPage.clickActivityLocator(data.activity_2);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_2, "Extracurricular Activity Name", data.activity_2);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_2, "Total Number of Years Involved", data.yrInvolved);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_2, "List any leadership roles, offices, honors and recognitions related to this activity  ", data.role);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_2, "Description of Involvement", data.discription);
        await reviewPage.clickActivityLocator(data.activity_2);
        await reviewPage.clickActivityLocator(data.activity_3);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_3, "Extracurricular Activity Name", data.activity_3);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_3, "Total Number of Years Involved", data.yrInvolved);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_3, "List any leadership roles, offices, honors and recognitions related to this activity  ", data.role);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_3, "Description of Involvement", data.discription);
        await reviewPage.clickActivityLocator(data.activity_3);
        await reviewPage.clickActivityLocator(data.activity_4);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_4, "Extracurricular Activity Name", data.activity_4);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_4, "Total Number of Years Involved", data.yrInvolved);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_4, "List any leadership roles, offices, honors and recognitions related to this activity  ", data.role);
        await reviewPage.expectFieldValueExtraCurricularActivity(data.activity_4, "Description of Involvement", data.discription);
        await reviewPage.clickActivityLocator(data.activity_4);
        await reviewPage.extraCurricularActivities.click();
        //--high school info
        await reviewPage.highSchoolInfo.click();
        await reviewPage.expectFieldValue("High School Name", data.shighschoolName);
        await reviewPage.expectFieldValue("High School Street Address", data.hsStreetAddress);
        await reviewPage.expectFieldValue("Additional High School Street Address", data.additionalAddress);
        await reviewPage.expectFieldValue("High School City", data.hsCity);
        await reviewPage.expectFieldValue("High School State (Full)", data.hsState);
        await reviewPage.expectFieldValue("High School Zip Code", data.zipCode);
        await reviewPage.expectFieldValue("GPA", data.gpa);
        await reviewPage.expectFieldValue("Year of High School Graduation", data.yearGraduation);
        await reviewPage.expectFieldValue("GPA", data.gpa);
        await reviewPage.highSchoolInfo.click();
        //--essay
        await reviewPage.essay.click();
        await reviewPage.expectFieldValue("Please select the essay types you want to write about:", data.essayWritten);
        await reviewPage.expectFieldValue("Essay about Animals", data.eassyAboutAnimal);
        await reviewPage.expectFieldValue("Essay about School", data.eassyAboutSchool);
        await reviewPage.essay.click();

    })

    test("Submit Application", async ({page ,reviewPage }) => {
        const pageURL = await page.url();
        await reviewPage.submitApplication();
        await page.waitForNavigation();
        await reviewPage.goToNewURL(pageURL);
        await expect(await reviewPage.submitButton).toBeDisabled();
        await expect(reviewPage.page.getByText('Edit').first()).not.toBeVisible();

    })

})
