import React from "react";
import * as Stripe from "stripe";
import { stripe } from "@repo/payments";
import TabsSection from "./_components/tabs";

export interface PageProps {
   searchParams: {
      session_id: string
   };
}

const Page = async (props: PageProps) => {
   const { session_id } = props.searchParams;

   let session: Stripe.Stripe.Checkout.Session | null;
   let subscription: Stripe.Stripe.Subscription;
   let invoice: Stripe.Stripe.Invoice;
   if (session_id) {
      session = await stripe.getCheckoutSession(session_id);
      if (session.subscription) {
         subscription = await stripe.getSubscription(session.subscription as string);
      }
      if (session.invoice) {
         invoice  = await stripe.getInvoice(session.invoice as string);
      }
   }

   return (
      <section className={`flex flex-col mt-24 gap-12 items-center`}>
         <h2 className={`text-2xl text-green-500`}>
            Success page.
         </h2>
         <span>Your session ID is: {` `}
            <b>
               {props.searchParams.session_id}
            </b>
            </span>
         <TabsSection subscription={subscription} invoice={invoice} />
      </section>
   );
};

export default Page;