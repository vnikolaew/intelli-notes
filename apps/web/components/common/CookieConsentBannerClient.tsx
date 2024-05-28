"use client";
import React, { Fragment, useState } from "react";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Cookie, ExternalLink, SlidersHorizontal, X } from "lucide-react";
import { acceptAllCookies, declineCookieConsent, updateCookiePreferences } from "./actions";
import { useAction } from "next-safe-action/hooks";
import { LoadingSpinner } from "./LoadingSpinner";
import { cn } from "lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "components/ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Switch } from "components/ui/switch";
import { isExecuting } from "next-safe-action/status";
import { motion } from "framer-motion";
import { TOASTS } from "config/toasts";
import { APP_HOST_NAME } from "config/site";


export interface CookieConsentBannerProps {
   cookieConsent: boolean;
   cookiePreferences: Record<string, any>;
}

const BANNER_COPY = `We use cookies to give you the best possible experience with <b>${APP_HOST_NAME.toLowerCase()}.com</b>. Some are essential for this site to function; others help us understand how you use the site, so we can improve it. We may also use cookies for targeting purposes. Click <b>Accept all cookies</b> to proceed as specified, or click <b>Manage my preferences</b> to choose the types of cookies you will accept. Cookie policy.`;
const MANAGE_PREFERENCES = `Manage my preferences`;
const ACCEPT_ALL = `Accept all cookies`;

const MotionCookieConsent = motion(CookieConsent);

const CookieConsentBannerClient = ({ cookiePreferences, cookieConsent }: CookieConsentBannerProps) => {
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
         <MotionCookieConsent
            acceptOnOverlayClick
            overlayClasses={hideBanner ? `hidden` : ``}
            enableDeclineButton
            flipButtons
            location="bottom"
            buttonText={isExecuting(status) ? <LoadingSpinner text={`Loading ...`} /> :
               <div className={`flex items-center gap-2 text-sm`}>
                  <Cookie className={`text-orange-800 group-hover:text-white`} size={16} />
                  {ACCEPT_ALL}
               </div>}
            declineButtonText={isExecuting(declineStatus) ? <LoadingSpinner text={`Loading ...`} /> :
               <div className={`flex items-center gap-2 text-sm`}>
                  <SlidersHorizontal size={14} />
                  {MANAGE_PREFERENCES}
               </div>}
            buttonStyle={{}}
            cookieName="CookieConsent"
            contentClasses={`!h-fit !text-black !w-full !mx-auto !flex-[1_0_60px] !mb-0`}
            hideOnAccept={false}
            containerClasses={cn(`!bg-white !z-10 !text-black !w-3/5 !max-w-[800px] !bottom-8 !left-[50%] !-translate-x-[50%] !mx-auto !shadow-xl flex flex-col gap-2 p-4 !pb-2 !rounded-xl`)}
            buttonClasses={cn(
               `!bg-white flex items-center gap-2 !text-black !rounded-lg group !px-6 !py-2 !shadow-md  transitions-colors duration-200 !mx-0`,
               !isExecuting(status) && `hover:!bg-orange-800 hover:!text-white`,
               isExecuting(status) && `opacity-50 `,
            )}
            customButtonProps={{ disabled: isExecuting(status) }}
            customDeclineButtonProps={{ disabled: isExecuting(declineStatus) }}
            declineButtonClasses={cn(`!bg-primary dark:!bg-secondary flex items-center gap-2 !text-white !rounded-lg !px-6 !py-2 !shadow-md hover:!opacity-90 transitions-colors duration-200`,
               isExecuting(declineStatus) && `opacity-50`,
            )}
            buttonWrapperClasses={`flex w-full items-center gap-1 justify-end`}
            onAccept={acceptAction}
            onDecline={() => {
               setHideBanner(true);
               setShowManagePrefsBanner(true);
            }}
            expires={450}
         >
            <div className={`absolute right-4 top-3`}>
               <X onClick={_ => setHideBanner(true)}
                  className={`cursor-pointer rounded-full hover:bg-neutral-500 !p-1 transition-colors duration-200`}
                  size={22} />
            </div>
            <p dangerouslySetInnerHTML={{ __html: BANNER_COPY }}
               className={`text-left w-full leading-tight font-normal !mb-0 !text-sm`}></p>
         </MotionCookieConsent>
         <CustomizePreferencesModal
            hideBanner={() => setHideBanner(true)}
            cookiePreferences={cookiePreferences}
            onBack={() => {
               setShowManagePrefsBanner(false);
               setHideBanner(false);
            }} open={showManagePrefsBanner} />
      </Fragment>
   );
};

interface CustomizePreferencesModalProps {
   onBack: () => void,
   hideBanner: () => void,
   open: boolean,
   cookiePreferences: Record<string, any>
}

export interface CookiePreferences {
   Necessary: boolean,
   Statistics: boolean,
   Functionality: boolean,
   Marketing: boolean,
}

const CustomizePreferencesModal = ({ open, onBack, cookiePreferences, hideBanner }: CustomizePreferencesModalProps) => {
   const [preferences, setPreferences] = useState<CookiePreferences>({
      Necessary: cookiePreferences?.[`Necessary`] === true,
      Statistics: cookiePreferences?.[`Statistics`] === true,
      Functionality: cookiePreferences?.[`Functionality`] === true,
      Marketing: cookiePreferences?.[`Marketing`] === true,
   });
   const { status, execute: handleSavePreferencesAction } = useAction(updateCookiePreferences, {
      onSuccess: res => {
         if (res.success) {
            onBack?.();
            hideBanner?.();

            const { message, ...rest } = TOASTS.CHANGE_COOKIE_PREFERENCES_SUCCESS;
            toast(message, { ...rest, icon: <Cookie className={`text-orange-800`} size={16} /> });
         }
      },
   });

   return (
      <div
         className={
            cn(`bg-red-500 fixed hidden !z-20 gap-2 items-center justify-between !w-2/5 !mx-auto !bottom-8 !left-[30%] rounded-xl shadow-md`,
               open && `!flex !flex-col`)}>
         <Card className={`w-full p-4 !bg-white !text-black`}>
            <CardHeader className={`p-0 flex !flex-row items-center gap-2`}>
               <Button onClick={_ => {
                  onBack?.();
               }} variant={`ghost`} className={`rounded-full !w-fit !h-fit p-2`}>
                  <ArrowLeft size={18} />
               </Button>
               <h2 className={`!mt-0 text-md font-semibold`}>Customize your preferences</h2>
            </CardHeader>
            <Separator className={`w-full mx-auto my-2 !bg-neutral-300`} />
            <CardContent className={`mt-4`}>
               <div className={`grid grid-cols-2 gap-4 gap-x-12`}>
                  <PreferenceSwitch
                     label={`Necessary`}
                     checked={preferences.Necessary}
                     onCheckedChange={value => setPreferences({ ...preferences, Necessary: value })} />

                  <PreferenceSwitch
                     label={`Statistics`}
                     checked={preferences.Statistics}
                     onCheckedChange={value => setPreferences({ ...preferences, Statistics: value })} />

                  <PreferenceSwitch
                     label={`Functionality`}
                     checked={preferences.Functionality}
                     onCheckedChange={value => setPreferences({ ...preferences, Functionality: value })} />

                  <PreferenceSwitch
                     label={`Marketing`}
                     checked={preferences.Marketing}
                     onCheckedChange={value => setPreferences({ ...preferences, Marketing: value })} />
               </div>
            </CardContent>
            <CardFooter className={`bg-neutral-100 mt-2 p-2 px-4 flex items-center justify-between !-mx-4 !-mb-4`}>
               <Button asChild className={`!text-neutral-400`} variant={`link`}>
                  <Link href={`/service/privacy`}>
                     Learn more <ExternalLink className={`ml-1 text-neutral-400 `} size={12} />
                  </Link>
               </Button>
               <Button
                  disabled={isExecuting(status)}
                  onClick={_ => {
                     handleSavePreferencesAction(preferences);
                  }}
                  size={`sm`}
                  className={` rounded-md !px-8 shadow-md`} variant={`default`}>
                  {isExecuting(status) ? (<LoadingSpinner text={`Saving ...`} />) : (
                     `Save and submit`
                  )}
               </Button>
            </CardFooter>
         </Card>
      </div>
   );
};

interface PreferenceSwitchProps {
   label: string;
   checked: boolean;
   onCheckedChange: (checked: boolean) => void;
}


const PreferenceSwitch = ({ label, onCheckedChange, checked }: PreferenceSwitchProps) => {
   return (
      <div className={`flex items-center justify-between`}>
         <h2 className={`font-semibold text-base`}>{label}</h2>
         <Switch
            checked={checked}
            onCheckedChange={onCheckedChange}
            className={` h-6`} />
      </div>
   );

};
export default CookieConsentBannerClient;
