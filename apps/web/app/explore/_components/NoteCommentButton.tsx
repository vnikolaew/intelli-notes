import React from "react";
import { MessageCircle } from "lucide-react";
import { Note } from "@repo/db";

export interface NoteCommentButtonProps {
   note: Note;
}


const NoteCommentsCount = ({ note }: NoteCommentButtonProps) => {
   return (
      <div className={`flex items-center gap-1`}>
         <MessageCircle className={`text-blue-500 stroke-[3px]`} size={22} />
         <span className={`text-blue-500`}>
            {note.comments?.length ?? 0}
         </span>
      </div>
   );
};

export default NoteCommentsCount;