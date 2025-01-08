import { globalVars } from "../DATA/Variables.js";

export class SolutionsPage {
  constructor(page) {
    this.page = page;
  }

  waitToLoadSolutionPage = async () => {
    await this.page.waitForURL(/\/solutions/, { timeout: 60000 });
  };
}
