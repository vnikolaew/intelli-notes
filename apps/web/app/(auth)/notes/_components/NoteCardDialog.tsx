"use client"
import React from "react";
import { Eye, LockKeyhole } from "lucide-react";
import {
   Dialog, DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { Note } from "@repo/db";
import { NoteTags } from "./NoteTags";
import { Markdown } from "components/common/markdown";
import NoteSocialShareButtons from "./NoteSocialShareButtons";
import { Button } from "components/ui/button";
import NoteCommentsDialog from "@/app/explore/_components/comments/NoteCommentsDialog";
import { useQueryState } from "nuqs";
import moment from "moment";
import { ScrollAreaProps } from "@radix-ui/react-scroll-area";
import { useBoolean } from "hooks/useBoolean";

export interface NoteCardDialogProps {
   note: Note;
   showButtons?: boolean;
   showPublicity?: boolean;
   showComments?: boolean;
   markdownProps?: ScrollAreaProps;
}

const NoteCardDialog = ({ note, showComments, showPublicity,  markdownProps }: NoteCardDialogProps) => {
   const [previewNoteId, setPreviewNoteId] = useQueryState(`previewId`);
   const [previewOpen, setPreviewOpen] = useBoolean(!!previewNoteId?.length && previewNoteId === note.id);

   return (
      <Dialog open={previewNoteId === note.id} modal onOpenChange={async value => {
         setPreviewOpen(value)

         if (value) await setPreviewNoteId(note.id);
         else await setPreviewNoteId(null);
      }}>
         <DialogContent
            className={`min-h-[70vh] !bg-transparent !p-2 !border-none flex items-start gap-12 !w-fit !max-w-fit`}>
            <div
               className={`flex-1 !h-full min-h-[70vh] rounded-lg !bg-white min-w-[300px] flex flex-col items-start p-6 justify-between 2xl:min-w-[500px]`}>
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
               <DialogFooter className={`flex items-center justify-between w-full`}>
                  <NoteSocialShareButtons note={note} />
                  <DialogClose className={`flex items-end`}>
                     <Button className={`shadow-md`} variant={"destructive"}>Close</Button>
                  </DialogClose>
               </DialogFooter>
            </div>
            {showComments && (
               <div className={`rounded-lg !bg-white p-6 min-h-[70vh]`}>
                  <NoteCommentsDialog note={note} />
               </div>
            )}
         </DialogContent>
      </Dialog>
   );
};

export default NoteCardDialog;