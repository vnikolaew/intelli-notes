import React from "react";
import { stripe } from "@repo/payments";
import StripeForm from "./_components/StripeForm";

export interface PageProps {
}

const Page = async ({}: PageProps) => {
   const products = await stripe.listProducts();
   const prices = await stripe.listPrices();

   return (
      <div>
         <div className={`flex flex-col items-center mt-24`}>
            <StripeForm prices={prices.data} products={products.data} />
         </div>
      </div>
   );
};

export default Page;