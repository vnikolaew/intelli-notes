"use client";

import { MutableRefObject, useCallback, useState } from "react";
import { useBoolean } from "hooks/useBoolean";
import { aiGenerateText, AiGenerateTextResponse } from "../actions";
import { readStreamableValue } from "ai/rsc";
import { useAction } from "next-safe-action/hooks";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { useKeyPress } from "hooks/useKeyPress";
import { isExecuting } from "next-safe-action/status";

const SPACE = `&#x20;`;


export function useAiTextGeneration(
   editorRef: MutableRefObject<MDXEditorMethods> | null,
   noteTitle: string,
   markdownValue: string,
) {
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

   const handleGenerateAiText = useCallback(() => {
      const raw_text = document.querySelector(`.mdxeditor-rich-text-editor`)?.innerText ?? markdownValue;
      aiGenerateTextAction({ title: noteTitle, raw_text });
   }, [markdownValue, noteTitle]);

   useKeyPress(`I`, e => {
      if (e.shiftKey && !isExecuting(aiGenerateTextStatus)) {
         e.preventDefault();
         e.stopPropagation();
         handleGenerateAiText();
      }
   }, [markdownValue, noteTitle]);

   return {
      handleGenerateAiText,
      lastCompletionText,
      showConfirmAiTextPrompt,
      setShowConfirmAiTextPrompt,
      aiGenerateTextStatus,
   };
}