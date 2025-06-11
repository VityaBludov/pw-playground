import { test as base } from '@playwright/test'
import { HomePage } from '../pages/homePage'

type MainFixtures = {
    homePage: HomePage
}

export const test = base.extend<MainFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page)
        await page.goto('/')
        await use(homePage)
    }
})

export { expect } from '@playwright/test'
