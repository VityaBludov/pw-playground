import { test } from '@playwright/test'
import { DynamicIdPage } from '../pages/dynamicIdPage'
import { HomePage } from '../pages/homePage'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('basic tests to check each page one by one', async ({ page }) => {
    const homePage: HomePage = new HomePage(page)
    const dynamicIdPage: DynamicIdPage = new DynamicIdPage(page)

    homePage.openDynamicIdPage()
    await dynamicIdPage.clickButton()
    // no click outcome, nothing to assert
})
