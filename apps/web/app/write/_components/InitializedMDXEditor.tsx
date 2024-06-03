"use client";
import { MDXEditor, MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import React, { MutableRefObject, useCallback, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import { plugins } from "components/common/markdown/Plugins";
import { useAction } from "next-safe-action/hooks";
import { aiGenerateText, AiGenerateTextResponse, changeNoteVisibility, createOrUpdateNote } from "../actions";
import { Input } from "components/ui/input";
import { Eye, Loader2, LockKeyhole, Sparkles, X } from "lucide-react";
import { cn } from "lib/utils";
import { isExecuting } from "next-safe-action/status";
import { useRouter } from "next/navigation";
import { Note, NoteCategory } from "@repo/db";

import "@mdxeditor/editor/style.css";
import { Badge } from "components/ui/badge";
import moment from "moment";
import { sfMono } from "assets/fonts";
import { useKeyPress } from "hooks/useKeyPress";
import { readStreamableValue } from "ai/rsc";
import { useBoolean } from "hooks/useBoolean";
import { AiTip } from "./AiTip";
import { GeneratingWithAi } from "./GeneratingWithAi";
import { KeepAiTextPrompt } from "./KeepAiTextPrompt";
import { Saving } from "./Saving";
import ExportNoteButton from "./ExportNoteButton";
import { Button } from "components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import NotesCategorySelect from "./NotesCategorySelect";

export interface InitializedMdxEditorProps extends MDXEditorProps {
   editorRef: MutableRefObject<MDXEditorMethods> | null;
   onChange?: (value: string) => void | Promise<void>;
   note?: Note;
   categories: NoteCategory[];
}

const SPACE = `&#x20;`;

const InitializedMdxEditor = ({
                                 editorRef,
                                 categories,
                                 note,
                                 onChange,
                                 markdown,
                                 ...props
                              }: InitializedMdxEditorProps) => {
   const [markdownValue, setMarkdownValue] = useState(() => note?.raw_text ?? markdown);
   const debouncedValue = useDebounce(markdownValue, 2000);
   const [currentNote, setCurrentNote] = useState(note);
   const router = useRouter();

   const [noteTitle, setNoteTitle] = useState(note?.title ?? ``);
   const [noteTags, setNoteTags] = useState(note?.tags ?? []);
   const [currentTag, setCurrentTag] = useState(``);

   const debouncedTitle = useDebounce(noteTitle, 2000);

   const { execute: changeVisibilityAction, status: changeVisibilityStatus } = useAction(changeNoteVisibility, {
      onSuccess: res => {
         if (res.success) {
            setCurrentNote(note => ({ ...note, public: res.note.public }));
         }
      },
      onError: console.error,
   });

   const { execute, status } = useAction(createOrUpdateNote, {
      onSuccess: res => {
         if (res.success) {
            router.push(`?id=${res.note.id}`);
            setCurrentNote(res.note);
         }
      },
      onError: console.error,
   });

   const [lastCompletionText, setLastCompletionText] = useState(``);
   const [showConfirmAiTextPrompt, setShowConfirmAiTextPrompt] = useBoolean();

   const onGenerateSuccess = useCallback(async (res: AiGenerateTextResponse) => {
      if (res.success) {
         console.log(res);

         setLastCompletionText(res.completion_text);
         editorRef?.current?.focus();
         for await (const value of readStreamableValue(res.generatedMessage)) {
            editorRef?.current?.insertMarkdown(`${SPACE}${value}`);
         }

         // Prompt user to confirm AI-generated content.
         setShowConfirmAiTextPrompt(true);
      }
   }, []);

   const {
      result: _,
      execute: aiGenerateTextAction,
      status: aiGenerateTextStatus,
   } = useAction<any, AiGenerateTextResponse>(aiGenerateText, {
      onSuccess: onGenerateSuccess,
      onError: console.error,
   });

   useEffect(() => {
      execute({
         title: noteTitle,
         metadata: {},
         note_id: currentNote?.id,
         raw_text: debouncedValue ?? ``,
         tags: noteTags,
      });
   }, [noteTags]);

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

   const handleGenerateAiText = useCallback(() => {
      const raw_text = document.querySelector(`.mdxeditor-rich-text-editor`)?.innerText ?? markdownValue;
      aiGenerateTextAction({ title: noteTitle, raw_text });
   }, [markdownValue, noteTitle]);

   useKeyPress(`I`, e => {
      if (e.shiftKey && !isExecuting(aiGenerateTextStatus)) {
         e.preventDefault()
         e.stopPropagation()
         handleGenerateAiText();
      }
   }, [markdownValue, noteTitle]);

   return (
      <div className={`flex flex-col items-start gap-2 mt-4`}>
         <NotesCategorySelect note={note} categories={categories} />
         <div className={`flex items-center justify-between w-full gap-4`}>
            <div>
               <TooltipProvider>
                  <Tooltip delayDuration={200}>
                     <TooltipTrigger
                        onClick={_ => {
                           changeVisibilityAction({ note_id: currentNote.id });
                        }} asChild>
                        {isExecuting(changeVisibilityStatus) ? (
                           <Loader2 size={18} className={`animate-spin`} />
                        ) : currentNote?.public ? (
                           <Eye className={`cursor-pointer`} size={18} />
                        ) : (
                           <LockKeyhole className={`cursor-pointer`} size={18} />
                        )}
                     </TooltipTrigger>
                     <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs max-w-[240px]`}>
                        {currentNote?.public ? (
                           `Public.`
                        ) : (
                           `Private.`
                        )} {`Click to make this note `} {currentNote?.public ? `private.` : `public.`}
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            </div>
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
            <div>
               <Saving show={isExecuting(status)} />
               <GeneratingWithAi show={isExecuting(aiGenerateTextStatus)} />
            </div>
         </div>
         <KeepAiTextPrompt
            show={showConfirmAiTextPrompt}
            onAnswer={value => {
               setShowConfirmAiTextPrompt(false);
               if (value) return;

               const newText = markdownValue.replace(lastCompletionText, ``);
               editorRef.current?.setMarkdown(newText);
            }} />
         <div className={`flex items-center gap-2 bg-transparent rounded-md px-2`}>
            <div className={`flex items-center h-full gap-1`}>
               {noteTags.map((tag, index) => (
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
         <AiTip />
         <div className={`relative w-full`}>
            <div className={`absolute bottom-2 right-2`}>
               <TooltipProvider>
                  <Tooltip delayDuration={200}>
                     <TooltipTrigger asChild>
                        <Button
                           disabled={isExecuting(aiGenerateTextStatus)}
                           onClick={_ => {
                              handleGenerateAiText();
                           }} className={`rounded-full shadow-sm`} variant={`outline`} size={`icon`}>
                           <Sparkles
                              className={cn(`text-amber-600`, isExecuting(aiGenerateTextStatus) && `animate-pulse`)}
                              size={14} />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs max-w-[240px]`}>
                        <span className={`text-sm block`}>Ask AI</span>
                        <span className={`text-xs text-muted-foreground text-wrap`}>
                           Use AI to suggest completions for your note.
                        </span>
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            </div>
            <MDXEditor
               className={cn(`min-h-[300px] !font-mono mt-2 `, sfMono.variable)}
               ref={editorRef}
               markdown={markdownValue ?? currentNote?.raw_text ?? ``}
               onChange={setMarkdownValue}
               toMarkdownOptions={{ listItemIndent: `tab` }}
               plugins={plugins}
               {...props} />
         </div>
         <div className={`w-full mt-12 flex items-center justify-end`}>
            <ExportNoteButton note={currentNote} />
         </div>
      </div>
   );
};


export default InitializedMdxEditor;