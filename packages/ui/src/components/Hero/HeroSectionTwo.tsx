"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { NotebookPen } from "lucide-react";
import { motion } from "framer-motion";
import { MovingBorderButton } from "../common/moving-border";
import DotPattern from "../common/dot-pattern";
import { cn } from "../Pricing";
import { useTranslation } from "react-i18next";

export interface HeroSectionTwoProps {
   appDescription: string | ReactNode;
   heroLogo?: ReactNode;
}

export const HeroSectionTwo = ({ appDescription, heroLogo }: HeroSectionTwoProps) => {
   const { t } = useTranslation();

   return (
      <section className="text-gray-400 body-font">
         <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <DotPattern
               className={cn(
                  "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] inset-y-16",
               )}
            />
            <div
               className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
               <motion.h1
                  initial={{ translateX: -60, opacity: 0 }}
                  animate={{ translateX: 0, opacity: 100 }}
                  transition={{ duration: 0.4, delay: 1, type: `tween` }}
                  className="title-font sm:text-4xl text-3xl mb-4 dark:text-neutral-200 mt-4 text-neutral-800 font-bold ">
                  {appDescription}
               </motion.h1>
               <motion.p
                  initial={{ translateX: -60, opacity: 0 }}
                  animate={{ translateX: 0, opacity: 100 }}
                  transition={{ duration: 0.4, delay: 1.6 }}
                  className="mb-8 leading-relaxed dark:text-neutral-400 text-neutral-600 text-lg">
                  Where smart technology meets seamless organization.
               </motion.p>
               <div className="flex justify-center items-center mt-8 gap-8">
                  <MovingBorderButton
                     duration={3000}
                     borderRadius={`0.75rem`}
                     className={`!bg-transparent !border-none flex items-center gap-4 text-neutral-700 !px-8 !py-3 !font-semibold !text-xl`}
                     containerClassName={`!rounded-lg !w-fit !bg-transparent !text-xl`}>
                     <NotebookPen size={18} />
                     <Link className={`text-lg`} href={`/write`}>
                        {t(`Index.HeroCTA`)}
                     </Link>
                  </MovingBorderButton>
               </div>
            </div>
            <motion.div
               initial={{ translateY: 120, opacity: 0 }}
               animate={{ translateY: 0, opacity: 100 }}
               transition={{ duration: 1, delay: 2, type: `spring` }}
               className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 flex items-center justify-center">
               {heroLogo
               }
            </motion.div>
         </div>
      </section>
   );
};