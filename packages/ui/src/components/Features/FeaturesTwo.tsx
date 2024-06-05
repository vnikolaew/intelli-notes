"use client";
import React, { ReactNode } from "react";
import AnimatedComponent from "../common/AnimatedComponent";
import { motion } from "framer-motion";
import { cn } from "../Pricing";
import { SparklesCore } from "../common/sparkles";

export interface FeaturesTwoProps {
   features: Feature[];
}

export interface Feature {
   title: string;
   description: string;
   icon?: ReactNode;
}


export const TextWithSparkles = ({ text, className, ...props }: {
   text: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
   <div
      className="h-fit w-fit flex flex-col items-center justify-center overflow-auto rounded-md">
      <h1 className={cn("md:text-2xl text-xl lg:text-3xl font-semibold text-center text-black relative z-20", className)} {...props}>
         {text}
      </h1>
      <div className="w-full h-4 relative">
         {/* Gradients */}
         <div
            className="absolute -translate-x-1/2 left-1/2 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
         <div
            className="absolute -translate-x-1/2 left-1/2 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
         <div
            className=" absolute -translate-x-1/2 left-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
         <div
            className="absolute -translate-x-1/2 left-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

         {/* Core component */}
         <SparklesCore
            background="red"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-2/3 h-full mx-auto !z-[30]"
            particleColor="#1d4ed8"
         />

         {/* Radial Gradient to prevent sharp edges */}
         <div
            className="absolute inset-0 w-full h-full [mask-image:radial-gradient(150px_100px_at_top,transparent_20%,white)]"></div>
      </div>
   </div>
);


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
                     <div
                        className={cn("flex-grow sm:text-left text-center mt-6 sm:mt-0", index % 2 === 1 && `!text-left`)}>
                        <div className="text-neutral-700 text-3xl title-font mb-2">
                           <TextWithSparkles text={feature.title} />
                        </div>
                        <p className="leading-6 text-base mt-4 text-neutral-500">
                           {feature.description}
                        </p>
                        {/*<Link href={`/`} className="mt-6 text-blue-500 inline-flex items-center">*/}
                        {/*   Learn More*/}
                        {/*   <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
                        {/*        strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">*/}
                        {/*      <path d="M5 12h14M12 5l7 7-7 7"></path>*/}
                        {/*   </svg>*/}
                        {/*</Link>*/}
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