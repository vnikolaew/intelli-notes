import { auth } from "auth";
import { PropsWithChildren } from "react";


/**
 * Server component rendering children only if user is signed in.
 * @param children
 * @constructor
 */
export const ServerSignedIn = async ({ children }: PropsWithChildren) => {
   const isSignedIn = await auth();

   return isSignedIn ? children : null;
};

/**
 * Server component rendering children only if user is signed out.
 * @param children
 * @constructor
 */
export const ServerSignedOut = async ({ children }: PropsWithChildren) => {
   const isSignedIn = await auth();

   return !isSignedIn ? children : null;
};
