import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface CtaSectionOneProps {
   appName: string;
}

export const CtaSectionOne = ({appName}: CtaSectionOneProps) => {
   return (
      <section className="w-full body-font mt-32 flex flex-col items-center justify-center gap-8 mx-auto">
         <h2 className="text-4xl font-bold leading-tight">
            Header
         </h2>
         <h3 className="text-xl font-normal leading-tight text-neutral-500">
            Description
         </h3>
         <button
            className="inline-flex text-white bg-gradient-to-r from-blue-500 to-blue-900 border-0 !py-3 px-12 focus:outline-none hover:bg-blue-600 rounded-lg text-base mt-12 hover:shadow-xl transition-all duration-200 items-center gap-2 group mx-2">
            <Link className={`text-lg`} href={`#pricing`}>
               Get {appName}
            </Link>
            <ChevronRight className={`group-hover:translate-x-1 transition-transform duration-200`} size={20} />
         </button>
      </section>
   );
};