import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "components/ui/avatar";
import { CircleUserRound } from "lucide-react";
import React, { HTMLAttributes } from "react";

export interface UserAvatarProps extends AvatarProps, HTMLAttributes<HTMLSpanElement> {
   imageSrc?: string;
   alt?: string;
}

const UserAvatar = ({ imageSrc, alt, ...props }: UserAvatarProps) => {
   return imageSrc ? (
      <Avatar {...props}>
         <AvatarImage alt={alt ?? ``} src={imageSrc} />
      </Avatar>
   ) : (
      <CircleUserRound className={``} size={28} />
   );
};

export default UserAvatar;