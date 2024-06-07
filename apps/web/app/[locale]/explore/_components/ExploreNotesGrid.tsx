"use client";
import { Note, NoteComment, NoteLike } from "@repo/db";
import React, { useState } from "react";
import { useBoolean } from "hooks/useBoolean";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { GetExplorePageNotesResponse } from "@/app/api/notes/explore/route";
import { ExplorePageEmptyState } from "@/app/[locale]/explore/_components/ExplorePageEmptyState";
import { ExplorePageNote } from "@/app/[locale]/explore/_components/ExplorePageNote";
import { LoadMoreNotesButton } from "@/app/[locale]/explore/_components/LoadMoreNotesButton";

export interface ExploreNotesGridProps {
   notes: (Note & { author: { name: string; image: string }, comments: NoteComment[], likes: NoteLike[] })[];
}

const ExploreNotesGrid = ({ notes }: ExploreNotesGridProps) => {
   const [loading, setLoading] = useBoolean();
   const [currentNotes, setCurrentNotes] = useState(notes);
   const [hasMore, setHasMore] = useBoolean(true);

   function handleLoadMore() {
      const lastNoteTimestamp = notes.at(-1).createdAt.getTime();
      setLoading(true);
      fetch(`/api/notes/explore?timestamp=${lastNoteTimestamp}&limit=20`, {
         headers: {
            Accept: `application/json`,
         },
      }).then(res => res.json() as Promise<GetExplorePageNotesResponse>)
         .then(res => {
            if (res.success && res.notes?.length) {
               setCurrentNotes(n => [...n, ...res.notes]);
               setHasMore(res.notes?.length === 20);
            }
         })
         .catch(console.error).finally(() => setLoading(false));
   }

   return (
      <div className={`mt-8 grid grid-cols-3 gap-8 w-full relative`}>
         <DotPattern
            className={cn(
               "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] inset-y-12",
            )}
            />
         {!currentNotes?.length && (<ExplorePageEmptyState />)}
         {currentNotes.map((note, index) => <ExplorePageNote key={note.id} {...note} />)}
         {hasMore && !!currentNotes.length && <LoadMoreNotesButton onLoadMore={handleLoadMore} loading={loading} />}
      </div>
   );
};


export default ExploreNotesGrid;