"use client";
import React, { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { cn } from "lib/utils";
import { parseAsString, useQueryState } from "nuqs";
import { AiChatHistory } from "@repo/db";
import {
   DropdownMenu,
   DropdownMenuContent, DropdownMenuItem,
   DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { useBoolean } from "hooks/useBoolean";
import { Archive, Loader2, Trash } from "lucide-react";
import { DropdownMenuItemProps } from "@radix-ui/react-dropdown-menu";
import { useAction } from "next-safe-action/hooks";
import { ArchiveChat, archiveChat, ArchiveSchema, DeleteChat, deleteChat, DeleteSchema } from "../actions";
import { isExecuting } from "next-safe-action/status";
import { useTranslation } from "react-i18next";

interface ChatOptionsButtonProps {
   chat: AiChatHistory;
}

const ChatOptionsButton = ({ chat }: ChatOptionsButtonProps) => {
   const [chatId] = useQueryState(`chatId`, parseAsString);
   const [dropdownOpen, setDropdownOpen] = useBoolean();
   const [tooltipOpen, setTooltipOpen] = useBoolean();
   const { t } = useTranslation(`home`, { keyPrefix: `AskAi.Tooltips` });

   const { execute: archiveAction, status: archiveStatus } = useAction<ArchiveSchema, ArchiveChat>(archiveChat, {
      onSuccess: res => {
         if (res.success) {
            console.log(res.chat);
         }
      },
      onSettled: _ => setDropdownOpen(false),
   });

   const { execute: deleteAction, status: deleteStatus } = useAction<DeleteSchema, DeleteChat>(deleteChat, {
      onSuccess: res => {
         if (res.success) {
            console.log(res.chat);
         }
      },
      onSettled: _ => setDropdownOpen(false),
   });

   async function handleArchiveChat() {
      archiveAction({ chatId: chat.id, currentChatId: chatId });
   }

   async function handleDeleteChat() {
      deleteAction({ chatId: chat.id, currentChatId: chatId });
   }

   return (
      <DropdownMenu onOpenChange={setDropdownOpen} open={dropdownOpen}>
         <DropdownMenuTrigger className={`absolute right-3 top-1/2 -translate-y-2/3`}>
            <TooltipProvider>
               <Tooltip onOpenChange={setTooltipOpen} open={tooltipOpen} delayDuration={200}>
                  <TooltipTrigger
                     className={`mb-1`}
                     asChild>
                     <span
                        onClick={_ => setDropdownOpen(true)}
                        className={cn(`opacity-0 !font-sans text-sm group-hover:opacity-100 transition-all duration-200 tracking-tighter hover:!text-white`,
                           chatId === chat?.id && `opacity-100`,
                        )}>
                        ...
                     </span>
                  </TooltipTrigger>
                  <TooltipContent
                     side={`bottom`}
                     className={`bg-black text-white rounded-md text-xs max-w-[240px] !z-[100]`}>
                     {t(`Options`)}
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </DropdownMenuTrigger>
         <DropdownMenuContent
            className={`z-[100] bg-neutral-600 text-white !p-2 !rounded-lg !border-neutral-500`}
            side={`bottom`}>
            <ChatOptionItem
               loading={isExecuting(deleteStatus)}
               loadingText={`Deleting ...`}
               className={`!text-red-500`} title={t(`Delete`)}
               icon={<Trash size={18} className={`!text-red-500`} />} onAction={handleDeleteChat} />
            <ChatOptionItem
               loadingText={`Archiving ...`}
               loading={isExecuting(archiveStatus)}
               className={``} title={t(`Archive`)}
               icon={<Archive size={18} className={``} />} onAction={handleArchiveChat} />
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

interface ChatOptionItemProps extends DropdownMenuItemProps {
   title: string,
   icon: ReactNode,
   onAction: () => void | Promise<void>,
   loading: boolean
   loadingText?: string
}

const ChatOptionItem = ({ icon, title, onAction, className, loading, loadingText, ...props }: ChatOptionItemProps) => {
   return (
      <DropdownMenuItem
         onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            return onAction?.();
         }}
         className={cn(`cursor-pointer hover:!bg-neutral-500 hover:!opacity-90 transition-all duration-200  items-center gap-2 justify-between text-base !text-white !px-4`, className)}
         {...props}>
         {loading ? <Loader2 className={`animate-spin`} size={18} /> : icon}
         {loading ? (`Loading ...` ?? loadingText) : title}
      </DropdownMenuItem>
   );
};

export default ChatOptionsButton;