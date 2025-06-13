import { expect, test } from './fixture';
import { data } from "../testData/userData"
const email = "test_" + Date.now() + "@gmail.com";

test.describe.serial("END TO END WORKFLOW", async () => {
    test("New User Registration", async ({ registerUser, userDetailsPage, extracurricularActivitiesPage, educationDetailsPage, eassyPage, reviewPage }) => {
        
        await test.step("Register new User", async () => {
            await registerUser.launchURL(data.URL);
            await registerUser.doRegistration(email, data.firstName, data.lastName, data.contactNumber, data.password);
        })
        
        await test.step("Fill User details", async () => {
            await userDetailsPage.fillUserDetails(data.streetAddress, data.additionalStreetAddress, data.state, data.city, data.zipCode, data.country);
        })
        
        await test.step("Fill Extracurricular Activities", async () => {
            test.setTimeout(30000 * 3);
            await extracurricularActivitiesPage.extracurricularActivities(data.activity_1,data.yrInvolved,data.role,data.discription,data.expectedText,data.activity_2,data.activity_3,data.activity_4)
        })

        await test.step("Fill Education Details", async () => {
            await educationDetailsPage.fillEducationalDetails(data.shighschoolName, data.hsStreetAddress, data.additionalAddress, data.hsCity, data.hsState, data.zipCode, data.gpa, data.yearGraduation, data.inputFile);
        })
        
        await test.step("Check eassy boxes", async () => {
            await eassyPage.fillEassy(data.eassyAboutAnimal,data.eassyAboutSchool);
        })
        
        await test.step("Review page", async () => {
            test.setTimeout(30000 * 3);
            await reviewPage.reviewFilledDetails(data.firstName,data.lastName,email,data.streetAddress,data.additionalStreetAddress,data.state,data.city,data.zipCode,data.country,data.activity_1,data.yrInvolved,data.role,data.discription,data.activity_2,data.activity_3,data.activity_4,data.shighschoolName,data.hsStreetAddress,data.additionalAddress,data.hsCity,data.hsState,data.gpa,data.yearGraduation,data.essayWritten,data.eassyAboutAnimal,data.eassyAboutSchool);
            
        })
        
        await test.step("Submit Application", async () => {
            await reviewPage.checkSubmission();
        })
    })
})
