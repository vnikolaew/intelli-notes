"use client";
import {
   MDXEditor, MDXEditorMethods, MDXEditorProps,
} from "@mdxeditor/editor";
import React, { MutableRefObject, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import { plugins } from "components/common/markdown/Plugins";
import { useAction } from "next-safe-action/hooks";
import { aiGenerateText, createOrUpdateNote } from "../actions";
import { Input } from "components/ui/input";
import { Loader2, X } from "lucide-react";
import { cn } from "lib/utils";
import { isExecuting } from "next-safe-action/status";
import { useRouter } from "next/navigation";
import { Note } from "@repo/db";

import "@mdxeditor/editor/style.css";
import { Badge } from "components/ui/badge";
import moment from "moment";
import { sfMono } from "assets/fonts";

export interface InitializedMdxEditorProps extends MDXEditorProps {
   editorRef: MutableRefObject<MDXEditorMethods> | null;
   onChange?: (value: string) => void | Promise<void>;
   note?: Note;
}

const InitializedMdxEditor = ({ editorRef, note, onChange, markdown, ...props }: InitializedMdxEditorProps) => {
   const [markdownValue, setMarkdownValue] = useState(note?.raw_text ?? markdown);
   const debouncedValue = useDebounce(markdownValue, 2000);
   const [currentNote, setCurrentNote] = useState(note);
   const router = useRouter();

   const [noteTitle, setNoteTitle] = useState(note?.title ?? ``);
   const [noteTags, setNoteTags] = useState(note?.tags ?? []);
   const [currentTag, setCurrentTag] = useState(``);

   const debouncedTitle = useDebounce(noteTitle, 2000);

   const { result, execute, status } = useAction(createOrUpdateNote, {
      onSuccess: res => {
         if (res.success) {
            console.log(res, result);
            router.push(`?id=${res.note.id}`);
            setCurrentNote(res.note);
         }
      },
      onError: console.error,
   });

   const { result: _, execute: aiGenerateTextAction, status: aiGenerateTextStatus } = useAction(aiGenerateText, {
      onSuccess: res => {
         if (res.success) {
            console.log(res);
         }
      },
      onError: console.error,
   });

   useEffect(() => {
      if (!debouncedValue?.length || debouncedValue?.length < 3) return;

      execute({
         title: noteTitle,
         metadata: {},
         note_id: currentNote?.id,
         raw_text: debouncedValue,
         tags: noteTags,
      });
   }, [debouncedValue, debouncedTitle, noteTags]);

   useEffect(() => {
      const handler = e => {
         if (e.key === `I` && e.shiftKey) {
            if (!isExecuting(aiGenerateTextStatus)) {
               const raw_text = document.querySelector(`.mdxeditor-rich-text-editor`)?.innerText ?? markdownValue;
               aiGenerateTextAction({ title: noteTitle, raw_text });
            }
         }
      };
      document.addEventListener("keypress", handler);
      return () => document.removeEventListener(`keypress`, handler);
   });

   return (
      <div className={`flex flex-col items-start gap-2`}>
         <div className={`flex items-center justify-between w-full gap-4`}>
            <Input
               placeholder={`Untitled`}
               className={`border-none !px-5 !py-2 !h-fit flex-1 text-xl outline-none ring-0 focus:!outline-none focus:!border-none shadow-none !bg-transparent text-neutral-700 border-b-[1px] !border-b-neutral-300 focus:!ring-0 focus:!bg-neutral-100 transition-colors duration-300`}
               onChange={e => setNoteTitle(e.target.value)}
               value={noteTitle} />

            {currentNote?.updatedAt && !isExecuting(status) && !isExecuting(aiGenerateTextStatus) && (
               <div className={cn(`flex items-center gap-2 flex-0 text-neutral-500`)}>
                  Last updated:
                  <b>
                     {currentNote?.updatedAt && <time>{moment(currentNote.updatedAt).fromNow()}</time>}
                  </b>
               </div>
            )}
            <div className={cn(`hidden items-center gap-2 flex-0 `, isExecuting(status) && `flex`)}>
               <Loader2 className={`animate-spin`} size={20} />
               <span className={`animate-pulse`}> Saving ... </span>
            </div>
            <div className={cn(`hidden items-center gap-2 flex-0 `, isExecuting(aiGenerateTextStatus) && `flex`)}>
               <Loader2 className={`animate-spin`} size={20} />
               <span className={`animate-pulse`}> Generating with AI ... </span>
            </div>
         </div>
         <div className={`flex items-center gap-2 bg-transparent rounded-md px-2`}>
            <div className={`flex items-center h-full gap-1`}>
               {[...noteTags].map((tag, index) => (
                  <Badge className={`shadow-sm flex items-center gap-2`} key={index}>
                     {tag}
                     <X onClick={_ =>
                        setNoteTags(tags => tags.filter(t => t !== tag))}
                        className={`cursor-pointer`}
                        size={12} />
                  </Badge>
               ))}
            </div>
            <Input
               placeholder={`Add note tags`}
               value={currentTag}
               onChange={e => setCurrentTag(e.target.value)}
               onKeyPress={e => {
                  if (e.key === "Enter" && currentTag?.length && !noteTags.includes(currentTag)) {
                     setNoteTags(t => [...t, currentTag]);
                     setCurrentTag(``);
                  }
               }}
               className={`border-none !px-5 !py-1 !h-fit flex-1 text-base outline-none ring-0 focus:!outline-none focus:!border-none shadow-none !bg-transparent text-neutral-700 border-b-[1px] !border-b-neutral-300 focus:!ring-0 focus:!bg-neutral-100 transition-colors duration-300 focus:!bg-transparent focus-visible:!border-none focus-visible:!outline-none focus-visible:!ring-0`}
            />
         </div>
         <div className={`w-full text-right text-muted-foreground text-xs`}>
            Tip: Press <kbd
            className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>I
         </kbd> to use AI for text generation.
         </div>
         <MDXEditor
            className={cn(`min-h-[300px] !font-mono mt-2`, sfMono.variable)}
            ref={editorRef}
            markdown={currentNote?.raw_text ?? markdown ?? ``}
            onChange={setMarkdownValue}
            toMarkdownOptions={{ listItemIndent: `tab` }}
            plugins={plugins}
            {...props} />
      </div>
   );
};

export default InitializedMdxEditor;