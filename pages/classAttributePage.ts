import { expect, Locator, Page } from '@playwright/test'

export class ClassAttributePage {
    readonly page: Page
    readonly primaryButton: Locator
    alertMessage: string

    constructor(page: Page) {
        this.page = page
        this.primaryButton = this.page.locator('.btn-primary')
        this.alertMessage = ''
    }

    async clickPrimaryButton() {
        await expect(this.primaryButton, 'Primary button should be visible').toBeVisible()
        await this.primaryButton.click()
    }

    async handleAlert() {
        this.page.on('dialog', (dialog) => {
            this.alertMessage = dialog.message()
            dialog.accept()
        })
    }
}
