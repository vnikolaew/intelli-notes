import { AiChatHistory, AiChatHistoryMessage } from "@repo/db";
import React from "react";
import NoCommentsLogo from "components/common/icons/NoCommentsLogo";
import { cn } from "lib/utils";
import Link from "next/link";
import { NewChatButton } from "./NewChatButton";
import ChatOptionsButton from "./ChatOptionsButton";

interface AiChatSidebarProps {
   chatHistories?: (AiChatHistory & { messages: AiChatHistoryMessage[] })[],
   chatId: string
}

const AiChatSidebar = ({ chatHistories, chatId }: AiChatSidebarProps) => {
   return (
      <div className={`bg-neutral-800 !h-full p-4 rounded-l-lg text-neutral-300`}>
         {chatHistories.length === 0 && (
            <div className={`text-center px-2 text-wrap !h-full flex flex-col items-center justify-center gap-2k`}>
               <NoCommentsLogo className={`!fill-transparent !w-32`} />
               <span className={`tracking-tight`}>
                  You have no chats yet.
               </span>
            </div>
         )}
         <div className={`w-full flex items-center justify-between`}>
            <div>New chat</div>
            <NewChatButton />
         </div>
         <ul className={`mx-0 mt-4`}>
            {chatHistories.map((chat, index) => (
               <li className={`w-full`} key={chat.id}>
                  <div
                     className={cn(`overflow-hidden px-6 py-2 rounded-lg !w-full text-base hover:opacity-90 hover:!bg-neutral-600 transition-all duration-200 relative group cursor-pointer`,
                        chatId === chat?.id && `bg-neutral-600`)}>
                     <ChatOptionsButton chat={chat} />
                     <Link className={`!w-full`} href={`/notes/ask?chatId=${chat.id}`}>
                        {chat.messages?.at(-1)?.raw_text ?? `No messages yet.`}
                     </Link>
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default AiChatSidebar;