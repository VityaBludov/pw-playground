import { expect, Locator, Page } from '@playwright/test'

export class ScrollbarsPage {
    readonly page: Page
    readonly button: Locator

    constructor(page: Page) {
        this.page = page
        this.button = this.page.getByRole('button', { name: 'Hiding Button' })
    }

    async scrollAndClickButton() {
        await this.button.scrollIntoViewIfNeeded()
        await expect(this.button, 'Button should be scrolled into viewport').toBeInViewport()
        await this.button.click()
    }
}
