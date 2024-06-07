import type { Metadata } from "next";
import { Toaster } from "components/ui/sonner";
import { APP_DESCRIPTION, APP_NAME } from "config/site";
import Providers from "providers";
import { cn } from "lib/utils";
import LoadingBar from "components/common/LoadingBar";
import Header from "components/common/Header";
import ScrollToTopButton from "components/common/ScrollToTopButton";
import CookieConsentBanner from "@/components/common/cookie-banner/CookieConsentBanner";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { __IS_DEV__ } from "lib/consts";
import { sfMono } from "assets/fonts";
import { Suspense } from "react";
import initTranslations from "@/app/[locale]/i18n";
import TranslationsProvider from "@/providers/TranslationsProvider";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";
import AppFooter from "@/components/AppFooter";

export const metadata: Metadata = {
   title: APP_NAME,
   description: APP_DESCRIPTION,
};

export function generateStaticParams() {
   return i18nConfig.locales.map(locale => ({ locale }));
}

export const dynamic = "force-dynamic";

const i18nNamespaces = ["home"];

export default async function RootLayout({
                                            children,
                                            params: { locale },
                                         }: {
   children: React.ReactNode;
   params: { locale: string }
}): Promise<JSX.Element> {
   const { t, resources } = await initTranslations(locale, i18nNamespaces);

   return (
      <html dir={dir(locale)} lang={locale} className={`light`} suppressContentEditableWarning
            style={{ colorScheme: `light` }}>
      <head>
         <title>{APP_NAME}</title>
      </head>
      <TranslationsProvider resources={resources} namespaces={i18nNamespaces} locale={locale}>
         <Providers>
            <body className={cn(`min-h-screen font-mono antialiased `, sfMono.variable)}>
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
           <AppFooter t={t} />
            </body>
         </Providers>
      </TranslationsProvider>
      </html>
   );
}
