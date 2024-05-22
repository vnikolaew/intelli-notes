import { ExternalToast } from "sonner";

export const APP_NAME = `Next SaaS Template`;
export const APP_HOST_NAME = `next-saas-template`;
export const APP_DESCRIPTION = `A SaaS Template built with NextJS`;

export const APP_VERSION = `1.0.0`;

export const __IS_DEV__ = process.env.NODE_ENV === "development";

export const HTTP = {
   MEDIA_TYPES: {
      APPLICATION_JSON: `application/json`,
   },
};

export const TOASTS: Record<string, ExternalToast & { message: string }> = {
   FORGOT_PASSWORD: {
      message: `Password reset successful`,
      description: `You've successfully reset your password.`,
      duration: 3_000,
   },
   UPLOAD_SUCCESS: {
      message: `Image upload successful`,
      description: `You've successfully uploaded your media.`,
      className: ``,
      classNames: {
         title: `text-lg`,
         description: `text-md`,
      },
      duration: 10_000,
   },
   MANY_UPLOAD_SUCCESS: {
      message: `Image uploads successful`,
      description: `You've successfully uploaded your media.`,
      className: ``,
      classNames: {
         title: `text-lg`,
         description: `text-md`,
      },
      duration: 10_000,
   },
   UPDATE_IMAGE_SUCCESS: {
      message: `Image update successful`,
      description: `You've successfully updated your media.`,
      className: ``,
      classNames: {
         title: `text-lg`, description: `text-md`,
      },
      duration: 10_000,
   },
   DELETE_IMAGE_SUCCESS: {
      message: `Image removal successful`,
      description: `You've successfully deleted your media.`,
      className: ``,
      classNames: {
         title: `text-lg`, description: `text-md`,
      },
      duration: 10_000,
   },

   CREATE_COLLECTION_SUCCESS: {
      message: `Collection successfully created.`,
      description: `You've successfully created a new collection.`,
      className: ``,
      classNames: {
         title: `text-lg`, description: `text-md`,
      },
      duration: 10_000,
   },
   EDIT_COLLECTION_SUCCESS: {
      message: `Collection successfully edited.`,
      description: `You've successfully edited the collection.`,
      className: ``,
      classNames: {
         title: `text-lg`, description: `text-md`,
      },
      duration: 10_000,
   },
   DELETE_COLLECTION_SUCCESS: {
      message: `Collection successfully deleted.`,
      description: `You've successfully deleted the collection.`,
      className: ``,
      classNames: {
         title: `text-lg`, description: `text-md`,
      },
      duration: 10_000,
   },
   EDIT_PROFILE_SUCCESS: {
      message: `Profile successfully edited.`,
      description: `You've successfully edited your profile details.`,
      className: ``,
      classNames: {
         title: `text-lg`, description: `text-md`,
      },
      duration: 10_000,
   },
   CHANGE_PROFILE_PICTURE_SUCCESS: {
      message: `Profile picture changed.`,
      description: `You've successfully changed your profile picture.`,
      className: ``,
      classNames: {
         title: `text-lg`, description: `text-md`,
      },
      duration: 10_000,
   },
   CHANGE_COOKIE_PREFERENCES_SUCCESS: {
      message: `Cookie preferences saved.`,
      description: `You've successfully saved your cookies preferences.`,
      className: ``,
      classNames: {
         title: `text-lg`, description: `text-md`,
      },
      duration: 10_000,
   },
   ACCEPT_COOKIE_CONSENT_SUCCESS: {
      message: `Cookies accepted.`,
      description: `You've successfully accepted the usage of cookies.`,
      className: ``,
      classNames: {
         title: `text-lg`, description: `text-md`,
      },
      duration: 10_000,
   },
   CHANGE_PROFILE_COVER_IMAGE_SUCCESS: {
      message: `Cover image changed.`,
      description: `You've successfully changed your profile cover image.`,
      className: ``,
      classNames: {
         title: `text-lg`, description: `text-md`,
      },
      duration: 10_000,
   },
   CHANGE_PROFILE_COVER_IMAGE_FAILURE: {
      message: `Cover image changed.`,
      description: `You've successfully changed your profile cover image.`,
      className: ``,
      classNames: {
         title: `text-lg`, description: `text-md`,
      },
      duration: 10_000,
   },
   SEND_MESSAGE_SUCCESS: {
      message: `Message successfully sent.`,
      description: `You've successfully send a message to {user}.`,
      className: ``,
      classNames: {
         title: `text-lg`, description: `text-md`,
      },
      duration: 10_000,
   },
   SEND_MESSAGE_FAILURE: {
      message: `Message could not be sent.`,
      description: `There was a problem sending your message.`,
      className: ``,
      classNames: {
         title: `text-lg`, description: `text-md`,
      },
      duration: 10_000,
   },
   USER_REPORT_SUCCESS: {
      message: `Message could not be sent.`,
      description: `There was a problem sending your message.`,
      className: ``,
      classNames: {
         title: `text-lg`, description: `text-md`,
      },
      duration: 10_000,
   },
} as const;


export const LINKS = {
   twitter: `https://twitter.com/vnikolaew25`,
   github: `https://github.com/vnikolaew`,
   linkedIn: `https://www.linkedin.com/in/victorio-nikolaev-384a43298`,
   email: `victorio.nikolaev25@gmail.com`,
} as const;


export const STRIPE_PRICING_PLANS = {
   Free: `https://buy.stripe.com/test_3cscQh60k24ddws5kk`,
   Regular: `https://buy.stripe.com/test_00g3fHcoI24d0JGdQR`,
   Premium: `https://buy.stripe.com/test_4gw3fHdsM4clbokcMO`,
}