"use server"

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { HuggingFaceAPI } from "@repo/ai";

const schema = z.object({
   prompt: z.string(),
});

export async function POST(req: NextRequest, _: NextResponse) {
   const parsedBody = schema.safeParse(await req.json());
   if (!parsedBody.success) return NextResponse.json({ errors: parsedBody.error.errors.map(e => e.message) }, { status: 404 });

   const res = await new HuggingFaceAPI().textToSpeech(parsedBody.data.prompt, `espnet/kan-bayashi_ljspeech_vits`);

   return new NextResponse(res.output.stream(), {
      headers: {
         'Content-Type': 'audio/wav',
         'Content-Length': res.output.size.toString()
      }
   })
}