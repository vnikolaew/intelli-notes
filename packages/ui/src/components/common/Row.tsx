import React, { HTMLAttributes } from "react";
import { cn } from "../Pricing";

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
}

export const Row = ({className, children,...props}: RowProps) => {
   return (
      <div className={cn(`flex items-center w-full gap-2 justify-between`, className)} {...props} >
         {children}
      </div>
   );
};
