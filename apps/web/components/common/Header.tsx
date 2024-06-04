"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import appLogo from "public/logo.jpg";
import { SignedIn, SignedOut } from "./Auth";
import { Button } from "components/ui/button";
import { LogOut, Notebook, PenLine, Sparkles, Telescope } from "lucide-react";
import { APP_NAME } from "config/site";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { InteractiveLink } from "@repo/ui/components";
import UserAvatar from "./UserAvatar";
import { useBoolean } from "hooks/useBoolean";
import SignInModal from "../modals/SignInModal";
import { usePathname } from "next/navigation";
import { cn } from "lib/utils";

export interface NavbarProps {
}

/**
 * The site's header, containing the Navbar as well.
 * @constructor
 */
const Header = ({}: NavbarProps) => {
   const session = useSession();
   const pathname = usePathname();
   const [signInModalOpen, setSignInModalOpen] = useBoolean();

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
               <InteractiveLink
                  className={cn(`text-lg inline-flex gap-2 items-center`,
                     pathname === `/notes` && `text-blue-600 font-semibold`)}
                  underlineClassname={cn(`bg-black`,
                     pathname === `/notes` && `bg-blue-600`)
                  }
                  href={`/notes`}>
                  <Notebook size={14} />
                  My notes
               </InteractiveLink>
               <InteractiveLink
                  className={cn(`text-lg inline-flex gap-2 items-center`,
                     pathname === `/explore` && `text-blue-600 font-semibold`)}
                  underlineClassname={cn(`bg-black`,
                     pathname === `/explore` && `bg-blue-600`)
                  }
                  href={`/explore`}>
                  <Telescope className={``} size={14} />
                  Explore
               </InteractiveLink>
               <InteractiveLink
                  className={cn(`text-lg inline-flex gap-2 items-center`,
                     pathname === `/notes/ask` && `text-blue-600 font-semibold`)}
                  underlineClassname={cn(`bg-black`,
                     pathname === `/notes/ask` && `bg-blue-600`)
                  }
                  href={`/notes/ask`}>
                  <Sparkles size={14} />
                  Ask AI
               </InteractiveLink>
            </div>
            <div className={`flex flex-1 items-center justify-end space-x-8`}>
               <SignedIn>
                  <div className={`flex items-center gap-6`}>
                     <UserAvatar title={session?.data?.user?.name} className={`cursor-pointer`}
                                 imageSrc={session?.data?.user?.image} />
                     <div>
                        <TooltipProvider> <Tooltip>
                           <TooltipTrigger asChild>
                              <Button asChild className={`rounded-md p-2`} variant={`ghost`} size={"icon"}>
                                 <Link href={`/write`}>
                                    <PenLine size={18} />
                                 </Link>
                              </Button>
                           </TooltipTrigger>
                           <TooltipContent side={`top`} className={`bg-black text-white rounded-md text-xs`}>
                              Create a note
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
                     onClick={_ => setSignInModalOpen(true)}
                     className={`px-6 !py-0 rounded-lg cta-button`}>
                     Sign in
                  </Button>
                  <SignInModal open={signInModalOpen} setOpen={setSignInModalOpen} />
               </SignedOut>
               <nav className={`flex items-center gap-3`}>
               </nav>
            </div>
         </div>
      </header>
   );
};

export default Header;