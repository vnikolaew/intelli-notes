"use client"
import React, { ReactNode } from "react";
import Link from "next/link";
import AnimatedComponent from "../common/AnimatedComponent";
import { motion } from "framer-motion";
import { cn } from "../Pricing";

export interface FeaturesTwoProps {
   features: Feature[];
}

export interface Feature {
   title: string;
   description: string;
   icon?: ReactNode;
}

export const FeaturesTwo = ({ features }: FeaturesTwoProps) => {
   return (
      <section id={`features`} className="text-gray-400 body-font">
         <div className="container px-5 py-24 mx-auto">
            {features.map((feature, index) => (
               <AnimatedComponent
                  key={index}
                  initial={{ opacity: 0, translateX: -60 }}
                  animate={{ opacity: 1, translateX: 0 }}
               >
                  <div
                     key={index}
                     className="flex items-center lg:w-4/5 mx-auto pb-8 mb-2 sm:flex-row flex-col gap-12 mt-12">
                     {index % 2 === 0 && (
                        <motion.div
                           initial={{ translateY: 0 }}
                           animate={{ translateY: -10 }}
                           // exit={{ translateY: 0 }}
                           transition={{ duration: .8, repeat: 100, repeatType: `reverse`, type: `spring` }}
                           className="sm:w-32 sm:h-32 h-20 w-20  inline-flex items-center justify-center rounded-full text-indigo-400 bg-gray-800 flex-shrink-0 shadow-lg">
                           {feature.icon ?? (
                              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                   strokeWidth="2"
                                   className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
                                 <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                              </svg>
                           )}
                        </motion.div>
                     )}
                     <div className={cn("flex-grow sm:text-left text-center mt-6 sm:mt-0", index % 2 === 1 && `!text-left`)}>
                        <h2 className="text-neutral-700 text-3xl title-font font-medium mb-2 drop-shadow-md">
                           {feature.title}
                        </h2>
                        <p className="leading-6 text-base mt-4 text-neutral-500">
                           {feature.description}
                        </p>
                        <Link href={`/`} className="mt-6 text-blue-500 inline-flex items-center">
                           Learn More
                           <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                              <path d="M5 12h14M12 5l7 7-7 7"></path>
                           </svg>
                        </Link>
                     </div>
                     {index % 2 === 1 && (
                        <motion.div
                           initial={{ translateY: 0 }}
                           animate={{ translateY: -10 }}
                           // exit={{ translateY: 0 }}
                           transition={{ duration: 1, repeat: 100, repeatType: `reverse`, type: `spring` }}
                           className="sm:w-32 sm:h-32 h-20 w-20 inline-flex items-center justify-center rounded-full text-indigo-400 bg-gray-800 flex-shrink-0">
                           {feature.icon ?? (
                              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                   strokeWidth="2"
                                   className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
                                 <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                              </svg>
                           )}
                        </motion.div>
                     )}
                  </div>
                  <div className={`w-2/3 mx-auto h-[1px] bg-neutral-300`} />
               </AnimatedComponent>
            ))}
         </div>
      </section>
   );
};