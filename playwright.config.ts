import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  use: {
    channel: process.env.PLAYWRIGHT_CHANNEL,
    baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:3100",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "laptop", use: { viewport: { width: 1366, height: 650 } } },
    { name: "laptop-scaled", use: { viewport: { width: 1280, height: 600 } } },
    { name: "laptop-narrow", use: { viewport: { width: 1024, height: 560 } } },
    { name: "laptop-short", use: { viewport: { width: 1440, height: 500 } } },
    { name: "mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" } },
    { name: "reduced-motion", use: { ...devices["Desktop Chrome"], reducedMotion: "reduce" } },
  ],
  webServer: process.env.TEST_BASE_URL
    ? undefined
    : {
        command: "npm run dev -- --port 3100",
        url: "http://127.0.0.1:3100",
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
      },
});
