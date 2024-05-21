import { NextResponse } from "next/server";
import type { NextMiddleware } from "next/server";

export const config = { runtime: "nodejs" };

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware

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

export const middleware = chain([urlMiddleware]);
