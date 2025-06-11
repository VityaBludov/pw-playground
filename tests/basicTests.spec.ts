import { expect, test } from '../fixtures/main'

import { AlertsPage } from '../pages/alertsPage'
import { AnimationPage } from '../pages/animationPage'
import { AutoWaitPage } from '../pages/autoWaitPage'
import { ClassAttributePage } from '../pages/classAttributePage'
import { ClickPage } from '../pages/clickPage'
import { ClientSideDelayPage } from '../pages/clientSideDelayPage'
import { DisabledInputPage } from '../pages/disabledInputPage'
import { DynamicIdPage } from '../pages/dynamicIdPage'
import { DynamicTablePage } from '../pages/dynamicTablePage'
import { HiddenLayersPage } from '../pages/hiddenLayersPage'
import { LoadDelayPage } from '../pages/loadDelayPage'
import { MouseOverPage } from '../pages/mouseOverPage'
import { NonBreakingSpacePage } from '../pages/nonBreakingSpacePage'
import { OverlappedElementPage } from '../pages/overlappedElementPage'
import { ProgressBarPage } from '../pages/progressBarPage'
import { SampleAppPage } from '../pages/sampleAppPage'
import { ScrollbarsPage } from '../pages/scrollbarsPage'
import { TextInputPage } from '../pages/textInputPage'
import { UploadPage } from '../pages/uploadPage'
import { VerifyTextPage } from '../pages/verifyTextPage'
import { VisibilityPage } from '../pages/visibilityPage'

import { randomElement } from '../resources/helpers'
import { timeouts, users } from '../resources/testData'


test('identify button with dynamic ID @regression', async ({ page, homePage }) => {
    const dynamicIdPage: DynamicIdPage = new DynamicIdPage(page)

    await homePage.openDynamicIdPage()
    await dynamicIdPage.clickButton()
    // no click outcome, nothing to assert
})

test('identify button by class attribute @regression', async ({ page, homePage }) => {
    const classAttributePage = new ClassAttributePage(page)

    await homePage.openClassAttributePage()
    await classAttributePage.handleAlert()
    await classAttributePage.clickPrimaryButton()
    expect(classAttributePage.alertMessage, 'Alert should have proper message text').toEqual('Primary button pressed')
})

test('check that after click second button appears and hides first one @regression', async ({ page, homePage }) => {
    const hiddenLayersPage = new HiddenLayersPage(page)

    // reworked: verify by blue button existence, z-indexes comparison and respective bound boxes position and size
    await homePage.openHiddenLayersPage()
    await hiddenLayersPage.clickGreenButton()
    await expect(hiddenLayersPage.blueButton, 'Blue button should appear after click').toBeVisible()
    expect(await hiddenLayersPage.isBlueButtonOnTop(), 'Blue button should have higher z-index than green button').toBeTruthy()
    expect(await hiddenLayersPage.isGreenButtonCovered(), 'Blue button should fully cover green button').toBeTruthy()
})

test('wait delayed page load @regression', async ({ page, homePage }) => {
    const loadDelayPage = new LoadDelayPage(page)

    await homePage.openLoadDelayPage(timeouts.medium)
    await expect(loadDelayPage.delayedButton, 'Delayed page with button should be visible').toBeVisible()
})

test('wait for slow AJAX response @regression @sraka', async ({ homePage, ajaxDataPage }) => {

    await homePage.openAjaxDataPage()
    await ajaxDataPage.clickAjaxButton()
    await expect(ajaxDataPage.successMessage, 'Green success message should appear within < 20s').toBeVisible({ timeout: timeouts.long })
})

test('wait for slow client side logic @regression', async ({ page, homePage }) => {
    const clientSideDelayPage = new ClientSideDelayPage(page)

    await homePage.openClientSideDelayPage()
    await clientSideDelayPage.clickTriggerButton(timeouts.long)
    await expect(clientSideDelayPage.successMessage, 'Green success message should appear within < 20s').toBeVisible()
})

test('verify that emulating physical mouse click works @regression', async ({ page, homePage }) => {
    const clickPage = new ClickPage(page)

    await homePage.openClickPage()
    await clickPage.clickBlueButton()
    await expect(clickPage.greenButton, 'Green button should appear instead of blue one').toBeVisible()
})

test('verify that emulating physical keyboard input works @regression', async ({ page, homePage }) => {
    const textInputPage = new TextInputPage(page)
    const name = 'button new name'

    await homePage.openTextInputPage()
    await textInputPage.inputButtonName(name)
    await expect(textInputPage.renameableButton, 'Button should have new name').toHaveText(name)
})

test('check that button can be scrolled into viewport and clicked @regression', async ({ page, homePage }) => {
    const scrollbarsPage = new ScrollbarsPage(page)

    await homePage.openScrollbarsPage()
    await scrollbarsPage.scrollAndClickButton()
    // no click outcome, nothing to assert
})

test('compare specific value from dynamic table with control value @regression', async ({ page, homePage }) => {
    const dynamicTablePage = new DynamicTablePage(page)

    await homePage.openDynamicTablePage()
    expect(await dynamicTablePage.getCellValue()).toEqual(await dynamicTablePage.getWarningMessageValue())
})

test('verify that text, consisting of different parts, is displayed properly @regression', async ({ page, homePage }) => {
    const text = 'Welcome UserName!'
    const verifyTextPage = new VerifyTextPage(page)

    await homePage.openVerifyTextPage()
    await expect((await verifyTextPage.getElementByText(text)).last(), 'Element with proper text should be displayed').toBeVisible()
})

test('verify that progress bar reaches target @regression', async ({ page, homePage }) => {
    const target = 75
    const progressBarPage = new ProgressBarPage(page)

    await homePage.openProgressBarPage()
    await progressBarPage.clickStartButton()
    await progressBarPage.waitForTarget(target)
    await progressBarPage.clickStopButton()
    expect(await progressBarPage.getTimeDiff()).toBeLessThan(3)
})

test('Verify different types of element invisibility @regression', async ({ page, homePage }) => {
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

test('Verify login with correct credentials @regression', async ({ page, homePage }) => {
    const sampleAppPage = new SampleAppPage(page)

    await homePage.openSampleAppPage()
    await sampleAppPage.inputUsername(users.defaultUser.name)
    await sampleAppPage.inputPassword(users.defaultUser.password)
    await sampleAppPage.submitForm()
    await expect(sampleAppPage.successMessage, 'Login success message should be displayed').toHaveText(`Welcome, ${users.defaultUser.name}!`)
})

test('verify links to be clickable after change on mouseover @regression', async ({ page, homePage }) => {
    const mouseOverPage = new MouseOverPage(page)
    const count = 2

    await homePage.openMouseOverPage()
    for (let i = 0; i < count; i++) {
        await mouseOverPage.clickFirstLink()
        await mouseOverPage.clickSecondLink()
    }
    await expect(mouseOverPage.firstLinkCounter, `Counter for "Click me" link should display ${count}`).toHaveText(`${count}`)
    await expect(mouseOverPage.secondLinkCounter, `Counter for "Link button" should display 2 ${count}`).toHaveText(`${count}`)
})

test('Locate button with non-breaking space @regression', async ({ page, homePage }) => {
    const nonBreakingSpacePage = new NonBreakingSpacePage(page)

    await homePage.openNonBreakingSpacePage()
    await nonBreakingSpacePage.clickButton()
    // no click outcome, nothing to assert
})

test('Check input into overlapped element @regression', async ({ page, homePage }) => {
    const overlappedElementPage = new OverlappedElementPage(page)

    await homePage.openOverlappedElementPage()
    await overlappedElementPage.inputName(users.defaultUser.name)
    await expect(overlappedElementPage.nameField, 'Name field should contain filled-in string').toHaveValue(users.defaultUser.name)
})

// shadow DOM case skipped due to bug in playground, which prevents copying into clipboard

test.describe('Suite: verify interactions with dialogs @regression', () => {
    // TODO: replace timeouts with proper delays

    test('Check alert message', async ({ page, homePage }) => {
        const alertsPage = new AlertsPage(page)
    
        await homePage.openAlertsPage()
        alertsPage.handleDialog()
        await alertsPage.clickAlertButton()
        expect(alertsPage.dialogMessage, 'Alert should have proper message text').toEqual('Today is a working day.\nOr less likely a holiday.')
    })

    test('Check dialog message after confirmation', async ({ page, homePage }) => {
        const alertsPage = new AlertsPage(page)

        await homePage.openAlertsPage()
        alertsPage.handleDialog(true)
        await alertsPage.clickConfirmButton()
        expect(alertsPage.dialogMessage, 'Confirm dialog should have proper message text').toEqual('Today is Friday.\nDo you agree?')
        await page.waitForTimeout(timeouts.long)
        expect(alertsPage.dialogMessage, 'Alert should have proper message text').toEqual('Yes')
    })

    test('Check dialog message after rejection', async ({ page, homePage }) => {
        const alertsPage = new AlertsPage(page)

        await homePage.openAlertsPage()
        alertsPage.handleDialog(false)
        await alertsPage.clickConfirmButton()
        expect(alertsPage.dialogMessage, 'Confirm dialog should have proper message text').toEqual('Today is Friday.\nDo you agree?')
        await page.waitForTimeout(timeouts.long)
        expect(alertsPage.dialogMessage, 'Alert should have proper message text').toEqual('No')
    })

    test('Check prompt input and resulting message', async ({ page, homePage }) => {
        const alertsPage = new AlertsPage(page)
        const answer = 'dogs'

        await homePage.openAlertsPage()
        alertsPage.handleDialog(true, answer)
        await page.locator('#promptButton').click()
        expect(alertsPage.dialogMessage, 'Prompt should have proper message text').toEqual('Choose "cats" or \'dogs\'.\nEnter your value:')
        expect(alertsPage.defaultAnswer, 'Prompt should have proper value prefilled').toEqual('cats')
        await page.waitForTimeout(timeouts.long)
        expect(alertsPage.dialogMessage, 'Alert should contain user answer').toEqual(`User value: ${answer}`)
    })
})

test('Check file upload with drag&drop and file system browsing @regression', async ({ page, homePage }) => {
    const uploadPage = new UploadPage(page)
    const browseFileName = 'lorem_ipsum.txt'

    // drag&drop from OS filesystem case not implemented due to the fact PW cannot operate outside of browser context

    await homePage.openUploadPage()
    await uploadPage.browseFile(`./resources/data/${browseFileName}`)
    await expect(uploadPage.fileList, 'Browsed file should be in uploaded files list').toContainText(browseFileName)
    await expect(uploadPage.infoMessage, 'Number of uploaded files should be displayed').toHaveText('1 file(s) selected')
})

test('Check button after animation @regression', async ({ page, homePage }) => {
    const animationPage = new AnimationPage(page)

    await homePage.openAnimationPage()
    await animationPage.clickStartAnimationButton()
    await animationPage.waitForAnimationToFinish(timeouts.medium)
    await animationPage.clickMovingTargetButton()
    await expect(animationPage.finalMessage, 'Final status message should contain proper value').toContainText('btn btn-primary')
})

test('Check input into disabled text field after delay @regression', async ({ page, homePage }) => {
    const disabledInputPage = new DisabledInputPage(page)
    const inputValue = 'BILLIONS AND BILLIONS!!!11'

    await homePage.openDisabledInputPage()
    await disabledInputPage.clickEnableButton()
    await disabledInputPage.inputText(inputValue, timeouts.medium)
    await expect(disabledInputPage.inforMessage, 'Info message should contain user input').toHaveText(`Value changed to: ${inputValue}`)
})

test.describe('Suite: Verify accessibility of different elements after delay @regression', async () => {
    const visible     = 'Visible'
    const enabled     = 'Enable'
    const editable    = 'Editable'
    const onTop       = 'On Top'
    const nonZeroSize = 'Non Zero Size'
    
    test('Check button invisibility and click after delay', async ({ page, homePage }) => {
        const autoWaitPage = new AutoWaitPage(page)

        await homePage.openAutoWaitPage()
        await autoWaitPage.chooseElement('button')
        await autoWaitPage.setState(visible, false)
        await autoWaitPage.setShortDelay()
        await expect(autoWaitPage.targetButton, 'Target button should become invisible').not.toBeVisible()
        await autoWaitPage.waitForDelay()
        await autoWaitPage.clickTargetButton()
        await expect(autoWaitPage.statusMessage, 'Status message should indicate button click').toHaveText('Target clicked.')
    })

    test('Check disabling input and fill-in after delay', async ({ page, homePage }) => {
        const autoWaitPage = new AutoWaitPage(page)
        const userInput = 'arcane rain fell'

        await homePage.openAutoWaitPage()
        await autoWaitPage.chooseElement('input')
        await autoWaitPage.setState(enabled, false)
        await autoWaitPage.setMediumDelay()
        await expect(autoWaitPage.targetInput, 'Target input should become disabled').not.toBeEnabled()
        await autoWaitPage.waitForDelay()
        await autoWaitPage.fillTargetInput(userInput)
        await expect(autoWaitPage.statusMessage, 'Status message should contain user input').toHaveText(`Text: ${userInput}`)
    })

    // skipped non-editable textbox case since it is similar to disabled input case

    test('Check selection dropdown after being covered by another element', async ({ page, homePage }) => {
        const autoWaitPage = new AutoWaitPage(page)
        const options = ['Item 1', 'Item 2', 'Item 3']
        const chosenOption = randomElement(options)

        await homePage.openAutoWaitPage()
        await autoWaitPage.chooseElement('select')
        await autoWaitPage.setState(onTop, false)
        await autoWaitPage.setMediumDelay()
        // TODO: add assertion for element getting covered by another element
        await autoWaitPage.waitForDelay()
        await autoWaitPage.pickFromTargetSelect(chosenOption)
        await expect(autoWaitPage.statusMessage, 'Status message should contain selected option').toHaveText(`Selected: ${chosenOption}`)
    })

    test('Check label visibility change by setting size after delay', async ({ page, homePage }) => {
        const autoWaitPage = new AutoWaitPage(page)

        await homePage.openAutoWaitPage()
        await autoWaitPage.chooseElement('label')
        await autoWaitPage.setState(nonZeroSize, false)
        await autoWaitPage.setLongDelay()
        await expect(autoWaitPage.targetLabel, 'Label should become invisible').not.toBeVisible()
        await autoWaitPage.waitForDelay()
        await expect(autoWaitPage.targetLabel, 'Label should become visible again').toBeVisible()
    })
})
