import { StickyNote } from "lucide-react";
import React from "react";

export function NotesEmptyState() {
   return <div className={`w-full flex items-center justify-center flex-col mt-12 gap-2`}>
      <StickyNote className={``} size={40} />
      <span className={`text-muted-foreground text-lg`}>
         You haven't written anything yet.
      </span>
   </div>;
}