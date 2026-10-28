import { Toaster } from '@/components/ui/sonner';
import { getSiteMetadata, isPublishedLocale } from '@/portfolio-content';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';

import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isPublishedLocale(locale)) notFound();
  const result = getSiteMetadata(locale);
  if (result.status !== 'found')
    throw new Error('Site metadata failed content validation');
  const { title: name, description, keywords } = result.value;
  return {
    title: name,
    description,
    keywords,
    authors: [{ name, url: 'https://github.com/seancheong' }],
    openGraph: {
      title: name,
      description,
      url: 'https://www.seancheong.dev',
      type: 'website',
      images: [{ url: 'https://www.seancheong.dev/screenshot.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description,
      images: ['https://www.seancheong.dev/screenshot.png'],
    },
  };
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>,
) {
  const { locale } = await props.params;
  if (!isPublishedLocale(locale)) notFound();

  const { children } = props;

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster richColors />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
