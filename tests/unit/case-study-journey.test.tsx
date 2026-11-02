import {
  CaseStudyPage,
  caseStudyMetadata,
  loadCaseStudy,
} from '@/journeys/case-study';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { expect, test } from 'vitest';

async function study() {
  const result = await loadCaseStudy('en', 'takonbini');
  if (result.status !== 'found')
    throw new Error('Expected approved case study');
  return result.value;
}

test('the complete personal story precedes optional depth and limitations are visible', async () => {
  render(await CaseStudyPage({ study: await study() }));
  expect(
    screen.getByRole('heading', { level: 1, name: 'Takonbini' }),
  ).toBeVisible();
  const brief = screen.getByRole('region', { name: 'Why I built it' });
  expect(brief).toHaveTextContent('Lawson near my home');
  expect(brief).toHaveTextContent('This is my personal project');
  expect(
    within(brief).getByText(/Reliability and final release acceptance/),
  ).toBeVisible();
  expect(
    screen.getByText('Remaining work', { selector: 'h3' }).closest('details'),
  ).toHaveAttribute('open');
  expect(
    screen
      .getByText('Verified outcomes', { selector: 'h3' })
      .closest('details'),
  ).not.toHaveAttribute('open');
  expect(screen.getByRole('link', { name: 'Contact Sean' })).toHaveAttribute(
    'href',
    '/en#contact',
  );
});

test('media has meaningful alternatives, reserved geometry and lazy depth images', async () => {
  render(await CaseStudyPage({ study: await study() }));
  const images = screen.getAllByRole('img', { hidden: true });
  expect(images).toHaveLength(4);
  expect(images[0]).toHaveAttribute('width', '1440');
  for (const image of images) expect(image).toHaveAttribute('loading', 'lazy');
  for (const image of images)
    expect(image.getAttribute('alt')?.length).toBeGreaterThan(30);
});

test('a missing media inventory leaves the summary and evidence readable', async () => {
  render(await CaseStudyPage({ study: { ...(await study()), media: {} } }));
  expect(screen.getByText(/Product media is unavailable/)).toBeVisible();
  expect(
    screen.getByRole('region', { name: 'Why I built it' }),
  ).toHaveTextContent('Lawson near my home');
});

test('metadata and availability follow the content locale, with unfinished indexing disabled', async () => {
  expect(caseStudyMetadata(await study())).toMatchObject({
    title: 'Takonbini — Sean Cheong',
    robots: { index: false },
    alternates: { canonical: 'https://www.seancheong.dev/en/work/takonbini' },
  });
  for (const [locale, slug] of [
    ['ja', 'takonbini'],
    ['en', 'missing'],
    ['en', '../takonbini'],
  ])
    expect(await loadCaseStudy(locale, slug)).toMatchObject({
      status: 'not-found',
    });
});

test('an image failure preserves a readable caption and recovery link', async () => {
  render(await CaseStudyPage({ study: await study() }));
  const image = screen.getAllByRole('img', { hidden: true })[0];
  fireEvent.error(image);
  expect(screen.getByText(/Screenshot unavailable/)).toBeVisible();
  expect(
    screen.getAllByRole('link', {
      name: 'View the live product',
      hidden: true,
    }),
  ).toHaveLength(4);
});
