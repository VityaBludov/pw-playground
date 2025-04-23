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
        this.greenButtonDiv = page.locator('.spa-view', { has: this.greenButton })
        this.blueButtonDiv = page.locator('.spa-view', { has: this.blueButton })
    }

    async clickGreenButton() {
        await expect(this.greenButton, 'Green button should be visible').toBeVisible()
        await this.greenButton.click()
    }

    /**
     * 
     * @returns true if blue button has higher z-index than green button
     */
    async isBlueButtonOnTop(): Promise<boolean> {
        let indexGreen = await this.greenButtonDiv.evaluate((el) => {
            return parseInt(window.getComputedStyle(el).getPropertyValue('z-index'))
        })
        let indexBlue = await this.blueButtonDiv.evaluate((el) => {
            return parseInt(window.getComputedStyle(el).getPropertyValue('z-index'))
        })

        return indexGreen < indexBlue
    }

    /**
     * 
     * @returns true if blue button fully covers green button
     */
    async isGreenButtonCovered(): Promise<boolean> {
        let greenButtonBox = await this.greenButton.boundingBox()
        let blueButtonBox = await this.blueButton.boundingBox()
        let result: boolean = false

        if (greenButtonBox && blueButtonBox) {
            result = (greenButtonBox.x >= blueButtonBox.x) && (greenButtonBox.y >= blueButtonBox.y)
                && ((greenButtonBox.width + greenButtonBox.x - blueButtonBox.x) <= blueButtonBox.width)
                && ((greenButtonBox.height + greenButtonBox.y - blueButtonBox.y) <= blueButtonBox.height)
        }

        return result
    }
}
