import AxeBuilder from '@axe-core/playwright';
import { type Page, type TestInfo, expect } from '@playwright/test';

export const widths = [360, 390, 768, 1024, 1440] as const;
export const localeFixtures = {
  en: 'Personal Projects',
  ja: 'プロジェクトと意思決定',
  zh: '项目与工程决策',
} as const;
export const localePath = (path = '', locale = 'en') => `/${locale}${path}`;

export async function openHome(page: Page) {
  const response = await page.goto(localePath());
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('navigation')).toBeVisible();
}

export async function audit(page: Page, info: TestInfo) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const { writeFile } = await import('node:fs/promises');
  const path = info.outputPath('axe-results.json');
  await writeFile(path, JSON.stringify(results, null, 2));
  await info.attach('axe-results', { path, contentType: 'application/json' });
  return results;
}
