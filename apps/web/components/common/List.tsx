import { cn } from "lib/utils";
import React from "react";

export interface ListProps<T> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   items: T[];
   render: (item: T, index: number) => React.ReactNode;
}

export function List<T>({ items, render, className, ...props }: ListProps<T>) {
   return (
      <div className={cn(`flex flex-col items-center gap-4`, className)} {...props}>
         {items.map((item, index) => render(item, index))}
      </div>
   );
};
