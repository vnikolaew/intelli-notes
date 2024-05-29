"use client";
import { Note } from "@repo/db";
import React from "react";
import NoteCard from "./NoteCard";
import { useFilteredNotes } from "../_hooks";

export interface NotesGridProps {
   notes: Note[];
}

const NotesGrid = ({ notes }: NotesGridProps) => {
   const filteredNotes = useFilteredNotes(notes);

   return (
      <div className={`grid grid-cols-3 w-full gap-8 mt-8`}>
         {filteredNotes.map((note, index) => (
            <NoteCard markdownProps={{ className: `h-[160px]` }} key={note.id + index} note={note} />
         ))}
      </div>
   );
};

export default NotesGrid;