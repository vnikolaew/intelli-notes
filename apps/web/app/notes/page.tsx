import React from "react";
import { auth } from "auth";
import { redirect } from "next/navigation";
import { xprisma } from "@repo/db";
import { Separator } from "components/ui/separator";
import NotesGrid from "./_components/NotesGrid";
import { Button } from "components/ui/button";
import { PenLine, Sparkles, StickyNote } from "lucide-react";
import Link from "next/link";
import NotesSearchInput from "./_components/NotesSearchInput";
import { NotesHeader } from "./_components/NotesHeader";
import { NotesTagsFilter } from "./_components/NotesTagsFilter";
import BulkExportNotesButton from "./_components/BulkExportNotesButton";
import { NotesVisibilityFilter } from "./_components/NotesVisibilityFilter";
import { Row } from "@repo/ui/components";

export interface PageProps {
}

function NotesEmptyState() {
   return <div className={`w-full flex items-center justify-center flex-col mt-12 gap-2`}>
      <StickyNote className={``} size={40} />
      <span className={`text-muted-foreground text-lg`}>
         You haven't written anything yet.
      </span>
   </div>;
}

const Page = async ({}: PageProps) => {
   const session = await auth();
   if (!session) redirect(`/`);

   const myNotes = await xprisma.user.notes({ userId: session.user?.id });
   const allTags = [...new Set(myNotes.flatMap(n => n.tags))];

   return (
      <section className="flex flex-col items-start gap-4 mt-24 w-3/4 px-12 mx-auto">
         <Row className={``}>
            <NotesHeader notes={myNotes} />
            <Row className={`!w-fit gap-6`}>
               <NotesSearchInput />
               <Button asChild className={`shadow-md`} variant={"default"} size={`sm`}>
                  <Link className={`flex gap-2`} href={`/write`}>
                     <PenLine size={16} />
                     <span className={`font-normal text-base`}>New note</span>
                  </Link>
               </Button>
               <Button asChild className={`shadow-md`} variant={"ghost"} size={`sm`}>
                  <Link className={`flex gap-2`} href={`/notes/ask`}>
                     <Sparkles className={`text-blue-500`} size={16} />
                     <span className={`test-gradient font-semibold text-base`}>Ask AI</span>
                  </Link>
               </Button>
            </Row>
         </Row>
         <Separator orientation={`horizontal`} className={`w-2/5 mt-0 text-neutral-700 bg-neutral-300 shadow-lg`} />
         <div className="w-full flex items-center justify-between gap-4">
            <Row className={`!w-1/3`}>
               <NotesVisibilityFilter  />
               <NotesTagsFilter tags={allTags}/>
            </Row>
            <div>
               <BulkExportNotesButton notes={myNotes} />
            </div>
         </div>
         {myNotes.length === 0 ? (
            <NotesEmptyState />
         ) : (
            <NotesGrid notes={myNotes} />
         )}
      </section>
   );
};

export default Page;