import { expect, test } from '@playwright/test';

import { localeFixtures, openHome, widths } from '../helpers/portfolio';

test('home navigation reaches projects @smoke', async ({ page }) => {
  await openHome(page);
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Projects', exact: true })
    .click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(
    page.getByRole('heading', { name: 'Personal Projects' }),
  ).toBeVisible();
  if (process.env.HARNESS_FAILURE === 'browser') {
    await expect(
      page.getByRole('heading', { name: 'Intentional missing heading' }),
    ).toBeVisible({ timeout: 1000 });
  }
});

test('mobile menu works by keyboard @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHome(page);
  const menu = page.getByRole('button', { name: 'Toggle user menu' });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('menu')).toBeVisible();
  await page.getByRole('menuitem', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(menu).toBeFocused();
});

for (const width of widths) {
  test(`home navigation fits ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await openHome(page);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
  });
}

test('server navigation is visible without JavaScript @smoke', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('http://localhost:3100/en');
    await expect(
      page
        .getByRole('navigation')
        .getByRole('link', { name: 'Projects', exact: true }),
    ).toHaveAttribute('href', '/en#projects');
    await expect(page.getByRole('main')).toHaveCount(1);
    const opacity = await page
      .getByRole('navigation')
      .evaluate((navigation) => {
        let opacity = 1;
        for (
          let element: Element | null = navigation;
          element;
          element = element.parentElement
        ) {
          opacity *= Number(getComputedStyle(element).opacity);
        }
        return opacity;
      });
    expect(opacity).toBe(1);
  } finally {
    await context.close();
  }
});

test('future-locale fixture text fits at each required width', async ({
  page,
}) => {
  await openHome(page);
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const text of Object.values(localeFixtures)) {
      await page
        .getByRole('heading', {
          name: /Personal Projects|プロジェクトと意思決定|项目与工程决策/,
        })
        .evaluate((element, value) => {
          element.textContent = value;
        }, text);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    }
  }
});

test('reduced-motion context retains working navigation', async ({ page }) => {
  await openHome(page);
  expect(
    await page.evaluate(
      () => matchMedia('(prefers-reduced-motion: reduce)').matches,
    ),
  ).toBe(true);
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Projects', exact: true })
    .click();
  await expect(page).toHaveURL(/#projects$/);
});
