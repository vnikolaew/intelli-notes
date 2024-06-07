"use client";
import React, { Fragment, useState } from "react";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription, DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { changeUserProfilePicture } from "@/components/common/actions";
import { isExecuting } from "next-safe-action/status";
import { Loader2 } from "lucide-react";
import { toast, TOASTS } from "@/config/toasts";
import { AVATARS } from "@/components/common/icons/UserAvatars";
import { useTranslation } from "react-i18next";


export interface ChangeUserAvatarModalProps {
   open: boolean;
   setOpen: (value: boolean) => void;
}

const ChangeUserAvatarModal = ({ open, setOpen }: ChangeUserAvatarModalProps) => {
   const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(-1);
   const { execute, status } = useAction(changeUserProfilePicture, {
      onSuccess: res => {
         if (res.success) {
            console.log(res);
            setOpen(false);
            toast(TOASTS.CHANGE_USER_PROFILE_PIC_SUCCESS)
         }
      },
   });
   const { t } = useTranslation(`home`, { keyPrefix: `Misc.ChangeProfilePicture` });
   const { t: misc } = useTranslation(`home`, { keyPrefix: `Misc` });

   async function handleUpdateProfilePicture() {
      const avatarFilePath = `avatars/avataaars(${selectedAvatarIndex + 1}).svg`;
      execute({ avatarSrc: avatarFilePath });
   }

   return (
      <Dialog onOpenChange={setOpen} open={open} modal>
         <DialogTrigger></DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{t(`Title`)} </DialogTitle>
               <DialogDescription>
                  {t(`Description`)}
               </DialogDescription>
            </DialogHeader>
            <div className={`grid grid-cols-5 gap-6 mt-8 !w-fit mx-auto`}>
               {AVATARS.map((avatar, index) => (
                  <div className={cn(`rounded-full  p-1 !w-fit`,
                     index === selectedAvatarIndex && `bg-gradient-to-r from-blue-500 to-blue-900 transition-colors duration-200`)}
                       key={index}>
                     <Image
                        onClick={_ => {
                           console.log(AVATARS);
                           setSelectedAvatarIndex(index);
                        }}
                        className={`w-12 !rounded-full !shadow-md cursor-pointer`} key={index} src={avatar}
                        alt={`Avatar ${index + 1}`} />
                  </div>
               ))}
            </div>
            <DialogFooter className={`w-full flex items-center !justify-between mt-8`}>
               <DialogClose>
                  <Button className={`shadow-md`} variant={`outline`}> {misc(`Cancel`)}</Button>
               </DialogClose>
               <Button
                  disabled={isExecuting(status)}
                  onClick={handleUpdateProfilePicture} className={`shadow-md items-center gap-2`} size={`lg`}
                  variant={`default`}>
                  {isExecuting(status) ? (
                     <Fragment>
                        <Loader2 size={18} className={`animate-spin`} />
                        Saving ...
                     </Fragment>
                  ) : misc(`Save`)}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

   );
};

export default ChangeUserAvatarModal;