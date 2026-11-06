import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected path patterns
const protectedRoutes = [
  /^\/my-books(\/.*)?$/,
  /^\/add-book(\/.*)?$/,
  /^\/my-borrows(\/.*)?$/,
  /^\/borrowed-books(\/.*)?$/,
  /^\/books\/[^/]+(\/.*)?$/,
];

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const sessionCookie =
    request.cookies.get('better-auth.session_token') ||
    request.cookies.get('__Secure-better-auth.session_token');

  const isProtected = protectedRoutes.some((route) => route.test(pathname));

  if (isProtected && !sessionCookie) {
    const signInUrl = new URL('/sign-in', request.url);
    const targetUrl = `${pathname}${search}`;
    signInUrl.searchParams.set('callbackUrl', targetUrl);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/my-books/:path*',
    '/add-book/:path*',
    '/my-borrows/:path*',
    '/borrowed-books/:path*',
    '/books/:id/:path*',
  ],
};