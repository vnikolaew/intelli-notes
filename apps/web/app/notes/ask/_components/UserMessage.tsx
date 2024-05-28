"use client";
import React, { Fragment, useState } from "react";
import { TUserMessage } from "./AIChat";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { Button } from "components/ui/button";
import { PenLine } from "lucide-react";
import { useBoolean } from "hooks/useBoolean";
import { Textarea } from "components/ui/textarea";
import moment from "moment";

export interface UserMessageProps {
   message: TUserMessage;
   onEditMessage: (message: TUserMessage) => void;
}

const UserMessage = ({ message, onEditMessage }: UserMessageProps) => {
   const [editing, setEditing] = useBoolean();
   const [messageText, setMessageText] = useState(message.message);

   return (
      <div className={`w-full flex items-start justify-end gap-2 group`}>
         {editing ? (
            <div className={`relative min-w-[400px]`}>
               <Textarea
                  autoFocus
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  className={`rounded-2xl text-base p-6 !py-4 bg-neutral-400 border-none outline-none ring-0 shadow-sm focus:!border-none focus:!outline-none focus:!ring-0 text-white w-full`}
                  rows={3} />
               <div className={`absolute bottom-2 right-4 flex items-center gap-2`}>
                  <Button
                     onClick={_ => setEditing(false)}
                     className={`rounded-full shadow-sm`}
                     size={`sm`}
                     variant={`default`}>
                     Cancel
                  </Button>
                  <Button onClick={e => {
                     e.preventDefault();
                     e.stopPropagation();
                     onEditMessage({
                        ...message,
                        message: messageText,
                        timestamp: new Date(),
                        id: crypto.randomUUID(),
                     });
                     setEditing(false);
                     setMessageText(message.message);
                  }} className={`rounded-full shadow-sm`} size={`sm`} variant={`outline`}>
                     Send
                  </Button>
               </div>
            </div>
         ) : (
            <Fragment>
               <div className={`hidden group-hover:flex`}>
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Button
                              onClick={_ => setEditing(!editing)} className={`p-1 rounded-full`} variant={`ghost`}
                              size={"icon"}>
                              <PenLine className={`text-neutral-500 stroke-[3px]`} size={14} />
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs`}>
                           Edit message
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               </div>
               <div className={`flex flex-col items-end gap-0`}>
                  <div className={`rounded-full px-6 py-2 bg-neutral-400 text-white shadow-md !pl-8`}>
                     {message.message}
                  </div>
                  <div className={`mr-2 invisible group-hover:visible`}>
                     <time
                        className={`text-xs text-muted-foreground font-semibold`}>{moment(message.timestamp).fromNow()}</time>
                  </div>
               </div>
            </Fragment>
         )}
      </div>
   );
};

export default UserMessage;