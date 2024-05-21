"use client";
import { Button } from "components/ui/button";
import * as Stripe from "stripe";
import { HTTP } from "../../../../lib/consts";
import { createCheckoutSession } from "../actions";

export interface StripeFormProps {
   products: Stripe.Stripe.Product[];
   prices: Stripe.Stripe.Price[];
}

const StripeForm = ({ products, prices }: StripeFormProps) => {

   console.log({ prices, products });

   async function handleSubmit(e) {
      e.preventDefault();
      await createCheckoutSession({
         products: products.map(p => ({
            productId: p.id,
            quantity: 1,
            price: prices.find(pr => pr.product === p.id)?.unit_amount_decimal,
         })),
      }).then(res => {
         if(res.success && res.session) {
            window.location.href =  res.session.url
         }
      }).catch(console.error);
   }

   return (
      <form onSubmit={handleSubmit}>
         <Button>Checkout with Stripe</Button>
      </form>
   );
};

export default StripeForm;