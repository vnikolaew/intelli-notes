import Lottie from "lottie-react";
import emptyState from "@/public/explore-page-empty-state.json";
import { InteractiveLink } from "@repo/ui/components";
import { PenLine } from "lucide-react";
import React from "react";

export const ExplorePageEmptyState = () => (

   <div className={`w-full items-center flex flex-col justify-center gap-4 col-span-3 text-center min-h-[50vh]`}>
      <Lottie className={`w-[300px]`} animationData={emptyState} />
      <h2 className={`text-3xl w-full inline-block drop-shadow-md `}>Nothing to Explore Yet!</h2>
      <p className={`max-w-[500px] text-wrap mt-4`}>It looks like there aren't any notes to explore right now. Check
         back later to see what others are
         sharing, or be the first to contribute your own amazing notes!</p>
      <InteractiveLink underlineClassname={`bg-blue-700 h-[1.5px]`} href="/write"
                       className="inline-flex items-center gap-3 mt-8 test-gradient">
         <PenLine className={`stroke-[2px] text-blue-700`} size={18} />
         Create a new note
      </InteractiveLink>
   </div>
);