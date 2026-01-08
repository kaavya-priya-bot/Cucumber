import { Given, When, Then,setDefaultTimeout } from '@cucumber/cucumber';
import { pageFixtureVar } from "../../hooks/pageFixtureFile";
import { expect } from '@playwright/test';

setDefaultTimeout(60000);


Given('User is on Login page', async function () {
   
    await pageFixtureVar.page.goto('http://leaftaps.com/opentaps/control/main');
});

When('User enters valid username and password', async function () {
    await pageFixtureVar.page.fill('input#username', 'DemoSalesManager');
    await pageFixtureVar.page.fill('input#password', 'crmsfa');
});

When('User clicks on Login button', async function () {
    await pageFixtureVar.page.locator(`.decorativeSubmit`).click();
});
Then('User is navigated to the Dashboard page', async function () {
  await pageFixtureVar.page.waitForLoadState('networkidle');
  await expect(pageFixtureVar.page.locator(`//input[@value='Logout']`)).toBeVisible();
  console.log('Login Successful, Dashboard page is displayed');
});