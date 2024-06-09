// Development flag
export const __IS_DEV__ = process.env.NODE_ENV === "development";

// Production flag
export const __IS_PROD__ = process.env.NODE_ENV === "production";

export const HTTP = {
   MEDIA_TYPES: {
      APPLICATION_JSON: `application/json`,
   },
};

export const USER_SUBMITTED_FEEDBACK_COOKIE_NAME = `feedback-submitted`
export const USER_LOCALE_COOKIE_NAME = `NEXT_LOCALE`

export const STRIPE_PRICING_PLANS = {
   Free: `https://buy.stripe.com/test_3cscQh60k24ddws5kk`,
   Regular: `https://buy.stripe.com/test_00g3fHcoI24d0JGdQR`,
   Premium: `https://buy.stripe.com/test_4gw3fHdsM4clbokcMO`,
}