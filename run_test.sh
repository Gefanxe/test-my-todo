#!/bin/bash

# cd app
cd /app

# 關閉 SELF_SIGNED_CERT_IN_CHAIN 錯誤
npm config set strict-ssl false

# install node modules
npm i

# run test
npx playwright test