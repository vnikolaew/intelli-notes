"use client";
import {
   MDXEditor, MDXEditorMethods, MDXEditorProps,
} from "@mdxeditor/editor";
import React, { MutableRefObject, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import "@mdxeditor/editor/style.css";
import "../styles.css";
import { plugins } from "./Plugins";
import { useAction } from "next-safe-action/hooks";
import { createOrUpdateNote } from "../actions";
import { Input } from "components/ui/input";
import { Loader2 } from "lucide-react";
import { cn } from "lib/utils";
import { isExecuting } from "next-safe-action/status";
import { useRouter } from "next/navigation";
import { useSearchParam } from "hooks/useSearchParam";
import { Note } from "@repo/db";

export interface InitializedMdxEditorProps extends MDXEditorProps {
   editorRef: MutableRefObject<MDXEditorMethods> | null;
   onChange?: (value: string) => void | Promise<void>;
   note? : Note
}

const InitializedMdxEditor = ({ editorRef, note, onChange, markdown, ...props }: InitializedMdxEditorProps) => {
   const [markdownValue, setMarkdownValue] = useState(markdown);
   const debouncedValue = useDebounce(markdownValue, 2000);
   const router = useRouter()
   const noteId = useSearchParam(`id`)

   const [noteTitle, setNoteTitle] = useState(note.title ?? ``);
   const debouncedTitle = useDebounce(noteTitle, 2000);

   const { result, execute, status } = useAction(createOrUpdateNote, {
      onSuccess: res => {
         if (res.success) {
            console.log(res, result);
            router.push(`?id=${res.note.id}`)
         }
      },
      onError: console.error,
   });


   useEffect(() => {
      if (!debouncedValue?.length || debouncedValue?.length < 3) return;

      execute({
         title: noteTitle,
         metadata: {},
         note_id: (result && result.data) ? result.data.note.id : null,
         raw_text: markdownValue,
         tags: [],
      });
      console.log(`Saving to database ...`);
   }, [debouncedValue, debouncedTitle]);

   return (
      <div className={`flex flex-col items-start gap-4`}>
         <div className={`flex items-center justify-between w-full`}>
            <Input
               placeholder={`Untitled note`}
               className={`border-none flex-1 text-xl outline-none ring-0 focus:!ring-0 focus:!outline-none focus:!border-none shadow-none !bg-transparent text-neutral-700 border-b-[1px] !border-b-neutral-300`}
               onChange={e => setNoteTitle(e.target.value)} value={noteTitle} />
            <div className={cn(`hidden items-center gap-2 flex-0 `,
               isExecuting(status) && `flex`,
            )}>
               <Loader2 className={`animate-spin`} size={20} />
               Saving ...
            </div>
         </div>
         <MDXEditor
            ref={editorRef}
            markdown={note?.raw_text ?? markdown ?? ``}
            onChange={setMarkdownValue}
            toMarkdownOptions={{ listItemIndent: `tab` }}
            plugins={plugins}
            {...props} />
      </div>
   );
};

export default InitializedMdxEditor;