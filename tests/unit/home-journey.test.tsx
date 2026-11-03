import Page, { generateStaticParams } from '@/app/[locale]/page';
import { HomePage, loadHome } from '@/journeys/home';
import { getHomeContent } from '@/portfolio-content';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, test, vi } from 'vitest';

vi.mock('next-intl/server', () => ({ setRequestLocale: vi.fn() }));

function document() {
  const node = window.document.createElement('div');
  node.innerHTML = renderToStaticMarkup(
    <HomePage locale="en" content={loadHome('en')} />,
  );
  return node;
}

test('Home exposes the approved evidence hierarchy and two curated projects', () => {
  const node = document();
  expect(
    [...node.querySelectorAll('section[id]')].map((section) => section.id),
  ).toEqual([
    'hero',
    'profile',
    'projects',
    'experience',
    'more-selected-work',
    'articles',
    'contact',
  ]);
  expect(node.querySelector('#projects a')?.getAttribute('href')).toBe(
    '/en/work/takonbini',
  );
  expect(
    node.querySelector('#more-selected-work a')?.getAttribute('href'),
  ).toBe('https://script-blender.vercel.app/');
  expect(node.querySelector('form')).toBeNull();
  for (const slug of ['tripa', 'cashush', 'chroma-ui', 'vue-task-management'])
    expect(node.querySelector(`a[href*="${slug}"]`)).toBeNull();
  expect(node.querySelector('#projects')?.textContent).toContain(
    'personal project',
  );
  expect(node.querySelector('#projects')?.textContent).toContain(
    'readiness work remains',
  );
});

test('public career facts stay distinct from unprovided Guidewire duties', () => {
  const content = getHomeContent('en');
  if (content.status !== 'found') throw new Error('Missing Home content');
  expect(content.value.career).toHaveLength(5);
  expect(content.value.career[0]).toMatchObject({
    name: 'Guidewire',
    role: 'Senior Consultant',
    dates: 'April 2026–present',
    city: 'Kuala Lumpur, Malaysia',
  });
  expect(content.value.career[1].dates).toBe('2023–April 2026');
  expect(content.value.career[0].scope).toBe('Current role in Kuala Lumpur.');
  expect(getHomeContent('ja')).toEqual({ status: 'not-found' });
});

test('primary content, orbit choices and country details exist in server HTML', () => {
  const node = document();
  expect(node.querySelector('h1')?.textContent).toBe('SeanCheong.');
  expect(node.querySelector('#hero')?.textContent).toContain(
    'Senior frontend engineer with 15 years',
  );
  expect(node.querySelectorAll('input[type="radio"]')).toHaveLength(2);
  expect(node.querySelectorAll('details.home-country summary')).toHaveLength(3);
  expect(node.querySelectorAll('.home-timeline li')).toHaveLength(5);
  expect(node.querySelectorAll('.home-company-logo')).toHaveLength(10);
  expect(node.querySelector('#articles')?.textContent).not.toContain('Stale');
  expect(
    [...node.querySelectorAll('.home-preview img')].every(
      (image) => image.getAttribute('loading') === 'lazy',
    ),
  ).toBe(true);
});

test('thin Home route only publishes approved locales', async () => {
  expect(generateStaticParams()).toEqual([{ locale: 'en' }]);
  await expect(
    Page({ params: Promise.resolve({ locale: 'ja' }) }),
  ).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
  expect(
    await Page({ params: Promise.resolve({ locale: 'en' }) }),
  ).toBeDefined();
});
