"use client";
import React, { Suspense, forwardRef, useRef } from "react";
import dynamic from "next/dynamic";
import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import { Loader2 } from "lucide-react";
import { Note } from "@repo/db";

export interface EditorComponentWrapperProps {
   note?: Note;
}

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("./InitializedMDXEditor"), {
   // Make sure we turn SSR off
   ssr: false,
   loading: (props) => (
      <div className={`flex items-center gap-2`}>
         <Loader2 className={`animate-spin`} size={18} />
         Loading editor ...
      </div>),
});

export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps & { note?: Note }>((props, ref) =>
   <Editor {...props} editorRef={ref} />);

const EditorComponentWrapper = ({ note }: EditorComponentWrapperProps) => {
   const editorRef = useRef<MDXEditorMethods>();

   return (
      <div>
         <Suspense fallback={(
            <div className={`flex items-center gap-2`}>
               <Loader2 className={`animate-spin`} size={18} />
               Loading editor ...
            </div>)}>
            <ForwardRefEditor ref={editorRef} note={note} />
         </Suspense>
      </div>
   );
};

export default EditorComponentWrapper;