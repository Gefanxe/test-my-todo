import type { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
    console.log("globalTeardown !\n");
}

export default globalTeardown;
