"use client";
import React from "react";
import { MDXEditor } from "@mdxeditor/editor";
import { plugins } from ".";
import { ScrollArea } from "components/ui/scroll-area";
import { ScrollAreaProps } from "@radix-ui/react-scroll-area";
import { cn } from "lib/utils";

export interface MarkdownProps extends ScrollAreaProps {
   value: string;
}

export const Markdown = ({ value, className, ...props }: MarkdownProps) => {
   return (
      <ScrollArea className={cn(`h-[200px] px-4`, className)} {...props}>
         <MDXEditor
            toMarkdownOptions={{ listItemIndent: `tab` }}
            readOnly plugins={plugins.slice(1)} markdown={value} />
      </ScrollArea>
   );
};
