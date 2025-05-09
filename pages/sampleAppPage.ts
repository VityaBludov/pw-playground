import { expect, Locator, Page } from '@playwright/test'

export class SampleAppPage {
    readonly page: Page
    readonly userNameField: Locator
    readonly passwordField: Locator
    readonly loginButton: Locator
    readonly successMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.userNameField  = this.page.getByPlaceholder('User Name')
        this.passwordField  = this.page.getByPlaceholder('********')
        this.loginButton    = this.page.getByRole('button', { name: 'Log In' })
        this.successMessage = this.page.locator('#loginstatus')
    }

    async inputUsername(user: string) {
        await expect(this.userNameField, 'User name input field should be visible').toBeVisible()
        await this.userNameField.fill(user)
    }

    async inputPassword(pwd: string) {
        await expect(this.passwordField, 'Password input field should be visible').toBeVisible()
        await this.passwordField.fill(pwd)
    }

    async submitForm() {
        await expect(this.loginButton, 'Login button should be visible').toBeVisible()
        await this.loginButton.click()
    }
}
