"use client";
import { Input } from "components/ui/input";
import React from "react";
import { Search, X } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useTranslations } from "@/providers/TranslationsClientProvider";

export interface NotesSearchInputProps {
}

const NotesSearchInput = ({}: NotesSearchInputProps) => {
   const [q, setQ] = useQueryState(`q`, parseAsString.withDefault(``));
   const t = useTranslations()

   return (
      <div className={`relative`}>
         <Search className={`absolute top-1/2 left-2 -translate-y-1/2`} size={18} />
         {!!q?.length && (
            <span title={`Clear`}>
            <X onClick={_ => setQ(``)}
               className={`absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:text-red-700 transition-colors duration-200`}
               size={14} />
            </span>
         )}
         <Input
            placeholder={t.notes_search_placeholder}
            className={`px-8 placeholder:text-muted-foreground focus:!ring-0`}
            onChange={e => setQ(e.target.value)}
            value={q} type={`text`} />
      </div>
   );
};

export default NotesSearchInput;