import type { Metadata } from "next";
import { Toaster } from "components/ui/sonner";
import { Inter as FontSans } from "next/font/google";
import { __IS_DEV__, APP_DESCRIPTION, APP_NAME, LINKS } from "lib/consts";
import Providers from "../providers";
import { cn } from "../lib/utils";
import { FooterTwo } from "@repo/ui/components";
import LoadingBar from "components/common/LoadingBar";
import Header from "components/common/Header";
import ScrollToTopButton from "components/common/ScrollToTopButton";
import CookieConsentBanner from "components/common/CookieConsentBanner";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import appLogo from "public/logo.png"

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
         <body className={cn(`min-h-screen font-sans antialiased`, inter.variable)}>
         <LoadingBar />
         <Header />
         <main className={cn(`flex-1 min-h-[70vh]`)}>
            {children}
            <ScrollToTopButton />
         </main>
         <Toaster />
         {!__IS_DEV__ && <Analytics />}
         <CookieConsentBanner />
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
