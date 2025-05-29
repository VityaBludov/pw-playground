import { expect, Locator, Page } from '@playwright/test'

export class AutoWaitPage {
    readonly page: Page
    readonly selectionDropdown: Locator
    readonly buttonShortDelay: Locator
    readonly buttonMediumDelay: Locator
    readonly buttonLongDelay: Locator
    readonly targetButton: Locator
    readonly targetInput: Locator
    readonly targetTextArea: Locator
    readonly targetSelect: Locator
    readonly targetLabel: Locator
    readonly statusMessage: Locator
    
    private timeout: number
    private readonly statusReadyMessage: string

    constructor(page: Page) {
        this.page = page
        this.selectionDropdown = this.page.locator('#element-type')
        this.buttonShortDelay  = this.page.getByRole('button', { name: 'Apply 3s' })
        this.buttonMediumDelay = this.page.getByRole('button', { name: 'Apply 5s' })
        this.buttonLongDelay   = this.page.getByRole('button', { name: 'Apply 10s' })
        this.targetButton      = this.page.getByRole('button', { name: 'Button' })
        this.targetInput       = this.page.getByRole('textbox')
        this.targetSelect      = this.page.locator('#element-container').locator('select')
        this.targetLabel       = this.page.locator('#element-container').locator('label')
        this.statusMessage     = this.page.locator('#opstatus')

        this.timeout = 5000
        this.statusReadyMessage = 'Target element state restored.'
    }

    async chooseElement(element: string) {
        await expect(this.selectionDropdown, 'Element selection dropdown should be visible').toBeVisible()
        await this.selectionDropdown.click()
        await this.selectionDropdown.selectOption(element)
        await this.page.mouse.click(0, 0) // selection not applied until focus moved outside select element
    }

    async setState(property: string, checked: boolean) {
        const checkBox = this.page.getByRole('checkbox', { name: property })

        await expect(checkBox, 'Checkbox for target property should be visible').toBeVisible()
        checked ? await checkBox.check() : await checkBox.uncheck()
    }

    async setShortDelay() {
        this.timeout = 5000
        await expect(this.buttonShortDelay, '"Apply 3s" button should be visible').toBeVisible()
        await this.buttonShortDelay.click()
    }

    async setMediumDelay() {
        this.timeout = 10000
        await expect(this.buttonMediumDelay, '"Apply 5s" button should be visible').toBeVisible()
        await this.buttonMediumDelay.click()
    }

    async setLongDelay() {
        this.timeout = 15000
        await expect(this.buttonLongDelay, '"Apply 10s" button should be visible').toBeVisible()
        await this.buttonLongDelay.click()
    }

    async waitForDelay() {
        await expect(this.statusMessage, 'Status message should indicate accessibility').toHaveText(this.statusReadyMessage, { timeout: this.timeout })
    }

    async clickTargetButton() {
        await expect(this.targetButton, 'Target button should be visible').toBeVisible()
        await this.targetButton.click()
    }

    async fillTargetInput(text: string) {
        await expect(this.targetInput, 'Target button should be enabled').toBeEnabled()
        await this.targetInput.fill(text)
        await this.page.mouse.click(0, 0) // user input not applied until focus moved outside input field
    }

    async pickFromTargetSelect(choise: string) {
        await expect(this.targetSelect, 'Target select should be on top').toBeVisible()
        await this.targetSelect.selectOption(choise)
    }
}
