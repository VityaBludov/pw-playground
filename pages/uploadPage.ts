import { expect, FrameLocator, Locator, Page } from '@playwright/test'

export class UploadPage {
    readonly page: Page
    private readonly frame: FrameLocator
    private readonly browseButton: Locator
    readonly fileList: Locator
    readonly infoMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.frame        = this.page.frameLocator('iframe')
        this.browseButton = this.frame.locator('.browse-btn')
        this.fileList     = this.frame.locator('.file-list')
        this.infoMessage  = this.frame.locator('.success-file')
    }
    
    async browseFile(path: string) {
        await expect(this.browseButton, 'Browse button should be visible').toBeVisible()
        const fileChoosePromise = this.page.waitForEvent('filechooser')
        await this.browseButton.click()
        const fileChooser = await fileChoosePromise
        await fileChooser.setFiles(path)
    }
}
