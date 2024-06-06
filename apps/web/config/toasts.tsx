"use client"

import { ExternalToast } from "sonner";
import React, { ReactNode } from "react";
import { toast as sonnerToast } from "sonner";
import { Check } from "lucide-react";

export const TOASTS: Record<string, ExternalToast & { message: ReactNode }> = {
   FORGOT_PASSWORD: {
      message: `Password reset successful`,
      description: `You've successfully reset your password.`,
      duration: 3_000,
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
   USER_REPORT_SUCCESS: {
      message: `Message could not be sent.`,
      description: `There was a problem sending your message.`,
      className: ``,
      classNames: {
         title: `text-lg`, description: `text-md`,
      },
      duration: 10_000,
   },
   EXPORT_SUCCESS: {
      message:
         (<div className={`flex items-center gap-2`}>
            <Check className={`text-green-600`} size={18} />
            <span>
Export successful
</span>
         </div>),
      className: `text-base font-normal`,
   },
   CREATE_CATEGORY_SUCCESS: {
      message:
         (<div className={`flex items-center gap-2`}>
            <Check className={`text-green-600`} size={18} />
            <span>Category successfully created!</span>
         </div>),
      className: `text-base font-normal`,
   },
   CHANGE_CATEGORY_SUCCESS: {
      message:
         (<div className={`flex items-center gap-2`}>
            <Check className={`text-green-600`} size={18} />
            <span>Note category successfully changed!</span>
         </div>),
      className: `text-base font-normal`,
   },
   DELETE_NOTE_SUCCESS: {
      message:
         (<div className={`flex items-center gap-2`}>
            <Check className={`text-green-600 bg-green-600`} size={18} />
            <span>Note successfully deleted!</span>
         </div>),
      className: `text-base font-normal`,
   },
   USER_FEEDBACK_SUCCESS: {
      message:
         (<div className={`flex items-center gap-2`}>
            <Check className={`text-green-600 bg-green-600`} size={18} />
            <span>Feedback successfully submitted!</span>
         </div>),
      description: `Thank you for your feedback!`,
      className: `text-base font-normal`,
   },
   CHANGE_USER_PROFILE_PIC_SUCCESS: {
      message:
         (<div className={`flex items-center gap-2`}>
            <Check className={`text-green-600 bg-green-600`} size={18} />
            <span>Profile picture successfully changed!</span>
         </div>),
      className: `text-base font-normal`,
   },
} as const;

export const toast = ({ message, ...config }: ExternalToast & { message: ReactNode }) => sonnerToast(message, config);