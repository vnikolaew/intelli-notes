"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Note } from "@repo/db";
import { useAction } from "next-safe-action/hooks";
import { changeNoteVisibility, createOrUpdateNote } from "../actions";
import { useRouter } from "next/navigation";

const DEFAULT_DEBOUNCE = 2000;

export function useMarkdownEditor(note: Note, markdown?: string) {
   const router = useRouter();
   const { execute, status } = useAction(createOrUpdateNote, {
      onSuccess: res => {
         if (res.success) {
            router.push(`?id=${res.note.id}`);
            setCurrentNote(res.note);
         }
      },
      onError: console.error,
   });

   const { execute: changeVisibilityAction, status: changeVisibilityStatus } = useAction(changeNoteVisibility, {
      onSuccess: res => {
         if (res.success) {
            setCurrentNote(note => ({ ...note, public: res.note.public }));
         }
      },
      onError: console.error,
   });

   const [markdownValue, setMarkdownValue] = useState(() => note?.raw_text ?? markdown);
   const debouncedValue = useDebounce(markdownValue, DEFAULT_DEBOUNCE);
   const [currentNote, setCurrentNote] = useState(note);

   const [noteTitle, setNoteTitle] = useState(note?.title ?? ``);
   const debouncedTitle = useDebounce(noteTitle, DEFAULT_DEBOUNCE);

   const [noteTags, setNoteTags] = useState(note?.tags ?? []);
   const [currentTag, setCurrentTag] = useState(``);

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

   return {
      markdownValue,
      noteTags,
      setNoteTags,
      setMarkdownValue,
      debouncedValue,
      debouncedTitle,
      noteTitle,
      setNoteTitle,
      currentNote,
      setCurrentNote,
      currentTag,
      setCurrentTag,
      execute, status,
      changeVisibilityStatus, changeVisibilityAction
   };
}