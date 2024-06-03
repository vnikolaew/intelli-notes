"use client";
import { Note } from "@repo/db";
import React, { Fragment } from "react";
import { Button } from "components/ui/button";
import Image from "next/image";
import googleDriveLogo from "public/google-drive.png";
import { useBoolean } from "hooks/useBoolean"
import { Loader2 } from "lucide-react";
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "components/ui/dialog";
import { APP_NAME } from "config/site";

export interface UploadToGoogleDriveButtonProps {
   notes: Note[];

}

const UploadToGoogleDriveButton = ({ notes }: UploadToGoogleDriveButtonProps) => {
   const [loading, setLoading] = useBoolean(false);
   const [confirmUploadOpen, setConfirmUploadOpen] = useBoolean(false);

   const handleUpload = () => {
      setLoading(true);
      fetch(`/api/notes/export/google-drive`, {
         method: "POST",
         body: JSON.stringify({ notes }),
         headers: {
            "Content-Type": "application/json",
         },
      }).then(res => res.json())
         .then(res => {
               console.log(res);
               setConfirmUploadOpen(false);
            },
         )
         .catch(console.error)
         .finally(() => setLoading(false));
   };

   return (
      <Dialog onOpenChange={setConfirmUploadOpen} open={confirmUploadOpen} modal>
         <DialogTrigger asChild>
            <Button
               disabled={loading}
               className={`items-center gap-2 text-blue-900 shadow-md`}
               variant={`secondary`}>
               <Image className={`w-4 h-4`} width={16} alt={`Google Drive`} src={googleDriveLogo} />
               Upload to GoogleDrive
            </Button>
         </DialogTrigger>
         <DialogContent className={`min-w-[30vw]  min-h-[60vh] flex flex-col justify-between`}>
            <DialogHeader>
               <DialogTitle>Confirm upload to GoogleDrive</DialogTitle>
            </DialogHeader>
            <div className={`mt-8 text-muted-foreground`}>
               A new folder named<b className={`text-black mx-2`}>{APP_NAME.replace(` `, ``)} - Uploads</b>
               is about to be created in your Google Drive if does not already exist.
               <br />
               <p className={`!mt-4 text-black`}>
                  Are you sure you'd like to proceed?
               </p>
            </div>
            <DialogFooter className={`flex w-full items-end justify-end mt-8 gap-2 self-end justify-self-end flex-1`}>
               <Button onClick={_ => setConfirmUploadOpen(false)} variant={`outline`}>Cancel</Button>
               <Button disabled={loading} onClick={handleUpload} variant={`default`}>
                  {loading ? (
                     <Fragment>
                        <Loader2 className="animate-spin" size={18} />
                        Uploading ...
                     </Fragment>
                  ) : `Upload`}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default UploadToGoogleDriveButton;