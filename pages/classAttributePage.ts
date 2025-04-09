import { expect, Locator, Page } from '@playwright/test'

export class ClassAttributePage {
    readonly page: Page
    readonly primaryButton: Locator
    // readonly popupPromise: Promise<Page>

    constructor(page: Page) {
        this.page = page
        this.primaryButton = this.page.locator('.btn-primary')
        // this.popupPromise = this.page.waitForEvent('popup')
    }

    async clickPrimaryButton() {
        await expect(
            this.primaryButton,
            'Primary button not visible'
        ).toBeVisible()
        await this.primaryButton.click()
    }

    async clickPopupButton() {
        this.page.on('dialog', (dialog) => dialog.accept())
    }
}
