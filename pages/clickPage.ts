import { expect, Locator, Page } from '@playwright/test'

export class ClickPage {
    readonly page: Page
    readonly blueButton: Locator
    readonly greenButton: Locator

    constructor(page: Page) {
        this.page = page
        this.blueButton = this.page.locator('.btn-primary')
        this.greenButton = this.page.locator('.btn-success')
    }

    async clickBlueButton() {
        await expect(this.blueButton, 'Blue button should be visible').toBeVisible()
        await this.blueButton.click()
    }
}
