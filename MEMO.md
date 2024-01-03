### 初始的測試想看網頁的動作過程, 可以用以下命令

```shell
npx playwright test --headed

# 測試 cli 參考
npx playwright test tests/lend/ --headed
npx playwright test tests/test/ --headed
npx playwright test tests/main/ --headed

# 指定檔案測試
npx playwright test form1.spec.ts

# 指定環境變數及開啟debug資訊, 指定檔案測試
npx cross-env NODE_ENV=local DEBUG=pw:api npx playwright test form1.spec.ts

# 指定標題測試 (test([標題]))
npx cross-env NODE_ENV=local DEBUG=pw:api npx playwright test -g "檢查資料API載入"

```

### 看最後一次的測試報告

```shell
npx playwright show-report
```

### 使用生成器產生操作流程代碼

```shell
npx playwright codegen http://localhost:3003 --viewport-size=1920,1080
npx playwright codegen http://localhost:5123/domCheck/index.html --viewport-size=1920,1080
npx playwright codegen http://localhost:5123/form/bootstrap-form1.html --viewport-size=1920,1080
npx playwright codegen http://localhost:5123/ajax/index.html --viewport-size=1920,1080
npx playwright codegen http://localhost:5123/notify/modal.html --viewport-size=1920,1080
npx playwright codegen http://127.0.0.1:5500/playwright_test.html
```

### 想要動作不要那麼快, 設定 slowMo 參數

```javascript
test("get started link", async ({ browser }) => {
  const b = await browser.browserType().launch({
    slowMo: 3000,
  });
  const c = await b.newContext();
  const page = await c.newPage();

  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
```
