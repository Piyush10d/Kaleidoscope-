import {devices, PlaywrightTestConfig,defineConfig} from "@playwright/test"


export default defineConfig({
  //testDir:"src/tests/workflow",
  timeout:60000*5,
  testMatch:"wf_kaleidoscope.spec.ts",
  
  use:{
    headless:false,
    video:"on",
    screenshot:"on",
    channel:"chrome"
  },
  fullyParallel:true,
  retries:1,
  workers:50,
  projects:[
    {name:"chromium", use:{...devices["Desktop Chrome"]},},
  ],
  reporter:[
    ['html',{outputFolder:'Playwright-HTMLreport',open:'always'}],
    ["line"],
  ],
})