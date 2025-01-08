export class SideBarPage {
  constructor(page) {
    this.page = page;
  }

  clickSideBarButton = async (stringSideBarButtonId) => {
    const escapedName = stringSideBarButtonId.trim().replace(" ", "\\ ");
    const sideBarElemenet = this.page.locator(`[id="${escapedName}"]`).first();
    await sideBarElemenet.click();
  };
}
