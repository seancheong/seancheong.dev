import { expect, test } from '@playwright/test';

import { openHome } from '../helpers/portfolio';

test('one-time motion keeps content readable and stops for keyboard focus @smoke', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await openHome(page);
  const reveal = page.locator('#projects .portfolio-reveal');
  await expect(reveal).toHaveCSS('opacity', '1');
  // Record the real CSS animation rather than waiting on its short active state.
  await reveal.evaluate((element) => {
    element.addEventListener('animationstart', () => {
      element.setAttribute(
        'data-observed-animation',
        getComputedStyle(element).animationDuration,
      );
    });
  });
  await reveal.scrollIntoViewIfNeeded();
  await expect(reveal).toHaveAttribute('data-observed-animation', '0.22s');
  await expect(reveal).not.toHaveAttribute('data-revealing');
  await expect(reveal).toHaveCSS('transform', 'none');
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await reveal.evaluate((element) =>
    element.removeAttribute('data-observed-animation'),
  );
  await reveal.scrollIntoViewIfNeeded();
  await expect(reveal).not.toHaveAttribute('data-observed-animation');
  const link = reveal.getByRole('link').first();
  await link.focus();
  await expect(link).toBeFocused();
  await page.screenshot({
    path: `artifacts/browser/motion-normal-${test.info().project.name}.png`,
  });
});

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
    .getByRole('link', { name: 'Home', exact: true })
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
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(page.locator('#projects .portfolio-reveal')).toHaveCSS(
    'animation-name',
    'none',
  );
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
    await expect(page.locator('details')).toHaveAttribute('open', '');
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
      const region = page.locator(`#${id} .portfolio-reveal`);
      await region.scrollIntoViewIfNeeded();
      await expect(region).toHaveCSS('opacity', '1');
      await expect(region).toHaveCSS('transform', 'none');
      await expect(region).toHaveCSS('animation-name', 'none');
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
