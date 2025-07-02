import messages from './messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    // use type safe message keys with `next-intl`
    Messages: typeof messages;
  }
}
