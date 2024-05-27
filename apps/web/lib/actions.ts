import { auth } from "../auth";
import { createSafeActionClient, DEFAULT_SERVER_ERROR } from "next-safe-action";

export class AuthError extends Error {
}

/**
 * An authorized action that checks if the current user session is defined.
 */
export const authorizedAction = createSafeActionClient({
   middleware: async (_, __) => {
      const session = await auth();
      if (!session || !session.user) throw new AuthError(`Unauthorized.`);

      return { userId: session.user?.id };
   },
   handleReturnedServerError: (e) => {
      return e instanceof Error ? e.message : DEFAULT_SERVER_ERROR;
   },
});

/**
 * A public action that is accessible by any user / page.
 */
export const publicAction = createSafeActionClient({
   middleware: async () => {
      const session = await auth();
      return { userId: session?.user?.id };
   },
   handleReturnedServerError: (e) => {
      return e instanceof Error ? e?.message : DEFAULT_SERVER_ERROR;
   },
});
