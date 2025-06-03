import {test,expect, chromium, Page} from "@playwright/test";
import { Console } from "console";
import { POM_Pages } from "../../pages/POM_Pages";
import {data} from "../Input/userData"


var page;
var obj_POM_Pages:POM_Pages;
var firstName:string;
var email:string;
test.describe.configure({mode:"serial"});

test.beforeAll(async({})=>{
    const browser= await chromium.launch({headless:false});
    const context= await browser.newContext();
    page         = await context.newPage();
    obj_POM_Pages=new POM_Pages(page);
})

test("Register new User",async()=>{
    await page.goto("https://apply.mykaleidoscope.com/program/sdet-test-scholarship");
    await page.getByRole('button', { name: 'Log In to Apply' }).click();
    email="test_" + Date.now() + "@gmail.com";
    await obj_POM_Pages.obj_RegisterUser.doRegistration(email,data.firstName,data.lastName,data.contactNumber,data.password);
})

test("Fill User details", async()=>{
    await obj_POM_Pages.obj_UserDetailsPage.fillUserDetails(data.streetAddress,data.additionalStreetAddress,data.state,data.city,data.zipCode,data.country);
})

test("Fill Extracurricular Activities",async()=>{
    await obj_POM_Pages.obj_ExtracurricularActivitiesPage.fillExtracurricularActivities(data.activity_1,data.yrInvolved,data.role,data.discription);
    await obj_POM_Pages.obj_ExtracurricularActivitiesPage.nextPage.click();
    await expect(await obj_POM_Pages.obj_ExtracurricularActivitiesPage.form_renderer).toContainText(data.expectedText); 
    await obj_POM_Pages.obj_ExtracurricularActivitiesPage.fillExtracurricularActivities(data.activity_2,data.yrInvolved,data.role,data.discription);
    await obj_POM_Pages.obj_ExtracurricularActivitiesPage.fillExtracurricularActivities(data.activity_3,data.yrInvolved,data.role,data.discription);
    await obj_POM_Pages.obj_ExtracurricularActivitiesPage.fillExtracurricularActivities(data.activity_4,data.yrInvolved,data.role,data.discription);
    await obj_POM_Pages.obj_ExtracurricularActivitiesPage.page.waitForTimeout(3000);
    await obj_POM_Pages.obj_ExtracurricularActivitiesPage.nextPage.click();  
})

test("Fill Education Details",async()=>{
    await obj_POM_Pages.obj_EducationDetailsPage.fillEducationalDetails(data.shighschoolName,data.hsStreetAddress,data.additionalAddress,data.hsCity,data.hsState,data.zipCode,data.gpa,data.yearGraduation,data.inputFile);
})

test("Check eassy boxes",async()=>{
    await obj_POM_Pages.obj_EassyPage.car.check();
    await expect(await obj_POM_Pages.obj_EassyPage.eassyAboutCar).toBeVisible();
    await obj_POM_Pages.obj_EassyPage.car.uncheck();
    await obj_POM_Pages.obj_EassyPage.animal.check();
    await expect(await obj_POM_Pages.obj_EassyPage.eassyAboutAnimals).toBeVisible();
    await obj_POM_Pages.obj_EassyPage.animal.uncheck();
    await obj_POM_Pages.obj_EassyPage.school.check();
    await expect(await obj_POM_Pages.obj_EassyPage.eassyAboutSchool).toBeVisible();
    await obj_POM_Pages.obj_EassyPage.school.uncheck();
    await obj_POM_Pages.obj_EassyPage.other.check();
    await expect(await obj_POM_Pages.obj_EassyPage.eassyAboutOther).toBeVisible();
    await obj_POM_Pages.obj_EassyPage.other.uncheck();
    await obj_POM_Pages.obj_EassyPage.animal.check();
    await obj_POM_Pages.obj_EassyPage.eassyAboutAnimals.fill(data.eassyAboutAnimal);
    await obj_POM_Pages.obj_EassyPage.school.check();
    await obj_POM_Pages.obj_EassyPage.eassyAboutSchool.fill(data.eassyAboutSchool);
    await obj_POM_Pages.obj_EassyPage.nextPage.click({timeout:2000});
    
})


test("Review page",async()=>{
    await obj_POM_Pages.obj_ReviewPage.application.click();
    await obj_POM_Pages.obj_ReviewPage.knowYouList.click();
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("First Name",data.firstName);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Last Name",data.lastName);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Email Address",email);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Street Address",data.streetAddress);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Additional Street Address",data.additionalStreetAddress);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("State (Full)",data.state);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("City",data.city);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Zip Code",data.zipCode);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Country",data.country);
    await obj_POM_Pages.obj_ReviewPage.knowYouList.click();
    //----Extra
    await obj_POM_Pages.obj_ReviewPage.extraCurricularActivities.click();
    await obj_POM_Pages.obj_ReviewPage.clickActivityLocator(data.activity_1);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Extracurricular Activity Name",data.activity_1);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Total Number of Years Involved",data.yrInvolved);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("List any leadership roles,",data.role);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Description of Involvement",data.discription);
    await obj_POM_Pages.obj_ReviewPage.clickActivityLocator(data.activity_1);
    await obj_POM_Pages.obj_ReviewPage.clickActivityLocator(data.activity_2);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Extracurricular Activity Name",data.activity_2);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Total Number of Years Involved",data.yrInvolved);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("List any leadership roles,",data.role);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Description of Involvement",data.discription);
    await obj_POM_Pages.obj_ReviewPage.clickActivityLocator(data.activity_2);
    await obj_POM_Pages.obj_ReviewPage.clickActivityLocator(data.activity_3);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Extracurricular Activity Name",data.activity_3);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Total Number of Years Involved",data.yrInvolved);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("List any leadership roles,",data.role);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Description of Involvement",data.discription);
    await obj_POM_Pages.obj_ReviewPage.clickActivityLocator(data.activity_3);
    await obj_POM_Pages.obj_ReviewPage.clickActivityLocator(data.activity_4);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Extracurricular Activity Name",data.activity_4);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Total Number of Years Involved",data.yrInvolved);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("List any leadership roles,",data.role);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Description of Involvement",data.discription);
    await obj_POM_Pages.obj_ReviewPage.clickActivityLocator(data.activity_4);
    await obj_POM_Pages.obj_ReviewPage.extraCurricularActivities.click();
    //--high school info
    await obj_POM_Pages.obj_ReviewPage.highSchoolInfo.click();
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("High School Name",data.shighschoolName);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("High School Street Address",data.hsStreetAddress);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Additional High School Street",data.additionalAddress);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("High School City",data.hsCity);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("High School State (Full)",data.hsState);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("High School Zip Code",data.zipCode);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("GPA",data.gpa);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Year of High School Graduation",data.yearGraduation);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("GPA",data.gpa);
    await obj_POM_Pages.obj_ReviewPage.highSchoolInfo.click();
    //--essay
    await obj_POM_Pages.obj_ReviewPage.essay.click();
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Please select the essay types",data.essayWritten);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Essay about Animals",data.eassyAboutAnimal);
    await obj_POM_Pages.obj_ReviewPage.expectFieldValue("Essay about School",data.eassyAboutSchool);
    await obj_POM_Pages.obj_ReviewPage.essay.click();    
    
})

test("Submit Application",async()=>{
    const pageURL=await page.url();
    await obj_POM_Pages.obj_ReviewPage.submitApplication();
    await page.waitForNavigation();
    await obj_POM_Pages.obj_ReviewPage.goToNewURL(pageURL);
    await expect(await obj_POM_Pages.obj_ReviewPage.submitButton).toBeDisabled();
    await expect(obj_POM_Pages.obj_ReviewPage.page.getByText('Edit').first()).not.toBeVisible();
    
})

