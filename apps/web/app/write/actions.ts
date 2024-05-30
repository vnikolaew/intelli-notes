"use server";

import { authorizedAction } from "lib/actions";
import { z } from "zod";
import { Note, xprisma } from "@repo/db";
import { sleep } from "../../lib/utils";
import { revalidatePath } from "next/cache";
import { ChatCompletionOutput, HuggingFaceAPI } from "@repo/ai";
import { createStreamableValue, StreamableValue } from "ai/rsc";
import { setTimeout } from "next/dist/compiled/@edge-runtime/primitives";

const actionSchema = z.object({
   note_id: z.optional(z.string()).nullable(),
   title: z.optional(z.string()).nullable(),
   raw_text: z.string(),
   metadata: z.any(),
   tags: z.array(z.string()).nullable(),
   isPublic: z.boolean().nullable().optional(),
});

export type CreateOrUpdateResponse = { success: false } | { success: true, note: Note }

/**
 * A server action for upserting a single note.
 */
export const createOrUpdateNote = authorizedAction(
   actionSchema,
   async ({
             raw_text,
             title,
             tags,
             metadata,
             isPublic,
             note_id,
          }, { userId }): Promise<CreateOrUpdateResponse> => {
      await sleep(1_000);

      // We have a created note already:
      if (!!note_id?.length) {
         const newNote = await xprisma.note.update({
            where: { id: note_id, authorId: userId },
            data: {
               metadata,
               raw_text,
               ...(title && { title }),
               ...(tags && { tags }),
               ...(typeof isPublic === `boolean` && { public: isPublic }),
            },
         });
         if (tags) revalidatePath(`/write?id=${newNote.id}`);
         return newNote ? { success: true, note: newNote } : { success: false };
      }

      const note = await xprisma.note.create({
         data: {
            authorId: userId,
            metadata,
            raw_text,
            title,
            tags: tags ?? [],
            ...(isPublic && { public: isPublic }),
         },
      });

      return note ? { success: true, note } : { success: false };
   });

const aiGenerateTextSchema = z.object({
   title: z.optional(z.string()).nullable(),
   raw_text: z.string(),
});

/**
 * A server action for completing note using AI.
 */
export const aiGenerateText = authorizedAction(aiGenerateTextSchema,
   async ({
             raw_text,
             title,
          }, { userId }): Promise<AiGenerateTextResponse> => {
      await sleep(1_000);

      const MODEL = `mistralai/Mistral-7B-Instruct-v0.2`;
      const hf = new HuggingFaceAPI();
      const prompt = `Note title: ${title}\n\nNote content: \n${raw_text}`;
      const prompt2 = `${raw_text}`;

      const response = await hf.chatCompletionSimple(prompt2, MODEL);
      const generatedMessage = !!response.output.choices.length ? response.output.choices[0].message.content : ``;

      console.log(`Generated message: `, generatedMessage);
      const streamableValue = createStreamableValue(``);

      const completion_text = generatedMessage.trim().replaceAll(longestCommonSubstring(raw_text, generatedMessage), ``);
      const parts = completion_text.trim().split(` `);

      parts.forEach((part, index) => {
         setTimeout(() => {
            streamableValue.update(part);
         }, 100 * index);
      });
      setTimeout(() => {
         streamableValue.done(``);
      }, 100 * (parts.length));

      return {
         ...response,
         generatedMessage: streamableValue.value,
         originalText: raw_text,
         completion_text,
      };
   });

export type AiGenerateTextResponse = {
   output: ChatCompletionOutput,
   originalText: string;
   success: boolean,
   completion_text: string;
   generatedMessage: StreamableValue<string>
}

function longestCommonSubstring(str1: string, str2: string) {
   let maxLength = 0;
   let endIndex = 0;
   let table = Array(str1.length + 1).fill(0).map(() => Array(str2.length + 1).fill(0));

   for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
         if (str1[i - 1] === str2[j - 1]) {
            table[i][j] = table[i - 1][j - 1] + 1;
            if (table[i][j] > maxLength) {
               maxLength = table[i][j];
               endIndex = i;
            }
         }
      }
   }

   return str1.substring(endIndex - maxLength, endIndex);
}


const changeVisibilitySchema = z.object({
   note_id: z.optional(z.string()).nullable(),
});

/**
 * A server action for changing a note's visibility (either public or private).
 */
export const changeNoteVisibility = authorizedAction(
   changeVisibilitySchema,
   async ({
             note_id,
          }, { userId }): Promise<CreateOrUpdateResponse> => {
      await sleep(1_000);

      const note = await xprisma.note.findUnique({
         where: { id: note_id, authorId: userId },
      });
      if (!note) return { success: false };

      const newNote = await xprisma.note.update({
         where: { id: note.id },
         data: { public: !note.public },
      });

      return newNote ? { success: true, note: newNote } : { success: false };
   });
