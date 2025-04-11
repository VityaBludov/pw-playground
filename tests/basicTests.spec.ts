import { expect, test } from '@playwright/test'
import { DynamicIdPage } from '../pages/dynamicIdPage'
import { HomePage } from '../pages/homePage'
import { ClassAttributePage } from '../pages/classAttributePage'
import { HiddenLayersPage } from '../pages/hiddenLayersPage'

let homePage: HomePage

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await page.goto('/')
})

test('dynamic ID page @regression', async ({ page }) => {
    const dynamicIdPage: DynamicIdPage = new DynamicIdPage(page)

    await homePage.openDynamicIdPage()
    await dynamicIdPage.clickButton()
    // no click outcome, nothing to assert
})

test('class attribute page @regression', async ({ page }) => {
    const classAttributePage = new ClassAttributePage(page)

    await homePage.openClassAttributePage()
    await classAttributePage.clickPrimaryButton()
    await classAttributePage.clickPopupButton()
})

test('hidden layers page @regression', async ({ page }) => {
    const hiddenLayersPage = new HiddenLayersPage(page)

    await homePage.openHiddenLayersPage()
    await hiddenLayersPage.clickGreenButton()
    await expect(hiddenLayersPage.greenButtonDiv).toHaveCSS('z-index', '1')
    await expect(hiddenLayersPage.blueButtonDiv).toHaveCSS('z-index', '2')
})
