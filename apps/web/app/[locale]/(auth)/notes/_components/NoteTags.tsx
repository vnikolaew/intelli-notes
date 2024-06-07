import { useQueryState } from "nuqs";
import { Item } from "@/components/common/MultiSelect";
import { parseAsItems } from "./NotesTagsFilter";
import { Badge } from "components/ui/badge";
import React from "react";

export const NoteTags = ({ tags }: { tags: string[] }) => {
   const [selectedTags, setSelectedTags] = useQueryState<Item[]>(`tags`, parseAsItems);

   return (
      <div
         className={`flex items-center gap-1`}>
         {tags?.slice(0, 3).map((tag, index) => (
            <Badge onClick={async e => {
               e.preventDefault();
               e.stopPropagation();
               console.log({ e });
               await setSelectedTags(t =>
                  selectedTags?.map(t => t.value)?.includes(tag)
                     ? selectedTags?.filter(t => t.value !== tag) : [...(t ?? []), {
                        value: tag,
                        label: tag,
                     }]);
            }} key={index}>{tag.toLowerCase()}</Badge>
         ))}
         {tags.length > 3 && (
            <Badge variant={"outline"} key={`more`}>{tags.length - 3} more</Badge>
         )}
      </div>
   );
};