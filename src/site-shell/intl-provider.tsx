'use client';

import { NextIntlClientProvider } from 'next-intl';
import type { ComponentProps } from 'react';

export function IntlProvider(
  props: ComponentProps<typeof NextIntlClientProvider>,
) {
  return <NextIntlClientProvider {...props} />;
}
