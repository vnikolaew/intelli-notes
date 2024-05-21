"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import * as Stripe from "stripe";

export interface TabsProps {
   subscription: Stripe.Stripe.Subscription;
   invoice: Stripe.Stripe.Invoice;
}

const TabsSection = ({ invoice, subscription }: TabsProps) => {
   return (
      <Tabs defaultValue="sub" className="w-[400px]">
         <TabsList>
            <TabsTrigger value="sub">Sub</TabsTrigger>
            <TabsTrigger value="invoice">Invoice</TabsTrigger>
         </TabsList>
         <TabsContent value="sub">
            {subscription ? <pre>{JSON.stringify(subscription, null, 2)}</pre>: (
               <div>Subscription was not found.</div>
            )}
         </TabsContent>
         <TabsContent value="invoice">
            {invoice ? <pre>{JSON.stringify(invoice, null, 2)}</pre> : (
               <div>Invoice was not found.</div>
            )}
         </TabsContent>
      </Tabs>
   );
};

export default TabsSection;