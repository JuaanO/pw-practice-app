import { test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager.spec";

test.beforeEach(async({page}) =>{
    await page.goto('http://localhost:4200/')
})

test('Navigate to form page', async ({page}) => {

    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastToPage()
    await pm.navigateTo().toolTipPage()
})

test('Parametrized method using the grid form', async ({page}) => {

    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentials('juanito@gmail.es','*******', 'Option 1')
})

test('Parametrized method using inline form', async ({page}) => {

    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingInLineFormWithCredentials('juanito@gmail.es','Juan Jose', false)

})

test('DatePicker', async ({page}) => {
    
    const pm = new PageManager(page)
    await pm.navigateTo().datePickerPage()
    await pm.onThePickePage().selectCommonDatePickerDateFromToday(10)
    await pm.onThePickePage().selectDatePickerWithRangeFromToday(2, 6)
})

