/*
    playwright hooks
    ------------------

    beforeEach = This hook is executed before each individual test
    afterEach = This hook is executed after each individual test
    beforeAll = This hook is executed only once before any of the tests start running
    afterAll: This hook is executed only once after all the tests have been run
 
*/

import {test, expect} from '@playwright/test';


test ("Home Page Test", async({page})=>{

    await page.goto("https://demoblaze.com/");
    await page.waitForTimeout(3000);

    //Login
    await page.locator("#login2").click();
    await page.waitForTimeout(1000);

    await page.locator("#loginusername").fill("niaz@94");
    await page.locator("#loginpassword").fill("123456");
    await page.waitForTimeout(1000);

    await page.locator("//button[normalize-space()='Log in']").click();
    await page.waitForTimeout(1000);

    //Home Page Test
    //finding out total number products in the webpage
    await page.waitForSelector('.hrefch');
    const totalProducts = await page.$$('.hrefch');
    expect(totalProducts).toHaveLength(9); 

    //Logout
    await page.locator("#logout2").click();
    await page.waitForTimeout(1000);

});


test ("Add Product to Cart Test", async({page})=>{
    
    await page.goto("https://demoblaze.com/");
    await page.waitForTimeout(3000);

    //Login
    await page.locator("#login2").click();
    await page.waitForTimeout(1000);

    await page.locator("#loginusername").fill("niaz@94");
    await page.locator("#loginpassword").fill("123456");
    await page.waitForTimeout(1000);

    await page.locator("//button[normalize-space()='Log in']").click();
    await page.waitForTimeout(1000);

    //Add Product to Cart Test
    await page.locator("//a[normalize-space()='Samsung galaxy s6']").click();
    await page.waitForTimeout(1000);
    await page.locator("//a[normalize-space()='Add to cart']").click();
    await page.waitForTimeout(1000);

    
    page.on("dialog", async dialog => {   //handling the alert & performing assertion

        expect(dialog.message()).toContain("Product added.");
        await dialog.accept();

    });

    //Logout
    await page.locator("#logout2").click();
    await page.waitForTimeout(1000);
    
});