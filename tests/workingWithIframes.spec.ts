import { test, expect } from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('https://www.globalsqa.com/')
})

test.describe('Drag and drop & Iframes', () => {
    
    test('DragAndDrop', async ({page}) => {

        const consentButton = page.getByRole('button', { name: 'Consent' })
        await consentButton.click()

        const menuButton = page.getByRole('link', { name: 'Tester’s Hub' })
        await menuButton.hover()

        const dragAndDropMenu = page.getByRole('link', { name: 'Demo Testing Site' })
        await dragAndDropMenu.hover()

        const dragAndDropOption = page.getByRole('link', { name: 'Drag And Drop' })
        await dragAndDropOption.click()

        //await expect(page.locator('.page_heading', {hasText: 'Drag And Drop'})).toHaveText('Drag And Drop')

        const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
        await frame.locator('li', { hasText: 'High Tatras 2' }).dragTo(frame.locator('#trash'))

        //more presice control
        await frame.locator('li', { hasText: 'High Tatras 4' }).hover()
        await page.mouse.down()
        await frame.locator('#trash').hover()
        await page.mouse.up()

        await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4'])
        
    })
})