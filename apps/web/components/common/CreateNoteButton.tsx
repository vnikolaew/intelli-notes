"use client"
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PenLine } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface CreateNoteButtonProps {
}

const CreateNoteButton = ({}: CreateNoteButtonProps) => {
   const { t } = useTranslation(`home`, {keyPrefix: `Header.Tooltips`});

   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger asChild>
               <Button asChild className={`rounded-md p-2`} variant={`ghost`} size={"icon"}>
                  <Link href={`/write`}>
                     <PenLine className={`stroke-[2px]`} size={22} />
                  </Link>
               </Button>
            </TooltipTrigger>
            <TooltipContent side={`top`} className={`bg-black text-white rounded-md text-xs`}>
               {t(`CreateNote`)}
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};

export default CreateNoteButton;