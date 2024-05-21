"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "components/ui/button";
import { cn } from "lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";


interface ThemeSwitchProps {
}

export function ThemeSwitch({}: ThemeSwitchProps) {
   const { setTheme, theme } = useTheme();

   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger asChild>
               {theme === `dark` ? (
                  <Button
                     onClick={_ => setTheme(`light`)}
                     className={cn(`rounded-xl border-none bg-transparent`)} variant={`outline`} size={"icon"}>
                     <Sun className="h-6 dark:text-white w-6 rotate-0 scale-100 transition-all text-white" />
                     <span className="sr-only">Toggle theme</span></Button>
               ) : (
                  <Button onClick={_ => setTheme(`dark`)} className={cn(`rounded-xl border-none`)}
                          variant="outline" size="icon">
                     <Moon
                        className="absolute h-6 w-6 transition-all text-black" />
                     <span className="sr-only">Toggle theme</span>
                  </Button>

               )}
            </TooltipTrigger>
            <TooltipContent side={`bottom`} className={`!px-3 py-[1px] !text-[.7rem] rounded-xl bg-black text-white`}>
               Switch to {theme === `dark` ? `light` : `dark`} theme
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   )
      ;
}
