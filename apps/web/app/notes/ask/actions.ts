"use server";

import { authorizedAction, safeExecute } from "lib/actions";
import { z } from "zod";
import { HuggingFaceAPI } from "@repo/ai";
import { xprisma } from "@repo/db";

const askSchema = z.object({
      question: z.string().min(3).max(500),
   },
);

const EMBEDDINGS_MODEL = `BAAI/bge-large-en-v1.5`;
const QUESTION_ANSWERING_MODEL = `deepset/roberta-base-squad2`;
const SEPARATOR = `-----`;

export const askAi = authorizedAction(askSchema, async ({ question }, { userId }) => {
   return await safeExecute(async () => {
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

      return { response: response.output, note };
   });
});