import React, { HTMLAttributes } from "react";
import { cn } from "../Pricing";

export interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
}

export const Column = ({ className, children, ...props }: ColumnProps) => {
   return (
      <div className={cn(`flex flex-col items-center gap-2`, className)} {...props} >
         {children}
      </div>
   );
};
