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

        await expect(page.locator('.page_heading', {hasText: 'Drag And Drop'})).toHaveText('Drag And Drop')


    })
})