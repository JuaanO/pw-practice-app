import { Page, expect } from "@playwright/test";

export class DatePickerPage {

    private readonly page: Page

    constructor (page: Page){
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){

        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDayInTheCalendar(numberOfDaysFromToday)

        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday:number){

        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const dateToAssertStart = await this.selectDayInTheCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDayInTheCalendar(endDayFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInputField).toHaveValue(dateToAssert)

    }

    private async selectDayInTheCalendar(numberOfDaysFromToday: number){

        let date = new Date()
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

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expecteDate, {exact: true}).click()
        return dateToAssert
    }
}