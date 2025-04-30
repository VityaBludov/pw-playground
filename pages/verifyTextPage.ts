import { Locator, Page } from '@playwright/test'

export class VerifyTextPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async getElementByText(text: string): Promise<Locator> {
        return this.page.getByText(text)
    }
}
