import { Given, setDefaultTimeout, Then } from '@cucumber/cucumber';
import { Browser, chromium, Page } from '@playwright/test';
import { pageFixtureVar } from '../../hooks/pageFixtureFile';
setDefaultTimeout(60000);

Given('User is on Home page', async function () {
    await pageFixtureVar.page.goto('http://leaftaps.com/opentaps/control/main');

});

Then('Home page is loaded successfully', async function () {
    //await expect(page).toHaveTitle('Your Store');
    console.log(await pageFixtureVar.page.title());
    
});