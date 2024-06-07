import type { Metadata } from "next";
import { Toaster } from "components/ui/sonner";
import { APP_DESCRIPTION, APP_NAME, LINKS } from "config/site";
import Providers from "providers";
import { cn } from "lib/utils";
import { FooterTwo } from "@repo/ui/components";
import LoadingBar from "components/common/LoadingBar";
import Header from "components/common/Header";
import ScrollToTopButton from "components/common/ScrollToTopButton";
import CookieConsentBanner from "@/components/common/cookie-banner/CookieConsentBanner";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import appLogo from "public/logo.jpg";
import { __IS_DEV__ } from "lib/consts";
import { sfMono } from "assets/fonts";
import { Suspense } from "react";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
   title: APP_NAME,
   description: APP_DESCRIPTION,
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
                                            children,
                                         }: {
   children: React.ReactNode;
}): Promise<JSX.Element> {
   const locale = await getLocale();
   const messages = await getMessages();

   return (
      <html className={`light`} suppressContentEditableWarning lang={locale} style={{ colorScheme: `light` }}>
      <head>
         <title>{APP_NAME}</title>
      </head>
      <Providers>
         <body className={cn(`min-h-screen font-mono antialiased `, sfMono.variable)}>
         <NextIntlClientProvider messages={messages}>
            <LoadingBar />
            <Header />
            <main className={cn(`flex-1 min-h-[70vh]`)}>
               {children}
            </main>
            <ScrollToTopButton />
            <Suspense fallback={null}>
               <CookieConsentBanner />
            </Suspense>
            <Toaster />
            {!__IS_DEV__ && <Analytics />}
            <FooterTwo
               appDescription={APP_DESCRIPTION}
               appLogo={appLogo}
               appName={APP_NAME}
               links={LINKS}
            />
         </NextIntlClientProvider>
         </body>
      </Providers>
      </html>
   );
}
