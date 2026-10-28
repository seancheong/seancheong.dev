import { expect, test } from '@playwright/test';

import { openHome } from '../helpers/portfolio';

test('English navigation stays in its published locale @smoke', async ({
  page,
}) => {
  await openHome(page);
  await expect(page).toHaveTitle('Sean Cheong Zhen Xiong');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Senior Software Engineer/Team Lead',
  );
  expect(await page.content()).not.toContain(
    'A catalog of Japanese convenience-store products.',
  );
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(
    page
      .getByRole('navigation')
      .getByRole('link', { name: 'Home', exact: true }),
  ).toHaveAttribute('href', '/en');
  await expect(
    page
      .getByRole('navigation')
      .getByRole('link', { name: 'Projects', exact: true }),
  ).toHaveAttribute('href', '/en#projects');
  await expect(
    page.locator('a[href="https://tripa-six.vercel.app/"]'),
  ).toHaveCount(1);
  await expect(page.locator('a[href="https://cashush.com"]')).toHaveCount(0);
  await expect(
    page.locator('link[hreflang="ja"], link[hreflang="zh-Hans"]'),
  ).toHaveCount(0);
});

for (const route of [
  '/ja',
  '/zh-Hans',
  '/zh',
  '/fr',
  '/ja/work/tripa',
  '/en/work/missing',
  '/en/work/takonbini',
  '/en/articles/missing',
]) {
  test(`${route} returns an actual 404 without a locale redirect @smoke`, async ({
    request,
  }) => {
    const response = await request.get(route, { maxRedirects: 0 });
    expect(response.status()).toBe(404);
  });
}

test('an unpublished locale does not render the English homepage', async ({
  page,
}) => {
  const response = await page.goto('/ja');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: 'Personal Projects' }),
  ).toHaveCount(0);
});

test('root negotiation cannot publish a cookie or header-only locale', async ({
  request,
}) => {
  const response = await request.get('/', {
    maxRedirects: 0,
    headers: {
      cookie: 'NEXT_LOCALE=ja',
      'accept-language': 'ja,zh-Hans;q=0.9',
    },
  });
  expect(response.status()).toBe(307);
  expect(new URL(response.headers().location, response.url()).pathname).toBe(
    '/en',
  );
});
