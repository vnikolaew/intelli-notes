import React from "react";
import CookieConsentBannerClient from "./CookieConsentBannerClient";
import { xprisma } from "@repo/db";
import { auth } from "../../auth";

export interface CookieConsentBannerProps {
}

const CookieConsentBanner = async ({}: CookieConsentBannerProps) => {
   const session = await auth();
   if (!session) return null;

   const user = (await xprisma.user.findUnique({
      where: { id: session.user?.id },
      select: { metadata: true, cookieConsent: true, cookiePreferences: true },
   }))

   const cookieConsentGranted = user.cookieConsent
   const cookiePreferences = user.cookiePreferences;

   // if (cookieConsentGranted) return null;
   return <CookieConsentBannerClient cookieConsent={cookieConsentGranted} cookiePreferences={cookiePreferences} />;
};

export default CookieConsentBanner;
