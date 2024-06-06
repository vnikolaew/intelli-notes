"use client";
import { Note } from "@repo/db";
import React from "react";
import NoteCard from "./NoteCard";
import { useFilteredNotes } from "../_hooks";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export interface NotesGridProps {
   notes: Note[];
   showComments?: boolean;
}

const NotesGrid = ({ notes ,showComments = false }: NotesGridProps) => {
   const {pagedNotes, filteredNotes, page} = useFilteredNotes(notes);

   return (
      <div className={`grid grid-cols-3 w-full gap-8 mt-8 relative`}>
         <DotPattern
            className={cn(
               "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] inset-y-1/2 -translate-y-1/2",
            )}
         />
         {!pagedNotes.length && (
           <div className={`w-full flex flex-col items-center justify-center min-h-[50vh] col-span-3`}>
              <h2 className={`text-xl text-muted-foreground text-center`}>
                 No notes matched your filters. 😥
              </h2>
           </div>
         )}
         {pagedNotes.map((note, index) => (
            <NoteCard
               showButtons
               showPublicity
               className={`bg-white/80 !z-10`}
               showComments={showComments}
               markdownProps={{ className: `h-[160px] !px-0` }}
               key={note.id + index} note={note} />
         ))}
      </div>
   );
};

export default NotesGrid;