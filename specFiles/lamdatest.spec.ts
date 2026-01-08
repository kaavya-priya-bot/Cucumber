import { test, chromium } from "@playwright/test"

const capabilities = {
    browserName: "Chrome", // Browsers allowed: 'Chrome', 'MicrosoftEdge', 'pw-chromium', 'pw-firefox' and 'pw-webkit'
    browserVersion: "latest",
    "LT:Options": {
        platform: "Windows 10",
        build: "Playwright Build",
        name: "Playwright Demo",
        user: "kaavya.priya.kp",
        accessKey: "LT_tLkQ8DJknxqpIK8SgrXAqM4ENVHT5mOWVOMUS3faoTWMptS",
        network: true,
        video: true,
        console: true,
        tunnel: false,
        tunnelName: "",
        Geolocation: '',
        visuals: true
    },
}
let browser:any;
let context:any;
let page:any;
test('Demo', async ({ }, testInfo) => {

    browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`)
    //const browser=await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage()
    await page.goto('https://www.bing.com')
    //await page.waitForEvent(`domcontentloaded`);
    await page.waitForTimeout(2000);
    
   
})

test.afterAll(``,async({},testInfo)=>{
const testStatus = {
        action: "setTestStatus",
        arguments: {
            status: `${testInfo.status}`,
            remark: "MFJHBGD",
        },
    };
    await page.evaluate(() => { },
        `lambdatest_action: ${JSON.stringify(testStatus)}`
    )
     await page.close();
    await context.close();
    await browser.close();

})