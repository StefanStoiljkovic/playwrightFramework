import { expect } from "@playwright/test";

export class Helpers {
  customFillInputField = async (
    objectToPopulate,
    stringTextToInput,
    intTimeToWait
  ) => {
    await objectToPopulate.waitFor({ timeout: intTimeToWait });
    await objectToPopulate.fill(stringTextToInput);
    await expect(await objectToPopulate).toHaveValue(stringTextToInput);
  };
}
