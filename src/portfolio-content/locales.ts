export const plannedLocales = ['en', 'ja', 'zh-Hans'] as const;
export type ContentLocale = (typeof plannedLocales)[number];
export const publishedLocales = ['en'] as const;
export type PublishedLocale = (typeof publishedLocales)[number];

export function isContentLocale(value: string): value is ContentLocale {
  return plannedLocales.some((locale) => locale === value);
}

export function isPublishedLocale(value: string): value is PublishedLocale {
  return publishedLocales.some((locale) => locale === value);
}
