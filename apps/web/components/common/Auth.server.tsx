import { auth } from "auth";
import { PropsWithChildren } from "react";


export const ServerSignedIn = async ({ children }: PropsWithChildren) => {
   const isSignedIn = await auth();

   return isSignedIn ? children : null;
};

export const ServerSignedOut = async ({ children }: PropsWithChildren) => {
   const isSignedIn = await auth();

   return !isSignedIn ? children : null;
};
