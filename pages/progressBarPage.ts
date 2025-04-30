import { expect, Locator, Page} from '@playwright/test'

export class ProgressBarPage {
    readonly page: Page
    readonly startButton: Locator
    readonly stopButton: Locator
    readonly progressBar: Locator
    readonly resultText: Locator

    constructor(page: Page) {
        this.page = page
        this.startButton = this.page.getByRole('button', { name: 'Start' })
        this.stopButton  = this.page.getByRole('button', { name: 'Stop' })
        this.progressBar = this.page.getByRole('progressbar')
        this.resultText  = this.page.locator('#result')
    }

    async clickStartButton() {
        await expect(this.startButton, 'Start button should be visible').toBeVisible()
        await this.startButton.click()
    }

    async clickStopButton() {
        await expect(this.stopButton, 'Stop button should be visible').toBeVisible()
        await this.stopButton.click()
    }

    async waitForTarget(target: number) {
        let progress = 0
        do {
            progress = parseInt(await this.progressBar.innerText())
        } while (progress < target)
        return
    }

    async getTimeDiff() {
        let diff: number

        await expect(this.resultText).toBeVisible()
        let textDiff = (await this.resultText.innerText()).match(/\d{1,}(?=,)/)?.[0]
        textDiff ? diff = parseInt(textDiff) : diff = 0
        return Math.abs(diff)
    }
}
