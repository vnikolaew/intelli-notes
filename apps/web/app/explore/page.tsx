import React from "react";
import { xprisma } from "@repo/db";
import { auth } from "auth";
import { Separator } from "components/ui/separator";
import { Row } from "@repo/ui/components";
import { Avatar, AvatarImage } from "components/ui/avatar";
import NoteCard from "../notes/_components/NoteCard";

export interface PageProps {
}

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
      include: { author: true },
      take: 10,
   });

   return (
      <section className="flex flex-col items-start gap-4 mt-24 w-3/4 px-12 mx-auto">
         <h2 className={`text-3xl font-semibold`}>See what others are writing</h2>
         <Separator orientation={`horizontal`} className={`w-2/5 mt-0 text-neutral-700 bg-neutral-300 shadow-lg`} />
         <div className={`mt-4 grid grid-cols-3`}>
            {latestUsersNotes.map(({author,  ...note}, index) => (
               <div className={`flex flex-col items-start gap-3`} key={note.id}>
                  <Row className={`justify-start`}>
                     <Avatar>
                        <AvatarImage alt={author.name} src={author.image} />
                     </Avatar>
                     <span className={`text-muted-foreground`}>{author.name}</span>
                  </Row>
                  <NoteCard showButtons={false} note={note} />
               </div>
            ))}
         </div>
      </section>
   );
};

export default Page;