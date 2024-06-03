"use client";
import React, { PropsWithChildren } from "react";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { NOTES_VIEW_OPTIONS } from "./NotesHeader";
import NotesGrid from "./NotesGrid";
import { Note, NoteCategory } from "@repo/db";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion";
import { Button } from "components/ui/button";
import { Loader2, Notebook, Pencil, Plus } from "lucide-react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "components/ui/dialog";
import { useBoolean } from "hooks/useBoolean";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { createCategory } from "../actions";
import { toast, TOASTS } from "config/toasts";
import { isExecuting } from "next-safe-action/status";
import moment from "moment";
import Link from "next/link";
import { useFilteredNotes } from "../_hooks";

export interface NotesSectionProps {
   notes: Note[],
   categories: NoteCategory[]

}

function NotesFromCategory({ category, notes }: { notes: Note[], category: NoteCategory }) {
   const {pagedNotes, filteredNotes} = useFilteredNotes(notes);

   return notes.length === 0 ? (
      <div className={`text-muted-foreground text-sm text-center`}>You have no notes from this category yet.</div>
   ) : (
      <div className={`flex flex-col items-start gap-8`}>
         {filteredNotes.map((note, index) =>
            <div className={`flex items-center gap-4 w-full`} key={note.id}>
               <Notebook className={`text-muted-foreground`} size={24} />
               <div className={`flex flex-col items-start gap-0`} key={note.id}>
                  <span
                     className={`text-lg text-neutral-500 font-semibold`}
                     key={note.id}>
                  {note.title?.length ? note.title : `Untitled`}
               </span>
                  <span>
                  <time className={`text-sm text-muted-foreground`}>
                     Last updated: {moment(note.updatedAt).fromNow()}
                  </time>
               </span>
               </div>
               <div className={`flex-1 flex justify-end`}>
                  <Link title={`Edit`} href={`/write?id=${note.id}`}>
                     <Pencil className={`text-neutral-700`} size={20} />
                  </Link>
               </div>
            </div>,
         )}
      </div>
   );
}

const NotesSection = ({ notes, categories }: NotesSectionProps) => {
   const [view, setView] = useQueryState(`view`, parseAsStringLiteral(Object.values(NOTES_VIEW_OPTIONS)).withDefault(NOTES_VIEW_OPTIONS.ALL));
   const [open, setOpen] = useBoolean();

   return view === NOTES_VIEW_OPTIONS.ALL ? <NotesGrid notes={notes} /> :
      <div className={`flex flex-col items-center justify-center mt-0 min-h-[50vh] gap-4 w-full`}>
         {categories.length === 0 ? (
            <>
               <div>You haven't created any categories yet.</div>
               <CreateNoteCategoryModal open={open} setOpen={setOpen}>
                  <Button className={`items-center gap-2`} size={"sm"} variant={"default"}>
                     <Plus size={18} />
                     Create a new category
                  </Button>
               </CreateNoteCategoryModal>
            </>
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

export interface CreateNoteCategoryModalProps extends PropsWithChildren {
   open: boolean;
   setOpen: (value: boolean) => void;

}

const formSchema = z.object({
   title: z.string().min(3).max(100),
});

type FormValues = z.infer<typeof formSchema>

const CreateNoteCategoryModal = ({ setOpen, open, children }: CreateNoteCategoryModalProps) => {
   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: ``,
      },
   });
   const { execute, status } = useAction(createCategory, {
      onSuccess: res => {
         if (res.success) {
            console.log(res);
            toast(TOASTS.CREATE_CATEGORY_SUCCESS);
            setOpen(false);
         }
      },
   });

   function onSubmit({ title }: FormValues) {
      console.log({ title });
      execute({ title });
   }

   return (
      <Dialog onOpenChange={setOpen} open={open}>
         <DialogTrigger>{children}</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Create a new category</DialogTitle>
               <DialogDescription>

               </DialogDescription>
            </DialogHeader>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
                  <FormField
                     control={form.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem className={`!mt-4`}>
                           <FormLabel>Category title</FormLabel>
                           <FormControl className={`!mt-1`}>
                              <Input type={`text`} required placeholder="e.g. Tasks" {...field} />
                           </FormControl>
                           <FormDescription>
                              This will be the name of the category.
                           </FormDescription>
                           <FormMessage className={`dark:text-red-400`} />
                        </FormItem>
                     )}
                  />
                  <div className={`flex w-full justify-end mt-4`}>
                     <Button className={`items-center gap-2`} type={`submit`} disabled={isExecuting(status)} size={`sm`}
                             variant={`default`}>
                        {isExecuting(status) ? <>
                           <Loader2 size={18} className={`animate-spin`} />
                           Creating ...
                        </> : (
                           `Create`
                        )}
                     </Button>
                  </div>
               </form>
            </Form>
         </DialogContent>

      </Dialog>

   );
};

export default NotesSection;