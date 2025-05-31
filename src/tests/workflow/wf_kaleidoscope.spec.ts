import {test,expect, chromium, Page} from "@playwright/test";
import { POM_Pages } from "../../pages/POM_Pages";

var page;
var obj_POM_Pages:POM_Pages;
test.describe.configure({mode:"serial"});

test.beforeAll(async({})=>{
    const browser= await chromium.launch({headless:false});
    const context= await browser.newContext();
    page         = await context.newPage();
    await page.goto("https://apply.mykaleidoscope.com/program/sdet-test-scholarship");
    obj_POM_Pages=new POM_Pages(page);
    await obj_POM_Pages.obj_KaleidoscopeSDETScholarshipPage.page.waitForLoadState("domcontentloaded");
    await obj_POM_Pages.obj_KaleidoscopeSDETScholarshipPage.gotoRegistrationPage();
})

test("Fill Personal details of new User",async()=>{
    await obj_POM_Pages.obj_RegisterUser.doRegistration();
})
test("Fill User details", async()=>{
    await obj_POM_Pages.obj_UserDetailsPage.fillUserDetails("Colive grand","Wakad chauk","Maine","Pune","442912","India");
})

test("Fill Extracurricular Activities",async()=>{
    await obj_POM_Pages.obj_ExtracurricularActivitiesPage.fillExtracurricularActivities("Dancing","2","First Prize in departmental dance","Participated in all the events and got first prize in dance");
    await obj_POM_Pages.obj_ExtracurricularActivitiesPage.nextPage.click();
    await expect(await obj_POM_Pages.obj_ExtracurricularActivitiesPage.form_renderer).toContainText('Please add at least 2 entries'); 
    await obj_POM_Pages.obj_ExtracurricularActivitiesPage.fillExtracurricularActivities("Running","2","First Prize in departmental Sports Event","Participated in all the events and got first prize in Running");
    await obj_POM_Pages.obj_ExtracurricularActivitiesPage.fillExtracurricularActivities("Debate","1","Second Prize in debate Event","Participated in all the events and got second prize in debate");
    await obj_POM_Pages.obj_ExtracurricularActivitiesPage.fillExtracurricularActivities("Singing","1","Third Prize in singing Event","Participated in all the events and got third prize in Singing");
    await obj_POM_Pages.obj_ExtracurricularActivitiesPage.page.waitForTimeout(3000);
    await obj_POM_Pages.obj_ExtracurricularActivitiesPage.nextPage.click();  
})
test("Fill Education Details",async()=>{
    await obj_POM_Pages.obj_EducationDetailsPage.fillEducationalDetails("Shivaji Science Arts junior college","Anandwan square","Tilak ward","Warora","Maine","422907","8","2012","My School Transcript.pdf");
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
    await obj_POM_Pages.obj_EassyPage.eassyAboutAnimals.fill("I am writing eassy about Animal");
    await obj_POM_Pages.obj_EassyPage.school.check();
    await obj_POM_Pages.obj_EassyPage.eassyAboutSchool.fill("I am writing eassy about school");
    await obj_POM_Pages.obj_EassyPage.page.waitForTimeout(2000);
    await obj_POM_Pages.obj_EassyPage.nextPage.click();
})
test("Review page",async()=>{
    await obj_POM_Pages.obj_ReviewPage.application.click();
    
})
test("Submit Application",async()=>{
    const pageURL=await obj_POM_Pages.obj_ReviewPage.page.url();
    await obj_POM_Pages.obj_ReviewPage.submitApplication();
    await obj_POM_Pages.obj_ReviewPage.goToNewURL(pageURL);
    //await obj_POM_Pages.obj_ReviewPage.page.pause();
    await expect(page.getByRole('link', { name: 'Continue Application' })).toBeDisabled({timeout:5000});
    //(await expect(await obj_POM_Pages.obj_ReviewPage.continueApplication)).not.toBeEditable();
})


