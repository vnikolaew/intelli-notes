import { Note, NoteComment, NoteLike } from "@repo/db";
import { useSession } from "next-auth/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Row } from "@repo/ui/components";
import UserAvatar from "@/components/common/UserAvatar";
import { UserInfoCard } from "@/app/explore/_components/comments/UserInfoCard";
import NoteCard from "@/app/(auth)/notes/_components/NoteCard";
import NoteCommentsCount from "@/app/explore/_components/comments/NoteCommentsCount";
import NoteLikeButton from "@/app/explore/_components/NoteLikeButton";
import React from "react";

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
            <NoteCommentsCount count={note.comments.length} />
            <NoteLikeButton
               note={note}
               total={note.likes.length}
               hasUserLiked={note.likes.some(l => l.userId === session?.data?.user?.id)} />
         </div>
      </div>

   );
};