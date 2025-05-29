import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    fullyParallel: true,
    reporter: 'html',
    use: {
        baseURL: 'http://uitestingplayground.com/',
        actionTimeout: 5000,
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },
        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] },
        // },
    ],
})
