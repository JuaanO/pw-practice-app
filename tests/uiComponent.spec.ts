import { test, expect } from "@playwright/test";

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

        const allCheckBoxes = page.getByRole('checkbox')

        for (const box of await allCheckBoxes.all()) {
            await box.uncheck({force: true})
            expect(await box.isChecked()).toBeFalsy()
        }

        for (const box of await allCheckBoxes.all()) {
            await box.check({force: true})
            expect(await box.isChecked()).toBeTruthy()
        }

    })


    test('lists ', async ({page}) => {

        const menuButton = page.locator('ngx-header nb-select')
        await menuButton.click()

        const optionList = page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(["Light", "Dark", "Cosmic","Corporate"])
        
        await optionList.filter({hasText: 'Cosmic'}).click()

        const headerColor = await page.locator('nb-layout-header')
        await expect(headerColor).toHaveCSS('background-color', 'rgb(50, 50, 89)')

        // const button = page.getByRole('button', { name: /Light/i })
        // await button.click()
        // const buttonDark = page.getByText('Dark')
        // await buttonDark.click()
        // await buttonDark.click()
        // const buttonCosmic = page.getByText('Cosmic')
        // await buttonCosmic.click()

        await menuButton.click()

        const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)"
        }

        for (const color in colors){
            await optionList.filter({hasText: color}).click()
            await expect(headerColor).toHaveCSS('background-color',colors[color])
            if (color != "Corporate") {
                await menuButton.click()
            }
        }
    })


})


test.describe('Tooltips and Dialogs', () => {
    
test.beforeEach(async ({page}) => {
await page.getByRole('link', {name: 'Modal & Overlays'}).click();
await page.getByRole('link', {name: 'Tooltip'}).click();
})

    test('Tooltips', async ({page}) =>{


        const tooltipCard = page.locator('nb-card', {hasText: 'Colored Tooltips'})
        await tooltipCard.getByRole('button', {name: 'Warning'}).hover()

        const tooltipMessage = await page.locator('nb-tooltip').textContent()
        expect(tooltipMessage).toEqual('This is a tooltip')
        
    })



})


test.describe('Dialogs', () => {
    
    test.beforeEach(async ({page}) => {
    await page.getByRole('link', {name: 'Tables & Data'}).click();
    await page.getByRole('link', {name: 'Smart Table'}).click();
    })

    test('Dialoags for browser', async ({page}) => {


        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept();
        })
        
        const titleModule = (await page.locator('nb-card-header', {hasText: 'Smart Table'}).textContent()).toLowerCase()
        await expect(titleModule).toContain('table')


        const allButtonsDelete = page.locator('.nb-trash')
        await allButtonsDelete.first().click()
        //await allButtonsDelete.locator()


        const firstButton = page.getByRole('table').locator('tr', {hasText: 'fat@yandex.ru'}).locator('.nb-trash')

        await firstButton.click()
    })

    test('Edit a record of table', async ({page}) => {

        const recordToEdit = await page.getByRole('table').locator('tr', {hasText: 'barbara@yandex.ru' }).locator('.nb-edit')

        await recordToEdit.click()
    
        const nuevoCampo = page.locator('input-editor').getByPlaceholder('E-mail')

        await nuevoCampo.clear()

        const fieldToEdit1 = page.locator('input-editor').getByPlaceholder('E-mail')

        await fieldToEdit1.fill('juan.jose@gmail.com')

        const saveAcction = await page.locator('.nb-checkmark')

        await saveAcction.click()

        await page.locator('.ng2-smart-page-link').getByText('2').click()

        const targetRowByID = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')})

        await targetRowByID.locator('.nb-edit').click() 

        await nuevoCampo.clear()
        
        await fieldToEdit1.fill('juan.jose@gmail.com')

        await saveAcction.click()

        await expect(targetRowByID.locator('td').nth(5)).toContainText('jose')

        await expect(targetRowByID.locator('td').nth(5)).toHaveText('juan.jose@gmail.com')

    })

    test('Filter fields and verify', async ({page}) => {

        const ages = [ "20", "40", "200"]

        for ( let age of ages ){
            await page.getByRole('textbox', { name: 'Age' }).clear()
            await page.getByRole('textbox', { name: 'Age' }).fill(age)

            await page.waitForTimeout(500)

            const ageRows = page.locator('tbody tr')

            for ( let row of await ageRows.all()){
                const cellValue = await row.locator('td').last().textContent()
                if ( age == '200') {
                    expect(await page.getByRole('table').textContent()).toContain('No data found')
                }

            }
        }


    })

    


})

test.describe('DataPicker', () => {
    
test.beforeEach(async ({page}) => {
await page.getByRole('link', {name: 'Forms'}).click();
await page.getByRole('link', {name: 'DatePicker'}).click();
})


    test('Verify that we are in datepicker section', async ({page}) =>{

        await expect(page.locator('nb-card').getByText('Common Datepicker')).toContainText('Common Datepicker')
    })


    test('Select a date and verify the value in datepicker manual', async ({page}) => {

        const datePicket = page.locator('nb-card').getByPlaceholder('Form Picker')

        await datePicket.click()

        const daySelected = page.locator('nb-calendar-picker').locator('.cell-content', {hasText: '9'}).first()

        await daySelected.click()

        await expect(datePicket).toHaveValue('Mar 9, 2026')

        //By Professor..

        const calendarInputField = page.getByPlaceholder('Form Picker')

        await calendarInputField.click()

        await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()

        await expect(calendarInputField).toHaveValue('Mar 1, 2026')


    })

    test('Select a date dinamically, from datepicker', async ({page}) => {

        const calendarInputField = page.getByPlaceholder('Form Picker')

        await calendarInputField.click()

        let date = new Date()
        date.getDate()
        date.setDate(date.getDate() + 2000)

        const expecteDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleDateString('En-US', {month:'short'})
        const expectedMonthLong = date.toLocaleDateString('En-US', {month:'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expecteDate}, ${expectedYear}`

        let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        const expectMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `

        while (!calendarMonthAndYear.includes(expectMonthAndYear)) {
            await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        }

        await page.locator('[class="day-cell ng-star-inserted"]').getByText(expecteDate, {exact: true}).click()

        await expect(calendarInputField).toHaveValue(dateToAssert)
    })
})


test.describe('Sliders', () => {

    test('Working with Sliders', async ({page}) => {

        //const switchButtonTemperature = page.locator('.power-icon').nth(0)
        //await switchButtonTemperature.click()

        const tempGaugeWithNode = page.locator('svg > g > circle').first()
        await tempGaugeWithNode.evaluate( node => {

            node.setAttribute('cx', '232.630')
            node.setAttribute('cy', '232.630')
        })

        await tempGaugeWithNode.click()

        await expect(page.locator('[class="value temperature h1"]').first()).toContainText('30')


        //Update attributes
        const tempGauge = await page.locator('.svg-container > svg').first()
        //await tempGauge.click()
        await tempGauge.scrollIntoViewIfNeeded()

        const box = await tempGauge.boundingBox()
        const x = box.x + box.width / 2
        const y = box.y + box.height / 2

        await page.mouse.move(x, y)
        await page.mouse.down()
        await page.mouse.move(x + 100, y)
        await page.mouse.move(x + 100, 100 + y)
        await page.mouse.up()

        await expect(page.locator('[class="value temperature h1"]')).toContainText('30')

    })
})

