import { Locator, Page } from "@playwright/test";

export class LoadDelayPage {
    readonly page: Page
    readonly delayedButton: Locator

    constructor(page: Page) {
        this.page = page
        this.delayedButton = this.page.getByRole('button', { name: 'Button Appearing After Delay' })
    }
}
