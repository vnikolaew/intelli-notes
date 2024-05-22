"use server";

import { authorizedAction, publicAction } from "lib/actions";
import { xprisma } from "@repo/db";
import { sleep } from "lib/utils";
import { z } from "zod";

export interface CookiePreferences {
   Necessary: boolean,
   Statistics: boolean,
   Functionality: boolean,
   Marketing: boolean,
}

/**
 * A public action for accepting all site cookies.
 */
export const acceptAllCookies = publicAction(z.any(), async (_, { userId }) => {
   await sleep(2000);

   const user = await xprisma.user.findUnique({
      where: { id: userId },
   });
   if (!user) return { success: false };

   await xprisma.user.update({
      where: {
         id: userId
      },
      data: {
         metadata: {
            ...user.metadata as Record<string, any>,
            "cookie-consent": true,
            "cookie-preferences": {
               Necessary: true,
               Statistics: true,
               Functionality: true,
               Marketing: true,
            },
         },
      },
   });
   return { success: true };
});

/**
 * A public action for declining all site cookies.
 */
export const declineCookieConsent = publicAction(z.any(), async (_, { userId }) => {
   await sleep(2000);
   const user = await xprisma.user.findFirst({
      where: { id: userId },
   });
   if (!user) return { success: false };

   await xprisma.user.update({
      where: {
         id: userId
      },
      data: {
         metadata: {
            ...user.metadata as Record<string, any>,
            "cookie-consent": false,
         },
      },
   });
   return { success: true };
});


const cookiePreferencesSchema = z.object({
   Necessary: z.boolean(),
   Statistics: z.boolean(),
   Functionality: z.boolean(),
   Marketing: z.boolean(),
});

/**
 * A public action for managing user's cookie preferences.
 */
export const updateCookiePreferences = authorizedAction(cookiePreferencesSchema, async (cookiePreferences: CookiePreferences, { userId }) => {
   await sleep(2000);
   const user = await xprisma.user.findUnique({
      where: { id: userId },
   });
   if (!user) return { success: false };

   await xprisma.user.update({
      where: {
         id: userId
      },
      data: {
         metadata: {
            ...user.metadata as Record<string, any>,
            "cookie-preferences": cookiePreferences,
            "cookie-consent": true,
         },
      },
   });

   return { success: true };
});

const changeThemeSchema = z.union([z.literal(`light`), z.literal(`dark`), z.literal(`system`)]);

/**
 * An authorized action for changing the user's site color theme.
 */
export const changeUserTheme = authorizedAction(changeThemeSchema, async (theme, { userId }) => {
   await sleep(2000);

   const user = await xprisma.user.findFirst({
      where: { id: userId },
   });
   if (!user) return { success: false };

   await xprisma.user.update({
      where: {
         id: userId
      },
      data: {
         metadata: {
            ...user.metadata as Record<string, any>,
            "theme": theme,
         },
      },
   });

   return { success: true };
});
