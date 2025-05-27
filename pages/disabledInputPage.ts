import { expect, Locator, Page } from '@playwright/test'

export class DisabledInputPage {
    readonly page: Page
    readonly inputField: Locator
    readonly enableButton: Locator
    readonly inforMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.inputField   = this.page.locator('#inputField')
        this.enableButton = this.page.getByRole('button', { name: 'Enable Edit Field with 5 seconds delay' })
        this.inforMessage = this.page.locator('#opstatus', { hasText: 'Value changed to:' })
    }

    async clickEnableButton() {
        await expect(this.enableButton, 'Enable button should be visible').toBeVisible()
        await this.enableButton.click()
    }

    async inputText(text: string, timeout: number) {
        await this.inputField.fill(text, { timeout: timeout })
        await this.page.mouse.click(0, 0) // user input not applied until focus moved outside input field
    }
}
