import { expect, Locator, Page } from '@playwright/test'

export class AlertsPage {
    readonly page: Page
    readonly alertButton: Locator
    readonly confirmButton: Locator
    readonly promptButton: Locator
    dialogMessage: string
    responseMessage: string
    defaultAnswer: string

    constructor(page: Page) {
        this.page = page
        this.alertButton     = this.page.getByRole('button', { name: 'Alert'} )
        this.confirmButton   = this.page.getByRole('button', { name: 'Confirm'} )
        this.promptButton    = this.page.getByRole('button', { name: 'Prompt'} )
        this.dialogMessage   = ''
        this.responseMessage = ''
        this.defaultAnswer   = ''
    }

    async clickAlertButton() {
        await expect(this.alertButton, 'Alert button should be visible').toBeVisible()
        await this.alertButton.click()
    }

    async clickConfirmButton() {
        await expect(this.confirmButton, 'Confirm button should be visible').toBeVisible()
        await this.confirmButton.click()
    }

    async clickPromptButton() {
        await expect(this.promptButton, 'Prompt button should be visible').toBeVisible()
        await this.promptButton.click()
    }

    /**
     * 
     * @param reject true to cancel dialog, false or omit to confirm
     * @param input include when user input required
     */
    handleDialog(accept?: boolean, input?: string){
        this.page.on('dialog', (dialog) => {
            this.dialogMessage = dialog.message()

            switch (dialog.type()) {
                case 'alert': {
                    dialog.dismiss()
                } break
                case 'confirm': {
                    accept ? dialog.accept() : dialog.dismiss()
                } break
                case 'prompt': {
                    dialog.defaultValue() ? this.defaultAnswer = dialog.defaultValue() : this.defaultAnswer = ''
                    accept ? dialog.accept(input) : dialog.dismiss()
                } break
            }
        })
    }
}
