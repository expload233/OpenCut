import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh', 'ja', 'ko', 'tr'],

  defaultLocale: 'en',

  localePrefix: 'as-needed'
});
