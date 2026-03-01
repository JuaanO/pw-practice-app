import { test, expect } from "@playwright/test";
import { using } from "rxjs";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})


test.describe('Form layouts page', () => {

    test.beforeEach(async ({page}) => {
        await page.getByRole('link', {name: 'Forms'}).click();
        await page.getByRole('link', {name: 'Form Layouts'}).click();
    })

    test('Input fields', async ({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test2.com', {delay: 666})

        //Generic assertion

        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test2.com')

        //Locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test2.com')


    })

    test('Radio buttons', async ({page}) => {
        const usingTheGrid = page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingTheGrid.getByLabel('Option 1').click({force:true})
        
        await usingTheGrid.getByRole('radio', {name: 'Option 1'}).click({force:true})
        const radioStatus = await usingTheGrid.getByRole('radio', {name: 'Option 1'}).isChecked()

        expect(radioStatus).toBeTruthy()

        await expect(await usingTheGrid.getByRole('radio', {name: 'Option 1'})).toBeChecked()

        await usingTheGrid.getByRole('radio', {name: 'Option 2'}).click({force:true})
        await expect(await usingTheGrid.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
        await expect(await usingTheGrid.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy()



    })
})

test.describe('Form Modal & Overlays page', () => {
    test.beforeEach(async ({page}) => {
        await page.getByRole('link', {name: 'Modal & Overlays'}).click();
        await page.getByRole('link', {name: 'Toastr'}).click();
    })

    test('Checkboxes', async ({page}) => {

        const checkbox = await page.locator('.custom-checkbox').nth(0)
        const checkboxByRole = page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'})


        await checkbox.click({force: true})
        await checkboxByRole.click({force: true})

        //await page.getByRole('checkbox', {name: 'SHOW TOAST'}).click

    })

})