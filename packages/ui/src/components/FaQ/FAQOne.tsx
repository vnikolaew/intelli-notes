import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

export interface FaqOneProps {
}

export const FaqOne = ({}: FaqOneProps) => {
   return (
      <section className="w-full body-font mt-20 flex items-start justify-center gap-48 mx-auto">
         <div className={`flex flex-col items-start gap-4`}>
            <h2 className={`text-blue-500 text-lg font-bold`}>FAQ</h2>
            <h3 className={`font-semibold text-2xl`}>
               Frequently Asked Questions
            </h3>
         </div>
         <div>
            <Accordion type="single" collapsible>
               {Array.from({ length: 6 }).map((_, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                     <AccordionTrigger className="!w-[400px] hover:!no-underline group">
                        <span className={`cursor-pointer text-xl group-data-[state=open]:text-blue-500 transition duration-200`}>
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