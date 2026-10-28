import {
  createPortfolioContent,
  evidenceStates,
  getCaseStudyLocales,
  getCuratedNotes,
  getFeaturedProjects,
  getLocaleMessages,
  getProject,
  getProjects,
  getPublishedWorkParams,
} from '@/portfolio-content';
import { describe, expect, test } from 'vitest';

import en from '../../messages/en.json';
import {
  contentFixture,
  optionalTranslationFixture,
  translatedFixture,
} from '../fixtures/content';

test('published project facts move behind one interface without new claims', () => {
  const result = getProjects('en');
  expect(result.status).toBe('found');
  if (result.status !== 'found') throw new Error('Expected public projects');
  expect(result.value.map((project) => project.slug)).toEqual([
    'tripa',
    'script-blender',
    'chroma-ui',
    'vue-task-management',
  ]);
  expect(result.value[0]).toMatchObject({
    title: en.Project.tripa.title,
    description: en.Project.tripa.description,
    destination: 'https://tripa-six.vercel.app/',
    cover: '/images/tripa.png',
  });
  expect(getFeaturedProjects('en')).toMatchObject({
    status: 'found',
    value: [{ slug: 'tripa' }, { slug: 'script-blender' }],
  });
});

test('withheld projects and drafts are not advertised or sent as client messages', () => {
  expect(getProject('en', 'cashush')).toEqual({ status: 'not-found' });
  expect(getProject('en', 'takonbini')).toEqual({ status: 'not-found' });
  expect(getCuratedNotes('en')).toEqual({ status: 'found', value: [] });
  expect(getCaseStudyLocales('takonbini')).toEqual([]);
  expect(getPublishedWorkParams()).toEqual([]);
  const messages = getLocaleMessages('en');
  expect(messages.status).toBe('found');
  if (messages.status !== 'found') throw new Error('Expected public messages');
  expect(messages.value).not.toHaveProperty('Project.cashush');
  expect(messages.value).not.toHaveProperty('Project.takonbini');
  expect(messages.value).not.toHaveProperty('Article.auto-save-hooks');
});

test.each(['ja', 'zh-Hans', 'zh', 'fr', 'EN', '../../en'])(
  'unpublished or invalid locale %s cannot read English implicitly',
  (locale) => {
    expect(getProjects(locale)).toEqual({ status: 'not-found' });
    expect(getProject(locale, 'tripa')).toEqual({ status: 'not-found' });
    expect(getLocaleMessages(locale)).toEqual({ status: 'not-found' });
  },
);

test.each(['missing', '../tripa', 'constructor', 'TRIPA'])(
  'invalid slug %s has an explicit not-found result',
  (slug) => {
    expect(getProject('en', slug)).toEqual({ status: 'not-found' });
  },
);

describe.each(['ja', 'zh-Hans'] as const)('%s preparation', (locale) => {
  test('a representative fixture validates without publishing a real locale', () => {
    const content = createPortfolioContent(
      contentFixture({
        dictionaries: { en, [locale]: translatedFixture(locale) },
      }),
    );
    expect(content.validate()).toEqual([]);
    expect(content.getProjects(locale)).toEqual({ status: 'not-found' });
  });
  test('UI messages alone cannot promote a new locale', () => {
    const content = createPortfolioContent(
      contentFixture({
        publishedLocales: ['en', locale],
        dictionaries: { en, [locale]: translatedFixture(locale) },
      }),
    );
    expect(content.getProjects(locale)).toMatchObject({
      status: 'invalid',
      issues: expect.arrayContaining([
        expect.objectContaining({ path: `${locale}.work.tripa` }),
      ]),
    });
  });
  test('an optional unavailable translation links explicitly to approved English', () => {
    const content = createPortfolioContent(optionalTranslationFixture(locale));
    expect(content.getCaseStudy(locale, 'tripa')).toEqual({
      status: 'unavailable',
      english: {
        href: '/en/work/tripa',
        label: translatedFixture(locale).Content.availableInEnglish,
      },
    });
    expect(content.getCaseStudyLocales('tripa')).toEqual(['en']);
    expect(content.getPublishedWorkParams()).toEqual([
      { locale: 'en', slug: 'tripa' },
    ]);
  });
});

test('a translated required document enables only its real locale and slug', () => {
  const config = contentFixture({
    publishedLocales: ['en', 'ja'],
    dictionaries: { en, ja: translatedFixture('ja') },
  });
  const content = createPortfolioContent({
    ...config,
    documents: [
      ...config.documents,
      { id: 'tripa/ja', slug: 'tripa', locale: 'ja', publication: 'approved' },
    ],
  });
  expect(content.validate()).toEqual([]);
  expect(content.getPublishedWorkParams()).toEqual([
    { locale: 'en', slug: 'tripa' },
    { locale: 'ja', slug: 'tripa' },
  ]);
  expect(content.getCaseStudy('ja', 'tripa')).toMatchObject({
    status: 'found',
    value: { locale: 'ja', id: 'tripa/ja' },
  });
});

test('missing English project content is a validation result, not a fallback', () => {
  const { description, ...incomplete } = en.Project.tripa;
  expect(description).toBeTruthy();
  const content = createPortfolioContent(
    contentFixture({
      dictionaries: {
        en: { ...en, Project: { ...en.Project, tripa: incomplete } },
      },
    }),
  );
  expect(content.getProject('en', 'tripa')).toMatchObject({
    status: 'invalid',
    issues: expect.arrayContaining([
      expect.objectContaining({ path: 'en.Project.tripa.description' }),
    ]),
  });
});

test('ICU argument and rich-text tag mismatches fail before publication', () => {
  const ja = {
    ...translatedFixture('ja'),
    Profile: { ...en.Profile, detail: '経験は{years}年です。' },
  };
  expect(
    createPortfolioContent(
      contentFixture({ dictionaries: { en, ja } }),
    ).validate(),
  ).toContainEqual(
    expect.objectContaining({
      path: 'ja.Profile.detail',
      message: 'ICU arguments or rich-text tags differ from English',
    }),
  );
});

test('ICU syntax errors are reported with their message path', () => {
  const ja = {
    ...translatedFixture('ja'),
    Content: { availableInEnglish: '{count, plural, one {One}}' },
  };
  expect(
    createPortfolioContent(
      contentFixture({ dictionaries: { en, ja } }),
    ).validate(),
  ).toContainEqual(
    expect.objectContaining({ path: 'ja.Content.availableInEnglish' }),
  );
});

test.each(evidenceStates)(
  'evidence state %s is retained without becoming a measured claim',
  (state) => {
    const config = contentFixture();
    const [project] = config.projects;
    const content = createPortfolioContent({
      ...config,
      projects: [
        {
          ...project,
          publication: state === 'planned' ? 'draft' : 'approved',
          evidence: [{ ...project.evidence[0], state }],
        },
      ],
      documents: [],
    });
    expect(content.validate()).toEqual([]);
    expect(content.getProject('en', 'tripa').status).toBe(
      state === 'planned' ? 'not-found' : 'found',
    );
  },
);

test('planned evidence alone and unverified permission cannot support public work', () => {
  const config = contentFixture();
  const [project] = config.projects;
  const content = createPortfolioContent({
    ...config,
    projects: [
      {
        ...project,
        permission: 'unverified',
        evidence: [{ ...project.evidence[0], state: 'planned' }],
      },
    ],
  });
  expect(content.getProjects('en')).toMatchObject({ status: 'invalid' });
  expect(content.validate().map((issue) => issue.message)).toEqual(
    expect.arrayContaining([
      'Public projects require confirmed publication permission',
      'Planned work alone cannot substantiate a published project',
    ]),
  );
});

test('duplicate slugs, ordering and orphan document registrations are rejected', () => {
  const config = contentFixture();
  const content = createPortfolioContent({
    ...config,
    projects: [...config.projects, ...config.projects],
    documents: [
      { id: 'orphan/en', slug: 'orphan', locale: 'en', publication: 'draft' },
    ],
  });
  expect(content.validate().map((issue) => issue.message)).toEqual(
    expect.arrayContaining([
      'Duplicate tripa',
      'Duplicate order 0',
      'Case study refers to an unknown project',
    ]),
  );
});

test('article summaries require review before queries return them', () => {
  const config = contentFixture();
  const content = createPortfolioContent({
    ...config,
    articles: config.articles.map((article) => ({
      ...article,
      publication: 'approved',
    })),
  });
  expect(content.getCuratedNotes('en')).toMatchObject({ status: 'invalid' });
  const ready = createPortfolioContent({
    ...config,
    dictionaries: {
      en: {
        ...en,
        Article: {
          ...en.Article,
          'auto-save-hooks': {
            ...en.Article['auto-save-hooks'],
            summary: 'Reviewed fixture summary.',
          },
        },
      },
    },
    articles: config.articles.map((article) => ({
      ...article,
      publication: 'approved',
    })),
  });
  expect(ready.getCuratedNotes('en')).toMatchObject({
    status: 'found',
    value: [
      {
        title: en.Article['auto-save-hooks'].title,
        summary: 'Reviewed fixture summary.',
      },
    ],
  });
});

test.each(['javascript:alert(1)', 'not-a-url'])(
  'invalid public destination %s is a validation result',
  (liveUrl) => {
    const config = contentFixture();
    const content = createPortfolioContent({
      ...config,
      projects: config.projects.map((project) => ({ ...project, liveUrl })),
    });
    expect(content.getProject('en', 'tripa')).toMatchObject({
      status: 'invalid',
    });
  },
);

test('reviewed article copy cannot turn planned-only evidence into shipped work', () => {
  const config = contentFixture();
  const content = createPortfolioContent({
    ...config,
    dictionaries: {
      en: {
        ...en,
        Article: {
          ...en.Article,
          'auto-save-hooks': {
            ...en.Article['auto-save-hooks'],
            summary: 'Reviewed fixture summary.',
          },
        },
      },
    },
    articles: config.articles.map((article) => ({
      ...article,
      publication: 'approved',
      evidence: article.evidence.map((item) => ({ ...item, state: 'planned' })),
    })),
  });
  expect(content.getCuratedNotes('en')).toMatchObject({ status: 'invalid' });
  expect(content.validate()).toContainEqual(
    expect.objectContaining({
      message: 'Planned work alone cannot substantiate a published article',
    }),
  );
});
