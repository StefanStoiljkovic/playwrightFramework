import { globalVars } from "../DATA/Variables.js";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.textboxUserName = page.getByRole("textbox", { name: "Username" });
    this.textboxPassword = page.getByRole("textbox", { name: "Password" });
    this.buttonLogin = page.getByRole("button", { name: "Login" });
  }

  visit = async (stringAddress) => {
    await this.page.goto(stringAddress, {
      timeout: 60000,
      waitUntil: "load",
    });
  };

  login = async (stringUserName, stringPassword) => {
    await this.textboxUserName.fill(stringUserName);
    await this.textboxPassword.fill(stringPassword);
    await this.buttonLogin.click();
  };
}
