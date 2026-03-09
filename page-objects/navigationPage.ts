import { Page } from "@playwright/test";

export class NavigationPage {

    readonly page : Page 
    
    constructor (page: Page) {
        this.page = page
    }

    async fomrLayoutsPage (){
        
        await this.page.getByRole('link', {name: 'Forms'}).click();
        await this.page.getByRole('link', {name: 'Form Layouts'}).click();
    }
}