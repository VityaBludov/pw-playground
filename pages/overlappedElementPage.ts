import { expect, Locator, Page } from '@playwright/test'

export class OverlappedElementPage {
    readonly page: Page
    readonly nameField: Locator

    constructor(page: Page) {
        this.page = page
        this.nameField = this.page.getByPlaceholder('Name')
    }

    async inputName(name: string) {
        // await this.nameField.evaluate(e => e.scrollTop =+ 50)
        await this.nameField.hover()
        await this.page.mouse.wheel(0, 5)
        await expect(this.nameField, 'Name input field should be visible').toBeInViewport()
        await this.nameField.fill(name)
    }
}
