import {devices, PlaywrightTestConfig} from "@playwright/test"

export const config:PlaywrightTestConfig={
  //testDir:"src/tests/workflow",
  testMatch:"wf_kaleidoscope.spec.ts",
  use:{
    //baseURL:"https://apply.mykaleidoscope.com/program/sdet-test-scholarship",
    headless:false,
    video:"on",
    screenshot:"on",
    channel:"chrome"
  },
  fullyParallel:true,
  retries:0,
  workers:50,
  projects:[
    {name:"chromium", use:{...devices["Desktop Chrome"]},},
  ],
  reporter:[
    ["html",{open:"always"}],
    ["line"]
  ]
}