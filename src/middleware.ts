import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/:path*', '/index/:path*'],
};

// This middleware will be called for all requests
export function middleware(req: NextRequest) {
  // const basicAuth = req.headers.get('authorization');
  // const url = req.nextUrl;
  // if (basicAuth) {
  //   const authValue = basicAuth.split(' ')[1];
  //   const [user, pwd] = atob(authValue).split(':');
  //   if (user === 'user' && pwd === 'qweqwe') {
  //     return NextResponse.next();
  //   }
  // }
  // url.pathname = '/api/auth';
  // return NextResponse.rewrite(url);
}
