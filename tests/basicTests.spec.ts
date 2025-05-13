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
import { ScrollbarsPage } from '../pages/scrollbarsPage'
import { DynamicTablePage } from '../pages/dynamicTablePage'
import { VerifyTextPage } from '../pages/verifyTextPage'
import { ProgressBarPage } from '../pages/progressBarPage'
import { VisibilityPage } from '../pages/visibilityPage'
import { SampleAppPage } from '../pages/sampleAppPage'
import { MouseOverPage } from '../pages/mouseOverPage'
import { NonBreakingSpacePage } from '../pages/nonBreakingSpacePage'
import { OverlappedElementPage } from '../pages/overlappedElementPage'

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

test('check that button can be scrolled into viewport and clicked @regression', async ({ page }) => {
    const scrollbarsPage = new ScrollbarsPage(page)

    await homePage.openScrollbarsPage()
    await scrollbarsPage.scrollAndClickButton()
    // no click outcome, nothing to assert
})

test('compare specific value from dynamic table with control value @regression', async ({ page }) => {
    const dynamicTablePage = new DynamicTablePage(page)

    await homePage.openDynamicTablePage()
    expect(await dynamicTablePage.getCellValue()).toEqual(await dynamicTablePage.getWarningMessageValue())
})

test('verify that text, consisting of different parts, is displayed properly @regression', async ({ page }) => {
    const text = 'Welcome UserName!'
    const verifyTextPage = new VerifyTextPage(page)

    await homePage.openVerifyTextPage()
    await expect((await verifyTextPage.getElementByText(text)).last(), 'Element with proper text should be displayed').toBeVisible()
})

test('verify that progress bar reaches target @regression', async ({ page }) => {
    const target = 75
    const progressBarPage = new ProgressBarPage(page)

    await homePage.openProgressBarPage()
    await progressBarPage.clickStartButton()
    await progressBarPage.waitForTarget(target)
    await progressBarPage.clickStopButton()
    expect(await progressBarPage.getTimeDiff()).toBeLessThan(3)
})

test('Verify different types of element invisibility @regression', async ({ page }) => {
    const visibilityPage = new VisibilityPage(page)

    await homePage.openVisibilityPage()
    await visibilityPage.clickHideButton()

    await expect(visibilityPage.removedButton, '"Removed" button should not be visible').not.toBeVisible()
    await expect(visibilityPage.zeroWidthButton, '"Zero width" button should not be visible').not.toBeVisible()
    expect(await visibilityPage.isOverlappedButtonVisible(), '"Overlapped" button should not be visible').toBeFalsy()
    expect(await visibilityPage.isOpacityZeroButtonVisible(), '"Opacity 0" button should not be visible').toBeFalsy()
    await expect(visibilityPage.visibilityHiddenButton, '"Visibility hidden button should not be visible').not.toBeVisible()
    await expect(visibilityPage.displayNoneButton, '"Display none" button should not be visible').not.toBeVisible()
    await expect(visibilityPage.offscreenButton, '"Offscreen" button should not be visible').not.toBeInViewport()
})

test('Verify login with correct credentials @regression', async ({ page }) => {
    const sampleAppPage = new SampleAppPage(page)
    const user = 'vasya'

    await homePage.openSampleAppPage()
    await sampleAppPage.inputUsername(user)
    await sampleAppPage.inputPassword('pwd')
    await sampleAppPage.submitForm()
    await expect(sampleAppPage.successMessage, 'Login success message should be displayed').toHaveText(`Welcome, ${user}!`)
})

test('verify links to be clickable after change on mouseover @regression', async ({ page }) => {
    const mouseOverPage = new MouseOverPage(page)

    await homePage.openMouseOverPage()
    for (let i = 0; i < 2; i++) {
        await mouseOverPage.clickFirstLink()
        await mouseOverPage.clickSecondLink()
    }
    await expect(mouseOverPage.firstLinkCounter, 'Counter for "Click me" link should display 2').toHaveText('2')
    await expect(mouseOverPage.secondLinkCounter, 'Counter for "Link button" should display 2').toHaveText('2')
})

test('Locate button with non-breaking space @regression', async ({ page }) => {
    const nonBreakingSpacePage = new NonBreakingSpacePage(page)

    await homePage.openNonBreakingSpacePage()
    await nonBreakingSpacePage.clickButton()
    // no click outcome, nothing to assert
})

test('Check input into overlapped element @regression', async ({ page }) => {
    const overlappedElementPage = new OverlappedElementPage(page)
    const name = 'fedya'

    await homePage.openOverlappedElementPage()
    await overlappedElementPage.inputName(name)
    await expect(overlappedElementPage.nameField, 'Name field should contain filled-in string').toHaveValue(name)
})

// shadow DOM case skipped due to bug in playground, which prevents copying into clipboard
