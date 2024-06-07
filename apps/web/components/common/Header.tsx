"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import appLogo from "public/logo.jpg";
import { SignedIn, SignedOut } from "./Auth";
import { Button } from "components/ui/button";
import { LogOut, Notebook, Sparkles, Telescope } from "lucide-react";
import { APP_NAME } from "config/site";
import { InteractiveLink } from "@repo/ui/components";
import { useBoolean } from "hooks/useBoolean";
import SignInModal from "../modals/SignInModal";
import { usePathname } from "next/navigation";
import { cn } from "lib/utils";
import UserAvatarDropdown from "@/components/common/UserAvatarDropdown";
import CreateNoteButton from "@/components/common/CreateNoteButton";
import ReportIssueButton from "@/components/common/ReportIssueButton";
import { useTranslations } from "next-intl";

export interface NavbarProps {
}

export interface InteractiveHeaderLinkProps {
   href: string;
   icon: ReactNode;
   title: ReactNode;
}

const InteractiveHeaderLink = ({ icon, title, href }: InteractiveHeaderLinkProps) => {
   const pathname = usePathname();
   return (
      <InteractiveLink
         className={cn(`text-base inline-flex gap-2 items-center`,
            pathname === href && `font-semibold !test-gradient`)}
         underlineClassname={cn(`bg-black`,
            pathname === href && `bg-blue-600`)
         }
         href={href}>
         {icon}
         {title}
      </InteractiveLink>
   );
};

/**
 * The site's header, containing the Navbar as well.
 * @constructor
 */
const Header = ({}: NavbarProps) => {
   const pathname = usePathname();
   const [signInModalOpen, setSignInModalOpen] = useBoolean();

   return (
      <header
         className={`sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 !py-3 !z-10`}>
         <div className={`container flex h-14 max-w-screen-2xl items-center !w-3/4 justify-between`}>
            <nav className={`flex flex-1 items-center space-x-4 lg:space-x-6`}>
               <Link href={`/`} className={`flex items-center gap-3`}>
                  <Image className={`rounded-full`} height={40} width={40} alt={APP_NAME} src={appLogo} />
                  <span className={`font-semibold text-lg !test-gradient drop-shadow-md`}>{APP_NAME}</span>
               </Link>
            </nav>
            <div className={`flex-1 text-center flex items-center gap-8 justify-center`}>
               <SignedIn>
                  <InteractiveHeaderLink href={`/notes`} icon={<Notebook
                     size={14}
                     className={cn(pathname === `/notes` && `stroke-[3px] !text-blue-600`, `text-black`)}
                  />} title={`My notes`} />
               </SignedIn>
               <InteractiveHeaderLink href={`/explore`} icon={<Telescope
                  size={14}
                  className={cn(pathname === `/explore` && `stroke-[3px] !text-blue-600`, `text-black`)}
               />} title={`Explore`} />
               <SignedIn>
                  <InteractiveHeaderLink
                     href={`/notes/ask`} icon={<Sparkles
                     size={14}
                     className={cn(pathname === `/notes/ask` && `stroke-[3px] !text-blue-600`, `text-black`)}
                  />} title={`Ask AI`} />
               </SignedIn>
            </div>
            <div className={`flex flex-1 items-center justify-end space-x-8`}>
               <SignedIn>
                  <div className={`flex items-center gap-4`}>
                     <div>
                        <UserAvatarDropdown />
                     </div>
                     <CreateNoteButton />
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
               <ReportIssueButton />
            </div>
         </div>
      </header>
   );
};

export default Header;