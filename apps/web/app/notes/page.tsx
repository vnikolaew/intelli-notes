import React from "react";
import { auth } from "auth";
import { redirect } from "next/navigation";
import { xprisma } from "@repo/db";
import { Separator } from "components/ui/separator";
import { Button } from "components/ui/button";
import { PenLine, Sparkles, StickyNote } from "lucide-react";
import Link from "next/link";
import NotesSearchInput from "./_components/NotesSearchInput";
import { NotesHeader } from "./_components/NotesHeader";
import { NotesTagsFilter } from "./_components/NotesTagsFilter";
import BulkExportNotesButton from "./_components/BulkExportNotesButton";
import { NotesVisibilityFilter } from "./_components/NotesVisibilityFilter";
import { Row } from "@repo/ui/components";
import { ImportNotesButton } from "./_components/ImportNotesButton";
import {
   Pagination,
   PaginationContent, PaginationEllipsis,
   PaginationItem,
   PaginationLink, PaginationNext,
   PaginationPrevious,
} from "components/ui/pagination";
import NotesSection from "./_components/NotesSection";
import UploadToGoogleDriveButton from "./_components/UploadToGoogleDriveButton";
import { headers } from "next/headers";
import UserFeedbackModal from "components/modals/UserFeedbackModal";

export interface PageProps {
   searchParams: { page?: number };
}

const showFeedbackModal = () => {
   let referer = [...headers().entries()].find(([key]) => key === `referer`);
   if (referer) {
      console.log({ referer: referer[1] });
      try {
         console.log(new URL(referer[1]).pathname);
         return new URL(referer[1]).pathname === `/write`
      } catch(e ) { return false}
   }


   return false
};

function NotesEmptyState() {
   return <div className={`w-full flex items-center justify-center flex-col mt-12 gap-2`}>
      <StickyNote className={``} size={40} />
      <span className={`text-muted-foreground text-lg`}>
         You haven't written anything yet.
      </span>
   </div>;
}


const Page = async ({ searchParams }: PageProps) => {
   const session = await auth();
   if (!session) redirect(`/`);

   const page = Math.max(Number(searchParams.page ?? 0), 1);

   const { notes: myNotes, total } = await xprisma.user.notes({
         userId: session.user?.id,
         take: 10000,
      },
   );

   const categories = await xprisma.noteCategory.findMany({
      where: {
         userId: session?.user?.id,
      },
   });
   const allTags = [...new Set(myNotes.flatMap(n => n.tags))];
   const showGoogleDriveUploadFeature = !!session.accessToken && !!session.refreshToken;

   const show = showFeedbackModal()
   console.log({ show });

   return (
      <section className="flex flex-col items-start gap-4 mt-24 w-3/4 px-12 mx-auto">
         <UserFeedbackModal open={true} />
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
               <NotesVisibilityFilter />
               <NotesTagsFilter tags={allTags} />
            </Row>
            <Row className={`gap-4 !w-fit`}>
               <ImportNotesButton />
               <BulkExportNotesButton notes={myNotes} />
               {showGoogleDriveUploadFeature && (
                  <UploadToGoogleDriveButton notes={myNotes} />
               )}
            </Row>
         </div>
         {myNotes.length === 0 ? (
            <NotesEmptyState />
         ) : (
            <NotesSection categories={categories} notes={myNotes} />
         )}
         <div className={`w-full flex justify-center items-center mt-4`}>
            <div>Total: {total}</div>
            <Pagination>
               <PaginationContent>
                  <PaginationItem>
                     <PaginationPrevious href={page === 1 ? `#` : `?page=${page - 1}`} />
                  </PaginationItem>
                  <PaginationItem>
                     <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                     <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                     <PaginationNext href={`?page=${page + 1}`} />
                  </PaginationItem>
               </PaginationContent>
            </Pagination>
         </div>
      </section>
   );
};

export default Page;