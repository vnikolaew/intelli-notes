import { auth } from "../auth";
import { createSafeActionClient, DEFAULT_SERVER_ERROR } from "next-safe-action";

export class AuthError extends Error {
}

export const authorizedAction = createSafeActionClient({
   middleware: async (parsedInput, data) => {
      const session = await auth();
      if (!session || !session.user) throw new AuthError(`Unauthorized.`);

      return { userId: session.user?.id };
   },
   handleReturnedServerError: (e) => {
      return e instanceof Error ? e.message : DEFAULT_SERVER_ERROR;
   },
});

export const publicAction = createSafeActionClient({
   middleware: async (parsedInput, data) => {
      const session = await auth();
      return { userId: session?.user?.id };
   },
   handleReturnedServerError: (e) => {
      return e instanceof Error ? e.message : DEFAULT_SERVER_ERROR;
   },
});
