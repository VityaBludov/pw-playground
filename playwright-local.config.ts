import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    reporter: 'html',
    use: {
        baseURL: 'http://staging.uitestingplayground.com',
        actionTimeout: 10000,
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
    ],
})
