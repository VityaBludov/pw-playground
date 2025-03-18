import { Page } from '@playwright/test'
import { DynamicIdPage } from './dynamicIdPage'

export class PageManager {
    private readonly page: Page
    private readonly dynamicIdPage: DynamicIdPage

    constructor(page: Page) {
        this.page = page
        this.dynamicIdPage = new DynamicIdPage(this.page)
    }

    onDynamicIdPage() {
        return this.dynamicIdPage
    }
}
