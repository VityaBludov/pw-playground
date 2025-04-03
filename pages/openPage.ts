import { Locator, Page } from '@playwright/test'

export class OpenPage {
    readonly page: Page
    private readonly dynamicIdPageLink: Locator

    constructor(page: Page) {
        this.page = page
        this.dynamicIdPageLink = this.page.getByRole('link', {
            name: 'Dynamic ID',
        })
    }

    async dynamicIdPage() {
        await this.dynamicIdPageLink.click()
    }
}
