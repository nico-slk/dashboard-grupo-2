import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { intlMiddleware } from './intl-middleware';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  let response = await intlMiddleware(req);

  if (!response) {
    // Si `intlMiddleware` no devuelve una respuesta, continuar con la solicitud normalmente
    response = NextResponse.next();
  }

  if (!session) {
    if (pathname.startsWith('/dashboard')) {
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = '/auth/login';
      url.search = `p=${requestedPage}`;
      return NextResponse.redirect(url);
    }
  } else {
    if (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')) {
      const url = req.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  // Ejemplo de modificación de la respuesta
  response.headers.set('X-Custom-Header', 'MiValorPersonalizado');

  return response;
}

export const config = {
  matcher: [
    '/',
    '/(es|en)/:path*',
    "/dashboard/:path*",
    "/boards/:path*",
    "/tasks/:path*",
    "/auth/login",
    "/auth/register",
  ],
};

