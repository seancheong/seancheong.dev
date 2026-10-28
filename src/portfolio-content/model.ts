import {
  type MessageFormatElement,
  TYPE,
  parse,
} from '@formatjs/icu-messageformat-parser';
import { z } from 'zod';

import { type ContentLocale, isContentLocale, plannedLocales } from './locales';

const text = z.string().trim().min(1);
const slug = text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const url = z
  .string()
  .url()
  .refine(
    (value) => value.startsWith('https://'),
    'Public evidence links must use HTTPS',
  );
export const evidenceStates = [
  'shipped',
  'measured',
  'learned',
  'planned',
] as const;
const evidence = z.object({
  id: slug,
  state: z.enum(evidenceStates),
  reference: url,
});
const publication = z.enum(['approved', 'draft', 'withheld']);
const projectSchema = z.object({
  slug,
  order: z.number().int().nonnegative(),
  placement: z.enum(['featured', 'archive', 'legacy']),
  publication,
  permission: z.enum(['confirmed', 'unverified']),
  liveUrl: url.optional(),
  sourceUrl: url.optional(),
  cover: text.startsWith('/images/').optional(),
  evidence: z.array(evidence).min(1),
});
const articleSchema = z.object({
  slug,
  url,
  order: z.number().int().nonnegative(),
  publication,
  evidence: z.array(evidence).min(1),
});
const documentSchema = z.object({
  id: text,
  slug,
  locale: z.enum(plannedLocales),
  publication: z.enum(['approved', 'draft']),
});
export type Project = z.infer<typeof projectSchema>;
export type Article = z.infer<typeof articleSchema>;
export type CaseStudyDocument = z.infer<typeof documentSchema>;
export type Messages = { readonly [key: string]: string | Messages };
export type ContentIssue = { path: string; message: string };
export type ContentResult<T> =
  | { status: 'found'; value: T }
  | { status: 'not-found' }
  | { status: 'invalid'; issues: ContentIssue[] };
export type CaseStudyResult =
  | ContentResult<CaseStudyDocument>
  | { status: 'unavailable'; english: { href: string; label: string } };
export type ContentConfiguration = {
  publishedLocales: readonly ContentLocale[];
  dictionaries: Partial<Record<ContentLocale, Messages>>;
  projects: readonly Project[];
  articles: readonly Article[];
  documents: readonly CaseStudyDocument[];
  requiredCaseStudies: readonly string[];
};

function message(
  dictionary: Messages | undefined,
  path: string,
): string | undefined {
  let current: string | Messages | undefined = dictionary;
  for (const key of path.split('.'))
    current = typeof current === 'object' ? current[key] : undefined;
  return typeof current === 'string' ? current : undefined;
}

function requireMessage(
  dictionary: Messages | undefined,
  path: string,
): string {
  const value = message(dictionary, path);
  if (!value?.trim())
    throw new Error(`Missing validated content message: ${path}`);
  return value;
}

function flatten(tree: Messages, prefix = ''): Record<string, string> {
  return Object.fromEntries(
    Object.entries(tree).flatMap(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return typeof value === 'string'
        ? [[path, value]]
        : Object.entries(flatten(value, path));
    }),
  );
}

function argumentsOf(elements: MessageFormatElement[]): string[] {
  return elements.flatMap((element): string[] => {
    if (element.type === TYPE.literal || element.type === TYPE.pound) return [];
    const own = `${element.type}:${element.value}`;
    if (element.type === TYPE.tag)
      return [own, ...argumentsOf(element.children)];
    if (element.type === TYPE.select || element.type === TYPE.plural)
      return [
        own,
        ...Object.values(element.options).flatMap((option) =>
          argumentsOf(option.value),
        ),
      ];
    return [own];
  });
}

export function createPortfolioContent(configuration: ContentConfiguration) {
  function validate(mode: 'current' | 'release' = 'current'): ContentIssue[] {
    const issues: ContentIssue[] = [];
    const add = (path: string, message: string) =>
      issues.push({ path, message });
    for (const [name, schema, records] of [
      ['projects', projectSchema, configuration.projects],
      ['articles', articleSchema, configuration.articles],
      ['documents', documentSchema, configuration.documents],
    ] as const) {
      const identities = new Set<string>();
      const orders = new Set<number>();
      records.forEach((record, index) => {
        const parsed = schema.safeParse(record);
        if (!parsed.success)
          for (const issue of parsed.error.issues)
            add(`${name}.${index}.${issue.path.join('.')}`, issue.message);
        const identity =
          'locale' in record ? `${record.slug}:${record.locale}` : record.slug;
        if (identities.has(identity)) add(name, `Duplicate ${identity}`);
        identities.add(identity);
        if ('order' in record) {
          if (orders.has(record.order))
            add(name, `Duplicate order ${record.order}`);
          orders.add(record.order);
        }
      });
    }
    const dictionaryEntries = Object.entries(configuration.dictionaries) as [
      ContentLocale,
      Messages,
    ][];
    const english = flatten(configuration.dictionaries.en ?? {});
    if (!Object.keys(english).length)
      add('dictionaries.en', 'English messages are required');
    for (const locale of configuration.publishedLocales) {
      if (!plannedLocales.includes(locale))
        add('publishedLocales', `Unknown locale ${locale}`);
      if (!configuration.dictionaries[locale])
        add(`dictionaries.${locale}`, 'Published locale requires messages');
    }
    if (!configuration.publishedLocales.includes('en'))
      add('publishedLocales', 'English must remain published');
    for (const [locale, dictionary] of dictionaryEntries) {
      for (const key of [
        'Content.availableInEnglish',
        'Site.title',
        'Site.description',
        'Site.keywords',
      ])
        if (!message(dictionary, key))
          add(`${locale}.${key}`, 'Required message is missing');
      if (!plannedLocales.includes(locale))
        add(`dictionaries.${locale}`, 'Unknown locale');
      const strings = flatten(dictionary);
      for (const key of new Set([
        ...Object.keys(english),
        ...Object.keys(strings),
      ])) {
        if (!strings[key]?.trim() || !(key in english)) {
          add(`${locale}.${key}`, 'Missing, empty or unexpected message');
          continue;
        }
        try {
          const actual = [...new Set(argumentsOf(parse(strings[key])))].sort();
          const expected = [
            ...new Set(argumentsOf(parse(english[key]))),
          ].sort();
          if (JSON.stringify(actual) !== JSON.stringify(expected))
            add(
              `${locale}.${key}`,
              'ICU arguments or rich-text tags differ from English',
            );
        } catch (error) {
          add(
            `${locale}.${key}`,
            error instanceof Error ? error.message : 'Invalid ICU message',
          );
        }
      }
      for (const project of configuration.projects)
        for (const key of [
          'title',
          'description',
          'coverAlt',
          'seoTitle',
          'seoDescription',
        ]) {
          if (!message(dictionary, `Project.${project.slug}.${key}`)?.trim())
            add(
              `${locale}.Project.${project.slug}.${key}`,
              'Required project message is missing',
            );
        }
      for (const article of configuration.articles) {
        if (!message(dictionary, `Article.${article.slug}.title`))
          add(
            `${locale}.Article.${article.slug}.title`,
            'Article title is missing',
          );
        if (
          article.publication === 'approved' &&
          !message(dictionary, `Article.${article.slug}.summary`)
        )
          add(
            `${locale}.Article.${article.slug}.summary`,
            'Approved article requires reviewed summary',
          );
      }
    }
    for (const project of configuration.projects) {
      if (
        project.publication === 'approved' &&
        (!project.cover || (!project.liveUrl && !project.sourceUrl))
      )
        add(project.slug, 'Public project requires a cover and destination');
      if (
        project.publication === 'approved' &&
        project.permission !== 'confirmed'
      )
        add(
          project.slug,
          'Public projects require confirmed publication permission',
        );
      if (
        project.publication === 'approved' &&
        !project.evidence.some((item) => item.state !== 'planned')
      )
        add(
          project.slug,
          'Planned work alone cannot substantiate a published project',
        );
    }
    for (const slug of configuration.requiredCaseStudies)
      if (!configuration.projects.some((project) => project.slug === slug))
        add(slug, 'Required flagship project is not registered');
    if (mode === 'release')
      for (const article of configuration.articles)
        if (article.publication !== 'approved')
          add(
            article.slug,
            'Selected article requires summary publication review',
          );
    for (const article of configuration.articles) {
      if (
        article.publication === 'approved' &&
        !article.evidence.some((item) => item.state !== 'planned')
      )
        add(
          article.slug,
          'Planned work alone cannot substantiate a published article',
        );
    }
    const documentIds = new Set<string>();
    for (const document of configuration.documents) {
      if (documentIds.has(document.id))
        add(document.id, 'Duplicate document ID');
      documentIds.add(document.id);
      const project = configuration.projects.find(
        (item) => item.slug === document.slug,
      );
      if (!project) add(document.id, 'Case study refers to an unknown project');
      if (
        document.publication === 'approved' &&
        project?.publication !== 'approved'
      )
        add(document.id, 'Approved case study requires an approved project');
    }
    if (
      mode === 'release' ||
      configuration.publishedLocales.some((locale) => locale !== 'en')
    ) {
      for (const locale of configuration.publishedLocales)
        for (const slug of configuration.requiredCaseStudies) {
          if (
            !configuration.documents.some(
              (document) =>
                document.slug === slug &&
                document.locale === locale &&
                document.publication === 'approved',
            )
          ) {
            add(
              `${locale}.work.${slug}`,
              mode === 'release'
                ? 'Required flagship case study is not approved'
                : 'Publishing a new locale requires its flagship case study',
            );
          }
        }
    }
    return issues;
  }

  function gate<T>(
    locale: string,
    read: (locale: ContentLocale) => T,
  ): ContentResult<T> {
    if (
      !isContentLocale(locale) ||
      !configuration.publishedLocales.includes(locale)
    )
      return { status: 'not-found' };
    const issues = validate();
    if (issues.length) return { status: 'invalid', issues };
    return { status: 'found', value: read(locale) };
  }

  function projects(locale: ContentLocale) {
    const dictionary = configuration.dictionaries[locale];
    return configuration.projects
      .filter((project) => project.publication === 'approved')
      .toSorted((a, b) => a.order - b.order)
      .map((project) => {
        const destination = project.liveUrl ?? project.sourceUrl;
        if (!destination || !project.cover)
          throw new Error(
            `Missing validated project presentation: ${project.slug}`,
          );
        return {
          ...project,
          destination,
          cover: project.cover,
          title: requireMessage(dictionary, `Project.${project.slug}.title`),
          description: requireMessage(
            dictionary,
            `Project.${project.slug}.description`,
          ),
          coverAlt: requireMessage(
            dictionary,
            `Project.${project.slug}.coverAlt`,
          ),
          seoTitle: requireMessage(
            dictionary,
            `Project.${project.slug}.seoTitle`,
          ),
          seoDescription: requireMessage(
            dictionary,
            `Project.${project.slug}.seoDescription`,
          ),
        };
      });
  }

  function getProject(locale: string, slug: string) {
    const result = gate(locale, (locale) =>
      projects(locale).find((project) => project.slug === slug),
    );
    if (result.status !== 'found') return result;
    if (!result.value) return { status: 'not-found' as const };
    return { status: 'found' as const, value: result.value };
  }

  function getCaseStudyLocales(slug: string) {
    return configuration.publishedLocales.filter(
      (locale) =>
        getProject(locale, slug).status === 'found' &&
        configuration.documents.some(
          (document) =>
            document.slug === slug &&
            document.locale === locale &&
            document.publication === 'approved',
        ),
    );
  }

  function getCaseStudy(locale: string, slug: string): CaseStudyResult {
    const project = getProject(locale, slug);
    if (project.status !== 'found') return project;
    const document = configuration.documents.find(
      (item) =>
        item.slug === slug &&
        item.locale === locale &&
        item.publication === 'approved',
    );
    if (document) return { status: 'found', value: document };
    if (getCaseStudyLocales(slug).includes('en'))
      return {
        status: 'unavailable',
        english: {
          href: `/en/work/${slug}`,
          label: requireMessage(
            configuration.dictionaries[locale as ContentLocale],
            'Content.availableInEnglish',
          ),
        },
      };
    return { status: 'not-found' };
  }

  return {
    validate,
    getProject,
    getProjects: (locale: string) => gate(locale, projects),
    getFeaturedProjects: (locale: string) =>
      gate(locale, (locale) =>
        projects(locale).filter((project) => project.placement === 'featured'),
      ),
    getCuratedNotes: (locale: string) =>
      gate(locale, (locale) =>
        configuration.articles
          .filter((article) => article.publication === 'approved')
          .toSorted((a, b) => a.order - b.order)
          .map((article) => ({
            ...article,
            title: requireMessage(
              configuration.dictionaries[locale],
              `Article.${article.slug}.title`,
            ),
            summary: requireMessage(
              configuration.dictionaries[locale],
              `Article.${article.slug}.summary`,
            ),
          })),
      ),
    getLocaleMessages: (locale: string) =>
      gate(locale, (locale) => {
        const dictionary = configuration.dictionaries[locale];
        if (!dictionary)
          throw new Error(`Missing validated dictionary: ${locale}`);
        const projectMessages = dictionary.Project;
        const articleMessages = dictionary.Article;
        const publishedProjects = new Set(
          configuration.projects
            .filter((project) => project.publication === 'approved')
            .map((project) => project.slug),
        );
        const publishedArticles = new Set(
          configuration.articles
            .filter((article) => article.publication === 'approved')
            .map((article) => article.slug),
        );
        return {
          ...dictionary,
          Project:
            typeof projectMessages === 'object'
              ? Object.fromEntries(
                  Object.entries(projectMessages).filter(
                    ([key]) => key === 'title' || publishedProjects.has(key),
                  ),
                )
              : {},
          Article:
            typeof articleMessages === 'object'
              ? Object.fromEntries(
                  Object.entries(articleMessages).filter(([key]) =>
                    publishedArticles.has(key),
                  ),
                )
              : {},
        };
      }),
    getSiteMetadata: (locale: string) =>
      gate(locale, (locale) => ({
        title: requireMessage(configuration.dictionaries[locale], 'Site.title'),
        description: requireMessage(
          configuration.dictionaries[locale],
          'Site.description',
        ),
        keywords: requireMessage(
          configuration.dictionaries[locale],
          'Site.keywords',
        ),
      })),
    getCaseStudy,
    getCaseStudyLocales,
    getPublishedWorkParams: () =>
      configuration.projects.flatMap((project) =>
        getCaseStudyLocales(project.slug).map((locale) => ({
          locale,
          slug: project.slug,
        })),
      ),
  };
}
