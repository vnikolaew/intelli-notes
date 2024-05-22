// @ts-ignore
import {
   FeatureExtractionOutput,
   HfInference,
   ImageClassificationOutput,
   ImageToTextOutput,
   sentenceSimilarity,
   SentenceSimilarityOutput,
   TextClassificationOutput,
   ZeroShotImageClassificationOutput,
} from "@huggingface/inference";
import { dot } from "@xenova/transformers";

export class HuggingFaceAPI {
   hf: HfInference;

   constructor() {
      this.hf = new HfInference(process.env.HF_API_KEY, {
         use_cache: true,
         dont_load_model: false,
         retry_on_error: true,
      });
   }

   public async documentQuestionAnswering(image: File, question: string, model = ``) {
      const output = await this.hf.documentQuestionAnswering({
         model,
         inputs: {
            image: await image.arrayBuffer(),
            question,
         },
      });

      return { success: true, output };
   }

   public async chatCompletion(messages: ({
      role: string,
      content: string
   })[], tools: any[], max = 10_000, model = ``) {
      const response = await this.hf.chatCompletion({
         model,
         messages,
         tools,
         tool_choice: `OneOf`,
         max_tokens: max,
      });

      return { success: true, output: response };
   }

   public async getEmbeddings(sentences: string[], model = ``) {
      const response = await this.hf.featureExtraction({
         model,
         inputs: sentences,
      });

      return { success: true, output: response as number[][] };
   }

   public async imageClassification(image: File, model = ``) {
      const response: ImageClassificationOutput = await this.hf.imageClassification({
         model,
         data: await image.arrayBuffer(),
      });

      return { success: true, output: response };
   }

   public async imageToText(image: File, model = ``) {
      const response: ImageToTextOutput = await this.hf.imageToText({
         model,
         data: await image.arrayBuffer(),
      });

      return { success: true, output: response };
   }

   public async sentenceSimilarity(sentences: string[], model = ``) {
      if (sentences.length !== 2) {
         return { success: false };
      }

      const [e1, e2]: FeatureExtractionOutput = await this.hf.featureExtraction({
         model,
         inputs: sentences,
      });

      const similarity = dot(e1, e2);

      return { success: true, output: { embeddings: [e1, e2], similarity } };
   }

   public async textClassification(text: string, model = ``) {
      const response: TextClassificationOutput = await this.hf.textClassification({
         model,
         inputs: text,
      });

      return { success: true, output: response };
   }

   public async zeroShotImageClassification(image: File, candidate_labels: string[], model = ``) {
      const response: ZeroShotImageClassificationOutput = await this.hf.zeroShotImageClassification({
         model,
         inputs: { image: await image.arrayBuffer() },
         parameters: {
            candidate_labels,
         },
      });

      return { success: true, output: response };
   }
}