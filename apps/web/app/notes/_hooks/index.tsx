import { Note } from "@repo/db";
import { useSearchParam } from "hooks/useSearchParam";
import { useMemo } from "react";
import { useQueryState } from "nuqs";
import { Item } from "../_components/MultiSelect";
import { parseAsItems } from "../_components/NotesTagsFilter";

export function useFilteredNotes(notes: Note[]) {
   const q = useSearchParam(`q`);
   const [selectedTags] = useQueryState<Item[]>(`tags`, parseAsItems);

   const filteredNotes = useMemo(() => {
      let filtered = notes;

      if (!!selectedTags?.length) {
         filtered = filtered
            .filter(n =>
               n.tags.some(t =>
                  selectedTags.map(t => t.value).includes(t)));
      }

      if (!q?.length) return filtered;

      return filtered.filter(n =>
         n.raw_text.toLowerCase().includes(q.toLowerCase())
         || n.title.toLowerCase().indexOf(q.toLowerCase()) > -1
         || n.tags.includes(q.toLowerCase()));
   }, [q, notes, selectedTags]);

   return filteredNotes;
}