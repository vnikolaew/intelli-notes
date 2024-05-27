export const __IS_DEV__ = process.env.NODE_ENV === "development";

export const HTTP = {
   MEDIA_TYPES: {
      APPLICATION_JSON: `application/json`,
   },
};


export const STRIPE_PRICING_PLANS = {
   Free: `https://buy.stripe.com/test_3cscQh60k24ddws5kk`,
   Regular: `https://buy.stripe.com/test_00g3fHcoI24d0JGdQR`,
   Premium: `https://buy.stripe.com/test_4gw3fHdsM4clbokcMO`,
}