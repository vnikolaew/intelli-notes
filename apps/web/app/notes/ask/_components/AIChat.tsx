"use client";
import { ScrollArea } from "components/ui/scroll-area";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { ArrowUp, Loader2 } from "lucide-react";
import noCommentLogo from "public/no-comment.png";
import Image from "next/image";
import { useAction } from "next-safe-action/hooks";
import { askAi } from "../actions";
import { isExecuting } from "next-safe-action/status";

export interface AiChatProps {
}

export interface ChatMessage {
   role: `user` | `system`;
   message: string;
   timestamp: Date;
}

function ChatEmptyState() {
   return (
      <div className={`flex flex-col items-center gap-2 h-full my-auto justify-center`}>
         <Image className={`rounded-md`} height={100} width={80} src={noCommentLogo} alt={`No messages`} />
         <span className={`text-lg text-muted-foreground`}>
            You have no messages yet.
         </span>
      </div>
   );
}

const AiChat = ({}: AiChatProps) => {
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [message, setMessage] = useState(``);
   const showEmptyState = useMemo(() => messages.length === 0, [messages]);
   const { status, execute } = useAction(askAi, {
      onSuccess: res => {
         if (res.success) console.log(res);
      },
   });

   const handler = useCallback(e => {
      if (e.key !== `Enter`) return;

      setMessage(``);
      execute({ question: message });
   }, [message]);

   useEffect(() => {
      document.addEventListener(`keypress`, handler);
      return () => document.removeEventListener(`keypress`, handler);
   }, [message]);

   return (
      <div className={`w-full border-neutral-500 rounded-md bg-red-100 flex flex-col items-center`}>
         {showEmptyState ? (
            <div className={`h-[300px] pt-8 flex flex-col items-center justify-center `}>
               <ChatEmptyState />
            </div>
         ) : (
            <ScrollArea className={`h-[300px] pt-8`}>
            </ScrollArea>
         )}
         <div className={`w-full`}>
            <div className={`relative`}>
               <Input
                  onChange={e => setMessage(e.target.value)}
                  value={message}
                  placeholder={`Enter your prompt`}
                  className={`rounded-full !px-6 !py-3 !h-fit focus:!outline-none focus:!border-none focus:!ring-0 text-base placeholder:text-muted-foreground`} />
               <Button
                  onClick={_ => execute({ question: message })}
                  disabled={isExecuting(status)}
                  variant={`default`}
                  className={`absolute !p-1 right-3 top-1/2 -translate-y-1/2 rounded-full !h-9 !w-9`}
                  size={`icon`}>
                  {isExecuting(status) ? (
                     <Loader2 className={`animate-spin`} size={18} />
                  ) : (
                     <ArrowUp size={14} />
                  )}
               </Button>
            </div>
         </div>
      </div>
   );
};

export default AiChat;