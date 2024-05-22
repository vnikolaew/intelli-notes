import React from "react";
import { Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";

export interface TestimonialProps {
   user: {
      image: StaticImageData;
      name: string;
   }
}

export const TestimonialOne = ({ user: {image, name} }: TestimonialProps) => {
   return (
      <div className={`flex flex-col items-center gap-4`}>
         <div className={`flex items-center gap-1`}>
            {Array.from({ length: 5 }).map((_, i) => (
               <Star className={`fill-amber-500 text-amber-500`} size={18} />
            ))}
         </div>
         <p className={`leading-relaxed text-base`}>
            Testimonial text ...
         </p>
         <div className={`flex items-center gap-4 mt-2`}>
            <Image height={32} width={32} className={`rounded-full shadow-md !h-12 !w-12 !object-cover`} src={image} alt={`User 1`} />
            <h2 className={`font-semibold text-base`}>{name}</h2>
         </div>

      </div>
   );
};