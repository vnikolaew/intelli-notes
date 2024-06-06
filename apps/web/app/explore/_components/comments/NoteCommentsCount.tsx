import React from "react";
import { MessageCircle, ThumbsUp } from "lucide-react";

export interface NoteCommentsCountProps {
   count: number;
}

const NoteCommentsCount = ({ count }: NoteCommentsCountProps) => {
   return (
      <div title={`${count} comment${count === 1 ? `` : `s`}`} className={`flex items-center gap-1`}>
         <MessageCircle className={`text-blue-600 stroke-[3px]`} size={22} />
         <span
            className={`text-base text-blue-600 transition-colors duration-200`}>
            {count}
         </span>
      </div>
   );
};

export default NoteCommentsCount;