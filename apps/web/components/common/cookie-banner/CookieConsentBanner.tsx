import React from "react";
import { xprisma } from "@repo/db";
import { auth } from "@/auth";
import CookieConsentBannerClientTwo from "./CookieConsentBannerClientTwo";

export interface CookieConsentBannerProps {
}

/**
 * A cookie consent banner displayed at the bottom of the page.
 * @constructor
 */
const CookieConsentBanner = async ({}: CookieConsentBannerProps) => {
   const session = await auth();
   if (!session) return null;

   const user = (await xprisma.user.findUnique({
      where: { id: session.user?.id },
      select: { metadata: true, cookieConsent: true, cookiePreferences: true },
   }))

   const cookieConsentGranted = user?.cookieConsent
   const cookiePreferences = user?.cookiePreferences;

   if (cookieConsentGranted) return null;
   return <CookieConsentBannerClientTwo cookiePreferences={cookiePreferences} />;
};

export default CookieConsentBanner;
