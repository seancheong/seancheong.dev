import type { ContentConfiguration, ContentLocale } from '@/portfolio-content';

import en from '../../messages/en.json';

export function translatedFixture(locale: 'ja' | 'zh-Hans') {
  return {
    ...en,
    Content: {
      availableInEnglish: locale === 'ja' ? '英語版を読む' : '查看英文版本',
    },
    Project: {
      ...en.Project,
      tripa: {
        ...en.Project.tripa,
        title: locale === 'ja' ? '旅の記録と意思決定' : '旅行记录与工程决策',
        description:
          locale === 'ja'
            ? '長い旅行記録を読みやすく整理するための構造確認用テキスト。'
            : '用于验证长文本结构和换行的旅行记录测试内容。',
      },
    },
  };
}

export function contentFixture(
  overrides: Partial<ContentConfiguration> = {},
): ContentConfiguration {
  return {
    publishedLocales: ['en'],
    dictionaries: { en },
    projects: [
      {
        slug: 'tripa',
        order: 0,
        placement: 'featured',
        publication: 'approved',
        permission: 'confirmed',
        liveUrl: 'https://tripa-six.vercel.app/',
        cover: '/images/tripa.png',
        evidence: [
          {
            id: 'public-product',
            state: 'shipped',
            reference: 'https://tripa-six.vercel.app/',
          },
        ],
      },
    ],
    articles: [
      {
        slug: 'auto-save-hooks',
        order: 0,
        publication: 'draft',
        url: 'https://example.com/article',
        evidence: [
          {
            id: 'published-note',
            state: 'shipped',
            reference: 'https://example.com/article',
          },
        ],
      },
    ],
    documents: [
      { id: 'tripa/en', slug: 'tripa', locale: 'en', publication: 'approved' },
    ],
    requiredCaseStudies: ['tripa'],
    ...overrides,
  };
}

export function optionalTranslationFixture(locale: ContentLocale = 'ja') {
  if (locale === 'en') throw new Error('Select a future-locale fixture');
  return contentFixture({
    publishedLocales: ['en', locale],
    dictionaries: { en, [locale]: translatedFixture(locale) },
    requiredCaseStudies: [],
  });
}
