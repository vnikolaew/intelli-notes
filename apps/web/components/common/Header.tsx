"use client";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ThemeSwitch } from "./ThemeSwitch";
import Image from "next/image";
import appLogo from "public/logo.png";
import { APP_NAME } from "../../lib/consts";
import { SignedIn, SignedOut } from "./Auth";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Button } from "components/ui/button";
import { LogOut } from "lucide-react";

export interface NavbarProps {
}

/**
 * The site's header, containing the Navbar as well.
 * @constructor
 */
const Header = ({}: NavbarProps) => {
   const session = useSession();

   return (
      <header
         className={`sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 !py-3 !z-10`}>
         <div className={`container flex h-14 max-w-screen-2xl items-center !w-3/4 justify-between`}>
            <nav className={`flex flex-1 items-center space-x-4 lg:space-x-6`}>
               <Link href={`/`} className={`flex items-center gap-4`}>
                  <Image className={`rounded-full`} height={40} width={40} alt={APP_NAME} src={appLogo} />
                  <span className={`font-semibold text-base`}>{APP_NAME}</span>
               </Link>
            </nav>
            <div className={`flex-1 text-center flex items-center gap-8 justify-center`}>
               <Link  className={`hover:underline text-base`} href={`/#pricing`}>Pricing</Link>
               <Link className={`hover:underline text-base`} href={`/#faq`}>FAQ</Link>
            </div>
            <div className={`flex flex-1 items-center justify-end space-x-8`}>
               <ThemeSwitch />
               <SignedIn>
                  <div className={`flex items-center gap-4`}>
                     <Avatar className={`cursor-pointer`}>
                        <AvatarFallback>{session?.data?.user?.name}</AvatarFallback>
                        <AvatarImage src={session?.data?.user?.image!} />
                     </Avatar>
                     <Button className={`px-4 gap-2 rounded-lg`}
                             onClick={_ => signOut({ redirect: true, callbackUrl: `/` })} variant={"destructive"}>
                        <LogOut size={14} />
                        Sign out
                     </Button>
                  </div>
               </SignedIn>
               <SignedOut>
                  <Button
                     onClick={_ => signIn()}
                     className={`px-6 !py-0 rounded-lg`}>
                     Get Started
                  </Button>
               </SignedOut>
               <nav className={`flex items-center gap-3`}>
               </nav>
            </div>
         </div>
      </header>
   );
};

export default Header;