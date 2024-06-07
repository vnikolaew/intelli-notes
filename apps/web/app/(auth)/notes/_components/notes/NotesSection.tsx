"use client";
import React, { Fragment } from "react";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { NOTES_VIEW_OPTIONS } from "./NotesHeader";
import NotesGrid from "./NotesGrid";
import { Note, NoteCategory } from "@repo/db";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useBoolean } from "@/hooks/useBoolean";
import { NotesFromCategory } from "@/app/(auth)/notes/_components/notes/NotesFromCategory";
import { CreateNoteCategoryModal } from "@/app/(auth)/notes/_components/notes/CreateNoteCategoryModal";

export interface NotesSectionProps {
   notes: Note[],
   categories: NoteCategory[]

}

export function NotesSection ({ notes, categories }: NotesSectionProps)  {
   const [view, setView] = useQueryState(`view`, parseAsStringLiteral(Object.values(NOTES_VIEW_OPTIONS)).withDefault(NOTES_VIEW_OPTIONS.ALL));
   const [open, setOpen] = useBoolean();

   return view === NOTES_VIEW_OPTIONS.ALL ? <NotesGrid notes={notes} /> :
      <div className={`flex flex-col items-center justify-center mt-0 min-h-[50vh] gap-4 w-full`}>
         {categories.length === 0 ? (
            <Fragment>
               <div>You haven't created any categories yet.</div>
               <CreateNoteCategoryModal open={open} setOpen={setOpen}>
                  <Button className={`items-center gap-2`} size={"sm"} variant={"default"}>
                     <Plus size={18} />
                     Create a new category
                  </Button>
               </CreateNoteCategoryModal>
            </Fragment>
         ) : (
            <div className={`flex flex-col items-center justify-center gap-8`}>
               <Accordion type="single" collapsible>
                  {categories.map((category) => (
                     <AccordionItem className={`w-[400px]`} key={category.id} value={category.id}>
                        <AccordionTrigger>{category.title}</AccordionTrigger>
                        <AccordionContent>
                           <NotesFromCategory
                              category={category}
                              notes={notes.filter(n => n.categoryId === category.id)} />
                        </AccordionContent>
                     </AccordionItem>
                  ))}
               </Accordion>
               <div>
                  <CreateNoteCategoryModal open={open} setOpen={setOpen}>
                     <Button className={`items-center gap-2`} size={"sm"} variant={"default"}>
                        <Plus size={18} />
                        Create a new category
                     </Button>
                  </CreateNoteCategoryModal>
               </div>
            </div>
         )}
      </div>;
};


export default NotesSection;