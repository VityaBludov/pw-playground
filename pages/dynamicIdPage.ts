import { expect, Locator, Page } from '@playwright/test'

export class DynamicIdPage {
    readonly page: Page
    readonly dynamicIdButton: Locator

    constructor(page: Page) {
        this.page = page
        this.dynamicIdButton = this.page.getByRole('button')
    }

    async clickButton() {
        await expect(
            this.dynamicIdButton,
            'Button with Dynamic ID not visible'
        ).toBeVisible()
        await this.dynamicIdButton.click()
    }
}
