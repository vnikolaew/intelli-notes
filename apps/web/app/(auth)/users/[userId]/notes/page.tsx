import React from "react";
import { InteractiveLink, Row } from "@repo/ui/components";
import UserAvatar from "components/common/UserAvatar";
import NoteCard from "../../../notes/_components/NoteCard";
import { auth } from "auth";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getUserDetails } from "./_queries";
import NoteCommentsCount from "app/explore/_components/NoteCommentsCount";
import NoteLikeButton from "app/explore/_components/NoteLikeButton";

export interface PageProps {
   params: { userId: string };
}

const Page = async ({ params: { userId } }: PageProps) => {
   const session = await auth();
   const user = await getUserDetails(userId);

   if (!user) notFound();

   return (
      <section className={`flex flex-col w-2/3 mt-24 items-center mx-auto`}>
         <Row className={`justify-between gap-4 items-center`}>
            <Row className={`!w-fit`}>
               <UserAvatar className={`w-16 h-16`} imageSrc={user.image!} alt={user.name} />
               <span className={`text-lg font-semibold drop-shadow-md`}>{user.name}'s notes</span>
            </Row>
            <InteractiveLink
               underlineClassname={`bg-black`} className={`inline-flex gap-2 items-center  text-lg`}
               href={`/explore`}>
               Go to Explore page <ArrowRight size={22} />
            </InteractiveLink>
         </Row>
         <div className={`grid grid-cols-3 w-full gap-8 mt-8`}>
            {user.notes.map((note, index) => (
               <div className={`flex flex-col gap-4`}>
                  <NoteCard
                     showButtons={false}
                     showComments
                     showPublicity
                     markdownProps={{ className: `h-[160px] !px-0` }}
                     key={note.id + index} note={note} />
                  <div className={`flex items-center justify-end gap-4 w-full`}>
                     <NoteCommentsCount count={note._count.comments} />
                     <NoteLikeButton
                        note={note}
                        total={note.likes.length}
                        hasUserLiked={note.likes.some(l => l.userId === session?.user?.id)} />
                  </div>
               </div>
            ))}
         </div>
      </section>
   );
};

export default Page;