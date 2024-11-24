import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import localFont from 'next/font/local';

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

const name = 'Sean Cheong Zhen Xiong';
const description = 'Senior Software Engineer/Team Lead';

export const metadata: Metadata = {
  title: name,
  description,
  keywords:
    'Senior Software Engineer, UI Engineer, Team Lead, javascript, typescript, react, nextjs, vuejs, angular, portfolio',
  authors: [{ name, url: 'https://github.com/seancheong' }],
  openGraph: {
    title: name,
    description,
    url: 'https://www.seancheong.dev',
    type: 'website',
    images: [
      {
        url: 'https://www.seancheong.dev/screenshot.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: name,
    description,
    images: ['https://www.seancheong.dev/screenshot.png'],
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
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
