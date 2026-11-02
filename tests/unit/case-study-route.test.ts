import Page, {
  generateMetadata,
  generateStaticParams,
} from '@/app/[locale]/work/[slug]/page';
import { setRequestLocale } from 'next-intl/server';
import { expect, test, vi } from 'vitest';

vi.mock('next-intl/server', () => ({ setRequestLocale: vi.fn() }));

test('route parameters derive from approved published-locale content', () => {
  expect(generateStaticParams()).toEqual([{ locale: 'en', slug: 'takonbini' }]);
});

test('valid route metadata comes from the journey and invalid routes are actual not-found responses', async () => {
  expect(
    await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'takonbini' }),
    }),
  ).toMatchObject({ title: 'Takonbini — Sean Cheong' });
  expect(setRequestLocale).toHaveBeenCalledWith('en');
  for (const params of [
    { locale: 'ja', slug: 'takonbini' },
    { locale: 'en', slug: 'missing' },
  ])
    await expect(Page({ params: Promise.resolve(params) })).rejects.toThrow(
      'NEXT_HTTP_ERROR_FALLBACK;404',
    );
});
