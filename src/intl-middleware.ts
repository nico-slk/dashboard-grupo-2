import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const nextIntlMiddleware = createIntlMiddleware({
  // Configura las opciones según la documentación de next-intl
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en'
});

export function intlMiddleware(request: NextRequest) {
  return nextIntlMiddleware(request);
}
