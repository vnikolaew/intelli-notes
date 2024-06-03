"use client";
import { Note, NoteComment, User } from "@repo/db";
import React, { useState } from "react";
import NoCommentsLogo from "components/common/icons/NoCommentsLogo";
import { useSession } from "next-auth/react";
import UserAvatar from "components/common/UserAvatar";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { commentOnNote } from "../actions";
import { isExecuting } from "next-safe-action/status";
import { Loader2 } from "lucide-react";
import CNoteComment from "./NoteComment";

export interface NoteCommentsDialogProps {
   note: Note & { comments: (NoteComment & { user: User })[] };
}

const NoteCommentsDialog = ({ note }: NoteCommentsDialogProps) => {
   const session = useSession();
   const [comment, setComment] = useState(``);
   const { execute, status } = useAction(commentOnNote, {
      onSuccess: res => {
         if (res.success) {
            console.log(res.comment);
         }
      },
   });

   async function handleSendComment() {
      if (!comment.length) return;

      execute({ noteId: note.id, raw_text: comment });
   }

   return (
      <div className={`w-full !min-h-[70vh] flex flex-col items-start min-w-[300px]`}>
         <h2>{note.comments?.length} total comment{note.comments?.length === 1 ? `` : `s`}</h2>
         {note.comments?.length === 0 && (
            <div className={`h-[300px] flex flex-col items-center justify-center self-center`}>
               <NoCommentsLogo className={`w-16`} />
               <span className={`text-muted-foreground text-base`}>No comments yet.</span>
            </div>
         )}
         <div className={`flex flex-col items-start mt-12 gap-4 `}>
            {note?.comments?.sort((a, b) => b.createdAt - a.createdAt).map((comment, index) => (
               <CNoteComment key={index} comment={comment} />
            ))}
         </div>
         <div className={`justify-self-end flex flex-col items-end gap-4 w-full flex-1 justify-end`}>
            <div className={`flex items-center gap-4 w-full`}>
               <UserAvatar className={`w-8 h-8 shadow-md`} imageSrc={session?.data?.user?.image} />
               <Input
                  onChange={e => setComment(e.target.value)} value={comment} className={`flex-1 rounded-lg`}
                  placeholder={`Leave a comment ...`} type={`text`} />
            </div>
            <Button disabled={isExecuting(status)} onClick={handleSendComment} className={`!px-6`} size={`sm`}
                    variant={`default`}>
               {isExecuting(status) ? (
                  <>
                     <Loader2 className={`animate-spin`} size={18} />
                     Sending ...
                  </>
               ) : `Send`}
            </Button>
         </div>
      </div>
   );
};

export default NoteCommentsDialog;