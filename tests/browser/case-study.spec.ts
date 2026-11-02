import { expect, test } from '@playwright/test';

import { widths } from '../helpers/portfolio';

test('Home to Takonbini summary, depth and contact @smoke', async ({
  page,
}) => {
  await page.goto('/en');
  await page.locator('a[href="/en/work/takonbini"]').click();
  await expect(page).toHaveURL(/\/en\/work\/takonbini$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Takonbini' }),
  ).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'Why I built it' }),
  ).toContainText('Lawson near my home');
  const depth = page.locator('details').filter({
    has: page.getByRole('heading', {
      name: 'Verified outcomes',
      exact: true,
    }),
  });
  await depth.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(depth).toHaveAttribute('open', '');
  await expect(depth).toContainText('0.125');
  await page.getByRole('link', { name: 'Contact Sean' }).click();
  await expect(page).toHaveURL(/\/en#contact$/);
});

for (const width of widths)
  test(`case study fits ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/en/work/takonbini');
    await page.locator('details.case-disclosure').evaluateAll((elements) =>
      elements.forEach((el) => {
        if (el instanceof HTMLDetailsElement) el.open = true;
      }),
    );
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await page.screenshot({
      path: `artifacts/browser/case-study-${width}.png`,
    });
  });

test('case study remains readable and disclosures work without JavaScript @smoke', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: 'no-preference',
  });
  try {
    const page = await context.newPage();
    const response = await page.goto('http://localhost:3100/en/work/takonbini');
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole('region', { name: 'Why I built it' }),
    ).toContainText('Lawson near my home');
    await page
      .getByRole('heading', { name: 'Verified outcomes', exact: true })
      .click();
    await expect(page.getByText(/At most|at most 100/).first()).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Remaining work', exact: true }),
    ).toBeVisible();
  } finally {
    await context.close();
  }
});

test('case-study metadata, image loading and two-project navigation are truthful @smoke', async ({
  page,
}) => {
  await page.goto('/en/work/takonbini');
  await expect(page).toHaveTitle('Takonbini — Sean Cheong');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://www.seancheong.dev/en/work/takonbini',
  );
  const images = page.locator('article.case-study img');
  await expect(images).toHaveCount(4);
  await images.first().scrollIntoViewIfNeeded();
  await expect(images.first()).toHaveAttribute('loading', 'lazy');
  await expect(images.first()).toHaveAttribute('width', '1440');
  await expect(images.first()).toHaveJSProperty('complete', true);
  expect(
    await images
      .first()
      .evaluate((image) =>
        image instanceof HTMLImageElement ? image.naturalWidth : 0,
      ),
  ).toBeGreaterThan(0);
  await expect(images.nth(1)).toHaveAttribute('loading', 'lazy');
  await page.goto('/en');
  for (const hidden of [
    'https://tripa-six.vercel.app/',
    'https://cashush.com',
    'https://chroma-ui.vercel.app/',
  ])
    await expect(page.locator(`a[href="${hidden}"]`)).toHaveCount(0);
});

test('touch disclosure works with normal motion and compact reflow @smoke', async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 390, height: 844 },
    reducedMotion: 'no-preference',
  });
  try {
    const page = await context.newPage();
    await page.goto('http://localhost:3100/en/work/takonbini');
    const disclosure = page.locator('details.case-disclosure').first();
    await disclosure.locator('summary').tap();
    await expect(disclosure).toHaveAttribute('open', '');
    await expect(disclosure).toContainText('five pages of 20');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
    await page.screenshot({
      path: `artifacts/browser/case-study-touch-${test.info().project.name}.png`,
    });
  } finally {
    await context.close();
  }
});
