import { test, expect } from '@playwright/test';

import 'colors';

test.describe('待辦清單測試', async () => {
    test.describe.configure({ mode: 'serial' }); // 串行測試(其中有失敗的測試,後面就都不會測了)

    const testStr1: string = '去7-11取件';
    const testStr2: string = '去蝦皮取件';

    test('新增資料', async ({ page }) => {

        await page.goto('http://localhost:3003/');
        await expect(page.getByRole('heading')).toContainText('Demo 我的待辦清單');
        await page.getByPlaceholder('按下Enter送出資料').click();
        await page.getByPlaceholder('按下Enter送出資料').fill(testStr1);
        await page.getByPlaceholder('按下Enter送出資料').press('Enter');
        await page.getByPlaceholder('按下Enter送出資料').click();
        await page.getByPlaceholder('按下Enter送出資料').fill(testStr2);
        await page.getByPlaceholder('按下Enter送出資料').press('Enter');
        await expect(page.getByRole('group', { name: '待辦' }).locator(`span:has-text("${testStr1}")`)).toContainText(testStr1);
        await expect(page.getByRole('group', { name: '待辦' }).locator(`span:has-text("${testStr2}")`)).toContainText(testStr2);
        page.close();
    });

    test('修改資料', async ({ page }) => {
        await page.goto('http://localhost:3003/');
        await expect(page.getByRole('heading')).toContainText('Demo 我的待辦清單');
        await page.getByText(testStr1).dblclick();

        await page.getByRole('group', { name: '待辦' }).getByPlaceholder('按下Enter送出資料').fill(`${testStr1},2點`);
        await page.getByRole('group', { name: '待辦' }).getByPlaceholder('按下Enter送出資料').press('Enter');
        await expect(page.locator(`span:has-text("${testStr1},2點")`)).toContainText(`${testStr1},2點`);
        page.close();
    });

    test('完成資料', async ({ page, baseURL }, testInfo) => {
        await page.goto(baseURL);
        await expect(page.getByRole('heading')).toContainText('Demo 我的待辦清單');

        await page.getByRole('group', { name: '待辦' }).getByTestId('todolist').filter({ hasText: `${testStr1},2點` }).locator('button', { hasText: 'OK' }).click();
        expect(await page.getByRole('group', { name: '完成' }).getByTestId('finishlist').filter({ hasText: `${testStr1},2點` }).count()).toEqual(1);
        page.close();
    });

    test('刪除資料', async ({ page }) => {
        await page.goto('http://localhost:3003/');
        await expect(page.getByRole('heading')).toContainText('Demo 我的待辦清單');

        await page.getByRole('group', { name: '待辦' }).getByTestId('todolist').filter({ hasText: testStr2 }).locator('button', { hasText: 'D' }).click();
        expect(await page.getByRole('group', { name: '待辦' }).getByTestId('todolist').locator(`span:has-text("${testStr2}")`).count()).toEqual(0);

        page.close();
    });

});