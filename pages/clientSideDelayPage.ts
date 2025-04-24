import { expect, Locator, Page } from '@playwright/test'

export class ClientSideDelayPage {
    readonly page: Page
    readonly triggerButton: Locator
    readonly successMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.triggerButton = this.page.locator('.btn-primary')
        this.successMessage = this.page.locator('.bg-success')
    }

    async clickTriggerButton(timeout: number) {
        await expect(this.triggerButton, 'Trigger button should be visible').toBeVisible()
        await this.triggerButton.click()
        await this.successMessage.waitFor({ state: 'attached', timeout: timeout })
    }
}
