"use client";
import { Note } from "@repo/db";
import React, { Fragment } from "react";
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
import { ScrollAreaProps } from "@radix-ui/react-scroll-area";
import { cn } from "lib/utils";
import { useBoolean } from "hooks/useBoolean";
import { useQueryState } from "nuqs";
import { motion } from "framer-motion";
import { toast, TOASTS } from "config/toasts";
import { NoteTags } from "./NoteTags";
import NoteCardDialog from "./NoteCardDialog";
import { DeleteNoteModal } from "./DeleteNoteModal";

export interface NoteCardProps extends React.HTMLAttributes<HTMLDivElement> {
   note: Note;
   markdownProps?: ScrollAreaProps;
   showButtons?: boolean;
   showPublicity?: boolean;
   showComments?: boolean;
}

const MotionCard = motion(Card);

/**
 * A Note preview card component.
 * @param note The input user note.
 * @param markdownProps Optional props to pass down to the Markdown component.
 * @param className Additional CSS classes.
 * @param showButtons Show delete and edit buttons.
 * @param showPublicity Show whether the note is public or not.
 * @param showComments Show comments dialog.
 * @param props Additional Card props.
 * @constructor
 */
const NoteCard = ({
                     note,
                     markdownProps,
                     className,
                     showButtons = true,
                     showPublicity = false,
                     showComments = false,
                     ...props
                  }: NoteCardProps) => {
   const { execute, status } = useAction(deleteNote, {
      onSuccess: res => {
         if (res.success) {
            console.log({ res });
            toast(TOASTS.DELETE_NOTE_SUCCESS);
         }
      },
   });
   const [previewNoteId, setPreviewNoteId] = useQueryState(`previewId`);
   const [, setPreviewOpen] = useBoolean(!!previewNoteId?.length && previewNoteId === note.id);

   const [deleteModalOpen, setDeleteModalOpen] = useBoolean(false);

   return (
      <Fragment>
         <NoteCardDialog
            markdownProps={markdownProps}
            showButtons={showButtons}
            showPublicity={showPublicity}
            showComments={showComments}
            note={note} />
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
         </MotionCard>
      </Fragment>
   );
};


export default NoteCard;