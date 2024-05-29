"use client";
import { Input } from "components/ui/input";
import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useSearchParam } from "hooks/useSearchParam";
import { useRouter } from "next/navigation";

export interface NotesSearchInputProps {
}

const NotesSearchInput = ({}: NotesSearchInputProps) => {
   const q = useSearchParam(`q`);
   const [searchValue, setSearchValue] = useState(q ?? ``);
   const router = useRouter();

   useEffect(() => {
      router.push(`?q=${encodeURIComponent(searchValue)}`);
   }, [searchValue]);

   return (
      <div className={`relative`}>
         <Search className={`absolute top-1/2 left-2 -translate-y-1/2`} size={18} />
         {!!searchValue?.length && (
            <span title={`Clear`}>
            <X onClick={_ => setSearchValue(``)}
               className={`absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:text-red-700 transition-colors duration-200`}
               size={14} />
            </span>
         )}
         <Input
            placeholder={`Search notes`} className={`px-8 placeholder:text-muted-foreground`}
            onChange={e => setSearchValue(e.target.value)}
            value={searchValue} type={`text`} />
      </div>
   );
};

export default NotesSearchInput;