import { Locator, Page } from '@playwright/test'

export class HomePage {
    readonly page: Page
    private readonly dynamicIdPageLink: Locator
    private readonly classAttributePageLink: Locator
    private readonly hiddenLayersPageLink: Locator
    private readonly loadDelayPageLink: Locator
    private readonly ajaxDataPageLink: Locator
    private readonly clientSideDelayPageLink: Locator
    private readonly clickPageLink: Locator
    private readonly textInputPageLink: Locator
    private readonly scrollbarsPageLink: Locator
    private readonly dynamicTablePageLink: Locator
    private readonly verifyTextPageLink: Locator
    private readonly progressBarPageLink: Locator
    private readonly visibilityPageLink: Locator
    private readonly sampleAppPageLink: Locator
    private readonly mouseOverPageLink: Locator
    private readonly nonBreakingSpacePageLink: Locator
    private readonly overlappedElementPageLink: Locator
    private readonly alertsPageLink: Locator
    private readonly uploadPageLink: Locator
    private readonly animationPageLink: Locator
    private readonly disabledInputPageLink: Locator

    constructor(page: Page) {
        this.page = page
        this.dynamicIdPageLink         = this.page.getByRole('link', { name: 'Dynamic ID' })
        this.classAttributePageLink    = this.page.getByRole('link', { name: 'Class Attribute' })
        this.hiddenLayersPageLink      = this.page.getByRole('link', { name: 'Hidden Layers' })
        this.loadDelayPageLink         = this.page.getByRole('link', { name: 'Load Delay' })
        this.ajaxDataPageLink          = this.page.getByRole('link', { name: 'AJAX Data' })
        this.clientSideDelayPageLink   = this.page.getByRole('link', { name: 'Client Side Delay' })
        this.clickPageLink             = this.page.getByRole('link', { name: 'Click' })
        this.textInputPageLink         = this.page.getByRole('link', { name: 'Text Input' })
        this.scrollbarsPageLink        = this.page.getByRole('link', { name: 'Scrollbars' })
        this.dynamicTablePageLink      = this.page.getByRole('link', { name: 'Dynamic Table' })
        this.verifyTextPageLink        = this.page.getByRole('link', { name: 'Verify Text' })
        this.progressBarPageLink       = this.page.getByRole('link', { name: 'Progress Bar' })
        this.visibilityPageLink        = this.page.getByRole('link', { name: 'Visibility' })
        this.sampleAppPageLink         = this.page.getByRole('link', { name: 'Sample App' })
        this.mouseOverPageLink         = this.page.getByRole('link', { name: 'Mouse Over' })
        this.nonBreakingSpacePageLink  = this.page.getByRole('link', { name: 'Non-Breaking Space' })
        this.overlappedElementPageLink = this.page.getByRole('link', { name: 'Overlapped Element' })
        this.alertsPageLink            = this.page.getByRole('link', { name: 'Alerts' })
        this.uploadPageLink            = this.page.getByRole('link', { name: 'File Upload' })
        this.animationPageLink         = this.page.getByRole('link', { name: 'Animated Button' })
        this.disabledInputPageLink     = this.page.getByRole('link', { name: 'Disabled Input' })
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

    async openClientSideDelayPage() {
        await this.clientSideDelayPageLink.click()
    }

    async openClickPage() {
        await this.clickPageLink.click()
    }

    async openTextInputPage() {
        await this.textInputPageLink.click()
    }

    async openScrollbarsPage() {
        await this.scrollbarsPageLink.click()
    }

    async openDynamicTablePage() {
        await this.dynamicTablePageLink.click()
    }

    async openVerifyTextPage() {
        await this.verifyTextPageLink.click()
    }

    async openProgressBarPage() {
        await this.progressBarPageLink.click()
    }

    async openVisibilityPage() {
        await this.visibilityPageLink.click()
    }

    async openSampleAppPage() {
        await this.sampleAppPageLink.click()
    }

    async openMouseOverPage() {
        await this.mouseOverPageLink.click()
    }

    async openNonBreakingSpacePage() {
        await this.nonBreakingSpacePageLink.click()
    }

    async openOverlappedElementPage() {
        await this.overlappedElementPageLink.click()
    }

    async openAlertsPage() {
        await this.alertsPageLink.click()
    }

    async openUploadPage() {
        await this.uploadPageLink.click()
    }

    async openAnimationPage() {
        await this.animationPageLink.click()
    }

    async openDisabledInputPage() {
        this.disabledInputPageLink.click()
    }
}
