import { NextRequest, NextResponse } from "next/server";
import type { NextMiddleware } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from './i18nConfig';

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware

export function middleware(request: NextRequest) {
   return i18nRouter(request, i18nConfig);
}

export function chain(
   functions: MiddlewareFactory[],
   index = 0,
): NextMiddleware {
   const current = functions[index];

   if (current) {
      const next = chain(functions, index + 1);
      return current(next);
   }

   return () => NextResponse.next();
}

export const urlMiddleware: MiddlewareFactory = (next: NextMiddleware) => {
   return async (req, evt) => {
      const response = NextResponse.next();
      response.headers.set("next-url", req.url);

      let res = next(req, evt);
      let nextResponse = res instanceof Promise ? (await res) : res;
      nextResponse?.headers.set("next-url", req.url);

      return nextResponse;
   };
};

// applies this middleware only to files in the app directory
export const config = {
   matcher: '/((?!api|static|.*\\..*|_next).*)',
   runtime: 'nodejs'
};
// export const middleware = chain([urlMiddleware]);
