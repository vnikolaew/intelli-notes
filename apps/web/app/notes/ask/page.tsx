"use client";
import React from "react";
import { Separator } from "components/ui/separator";
import { ArrowRight, Sparkles } from "lucide-react";
import AiChat from "./_components/AIChat";
import { InteractiveLink } from "@repo/ui/components";

export interface PageProps {
}

const DESCRIPTION = `Use AI to retrieve information about your current notes.`;

const Page = ({}: PageProps) => {
   return (
      <section className="flex flex-col items-start gap-2 mt-24 w-3/4 max-w-[1200px] px-12 mx-auto">
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
         <AiChat />
      </section>
   );
};

export default Page;