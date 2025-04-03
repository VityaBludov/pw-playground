import { expect, Locator, Page } from '@playwright/test'

export class DynamicIdPage {
    readonly page: Page
    private readonly dynamicIdButton: Locator

    constructor(page: Page) {
        this.page = page
        this.dynamicIdButton = this.page.getByRole('button')
    }

    async clickButton() {
        await expect(this.dynamicIdButton).toHaveText('Button with Dynamic ID')
        await this.dynamicIdButton.click()
    }
}
