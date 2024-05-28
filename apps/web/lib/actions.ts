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

export type SafeExecuteResponse<T> = {
   success: true; result: T
} | { success: false, error: any }
/**
 * A helper method for wrapping actions in a try / catch.
 */
export const safeExecute = async <T>(action: <T>() => Promise<T>): Promise<SafeExecuteResponse<T>> => {
   try {
      const result: T = await action();
      return { success: true, result };
   } catch (error) {
      return { success: false, error };
   }
};
