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

   const FOOTER_LINKS = {
      title: t(`Footer.Links.Title`),
      links: [
         {
            title: t(`Footer.Links.Features`),
            href: `/#features`,
         },
         {
            title: t(`Footer.Links.Support`),
            href: `mailto:${LINKS.email}`,
         },
         {
            title: t(`Footer.Links.Report`),
            href: `?report=true`,
         },
      ],
   }

   const FOOTER_LEGAL = {
      title: t(`Footer.Legal.Title`),
      links: [
         {
            title: t(`Footer.Legal.Terms`),
            href: `/tos`,
         },
         {
            title: t(`Footer.Legal.Privacy`),
            href: `/privacy-policy`,
         },
         {
            title: t(`Footer.Legal.Cookie`),
            href: `/cookie-policy`,
         },
      ]
   }

   return (
      <FooterTwo
         appDescription={APP_DESCRIPTION}
         appLogo={appLogo}
         appName={APP_NAME}
         links={LINKS}
         legal={FOOTER_LEGAL}
         socialLinks={{ ...LINKS, title: t(`Index.Footer.Socials`) }}
      />

   );
};

export default AppFooter;