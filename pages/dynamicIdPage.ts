import { Page } from '@playwright/test'

export class DynamicIdPage {
    readonly page: Page
    // add locators as class members

    constructor(page: Page) {
        this.page = page
        // initialize locators
    }
}
