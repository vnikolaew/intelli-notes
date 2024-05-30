"use client";
import React from "react";
import { Note } from "@repo/db";
import { useFilteredNotes } from "../_hooks";
import { useSearchParam } from "hooks/useSearchParam";
import { parseAsBoolean, useQueryState } from "nuqs";

export interface NotesHeaderProps {
   notes: Note[];
}

export function NotesHeader({ notes }: NotesHeaderProps) {
   const q = useSearchParam(`q`);
   const {filteredNotes} = useFilteredNotes(notes);
   const [showPublic] = useQueryState(`public`, parseAsBoolean);

   return (
      <h2 className={`text-3xl font-semibold`}>
         {(q?.length || showPublic !== null) ? `Filtered` : `All notes`} ({filteredNotes.length})
      </h2>
   );
}