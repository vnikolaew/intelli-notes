"use client";
import React, { Suspense, forwardRef, useRef } from "react";
import dynamic from "next/dynamic";
import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import { Loader2 } from "lucide-react";
import { Note, NoteCategory } from "@repo/db";

export interface EditorComponentWrapperProps {
   note?: Note,
   categories: NoteCategory[]
}

const Loading = () => (
   <div className={`flex items-center gap-2 mt-4`}>
      <Loader2 className={`animate-spin`} size={18} />
      Loading editor ...
   </div>);

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("./InitializedMDXEditor"), {
   // Make sure we turn SSR off
   ssr: false,
   loading: _ => <Loading />,
});

export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps & {
   note?: Note,
   categories: NoteCategory[]
}>((props, ref) =>
   <Editor {...props} editorRef={ref} />);

const EditorComponentWrapper = ({ note, categories }: EditorComponentWrapperProps) => {
   const editorRef = useRef<MDXEditorMethods>();

   return (
      <div>
         <Suspense fallback={<Loading />}>
            <ForwardRefEditor categories={categories} ref={editorRef} note={note} />
         </Suspense>
      </div>
   );
};

export default EditorComponentWrapper;