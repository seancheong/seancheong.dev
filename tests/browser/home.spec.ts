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
  const menu = page.getByRole('button', { name: 'Menu', exact: true });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('details')).toHaveAttribute('open', '');
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Projects', exact: true })
    .click();
  await expect(page.locator('details')).not.toHaveAttribute('open', '');
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('#projects')).toBeFocused();
});

for (const width of widths) {
  test(`home navigation fits ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await openHome(page);
    await page.screenshot({ path: `artifacts/browser/shell-${width}.png` });
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
    // Navigation must remain usable while project images are still loading.
    await page.route('**/_next/image?*', () => {});
    await page.goto('http://localhost:3100/en', {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.getByRole('navigation')).toBeVisible();
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

test('shell landmarks, skip link and Articles anchor work @smoke', async ({
  page,
}) => {
  await openHome(page);
  await expect(page.getByRole('banner')).toHaveCount(1);
  await expect(page.getByRole('main')).toHaveCount(1);
  await expect(page.getByRole('contentinfo')).toHaveCount(1);
  await page.keyboard.press(
    test.info().project.name === 'webkit' ? 'Alt+Tab' : 'Tab',
  );
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Articles', exact: true })
    .click();
  await expect(page).toHaveURL(/\/en#articles$/);
  await expect(
    page.getByRole('heading', { name: 'Articles', exact: true }),
  ).toBeVisible();
});

test('mobile disclosure supports Escape and visible keyboard focus @smoke', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await openHome(page);
  const menu = page.getByRole('button', { name: 'Menu', exact: true });
  await menu.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press(
    test.info().project.name === 'webkit' ? 'Alt+Tab' : 'Tab',
  );
  await expect(
    page
      .getByRole('navigation')
      .getByRole('link', { name: 'Home', exact: true }),
  ).toBeFocused();
  await page.screenshot({
    path: `artifacts/browser/shell-keyboard-menu-${test.info().project.name}.png`,
  });
  await page.keyboard.press('Escape');
  await expect(page.locator('details')).not.toHaveAttribute('open', '');
  await expect(menu).toBeFocused();
});

test('mobile navigation and body content work without JavaScript @smoke', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 360, height: 800 },
  });
  try {
    const page = await context.newPage();
    await page.goto('http://localhost:3100/en', {
      waitUntil: 'domcontentloaded',
    });
    await expect(
      page.getByRole('heading', { name: "Hi, I'm Sean,", exact: true }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await page
      .getByRole('navigation')
      .getByRole('link', { name: 'Experience', exact: true })
      .click();
    await expect(page).toHaveURL(/\/en#experience$/);
    await expect(
      page.getByRole('heading', { name: 'Work Experience', exact: true }),
    ).toBeVisible();
    const opacity = await page
      .locator('#experience')
      .evaluate((element) => getComputedStyle(element).opacity);
    expect(opacity).toBe('1');
    await expect(page.getByRole('contentinfo')).toContainText(
      'Kuala Lumpur, Malaysia',
    );
  } finally {
    await context.close();
  }
});

test('navigation wraps longer future-locale labels without overflow', async ({
  page,
}) => {
  await openHome(page);
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    if (width < 768)
      await page.locator('details').evaluate((element: HTMLDetailsElement) => {
        element.open = true;
      });
    for (const label of [
      '職務経験とプロジェクトでの意思決定',
      '工作经历与工程项目中的技术决策',
    ]) {
      await page
        .getByRole('navigation')
        .getByRole('link', {
          name: /Experience|職務経験とプロジェクトでの意思決定|工作经历与工程项目中的技术决策/,
          exact: true,
        })
        .evaluate((element, text) => {
          element.textContent = text;
        }, label);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    }
  }
});

test('anchor targets clear the sticky header with one offset @smoke', async ({
  page,
}) => {
  for (const width of [390, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await openHome(page);
    if (width < 768)
      await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await page
      .getByRole('navigation')
      .getByRole('link', { name: 'Projects', exact: true })
      .click();
    await expect(page).toHaveURL(/#projects$/);
    const headerBottom = await page
      .getByRole('banner')
      .evaluate((element) => element.getBoundingClientRect().bottom);
    const targetTop = await page
      .locator('#projects')
      .evaluate((element) => element.getBoundingClientRect().top);
    expect(targetTop).toBeGreaterThanOrEqual(headerBottom);
    expect(targetTop).toBeLessThanOrEqual(headerBottom + 24);
  }
});

test('Container caller utilities override foundation width and gutters', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await openHome(page);
  await page.locator('.site-header .site-container').evaluate((element) => {
    element.classList.add('max-w-7xl', 'px-4');
  });
  const style = await page
    .locator('.site-header .site-container')
    .evaluate((element) => {
      const computed = getComputedStyle(element);
      return { width: computed.maxWidth, padding: computed.paddingInlineStart };
    });
  expect(style).toEqual({ width: '1280px', padding: '16px' });
});
