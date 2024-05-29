"use client"
import React from "react";
import { Note } from "@repo/db";
import { useFilteredNotes } from "../_hooks";
import { useSearchParam } from "hooks/useSearchParam";

export interface NotesHeaderProps {
   notes: Note[]
}

export function NotesHeader({ notes }: NotesHeaderProps) {
   const q = useSearchParam(`q`);
   const filteredNotes = useFilteredNotes(notes);

   return (
      <h2 className={`text-3xl font-semibold`}>
         {!q?.length ? `All notes` : `Filtered`} ({filteredNotes.length})
      </h2>
   );
}