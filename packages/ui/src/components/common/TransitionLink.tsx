"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link, { LinkProps } from "next/link";

export interface TransitionLinkProps extends LinkProps {
}

const TransitionLink = (props: TransitionLinkProps) => {
   const router = useRouter();

   const handleClick = (e: Event) => {
      if (!document.startViewTransition) {
         // browser does not support view transition. Continue the default behavior.
         return;
      } else {
         // browser supports view transition. Animate the transtion.
         e.preventDefault();
         document.startViewTransition(() => {
            router.push(props.href);
         });
      }
   };

   return (
      <Link onClick={handleClick} {...props}>
         {props.children}
      </Link>
   );
};

export default TransitionLink;