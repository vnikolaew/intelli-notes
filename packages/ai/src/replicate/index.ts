import Replicate from "replicate";
import { Input } from "./types";

export class ReplicateApi {
   private replicate: Replicate;

   constructor(token?: string) {
      this.replicate = new Replicate({
         auth: token ?? process.env.REPLICATE_API_TOKEN,
      });
   }

   public async prompt(prompt: string, options?: any) {
      const MODEL = `replicate/flan-t5-xl:7a216605843d87f5426a10d2cc6940485a232336ed04d655ef86b91e020e9210`;
      const output = (await this.replicate.run(
         MODEL,
         {
            input: {
               debug: false,
               top_p: 0.95,
               prompt,
               max_length: 128,
               temperature: 0.5,
               repetition_penalty: 1,
               ...options,
            },
         })) as string[];

      return output;
   }

   public async stream(prompt: string, options?: any, model?: `${string}/${string}` | `${string}/${string}:${string}`) {
      const MODEL = `replicate/flan-t5-xl:7a216605843d87f5426a10d2cc6940485a232336ed04d655ef86b91e020e9210`;
      const output = this.replicate.stream(
         model ?? MODEL,
         {
            input: {
               debug: false,
               top_p: 0.95,
               prompt,
               max_length: 128,
               temperature: 0.5,
               repetition_penalty: 1,
               ...options,
            },
         });

      return output;
   }

   public async runWithSystemPrompt(prompt: string, system_prompt: string, max_tokens?: number, options?:  Partial<Input>, model?: `${string}/${string}` | `${string}/${string}:${string}`) {
      const MODEL = `replicate/flan-t5-xl:7a216605843d87f5426a10d2cc6940485a232336ed04d655ef86b91e020e9210`;

      const output = this.replicate.run(
         model ?? MODEL,
         {
            input: {
               top_k: 0,
               debug: false,
               top_p: 0.95,
               system_prompt,
               length_penalty: 1,
               max_new_tokens: max_tokens ?? 512,
               stop_sequences: "<|end_of_text|>,<|eot_id|>",
               prompt_template: "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
               presence_penalty: 0,
               log_performance_metrics: false,
               prompt,
               max_length: 128,
               temperature: 0.5,
               repetition_penalty: 1,
               ...options,
            },
         });

      return output;
   }

   public streamWithSystemPrompt(prompt: string, system_prompt: string, max_tokens?: number, options?: Partial<Input>, model?: `${string}/${string}` | `${string}/${string}:${string}`) {
      const MODEL = `replicate/flan-t5-xl:7a216605843d87f5426a10d2cc6940485a232336ed04d655ef86b91e020e9210`;

      const output = this.replicate.stream(
         model ?? MODEL,
         {
            input: {
               top_k: 0,
               debug: false,
               top_p: 0.95,
               system_prompt,
               length_penalty: 1,
               max_new_tokens: max_tokens ?? 512,
               stop_sequences: "<|end_of_text|>,<|eot_id|>",
               prompt_template: "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
               presence_penalty: 0,
               log_performance_metrics: false,
               prompt,
               max_length: 128,
               temperature: 0.5,
               repetition_penalty: 1,
               ...options,
            },
         });

      return output;
   }
}