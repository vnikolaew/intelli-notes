"use client";
import { Note } from "@repo/db";
import React, { Fragment, PropsWithChildren } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card";
import moment from "moment";
import { Markdown } from "components/common/markdown";
import { Button } from "components/ui/button";
import { Eye, Loader2, LockKeyhole, PencilLine, Trash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { deleteNote } from "../actions";
import { isExecuting } from "next-safe-action/status";
import {
   Dialog, DialogClose,
   DialogContent,
   DialogDescription, DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "components/ui/dialog";
import { ScrollAreaProps } from "@radix-ui/react-scroll-area";
import { cn } from "lib/utils";
import { Badge } from "components/ui/badge";
import { useBoolean } from "hooks/useBoolean";
import { useQueryState } from "nuqs";
import { motion } from "framer-motion";
import { Item } from "./MultiSelect";
import { parseAsItems } from "./NotesTagsFilter";

export interface NoteCardProps extends React.HTMLAttributes<HTMLDivElement> {
   note: Note;
   markdownProps?: ScrollAreaProps;
   showButtons?: boolean;
   showPublicity?: boolean;
}

const MotionCard = motion(Card);

/**
 * A Note preview card component.
 * @param note The input user note.
 * @param markdownProps Optional props to pass down to the Markdown component.
 * @param className
 * @param showButtons
 * @param props Additional Card props.
 * @constructor
 */
const NoteCard = ({
                     note,
                     markdownProps,
                     className,
                     showButtons = true,
                     showPublicity = false,
                     ...props
                  }: NoteCardProps) => {
   const { execute, status } = useAction(deleteNote, {
      onSuccess: res => {
         if (res.success) {
            console.log({ res });
         }
      },
   });
   const [previewNoteId, setPreviewNoteId] = useQueryState(`previewId`);
   const [previewOpen, setPreviewOpen] = useBoolean(!!previewNoteId?.length && previewNoteId === note.id);

   const [deleteModalOpen, setDeleteModalOpen] = useBoolean(false);

   return (
      <Fragment>
         <Dialog modal onOpenChange={async value => {
            setPreviewOpen(value);

            if (value) await setPreviewNoteId(note.id);
            else await setPreviewNoteId(null);
         }} open={previewOpen}>
            <DialogContent className={`min-h-[70vh]`}>
               <DialogHeader>
                  <DialogTitle className={`inline-flex items-center gap-3`}>
                     {showPublicity && (
                        <TooltipProvider>
                           <Tooltip delayDuration={200}>
                              <TooltipTrigger asChild>
                                 {note.public ? <Eye size={18} /> : <LockKeyhole size={18} />}
                              </TooltipTrigger>
                              <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs`}>
                                 {note.public ? `Public` : `Private`}
                              </TooltipContent>
                           </Tooltip>
                        </TooltipProvider>
                     )}
                     {note.title?.length ? note.title : `Untitled`}
                  </DialogTitle>
                  <DialogDescription className="flex flex-col gap-2 mt-2">
                     <span className={`text-xs`}>
                        Last updated: {` `}
                        <time className={`font-semibold text-neutral-500`}>
                           {moment(note.updatedAt).fromNow()}
                        </time>
                     </span>
                     <div className={`mt-2`}>
                        <NoteTags tags={note.tags} />
                     </div>
                  </DialogDescription>
                  <div className={`!mt-4`}>
                     <Markdown className={`!px-0`} value={note.raw_text} {...markdownProps} />
                  </div>
               </DialogHeader>
               <DialogFooter>
                  <DialogClose className={`flex items-end`}>
                     <Button className={`shadow-md`} variant={"destructive"}>Close</Button>
                  </DialogClose>
               </DialogFooter>
            </DialogContent>
         </Dialog>
         <MotionCard
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
            className={cn(`rounded-lg shadow-lg group hover:scale-[101%] transition-transform duration-200 flex flex-col cursor-pointer`, className)} {...props}>
            <CardHeader>
               <CardTitle className={`flex items-center justify-between`}>
                  <h2 className={`text-2xl inline-flex items-center gap-4`}>
                     {showPublicity && (
                        <TooltipProvider>
                           <Tooltip delayDuration={200}>
                              <TooltipTrigger asChild>
                                 {note.public ? <Eye size={18} /> : <LockKeyhole size={18} />}
                              </TooltipTrigger>
                              <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs`}>
                                 {note.public ? `Public` : `Private`}
                              </TooltipContent>
                           </Tooltip>
                        </TooltipProvider>
                     )}
                     {note.title?.length ? note.title : `Untitled`}
                  </h2>
                  {showButtons && (
                     <TooltipProvider>
                        <Tooltip delayDuration={200}>
                           <TooltipTrigger asChild>
                              <Button
                                 variant={`ghost`}
                                 asChild
                                 className={`rounded-md invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 !z-30`}
                                 size={`icon`}>
                                 <Link onClick={e => e.stopPropagation()}
                                       href={`/write?id=${encodeURIComponent(note.id)}`}>
                                    <PencilLine size={18} />
                                 </Link>
                              </Button>
                           </TooltipTrigger>
                           <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs`}>
                              Edit
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  )}
               </CardTitle>
               <CardDescription className={`text-xs`}>
                  Last updated: {` `}
                  <time className={`font-semibold text-neutral-500`}>
                     {moment(note.updatedAt).fromNow()}
                  </time>
               </CardDescription>
            </CardHeader>
            <CardContent
               onClick={async e => {
                  e.preventDefault();
                  setPreviewOpen(true);
                  await setPreviewNoteId(note.id);
               }}
               className={``}>
               <Markdown className={`!px-0`} value={note.raw_text} {...markdownProps} />
            </CardContent>
            <CardFooter className={`flex items-center justify-between mt-auto justify-self-end`}>
               <div
                  className={`invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                  <NoteTags tags={note.tags} />
               </div>
               {showButtons && (
                  <DeleteNoteModal
                     open={deleteModalOpen}
                     setOpen={setDeleteModalOpen}
                     loading={isExecuting(status)} onDelete={() => execute({ noteId: note.id })}>
                     <TooltipProvider>
                        <Tooltip>
                           <TooltipTrigger asChild>
                              <Button
                                 id={`delete-btn`}
                                 onClick={e => {
                                    setDeleteModalOpen(true);

                                    e.preventDefault();
                                    e.stopPropagation();

                                    setPreviewOpen(false);
                                 }}
                                 disabled={isExecuting(status)}
                                 variant={`destructive`}
                                 className={`rounded-md invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                                 size={`icon`}>
                                 {isExecuting(status) ? (
                                    <Loader2 className={`animate-spin`} size={18} />
                                 ) : <Trash size={18} />}
                              </Button>
                           </TooltipTrigger>
                           <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs`}>
                              Delete
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  </DeleteNoteModal>
               )}
            </CardFooter>
         </MotionCard></Fragment>
   );
};

const NoteTags = ({ tags }: { tags: string[] }) => {
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

interface DeleteNoteModalProps extends PropsWithChildren {
   onDelete: () => void;
   loading: boolean;
   open: boolean;
   setOpen: (open: boolean) => void;
}

/**
 * A modal for prompting the user to confirm note deletion.
 * @param children
 * @param onDelete A callback for executing server delete action.
 * @param loading A loading flag.
 * @constructor
 */
const DeleteNoteModal = ({ children, onDelete, loading, open, setOpen }: DeleteNoteModalProps) => {
   return (
      <Dialog onOpenChange={setOpen} modal open={open}>
         <DialogTrigger asChild>{children}</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Are you absolutely sure?</DialogTitle>
               <DialogDescription className={`!mt-4`}>
                  This action cannot be undone. This will permanently delete your note
                  and remove it from our servers.
               </DialogDescription>
            </DialogHeader>
            <DialogFooter>
               <Button
                  disabled={loading}
                  className={`shadow-md gap-2 items-center`}
                  onClick={_ => onDelete()}
                  variant={`destructive`}
                  type="submit">
                  {loading ? (
                     <>
                        <Loader2 className={`animate-spin`} size={18} />
                        Deleting ...
                     </>
                  ) : `Delete`}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

   );

};

export default NoteCard;