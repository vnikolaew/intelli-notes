import { AiChatHistory, AiChatHistoryMessage } from "@repo/db";
import React, { Fragment } from "react";
import NoCommentsLogo from "components/common/icons/NoCommentsLogo";
import { cn, getMonthName } from "lib/utils";
import Link from "next/link";
import { NewChatButton } from "./NewChatButton";
import ChatOptionsButton from "./ChatOptionsButton";
import { ScrollArea } from "components/ui/scroll-area";
import { groupBy } from "lodash";
import moment from "moment";
import { ReportContentButton } from "./ReportContentButton";

interface AiChatSidebarProps {
   chatHistories?: (AiChatHistory & { messages: AiChatHistoryMessage[] })[],
   chatId: string
}

type AiChatKey = `${number}-${number}` | `today` | `prev-7-days` | `prev-30-days` | `yesterday`;

const AI_CHAT_KEY_LABELS: Record<AiChatKey, string> = {
   "today": `Today`,
   "yesterday": `Yesterday`,
   "prev-7-days": `Previous week`,
   "prev-30-days": `Previous month`,
};


const AiChatSidebar = ({ chatHistories, chatId }: AiChatSidebarProps) => {
   const groupedHistories = groupBy(chatHistories, (chat): AiChatKey => {
      let lastMessage = chat.messages.at(-1);

      if (moment(new Date()).isSame(lastMessage?.createdAt, `day`)) return `today`;
      if (moment(new Date()).subtract(1, `day`).isSame(lastMessage?.createdAt, `day`)) return `yesterday`;

      if (moment(lastMessage?.createdAt).isAfter(moment(new Date()).subtract(1, `week`))) return `prev-7-days`;
      if (moment(lastMessage?.createdAt).isAfter(moment(new Date()).subtract(1, `month`))) return `prev-30-days`;

      return `${chat.messages.at(-1)?.createdAt?.getFullYear()}-${chat.messages.at(-1)?.createdAt.getMonth()}`;
   });
   console.log({ groupedHistories });

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
            <ReportContentButton />
            <NewChatButton />
         </div>
         <ScrollArea id={`chat-scroll-area`} className={`!h-full`}>
            <ul className={`mx-0 mt-4`}>
               {Object.entries(groupedHistories).map(([group, chats]) => (
                  <Fragment>
                     <li
                        className={`my-2 text-sm`}>{AI_CHAT_KEY_LABELS[group as AiChatKey] ?? getMonthName(Number(group.split(`-`)?.at(-1)))}</li>
                     {chats.map((chat, index) => (
                        <li className={`w-full`} key={chat.id}>
                           <div
                              className={cn(` px-6 py-3 rounded-lg !w-full text-base hover:opacity-90 hover:!bg-neutral-600 transition-all duration-200 relative group cursor-pointer`,
                                 chatId === chat?.id && `bg-neutral-600`)}>
                              <ChatOptionsButton chat={chat} />
                              <Link className={`!w-full`} href={`/notes/ask?chatId=${chat.id}`}>
                                 {chat.messages?.at(-1)?.raw_text ?? `No messages yet.`}
                              </Link>
                           </div>
                        </li>
                     ))}
                  </Fragment>
               ))}
            </ul>
         </ScrollArea>
      </div>
   );
};

export default AiChatSidebar;