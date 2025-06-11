import { expect, Locator, Page } from '@playwright/test'

export class DynamicTablePage {
    private readonly browserName = 'Chrome'
    private readonly resourceName = 'CPU'

    readonly page: Page
    readonly valueRow: Locator
    readonly warningMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.valueRow = page.locator('[role="row"]', { hasText: this.browserName })
        this.warningMessage = this.page.locator('.bg-warning')
    }

    /**
     * 
     * @returns number of column where header equals to required resource's name
     */
    private async getResourceColumnNumber(): Promise<number> {
        await expect(this.page.getByRole('table'), 'Dynamic table should be loaded before acquiring headers array').toBeAttached()
        const headers = await this.page.locator('[role="columnheader"]').all()
        let result = 0

        for (let i = 0; i < headers.length; i++) {
            if (await headers[i].innerText() === this.resourceName) {
                result = i
                break
            }
        }

        return result
    }

    async getCellValue(): Promise<string> {
        const columnNumber = await this.getResourceColumnNumber()
        const valueCell = this.valueRow.locator('[role="cell"]').nth(columnNumber)

        await expect(valueCell, 'Table cell should be visible').toBeVisible()

        return await valueCell.innerText()
    }

    async getWarningMessageValue(): Promise<string> {
        const warningText = await this.warningMessage.innerText()

        return warningText.replace(`${this.browserName} ${this.resourceName}: `, '')
    }
}
