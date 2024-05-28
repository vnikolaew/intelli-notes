import Image from "next/image";
import noCommentLogo from "public/no-comment.png";
import React from "react";

export function ChatEmptyState() {
   return (
      <div className={`flex flex-col items-center gap-2 h-full my-auto justify-center`}>
         <Image className={`rounded-md`} height={100} width={80} src={noCommentLogo} alt={`No messages`} />
         <span className={`text-lg text-muted-foreground`}>
            You have no messages yet.
         </span>
      </div>
   );
}