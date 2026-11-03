import { HomePage, loadHome } from '@/journeys/home';
import { isPublishedLocale, publishedLocales } from '@/portfolio-content';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const revalidate = 3600;
export function generateStaticParams() {
  return publishedLocales.map((locale) => ({ locale }));
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isPublishedLocale(locale)) notFound();
  setRequestLocale(locale);
  return <HomePage locale={locale} content={loadHome(locale)} />;
}
