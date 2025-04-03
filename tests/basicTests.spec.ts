import { test } from '@playwright/test'
import { PageManager } from '../pages/pageManager'
import { DynamicIdPage } from '../pages/dynamicIdPage'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('basic tests to check each page one by one', async ({ page }) => {
    const pm: PageManager = new PageManager(page)
    await pm.open().dynamicIdPage()
    const dynamicIdPage: DynamicIdPage = new DynamicIdPage(page)

    await dynamicIdPage.clickButton()
})
