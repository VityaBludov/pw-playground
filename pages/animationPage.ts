import { expect, Locator, Page } from '@playwright/test'

export class AnimationPage {
    readonly page: Page
    readonly startAnimationButton: Locator
    readonly movingTargetButton: Locator
    readonly animationInProgressMessage: Locator
    readonly animationDoneMessage: Locator
    readonly finalMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.startAnimationButton        = this.page.getByRole('button', { name: 'Start Animation' })
        this.movingTargetButton          = this.page.getByRole('button', { name: 'Moving Target' })
        this.animationInProgressMessage  = this.page.locator('#opstatus', { hasText: 'Animating the button...' })
        this.animationDoneMessage        = this.page.locator('#opstatus', { hasText: 'Animation done' })
        this.finalMessage                = this.page.locator('#opstatus', { hasText: 'Moving Target clicked. It\'s class name is ' })
    }

    async clickStartAnimationButton() {
        await expect(this.startAnimationButton, '"Start Animation" button should be visible').toBeVisible()
        await this.startAnimationButton.click()
    }

    async waitForAnimationToFinish(timeout: number) {
        await expect(this.animationInProgressMessage, 'Animation in progress message should be visible').toBeVisible()
        await this.animationDoneMessage.waitFor({ state: 'visible', timeout: timeout })
    }

    async clickMovingTargetButton() {
        await expect(this.movingTargetButton, '"Moving Target" button should be visible').toBeVisible()
        await this.movingTargetButton.click()
    }
}
