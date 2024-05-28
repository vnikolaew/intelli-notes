import React from "react";
import { auth } from "auth";
import { redirect } from "next/navigation";
import { xprisma } from "@repo/db";
import { Separator } from "components/ui/separator";
import NotesGrid from "./_components/NotesGrid";
import { Button } from "components/ui/button";
import { PenLine, Sparkles } from "lucide-react";
import Link from "next/link";
import NotesSearchInput from "./_components/NotesSearchInput";

export interface PageProps {
}

const Page = async ({}: PageProps) => {
   const session = await auth();
   if (!session) redirect(`/`);

   const myNotes = await xprisma.user.notes({ userId: session.user?.id });

   return (
      <section className="flex flex-col items-start gap-4 mt-24 w-3/4 px-12 mx-auto">
         <div className={`w-full flex items-center justify-between`}>
            <h2 className={`text-3xl font-semibold`}>All notes ({myNotes.length})</h2>
            <div className={`flex items-center gap-6`}>
               <NotesSearchInput />
               <Button asChild className={`shadow-md`} variant={"default"} size={`default`}>
                  <Link className={`flex gap-2`} href={`/write`}>
                     <PenLine size={18} />
                     <span className={`font-normal text-base`}>Write a new note</span>
                  </Link>
               </Button>
               <Button asChild className={`shadow-md`} variant={"ghost"} size={`default`}>
                 <Link className={`flex gap-2`} href={`/notes/ask`}>
                    <Sparkles className={`text-blue-500`} size={18} />
                    <span className={`test-gradient font-semibold text-lg`}>Ask AI</span>
                 </Link>
               </Button>
            </div>
         </div>
         <Separator orientation={`horizontal`} className={`w-2/5 mt-0 text-neutral-700 bg-neutral-300 shadow-lg`} />
         <NotesGrid notes={myNotes} />
      </section>
   );
};

export default Page;