import { chromium } from '@playwright/test';
import type { FullConfig } from '@playwright/test';

// 先完成登入,將Cookie存起來
async function globalSetup(config: FullConfig) {
    console.log('globalSetup!');

    const baseUrl = config.projects[0].use.baseURL as string;
    const storageState = config.projects[0].use.storageState as string;

    const browser = await chromium.launch();
    const context = await browser.newContext({
        ignoreHTTPSErrors: true
    });
    const page = await context.newPage();

    await page.goto(baseUrl);

    // await page.getByPlaceholder('集團員工編號').click();
    // await page.getByPlaceholder('集團員工編號').fill(process.env.TEST_USERNAME as string);
    // await page.getByPlaceholder('請輸入密碼').click();
    // await page.getByPlaceholder('請輸入密碼').fill(process.env.TEST_PASSWORD as string);
    // await page.getByRole('button', { name: '登入' }).click();
    // await page.waitForURL('**/CreditQuota/Index');
    await page.waitForURL(baseUrl);
    await page.context().storageState({ path: storageState });
    // // await page.screenshot({ path: './temp/screenshot_globalsetup.png' });
    await browser.close();
}

export default globalSetup;
