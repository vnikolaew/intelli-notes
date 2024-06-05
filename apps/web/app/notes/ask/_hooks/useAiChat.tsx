"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
   ChatMessage,
   isUserMessage,
   NO_RESPONSE_MESSAGE,
   SCORE_THRESHOLD,
   TSystemMessage,
   TUserMessage,
} from "../_components/AIChat";
import { LoaderPinwheel } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { AddChatMessage, addChatMessage, AddMessageSchema, askAi, Response } from "../actions";
import { SafeExecuteResponse } from "lib/actions";
import { readStreamableValue } from "ai/rsc";
import { parseAsString, useQueryState } from "nuqs";

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
   },
];

export function useAiChat(initialMessages: ChatMessage[] = []) {
   const [messages, setMessages] = useState<ChatMessage[]>([...START_MESSAGES, ...initialMessages]);
   const [chatId] = useQueryState(`chatId`, parseAsString);

   useEffect(() => {
      setMessages(m => [...START_MESSAGES, ...initialMessages]);
   }, [chatId])

   const updateLastMessage = (message: Partial<ChatMessage> | ((message: ChatMessage) => Partial<ChatMessage>),
   ) =>
      setMessages(m => {
         const lastMessage = m.at(-1);
         let newMessage = typeof message === `function` ? { ...lastMessage, ...message(lastMessage) } : { ...lastMessage, ...message };
         return [...m.slice(0, -1), newMessage];
      });

   const [message, setMessage] = useState(``);

   const {
      execute: addMessageAction,
      status: addMessageStatus,
   } = useAction<AddMessageSchema, AddChatMessage>(addChatMessage, {
      onSuccess: (res, { clientMessageId }, reset) => {
         if (res.success) {
            console.log(res.message);

            // Synchronize IDs:
            setMessages(m => m.map(message => message.id === clientMessageId ?
               {
                  ...message,
                  saved: true,
                  role: res.message.role.toLowerCase() as ChatMessage["role"],
                  message: res.message.raw_text,
                  id: res.message.id,
                  timestamp: res.message.createdAt,
               } : message));
         }
      },
      onError: console.error,
   });

   const handleSuccess = useCallback(async (res: SafeExecuteResponse<Response>) => {
      if (res.success) {
         console.log(res, res.result.response.score);

         if (res.result.response.score > SCORE_THRESHOLD) {
            updateLastMessage({ message: ``, role: `system` });

            for await (let value of readStreamableValue(res.result.answer)) {
               updateLastMessage(({ message }) => ({ message: message + value }));
            }

            if (!!res.result.note?.id) {
               updateLastMessage(
                  {
                     note: res.result.note,
                     role: `system`,
                  });
            }
         } else {
            updateLastMessage({
               role: `system`,
               message: NO_RESPONSE_MESSAGE,
            });
         }

         updateLastMessage({
            // @ts-ignore
            done: true,
         });
      }

      console.log({ messages });
   }, [messages]);

   const { status, execute } = useAction(askAi, {
      onSuccess: handleSuccess,
      onError: error => {
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

   const handleSendUserMessage = (message: TUserMessage) => {
      const systemMessage = systemGeneratingMessage();

      setMessages(m => [...m, message, systemMessage]);
      setMessage(``);
      addMessageAction({
         chatId,
         message: message.message,
         // @ts-ignore
         role: message.role.toUpperCase(),
         clientMessageId: message.id,
      });
      execute({ question: message.message });
   };

   const handleRegenerate = useCallback(() => {
      console.log(`Re-generating ...`);
      const systemMessage = systemGeneratingMessage();

      updateLastMessage(systemMessage)

      const lastUserMessage = messages.findLast(m => isUserMessage(m)) as TUserMessage;
      setMessage(``);
      execute({ question: lastUserMessage.message });
   }, [messages]);

   const handler = useCallback(e => {
      if (e.key !== `Enter` || message?.length === 0) return;
      handleSendUserMessage({ id: crypto.randomUUID(), role: `user`, message, timestamp: new Date() });
   }, [message]);

   useEffect(() => {
      document.addEventListener(`keypress`, handler);
      return () => document.removeEventListener(`keypress`, handler);
   }, [message]);

   useEffect(() => {
      const last = messages.at(-1);
      if (last?.done === true && last.role === `system` && !last?.saved) {
         console.log(`Time to save System message to DB...`);

         addMessageAction({
            chatId,
            message: last.message as string,
            // @ts-ignore
            role: last.role.toUpperCase(),
            clientMessageId: last.id,
            metadata: {
               source_note_id: last.note?.id ?? null,
            },
         });
      }

   }, [messages]);

   return { messages, message, setMessage, handleSendUserMessage, handleRegenerate, execute, status };
}