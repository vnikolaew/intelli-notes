import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { PropsWithChildren } from "react";

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
export const DeleteNoteModal = ({ children, onDelete, loading, open, setOpen }: DeleteNoteModalProps) => {
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