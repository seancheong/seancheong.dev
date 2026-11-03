import { expect, test } from '@playwright/test';

import { openHome } from '../helpers/portfolio';

test('spotlight is passive, mouse-only, and follows preference changes @smoke', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await openHome(page);
  const spotlight = page.locator('.portfolio-spotlight');
  await page.mouse.move(1270, 710);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(page.viewportSize()!.width);
  await page.mouse.move(300, 300);
  await expect(spotlight).toHaveCSS('display', 'block');
  await expect(spotlight).toHaveCSS('pointer-events', 'none');
  const contact = page.locator('.site-desktop-links .site-contact-link');
  await expect(contact).toHaveCSS('transition-duration', '0.12s, 0.12s');
  await page.evaluate(() =>
    window.dispatchEvent(
      new PointerEvent('pointermove', {
        pointerType: 'pen',
        clientX: 300,
        clientY: 300,
      }),
    ),
  );
  await expect(spotlight).toHaveCSS('display', 'none');
  await page.mouse.move(310, 310);
  await expect(spotlight).toHaveCSS('display', 'block');
  expect(
    await spotlight.evaluate((el) => getComputedStyle(el, '::before').opacity),
  ).toBe('0.011');
  await expect(spotlight).toHaveAttribute('aria-hidden', 'true');
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Sean Cheong', exact: true })
    .focus();
  await page.keyboard.press('Tab');
  await expect(spotlight).toHaveCSS('display', 'none');
  await page.mouse.move(320, 320);
  await expect(spotlight).toHaveCSS('display', 'block');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(spotlight).toHaveCSS('display', 'none');
  await page.mouse.move(340, 340);
  await expect(spotlight).toHaveCSS('display', 'none');
  expect(
    await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--motion-standard')
        .trim(),
    ),
  ).toBe('0ms');
  await page.screenshot({
    path: `artifacts/browser/motion-reduced-${test.info().project.name}.png`,
  });
});

test('touch input never enables the spotlight @smoke', async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 390, height: 844 },
    reducedMotion: 'no-preference',
  });
  try {
    const page = await context.newPage();
    await openHome(page);
    await page.getByRole('button', { name: 'Menu', exact: true }).tap();
    await expect(page.locator('.site-mobile-navigation')).toHaveAttribute(
      'open',
      '',
    );
    await expect(page.locator('.portfolio-spotlight')).toHaveCSS(
      'display',
      'none',
    );
    await page.screenshot({
      path: `artifacts/browser/motion-touch-${test.info().project.name}.png`,
    });
  } finally {
    await context.close();
  }
});

test('motion content remains readable without JavaScript @smoke', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: 'no-preference',
  });
  try {
    const page = await context.newPage();
    await openHome(page);
    for (const id of ['experience', 'projects']) {
      const region = page.locator(`#${id}`);
      await region.scrollIntoViewIfNeeded();
      await expect(region).toHaveCSS('opacity', '1');
      await expect(region.getByRole('heading').first()).toBeVisible();
    }
    await expect(page.locator('.portfolio-spotlight')).toHaveCSS(
      'display',
      'none',
    );
    await page.screenshot({
      path: `artifacts/browser/motion-no-js-${test.info().project.name}.png`,
    });
  } finally {
    await context.close();
  }
});
