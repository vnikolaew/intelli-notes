import React from "react";
import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";

export interface PricingOneProps {
   appName: string;
}

export const PricingOne = ({ appName }: PricingOneProps) => {
   return (
      <div className={`flex flex-col items-center gap-4 w-full mx-auto mt-24`}>
         <h1 className={`text-2xl font-bold`}>Headline</h1>
         <p className={`leading-relaxed text-base text-neutral-500 mt-4`}>
            Description
         </p>
         <div className={`mx-auto grid grid-cols-3 w-fit gap-6 mt-8`}>
            <div className={`rounded-md p-8 flex flex-col items-start shadow-md bg-neutral-100/60`}>
               <h2 className={`uppercase text-lg text-neutral-500`}>Start</h2>
               <h3 className={`text-neutral-700 text-4xl mt-2 font-semibold`}>Free</h3>

               <ul className={`!w-fit mr-auto flex flex-col gap-1 mt-8`}>
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
                     Feature 3
                  </li>
               </ul>
               <button
                  className="inline-flex text-white bg-blue-500 border-0 !py-3 px-12 focus:outline-none hover:bg-blue-600 rounded-lg text-base mt-auto hover:shadow-xl transition-all duration-200 items-center gap-2 group mx-2">
                  <Link className={`text-sm`} href={`#pricing`}>
                     Get {appName}
                  </Link>
                  <ChevronRight className={`group-hover:translate-x-1 transition-transform duration-200`} size={20} />
               </button>
               <span className={`w-full mt-1 text-center text-sm text-muted-foreground`}>Plan description</span>
            </div>
            <div className={`rounded-md p-8 flex flex-col items-start shadow-md bg-neutral-100`}>
               <h2 className={`uppercase text-lg text-neutral-500`}>Regular</h2>
               <div className={`flex items-center gap-1`}>
                  <h3 className={`text-neutral-700 text-4xl mt-2 font-semibold`}>$19</h3>
                  <span className={`text-muted-foreground text-base`}>/mo</span>
               </div>
               <ul className={`!w-fit mr-auto flex flex-col gap-1 mt-8`}>
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
                     Feature 3
                  </li>
                  <li className={`inline-flex gap-1 items-center dark:text-neutral-300 text-neutral-500 text-base`}>
                     <Check className={`text-green-500`} size={18} />
                     Feature 4
                  </li>
               </ul>
               <button
                  className="inline-flex text-white bg-blue-500 border-0 !py-3 px-12 focus:outline-none hover:bg-blue-600 rounded-lg text-base hover:shadow-xl transition-all duration-200 items-center gap-2 group mx-2 mt-auto">
                  <Link className={`text-sm`} href={`#pricing`}>
                     Get {appName}
                  </Link>
                  <ChevronRight className={`group-hover:translate-x-1 transition-transform duration-200`} size={20} />
               </button>
               <span className={`w-full mt-1 text-center text-sm text-muted-foreground`}>Plan description</span>
            </div>
            <div className={`rounded-md p-8 flex flex-col items-start shadow-md bg-neutral-100`}>
               <h2 className={`uppercase text-lg text-neutral-500`}>Pro</h2>
               <div className={`flex items-center gap-1`}>
                  <h3 className={`text-neutral-700 text-4xl mt-2 font-semibold`}>$39</h3>
                  <span className={`text-muted-foreground text-base`}>/mo</span>
               </div>
               <ul className={`!w-fit mr-auto flex flex-col gap-1 mt-8`}>
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
                     Feature 3
                  </li>
                  <li className={`inline-flex gap-1 items-center dark:text-neutral-300 text-neutral-500 text-base`}>
                     <Check className={`text-green-500`} size={18} />
                     Feature 4
                  </li>
                  <li className={`inline-flex gap-1 items-center dark:text-neutral-300 text-neutral-500 text-base`}>
                     <Check className={`text-green-500`} size={18} />
                     Feature 5
                  </li>
               </ul>
               <button
                  className="inline-flex text-white bg-blue-500 border-0 !py-3 px-12 focus:outline-none hover:bg-blue-600 rounded-lg text-base mt-12 hover:shadow-xl transition-all duration-200 items-center gap-2 group mx-2">
                  <Link className={`text-sm`} href={`#pricing`}>
                     Get {appName}
                  </Link>
                  <ChevronRight className={`group-hover:translate-x-1 transition-transform duration-200`} size={20} />
               </button>
               <span className={`w-full mt-1 text-center text-sm text-muted-foreground`}>Plan description</span>
            </div>
         </div>

      </div>
   );
};
