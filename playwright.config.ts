import './utils/envConfig';
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    globalSetup: require.resolve('./global.setup.ts'),
    globalTeardown: require.resolve('./global.teardown.ts'),
    timeout: 10 * 60 * 1000,
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        channel: 'chromium', // 'chromium' or 'chrome'
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.BASE_URL,
        storageState: './temp/storageState.json',
        headless: (process.env.HEADLESS === 'false') ? false : true,
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
            slowMo: Number(process.env.SLOWMO) ? Number(process.env.SLOWMO) : 0
        },
        video: {
            mode: 'on',
            size: { width: 1920, height: 1080 }
        },
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        contextOptions: {
            ignoreHTTPSErrors: true
        }
    },

    /* Configure projects for major browsers */
    // projects: [
    //     {
    //         name: 'chromium',
    //         use: {
    //             ...devices['Desktop Chrome'],
    //             baseURL: process.env.BASE_URL,
    //             // storageState: './temp/storageState.json',
    //             headless: (process.env.HEADLESS === 'false') ? false : true,
    //             viewport: { width: 1920, height: 1080 },
    //             launchOptions: {
    //                 slowMo: Number(process.env.SLOWMO) ? Number(process.env.SLOWMO) : 0
    //             },
    //             contextOptions: {
    //                 ignoreHTTPSErrors: true
    //             }
    //         },
    //     },

    //     // {
    //     //   name: 'firefox',
    //     //   use: { ...devices['Desktop Firefox'] },
    //     // },

    //     // {
    //     //   name: 'webkit',
    //     //   use: { ...devices['Desktop Safari'] },
    //     // },

    //     /* Test against mobile viewports. */
    //     // {
    //     //   name: 'Mobile Chrome',
    //     //   use: { ...devices['Pixel 5'] },
    //     // },
    //     // {
    //     //   name: 'Mobile Safari',
    //     //   use: { ...devices['iPhone 12'] },
    //     // },

    //     /* Test against branded browsers. */
    //     // {
    //     //   name: 'Microsoft Edge',
    //     //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    //     // },
    //     // {
    //     //   name: 'Google Chrome',
    //     //   use: {
    //     //     ...devices['Desktop Chrome'],
    //     //     channel: 'chrome',
    //     //     baseURL: process.env.BASE_URL,
    //     //     headless: (process.env.HEADLESS === 'false') ? false : true,
    //     //     viewport: { width: 1920, height: 1080 },
    //     //     launchOptions: {
    //     //       slowMo: Number(process.env.SLOWMO) ? Number(process.env.SLOWMO) : 0
    //     //     },
    //     //   },
    //     // },
    // ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
