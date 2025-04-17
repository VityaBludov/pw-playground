import { expect, Locator, Page } from '@playwright/test'

export class AjaxDataPage {
    readonly page: Page
    readonly ajaxButton: Locator
    readonly successMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.ajaxButton = this.page.locator('#ajaxButton')
        this.successMessage = this.page.locator('.bg-success')
    }

    async clickAjaxButton() {
        await expect(this.ajaxButton, 'AJAX button should be visible').toBeVisible()
        await this.ajaxButton.click()
    }
}
