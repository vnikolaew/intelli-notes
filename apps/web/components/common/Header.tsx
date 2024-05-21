"use client";
import { cn } from "lib/utils";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { ThemeSwitch } from "./ThemeSwitch";

export interface NavbarProps {
}

const Header = ({}: NavbarProps) => {
   const session = useSession();

   return (
      <header
         className={`sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 !py-3 !z-10`}>
         <div className={`container flex h-14 max-w-screen-2xl items-center !w-3/4`}>
            <div>MAIN NAV</div>
            <div className={`flex flex-1 items-center justify-end space-x-2`}>
               <nav className={`flex items-center gap-3`}>
                  <ThemeSwitch />
                  {/*<SocialLinks />*/}
               </nav>
            </div>
         </div>
      </header>
   );
};

export default Header;