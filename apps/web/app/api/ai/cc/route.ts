import { NextRequest, NextResponse } from "next/server";
import { ReplicateApi } from "@repo/ai";

const MODEL = `facebook/opt-125m`;
const TINY_LLAMA = `TinyLlama/TinyLlama-1.1B-Chat-v1.0`;
const FACEBOOK_OPT = `facebook/opt-350m`;
const GOOGLE_GEMMA = `google/gemma-7b`;
const MICROSOFT = `microsoft/Phi-3-mini-4k-instruct`;

export async function POST(req: NextRequest) {
   try {
      const r = new ReplicateApi();
      const outputStream = r.streamWithSystemPrompt(await req.text(),
         `You are a helpful assistant`,
         128, {}, `meta/meta-llama-3-8b-instruct`);

      const stream = new ReadableStream({
         async pull(controller) {
            const { value, done } = await outputStream.next();
            if (done) controller.close();
            else controller.enqueue(value.data);
         },
      });

      return new NextResponse(stream);
   } catch (err) {
      console.log(err);
      return NextResponse.json(err, {
         status: 404,
      });
   }

}