import { globalVars } from "../DATA/Variables.js";
import { Helpers } from "../HelperFunctions/Helpers.js";

export class SolutionsPage {
  constructor(page) {
    this.page = page;
    this.createNewAutomationSolutionButton = page.getByRole("button", {name: "New Automation Solution"})
    this.dialog = page.getByTestId("dialog-create-solution")
    this.textBoxTitle = page.getByTestId("input-create-solution-title").locator('input')
    this.textBoxDescription = page.getByTestId("input-create-solution-description").locator('textarea')
    this.buttonDialogCreateSolution = page.getByTestId("button-create-solution-submit")
    this.solutionOptionMenu = page.getByTestId("element-solution-card-menu")
    this.solutionOptionMenuDeleteSolutionItem = page.getByTestId("menu-solution-card-delete")
    this.dialogDeleteSolution = page.getByTestId("dialog-delete-solution")
    this.dialogDeleteSolutionButtonDelete = page.getByTestId("button-delete-solution-submit")

    //Functions 
    this.helper = new Helpers()


  }

  waitToLoadSolutionPage = async () => {
    await this.page.waitForURL(/\/solutions/, { timeout: 60000 });
  };

  waitToLoadSelectedSolutionPage = async () => {
    await this.page.waitForURL(/\/engineering/, { timeout: 60000 });
  }

  clickCreateAutomationSolutionButton = async() => {
    await this.createNewAutomationSolutionButton.waitFor()
    await this.createNewAutomationSolutionButton.click()
  }

  populateSolutionTitle = async( stringSolutionName) => {
    await this.helper.customFillInputField(this.textBoxTitle,stringSolutionName)
  }

  populateDescription = async( stringDescriptionName) => {
    await this.helper.customFillInputField(this.textBoxDescription,stringDescriptionName)
  }

  clickDialogCreateNewSolutionButton = async () => {
    await this.buttonDialogCreateSolution.waitFor()
    await this.buttonDialogCreateSolution.click()
  }

  getSolutionByTestId = async(stringSolutionName) => {
     return await this.page.getByTestId(`element-solution-card-${stringSolutionName}`)
  }
  verifySolutionExists = async(stringSolutionName,boolShouldExists,intTimeOut) => {
    const solution = await this.getSolutionByTestId(stringSolutionName)
    await this.helper.verifyExists(solution,boolShouldExists,intTimeOut)
  
  }

  addNewSolution = async(stringSolutionName,stringDescription) => {
    await this.clickCreateAutomationSolutionButton()
    await this.populateSolutionTitle(stringSolutionName)
    await this.populateDescription(stringDescription)
    await this.clickDialogCreateNewSolutionButton()
    await this.verifySolutionExists(stringSolutionName,true)
  }

  openSolution = async(stringSolutionName) => {
    const solution = await this.getSolutionByTestId(stringSolutionName)
    await solution.click()
  }

  getSolutionThreeDotsByTestId = async(stringSolutionName) => {
    const solution = await this.getSolutionByTestId(stringSolutionName)
    return await solution.locator('[data-testid = "button-solution-card-options"]')

  }
  clickSolutionThreeDotsOptionButton = async(stringSolutionName) => {
    const buttonThreeDotsOption = await this.getSolutionThreeDotsByTestId(stringSolutionName)
    await buttonThreeDotsOption.click()
  }

  deleteSolution = async (stringSolutionName) => {
    const solution = await this.getSolutionByTestId(stringSolutionName)
    await this.clickSolutionThreeDotsOptionButton(stringSolutionName)
    await this.solutionOptionMenu.waitFor()
    await this.solutionOptionMenuDeleteSolutionItem.click()
    await this.dialogDeleteSolution.waitFor()
    await this.dialogDeleteSolutionButtonDelete.click()
    await this.verifySolutionExists(stringSolutionName,false)
  }








}
