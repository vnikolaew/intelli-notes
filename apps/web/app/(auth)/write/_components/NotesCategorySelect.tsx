"use client";
import { Note, NoteCategory } from "@repo/db";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "components/ui/select";
import React, { useMemo } from "react";
import { useAction } from "next-safe-action/hooks";
import { changeNoteCategory } from "../actions";
import { toast, TOASTS } from "config/toasts";
import { isExecuting } from "next-safe-action/status";
import { Check, Loader2 } from "lucide-react";
import { useBoolean } from "hooks/useBoolean";

export interface NotesCategorySelectProps {
   note: Note;
   categories: NoteCategory[];
}

const UNCATEGORIZED = `Uncategorized`;

const NotesCategorySelect = ({ note, categories }: NotesCategorySelectProps) => {
   const [open, setOpen] = useBoolean();
   const { status, execute } = useAction(changeNoteCategory, {
      onSuccess: res => {
         if (res.success) {
            toast(TOASTS.CHANGE_CATEGORY_SUCCESS);
            setOpen(false)
         }
      },
   });
   const loading = useMemo(() => isExecuting(status), [status]);

   return (
      <div>
         <Select
            open={open}
            onOpenChange={setOpen}
            defaultValue={note?.categoryId ?? UNCATEGORIZED}
            onValueChange={value => {
               setOpen(true);
               if(!note?.id) return;

               execute({ categoryId: value === UNCATEGORIZED ? null : value, noteId: note?.id });
            }}>
            <SelectTrigger className="w-[180px]">
               <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  <SelectLabel>Choose a category</SelectLabel>
                  <SelectItem
                     onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpen(true);
                     }} checkedIcon={loading ? <Loader2 className={`animate-spin`} size={14} /> :
                     <Check
                        className="h-4 w-4" />}
                     className={`text-muted-foreground`}
                     key={UNCATEGORIZED}
                     value={UNCATEGORIZED}>Uncategorized</SelectItem>
                  {categories.map((category, index) => (
                     <SelectItem
                        onClick={e => {
                           e.preventDefault();
                           e.stopPropagation();
                           setOpen(true);
                        }} checkedIcon={loading ? <Loader2 className={`animate-spin`} size={14} /> :
                        <Check
                           className="h-4 w-4" />} key={category.id}
                        value={category.id}>{category.name}</SelectItem>
                  ))}
               </SelectGroup>
            </SelectContent>
         </Select>
      </div>
   );
};

export default NotesCategorySelect;