"use client";
import { Note } from "@repo/db";
import React, { useMemo } from "react";
import NoteCard from "./NoteCard";
import { useSearchParam } from "hooks/useSearchParam";

export interface NotesGridProps {
   notes: Note[];
}

const NotesGrid = ({ notes }: NotesGridProps) => {
   const q = useSearchParam(`q`);
   const filteredNotes = useMemo(() => {
      if (!q.length) return notes;
      return notes.filter(n =>
         n.raw_text.toLowerCase().includes(q.toLowerCase())
         || n.title.toLowerCase().indexOf(q.toLowerCase()) > -1);
   }, [q, notes]);

   return (
      <div className={`grid grid-cols-3 w-full gap-8 mt-8`}>
         {filteredNotes.map((note, index) => (
            <NoteCard markdownProps={{ className: `h-[160px]` }} key={note.id + index} note={note} />
         ))}
      </div>
   );
};

export default NotesGrid;