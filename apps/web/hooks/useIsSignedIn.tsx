import { useSession } from "next-auth/react";
import { useMemo } from "react";

export function useIsSignedIn() {
   const { status, data } = useSession();
   const isSignedIn = useMemo(() =>
      status === `authenticated` && data, [data, status]);

   return isSignedIn;
}