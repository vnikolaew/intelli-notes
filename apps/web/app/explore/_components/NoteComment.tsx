"use client";
import { NoteComment, User } from "@repo/db";
import React, { useEffect, useState } from "react";
import UserAvatar from "components/common/UserAvatar";
import moment from "moment";
import { Separator } from "components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "components/ui/hover-card";
import { CalendarDays, Notebook } from "lucide-react";
import { getUserDetails } from "../actions";
import { useAction } from "next-safe-action/hooks";
import { InteractiveLink } from "@repo/ui/components";
import Link from "next/link";
import { useSession } from "next-auth/react";

export interface NoteCommentProps {
   comment: NoteComment & { user: User };
}

export interface UserInfoCardProps {
   user: User;
}

function UserInfoCard({ user }: UserInfoCardProps) {
   const [userDetails, setUserDetails] = useState<Partial<User>>(null!);

   useEffect(() => {
         if (userDetails) return;

         fetch(`/api/users/${user.id}`, {
            next: { revalidate: 60 },
            headers: {
               Accept: `application/json`,
            },
         }).then(res => res.json()).then(res => {
            console.log(res);
            if (res.success) setUserDetails(res.user);
         }).catch(console.error);
      },
      [],
   );

   return <div className={`flex items-start gap-3`}>
      <UserAvatar className={`shadow-md cursor-pointer w-6 h-6`} imageSrc={user.image} />
      <div className={`flex flex-col items-start gap-2`}>
         <Link href={`/users/${user.id}/notes`} className={`text-xs !z-30`}>
            {user.name}
         </Link>
         <span className={`text-xs inline-flex gap-1 items-center text-neutral-700`}>
            <Notebook size={10} />
            {userDetails?._count?.notes} total notes
         </span>
         <time className={`text-muted-foreground inline-flex gap-2 items-center text-xs mt-4`}>
            <CalendarDays size={10} />
            <span>Joined {moment(user.createdAt).format(`MMMM YYYY`)}</span>
         </time>
      </div>
   </div>;
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