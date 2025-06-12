import { test as baseTest, BrowserContext } from '@playwright/test';
//import { type Page } from '@playwright/test';
import { EassyPage } from '../pages/EassyPage';
import { EducationDetailsPage } from '../pages/EducationDetailsPage';
import { ExtracurricularActivitiesPage } from '../pages/ExtracurricularActivitiesPage';
import { RegisterUser } from '../pages/RegisterUser';
import { ReviewPage } from '../pages/ReviewPage';
import { UserDetailsPage } from '../pages/UserDetailsPage';

type MyFixtures = {
  eassyPage: EassyPage;
  educationDetailsPage: EducationDetailsPage;
  extracurricularActivitiesPage: ExtracurricularActivitiesPage;
  registerUser: RegisterUser;
  reviewPage: ReviewPage;
  userDetailsPage: UserDetailsPage;
};

export const test = baseTest.extend<MyFixtures>({
  eassyPage:async ({page}, use) => {
    const eassyPage=new EassyPage(page);
      await use(eassyPage);
    },
  educationDetailsPage: async ({ page }, use) => {
    await use(new EducationDetailsPage(page));
  },
  extracurricularActivitiesPage: async ({ page }, use) => {
    await use(new ExtracurricularActivitiesPage(page));
  },
  registerUser: async ({ page }, use) => {
    await use(new RegisterUser(page));
  },
  reviewPage: async ({ page }, use) => {
    await use(new ReviewPage(page));
  },
  userDetailsPage: async ({ page }, use) => {
    await use(new UserDetailsPage(page));
  }
});

export { expect } from '@playwright/test';