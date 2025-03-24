import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    reporter: 'html',
    use: {
        baseURL: 'http://127.0.0.1:40000',
        actionTimeout: 20000,
    },

    projects: [
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
    ],
})
