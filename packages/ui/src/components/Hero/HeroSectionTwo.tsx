"use client"
import Lottie from "lottie-react";
import React from "react";
import animation from "./Hero Section.json";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import InteractiveLink from "../common/InteractiveLink";

export interface HeroSectionTwoProps {
   appName: string;
}

export const HeroSectionTwo = ({appName}: HeroSectionTwoProps) => {
   return (
      <section className="text-gray-400 body-font">
         <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div
               className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
               <h1 className="title-font sm:text-4xl text-3xl mb-4 dark:text-neutral-200 mt-4 text-neutral-800 font-bold ">Transform Your Business
                  <br className="hidden lg:inline-block" /> with Our Cutting-Edge SaaS Solutions
               </h1>
               <p className="mb-8 leading-relaxed dark:text-neutral-400 text-neutral-600">
                  Streamline operations, boost productivity, and drive growth with our intuitive SaaS platform. Perfect
                  for startups and enterprises, enjoy seamless integration, real-time analytics, and 24/7 support.
                  Experience the future of business management today.
               </p>
               <div className="flex justify-center items-center mt-8 gap-8">
                  <button
                     className="inline-flex text-white bg-cta-button border-0 !py-3 px-8 focus:outline-none hover:bg-blue-600 rounded-lg text-lg hover:shadow-xl transition-all duration-200 items-center gap-2 group bg-gradient-to-r from-blue-500 to-blue-900">
                     <Link className={`text-base`} href={`#pricing`}>
                        Get {appName}
                     </Link>
                     <ChevronRight className={`group-hover:translate-x-1 transition-transform duration-200`} size={20} />
                  </button>
                  <InteractiveLink underlineClassname={`bg-blue-500`} className={`text-blue-500`} href={`/#features`}>Read more -></InteractiveLink>
               </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
               <Lottie
                  className={`!max-w-[500px]`}
                  aria-labelledby={`Hero Section animation`}
                  animationData={animation} loop />
            </div>
         </div>
      </section>
   );
};