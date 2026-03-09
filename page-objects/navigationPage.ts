import { Locator, Page } from "@playwright/test";

export class NavigationPage {

    readonly page: Page 
    readonly formLayoutsPageMenuItem: Locator
    readonly datePickerPageMenuItem: Locator
    readonly smartTablePageMenuItem: Locator
    readonly toastToPageMenuItem: Locator
    readonly toolTipPageMenuItem: Locator

    constructor (page: Page){

        this.page = page
        this.formLayoutsPageMenuItem = page.getByRole('link', {name: 'Form Layouts'})
        this.datePickerPageMenuItem = page.getByRole('link', {name: 'DatePicker'})
        this.smartTablePageMenuItem = page.getByRole('link', {name: 'Smart Table'})
        this.toastToPageMenuItem = page.getByRole('link', {name: 'Toastr'})
        this.toolTipPageMenuItem = page.getByRole('link', {name: 'Tooltip'})
    }

    async formLayoutsPage(){
        
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutsPageMenuItem.click();
    }

    async datePickerPage(){

        await this.selectGroupMenuItem('Forms')
        await this.datePickerPageMenuItem.click();
    }

    async smartTablePage(){

        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTablePageMenuItem.click();    
    }

    async toastToPage(){
        
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastToPageMenuItem.click();
    }

    async toolTipPage(){

        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toolTipPageMenuItem.click();
    }

    private async selectGroupMenuItem(groupItemTitle: string){

        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')

        if (expandedState == 'false'){
            await groupMenuItem.click()
        }
    }
}