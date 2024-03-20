//in this test file we have implemented beforeEach & afterEach hooks

import {test, expect} from '@playwright/test';
import { beforeEach } from 'node:test';

let page; //making page a global variable so that we can access it in every test

test.beforeEach (async ({browser}) => {

    /*creating page fixtur using browser fixture since since we cannot use page fixture
    directly in the hooks. we will use the new page fixture in our whole test*/
    page = await browser.newPage();   

    await page.goto("https://demoblaze.com/");
    await page.waitForTimeout(1000);

    //Login
    await page.locator("#login2").click();
    await page.waitForTimeout(1000);

    await page.locator("#loginusername").fill("niaz@94");
    await page.locator("#loginpassword").fill("123456");
    await page.waitForTimeout(1000);

    await page.locator("//button[normalize-space()='Log in']").click();
    await page.waitForTimeout(1000);

});

test.afterEach (async ()=>{
    /*we did not create any page nor we used browser fixture since we will
    use the previously declared page fixture throughout the test. that's why
    we kept the async function empty this time*/

    await page.locator("#logout2").click();
    await page.waitForTimeout(1000);


});

test ("Test 1: Home Page Test", async () =>{
    //finding out total number products in the webpage
    await page.waitForSelector('.hrefch');
    const totalProducts = await page.$$('.hrefch');
    expect(totalProducts).toHaveLength(9);

});

test ("Test 2: Add Product to Cart Test", async()=>{
    await page.locator("//a[normalize-space()='Samsung galaxy s6']").click();
    await page.waitForTimeout(1000);
    await page.locator("//a[normalize-space()='Add to cart']").click();
    await page.waitForTimeout(1000);

    page.on("dialog", async dialog => {   //handling the alert & performing assertion

        expect(dialog.message()).toContain("Product added.");
        await dialog.accept();

    });

});