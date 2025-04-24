import { expect, test } from '@playwright/test'
import { DynamicIdPage } from '../pages/dynamicIdPage'
import { HomePage } from '../pages/homePage'
import { ClassAttributePage } from '../pages/classAttributePage'
import { HiddenLayersPage } from '../pages/hiddenLayersPage'
import { LoadDelayPage } from '../pages/loadDelayPage'
import { AjaxDataPage } from '../pages/ajaxDataPage'
import { ClientSideDelayPage } from '../pages/clientSideDelayPage'
import { ClickPage } from '../pages/clickPage'
import { TextInputPage } from '../pages/textInputPage'

let homePage: HomePage

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await page.goto('/')
})

test('identify button with dynamic ID @regression', async ({ page }) => {
    const dynamicIdPage: DynamicIdPage = new DynamicIdPage(page)

    await homePage.openDynamicIdPage()
    await dynamicIdPage.clickButton()
    // no click outcome, nothing to assert
})

test('identify button by class attribute @regression', async ({ page }) => {
    const classAttributePage = new ClassAttributePage(page)

    await homePage.openClassAttributePage()
    await classAttributePage.clickPrimaryButton()
    await classAttributePage.clickPopupButton()
})

test('check that after click second button appears and hides first one @regression', async ({ page }) => {
    const hiddenLayersPage = new HiddenLayersPage(page)

    // reworked: verify by blue button existence, z-indexes comparison and respective bound boxes position and size
    await homePage.openHiddenLayersPage()
    await hiddenLayersPage.clickGreenButton()
    await expect(hiddenLayersPage.blueButton, 'Blue button should appear after click').toBeVisible()
    expect(await hiddenLayersPage.isBlueButtonOnTop(), 'Blue button should have higher z-index than green button').toBeTruthy()
    expect(await hiddenLayersPage.isGreenButtonCovered(), 'Blue button should fully cover green button').toBeTruthy()
})

test('wait delayed page load @regression', async ({ page }) => {
    const loadDelayPage = new LoadDelayPage(page)

    await homePage.openLoadDelayPage(10000)
    await expect(loadDelayPage.delayedButton, 'Delayed page with button should be visible').toBeVisible()
})

test('wait for slow AJAX response @regression', async ({ page }) => {
    const ajaxDataPage = new AjaxDataPage(page)

    await homePage.openAjaxDataPage()
    await ajaxDataPage.clickAjaxButton()
    await expect(ajaxDataPage.successMessage, 'Green success message should appear within < 20s').toBeVisible({ timeout: 20000 })
})

test('wait for slow client side logic @regression', async ({ page }) => {
    const clientSideDelayPage = new ClientSideDelayPage(page)

    await homePage.openClientSideDelayPage()
    await clientSideDelayPage.clickTriggerButton(20000)
    await expect(clientSideDelayPage.successMessage, 'Green success message should appear within < 20s').toBeVisible()
})

test('verify that emulating physical mouse click works @regression', async ({ page }) => {
    const clickPage = new ClickPage(page)

    await homePage.openClickPage()
    await clickPage.clickBlueButton()
    await expect(clickPage.greenButton, 'Green button should appear instead of blue one').toBeVisible()
})

test('verify that emulating physical keyboard input works @regression', async ({ page }) => {
    const textInputPage = new TextInputPage(page)
    const name = 'new name'

    await homePage.openTextInputPage()
    await textInputPage.inputButtonName(name)
    await expect(textInputPage.renameableButton, 'Button should have new name').toHaveText(name)
})
