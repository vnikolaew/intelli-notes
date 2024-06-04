"use server";

import { authorizedAction, safeExecute } from "lib/actions";
import { z } from "zod";
import { HuggingFaceAPI } from "@repo/ai";
import { nonArchivedFilter, Note, Prisma, xprisma } from "@repo/db";
import { createStreamableValue, StreamableValue } from "ai/rsc";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const askSchema = z.object({
      question: z.string().min(3).max(500),
   },
);

const EMBEDDINGS_MODEL = `BAAI/bge-large-en-v1.5`;
const QUESTION_ANSWERING_MODEL = `deepset/roberta-base-squad2`;
const SEPARATOR = `-----`;

export type Response = {
   answer: StreamableValue<string, any>,
   response: {
      answer: string; end: number; score: number; start: number;
   }, note: Note
}

/**
 * Ask AI to retrieve information about your current notes.
 */
export const askAi = authorizedAction(askSchema, async ({ question }, { userId }) => {
   return await safeExecute<Response>(async () => {
      const hf = new HuggingFaceAPI();

      // First find the embeddings of user notes:
      const userNotes = await xprisma.note.findMany({
         where: { authorId: userId },
      });

      const { output: [questionEmbedding, ...notesEmbeddings] } = await hf
         .getEmbeddings([question, ...userNotes.map(n => n.raw_text)],
            EMBEDDINGS_MODEL);

      // Retrieve the top 5 most similar notes:
      const top5 = notesEmbeddings
         .map((e, index) => ({
            id: userNotes[index].id,
            score: hf.getSimilarityScore(e, questionEmbedding),
         }))
         .sort((a, b) => b.score - a.score)
         .map(e => ({ ...e, raw_text: userNotes.find(n => n.id === e.id)?.raw_text }))
         .slice(0, 5);

      console.log(`Top 5 most similar notes:`);
      top5.forEach(note => console.log(`Id: ${note.id}, Score: ${note.score.toFixed(4)}, Raw text: ${note.raw_text}`));

      // Construct context for question answering:
      let context = `These are my top 5 notes separated by '${SEPARATOR}':`;
      const ranges: Record<string, [number, number]> = {};

      top5.forEach(note => {
         ranges[note.id] = [context.length + 1, context.length + 1 + note.raw_text.length];
         context += `\n${note.raw_text}\n${SEPARATOR}`;
      });

      const response = await hf.questionAnswering(question, context, QUESTION_ANSWERING_MODEL);
      const noteId = Object
         .entries(ranges)
         .find(([_, [start, end]]) =>
            response.output.start >= start && response.output.end <= end)?.at(0);

      let note = userNotes.find(n => n.id === noteId);

      console.log({ response, note });

      const streamableValue = createStreamableValue(``);

      setTimeout(() => {
         const parts = response.output.answer.trim().split(` `);
         parts.forEach(part => streamableValue.update(part));
         streamableValue.done(``);
      }, 1000);

      return { response: response.output, note, answer: streamableValue.value };
   });
});

/**
 *  Create a new AI chat.
 */
export const createNewChat = authorizedAction(z.any(), async ({}, { userId }) => {
   const newChat = await xprisma.aiChatHistory.create({
      data: {
         userId,
         metadata: {},
      },
   });

   revalidatePath(`/notes/ask`);
   return { success: true, chat: newChat };
});

const addSchema = z.object({
      chatId: z.string(),
      // A client-only identifier for the chat message
      clientMessageId: z.string(),
      message: z.string().min(1).max(500),
      role: z.union([z.literal(`SYSTEM`), z.literal(`USER`), z.literal(`ASSISTANT`)]),
      metadata: z.record(z.string(), z.string()).nullable().optional(),
   },
);

export type AddMessageSchema = typeof addSchema

/**
 *  Add a new message to an existing chat.
 */
export const addChatMessage = authorizedAction(addSchema,
   async ({
             message: raw_text,
             chatId,
             role,
             metadata,
          }, { userId }) => {
      const chat = await xprisma.aiChatHistory.findUnique({
         where: {
            userId,
            id: chatId,
         },
      });

      if (!chat) return { success: false };

      const message = await xprisma.aiChatHistoryMessage.create({
         data: {
            userId,
            raw_text,
            chatId,
            role,
            metadata,
         },
      });

      revalidatePath(`/notes/ask`);
      return { success: true, message };
   });

export type AddChatMessage = Awaited<ReturnType<typeof addChatMessage>>["data"]

const archiveSchema = z.object({
      chatId: z.string(),
      currentChatId: z.string(),
   },
);


export type ArchiveSchema = typeof archiveSchema

/**
 *  Archive an existing user chat.
 */
export const archiveChat = authorizedAction(archiveSchema,
   async ({
             chatId,
             currentChatId,
          }, { userId }) => {
      let chat = await xprisma.aiChatHistory.findUnique({
         where: {
            userId,
            id: chatId,
         },
      });

      if (!chat) return { success: false };

      chat = await xprisma.aiChatHistory.update({
         where: { id: chat.id },
         data: {
            metadata: { ...(chat.metadata ?? {}), archived: true },
         },
      });

      if (currentChatId === chat.id) {

         // Redirect user to next available chat history
         const nextChat = await xprisma.aiChatHistory.findFirst({
            orderBy: { updatedAt: `desc` },
            where: {
               ...nonArchivedFilter,
            },
         });

         if (!nextChat) redirect(`/notes/ask`);
         else redirect(`/notes/ask?chatId=${nextChat.id}`);

         return;
      }

      revalidatePath(`/notes/ask`);
      revalidatePath(`/notes/ask?chatId=${chat.id}`);

      return { success: true, chat };
   });

export type ArchiveChat = Awaited<ReturnType<typeof archiveChat>>["data"]


const deleteSchema = archiveSchema;

export type DeleteSchema = typeof deleteSchema;

/**
 *  Delete an existing user chat.
 */
export const deleteChat = authorizedAction(deleteSchema,
   async ({
             chatId,
             currentChatId,
          }, { userId }) => {
      let chat = await xprisma.aiChatHistory.findUnique({
         where: {
            userId,
            id: chatId,
         },
      });

      if (!chat) return { success: false };

      chat = await xprisma.aiChatHistory.delete({
         where: { id: chat.id },
      });

      if (currentChatId === chat.id) {

         // Redirect user to next available chat history
         const nextChat = await xprisma.aiChatHistory.findFirst({
            orderBy: { updatedAt: `desc` },
            where: { ...nonArchivedFilter },
         });
         if (!nextChat) redirect(`/notes/ask`);
         else redirect(`/notes/ask?chatId=${nextChat.id}`);

         return;
      }

      revalidatePath(`/notes/ask`);
      revalidatePath(`/notes/ask?chatId=${chat.id}`);

      return { success: true, chat };
   });

export type DeleteChat = Awaited<ReturnType<typeof deleteChat>>["data"]
