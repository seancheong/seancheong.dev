import { defineConfig, devices } from '@playwright/test';

const suite = process.env.HARNESS_FAILURE
  ? `probes/${process.env.HARNESS_FAILURE}`
  : (process.env.QUALITY_SUITE ?? 'browser');

export default defineConfig({
  testDir: './tests/browser',
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: `artifacts/${suite}-report`, open: 'never' }],
  ],
  outputDir: `artifacts/${suite}`,
  use: {
    baseURL: 'http://localhost:3100',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    contextOptions: { reducedMotion: 'reduce' },
  },
  webServer: {
    command: 'pnpm start --hostname localhost --port 3100',
    url: 'http://localhost:3100/en',
    reuseExistingServer: false,
    timeout: 60_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', grep: /@smoke/, use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', grep: /@smoke/, use: { ...devices['Desktop Safari'] } },
  ],
});
