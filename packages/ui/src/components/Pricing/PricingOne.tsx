import React, { ReactNode } from "react";
import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export interface PricingOneProps {
   appName: string;
   pricingPlans : {
      Free: string;
      Regular: string;
      Premium: string;
   }
}

interface PricingCardProps {
   planName: string;
   appName: string;
   price: ReactNode;
   features: string[];
   isBestBuy?: boolean;
   paymentLink : string
}

const PricingCard = ({ price, paymentLink, appName, features, planName, isBestBuy }: PricingCardProps) => {
   return (
      <div className={cn(`rounded-lg p-8 flex flex-col items-start shadow-md bg-neutral-100/60 relative dark:bg-neutral-700/50`,
         isBestBuy && `border-[1.5px] border-blue-500`)}>
         {isBestBuy && (
            <div
               className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pricing text-white px-8 py-.5 rounded-full`}>
               Best Option
            </div>
         )}
         <h2 className={`uppercase text-lg text-neutral-500 font-semibold dark:text-neutral-300`}>{planName}</h2>
         <h3 className={`text-neutral-700 text-4xl mt-2 font-semibold dark:text-neutral-500`}>
            {price}
         </h3>

         <ul className={`!w-fit mr-auto flex flex-col gap-2 my-8 !mb-12`}>
            {features.map((feature, i) => (
               <li key={feature + i}
                   className={`inline-flex gap-1 items-center dark:text-neutral-300 text-neutral-500 text-base`}>
                  <Check className={`text-green-500 shadow-md`} size={18} />
                  {feature}
               </li>
            ))}
         </ul>
         <button
            className="inline-flex text-white bg-cta-button border-0 !py-3 px-12 focus:outline-none hover:bg-blue-600 rounded-lg text-base mt-auto hover:shadow-xl transition-all duration-200 items-center gap-2 group mx-2">
            <Link className={`text-sm`} href={paymentLink} target={"_self"}>
               Get {appName}
            </Link>
            <ChevronRight className={`group-hover:translate-x-1 transition-transform duration-200`} size={20} />
         </button>
         <span className={`w-full mt-1 text-center text-sm text-muted-foreground`}>Plan description</span>
      </div>
   );

};

export const PricingOne = ({ appName, pricingPlans }: PricingOneProps) => {
   return (
      <div id={`pricing`} className={`flex flex-col items-center gap-4 w-full mx-auto mt-24`}>
         <h1 className={`text-2xl font-bold`}>Headline</h1>
         <p className={`leading-relaxed text-base text-neutral-500 mt-4`}>
            Description
         </p>
         <div className={`mx-auto grid grid-cols-3 w-fit gap-8 mt-8`}>
            <PricingCard
               paymentLink={pricingPlans.Free}
               planName={`Start`}
               appName={appName}
               price={`Free`}
               features={Array.from({ length: 3 }).map((_, i) => `Feature ${i + 1}`)} />

            <PricingCard
               planName={`Regular`}
               paymentLink={pricingPlans.Regular}
               appName={appName}
               isBestBuy
               price={
                  <div className={`flex items-center gap-1`}>
                     <h3 className={`text-neutral-700 text-4xl mt-2 font-semibold dark:text-neutral-300`}>$19</h3>
                     <span className={`text-muted-foreground text-base dark:text-neutral-500`}>/mo</span>
                  </div>
               }
               features={Array.from({ length: 4 }).map((_, i) => `Feature ${i + 1}`)} />

            <PricingCard
               planName={`Premium`}
               paymentLink={pricingPlans.Premium}
               appName={appName}
               price={
                  <div className={`flex items-center gap-1`}>
                     <h3 className={`text-neutral-700 text-4xl mt-2 font-semibold dark:text-neutral-300`}>$39</h3>
                     <span className={`text-muted-foreground text-base dark:text-neutral-500`}>/mo</span>
                  </div>
               }
               features={Array.from({ length: 5 }).map((_, i) => `Feature ${i + 1}`)} />
         </div>

      </div>
   );
};
