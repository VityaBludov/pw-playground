import { defineConfig, devices } from '@playwright/test'
import { testConfig } from './testConfig'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env') })

const envName: string = process.env.ENV ? process.env.ENV : 'localhost'
const envConfig = testConfig[envName]
const baseUrl = envConfig.baseUrl // TODO: fix case when ENV set in package.json script

export default defineConfig({
    reporter: 'html',
    use: {
        baseURL: baseUrl,
        //actionTimeout: testConfig[`${process.env.ENV}.timeout`] ? testConfig[`${process.env.ENV}.timeout`] : 5000,
        trace: 'on-first-retry',
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
