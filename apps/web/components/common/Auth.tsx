"use client";
import { useIsSignedIn } from "hooks/useIsSignedIn";
import { PropsWithChildren } from "react";

export const SignedIn = ({ children }: PropsWithChildren) => {
   const isSignedIn = useIsSignedIn();

   return isSignedIn ? children : null;
};

export const SignedOut = ({ children }: PropsWithChildren) => {
   const isSignedIn = useIsSignedIn();

   return !isSignedIn ? children : null;
};
