import test, { expect } from "@playwright/test";

test.describe('Suite of my first test', () => {

    test.beforeEach(async({page}) =>{
        await page.goto('http://localhost:4200/pages/iot-dashboard')

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