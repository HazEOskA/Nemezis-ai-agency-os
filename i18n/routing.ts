import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'nl', 'pl', 'ro', 'bg', 'uk', 'de'],
  defaultLocale: 'en'
});

export type Locale = (typeof routing.locales)[number];
