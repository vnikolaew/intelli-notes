"use client";
import { Note } from "@repo/db";
import React from "react";
import NoteCard from "./NoteCard";
import { useFilteredNotes } from "../_hooks";

export interface NotesGridProps {
   notes: Note[];
   showComments?: boolean;
}

const NotesGrid = ({ notes ,showComments = false }: NotesGridProps) => {
   const {pagedNotes, filteredNotes, page} = useFilteredNotes(notes);

   return (
      <div className={`grid grid-cols-3 w-full gap-8 mt-8`}>
         {pagedNotes.map((note, index) => (
            <NoteCard
               showButtons
               showPublicity
               showComments={showComments}
               markdownProps={{ className: `h-[160px] !px-0` }}
               key={note.id + index} note={note} />
         ))}
      </div>
   );
};

export default NotesGrid;