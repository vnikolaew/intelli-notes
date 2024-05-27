// @ts-ignore
import {
   FeatureExtractionOutput,
   HfInference,
   ImageClassificationOutput,
   ImageToTextOutput,
   sentenceSimilarity,
   SentenceSimilarityOutput,
   TextClassificationOutput, TextToSpeechOutput,
   ZeroShotImageClassificationOutput,
} from "@huggingface/inference";

/**
 * A HuggingFace API that can be used for different AI tasks.
 */
export class HuggingFaceAPI {
   hf: HfInference;

   constructor() {
      this.hf = new HfInference(process.env.HF_API_KEY, {
         use_cache: true,
         dont_load_model: false,
         retry_on_error: true,
      });
   }

   /**
    * Answers a question on a document image. Recommended model: impira/ layoutlm-document-qa.
    * @param image The input document's image.
    * @param question The input question.
    * @param model The model to be used.
    */
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

   /**
    * Use the chat completion endpoint to generate a response to a prompt, using OpenAI message completion API no stream
    * @param messages
    * @param tools
    * @param max
    * @param model
    */
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

   /**
    * This task reads some text and outputs raw float values, that are usually consumed as part of a semantic database/ semantic search.
    * @param sentences
    * @param model
    */
   public async getEmbeddings(sentences: string[], model = ``) {
      const response = await this.hf.featureExtraction({
         model,
         inputs: sentences,
      });

      return { success: true, output: response as number[][] };
   }

   /**
    * This task reads some image input and outputs the likelihood of classes. Recommended model: google/ vit-base-patch16-224
    * @param image
    * @param model
    */
   public async imageClassification(image: File, model = ``) {
      const response: ImageClassificationOutput = await this.hf.imageClassification({
         model,
         data: await image.arrayBuffer(),
      });

      return { success: true, output: response };
   }

   /**
    * This task reads some image input and outputs the text caption.
    * @param image
    * @param model
    */
   public async imageToText(image: File, model = ``) {
      const response: ImageToTextOutput = await this.hf.imageToText({
         model,
         data: await image.arrayBuffer(),
      });

      return { success: true, output: response };
   }

   /**
    * Finds the sentence similarity between two sentences using their embeddings.
    * @param sentences
    * @param model
    */
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

   /**
    * Used for sentiment-analysis this will output the likelihood of classes of an input.
    * Recommended model: distilbert-base-uncased-finetuned-sst-2-english
    * @param text
    * @param model
    */
   public async textClassification(text: string, model = ``) {
      const response: TextClassificationOutput = await this.hf.textClassification({
         model,
         inputs: text,
      });

      return { success: true, output: response };
   }

   /**
    * Classify an image to specified classes. Recommended model: openai/ clip-vit-large-patch14-336
    * @param image
    * @param candidate_labels
    * @param model
    */
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

   public async textToSpeech(text: string, model: string) {
      const response: TextToSpeechOutput = await this.hf.textToSpeech({
         model,
         inputs: text,
      });

      return { success: true, output: response };
   }

   // public async textToSpeechPipeline(text: string) {
   //    const pipeline_ = await pipeline(`text-to-speech`, `Xenova/speecht5_tts`, { quantized: false });
   //    const speaker_embeddings = "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin";
   //    const response = await pipeline_._call(text, { speaker_embeddings });
   //
   //    return { success: true, output: response };
   // }
}