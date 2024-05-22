import React from "react";
import { Check } from "lucide-react";
import * as Stripe from "stripe";
import { stripe } from "@repo/payments";

export interface PageProps {
   searchParams: {
      checkout_session?: string
   };
}

const Page = async (props: PageProps) => {
   const { checkout_session } = props.searchParams;

   let session: Stripe.Stripe.Checkout.Session | null;
   let subscription : Stripe.Stripe.Subscription | null;
   if (checkout_session) {
      try {
         session = await stripe.getCheckoutSession(checkout_session);
         if(session.subscription) {
           subscription = await stripe.getSubscription(session.subscription as string);
         }
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <section className={`w-full flex flex-col mt-24 gap-12 items-center`}>
         <h1 className={`text-2xl inline-flex gap-2 items-center font-semibold`}>
            <Check className={`text-green-700 stroke-2`} size={22} />
            Payment successful.
         </h1>
         <span>
            Checkout session ID: <b>
            {props.searchParams.checkout_session}
         </b>
            <pre>
               {JSON.stringify(session, null, 2)}
            </pre>
            <pre>
               {JSON.stringify(subscription, null, 2)}
            </pre>
         </span>
      </section>
   );
};

export default Page;