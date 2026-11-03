import { type Route, expect, test } from '@playwright/test';

import { widths } from '../helpers/portfolio';

test('country details support keyboard dismissal and return focus @smoke', async ({
  page,
}) => {
  await page.goto('/en');
  const japan = page.locator('#country-japan summary');
  await japan.focus();
  await page.keyboard.press('Enter');
  const details = page.getByRole('region', { name: 'Japan companies' });
  await expect(details).toBeVisible();
  await expect(
    details.getByRole('heading', { name: 'Woven by Toyota' }),
  ).toBeVisible();
  await expect(details.getByRole('heading', { name: 'Asurion' })).toBeVisible();
  await page.screenshot({
    path: `artifacts/browser/home-country-popup-${test.info().project.name}.png`,
  });
  await expect(
    page.getByRole('button', { name: 'Close country details' }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(details).not.toBeVisible();
  await expect(japan).toBeFocused();
  const target = page.getByRole('button', {
    name: 'Show companies in Malaysia',
  });
  await target.focus();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('region', { name: 'Malaysia companies' }),
  ).toContainText('Senior Consultant');
  await page.getByRole('button', { name: 'Close country details' }).click();
  await expect(target).toBeFocused();
  await page.locator('#country-japan summary').click();
  await page.locator('.home-map-intro').click();
  await expect(
    page.getByRole('region', { name: 'Japan companies' }),
  ).not.toBeVisible();
  expect(await target.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe(
    'none',
  );
  expect(await target.evaluate((el) => getComputedStyle(el).vectorEffect)).toBe(
    'non-scaling-stroke',
  );
});

test('orbit is opt-in, stationary choices work by keyboard, and reduced motion stops it @smoke', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/en');
  const orbit = page.getByRole('group', { name: 'Explore selected projects' });
  await expect(orbit).toHaveAttribute('data-spinning', 'false');
  const first = page.getByRole('radio', { name: 'Takonbini', exact: true });
  await first.focus();
  await page.keyboard.press('ArrowRight');
  await expect(
    page.getByRole('radio', { name: 'Script Blender', exact: true }),
  ).toBeChecked();
  await expect(
    orbit.getByRole('link', { name: 'Explore Script Blender' }),
  ).toBeVisible();
  await orbit.getByRole('button', { name: 'Spin orbit' }).click();
  await expect(orbit).toHaveAttribute('data-spinning', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(orbit).toHaveAttribute('data-spinning', 'false');
  await expect(orbit.locator('.home-orbit-track')).toHaveCSS(
    'animation-name',
    'none',
  );
});

test('Companion follows career reading position and pauses while country details are open @smoke', async ({
  page,
}) => {
  await page.goto('/en');
  await page
    .locator('[data-career-country="singapore"]')
    .first()
    .evaluate((element) => {
      scrollTo({
        top: scrollY + element.getBoundingClientRect().top - innerHeight * 0.35,
        behavior: 'instant',
      });
    });
  await expect(page.locator('.home-map-caption h3')).toHaveText('Singapore');
  await page.locator('#country-japan summary').click();
  await page
    .locator('[data-career-country="malaysia"]')
    .scrollIntoViewIfNeeded();
  await expect(page.locator('.home-map-caption h3')).toHaveText('Tokyo');
  await page.keyboard.press('Escape');
});

test('career progress is reversible, with a complete static fallback @smoke', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/en');
  const track = page.locator('.home-timeline-track');
  const value = () =>
    track.evaluate((el) =>
      Number(getComputedStyle(el).getPropertyValue('--career-progress')),
    );
  await page
    .locator('[data-career-country="singapore"]')
    .last()
    .scrollIntoViewIfNeeded();
  await expect.poll(value).toBeGreaterThan(0.5);
  const bottom = await value();
  await page
    .locator('[data-career-country="malaysia"]')
    .scrollIntoViewIfNeeded();
  await expect.poll(value).toBeLessThan(bottom);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(value).toBe(1);
});

for (const width of widths)
  test(`homepage journey fits ${width}px with country details`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/en');
    for (const country of ['singapore', 'japan', 'malaysia']) {
      await page.locator(`#country-${country} summary`).click();
      await expect(
        page.locator(`#country-${country} .home-country-popup`),
      ).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      await page.keyboard.press('Escape');
    }
    await page.evaluate(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
      scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.screenshot({
      path: `artifacts/browser/home-journey-${width}.png`,
      fullPage: true,
    });
  });

test('server content and native country/orbit choices work without JavaScript @smoke', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  try {
    const page = await context.newPage();
    await page.goto('http://localhost:3100/en', {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('#home-title')).toHaveText('SeanCheong.');
    await page.locator('label[for="orbit-script-blender"]').click();
    await expect(
      page.getByRole('link', { name: 'Explore Script Blender' }),
    ).toBeVisible();
    await page.locator('#country-japan summary').click();
    await expect(
      page.getByRole('region', { name: 'Japan companies' }),
    ).toBeVisible();
    await page.locator('#country-japan summary').click();
    await expect(
      page.getByRole('region', { name: 'Japan companies' }),
    ).not.toBeVisible();
    await page.getByRole('link', { name: 'Read the case study' }).click();
    await expect(page).toHaveURL(/\/en\/work\/takonbini$/);
  } finally {
    await context.close();
  }
});

test('touch country selection and popup dismissal @smoke', async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 390, height: 844 },
    reducedMotion: 'no-preference',
  });
  try {
    const page = await context.newPage();
    await page.goto('http://localhost:3100/en');
    await page.locator('#country-malaysia summary').tap();
    await expect(
      page.getByRole('region', { name: 'Malaysia companies' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Close country details' }).tap();
    await expect(page.locator('#country-malaysia summary')).toBeFocused();
    await page.screenshot({ path: 'artifacts/browser/home-journey-touch.png' });
  } finally {
    await context.close();
  }
});

test('homepage at 200 percent equivalent zoom preserves reading and country controls', async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 450 });
  await page.goto('/en');
  await page.locator('#country-japan summary').click();
  await expect(
    page.getByRole('region', { name: 'Japan companies' }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(640);
});

for (const javaScriptEnabled of [true, false])
  test(`Home real media decodes with JavaScript ${javaScriptEnabled} @smoke`, async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled });
    try {
      const page = await context.newPage();
      await page.goto('http://localhost:3100/en', {
        waitUntil: 'domcontentloaded',
      });
      const images = page.locator(
        '.home-current img, .home-showcase img, .home-timeline img',
      );
      await expect(images).toHaveCount(8);
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate(
              (element) =>
                element instanceof HTMLImageElement &&
                element.complete &&
                element.naturalWidth > 0,
            ),
          )
          .toBe(true);
        expect(Number(await image.getAttribute('width'))).toBeGreaterThan(0);
        expect(Number(await image.getAttribute('height'))).toBeGreaterThan(0);
        await expect(image).toHaveAttribute('alt', /.+/);
      }
    } finally {
      await context.close();
    }
  });

test('server content is readable before images finish without JavaScript @smoke', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const pending: Route[] = [];
  try {
    const page = await context.newPage();
    await page.route('**/_next/image?*', (route) => {
      pending.push(route);
    });
    await page.goto('http://localhost:3100/en', {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('#home-title')).toHaveText('SeanCheong.');
    await expect(page.locator('.home-timeline li')).toHaveCount(5);
    await expect(page.locator('.home-country summary')).toHaveCount(3);
    await expect.poll(() => pending.length).toBeGreaterThan(0);
  } finally {
    await Promise.all(pending.map((route) => route.abort()));
    await context.close();
  }
});
