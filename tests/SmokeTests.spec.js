import { test, expect } from "@playwright/test";
import { LoginPage } from "../PAGE_OBJECTS/LoginPage";
import { authData } from "../DATA/Variables";
import { SolutionsPage } from "../PAGE_OBJECTS/SolutionsPage";
import { SideBarPage } from "../PAGE_OBJECTS/SideBarPage";
import { SelectedSolutionPage } from "../PAGE_OBJECTS/SelectedSolutionPage";
import { UserAccountsPage } from "../PAGE_OBJECTS/UserAccountsPage";
import { Helpers } from "../HelperFunctions/Helpers";



/**
 * Test: This test will create new accounts and verify if they have specific pages
 * Tags: First_Acceptance_Tests   SSETN-685
 */
test.describe("Smoke test",() => {
  let helpers
  let radnomUserAccountName
  let randomSolutionName
  let loginPage
  let solutionPage
  let sidebarPage
  let userAccountsPage

  
  test.beforeAll( async() => {
    helpers = new Helpers()
    radnomUserAccountName = helpers.generateRandomString(10)
    randomSolutionName = helpers.generateRandomString(10)
  })

  test.beforeEach(async ({page,}) => {
    loginPage = new LoginPage(page)
    solutionPage = new SolutionsPage(page)
    sidebarPage = new SideBarPage(page)
    userAccountsPage = new UserAccountsPage(page)


    await loginPage.visit(process.env.MAF_URL);
    
  })

  test("TC_1-Create different accounts and login to portal as different users", async ({page,}) => {

    await loginPage.login(authData.username_admin, authData.password_admin);
    await solutionPage.waitToLoadSolutionPage();
    await sidebarPage.clickSideBarButton("User Management");
    await userAccountsPage.waitToLoadUserAccountPage();
    await userAccountsPage.clickCreateUserAccountButton();
    await userAccountsPage.addNewUserAccount(radnomUserAccountName,radnomUserAccountName,"AUTENG",radnomUserAccountName,authData.password,authData.password,radnomUserAccountName,true)
    
  })

  test("TC_2-create new solution Smoke", async({page})=> {
    await loginPage.login(radnomUserAccountName, authData.password);
    await solutionPage.waitToLoadSolutionPage();
    await sidebarPage.clickSideBarButton("Solutions");
    await solutionPage.waitToLoadSolutionPage()
    await solutionPage.addNewSolution(randomSolutionName, "this is demo solution")
    await solutionPage.openSolution(randomSolutionName)
    await solutionPage.waitToLoadSelectedSolutionPage()

  })

  test("TC_3-Delete Solution Smoke", async({page})=> {
    
    await loginPage.login(radnomUserAccountName, authData.password);
    await solutionPage.waitToLoadSolutionPage()
    await sidebarPage.clickSideBarButton("Solutions");
    await solutionPage.waitToLoadSolutionPage()
    await solutionPage.deleteSolution(randomSolutionName)
  })



});


test("Create solution" , async({page}) => {

  const helper = new Helpers()
  const loginPage = new LoginPage(page)
  const solutionPage = new SolutionsPage(page)
  const sidebarPage = new SideBarPage(page)
  const userAccountsPage = new UserAccountsPage(page)
  const selectedSolutionPage = new SelectedSolutionPage(page)

  const solutionName = process.env.SOLUTION_NAME || helper.generateRandomString(10)
  const solutionDescription = process.env.DESCRIPTION || helper.generateRandomString(10)

  await loginPage.visit(process.env.MAF_URL);
  await loginPage.login("Stefan", "User123456");
  await solutionPage.waitToLoadSolutionPage();
  // await sidebarPage.clickSideBarButton("Solutions");
  // await solutionPage.waitToLoadSolutionPage()
  // await solutionPage.addNewSolution(solutionName, solutionDescription)
  await solutionPage.openSolution("Test23234")
  await solutionPage.waitToLoadSelectedSolutionPage()
  await selectedSolutionPage.createApplication("TestApp","Cyclic Control Application")
  const test = page.locator("")
  await test.pressSequentially
  
})
