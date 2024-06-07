import React from "react";
import { cn } from "lib/utils";
import NotFoundAnimation from "components/common/NotFoundAnimation";
import { InteractiveLink } from "@repo/ui/components";
import { ArrowRight } from "lucide-react";

export interface NotFoundProps {
}

const NotFound = ({}: NotFoundProps) => {
   return (
      <section className={cn(`flex flex-col items-center p-12 min-h-[70vh] gap-4 font-sans w-full justify-center`)}>
         <NotFoundAnimation />
         <h1
            className="text-2xl md:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-800 bg-opacity-50 tracking-tighter max-w-[700px] text-wrap">
            Oops! Note not found. <br />
         </h1>

         <h2
            className="text-xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-800 bg-opacity-50 tracking-tighter max-w-[700px] text-wrap"
         >
            It looks like the note you're looking for doesn't exist. Please check the URL again or go back
            to <InteractiveLink className={`test-gradient`} underlineClassname={`bg-blue-700`} href={`/notes`}>
            your notes.
         </InteractiveLink>
         </h2>
         <InteractiveLink
            underlineClassname={`bg-black`} className={`inline-flex gap-2 items-center mt-8 text-lg`}
            href={`/`}>
            Go back home <ArrowRight size={22} />
         </InteractiveLink>
      </section>
   );
};

export default NotFound;