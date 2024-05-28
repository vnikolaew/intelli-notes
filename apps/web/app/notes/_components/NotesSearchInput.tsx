"use client";
import { Input } from "components/ui/input";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useSearchParam } from "hooks/useSearchParam";
import { useRouter } from "next/navigation";

export interface NotesSearchInputProps {
}

const NotesSearchInput = ({}: NotesSearchInputProps) => {
   const q = useSearchParam(`q`);
   const [searchValue, setSearchValue] = useState(q);
   const router = useRouter();

   return (
      <div className={`relative`}>
         <Search className={`absolute top-1/2 left-2 -translate-y-1/2`} size={18} />
         <Input
            placeholder={`Search notes ...`} className={`px-8 placeholder:text-muted-foreground`}
            onChange={e => {
               router.push(`?q=${encodeURIComponent(e.target.value)}`);
               setSearchValue(e.target.value);
            }} value={searchValue} type={`text`} />
      </div>
   );
};

export default NotesSearchInput;