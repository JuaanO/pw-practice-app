import { Page } from "@playwright/test";

export class FormLayoutsPage {

    private readonly page: Page

    constructor (page: Page){
        this.page = page
    }

    /**
     * Thist method will out the grid form with user details
     * @param email - Should be email valid
     * @param password - Should comply with the polices
     * @param option - To Check radiobutton
     */
    async submitUsingTheGridFormWithCredentials (email: string, password: string, option: string){
        
        const usingTheGridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: 'Password'}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: option}).check({force:true})
        await usingTheGridForm.getByRole('button', {name: 'SIGN IN'}).click()
    }
    
    async submitUsingInLineFormWithCredentials (email: string, name: string, remenberMe: boolean){
        
        const usingInLineForm = this.page.locator('nb-card', {hasText: 'Inline form'})
        await usingInLineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(name)
        await usingInLineForm.locator('form').filter({ hasText: 'Remember meSubmit' }).getByPlaceholder('Email').fill(email)

        if(remenberMe)
            await usingInLineForm.getByRole('checkbox').check({force:true})
        await usingInLineForm.getByRole('button', {name: 'Submit'}).click()
    }
}