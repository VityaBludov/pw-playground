import { expect, Locator, Page } from '@playwright/test'

export class HiddenLayersPage {
    readonly page: Page
    readonly greenButton: Locator
    readonly blueButton: Locator
    readonly greenButtonDiv: Locator
    readonly blueButtonDiv: Locator

    constructor(page: Page) {
        this.page = page
        this.greenButton = page.locator('#greenButton')
        this.blueButton = page.locator('#blueButton')
        this.greenButtonDiv = page.locator('.spa-view', {
            has: this.greenButton,
        })
        this.blueButtonDiv = page.locator('.spa-view', { has: this.blueButton })
    }

    async clickGreenButton() {
        await expect(
            this.greenButton,
            'Green button is not visible'
        ).toBeVisible()
        await this.greenButton.click()
    }
}
