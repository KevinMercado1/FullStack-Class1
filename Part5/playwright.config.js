// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
testDir: './tests',
timeout: 60000,
expect: {
    timeout: 10000
},
fullyParallel: true,
retries: process.env.CI ? 2 : 0,
use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    actionTimeout: 10000,
    navigationTimeout: 30000,
},
webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
},
projects: [
    {
    name: 'setup',
    testMatch: /global.setup\.ts/,
    },
    {
    name: 'tests',
    dependencies: ['setup'],
    },
],
});

