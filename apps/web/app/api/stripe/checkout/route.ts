import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Product, stripe } from "@repo/payments";

const bodySchema = z.object({
   products: z.array(z.object({
      productId: z.string().min(1),
      quantity: z.number().min(1),
      price: z.string().min(1),
   })),
});

export async function POST(req: NextRequest, res: NextResponse) {
   const parsedBody = bodySchema.safeParse(await req.json());

   if (parsedBody.success) {
      try {
         const session = await stripe.createCheckoutSession(parsedBody.data.products as Product[]);
         if (session.url) {
            return NextResponse.json({ session });
         } else return NextResponse.json({ success: false, session });
      } catch (err) {
         return NextResponse.json({ success: false, error: err });
      }
   }
   return NextResponse.json({ success: false, errors: parsedBody.error.errors });
}