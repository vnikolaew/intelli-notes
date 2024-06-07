"use client";
import { ScrollArea } from "components/ui/scroll-area";
import React, { ReactNode, useEffect, useMemo, useRef } from "react";
import { AiChatHistory, AiChatHistoryMessage, Note } from "@repo/db";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { ArrowUp, Loader2 } from "lucide-react";
import { isExecuting } from "next-safe-action/status";
import UserMessage from "./messages/UserMessage";
import SystemMessage from "./messages/SystemMessage";
import { ChatEmptyState } from "./ChatEmptyState";
import { useAiChat } from "../_hooks/useAiChat";
import { useTranslation } from "react-i18next";

export interface AiChatProps {
   chatHistory: AiChatHistory & { messages: AiChatHistoryMessage[] };
}

export interface ChatMessage {
   id: string;
   role: `user` | `system`;
   message: string | ReactNode;
   timestamp: Date;
}

export interface TUserMessage extends ChatMessage {
   role: `user`;
   message: string;
}

export interface TSystemMessage extends ChatMessage {
   role: `system`;
   message: string | ReactNode;
   note?: Note;
}

export interface TSystemErrorMessage extends ChatMessage {
   role: `system`;
   message: string;
   error: string;
}

export function isUserMessage(message: ChatMessage): message is TUserMessage {
   return message.role === "user";
}

export function isSystemMessage(message: ChatMessage): message is TSystemMessage {
   return message.role === "system";
}

export function isErrorMessage(message: ChatMessage): message is TSystemErrorMessage {
   return message.error?.length;
}

export const SCORE_THRESHOLD = 0.2;

export const NO_RESPONSE_MESSAGE = `AI could not generate an appropriate answer to your question!`;


const AiChat = ({ chatHistory }: AiChatProps) => {
   const { status, message, messages, setMessage, handleSendUserMessage, handleRegenerate } = useAiChat(
      chatHistory.messages?.map(m => ({
         id: m.id,
         role: m.role.toLowerCase() as ChatMessage["role"],
         message: m.raw_text,
         saved: true,
         timestamp: m.createdAt,
         note: isSystemMessage({
            ...m,
            role: m.role.toLowerCase() as ChatMessage["role"],
         } as unknown as ChatMessage) && m.note ? m.note : undefined,
      })) ?? []);

   const showEmptyState = useMemo(() => messages.length === 0, [messages]);
   const {t} = useTranslation(`home`, {keyPrefix: `AskAi.EnterPrompt`})

   let lastMessageRef = useRef<HTMLDivElement>(null!);

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ block: `end`, behavior: `smooth` });
   }, [messages]);

   // @ts-ignore
   return (
      <div className={`w-full border-neutral-500 rounded-md flex flex-col items-center`}>
         {showEmptyState ? (
            <div className={`h-[300px] pt-8 flex flex-col items-center justify-center `}>
               <ChatEmptyState />
            </div>
         ) : (
            <ScrollArea id={`scroll-area`} className={`h-[500px] py-8 px-4 w-full gap-2`}>
               {messages.map((message, index) => {
                  return <div ref={index === messages.length - 1 ? lastMessageRef : null} className={``}>
                     {isUserMessage(message) ? (
                        <UserMessage
                           key={message.id}
                           onEditMessage={message => {
                              handleSendUserMessage(message);
                           }}
                           message={message} />
                     ) : <SystemMessage onRegenerate={handleRegenerate} key={message.id} message={message} />}
                  </div>;
               })}
            </ScrollArea>
         )}
         <div className={`w-full mt-4`}>
            <div className={`relative`}>
               <Input
                  onChange={e => setMessage(e.target.value)}
                  value={message}
                  placeholder={t(`Placeholder`)}
                  className={`rounded-full !px-6 !py-3 !h-fit focus:!outline-none focus:!border-none focus:!ring-0 text-base placeholder:text-muted-foreground`} />
               <Button
                  onClick={_ => {
                     handleSendUserMessage({
                        id: crypto.randomUUID(),
                        role: `user`,
                        message,
                        timestamp: new Date(),
                     });
                  }}
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
         <div className={`mt-2 text-muted-foreground text-sm`}>
            {t(`Warning`)}
         </div>
      </div>
   );
};

export default AiChat;