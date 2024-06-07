"use client";

import { Note } from "@repo/db";
import { useSearchParam } from "hooks/useSearchParam";
import { useMemo } from "react";
import { parseAsBoolean, parseAsInteger, useQueryState } from "nuqs";
import { Item } from "../../../../components/common/MultiSelect";
import { parseAsItems } from "../_components/NotesTagsFilter";

const PAGE_SIZE = 12;

export function useFilteredNotes(notes: Note[]) {
   const q = useSearchParam(`q`);
   const [showPublic] = useQueryState(`public`, parseAsBoolean);
   const [selectedTags] = useQueryState<Item[]>(`tags`, parseAsItems);
   const [page, setPage] = useQueryState(`page`, parseAsInteger.withDefault(1));

   const filteredNotes = useMemo(() => {
      let filtered = notes;

      if (!!selectedTags?.length) {
         filtered = filtered
            .filter(n =>
               n.tags.some(t =>
                  selectedTags.map(t => t.value).includes(t)));
      }

      if (showPublic !== null) {
         filtered = filtered.filter(n => n.public === showPublic);
      }

      if (!q?.length) return filtered;

      return filtered.filter(n =>
         n.raw_text.toLowerCase().includes(q.toLowerCase())
         || n.title.toLowerCase().indexOf(q.toLowerCase()) > -1
         || n.tags.includes(q.toLowerCase()));
   }, [q, notes, selectedTags, showPublic]);

   const pagedNotes = useMemo(() => filteredNotes.slice(((page ?? 1) - 1) * PAGE_SIZE, (page ?? 1) * PAGE_SIZE), [filteredNotes, page]);

   return { filteredNotes, pagedNotes, page };
}