import { test as base } from '@playwright/test'
import { HomePage } from '../pages/homePage'

import { AjaxDataPage } from '../pages/ajaxDataPage'

type MainFixtures = {
    homePage: HomePage
    ajaxDataPage: AjaxDataPage
}

export const test = base.extend<MainFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page)
        await page.goto('/')
        await use(homePage)
    },
    
    ajaxDataPage: async ({ page }, use) => {
        await use(new AjaxDataPage(page))
    }
})

export { expect } from '@playwright/test'
