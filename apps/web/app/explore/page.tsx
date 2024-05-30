import React from "react";
import { xprisma } from "@repo/db";
import { auth } from "auth";
import { Separator } from "components/ui/separator";
import { Row } from "@repo/ui/components";
import NoteCard from "../notes/_components/NoteCard";
import UserAvatar from "components/common/UserAvatar";
import { ThumbsUp } from "lucide-react";
import NoteLikeButton from "./_components/NoteLikeButton";

export interface PageProps {
}

const EXPLORE_HEADINGS = [
   `See what others are writing`,
   "Discover what others are jotting down",
   "Explore others' thoughts and ideas",
   "Check out popular notes",
   "Browse notes from the community",
   "See what’s trending",
   "Find inspiration from others",
   "Uncover new perspectives",
   "Read what’s on everyone’s mind",
   "Dive into community notes",
   "Explore shared notes",
   "See what’s being shared",
   "Explore popular topics",
   "Discover community insights",
   "Read notes from fellow users",
   "Find out what’s being written",
];

const Page = async ({}: PageProps) => {
   const session = await auth();
   const latestUsersNotes = await xprisma.note.findMany({
      where: {
         authorId: {
            not: session.user?.id as string,
         },
         public: true,
      },
      orderBy: { createdAt: `desc` },
      include: { author: true, likes: { select: { id: true, noteId: true, userId: true } } },
      take: 10,
   });

   console.log({ latestUsersNotes });

   return (
      <section className="flex flex-col items-start gap-4 mt-24 w-3/4 px-12 mx-auto">
         <h2 className={`text-3xl font-semibold`}>
            {EXPLORE_HEADINGS.at(Math.floor(Math.random() * EXPLORE_HEADINGS.length))}
         </h2>
         <Separator orientation={`horizontal`} className={`w-2/5 mt-0 text-neutral-700 bg-neutral-300 shadow-lg`} />
         <div className={`mt-4 grid grid-cols-3`}>
            {latestUsersNotes.map(({ author, ...note }, index) => (
               <div className={`flex flex-col items-start gap-4`} key={note.id}>
                  <Row className={`justify-start`}>
                     <UserAvatar alt={author.name} imageSrc={author.image} />
                     <span className={`text-muted-foreground`}>{author.name}</span>
                  </Row>
                  <NoteCard showButtons={false} note={note} />
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