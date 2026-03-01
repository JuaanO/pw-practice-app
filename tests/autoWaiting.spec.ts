import { test, expect } from "@playwright/test";

    test.beforeEach(async({page}) =>{
        await page.goto('http://uitestingplayground.com/ajax')
        //await page.getByRole('button', {name: 'Button Triggering AJAX Request'}).click()

    })


    test.describe('New test suite', () => {


        test('Test AJAX', async ({page}) => {

            //maximun of time of test
            test.slow()
            await page.getByText('Button Triggering AJAX Request').click({timeout:20000})

            const successMessage = page.locator('.bg-success')
            const text = await successMessage.textContent()


            //Wait for default 30 seconds 
            await successMessage.click()
            //await successMessage.waitFor({state: 'visible'})
            //expect(text).toContain('Data loaded with AJAX get request.')

            await expect(successMessage).toHaveText('Data loaded with AJAX get request.', {timeout:20000})

        })
    })