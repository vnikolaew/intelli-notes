"use client";
import { useIsSignedIn } from "hooks/useIsSignedIn";
import { PropsWithChildren } from "react";

/**
 * Client component rendering children only if user is signed in.
 * @param children
 * @constructor
 */
export const SignedIn = ({ children }: PropsWithChildren) => {
   const isSignedIn = useIsSignedIn();

   return isSignedIn ? children : null;
};

/**
 * Client component rendering children only if user is signed out.
 * @param children
 * @constructor
 */
export const SignedOut = ({ children }: PropsWithChildren) => {
   const isSignedIn = useIsSignedIn();

   return !isSignedIn ? children : null;
};
