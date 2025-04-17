import { Locator, Page } from '@playwright/test'

export class HomePage {
    readonly page: Page
    private readonly dynamicIdPageLink: Locator
    private readonly classAttributePageLink: Locator
    private readonly hiddenLayersPageLink: Locator
    private readonly loadDelayPageLink: Locator
    private readonly ajaxDataPageLink: Locator

    constructor(page: Page) {
        this.page = page
        this.dynamicIdPageLink = this.page.getByRole('link', { name: 'Dynamic ID' })
        this.classAttributePageLink = this.page.getByRole('link', { name: 'Class Attribute' })
        this.hiddenLayersPageLink = this.page.getByRole('link', { name: 'Hidden Layers' })
        this.loadDelayPageLink = this.page.getByRole('link', { name: 'Load Delay' })
        this.ajaxDataPageLink = this.page.getByRole('link', { name: 'AJAX Data' })
    }

    async openDynamicIdPage() {
        await this.dynamicIdPageLink.click()
    }

    async openClassAttributePage() {
        await this.classAttributePageLink.click()
    }

    async openHiddenLayersPage() {
        await this.hiddenLayersPageLink.click()
    }

    async openLoadDelayPage(timeout: number) {
        await this.loadDelayPageLink.click({ timeout: timeout })
    }

    async openAjaxDataPage() {
        await this.ajaxDataPageLink.click()
    }
}
