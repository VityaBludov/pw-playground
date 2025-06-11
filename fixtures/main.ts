import { test as base } from '@playwright/test'
import { HomePage } from '../pages/homePage'

import { AjaxDataPage } from '../pages/ajaxDataPage'
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

type MainFixtures = {
    homePage: HomePage
    ajaxDataPage: AjaxDataPage
    alertsPage: AlertsPage
    animationPage: AnimationPage
    autoWaitPage: AutoWaitPage
    classAttributePage: ClassAttributePage
    clickPage: ClickPage
    clientSideDelayPage: ClientSideDelayPage
    disabledInputPage: DisabledInputPage
    dynamicIdPage: DynamicIdPage
    dynamicTablePage: DynamicTablePage
    hiddenLayersPage: HiddenLayersPage
    loadDelayPage: LoadDelayPage
    mouseOverPage: MouseOverPage
    nonBreakingSpacePage: NonBreakingSpacePage
    overlappedElementPage: OverlappedElementPage
    progressBarPage: ProgressBarPage
    sampleAppPage: SampleAppPage
    scrollbarsPage: ScrollbarsPage
    textInputPage: TextInputPage
    uploadPage: UploadPage
    verifyTextPage: VerifyTextPage
    visibilityPage: VisibilityPage
}

export const test = base.extend<MainFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page)
        await page.goto('/')
        await use(homePage)
    },
    
    ajaxDataPage: async ({ page }, use) => {
        await use(new AjaxDataPage(page))
    },

    alertsPage: async ({ page }, use) => {
        await use(new AlertsPage(page))
    },

    animationPage: async ({ page }, use) => {
        await use(new AnimationPage(page))
    },

    autoWaitPage: async ({ page }, use) => {
        await use(new AutoWaitPage(page))
    },

    classAttributePage: async ({ page }, use) => {
        await use(new ClassAttributePage(page))
    },

    clickPage: async ({ page }, use) => {
        await use(new ClickPage(page))
    },

    clientSideDelayPage: async ({ page }, use) => {
        await use(new ClientSideDelayPage(page))
    },

    disabledInputPage: async ({ page }, use) => {
        await use(new DisabledInputPage(page))
    },

    dynamicIdPage: async ({ page }, use) => {
        await use(new DynamicIdPage(page))
    },

    dynamicTablePage: async ({ page }, use) => {
        await use(new DynamicTablePage(page))
    },

    hiddenLayersPage: async ({ page }, use) => {
        await use(new HiddenLayersPage(page))
    },

    loadDelayPage: async ({ page }, use) => {
        await use(new LoadDelayPage(page))
    },

    mouseOverPage: async ({ page }, use) => {
        await use(new MouseOverPage(page))
    },

    nonBreakingSpacePage: async ({ page }, use) => {
        await use(new NonBreakingSpacePage(page))
    },

    overlappedElementPage: async ({ page }, use) => {
        await use(new OverlappedElementPage(page))
    },

    progressBarPage: async ({ page }, use) => {
        await use(new ProgressBarPage(page))
    },

    sampleAppPage: async ({ page }, use) => {
        await use(new SampleAppPage(page))
    },

    scrollbarsPage: async ({ page }, use) => {
        await use(new ScrollbarsPage(page))
    },

    textInputPage: async ({ page }, use) => {
        await use(new TextInputPage(page))
    },

    uploadPage: async ({ page }, use) => {
        await use(new UploadPage(page))
    },

    verifyTextPage: async ({ page }, use) => {
        await use(new VerifyTextPage(page))
    },

    visibilityPage: async ({ page }, use) => {
        await use(new VisibilityPage(page))
    },
})

export { expect } from '@playwright/test'
