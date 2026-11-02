import { Toaster } from '@/components/ui/sonner';
import { getSiteMetadata, isPublishedLocale } from '@/portfolio-content';
import { MotionPolicy, PointerSpotlight } from '@/portfolio-motion/shell';
import '@/portfolio-motion/styles.css';
import { SiteShell } from '@/site-shell';
import { IntlProvider } from '@/site-shell/intl-provider';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { getMessages, getTimeZone, setRequestLocale } from 'next-intl/server';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';

import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff2',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff2',
  variable: '--font-geist-mono',
  preload: false,
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

  setRequestLocale(locale);
  const { children } = props;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <IntlProvider
          locale={locale}
          messages={messages}
          timeZone={await getTimeZone()}
        >
          <MotionPolicy>
            <SiteShell locale={locale}>{children}</SiteShell>
            <PointerSpotlight />
          </MotionPolicy>
          <Toaster richColors />
          {process.env.VERCEL === '1' && <Analytics />}
        </IntlProvider>
      </body>
    </html>
  );
}
