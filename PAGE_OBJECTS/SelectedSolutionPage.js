import { create } from "domain";
import { globalVars } from "../DATA/Variables.js";
import { Helpers } from "../HelperFunctions/Helpers.js";

export class SelectedSolutionPage{
  constructor(page) {
    this.page = page;
    this.buttonPlus = page.getByTestId("scm-solution-actions-menu")
    this.dropDownOptionMenu = page.getByTestId("actions-context-menu-2")
    this.textBoxCreateAppName = page.getByTestId("scm-create-application-name-input").locator("input")
    this.dropDownCreateNewAppType = page.getByTestId("scm-create-application-content-type-select")
    this.buttonCreateAndLaunch = page.getByTestId("scm-create-application-create-button").locator("button")
    this.createdAppsTree = page.locator('.content-tree-content')

    //Functions 
    this.helper = new Helpers()


  }

  clickButtonPlus = async () => {
    await this.buttonPlus.waitFor()
    await this.buttonPlus.click()

  }

  populateCreateNewAppName = async(stringAppNAme) => {
    //  await this.helper.customFillInputField(this.textBoxCreateAppName,stringAppNAme)
    await this.textBoxCreateAppName.pressSequentially(stringAppNAme, {delay : 500})
  }

  selectCreateNewAppType = async(stringAppType) => {
    await this.dropDownCreateNewAppType.inputValue() === stringAppType ? null : await this.dropDownCreateNewAppType.selectOption(stringAppType)
  }

  clickButttonCreateAndLaunch= async () => {
      await this.buttonCreateAndLaunch.click()
  }

  getCreatedAppLocator = async(stringAppName) => {
    return await this.createdAppsTree.locator(`.content-list-item-label:has-text("${stringAppName}")`)

  }



  createApplication = async(stringAppNAme,stringAppType) => {
    await this.clickButtonPlus()
    const menuItem = this.page.locator(`.scm-dropdown-item:has-text("Cyclic Control Application")`).first()
    await menuItem.waitFor()
    await menuItem.click()
    await this.populateCreateNewAppName(stringAppNAme)
    await this.selectCreateNewAppType(stringAppType)
    await this.textBoxCreateAppName.inputValue() ? null : await this.populateCreateNewAppName(stringAppNAme)
    await this.page.waitForTimeout(5000)
    await this.clickButttonCreateAndLaunch()
    const createdApp = await this.getCreatedAppLocator(stringAppNAme)
    await this.helper.verifyExists(createdApp,true)
    
  }

  

 

}
