"use server";

import { HuggingFaceAPI, OpenAiAPI } from "@repo/ai";
import { publicAction } from "lib/actions";
import { z } from "zod";
import { zfd } from "zod-form-data";

const MODEL = `Snowflake/snowflake-arctic-embed-s`;

export const runSentenceSimilarity = publicAction(z.object({ sentences: z.array(z.string()) }), async ({ sentences }) => {
   const res = await new HuggingFaceAPI().sentenceSimilarity(sentences, MODEL);
   return { ...res, sentences };
});

export type SentenceSimilarityResponse = Awaited<ReturnType<typeof runSentenceSimilarity>>["data"]

export const runImageClassification = publicAction(zfd.formData({ image: zfd.file() }), async ({ image }) => {
   const MODEL = `google/vit-base-patch16-224`;

   const res = await new HuggingFaceAPI().imageClassification(image, MODEL);
   return { ...res };
});

export type ImageClassificationResponse = Awaited<ReturnType<typeof runImageClassification>>["data"]

export const runDocumentAnswering = publicAction(zfd.formData({
   image: zfd.file(),
   question: zfd.text(),
}), async ({ image, question }) => {
   const MODEL = `impira/layoutlm-document-qa`;

   const res = await new HuggingFaceAPI().documentQuestionAnswering(image, question, MODEL);
   return { ...res };
});

export type DocumentAnsweringResponse = Awaited<ReturnType<typeof runDocumentAnswering>>["data"]

export const runObjectGeneration = publicAction(z.object({ prompt: z.string() }), async ({ prompt }) => {
   const res = await new OpenAiAPI().generateObject(
      `Retrieve the latest 10 hot sports news around the world`,
      z.object({
         news: z.array(z.object({
            headline: z.string().min(1),
            summary: z.string().min(1),
            date: z.string(),
            sport: z.string(),
         })),
      }));

   return { ...res, success: true };
});

export type ObjectGenerationResponse = Awaited<ReturnType<typeof runObjectGeneration>>["data"]
