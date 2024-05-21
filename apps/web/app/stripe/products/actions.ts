"use server";
import { z } from "zod";
import { Product, stripe } from "@repo/payments";

const bodySchema = z.object({
   products: z.array(z.object({
      productId: z.string().min(1),
      quantity: z.number().min(1),
      price: z.string().min(1),
   })),
});

export async function createCheckoutSession(body: any) {
   const parsedBody = bodySchema.safeParse(body);

   if (parsedBody.success) {
      try {
         const session = await stripe.createCheckoutSession(parsedBody.data.products as Product[]);
         if (session.url) {
            return { session, success: true }
         } else return { success: false, session };
      } catch (err) {
         console.log({ err });
         return { success: false,};
      }
   }
   return { success: false, errors: parsedBody.error.errors.map(e => e.message) };
}
