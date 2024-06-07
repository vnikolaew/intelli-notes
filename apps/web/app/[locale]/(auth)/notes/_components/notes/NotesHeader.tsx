"use client";
import React from "react";
import { Note } from "@repo/db";
import { useFilteredNotes } from "../../_hooks";
import { useSearchParam } from "@/hooks/useSearchParam";
import { parseAsBoolean, parseAsStringLiteral, useQueryState } from "nuqs";
import { BookCopy, Notebook } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export interface NotesHeaderProps {
   notes: Note[];
}

export const NOTES_VIEW_OPTIONS = {
   ALL: `all`,
   BY_CATEGORY: `category`,
} as const;

export function NotesHeader({ notes }: NotesHeaderProps) {
   const q = useSearchParam(`q`);
   const { filteredNotes } = useFilteredNotes(notes);
   const [showPublic] = useQueryState(`public`, parseAsBoolean);
   const [view, setView] = useQueryState(`view`, parseAsStringLiteral(Object.values(NOTES_VIEW_OPTIONS)).withDefault(NOTES_VIEW_OPTIONS.ALL));
   const { t } = useTranslation(`home`, { keyPrefix: `Notes` });

   return (
      <div className={`!w-fit flex items-center gap-2`}>
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button
                     onClick={_ => setView(view === NOTES_VIEW_OPTIONS.ALL ? NOTES_VIEW_OPTIONS.BY_CATEGORY : NOTES_VIEW_OPTIONS.ALL)}
                     className={`rounded-md p-2`}
                     variant={`ghost`} size={"icon"}>
                     {view === NOTES_VIEW_OPTIONS.ALL
                        ? (<Notebook size={18} />
                        ) : (
                           <BookCopy size={18} />
                        )}
                  </Button>
               </TooltipTrigger>
               <TooltipContent side={`top`} className={`bg-black text-white rounded-md text-xs`}>
                  {view === NOTES_VIEW_OPTIONS.ALL ? `Showing all notes.` : `Showing notes by category.`}
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <h2 className={`text-3xl font-semibold drop-shadow-md`}>
            {(q?.length || showPublic !== null) ? t(`Filtered`) : t(`AllNotes`)} ({filteredNotes.length})
         </h2>
      </div>
   );
}