"use client";
import React from "react";
import { MDXEditor } from "@mdxeditor/editor";
import { plugins } from ".";
import { ScrollArea } from "components/ui/scroll-area";

export interface MarkdownProps {
   value: string;
}

export const Markdown = ({ value }: MarkdownProps) => {
   return (
      <ScrollArea className={`h-[200px] px-4`}>
         <MDXEditor
            toMarkdownOptions={{ listItemIndent: `tab` }}
            readOnly plugins={plugins.slice(1)} markdown={value} />
      </ScrollArea>
   );
};
