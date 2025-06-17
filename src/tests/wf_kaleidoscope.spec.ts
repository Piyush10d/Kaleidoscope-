import { expect, test } from './fixture';
import { data } from "../testData/userData"
const email = "test_" + Date.now() + "@gmail.com";

test.describe.serial("KALEIDOSCOPE SCHOLARSHIP FORM SUBMISSION", async () => {
    test("TO VALIDATE SCHOLARSHIP FORM WITH NEW USER REGISTRATION", async ({ registerUser, userDetailsPage, extracurricularActivitiesPage, educationDetailsPage, eassyPage, reviewPage }) => {

        await test.step("Register new User", async () => {
            await registerUser.launchURL(data);
            await registerUser.doRegistration(email, data);
        })

        await test.step("Fill User details", async () => {
            await userDetailsPage.fillUserDetails(data);
        })

        await test.step("Fill Extracurricular Activities", async () => {
            await extracurricularActivitiesPage.extracurricularActivities(data)
        })

        await test.step("Fill Education Details", async () => {
            await educationDetailsPage.fillEducationalDetails(data);
        })

        await test.step("Check and fill eassy", async () => {
            await eassyPage.fillEassy(data);
        })

        await test.step("Review user details", async () => {
            await reviewPage.reviewFilledDetails(data, email);

        })

        await test.step("Submit Application", async () => {
            await reviewPage.checkSubmission();
        })
    })
})
