import { expect, test } from '@playwright/test'
import { DynamicIdPage } from '../pages/dynamicIdPage'
import { HomePage } from '../pages/homePage'
import { ClassAttributePage } from '../pages/classAttributePage'
import { HiddenLayersPage } from '../pages/hiddenLayersPage'
import { LoadDelayPage } from '../pages/loadDelayPage'

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

test('verify z-index of overlapping buttons @regression', async ({ page }) => {
    const hiddenLayersPage = new HiddenLayersPage(page)

    await homePage.openHiddenLayersPage()
    await hiddenLayersPage.clickGreenButton()
    await expect(hiddenLayersPage.greenButtonDiv, 'Incorrect z-index of green button').toHaveCSS('z-index', '1')
    await expect(hiddenLayersPage.blueButtonDiv, 'Incorrect z-index of blue button').toHaveCSS('z-index', '2')
})

test('delayed load with custom timeout @regression', async ({ page }) => {
    const loadDelayPage = new LoadDelayPage(page)

    await homePage.openLoadDelayPage(10000)
    await expect(loadDelayPage.delayedButton, 'Load delay button not visible').toBeVisible()
})
