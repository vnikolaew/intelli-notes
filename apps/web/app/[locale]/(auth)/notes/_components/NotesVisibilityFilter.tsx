"use client";

import { parseAsBoolean, useQueryState } from "nuqs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { Eye, LockKeyhole, Notebook} from "lucide-react";
import React, { useMemo } from "react";

/**
 * Renders a component that allows the user to filter notes based on their visibility.
 *
 * @return {JSX.Element} The rendered NotesVisibilityFilter component.
 */
export function NotesVisibilityFilter() {
   const [showPublic, setShowPublic] = useQueryState(`public`, parseAsBoolean);
   const tooltipMessage = useMemo(() => {
      if (showPublic === null) return `Showing all notes. Click to see public ones.`;

      return showPublic ? `Showing only public notes. Click to show private ones.` :
         `Showing only private notes. Click to show all ones.`;
   }, [showPublic]);

   const handleChangeVisibilityFilter = async () => {
      if (showPublic === null) await setShowPublic(true);
      else if (showPublic) await setShowPublic(false);
      else if (!showPublic) await setShowPublic(null);
   };

   return <TooltipProvider>
      <Tooltip delayDuration={200}>
         <TooltipTrigger
            className={`mb-2`}
            onClick={handleChangeVisibilityFilter} asChild>
            {showPublic === null ? (
               <Notebook className={`cursor-pointer`} size={18} />
            ) : showPublic ? (
               <Eye className={`cursor-pointer`} size={18} />
            ) : (
               <LockKeyhole className={`cursor-pointer`} size={18} />
            )}
         </TooltipTrigger>
         <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs max-w-[240px]`}>
            {tooltipMessage}
         </TooltipContent>
      </Tooltip>
   </TooltipProvider>;
}