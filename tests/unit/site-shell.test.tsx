import { SiteShell } from '@/site-shell';
import { render, screen, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { expect, test } from 'vitest';

import messages from '../../messages/en.json';

function shell(locale = 'en') {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <SiteShell locale={locale}>
        <h1>A server-visible journey</h1>
      </SiteShell>
    </NextIntlClientProvider>,
  );
}

test('the shared shell provides one set of page landmarks and a skip destination', () => {
  shell();
  expect(screen.getAllByRole('banner')).toHaveLength(1);
  expect(screen.getAllByRole('navigation', { name: 'Primary' })).toHaveLength(
    1,
  );
  expect(
    within(screen.getByRole('main')).getByRole('heading', { level: 1 }),
  ).toHaveTextContent('A server-visible journey');
  expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
  expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute(
    'href',
    '#main-content',
  );
  expect(screen.getByRole('contentinfo')).toHaveTextContent(
    'Kuala Lumpur, Malaysia',
  );
});

test('shell destinations are locale-aware without publishing future locales', () => {
  shell('ja');
  const navigation = screen.getByRole('navigation');
  const links = within(navigation).getAllByRole('link');
  expect(
    links.every((link) => link.getAttribute('href')?.startsWith('/ja')),
  ).toBe(true);
  for (const section of ['experience', 'projects', 'articles', 'contact']) {
    expect(
      links.some((link) => link.getAttribute('href') === `/ja#${section}`),
    ).toBe(true);
  }
  expect(navigation.querySelector('details > summary')).toHaveTextContent(
    'Menu',
  );
  expect(navigation.querySelector('[role="menu"]')).toBeNull();
});
