"use client"
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";
import { cn } from "../Pricing";
import DotPattern from "../common/dot-pattern";
import { useTranslation } from "react-i18next";

export interface FaQ {
   question: string;
   answer: string;
}

export interface FaqOneProps {
   faqs: FaQ[];
}

export const FaqOne = ({ faqs }: FaqOneProps) => {
   const { t} = useTranslation()

   return (
      <section id={`faq`} className="w-full body-font mt-20 flex items-start justify-center gap-48 mx-auto relative">
         <DotPattern
            className={cn(
               "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] inset-y-20",
            )}
         />
         <div className={`flex flex-col items-start gap-4`}>
            <h2 className={cn(`text-blue-500 text-lg font-bold`,
               `bg-gradient-to-r from-blue-500 to-blue-900 inline-block text-transparent bg-clip-text`)}>FAQ</h2>
            <h3 className={`font-semibold text-3xl dropshadow-md`}>
               {t(`Index.FAQ`)}
            </h3>
         </div>
         <div>
            <Accordion type="single" collapsible>
               {faqs.map(({ question, answer }, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                     <AccordionTrigger className="!w-[400px] hover:!no-underline group">
                        <span
                           className={`cursor-pointer text-left text-lg group-data-[state=open]:test-gradient transition duration-200`}>
                           {question}
                        </span>
                     </AccordionTrigger>
                     <AccordionContent className="text-base max-w-[400px] text-wrap mt-2">
                        {answer}
                     </AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>
         </div>
      </section>
   );
};