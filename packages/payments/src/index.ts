import Stripe from "stripe";

export type Product = { productId: string, quantity: number, price: string }

export class StripeService {
   stripe: Stripe;

   constructor() {
      this.stripe = new Stripe(process.env.STRIPE_API_KEY!);
   }

   async getCheckoutSession(id: string) {
      const session = await this.stripe.checkout
         .sessions
         .retrieve(id);
      return session;
   }

   async getSubscription(id: string) {
      const subscription = await this.stripe.subscriptions.retrieve(id);
      return subscription;
   }

   async getInvoice(id: string) {
      const invoice = await this.stripe.invoices.retrieve(id);
      return invoice;

   }

   async listProducts() {
      const products = await this.stripe.products.list({ limit: 10 });
      return products;
   }

   async listPrices() {
      const prices = await this.stripe.prices.list({ limit: 10 });
      return prices;
   }

   async listInvoice(invoiceId: string) {
      return await this.stripe.invoices.retrieve(invoiceId);
   }

   listPaymentLinks() {
      return this.stripe.paymentLinks.list({ limit: 10 });
   }

   async createCheckoutSession(products: Product[], params?: Stripe.Checkout.SessionCreateParams) {
      //@ts-ignore
      const session = await this.stripe.checkout.sessions.create({
         line_items: products.map((product: Product) => ({
            quantity: product.quantity,
            price_data: {
               unit_amount: product.price,
               product: product.productId,
               currency: `bgn`,
               recurring: { interval: `month` },
            },
         })),
         mode: "subscription",
         success_url: `${process.env.BASE_URL}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
         cancel_url: `${process.env.BASE_URL}/stripe/cancel?session_id={CHECKOUT_SESSION_ID}`,
         billing_address_collection: `auto`,
         locale: `en`,
         ui_mode: `hosted`,
         ...params,
      });

      return session;
   }
}

export const stripe = new StripeService();