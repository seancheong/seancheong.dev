import { getLocaleMessages, isPublishedLocale } from '@/portfolio-content';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? 'en';
  if (!isPublishedLocale(locale)) notFound();
  const result = getLocaleMessages(locale);
  if (result.status !== 'found')
    throw new Error('Published locale content failed validation');
  return { locale, messages: result.value };
});
