import { Page } from "@playwright/test";
import { EassyPage } from "./EassyPage";
import { EducationDetailsPage } from "./EducationDetailsPage";
import { ExtracurricularActivitiesPage } from "./ExtracurricularActivitiesPage";
import { KaleidoscopeSDETScholarshipPage } from "./KaleidoscopeSDETScholarshipPage";
import { RegisterUser } from "./RegisterUser";
import { ReviewPage } from "./ReviewPage";
import { UserDetailsPage } from "./UserDetailsPage";

export class POM_Pages{
    page:Page;
    obj_KaleidoscopeSDETScholarshipPage:KaleidoscopeSDETScholarshipPage;
    obj_RegisterUser:RegisterUser;
    obj_ExtracurricularActivitiesPage:ExtracurricularActivitiesPage;
    obj_UserDetailsPage:UserDetailsPage;
    obj_EducationDetailsPage:EducationDetailsPage;
    obj_EassyPage:EassyPage;
    obj_ReviewPage:ReviewPage;
    constructor(page:Page){
        this.page=page;
        this.obj_KaleidoscopeSDETScholarshipPage=new KaleidoscopeSDETScholarshipPage(page);
        this.obj_RegisterUser=new RegisterUser(page);
        this.obj_ExtracurricularActivitiesPage=new ExtracurricularActivitiesPage(page);
        this.obj_UserDetailsPage=new UserDetailsPage(page);
        this.obj_EducationDetailsPage=new EducationDetailsPage(page);
        this.obj_EassyPage= new EassyPage(page);
        this.obj_ReviewPage=new ReviewPage(page);
    }
    


}