"use client";
import { ScrollArea } from "components/ui/scroll-area";
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { ArrowUp, Loader2, LoaderPinwheel } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { askAi, Response } from "../actions";
import { isExecuting } from "next-safe-action/status";
import UserMessage from "./UserMessage";
import SystemMessage from "./SystemMessage";
import { readStreamableValue } from "ai/rsc";
import { SafeExecuteResponse } from "lib/actions";
import { ChatEmptyState } from "./ChatEmptyState";

export interface AiChatProps {
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
   note?: ReactNode;
}

export interface TSystemErrorMessage extends ChatMessage {
   role: `system`;
   message: string;
   error: string;
}

export function isUserMessage(message: ChatMessage): message is TUserMessage {
   return message.role === "user";
}

export function isErrorMessage(message: ChatMessage): message is TSystemErrorMessage {
   return message.error?.length;
}

export const SCORE_THRESHOLD = 0.2;

export const NO_RESPONSE_MESSAGE = `AI could not generate an appropriate response to your question!`;

const systemGeneratingMessage = () => {
   return {
      message: <div className={`flex items-center gap-2`}>
         <LoaderPinwheel size={14} className={`animate-spin`} />
         <span className={`animate-pulse`}>
               Generating
            </span>
      </div>,
      timestamp: new Date(),
      role: `system` as const,
      id: crypto.randomUUID(),
   } as TSystemMessage;
};

const START_MESSAGES: ChatMessage[] = [
   {
      id: crypto.randomUUID(),
      role: `user`,
      message: `A user message`,
      timestamp: new Date(),
   },
   {
      id: crypto.randomUUID(),
      role: `system`,
      message: `A system message`,
      timestamp: new Date(),
   }
]

const AiChat = ({}: AiChatProps) => {
   const [messages, setMessages] = useState<ChatMessage[]>(START_MESSAGES);
   const [message, setMessage] = useState(``);
   const showEmptyState = useMemo(() => messages.length === 0, [messages]);

   let lastMessageRef = useRef<HTMLDivElement>(null!);

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ block: `end`, behavior: `smooth` });
   }, [messages]);

   const handleSuccess = useCallback(async (res: SafeExecuteResponse<Response>) => {
      if (res.success) {
         console.log(res, res.result.response.score);
         if (res.result.response.score > SCORE_THRESHOLD) {
            setMessages((messages) => {
               const last = messages.at(-1)!;
               return [...messages.slice(0, messages.length - 1), { ...last, message: `` }];
            });

            for await (let value of readStreamableValue(res.result.answer)) {
               setMessages((messages) => {
                  const last = messages.at(-1)!;
                  return [...messages.slice(0, messages.length - 1), { ...last, message: last.message + value }];
               });
            }
            if (!!res.result.note?.id) {
               setMessages((messages) => {
                  const last = messages.at(-1)!;

                  return [...messages.slice(0, messages.length - 1), {
                     ...last,
                     message: last.message,
                     note: res.result.note,
                  }];
               });
            }
         } else {
            setMessages((messages) => {
               const last = messages.at(-1)!;
               return [...messages.slice(0, messages.length - 1), {
                  ...last,
                  message: NO_RESPONSE_MESSAGE
               }];
            });
         }
      }
   }, [messages]);

   const { status, execute } = useAction(askAi, {
      onSuccess: handleSuccess,
      onError: error => {
         console.error(error.validationErrors.question);
         setMessages((messages) => {
            const last = messages.at(-1)!;
            const err = `Error: ${error.validationErrors?.question}` ?? error.serverError ?? error.fetchError;

            return [...messages.slice(0, messages.length - 1), {
               ...last,
               message: err,
               error: err,
            }];
         });
      },
   });

   const handleRegenerate = useCallback(() => {
      console.log(`Re-generating ...`);
      const systemMessage = systemGeneratingMessage();

      setMessages(m => {
         return [...m.slice(0, -1), systemMessage];
      });
      const lastUserMessage = messages.findLast(m => isUserMessage(m)) as TUserMessage;
      setMessage(``);
      execute({ question: lastUserMessage.message });
   }, [messages]);

   const handleSendUserMessage = (message: TUserMessage) => {
      const systemMessage = systemGeneratingMessage();

      setMessages(m => [...m, message, systemMessage]);
      setMessage(``);
      execute({ question: message.message });
   };

   const handler = useCallback(e => {
      if (e.key !== `Enter` || message?.length === 0) return;
      handleSendUserMessage({ id: crypto.randomUUID(), role: `user`, message, timestamp: new Date() });
   }, [message]);

   useEffect(() => {
      document.addEventListener(`keypress`, handler);
      return () => document.removeEventListener(`keypress`, handler);
   }, [message]);

   // @ts-ignore
   return (
      <div className={`w-full border-neutral-500 rounded-md flex flex-col items-center`}>
         {showEmptyState ? (
            <div className={`h-[300px] pt-8 flex flex-col items-center justify-center `}>
               <ChatEmptyState />
            </div>
         ) : (
            <ScrollArea id={`scroll-area`} className={`h-[500px] pt-8 px-4 w-full pb-12 gap-2`}>
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
                  </div>
               })}
            </ScrollArea>
         )}
         <div className={`w-full mt-4`}>
            <div className={`relative`}>
               <Input
                  onChange={e => setMessage(e.target.value)}
                  value={message}
                  placeholder={`Enter your prompt`}
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
         <div className={`mt-1 text-muted-foreground text-xs`}>AI can make mistakes. Check important info.</div>
      </div>
   );
};

export default AiChat;