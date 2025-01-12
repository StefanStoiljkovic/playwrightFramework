import { expect } from "@playwright/test";

export class Helpers {

  customFillInputField = async (objectToPopulate,stringTextToInput,intTimeToWait) => {
    await objectToPopulate.waitFor({ timeout: intTimeToWait });
    await objectToPopulate.fill(stringTextToInput);
    await expect(await objectToPopulate).toHaveValue(stringTextToInput);
  };

  generateRandomString = (length) =>{ 
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let result = ''
    for (let i = 0; i < length; i++) 
      { 
        result += characters.charAt(Math.floor(Math.random() * characters.length))
      } 
      return result;
     }

    verifyExists = async (objectLocator, boolShouldExists,intTimeout=10000) => {
      await new Promise(resolve => setTimeout(resolve,2000))
      if (boolShouldExists)
      {
        await objectLocator.waitFor({state: "attached", timeout : intTimeout})
        await expect(objectLocator).toBeAttached()
      } else {
        await objectLocator.waitFor({state: "detached", timeout : intTimeout})
      }
  }

}
