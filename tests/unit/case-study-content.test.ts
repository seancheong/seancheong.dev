// @vitest-environment node
import {
  createCaseStudyContent,
  getCaseStudy,
  validateContent,
} from '@/portfolio-content/server';
import { expect, test, vi } from 'vitest';

import {
  contentFixture,
  optionalTranslationFixture,
} from '../fixtures/content';

test('approved Takonbini content compiles into brief and depth while other locales remain unavailable', async () => {
  expect(await validateContent()).toEqual([]);
  expect(await getCaseStudy('en', 'takonbini')).toMatchObject({
    status: 'found',
    value: {
      sections: [
        { id: 'summary' },
        { id: 'keeping-a-place-without-keeping-every-product' },
        { id: 'making-the-first-response-useful' },
        { id: 'verified-outcomes' },
        { id: 'reflection' },
        { id: 'remaining-work' },
      ],
    },
  });
  expect(await getCaseStudy('ja', 'takonbini')).toEqual({
    status: 'not-found',
  });
  expect(await validateContent('release')).not.toContainEqual(
    expect.objectContaining({ path: 'en.work.takonbini' }),
  );
});

test('approved English MDX returns source and compiled data, never JSX', async () => {
  const source = '# Reviewed fixture\n\n<aside>Evidence callout.</aside>';
  const content = createCaseStudyContent(contentFixture(), {
    'tripa/en': async () => source,
  });
  expect(await content.validateContent()).toEqual([]);
  expect(await content.getCaseStudy('en', 'tripa')).toMatchObject({
    status: 'found',
    value: {
      locale: 'en',
      format: 'mdx',
      source,
      compiledSource: expect.any(String),
    },
  });
});

test('missing files, loaders and malformed MDX produce explicit validation results', async () => {
  const variations: Record<string, () => Promise<string>>[] = [
    {},
    { 'tripa/en': async () => '<Unclosed' },
    {
      'tripa/en': async () => {
        throw new Error('ENOENT fixture');
      },
    },
  ];
  for (const sources of variations) {
    const content = createCaseStudyContent(contentFixture(), sources);
    expect(await content.validateContent()).toContainEqual(
      expect.objectContaining({ path: 'tripa/en' }),
    );
    expect(await content.getCaseStudy('en', 'tripa')).toMatchObject({
      status: 'invalid',
    });
  }
});

test('invalid slugs and optional translations never invoke a different-language loader', async () => {
  const load = vi.fn(async () => '# Approved English fixture');
  const content = createCaseStudyContent(optionalTranslationFixture(), {
    'tripa/en': load,
  });
  expect(await content.getCaseStudy('ja', 'tripa')).toMatchObject({
    status: 'unavailable',
    english: { href: '/en/work/tripa' },
  });
  expect(await content.getCaseStudy('en', '../tripa')).toEqual({
    status: 'not-found',
  });
  expect(load).not.toHaveBeenCalled();
});

test('unregistered loaders cannot silently expand published routes', async () => {
  const content = createCaseStudyContent(contentFixture(), {
    'tripa/en': async () => '# Approved fixture',
    'tripa/ja': async () => '# Unregistered fixture',
  });
  expect(await content.validateContent()).toContainEqual({
    path: 'tripa/ja',
    message: 'Loader has no registered document',
  });
});

test('section extraction follows real Markdown headings, not headings inside code fences', async () => {
  const content = createCaseStudyContent(contentFixture(), {
    'tripa/en': async () =>
      '# Fixture\n\n## Summary\n\nThe complete brief.\n\n```md\n## Not a section\n```\n\n## Evidence\n\nA measured observation.',
  });
  const result = await content.getCaseStudy('en', 'tripa');
  expect(result).toMatchObject({
    status: 'found',
    value: { sections: [{ id: 'summary' }, { id: 'evidence' }] },
  });
});
