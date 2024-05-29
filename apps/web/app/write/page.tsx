import React from "react";
import { Note, xprisma } from "@repo/db";
import { auth } from "auth";
import EditorComponentWrapper from "./_components/EditorComponentWrapper";
import { ArrowRight, SquarePen } from "lucide-react";
import { InteractiveLink } from "@repo/ui/components";
import { redirect } from "next/navigation";
import { isValidUuid } from "lib/utils";

export interface PageProps {
   searchParams: { id?: string };
}

const Page = async (props: PageProps) => {
   const session = await auth();
   const params = props.searchParams;

   let note: Note | null;

   if (!!params.id) {
      const isValid = isValidUuid(params.id);
      if (!isValid) redirect(`/write`);

      note = await xprisma.note.findUnique({
         where: { id: params.id, authorId: session?.user?.id },
      });
   }

   return (
      <section className="w-full m-12 flex flex-col items-center gap-4">
         <div className="flex flex-col items-start mx-auto w-2/3 gap-8">
            <div className={`flex items-center justify-between w-full`}>
               <h2
                  className="text-3xl font-semibold text-gray-900 leading-tight drop-shadow-lg inline-flex gap-3 items-center">
                  <SquarePen className={`text-black`} size={20} />
                  Write a Note
               </h2>
               <InteractiveLink className={`inline-flex items-center gap-2`} underlineClassname={`bg-black`}
                                href={`/notes`}>
                  Back to all notes <ArrowRight size={14} />
               </InteractiveLink>
            </div>
            <div className={`w-full`}>
               <EditorComponentWrapper note={note} />
            </div>
         </div>
      </section>
   );
};

export default Page;