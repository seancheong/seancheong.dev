import type { PublishedLocale } from '@/portfolio-content/locales';

import type messages from '../../messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: PublishedLocale;
    Messages: typeof messages;
  }
}
