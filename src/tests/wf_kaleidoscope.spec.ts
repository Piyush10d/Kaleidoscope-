import {test,expect, chromium, Page} from "@playwright/test";
import { Console } from "console";
import { POM_Pages } from "../pages/POM_Pages";
import {data} from "../testData/userData"


var page;
var pom_pages:POM_Pages;
var firstName:string;
var email:string;
test.describe.configure({mode:"serial"});

test.beforeAll(async({})=>{
    const browser= await chromium.launch({headless:false});
    const context= await browser.newContext();
    page         = await context.newPage();
    pom_pages=new POM_Pages(page);
})

test("Register new User",async()=>{
    await page.goto("https://apply.mykaleidoscope.com/program/sdet-test-scholarship");
    await page.getByRole('button', { name: 'Log In to Apply' }).click();
    email="test_" + Date.now() + "@gmail.com";
    await pom_pages.RegisterUser.doRegistration(email,data.firstName,data.lastName,data.contactNumber,data.password);
})

test("Fill User details", async()=>{
    await pom_pages.UserDetailsPage.fillUserDetails(data.streetAddress,data.additionalStreetAddress,data.state,data.city,data.zipCode,data.country);
})

test("Fill Extracurricular Activities",async()=>{
    await pom_pages.ExtracurricularActivitiesPage.fillExtracurricularActivities(data.activity_1,data.yrInvolved,data.role,data.discription);
    await pom_pages.ExtracurricularActivitiesPage.nextPage.click();
    await expect(await pom_pages.ExtracurricularActivitiesPage.form_renderer).toContainText(data.expectedText); 
    await pom_pages.ExtracurricularActivitiesPage.fillExtracurricularActivities(data.activity_2,data.yrInvolved,data.role,data.discription);
    await pom_pages.ExtracurricularActivitiesPage.fillExtracurricularActivities(data.activity_3,data.yrInvolved,data.role,data.discription);
    await pom_pages.ExtracurricularActivitiesPage.fillExtracurricularActivities(data.activity_4,data.yrInvolved,data.role,data.discription);
    await pom_pages.ExtracurricularActivitiesPage.page.waitForTimeout(3000);
    await pom_pages.ExtracurricularActivitiesPage.nextPage.click();  
})

test("Fill Education Details",async()=>{
    await pom_pages.EducationDetailsPage.fillEducationalDetails(data.shighschoolName,data.hsStreetAddress,data.additionalAddress,data.hsCity,data.hsState,data.zipCode,data.gpa,data.yearGraduation,data.inputFile);
})

test("Check eassy boxes",async()=>{
    await pom_pages.EassyPage.car.check();
    await expect(await pom_pages.EassyPage.eassyAboutCar).toBeVisible();
    await pom_pages.EassyPage.car.uncheck();
    await pom_pages.EassyPage.animal.check();
    await expect(await pom_pages.EassyPage.eassyAboutAnimals).toBeVisible();
    await pom_pages.EassyPage.animal.uncheck();
    await pom_pages.EassyPage.school.check();
    await expect(await pom_pages.EassyPage.eassyAboutSchool).toBeVisible();
    await pom_pages.EassyPage.school.uncheck();
    await pom_pages.EassyPage.other.check();
    await expect(await pom_pages.EassyPage.eassyAboutOther).toBeVisible();
    await pom_pages.EassyPage.other.uncheck();
    await pom_pages.EassyPage.animal.check();
    await pom_pages.EassyPage.eassyAboutAnimals.fill(data.eassyAboutAnimal);
    await pom_pages.EassyPage.school.check();
    await pom_pages.EassyPage.eassyAboutSchool.fill(data.eassyAboutSchool);
    await pom_pages.EassyPage.nextPage.click({timeout:2000});
    
})


test("Review page",async()=>{
    test.setTimeout(30000*3);
    await pom_pages.ReviewPage.application.click();
    await pom_pages.ReviewPage.knowYouList.click();
    await pom_pages.ReviewPage.expectFieldValue("First Name",data.firstName);
    await pom_pages.ReviewPage.expectFieldValue("Last Name",data.lastName);
    await pom_pages.ReviewPage.expectFieldValue("Email Address",email);
    await pom_pages.ReviewPage.expectFieldValue("Street Address",data.streetAddress);
    await pom_pages.ReviewPage.expectFieldValue("Additional Street Address",data.additionalStreetAddress);
    await pom_pages.ReviewPage.expectFieldValue("State (Full)",data.state);
    await pom_pages.ReviewPage.expectFieldValue("City",data.city);
    await pom_pages.ReviewPage.expectFieldValue("Zip Code",data.zipCode);
    await pom_pages.ReviewPage.expectFieldValue("Country",data.country);
    await pom_pages.ReviewPage.knowYouList.click();
    //----Extra
    await pom_pages.ReviewPage.extraCurricularActivities.click();
    await pom_pages.ReviewPage.clickActivityLocator(data.activity_1);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_1,"Extracurricular Activity Name",data.activity_1);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_1,"Total Number of Years Involved",data.yrInvolved);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_1,"List any leadership roles, offices, honors and recognitions related to this activity  ",data.role);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_1,"Description of Involvement",data.discription);
    await pom_pages.ReviewPage.clickActivityLocator(data.activity_1);
    await pom_pages.ReviewPage.clickActivityLocator(data.activity_2);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_2,"Extracurricular Activity Name",data.activity_2);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_2,"Total Number of Years Involved",data.yrInvolved);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_2,"List any leadership roles, offices, honors and recognitions related to this activity  ",data.role);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_2,"Description of Involvement",data.discription);
    await pom_pages.ReviewPage.clickActivityLocator(data.activity_2);
    await pom_pages.ReviewPage.clickActivityLocator(data.activity_3);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_3,"Extracurricular Activity Name",data.activity_3);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_3,"Total Number of Years Involved",data.yrInvolved);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_3,"List any leadership roles, offices, honors and recognitions related to this activity  ",data.role);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_3,"Description of Involvement",data.discription);
    await pom_pages.ReviewPage.clickActivityLocator(data.activity_3);
    await pom_pages.ReviewPage.clickActivityLocator(data.activity_4);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_4,"Extracurricular Activity Name",data.activity_4);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_4,"Total Number of Years Involved",data.yrInvolved);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_4,"List any leadership roles, offices, honors and recognitions related to this activity  ",data.role);
    await pom_pages.ReviewPage.expectFieldValueExtraCurricularActivity(data.activity_4,"Description of Involvement",data.discription);
    await pom_pages.ReviewPage.clickActivityLocator(data.activity_4);
    await pom_pages.ReviewPage.extraCurricularActivities.click();
    //--high school info
    await pom_pages.ReviewPage.highSchoolInfo.click();
    await pom_pages.ReviewPage.expectFieldValue("High School Name",data.shighschoolName);
    await pom_pages.ReviewPage.expectFieldValue("High School Street Address",data.hsStreetAddress);
    await pom_pages.ReviewPage.expectFieldValue("Additional High School Street Address",data.additionalAddress);
    await pom_pages.ReviewPage.expectFieldValue("High School City",data.hsCity);
    await pom_pages.ReviewPage.expectFieldValue("High School State (Full)",data.hsState);
    await pom_pages.ReviewPage.expectFieldValue("High School Zip Code",data.zipCode);
    await pom_pages.ReviewPage.expectFieldValue("GPA",data.gpa);
    await pom_pages.ReviewPage.expectFieldValue("Year of High School Graduation",data.yearGraduation);
    await pom_pages.ReviewPage.expectFieldValue("GPA",data.gpa);
    await pom_pages.ReviewPage.highSchoolInfo.click();
    //--essay
    await pom_pages.ReviewPage.essay.click();
    await pom_pages.ReviewPage.expectFieldValue("Please select the essay types you want to write about:",data.essayWritten);
    await pom_pages.ReviewPage.expectFieldValue("Essay about Animals",data.eassyAboutAnimal);
    await pom_pages.ReviewPage.expectFieldValue("Essay about School",data.eassyAboutSchool);
    await pom_pages.ReviewPage.essay.click();    
    
})

test("Submit Application",async()=>{
    const pageURL=await page.url();
    await pom_pages.ReviewPage.submitApplication();
    await page.waitForNavigation();
    await pom_pages.ReviewPage.goToNewURL(pageURL);
    await expect(await pom_pages.ReviewPage.submitButton).toBeDisabled();
    await expect(pom_pages.ReviewPage.page.getByText('Edit').first()).not.toBeVisible();
    
})

