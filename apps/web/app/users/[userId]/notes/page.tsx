import React from "react";
import { xprisma } from "@repo/db";
import { Row } from "@repo/ui/components";
import UserAvatar from "components/common/UserAvatar";
import NoteCard from "../../../notes/_components/NoteCard";
import NoteLikeButton from "../../../explore/_components/NoteLikeButton";
import { auth } from "auth";

export interface PageProps {
   params: { userId: string };
}

const Page = async ({ params: { userId } }: PageProps) => {
   const session = await auth()
   const user = await xprisma.user.findUnique({
      where: { id: userId },
      include: {
         notes: {
            where: { public: true }, orderBy: { createdAt: "desc" },
            skip: 0,
            take: 20,
            include: {
               likes: {
                  select: { id: true, noteId: true, userId: true },
               },
            },
         },
      },
   });

   return (
      <section className={`flex flex-col w-2/3 mt-24 items-center mx-auto`}>
         <Row className={`justify-start gap-4`}>
            <UserAvatar className={`w-16 h-16`} imageSrc={user.image!} alt={user.name} />
            <span className={`text-lg font-semibold drop-shadow-md`}>{user.name}'s notes</span>
         </Row>
         <div className={`grid grid-cols-3 w-full gap-8 mt-8`}>
            {user.notes.map((note, index) => (
               <div className={`flex flex-col gap-4`}><NoteCard
                  showButtons={false}
                  showPublicity
                  markdownProps={{ className: `h-[160px] !px-0` }}
                  key={note.id + index} note={note} />
                  <NoteLikeButton
                     note={note}
                     total={note.likes.length}
                     hasUserLiked={note.likes.some(l => l.userId === session.user.id)} />
               </div>
            ))}
         </div>
      </section>
   );
};

export default Page;