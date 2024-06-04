"use client";
import React, { } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { cn } from "lib/utils";
import { parseAsString, useQueryState } from "nuqs";
import { AiChatHistory } from "@repo/db";
import {
   DropdownMenu,
   DropdownMenuContent, DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { useBoolean } from "hooks/useBoolean";

interface ChatOptionsButtonProps {
   chat: AiChatHistory;
}

const ChatOptionsButton = ({ chat }: ChatOptionsButtonProps) => {
   const [chatId] = useQueryState(`chatId`, parseAsString)
   const [dropdownOpen, setDropdownOpen] = useBoolean()

   return (
      <DropdownMenu onOpenChange={setDropdownOpen} open>
         <DropdownMenuTrigger asChild>
            <TooltipProvider>
               <Tooltip delayDuration={200}>
                  <TooltipTrigger
                     className={`mb-1`}
                     asChild>
                     <span
                        onClick={_ => setDropdownOpen(true)}
                        className={cn(`absolute opacity-0 right-2 top-1/2 -translate-y-2/3 !font-sans text-sm group-hover:opacity-100 transition-all duration-200 tracking-tighter hover:!text-white`,
                           chatId === chat?.id && `opacity-100`,
                        )}>
                        ...
                     </span>
                  </TooltipTrigger>
                  <TooltipContent
                     side={`bottom`}
                     className={`bg-black text-white rounded-md text-xs max-w-[240px] !z-[100]`}>
                     Options
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </DropdownMenuTrigger>
         <DropdownMenuContent className={`z-[100]`} side={`bottom`}>
            Content
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default ChatOptionsButton;