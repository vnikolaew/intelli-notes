import { NextRequest, NextResponse } from "next/server";
import Replicate, { Prediction } from "replicate";

const replicate = new Replicate({
   auth: process.env.REPLICATE_API_TOKEN,
});

export async function GET(request: NextRequest, { params }: any) {
   const { id } = params;
   const prediction = await replicate.predictions.get(id);

   if (prediction?.error) {
      return NextResponse.json({ detail: prediction.error }, { status: 500 });
   }

   return NextResponse.json(prediction);
}