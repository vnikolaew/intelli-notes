"use client";

import { MultiSelect, Item } from "./MultiSelect";
import { createParser, parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useCallback } from "react";
import BulkExportNotesButton from "./BulkExportNotesButton";

export interface NotesTagsFilterProps {
   tags: string[];
}

export const parseAsItems = createParser<Item[]>({
   parse: value => {
      const items = parseAsArrayOf(parseAsString).parse(value ?? ``);
      return items?.map(i => ({ value: i, label: i })) ?? [];
   },
   serialize: value => {
      return parseAsArrayOf(parseAsString).serialize(value?.map(v => v?.value) ?? []);
   },
});

export function NotesTagsFilter({ tags }: NotesTagsFilterProps) {
   const [selectedTags, setSelectedTags] = useQueryState<Item[]>(`tags`, parseAsItems);

   const setSelectedItems = useCallback(async (update: (prev: Item[]) => Item[]) => {
      await setSelectedTags(update);
   }, [selectedTags, setSelectedTags]);

   return (
      <div className={`flex-1`}>
         <MultiSelect
            selected={selectedTags ?? []}
            setSelected={setSelectedItems}
            placeholder={`Filter by tags ...`}
            items={tags.map(t => ({ label: t, value: t }))} />
      </div>);
}