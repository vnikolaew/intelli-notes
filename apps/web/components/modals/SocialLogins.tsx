"use client";
import { signIn } from "next-auth/react";
import React, { Fragment } from "react";
import { useTheme } from "next-themes";
// @ts-ignore
import { UilFacebook, UilGoogle } from "@iconscout/react-unicons";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "lib/utils";
import { Button, buttonVariants } from "components/ui/button";
import { usePromise } from "hooks/usePromise";

export const LoadingSpinner = ({ text }: { text?: string }) => (
   <Fragment>
      <Loader2 size={16} className={`animate-spin mr-2`} />
      {text ?? `Signing in ...`}
   </Fragment>
);

export function SocialLogins() {
   const { theme } = useTheme();
   const pathname = usePathname();
   const { loading, action: googleSignIn } = usePromise(() => {
      return signIn(`google`, { redirect: true, callbackUrl: pathname });
   });

   const handleGoogleLogin = async (e: any) => {
      e.preventDefault();
      await googleSignIn()
   };

   const handleFacebookLogin = async (e: any) => {
      e.preventDefault();
   };

   return (
      <div className={`w-full items-center flex flex-col gap-4`}>
         <Button
            disabled={loading}
            onClick={handleGoogleLogin}
            className={cn(`gap-2 w-full rounded-full items-center text-sm dark:text-white`, loading ? `justify-center` : `justify-between`)}
            variant={theme === `dark` ? `default` : `outline`}>
            {loading ? <LoadingSpinner /> : (
               <>
                  <UilGoogle size={16} className={`text-red-500`} />
                  Continue with Google
                  <span />
               </>

            )}
         </Button>
         <Button onClick={handleFacebookLogin}
                 disabled={false}
                 className={cn(`gap-2 w-full rounded-full items-center text-sm`, false ? `justify-center` : `justify-between`)}
                 variant={`outline`}>
            {false ? <LoadingSpinner /> : <Fragment>
               <UilFacebook size={16} className={`text-blue-500`} />
               Continue with Facebook
               <span />
            </Fragment>}
         </Button>
         <p className="px-0 mt-4 text-center text-xs text-muted-foreground !w-full leading-none">
            By clicking continue, you agree to our{" "}
            <Link
               href="/tos"
               className={cn(`underline-offset-4 hover:text-primary !text-xs`, buttonVariants({ variant: `link` }), `!m-0 !py-0 !px-1`)}
            >
               Terms of Service
            </Link>
            and{" "}
            <Link
               href="/privacy-policy"
               className={cn(`underline-offset-4 hover:text-primary !text-xs`, buttonVariants({ variant: `link` }), `!m-0 !py-0 !px-1`)}
            >
               Privacy Policy
            </Link>
            .
         </p>
      </div>
   );
}
