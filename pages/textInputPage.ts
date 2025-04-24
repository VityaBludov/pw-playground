import { expect, Locator, Page } from '@playwright/test'

export class TextInputPage {
    readonly page: Page
    readonly inputField: Locator
    readonly renameableButton: Locator

    constructor(page: Page) {
        this.page = page
        this.inputField = this.page.getByRole('textbox')
        this.renameableButton = this.page.getByRole('button')
    }

    async inputButtonName(name: string) {
        await expect(this.inputField, 'Text input field should be visible').toBeVisible()
        await expect(this.renameableButton, 'Button to be renamed should be visible').toBeVisible()
        await this.inputField.fill(name)
        await this.renameableButton.click()
    }
}
