import { expect, Locator, Page } from '@playwright/test'

export class VerifyTextPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async getElementByText(text: string): Promise<Locator> {
        // TODO: implementation required
        let result = this.page.getByText(text)
        return result
    }
}
