import React, { } from "react";
import {
   BoldItalicUnderlineToggles,
   CodeToggle,
   CreateLink,
   DiffSourceToggleWrapper,
   InsertCodeBlock, insertDirective$, InsertImage, InsertTable, ListsToggle,
   StrikeThroughSupSubToggles,
   UndoRedo, usePublisher,
} from "@mdxeditor/editor";
import { Separator } from "components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select";
import "./styles.css"

export interface EditorToolbarProps {
}

const InsertAdmonitions = () => {
   const insert = usePublisher(insertDirective$);

   return (
      <Select onValueChange={value => {
         insert({
            name: value,
            type: "leafDirective",
            attributes: [],
            children: [],
         } as LeafDirective);
      }}>
         <SelectTrigger className="w-[180px] ml-4">
            <SelectValue placeholder="Insert an alert" />
         </SelectTrigger>
         <SelectContent side={`bottom`}>
            {[`info`, `danger`, `warning`, `caution`, `tip`, `note`].map((item, i) => (
               <SelectItem key={i} onClick={console.log} value={item}>
                  {item[0].toUpperCase()}{item.slice(1).toLowerCase()}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>

   );
};

const EditorToolbar = ({}: EditorToolbarProps) => {
   return (
      <div className={`flex items-center w-full`}>
         {` `}
         <UndoRedo />
         <BoldItalicUnderlineToggles />
         <Separator className={`!h-5 w-[1px] bg-neutral-400 mx-2`} orientation={`vertical`} />
         <CodeToggle />
         <CreateLink />
         <InsertCodeBlock />
         <StrikeThroughSupSubToggles />
         <Separator className={`!h-5 w-[1px] bg-neutral-400 mx-2`} orientation={`vertical`} />
         <InsertImage />
         <InsertTable />
         <Separator className={`!h-5 w-[1px] bg-neutral-400 mx-2`} orientation={`vertical`} />
         <ListsToggle />
         <InsertAdmonitions />

         <DiffSourceToggleWrapper>
            {``}
         </DiffSourceToggleWrapper>
      </div>
   );
};

export default EditorToolbar;