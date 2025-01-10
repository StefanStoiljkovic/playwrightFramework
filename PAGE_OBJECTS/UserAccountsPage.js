import { expect } from "@playwright/test";
import { Helpers } from "../HelperFunctions/Helpers";

export class UserAccountsPage {
  constructor(page) {
    // Locators
    this.page = page;
    this.buttonCreateUserAccount = page.getByRole("button", {name: "Create user account",})
    this.dialogCreateNewUserAccount =page.locator("#dialog-content")
    this.dialogTextBoxFirstName =this.dialogCreateNewUserAccount.getByTestId("um-first-name").locator(".qds-input")
    this.dialogTextBoxLastName = this.dialogCreateNewUserAccount.getByTestId("um-last-name").locator(".qds-input")
    this.dialogDropDownRole = this.dialogCreateNewUserAccount.getByTestId("um-roles-dropdown").locator("ng-select")
    this.dialogDropDownRoleInput =this.dialogDropDownRole.locator("input")
    this.dialogDropDownRoleOption = this.dialogDropDownRole.locator('.ng-option')
    this.dialogTextBoxUserName = this.dialogCreateNewUserAccount.getByTestId("um-username").locator(".qds-input")
    this.dialogTextBoxPassword = this.dialogCreateNewUserAccount.getByTestId("um-password").locator(".qds-input")
    this.dialogTextBoxConfirmPassword =this.dialogCreateNewUserAccount.getByTestId("um-confirm-password").locator(".qds-input")
    this.buttonSave = page.getByRole("button", { name: "Save" });


    // Functions
    this.helpers = new Helpers(this.page);
  }

  waitToLoadUserAccountPage = async () => {
    await this.page.waitForURL(/\/cae/, { timeout: 60000 })
  };

  clickCreateUserAccountButton = async () => {
    await this.buttonCreateUserAccount.click();
    await this.dialogCreateNewUserAccount.waitFor()
  };

  populateNewUserFirstName = async (stringFirstName) => {
    await this.helpers.customFillInputField(this.dialogTextBoxFirstName,stringFirstName)
  };

  populateNewUserLastName = async (stringLastName) => {
    await this.helpers.customFillInputField(this.dialogTextBoxLastName,stringLastName)
  };

  populateNewUserRole = async( stringRole) => {
    await this.dialogDropDownRole.waitFor()
    await this.dialogDropDownRole.click()
    await this.dialogDropDownRoleInput.fill(stringRole)
    await this.dialogDropDownRoleOption.waitFor()
    await this.dialogDropDownRole.locator(`.ng-option:has-text("${stringRole}")`).click()
  }

  populateNewUserName = async (stringUserName) => {
    await this.helpers.customFillInputField(this.dialogTextBoxUserName,stringUserName)
  }

  populateNewUserPassword = async (stringUserPassword) => {
    await this.helpers.customFillInputField(this.dialogTextBoxPassword,stringUserPassword)
  }

  populateConfirmNewUserPassword = async (stringUserPassword) => {
    await this.helpers.customFillInputField(this.dialogTextBoxConfirmPassword,stringUserPassword)
  }

  clickButtonSave = async () => {
    await this.buttonSave.waitFor()
    await this.buttonSave.click()
  }
}
