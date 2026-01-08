
import { Before,After, BeforeAll, AfterAll, Status, AfterStep } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { pageFixtureVar } from "./pageFixtureFile";

const capabilities = {
    browserName: "pw-firefox", // Browsers allowed: 'Chrome', 'MicrosoftEdge', 'pw-chromium', 'pw-firefox' and 'pw-webkit'
    browserVersion: "latest",
    "LT:Options": {
        platform: "Windows 10",
        build: "Playwright Build",
        name: "Playwright Cucumber",
        user: "kaavya.priya.kp",
        accessKey: "LT_tLkQ8DJknxqpIK8SgrXAqM4ENVHT5mOWVOMUS3faoTWMptS",
        network: true,
        video: true,
        console: true,
        tunnel: false,
        tunnelName: "",
        Geolocation: '',
        visual: true
    },
}
let browser: Browser;
let context: BrowserContext;
let page: Page;
/* BeforeAll(async function(){
    //browser = await chromium.launch({ headless: false,timeout:50000 });
    browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`);
}); */
Before(async function () {
    browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`);

    context = await browser.newContext({viewport: { width: 1920, height: 1080 }});
        page = await context.newPage();
       pageFixtureVar.page = page;
});
 AfterStep(async function ({pickle,result}) {
    const img= await pageFixtureVar.page.screenshot({path:`./test-results/screenshot/${pickle.name+Date.now()}.png`,type:'png',fullPage:true});
    this.attach(img, 'image/png'); }); 

After(async function ({pickle,result}) {
    /* if (result?.status === Status.FAILED) {
    const img= await pageFixtureVar.page.screenshot({path:`./test-results/screenshot/${pickle.name+Date.now()}.png`,type:'png',fullPage:true});
    this.attach(img, 'image/png');} */
    const testStatus = {
        action: "setTestStatus",
        arguments: {
            status: `${result?.status}`,
            remark: "MFJHBGD",
        },
    };
    await page.evaluate(() => { },
        `lambdatest_action: ${JSON.stringify(testStatus)}`
    )
    await pageFixtureVar.page.close();
    await context.close();
    await browser.close();
});
/* AfterAll(async function(){
    await browser.close();
}); */