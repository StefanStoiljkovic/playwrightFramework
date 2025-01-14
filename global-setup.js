import {FullConfig as FC} from "@playwright/test"

async function globalSetup( FC) {
    process.env.MAF_URL = "https://onprem:6201/eamportal"
   }

export default globalSetup