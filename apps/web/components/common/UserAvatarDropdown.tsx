"use client";
import React, { Fragment } from "react";
import { useSession } from "next-auth/react";
import {
   DropdownMenu,
   DropdownMenuContent, DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import UserAvatar from "@/components/common/UserAvatar";
import { useBoolean } from "@/hooks/useBoolean";
import { Image } from "lucide-react";
import ChangeUserAvatarModal from "@/components/common/ChangeUserAvatarModal";
import changeUserAvatarModal from "@/components/common/ChangeUserAvatarModal";

export interface UserAvatarDropdownProps {
}

const UserAvatarDropdown = ({}: UserAvatarDropdownProps) => {
   const session = useSession();
   const [dropdownOpen, setDropdownOpen] = useBoolean();
   const [tooltipOpen, setTooltipOpen] = useBoolean();
   const [changeAvatarModalOpen, setChangeAvatarModalOpen] = useBoolean(false);

   return (
      <Fragment>
         <DropdownMenu onOpenChange={value => {
            if (value) setTooltipOpen(false);
            setDropdownOpen(value);
         }} open={dropdownOpen}>
            <DropdownMenuTrigger>
               <TooltipProvider>
                  <Tooltip onOpenChange={setTooltipOpen} open={tooltipOpen}>
                     <TooltipTrigger>
                        <UserAvatar
                           title={session?.data?.user?.name} className={`cursor-pointer`}
                           imageSrc={session?.data?.user?.image} />
                     </TooltipTrigger>
                     <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs`}>
                        Signed in as {session?.data?.user?.name}
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`rounded-lg p-2 min-w-[300px]`}>
               <DropdownMenuItem
                  onClick={_ => {
                     setChangeAvatarModalOpen(true)
                  }}
                  className={`flex items-center gap-2 w-full hover:!bg-neutral-300 transition-all duration-200 !rounded-md cursor-pointer hover:!text-white !px-4 !py-2`}>
                  <Image size={18} />
                  Change profile picture
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
         <ChangeUserAvatarModal
            open={changeAvatarModalOpen}
            setOpen={setChangeAvatarModalOpen} />
      </Fragment>
   );
};

export default UserAvatarDropdown;