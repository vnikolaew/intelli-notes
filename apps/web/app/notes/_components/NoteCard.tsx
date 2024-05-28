"use client";
import { Note } from "@repo/db";
import React, { PropsWithChildren } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card";
import moment from "moment";
import { Markdown } from "components/common/markdown";
import { Button } from "components/ui/button";
import { Loader2, PencilLine, Trash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { deleteNote } from "../actions";
import { isExecuting } from "next-safe-action/status";
import {
   Dialog,
   DialogContent,
   DialogDescription, DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "components/ui/dialog";

export interface NoteCardProps {
   note: Note;
}

/**
 * A Note preview card component.
 * @param note The input user note.
 * @constructor
 */
const NoteCard = ({ note }: NoteCardProps) => {
   const { execute, status } = useAction(deleteNote, {
      onSuccess: res => {
         if (res.success) {
            console.log({ res });
         }
      },
   });

   return (
      <Card className={`rounded-lg shadow-lg group hover:scale-[101%] transition-transform duration-200`}>
         <CardHeader>
            <CardTitle className={`flex items-center justify-between`}>
               <h2 className={`text-2xl`}>
                  {note.title?.length ? note.title : `Untitled`}
               </h2>
               <TooltipProvider>
                  <Tooltip delayDuration={200}>
                     <TooltipTrigger asChild>
                        <Button
                           variant={`ghost`}
                           asChild
                           className={`rounded-md invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                           size={`icon`}>
                           <Link href={`/write?id=${encodeURIComponent(note.id)}`}>
                              <PencilLine size={18} />
                           </Link>
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs`}>
                        Edit
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            </CardTitle>
            <CardDescription className={`text-xs`}>
               Last updated: {` `}
               <time className={`font-semibold text-neutral-500`}>
                  {moment(note.updatedAt).fromNow()}
               </time>
            </CardDescription>
         </CardHeader>
         <CardContent>
            <Markdown value={note.raw_text} />
         </CardContent>
         <CardFooter className={`flex items-center justify-end`}>
            <DeleteNoteModal
               loading={isExecuting(status)} onDelete={() => execute({ noteId: note.id })}>
               <TooltipProvider>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button
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
         </CardFooter>
      </Card>
   );
};

interface DeleteNoteModalProps extends PropsWithChildren {
   onDelete: () => void;
   loading: boolean;
}

/**
 * A modal for prompting the user to confirm note deletion.
 * @param children
 * @param onDelete A callback for executing server delete action.
 * @param loading A loading flag.
 * @constructor
 */
const DeleteNoteModal = ({ children, onDelete, loading }: DeleteNoteModalProps) => {
   return (
      <Dialog>
         <DialogTrigger>{children}</DialogTrigger>
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
                  className={`shadow-md`}
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