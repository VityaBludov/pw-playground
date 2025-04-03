import { Page } from '@playwright/test'
import { OpenPage } from './openPage'

export class PageManager {
    private readonly page: Page
    readonly openPage: OpenPage

    constructor(page: Page) {
        this.page = page
        this.openPage = new OpenPage(this.page)
    }

    open() {
        return this.openPage
    }
}
