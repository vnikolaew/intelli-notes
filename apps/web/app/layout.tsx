import type { Metadata } from "next";
import { Toaster } from "components/ui/sonner";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import { APP_DESCRIPTION, APP_NAME, LINKS } from "config/site";
import Providers from "providers";
import { cn } from "lib/utils";
import { FooterTwo } from "@repo/ui/components";
import LoadingBar from "components/common/LoadingBar";
import Header from "components/common/Header";
import ScrollToTopButton from "components/common/ScrollToTopButton";
import CookieConsentBanner from "components/common/CookieConsentBanner";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import appLogo from "public/logo.jpg";
import { __IS_DEV__ } from "lib/consts";
import { sfMono } from "assets/fonts";

const inter = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
   title: APP_NAME,
   description: APP_DESCRIPTION,
};

export default function RootLayout({
                                      children,
                                   }: {
   children: React.ReactNode;
}): JSX.Element {
   return (
      <html suppressContentEditableWarning lang="en">
      <head>
         <title>{APP_NAME}</title>
      </head>
      <Providers>
         <body className={cn(`min-h-screen font-mono antialiased`, sfMono.variable)}>
         <LoadingBar />
         <Header />
         <main className={cn(`flex-1 min-h-[70vh]`)}>
            {children}
         </main>
         <ScrollToTopButton />
         <CookieConsentBanner />
         <Toaster />
         {!__IS_DEV__ && <Analytics />}
         <FooterTwo
            appDescription={APP_DESCRIPTION}
            appLogo={appLogo}
            appName={APP_NAME}
            links={LINKS}
         />
         </body>
      </Providers>
      </html>
   );
}
