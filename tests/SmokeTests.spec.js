import { test, expect } from "@playwright/test";
import { LoginPage } from "../PAGE_OBJECTS/LoginPage";
import { globalVars } from "../DATA/Variables";
import { authData } from "../DATA/Variables";
import { SolutionsPage } from "../PAGE_OBJECTS/SolutionsPage";
import { SideBarPage } from "../PAGE_OBJECTS/SideBarPage";

/**
 * Test: This test will create new accounts and verify if they have specific pages
 * Tags: First_Acceptance_Tests   SSETN-685
 */
test("TC_1-Create different accounts and login to portal as different users", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const solutionPage = new SolutionsPage(page);
  const sidebarPage = new SideBarPage(page);

  await loginPage.visit(globalVars.mafAddress);
  await loginPage.login(authData.username_admin, authData.password_admin);
  await solutionPage.waitToLoadSolutionPage();
  await sidebarPage.clickSideBarButton("User Management");
});
