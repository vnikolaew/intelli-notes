"use client";

import { MultiSelect, Item } from "@/components/common/MultiSelect";
import { createParser, parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useCallback } from "react";
import { Filter } from "lucide-react";
import { useTranslations } from "@/providers/TranslationsClientProvider";

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
   const t = useTranslations()

   const setSelectedItems = useCallback(async (update: (prev: Item[]) => Item[]) => {
      await setSelectedTags(update);
   }, [selectedTags, setSelectedTags]);

   return (
      <div className={`flex-1`}>
         <MultiSelect
            selected={selectedTags ?? []}
            setSelected={setSelectedItems}
            placeholder={t.notes_write_placeholders_tags}
            items={tags.map(t => ({ label: t, value: t }))}>
            <div className={`absolute top-1/2 left-3 -translate-y-1/2`}>
               <Filter className={`text-muted-foreground fill-muted-foreground`} size={14} />
            </div>
         </MultiSelect>
      </div>);
}