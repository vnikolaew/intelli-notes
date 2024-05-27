"use client";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import appLogo from "public/logo.jpg";
import { SignedIn, SignedOut } from "./Auth";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Button } from "components/ui/button";
import { LogOut, PenLine } from "lucide-react";
import { APP_NAME } from "config/site";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

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
               <Link href={`/`} className={`flex items-center gap-3`}>
                  <Image className={`rounded-full`} height={40} width={40} alt={APP_NAME} src={appLogo} />
                  <span className={`font-semibold text-lg !test-gradient`}>{APP_NAME}</span>
               </Link>
            </nav>
            <div className={`flex-1 text-center flex items-center gap-8 justify-center`}>
            </div>
            <div className={`flex flex-1 items-center justify-end space-x-8`}>
               <SignedIn>
                  <div className={`flex items-center gap-6`}>
                     <Avatar className={`cursor-pointer`}>
                        <AvatarFallback>{session?.data?.user?.name}</AvatarFallback>
                        <AvatarImage src={session?.data?.user?.image!} />
                     </Avatar>
                     <div>
                        <TooltipProvider>
                           <Tooltip>
                              <TooltipTrigger asChild>
                                 <Button title={`Create a note`} asChild className={`rounded-md p-2`} variant={`ghost`} size={"icon"}>
                                    <Link href={`/create`}>
                                       <PenLine size={18} />
                                    </Link>
                                 </Button>
                              </TooltipTrigger>
                              <TooltipContent side={`top`} className={`bg-black text-white rounded-md text-xs`}>
                                 Create a new note
                              </TooltipContent>
                           </Tooltip>
                        </TooltipProvider>
                     </div>
                     <Button
                        className={`px-4 gap-2 rounded-lg !py-2 !h-fit`}
                        onClick={_ => signOut({ redirect: true, callbackUrl: `/` })} variant={"destructive"}>
                        <LogOut size={14} />
                        Sign out
                     </Button>
                  </div>
               </SignedIn>
               <SignedOut>
                  <Button
                     onClick={_ => signIn()}
                     className={`px-6 !py-0 rounded-lg test-gradient`}>
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