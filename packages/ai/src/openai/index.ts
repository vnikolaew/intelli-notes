import { generateText, LanguageModel, generateObject, streamText, streamObject, CoreMessage, CoreTool } from "ai";
import { openai } from "@ai-sdk/openai";
import { ZodSchema } from "zod";

export class OpenAiAPI {
   model: LanguageModel;
   DEFAULT_MAX_TOKENS = 1000;

   constructor() {
      this.model = openai(`gpt-4o`);
   }

   public async generateText(prompt: string, tools: Record<string, CoreTool> = {}, maxTokens: number = this.DEFAULT_MAX_TOKENS) {
      const response = await generateText({
         model: this.model,
         prompt,
         maxTokens,
         tools,
      });

      return response;
   }

   public async generateTextWithMessages(messages: CoreMessage[], tools: Record<string, CoreTool> = {}, maxTokens: number = this.DEFAULT_MAX_TOKENS) {
      const response = await generateText({
         model: this.model,
         messages,
         maxTokens,
         tools
      });

      return response;
   }

   public async streamText(prompt: string, tools: Record<string, CoreTool> = {}, maxTokens: number = this.DEFAULT_MAX_TOKENS) {
      const response = await streamText({
         model: this.model,
         prompt,
         maxTokens,
         tools
      });

      return response;
   }

   public async streamTextWithMessages(messages: CoreMessage[], tools: Record<string, CoreTool> = {}, maxTokens: number = this.DEFAULT_MAX_TOKENS) {
      const response = await streamText({
         model: this.model,
         maxTokens,
         messages,
         tools
      });

      return response;
   }

   public async generateObject<T>(prompt: string, schema: ZodSchema<T>, maxTokens: number = this.DEFAULT_MAX_TOKENS) {
      const response = await generateObject({
         model: this.model,
         maxTokens,
         prompt,
         schema,
         mode: `auto`,
      });

      return response;
   }

   public async streamObject<T>(prompt: string, schema: ZodSchema<T>, maxTokens: number = this.DEFAULT_MAX_TOKENS) {
      const response = await streamObject({
         model: this.model,
         maxTokens,
         prompt,
         schema,
      });

      return response;
   }
}