import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    fullyParallel: true,
    reporter: 'html',
    use: {
        baseURL: 'http://127.0.0.1:3000',
        actionTimeout: 20000,
    },

    projects: [
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
    ],

    webServer: {
        command: 'npm run start-server',
        timeout: 5 * 1000,
    }
})
