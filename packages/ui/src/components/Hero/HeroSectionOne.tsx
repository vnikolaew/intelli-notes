"use client";
import React from "react";
import Lottie from "lottie-react";
import animation from "./Hero Section.json";
import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";

export interface HeroSectionOneProps {
   appName: string;
}

export const HeroSectionOne = ({appName}: HeroSectionOneProps) => {
   return (
      <section className="text-gray-600 body-font">
         <div className="container mx-auto flex px-5 py-20 items-center justify-center flex-col">
            <Lottie
               className={`!max-w-[500px]`}
               aria-labelledby={`Hero Section animation`}
               animationData={animation} loop />
            <div className="text-center lg:w-2/3 w-full">
               <h1 className="title-font sm:text-4xl text-3xl mb-4 font-semibold dark:text-neutral-300 mt-4 text-neutral-800">
                  Transform Your Business with Our Cutting-Edge SaaS Solutions
               </h1>
               <p className="mb-8 !mt-6 leading-relaxed dark:text-neutral-400 text-neutral-600">
                  Streamline operations, boost productivity, and drive growth with our intuitive SaaS platform. Perfect
                  for startups and enterprises, enjoy seamless integration, real-time analytics, and 24/7 support.
                  Experience the future of business management today.
               </p>
               <ul className={`!w-fit mx-auto flex flex-col gap-1`}>
                  <li className={`inline-flex gap-1 items-center dark:text-neutral-300 text-neutral-500 text-base`}>
                     <Check className={`text-green-500`} size={18} />
                     Feature 1
                  </li>
                  <li className={`inline-flex gap-1 items-center dark:text-neutral-300 text-neutral-500 text-base`}>
                     <Check className={`text-green-500`} size={18} />
                     Feature 2
                  </li>
                  <li className={`inline-flex gap-1 items-center dark:text-neutral-300 text-neutral-500 text-base`}>
                     <Check className={`text-green-500`} size={18} />
                     Feature 3</li>
               </ul>
               <div className="flex justify-center">
                  <button
                     className="inline-flex text-white bg-cta-button border-0 !py-3 px-8 focus:outline-none hover:bg-blue-600 rounded-lg text-lg mt-12 hover:shadow-xl transition-all duration-200 items-center gap-2 group">
                     <Link className={`text-base`} href={`#pricing`}>
                        Get {appName}
                     </Link>
                     <ChevronRight className={`group-hover:translate-x-1 transition-transform duration-200`} size={20} />
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
};