### docker 執行測試

```shell
# run test in docker container for windows's powershell
docker run --name playwright-test -v ${PWD}:/app --rm mcr.microsoft.com/playwright:v1.36.2-jammy ./app/run_test.sh

# run test in docker container for linux shell
docker run --name playwright-test -v $(pwd):/app --rm mcr.microsoft.com/playwright:v1.36.2-jammy ./app/run_test.sh
```

### 測試範例

- DOM Element check ✅
- form validate check ✅
- ajax check ✅
- modal / alert check ✅
