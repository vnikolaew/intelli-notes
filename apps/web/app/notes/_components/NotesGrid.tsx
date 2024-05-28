import { Note } from "@repo/db";
import React from "react";
import NoteCard from "./NoteCard";

export interface NotesGridProps {
   notes: Note[];
}

const NotesGrid = ({ notes }: NotesGridProps) => {
   return (
      <div className={`grid grid-cols-3 w-full gap-8 mt-8`}>
         {notes.map((note, index) => (
            <NoteCard key={note.id + index} note={note} />
         ))}
      </div>
   );
};

export default NotesGrid;