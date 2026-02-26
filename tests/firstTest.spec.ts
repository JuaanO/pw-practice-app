import test, { expect } from "@playwright/test";
import { first } from "rxjs-compat/operator/first";



test.describe('Suite of my first test', () => {

    test.beforeEach(async({page}) =>{
        await page.goto('http://localhost:4200/')

    })
    test('Open page form', async ({page}) => {

        await page.getByRole('link', {name: 'Forms'}).click();
        await page.getByRole('link', {name: 'Form Layouts'}).click();
        await page.getByRole('textbox', {name: 'Jane Doe'}).nth(0).fill('Juan Jose');
        await page.getByRole('textbox', {name: 'Email'}).nth(0).fill('jjem@mm.com');
        await page.getByRole('button', {name: 'SUBMIT'}).nth(0).click();
        await expect(page.getByRole('button', {name: 'SIGN IN'}).nth(0)).toBeVisible();
        await page.screenshot({path: 'screenshots/xxx.png', fullPage: true});   
     
    }) 
    test('Open dialaog with component', async ({page}) => {

        await page.getByRole('link', {name: 'Modal & Overlays'}).click();
        await page.getByRole('link', {name: 'Dialog'}).nth(0).click();
        await page.getByRole('button', {name: 'OPEN DIALOG WITH COMPONENT'}).click();
        await expect(page.locator('xpath=//nb-card-body[contains(text(), "Lorem")]')).toBeVisible();
        await page.screenshot({path: 'screenshots/dialogs.png', fullPage: true});   
        await page.getByRole('button', {name: 'DISMISS DIALOG'}).click();     
    })

})

test.describe('Types of locators of available in playwright', () => {

    
    test.beforeEach(async({page}) =>{
        await page.goto('http://localhost:4200/')
        await page.getByRole('link', {name: 'Forms'}).click();
        await page.getByRole('link', {name: 'Form Layouts'}).click();

    })

    test('locators available: ', async ({page}) => {

        //By tag name
        await page.locator('input').nth(0).click()

        //By ID
        await page.locator('#inputEmail1').click()

        //By class value
        await page.locator('.shape-rectangle').nth(0).click()

        //By attribute
        await page.locator('[placeholder="Email"]').nth(0).click()

        //By class value (full)
        await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]').nth(0).click()

        //By combine differents selectors
        await page.locator('input[placeholder="Email"]').nth(0).click()

        //By Xpath
        await page.locator('//*[@id="inputEmail1"]').click()

        //By partial text match
        await page.locator(':text("Using")').click()

        //By exact text match
        await page.locator(':text-is("Using the Grid")').click()
    })
    

})