import React from "react";
import { Separator } from "components/ui/separator";
import { ArrowRight, Sparkles } from "lucide-react";
import AiChat from "./_components/AIChat";
import { InteractiveLink } from "@repo/ui/components";
import AiChatSidebar from "./_components/AiChatSidebar";
import { auth } from "auth";
import { notFound, redirect } from "next/navigation";
import { fillSystemMessagesWithNotes, getCurrentChat, getSortedUserChatHistories } from "../_queries";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export interface PageProps {
   searchParams: { chatId?: string, new?: string };
}

const DESCRIPTION = `Use AI to retrieve information about your current notes.`;

export const dynamic = `force-dynamic`

const Page = async ({ searchParams }: PageProps) => {
   const session = await auth();

   const sortedChatHistories = await getSortedUserChatHistories();
   let { chatHistory } = await getCurrentChat(
      sortedChatHistories,
      session?.user?.id,
      searchParams?.chatId,
      searchParams?.new === `true`);
   console.log({ messages: chatHistory.messages });

   if(!chatHistory) return notFound()
   if (chatHistory.id !== searchParams.chatId){
      redirect(`/notes/ask?chatId=${chatHistory.id}`);
   }

   // Now fetch all notes that are embedded as assistant answers:
   chatHistory = await fillSystemMessagesWithNotes(chatHistory)

   return (
      <section className={`w-4/5 grid grid-cols-5 mt-24 mx-auto gap-4`}>
         <div className={`col-span-1`}>
            <AiChatSidebar chatId={chatHistory.id} chatHistories={sortedChatHistories} />
         </div>
         <section className="flex flex-col items-start gap-2 max-w-[1200px] p-4 col-span-4 w-full  !rounded-r-lg relative">
            <DotPattern
               className={cn(
                  "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] inset-y-1/2 -translate-y-1/2",
               )}
            />
            <div className={`flex items-center w-full justify-between`}>
               <h2 className={`text-3xl font-semibold drop-shadow-md flex items-center gap-3`}>
                  <Sparkles className={`text-blue-500`} size={22} />
                  <span>
               Ask AI
            </span>
               </h2>
               <div>
                  <InteractiveLink
                     underlineClassname={`bg-black`}
                     className={`inline-flex items-center gap-2`}
                     href={`/notes`}>
                     Go back
                     <ArrowRight size={14} />
                  </InteractiveLink>
               </div>
            </div>
            <span className={`text-neutral-500`}>{DESCRIPTION}</span>
            <Separator orientation={`horizontal`} className={`w-2/5 mt-0 text-neutral-700 bg-neutral-300 shadow-lg`} />
            <AiChat chatHistory={chatHistory} />
         </section>
      </section>
   );
};

export default Page;