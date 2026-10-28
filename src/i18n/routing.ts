import { publishedLocales } from '@/portfolio-content/locales';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: publishedLocales,

  defaultLocale: 'en',
  localePrefix: 'always',
  alternateLinks: false,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
