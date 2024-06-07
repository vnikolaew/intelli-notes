"use client";
import React, { Fragment, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { acceptAllCookies, declineCookieConsent } from "../actions";
import { TOASTS } from "@/config/toasts";
import { toast } from "sonner";
import { Cookie, Loader2 } from "lucide-react";
import Link from "next/link";
import { CustomizePreferencesModal } from "./CookieConsentBannerClient";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { isExecuting } from "next-safe-action/status";
import { useTranslation } from "react-i18next";

export interface CookieConsentBannerClientTwoProps {
   cookiePreferences: Record<string, any>;
}

const cookieConsentMotionProps: MotionProps = {
   initial: { opacity: 0, translateX: -20 },
   animate: { opacity: 100, translateX: 0 },
   exit: { opacity: 0, translateX: -20 },
   transition: {
      duration: .2,
   },
};

const customizePrefsModalProps: MotionProps = {
   initial: { opacity: 0, translateY: 20 },
   animate: { opacity: 100, translateY: 0 },
   exit: { opacity: 0, translateY: 20 },
   transition: {
      duration: .2,
   },
};

const CookieConsentBannerClientTwo = ({ cookiePreferences }: CookieConsentBannerClientTwoProps) => {
   const { t } = useTranslation(`home`, { keyPrefix: `CookieBanner` });
   const { status, execute: acceptAction } = useAction(acceptAllCookies, {
      onSuccess: res => {
         if (res.success) {
            setHideBanner(true);

            const { message, ...rest } = TOASTS.ACCEPT_COOKIE_CONSENT_SUCCESS;
            toast(message, { ...rest, icon: <Cookie className={`text-orange-800`} size={16} /> });
         }
      },
   });

   const { status: declineStatus, execute: declineAction } = useAction(declineCookieConsent, {
      onSuccess: res => {
         setHideBanner(true);
         setShowManagePrefsBanner(true);
      },
   });

   const [hideBanner, setHideBanner] = useState(false);
   const [showManagePrefsBanner, setShowManagePrefsBanner] = useState(false);

   return (
      <Fragment>
         <AnimatePresence>
            {!hideBanner && (
               <motion.section {...cookieConsentMotionProps}
                               className={cn("fixed max-w-3xl p-4 mx-auto bg-white border border-gray-200 md:gap-x-4 left-8 bottom-8 dark:bg-gray-900 md:flex md:items-center dark:border-gray-700 rounded-2xl z-[1000]",
                                  hideBanner && `!hidden`)}>
                  <div className="flex items-center gap-x-4">
        <span className="inline-flex p-2 text-blue-500 rounded-lg shrink-0 dark:bg-gray-800 bg-blue-100/80">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                   d="M17.9803 8.5468C17.5123 8.69458 17.0197 8.7931 16.5271 8.7931C14.2118 8.76847 12.3399 6.89655 12.3153 4.58128C12.3153 4.13793 12.3892 3.69458 12.537 3.27586C11.9951 2.68473 11.6995 1.92118 11.6995 1.13301C11.6995 0.812808 11.7488 0.492611 11.8473 0.172414C11.2315 0.0738918 10.6158 0 10 0C4.48276 0 0 4.48276 0 10C0 15.5172 4.48276 20 10 20C15.5172 20 20 15.5172 20 10C20 9.77833 20 9.55665 19.9754 9.33498C19.2611 9.26108 18.5468 8.99015 17.9803 8.5468ZM4.58128 7.31527C6.30542 7.31527 6.30542 10.0246 4.58128 10.0246C2.85714 10.0246 2.61084 7.31527 4.58128 7.31527ZM6.05912 15.7635C4.08867 15.7635 4.08867 12.8079 6.05912 12.8079C8.02956 12.8079 8.02956 15.7635 6.05912 15.7635ZM9.01478 1.33005C10.7389 1.33005 10.7389 4.28571 9.01478 4.28571C7.29064 4.28571 7.04434 1.33005 9.01478 1.33005ZM10.2463 8.84237C11.7241 8.84237 11.7241 10.8128 10.2463 10.8128C8.76848 10.8128 9.01478 8.84237 10.2463 8.84237ZM11.9704 16.9458C10.4926 16.9458 10.4926 14.9754 11.9704 14.9754C13.4483 14.9754 13.202 16.9458 11.9704 16.9458ZM16.6503 13.1034C15.4187 13.1034 15.4187 11.133 16.6503 11.133C17.8818 11.133 17.8818 13.1034 16.6503 13.1034Z"
                   fill="currentColor" />
            </svg>
        </span>
                     <p className="text-sm text-gray-600 dark:text-gray-300 leading-5">{t(`Description`)} <Link href="/cookie-policy"
                                                              className="text-blue-500 hover:underline">
                        {t(`ReadCookiePolicy`)}</Link> </p>
                  </div>

                  <div className="flex items-center mt-6 gap-x-4 shrink-0 lg:mt-0">
                     <button
                        onClick={_ => {
                           setHideBanner(true);
                           setShowManagePrefsBanner(true);
                        }}
                        className="w-1/2 text-xs text-gray-800 underline transition-colors duration-300 md:w-auto dark:text-white dark:hover:text-gray-400 hover:text-gray-600 focus:outline-none">
                        {t(`CookieSettings`)}
                     </button>

                     <button
                        disabled={isExecuting(status)}
                        onClick={_ => acceptAction(undefined)}
                        className=" text-xs w-1/2 md:w-auto font-medium bg-gray-800 rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none items-center gap-2 flex">
                        {isExecuting(status) ? (
                           <>
                              <Loader2 size={14} className={`animate-spin`} />
                              Accepting ...
                           </>
                        ) : t(`AcceptAll`)}

                     </button>
                  </div>
               </motion.section>
            )}
         </AnimatePresence>
         <AnimatePresence>
            {showManagePrefsBanner && (
               <CustomizePreferencesModal
                  onBack={() => {
                     setShowManagePrefsBanner(false);
                     setHideBanner(false);
                  }}
                  hideBanner={() => setHideBanner(true)}
                  open={showManagePrefsBanner}
                  cookiePreferences={cookiePreferences}
                  {...customizePrefsModalProps}
               />
            )}
         </AnimatePresence>
      </Fragment>
   );
};

export default CookieConsentBannerClientTwo;