import { expect, Locator, Page } from '@playwright/test'

export class MouseOverPage {
    readonly page: Page
    readonly firstLink: Locator
    readonly firstLinkCounter: Locator
    readonly secondLink: Locator
    readonly secondLinkCounter: Locator

    constructor(page: Page) {
        this.page = page
        this.firstLink         = this.page.getByText('Click me')
        this.firstLinkCounter  = this.page.locator('#clickCount')
        this.secondLink        = this.page.getByText('Link Button')
        this.secondLinkCounter = this.page.locator('#clickButtonCount')
    }

    async clickFirstLink() {
        await expect(this.firstLink).toBeVisible()
        await this.firstLink.click()
    }

    async clickSecondLink() {
        await expect(this.secondLink).toBeVisible()
        await this.secondLink.click()
    }
}
