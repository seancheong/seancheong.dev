import {
  CaseStudyPage,
  caseStudyMetadata,
  loadCaseStudy,
} from '@/journeys/case-study';
import { getPublishedWorkParams, isPublishedLocale } from '@/portfolio-content';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const revalidate = 3600;
export const generateStaticParams = getPublishedWorkParams;

type Props = { params: Promise<{ locale: string; slug: string }> };

async function resolve(params: Props['params']) {
  const { locale, slug } = await params;
  if (!isPublishedLocale(locale)) notFound();
  setRequestLocale(locale);
  const result = await loadCaseStudy(locale, slug);
  if (result.status === 'not-found' || result.status === 'unavailable')
    notFound();
  if (result.status === 'invalid')
    throw new Error('Case study content failed validation');
  return result.value;
}

export async function generateMetadata({ params }: Props) {
  return caseStudyMetadata(await resolve(params));
}

export default async function Page({ params }: Props) {
  return <CaseStudyPage study={await resolve(params)} />;
}
