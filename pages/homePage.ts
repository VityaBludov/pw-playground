import { Locator, Page } from '@playwright/test'

export class HomePage {
    readonly page: Page
    private readonly dynamicIdPageLink: Locator
    private readonly classAttributePageLink: Locator

    constructor(page: Page) {
        this.page = page
        this.dynamicIdPageLink = this.page.getByRole('link', {
            name: 'Dynamic ID',
        })
        this.classAttributePageLink = this.page.getByRole('link', {
            name: 'Class Attribute',
        })
    }

    async openDynamicIdPage() {
        await this.dynamicIdPageLink.click()
    }

    async openClassAttributePage() {
        await this.classAttributePageLink.click()
    }
}
