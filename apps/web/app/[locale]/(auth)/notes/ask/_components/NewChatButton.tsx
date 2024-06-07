"use client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { Button } from "components/ui/button";
import { SquarePen } from "lucide-react";
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const NewChatButton = () => {
   const { t } = useTranslation(`home`, { keyPrefix: `AskAi.Tooltips` });

   return (
      <TooltipProvider>
         <Tooltip delayDuration={200}>
            <TooltipTrigger
               className={`mb-1`}
               asChild>
               <Button asChild className={`hover:!bg-neutral-600 group`} variant={`ghost`} size={`icon`}>
                  <Link href={`/notes/ask?new=true`}>
                     <SquarePen className={`group-hover:!text-white`} size={22} />
                  </Link>
               </Button>
            </TooltipTrigger>
            <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs max-w-[240px]`}>
               {t(`NewChat`)}
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};