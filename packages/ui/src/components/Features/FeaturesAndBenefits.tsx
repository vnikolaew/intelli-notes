import React from "react";
import { Check, X } from "lucide-react";

export interface FeaturesAndBenefitsProps {
}

export const FeaturesAndBenefits = ({}: FeaturesAndBenefitsProps) => {
   return (
      <section className="w-full body-font mt-16 flex flex-col items-center">
         <h2 className={`text-3xl font-bold`}>
            Struggling with Inefficiency and Missed Opportunities?
         </h2>
         <div className={`grid grid-cols-1 md:grid-cols-2 w-2/3 gap-12 mt-16`}>
            <div className={`bg-red-200 rounded-md p-8 text-red-700 shadow-sm opacity-80 max-w-[600px]`}>
               <h2 className={`font-bold text-base`}>
                  Pain points
               </h2>
               <ul className={`!w-fit flex flex-col gap-2 mt-4`}>
                  <li
                     className={`inline-flex gap-1 items-center  text-red-700 text-sm font-semibold`}>
                     <X className={`text-red-500`} size={16} />
                     Pain point 1
                  </li>
                  <li
                     className={`inline-flex gap-1 items-center  text-red-700 text-sm font-semibold`}>
                     <X className={`text-red-500`} size={16} />
                     Pain point 2
                  </li>
                  <li
                     className={`inline-flex gap-1 items-center  text-red-700 text-sm font-semibold`}>
                     <X className={`text-red-500`} size={16} />
                     Pain point 3
                  </li>
               </ul>
            </div>
            <div className={`bg-green-200 rounded-md p-8 text-green-700 shadow-sm opacity-80 max-w-[600px]`}>
               <h2 className={`font-bold text-base`}>
                  Benefits
               </h2>
               <ul className={`!w-fit flex flex-col gap-2 mt-4`}>
                  <li
                     className={`inline-flex gap-1 items-center text-green-700 text-sm font-semibold`}>
                     <Check className={`text-green-500`} size={16} />
                     Benefit 1
                  </li>
                  <li
                     className={`inline-flex gap-1 items-center text-green-700 text-sm font-semibold`}>
                     <Check className={`text-green-500`} size={16} />
                     Benefit 2
                  </li>
                  <li
                     className={`inline-flex gap-1 items-center text-green-700 text-sm font-semibold`}>
                     <Check className={`text-green-500`} size={16} />
                     Benefit 3
                  </li>
               </ul>
            </div>

         </div>

      </section>
   );
};