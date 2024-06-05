"use client";
import React, { Fragment } from "react";
import { isErrorMessage, TSystemMessage } from "../AIChat";
import moment from "moment/moment";
import Image from "next/image";
import aiLogo from "public/logo.jpg";
import { cn } from "lib/utils";
import { SystemMessageActions } from "./SystemMessageActions";
import NoteCard from "../../../_components/NoteCard";

export interface SystemMessageProps {
   message: TSystemMessage;
   onRegenerate: () => void;
}

const SystemMessage = ({ message, onRegenerate }: SystemMessageProps) => {
   return (
      <div className={`w-full flex items-start justify-start gap-3 group`}>
         <Image className={`rounded-full w-10 h-10 shadow-md p-1 border-[1px] border-neutral-300`} src={aiLogo}
                alt={`AI logo`} />
         <div className={`flex flex-col items-start gap-0 `}>
            <div className={cn(`rounded-full px-6 py-2 bg-neutral-900 text-white !pr-8 min-h-10`,
               !!message.note && `rounded-xl !py-4 !px-8`,
               isErrorMessage(message) && `!bg-red-500`,
            )}>
               <div>
                  {message.message}
               </div>
               {message.note && (
                  <Fragment>
                     <span className={`text-muted-foreground`}>Source note: </span>
                     <NoteCard
                        className={`mt-2`}
                        note={message.note}
                        markdownProps={{ className: `h-[120px]` }} />
                  </Fragment>
               )}
            </div>
            <SystemMessageActions onRegenerate={onRegenerate} message={message} />
            <div className={`mr-2 invisible group-hover:visible`}>
               <time
                  className={`text-xs text-muted-foreground font-semibold`}>{moment(message.timestamp).fromNow()}</time>
            </div>
         </div>
      </div>
   );
};

export default SystemMessage;