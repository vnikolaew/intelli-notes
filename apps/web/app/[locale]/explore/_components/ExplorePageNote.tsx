import { Note, NoteComment, NoteLike } from "@repo/db";
import { useSession } from "next-auth/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Row } from "@repo/ui/components";
import UserAvatar from "@/components/common/UserAvatar";
import React from "react";
import { UserInfoCard } from "@/app/[locale]/explore/_components/comments/UserInfoCard";
import NoteCard from "@/app/[locale]/(auth)/notes/_components/note/NoteCard";
import NoteCommentsCount from "@/app/[locale]/explore/_components/comments/NoteCommentButton";
import NoteLikeButton from "@/app/[locale]/explore/_components/NoteLikeButton";

export const ExplorePageNote = ({ author, ...note }: Note & {
   author: { name: string; image: string },
   comments: NoteComment[],
   likes: NoteLike[]
}) => {
   const session = useSession();

   return (
      <div className={`flex flex-col items-start gap-4 min-w-[300px]`} key={note.id}>
         <HoverCard>
            <HoverCardTrigger>
               <Row className={`justify-start`}>
                  <UserAvatar className={`cursor-pointer`} imageSrc={author.image} />
                  <span className={`text-muted-foreground`}>{author.name}</span>
               </Row>
            </HoverCardTrigger>
            <HoverCardContent side={`bottom`} className={`!p-4`}>
               <UserInfoCard user={author} />
            </HoverCardContent>
         </HoverCard>
         <NoteCard showComments className={`!w-full`} showButtons={false} note={note} />
         <div className={`flex items-center justify-end gap-4 w-full`}>
            <NoteCommentsCount note={note} />
            <NoteLikeButton
               note={note}
               total={note.likes.length}
               hasUserLiked={note.likes.some(l => l.userId === session?.data?.user?.id)} />
         </div>
      </div>

   );
};