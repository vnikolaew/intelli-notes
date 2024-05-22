import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";
import { cn } from "../Pricing";

export interface FaqOneProps {
}

export const FaqOne = ({}: FaqOneProps) => {
   return (
      <section id={`faq`} className="w-full body-font mt-20 flex items-start justify-center gap-48 mx-auto">
         <div className={`flex flex-col items-start gap-4`}>
            <h2 className={cn(`text-blue-500 text-lg font-bold`,
               `bg-gradient-to-r from-blue-500 to-blue-900 inline-block text-transparent bg-clip-text`)}>FAQ</h2>
            <h3 className={`font-semibold text-3xl dropshadow-md`}>
               Frequently Asked Questions
            </h3>
         </div>
         <div>
            <Accordion type="single" collapsible>
               {Array.from({ length: 6 }).map((_, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                     <AccordionTrigger className="!w-[400px] hover:!no-underline group">
                        <span className={`cursor-pointer text-lg group-data-[state=open]:test-gradient transition duration-200`}>
                           Question {i + 1}
                        </span>
                     </AccordionTrigger>
                     <AccordionContent className="text-base">
                        Answer {i + 1}
                     </AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>
         </div>
      </section>
   );
};