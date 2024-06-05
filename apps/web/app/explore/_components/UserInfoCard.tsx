import React, { useEffect, useState } from "react";
import { User } from "@repo/db";
import { motion } from "framer-motion";
import UserAvatar from "../../../components/common/UserAvatar";
import Link from "next/link";
import { CalendarDays, Notebook } from "lucide-react";
import moment from "moment/moment";
import { UserInfoCardProps } from "./NoteComment";

export function UserInfoCard({ user }: UserInfoCardProps) {
   const [userDetails, setUserDetails] = useState<Partial<User>>(null!);

   useEffect(() => {
         if (userDetails) return;

         fetch(`/api/users/${user.id}`, {
            next: { revalidate: 60 },
            headers: {
               Accept: `application/json`,
            },
         }).then(res => res.json()).then(res => {
            console.log(res);
            if (res.success) setUserDetails(res.user);
         }).catch(console.error);
      },
      [],
   );

   return <motion.div
      transition={{ duration: .3 }}
      animate={{
         opacity: 1,
      }}
      initial={{
         opacity: 0,
      }}
      className={`flex items-start gap-3`}>
      <UserAvatar className={`shadow-md cursor-pointer w-6 h-6`} imageSrc={user.image} />
      <div className={`flex flex-col items-start gap-2`}>
         <Link href={`/users/${user.id}/notes`} className={`text-xs !z-30`}>
            {user.name}
         </Link>
         <span className={`text-xs inline-flex gap-1 items-center text-neutral-700`}>
            <Notebook size={10} />
            {userDetails?._count?.notes} total notes
         </span>
         <time className={`text-muted-foreground inline-flex gap-2 items-center text-xs mt-4`}>
            <CalendarDays size={10} />
            <span>Joined {moment(user.createdAt).format(`MMMM YYYY`)}</span>
         </time>
      </div>
   </motion.div>;
}