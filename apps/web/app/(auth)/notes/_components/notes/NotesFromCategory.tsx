import { Note, NoteCategory } from "@repo/db";
import { useFilteredNotes } from "@/app/(auth)/notes/_hooks";
import { Notebook, Pencil } from "lucide-react";
import moment from "moment/moment";
import Link from "next/link";
import React from "react";

export function NotesFromCategory({ category, notes }: { notes: Note[], category: NoteCategory }) {
   const { pagedNotes, filteredNotes } = useFilteredNotes(notes);

   return notes.length === 0 ? (
      <div className={`text-muted-foreground text-sm text-center`}>You have no notes from this category yet.</div>
   ) : (
      <div className={`flex flex-col items-start gap-8`}>
         {filteredNotes.map((note, index) =>
            <div className={`flex items-center gap-4 w-full`} key={note.id}>
               <Notebook className={`text-muted-foreground`} size={24} />
               <div className={`flex flex-col items-start gap-0`} key={note.id}>
                  <span
                     className={`text-lg text-neutral-500 font-semibold`}
                     key={note.id}>
                  {note.title?.length ? note.title : `Untitled`}
               </span>
                  <span>
                  <time className={`text-sm text-muted-foreground`}>
                     Last updated: {moment(note.updatedAt).fromNow()}
                  </time>
               </span>
               </div>
               <div className={`flex-1 flex justify-end`}>
                  <Link title={`Edit`} href={`/write?id=${note.id}`}>
                     <Pencil className={`text-neutral-700`} size={20} />
                  </Link>
               </div>
            </div>,
         )}
      </div>
   );
}