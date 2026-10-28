import en from '../../messages/en.json';
import { publishedLocales } from './locales';
import type { ContentConfiguration } from './model';

export const configuration = {
  publishedLocales: publishedLocales,
  dictionaries: { en },
  projects: [
    {
      slug: 'takonbini',
      order: 0,
      placement: 'featured',
      publication: 'draft',
      permission: 'confirmed',
      evidence: [
        {
          id: 'public-artifact',
          state: 'shipped',
          reference: 'https://takonbini.com',
        },
      ],
      liveUrl: 'https://takonbini.com',
      sourceUrl: 'https://github.com/seancheong/takonbini-web',
    },
    {
      slug: 'tripa',
      order: 1,
      placement: 'featured',
      publication: 'approved',
      permission: 'confirmed',
      evidence: [
        {
          id: 'public-artifact',
          state: 'shipped',
          reference: 'https://tripa-six.vercel.app/',
        },
      ],
      liveUrl: 'https://tripa-six.vercel.app/',
      sourceUrl: 'https://github.com/seancheong/tripa',
      cover: '/images/tripa.png',
    },
    {
      slug: 'script-blender',
      order: 2,
      placement: 'featured',
      publication: 'approved',
      permission: 'confirmed',
      evidence: [
        {
          id: 'public-artifact',
          state: 'shipped',
          reference: 'https://script-blender.vercel.app/',
        },
      ],
      liveUrl: 'https://script-blender.vercel.app/',
      sourceUrl: 'https://github.com/seancheong/script-blender',
      cover: '/images/scriptblender.png',
    },
    {
      slug: 'cashush',
      order: 3,
      placement: 'legacy',
      publication: 'withheld',
      permission: 'unverified',
      evidence: [
        {
          id: 'public-artifact',
          state: 'shipped',
          reference: 'https://cashush.com',
        },
      ],
      liveUrl: 'https://cashush.com',
      cover: '/images/cashush.png',
    },
    {
      slug: 'chroma-ui',
      order: 4,
      placement: 'archive',
      publication: 'approved',
      permission: 'confirmed',
      evidence: [
        {
          id: 'public-artifact',
          state: 'shipped',
          reference: 'https://github.com/seancheong/chroma-ui',
        },
      ],
      sourceUrl: 'https://github.com/seancheong/chroma-ui',
      cover: '/images/chromaui.png',
    },
    {
      slug: 'vue-task-management',
      order: 5,
      placement: 'archive',
      publication: 'approved',
      permission: 'confirmed',
      evidence: [
        {
          id: 'public-artifact',
          state: 'shipped',
          reference: 'https://github.com/seancheong/vue-task-management',
        },
      ],
      sourceUrl: 'https://github.com/seancheong/vue-task-management',
      cover: '/images/vuetaskmanagement.png',
    },
  ],
  articles: [
    {
      slug: 'stale-while-revalidate',
      url: 'https://blog.stackademic.com/understanding-the-importance-of-caching-and-the-stale-while-revalidate-pattern-c23bb1f7382b',
      order: 0,
      publication: 'draft',
      evidence: [
        {
          id: 'published-article',
          state: 'shipped',
          reference:
            'https://blog.stackademic.com/understanding-the-importance-of-caching-and-the-stale-while-revalidate-pattern-c23bb1f7382b',
        },
      ],
    },
    {
      slug: 'auto-save-hooks',
      url: 'https://blog.stackademic.com/react-hooks-in-action-implementing-auto-save-with-custom-hooks-b0be405766c5',
      order: 1,
      publication: 'draft',
      evidence: [
        {
          id: 'published-article',
          state: 'shipped',
          reference:
            'https://blog.stackademic.com/react-hooks-in-action-implementing-auto-save-with-custom-hooks-b0be405766c5',
        },
      ],
    },
    {
      slug: 'vue-task-management',
      url: 'https://medium.com/@seancheongzhenxiong/building-a-task-management-library-with-vue-3-and-composition-api-9548aa96f14e',
      order: 2,
      publication: 'draft',
      evidence: [
        {
          id: 'published-article',
          state: 'shipped',
          reference:
            'https://medium.com/@seancheongzhenxiong/building-a-task-management-library-with-vue-3-and-composition-api-9548aa96f14e',
        },
      ],
    },
  ],
  documents: [
    {
      id: 'takonbini/en',
      slug: 'takonbini',
      locale: 'en',
      publication: 'draft',
    },
  ],
  requiredCaseStudies: ['takonbini'],
} satisfies ContentConfiguration;
