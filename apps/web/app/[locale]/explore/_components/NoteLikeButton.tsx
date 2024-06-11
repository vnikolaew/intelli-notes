"use client";
import React from "react";
import { ThumbsUp } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { likeNote, unlikeNote } from "../actions";
import { Note } from "@repo/db";
import { cn } from "lib/utils";

export interface NotesLikeButtonProps {
   total: number;
   note: Note;
   hasUserLiked: boolean;
}

const NoteLikeButton = ({ hasUserLiked, total, note }: NotesLikeButtonProps) => {
   const { execute: likeNoteAction, status: likeStatus } = useAction(likeNote, {
      onSuccess: res => {
         if (res.success) console.log({ res });
      },
   });

   const { execute: unlikeNoteAction, status: unlikeStatus } = useAction(unlikeNote, {
      onSuccess: res => {
         if (res.success) console.log({ res });
      },
   });

   return (
      <div title={hasUserLiked ? `Unlike` : `Like`} onClick={_ => {
         return hasUserLiked ? unlikeNoteAction({ noteId: note.id }) : likeNoteAction({ noteId: note.id });
      }}
           className={cn(`w-fit group flex justify-end items-center gap-1 cursor-pointer mr-2 `,
              hasUserLiked && `text-amber-600`)}>
         <ThumbsUp className={cn(`group-hover:fill-amber-400 transition-all duration-200 group-hover:text-amber-600`, hasUserLiked && `fill-amber-400 group-hover:fill-transparent`)} size={22} />
         <span
            className={`text-base group-hover:text-amber-600 transition-colors duration-200`}>
            {total}
            {/*like{total === 1 ? `` : `s`}*/}
         </span>
      </div>
   );
};

export default NoteLikeButton;