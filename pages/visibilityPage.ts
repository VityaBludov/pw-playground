import { expect, Locator, Page } from '@playwright/test'

export class VisibilityPage {
    readonly page: Page
    readonly hideButton: Locator
    readonly removedButton: Locator
    readonly zeroWidthButton: Locator
    readonly overlappedButton: Locator
    readonly opacityZeroButton: Locator
    readonly visibilityHiddenButton: Locator
    readonly displayNoneButton: Locator
    readonly offscreenButton: Locator
    private readonly hidingLayer: Locator

    constructor(page: Page) {
        this.page = page
        this.hideButton             = this.page.getByRole('button', { name: 'Hide' })
        this.removedButton          = this.page.getByRole('button', { name: 'Removed' })
        this.zeroWidthButton        = this.page.getByRole('button', { name: 'Zero Width' })
        this.overlappedButton       = this.page.getByRole('button', { name: 'Overlapped' })
        this.opacityZeroButton      = this.page.getByRole('button', { name: 'Opacity 0' })
        this.visibilityHiddenButton = this.page.getByRole('button', { name: 'Visibility Hidden' })
        this.displayNoneButton      = this.page.getByRole('button', { name: 'Display None' })
        this.offscreenButton        = this.page.getByRole('button', { name: 'Offscreen' })
        this.hidingLayer            = this.page.locator('#hidingLayer')
    }

    async clickHideButton() {
        await expect(this.hideButton, '"Hide" button should be visible').toBeVisible()
        await expect(this.removedButton, '"Removed" button should be visible before hiding').toBeVisible()
        await expect(this.zeroWidthButton, '"Zero width" button should be visible before hiding').toBeVisible()
        await expect(this.overlappedButton, '"Overlapped" button should be visible before hiding').toBeVisible()
        await expect(this.opacityZeroButton, '"Opacity 0" button should be visible before hiding').toBeVisible()
        await expect(this.visibilityHiddenButton, '"Visibility hidden" button should be visible before hiding').toBeVisible()
        await expect(this.displayNoneButton, '"Display none" button should be visible before hiding').toBeVisible()
        await expect(this.offscreenButton, '"Offscreen" button should be visible before hiding').toBeVisible()
        await this.hideButton.click()
    }

    async isOverlappedButtonVisible(): Promise<boolean> {
        const overlappedButtonBox = await this.overlappedButton.boundingBox()        
        const hidingLayerBox      = await this.hidingLayer.boundingBox()
        let isHiding = false

        await expect(this.hidingLayer, 'Hiding layer should be visible').toBeVisible()
        const hidingLayerPosition = await this.hidingLayer.evaluate((el) => {
            return window.getComputedStyle(el).getPropertyValue('position')
        })
        const isAbsolute = hidingLayerPosition === 'absolute'

        if (overlappedButtonBox && hidingLayerBox) {
            isHiding = (overlappedButtonBox.x >= hidingLayerBox.x) && (overlappedButtonBox.y >= hidingLayerBox.y)
                && ((Math.round(overlappedButtonBox.width) + overlappedButtonBox.x - hidingLayerBox.x) <= hidingLayerBox.width)
                && ((Math.round(overlappedButtonBox.height) + overlappedButtonBox.y - hidingLayerBox.y) <= hidingLayerBox.height)
        }
        
        return !(isAbsolute && isHiding)
    }

    async isOpacityZeroButtonVisible(): Promise<boolean> {
        const buttonOpacity = await this.opacityZeroButton.evaluate((el) => {
            return parseInt(window.getComputedStyle(el).getPropertyValue('opacity'))
        })

        return Boolean(buttonOpacity)
    }
}
