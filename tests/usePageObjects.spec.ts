import { test } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatePickerPage } from "../page-objects/datePickerPage";

test.beforeEach(async({page}) =>{
    await page.goto('http://localhost:4200/')
})

test('Navigate to form page', async ({page}) => {

    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastToPage()
    await navigateTo.toolTipPage()
})

test('Parametrized method using the grid form', async ({page}) => {
    
    const navigateTo = new NavigationPage(page)
    const formlayoutspage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await formlayoutspage.submitUsingTheGridFormWithCredentials('juanito@gmail.es','*******', 'Option 1')
})

test('Parametrized method using inline form', async ({page}) => {
    
    const navigateTo = new NavigationPage(page)
    const formlayoutspage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await formlayoutspage.submitUsingInLineFormWithCredentials('juanito@gmail.es','Juan Jose', false)

})

test('DatePicker', async ({page}) => {
    
    const navigateTo = new NavigationPage(page)
    const datePickerPage = new DatePickerPage(page)
    
    await navigateTo.datePickerPage()
    await datePickerPage.selectCommonDatePickerDateFromToday(40)
})