
import { Before, After, BeforeAll, AfterAll, Status, AfterStep } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { pageFixtureVar } from "./pageFixtureFile";
import { createLogger } from "winston";
import * as fs from "fs";
import { options } from "../helpers/logger";

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
Before(async function ({ pickle }) {
    browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`);
    //browser = await chromium.launch({ headless: false, timeout: 50000 });
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        recordVideo: {
            dir: "results/videos",
        },
        viewport: { width: 1920, height: 1080 }
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true,
    });
    //context = await browser.newContext({viewport: { width: 1920, height: 1080 }});
    page = await context.newPage();
    pageFixtureVar.page = page;
    pageFixtureVar.logger = createLogger(options(scenarioName));

});
AfterStep(async function ({ pickle, result }) {
    const img = await pageFixtureVar.page.screenshot({ path: `./results/screenshot/${pickle.name + Date.now()}.png`, type: 'png', fullPage: true });
    this.attach(img, 'image/png');
});

After(async function ({ pickle, result }) {
    let videoPath: string;
    let img: Buffer;
    const path = `./results/trace/${pickle.id}.zip`;
    if (result?.status == Status.PASSED) {
        img = await pageFixtureVar.page.screenshot(
            { path: `./results/screenshots/${pickle.name}.png`, type: "png" })
        videoPath = await pageFixtureVar.page.video()?.path();
        //videoPath='./test-results/videos';
    }
    console.log(videoPath);
    
    await context.tracing.stop({ path: path });
    if (result?.status == Status.PASSED) {
        this.attach(
            img, "image/png"
        );
        this.attach(
            fs.readFileSync(videoPath),
            'video/webm'
        );
        const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`
        this.attach(`Trace file: ${traceFileLink}`, 'text/html');
    }
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
AfterAll(async function(){
    pageFixtureVar.logger.close();
});