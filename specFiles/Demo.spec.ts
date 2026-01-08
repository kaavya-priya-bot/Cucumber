import {chromium, test} from "@playwright/test"

test(`ddbfs`,async()=>{
    const browser=await chromium.launch();
    const page= await browser.newPage();
    await page.goto(`https://www.google.com/`);
    await page.waitForTimeout(2000);
    await page.close();
    await browser.close();
})
test.only(`demo`,{tag :["@fjgf"]},async({page})=>{
    await page.goto(`file:///C:/Users/kaavy/OneDrive/Desktop/example.html`);
    await page.waitForTimeout(2000);
    //await page.locator(`h3:text('Product 1')+button`).click();
    await page.locator(`li>h3:text('Product 1')+button`).click();
    //await page.locator(`li`).filter({hasText:`Product 1`}).locator(`button`).click();
    //await page.locator(`li`).filter({has: page.locator(`h3:text('Product 1')`)}).locator(`button`).click();
    await page.waitForTimeout(2000);
   
})