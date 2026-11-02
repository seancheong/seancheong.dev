import { expect, test } from '@playwright/test';

import { audit, openHome } from '../helpers/portfolio';

test('hydrated home accessibility', async ({ page }, info) => {
  await openHome(page);
  await page
    .getByRole('heading', { name: 'Personal Projects' })
    .scrollIntoViewIfNeeded();
  if (process.env.HARNESS_FAILURE === 'axe') {
    await page.evaluate(() => {
      const image = document.createElement('img');
      image.src = '/favicon.ico';
      document.querySelector('main')?.append(image);
    });
  }
  const result = await audit(page, info);
  expect(result.violations).toEqual([]);
});

test('mobile shell accessibility', async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHome(page);
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  const result = await audit(page, info);
  expect(result.violations).toEqual([]);
});

test('case study accessibility with all optional depth open', async ({
  page,
}, info) => {
  await page.goto('/en/work/takonbini');
  await page.locator('details.case-disclosure').evaluateAll((elements) =>
    elements.forEach((el) => {
      if (el instanceof HTMLDetailsElement) el.open = true;
    }),
  );
  expect((await audit(page, info)).violations).toEqual([]);
});
