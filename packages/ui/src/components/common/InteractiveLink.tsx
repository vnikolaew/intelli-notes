"use client";
import Link from "next/link";
import React from "react";
import { UrlObject } from "url";
import { cn } from "../Pricing";

export interface InteractiveLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
   href: UrlObject | string;
   underlineClassname?: string;
}

export const InteractiveLink = ({ href, underlineClassname, className, children, ...props }: InteractiveLinkProps) => {
   return (
      <Link
         className={cn(`group relative`, className)} href={href} {...props}>
         {children}
         <span
            className={cn(`absolute h-[1px] w-0 -bottom-1 text-inherit left-0 group-hover:w-full transition-all duration-200 bg-white`, underlineClassname)}>
         </span>
      </Link>
   );
};
