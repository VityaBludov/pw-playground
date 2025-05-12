import { expect, Locator, Page } from '@playwright/test'

export class NonBreakingSpacePage {
    readonly page: Page
    readonly button: Locator

    constructor(page: Page) {
        this.page = page
        this.button = this.page.getByRole('button', { name: 'My Button' }) // works because PW normalizes whitespaces
    }

    async clickButton() {
        await expect(this.button, 'Button with non-breaking space should be visible').toBeVisible()
        await this.button.click()
    }
}
