"use client";
import { Note, NoteComment, User } from "@repo/db";
import { Input } from "components/ui/input";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import UserAvatar from "components/common/UserAvatar";
import { Button } from "components/ui/button";
import NoCommentsLogo from "components/common/icons/NoCommentsLogo";

export interface NoteCommentsSectionProps {
   note: Note & { comments: (NoteComment & { user: User })[] };
}

const NoteCommentsSection = ({ note  }: NoteCommentsSectionProps) => {
   const [comment, setComment] = useState(``);
   const session = useSession();

   return (
      <div
         onClick={console.log}
         className={`flex flex-col items-start gap-4 px-8 py-6 !z-[101]`}>
         <h2>Total comments: {note.comments?.length}</h2>
         {note.comments?.length ? (
            <div className={`flex flex-col gap-2 items-start`}>
               {note.comments.map(({ user, id, raw_text }, index) => (
                  <div key={id}>{raw_text}</div>
               ))}
            </div>
         ) : (
            <div className={`h-[200px] flex items-center justify-center self-center flex-col`}>
               <div className={`flex flex-col items-center justify-center gap-2 !h-fit`}>
                  <NoCommentsLogo className={`rounded-lg !w-32`} />
                  <span className={`text-muted-foreground`}>
                  No comments yet.
               </span>
               </div>
            </div>
         )}
         <div
            className={`flex flex-col items-start w-full gap-2 flex-1 border-dashed border-[2px] justify-self-end self-end mt-auto`}>
            <div className={`flex items-center gap-3 mt-4 min-w-[300px]`}>
               <UserAvatar className={`w-8 h-8`} imageSrc={session?.data?.user?.image} />
               <Input
                  className={`w-full rounded-lg`}
                  onChange={e => setComment(e.target.value)}
                  value={comment} type={`text`}
                  placeholder={`Leave a comment ...`} />
            </div>
            <div className={`self-end`}>
               <Button className={`!px-6`} size={`sm`} variant={`default`}>Send</Button>
            </div>
         </div>
      </div>
   );
};

export default NoteCommentsSection;