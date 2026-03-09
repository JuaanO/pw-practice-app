import { Page, expect } from "@playwright/test";

export class DatePickerPage {

    private readonly page: Page

    constructor (page: Page){
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){

        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()

        let date = new Date()
        date.getDate()
        date.setDate(date.getDate() + numberOfDaysFromToday)

        const expecteDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleDateString('En-US', {month:'short'})
        const expectedMonthLong = date.toLocaleDateString('En-US', {month:'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expecteDate}, ${expectedYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `

        while (!calendarMonthAndYear.includes(expectMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expecteDate, {exact: true}).click()
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }
}