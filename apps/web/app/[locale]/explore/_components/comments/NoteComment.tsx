"use client";
import { NoteComment, User } from "@repo/db";
import React from "react";
import UserAvatar from "@/components/common/UserAvatar";
import moment from "moment";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useSession } from "next-auth/react";
import { UserInfoCard } from "./UserInfoCard";

export interface NoteCommentProps {
   comment: NoteComment & { user: User };
}

export interface UserInfoCardProps {
   user: User;
}

const NoteComment = ({ comment }: NoteCommentProps) => {
   const session = useSession();
   const isMe = session?.data?.user?.id === comment.user.id;

   return (
      <div className={`flex flex-col items-start gap-3`}>
         <div className={`flex items-center gap-4 w-full`}>
            <HoverCard>
               <HoverCardTrigger>
                  <UserAvatar className={`cursor-pointer`} imageSrc={comment.user.image} />
               </HoverCardTrigger>
               {!isMe && (
                  <HoverCardContent side={`bottom`} className={`!p-4`}>
                     <UserInfoCard user={comment.user} />
                  </HoverCardContent>
               )}
            </HoverCard>
            <div className={`flex flex-col items-start justify-center gap-1`}>
               <div className={`flex items-center gap-2 text-xs`}>
                  <h2 className={`!w-fit text-nowrap`}>{comment.user.name}</h2>
                  <time
                     className={`text-muted-foreground text-[.6rem] text-nowrap `}>{moment(comment.createdAt).fromNow()}</time>
               </div>
               <p className={`text-xs text-neutral-700`}>{comment.raw_text}</p>
            </div>
         </div>
         <Separator orientation={`horizontal`} className={`w-full`} />
      </div>
   );
};

export default NoteComment;