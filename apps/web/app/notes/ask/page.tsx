"use client"
import React from "react";
import { Separator } from "components/ui/separator";
import { Sparkles } from "lucide-react";
import AiChat from "./_components/AIChat";

export interface PageProps {
}

const Page = ({}: PageProps) => {
   return (
      <section className="flex flex-col items-start gap-4 mt-24 w-3/4 px-12 mx-auto">
         <h2 className={`text-3xl font-semibold drop-shadow-md flex items-center gap-3`}>
            <Sparkles className={`text-blue-500`} size={22} />
            <span>
               Ask AI
            </span>
         </h2>
         <Separator orientation={`horizontal`} className={`w-2/5 mt-0 text-neutral-700 bg-neutral-300 shadow-lg`} />
         <AiChat />
      </section>
   );
};

export default Page;