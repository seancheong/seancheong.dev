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
