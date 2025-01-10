import { globalVars } from "../DATA/Variables.js";
import { Helpers } from "../HelperFunctions/Helpers.js";

export class LoginPage {
  constructor(page) {
    // Locators
    this.page = page;
    this.textboxUserName = page.getByRole("textbox", { name: "Username" });
    this.textboxPassword = page.getByRole("textbox", { name: "Password" });
    this.buttonLogin = page.getByRole("button", { name: "Login" });

    //Functions
    this.helper = new Helpers();
  }

  visit = async (stringAddress) => {
    await this.page.goto(stringAddress, {timeout: 60000,waitUntil: "load",});
  };

  login = async (stringUserName, stringPassword) => {
    await this.helper.customFillInputField(this.textboxUserName,stringUserName)
    await this.helper.customFillInputField(this.textboxPassword,stringPassword)
    await this.buttonLogin.click()
  };
}
