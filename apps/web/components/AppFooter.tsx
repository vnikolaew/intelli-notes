import React from "react";
import { FooterTwo } from "@repo/ui/components";
import appLogo from "@/public/logo.jpg";
import { APP_NAME, LINKS } from "@/config/site";
import { TFunction } from "i18next";

export interface AppFooterProps {
   t: TFunction<any, undefined>;
}

const AppFooter = async ({ t }: AppFooterProps) => {
   const APP_DESCRIPTION = `${t(`Index.HeroTitle`)} ${APP_NAME.replaceAll(` `, ``)}, ${t(`Index.HeroDescription`).toLowerCase()}`;

   return (
      <FooterTwo
         appDescription={APP_DESCRIPTION}
         appLogo={appLogo}
         appName={APP_NAME}
         links={{
            title: `LINKS`, links: [
               {
                  title: `Features`,
                  href: `/#features`,
               },
               {
                  title: `Support`,
                  href: `mailto:${LINKS.email}`,
               },
               {
                  title: `Report an issue`,
                  href: `?report=true`,
               },
            ],
         }}
         legal={{
            title: `LEGAL`, links: [
               {
                  title: `Terms of Service`,
                  href: `/tos`,
               },
               {
                  title: `Privacy Policy`,
                  href: `/privacy-policy`,
               },
               {
                  title: `Cookie Policy`,
                  href: `/cookie-policy`,
               },
            ],
         }}
         socialLinks={{ ...LINKS, title: `Socials` }}
      />

   );
};

export default AppFooter;