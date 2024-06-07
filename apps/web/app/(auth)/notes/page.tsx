import React from "react";
import { auth } from "auth";
import { redirect } from "next/navigation";
import { PublicNotesFilter, xprisma } from "@repo/db";
import { Separator } from "components/ui/separator";
import { PenLine, Sparkles, StickyNote } from "lucide-react";
import Link from "next/link";
import NotesSearchInput from "./_components/NotesSearchInput";
import { NotesHeader } from "./_components/notes/NotesHeader";
import { NotesTagsFilter } from "./_components/NotesTagsFilter";
import BulkExportNotesButton from "./_components/buttons/BulkExportNotesButton";
import { NotesVisibilityFilter } from "./_components/NotesVisibilityFilter";
import { Row } from "@repo/ui/components";
import { ImportNotesButton } from "./_components/buttons/ImportNotesButton";
import {
   Pagination,
   PaginationContent, PaginationEllipsis,
   PaginationItem,
   PaginationLink, PaginationNext,
   PaginationPrevious,
} from "components/ui/pagination";
import NotesSection from "./_components/notes/NotesSection";
import UploadToGoogleDriveButton from "./_components/buttons/UploadToGoogleDriveButton";
import UserFeedbackModal from "components/modals/UserFeedbackModal";
import { getReferer } from "lib/utls.server";
import ShimmerButton from "components/ui/shimmer-button";
import { cookies } from "next/headers";
import { USER_SUBMITTED_FEEDBACK_COOKIE_NAME } from "lib/consts";

export interface PageProps {
   searchParams: { page?: number, public?: string; tags?: string, view?: string };
}


const showFeedbackModal = async () => {
   let referer = await getReferer();
   if (referer) {
      try {
         return new URL(referer[1])?.pathname === `/write`;
      } catch (e) {
         return false;
      }
   }


   return false;
};

function NotesEmptyState() {
   return <div className={`w-full flex items-center justify-center flex-col mt-12 gap-2`}>
      <StickyNote className={``} size={40} />
      <span className={`text-muted-foreground text-lg`}>
         You haven't written anything yet.
      </span>
   </div>;
}


export const dynamic = `force-dynamic`;

const Page = async ({ searchParams }: PageProps) => {
   const session = await auth();
   if (!session) redirect(`/`);

   const page = Math.max(Number(searchParams.page ?? 0), 1);
   const viewingPublic = searchParams.public === `true`
      ? PublicNotesFilter.PUBLIC : searchParams.public === `false`
         ? PublicNotesFilter.PRIVATE : PublicNotesFilter.ALL;
   const tags = (searchParams.tags?.split(`,`)) ?? [];

   const { notes: myNotes, total } = await xprisma.user.notes({
         userId: session.user?.id,
         take: 10000,
         filters: {
            tags, publicity: viewingPublic,
         },
      },
   );

   const categories = await xprisma.noteCategory.findMany({
      where: {
         userId: session?.user?.id,
      },
   });
   const allTags = [...new Set(myNotes.flatMap(n => n.tags))];
   const showGoogleDriveUploadFeature = !!session.accessToken && !!session.refreshToken;

   let hasUserSubmittedFeedback = cookies().get(USER_SUBMITTED_FEEDBACK_COOKIE_NAME)?.value === `1`;
   const show = !hasUserSubmittedFeedback && await showFeedbackModal();

   return (
      <section className="flex flex-col items-start gap-4 mt-24 w-3/4 px-12 mx-auto">
         <UserFeedbackModal open={show} />
         <Row className={``}>
            <NotesHeader notes={myNotes} />
            <Row className={`!w-fit gap-6`}>
               <NotesSearchInput />
               <Link href={`/write`}>
                  <ShimmerButton
                     shimmerDuration={`1.5s`}
                     shimmerSize={`0.15em`}
                     borderRadius={`.5rem`}
                     shimmerColor={`var(--neutral-300)`}
                     background={`black`}
                     className="!shadow-md !bg-black !px-3 !py-1.5 hover:opacity-80 transition-opacity duration-200">
                 <span
                    className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-base inline-flex items-center gap-2">
                     <PenLine size={16} />
                     <span className={`font-normal text-base`}>New note</span>
                 </span>
                  </ShimmerButton>
               </Link>
               <Link href={`/notes/ask`}>
                  <ShimmerButton
                     shimmerDuration={`1.5s`}
                     shimmerSize={`0.15em`}
                     borderRadius={`.5rem`}
                     shimmerColor={`var(--blue-700)`}
                     background={`white`}
                     className="!shadow-md !bg-white !px-3 !py-1.5 hover:opacity-80 transition-opacity duration-200">
                 <span
                    className="whitespace-pre-wrap test-gradient text-center text-sm font-medium leading-none tracking-tight dark:from-white dark:to-slate-900/10 lg:text-base inline-flex items-center gap-2">
                     <Sparkles className={`text-blue-500`} size={16} />
                   Ask AI
                 </span>
                  </ShimmerButton>
               </Link>
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