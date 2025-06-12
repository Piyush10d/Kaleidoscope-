import { Page } from "@playwright/test";
import { EassyPage } from "./EassyPage";
import { EducationDetailsPage } from "./EducationDetailsPage";
import { ExtracurricularActivitiesPage } from "./ExtracurricularActivitiesPage";
import { RegisterUser } from "./RegisterUser";
import { ReviewPage } from "./ReviewPage";
import { UserDetailsPage } from "./UserDetailsPage";

export class POM_Pages{
    page:Page;
    RegisterUser:RegisterUser;
    ExtracurricularActivitiesPage:ExtracurricularActivitiesPage;
    UserDetailsPage:UserDetailsPage;
    EducationDetailsPage:EducationDetailsPage;
    EassyPage:EassyPage;
    ReviewPage:ReviewPage;
    constructor(page:Page){
        this.page=page;
        this.RegisterUser=new RegisterUser(page);
        this.ExtracurricularActivitiesPage=new ExtracurricularActivitiesPage(page);
        this.UserDetailsPage=new UserDetailsPage(page);
        this.EducationDetailsPage=new EducationDetailsPage(page);
        this.EassyPage= new EassyPage(page);
        this.ReviewPage=new ReviewPage(page);
    }
    


}