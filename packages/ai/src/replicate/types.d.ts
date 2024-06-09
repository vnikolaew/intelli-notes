/**
 * The number of highest probability tokens to consider for generating the output. If > 0, only keep the top k tokens with highest probability (top-k filtering).
 */
export type TopK = number
/**
 * A probability threshold for generating the output. If < 1.0, only keep the top tokens with cumulative probability >= top_p (nucleus filtering). Nucleus filtering is described in Holtzman et al. (http://arxiv.org/abs/1904.09751).
 */
export type TopP = number
/**
 * Prompt
 */
export type Prompt = string
/**
 * The maximum number of tokens the model should generate as output.
 */
export type MaxTokens = number
/**
 * The minimum number of tokens the model should generate as output.
 */
export type MinTokens = number
/**
 * The value used to modulate the next token probabilities.
 */
export type Temperature = number
/**
 * Prompt template. The string `{prompt}` will be substituted for the input prompt. If you want to generate dialog output, use this template as a starting point and construct the prompt string manually, leaving `prompt_template={prompt}`.
 */
export type PromptTemplate = string
/**
 * Presence penalty
 */
export type PresencePenalty = number
/**
 * Frequency penalty
 */
export type FrequencyPenalty = number

export interface Input {
   top_k?: TopK
   top_p?: TopP
   prompt?: Prompt
   system_prompt?: Prompt
   max_tokens?: MaxTokens
   min_tokens?: MinTokens
   temperature?: Temperature
   prompt_template?: PromptTemplate
   presence_penalty?: PresencePenalty
   frequency_penalty?: FrequencyPenalty
   [k: string]: unknown
}
