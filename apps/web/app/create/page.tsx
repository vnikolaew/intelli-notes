import React from "react";
import { Note, xprisma } from "@repo/db";
import { auth } from "auth";
import EditorComponentWrapper from "./_components/EditorComponentWrapper";

export interface PageProps {
   searchParams: { id?: string };
}

const Page = async (props: PageProps) => {
   const session = await auth();
   const params = props.searchParams;

   const notes = await xprisma.user.notes({ userId: session.user?.id });
   let note: Note | null;
   if (!!params.id) {
      note = await xprisma.note.findUnique({
         where: { id: params.id, authorId: session?.user?.id },
      });
   }
   console.log({ notes, params });

   return (
      <section className="w-full m-12 flex flex-col items-center gap-4">
         <div className="flex flex-col items-start mx-auto w-2/3 gap-8">
            <h2 className="text-3xl font-semibold text-gray-900 leading-tight drop-shadow-lg">
               Create a Note
            </h2>
            <div className={`w-full`}>
               <EditorComponentWrapper note={note} />
            </div>
         </div>
      </section>
   );
};

export default Page;