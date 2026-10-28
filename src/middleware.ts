import { isPublishedLocale } from '@/portfolio-content/locales';
import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';

import { routing } from './i18n/routing';

const localize = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const [, locale] = request.nextUrl.pathname.split('/');
  if (request.nextUrl.pathname !== '/' && !isPublishedLocale(locale))
    return NextResponse.next();
  return localize(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
