import {
   FaqOne,
   HeroSectionTwo, FeaturesTwo,
} from "@repo/ui/components";
import { APP_NAME } from "config/site";
import HeroSectionLogo from "components/common/icons/HeroSectionLogo";
import Image from "next/image";
import aiAnimation from "public/ai-animation.gif";
import { Inter as FontSans } from "next/font/google";
import { cn } from "lib/utils";
import { NotebookPen, Server, Sparkles } from "lucide-react";
import { Spotlight } from "components/ui/Spotlight";
import initTranslations from "@/app/[locale]/i18n";
import { TFunction } from "i18next";

const inter = FontSans({ subsets: ["latin"], variable: "--font-sans" });

const FEATURES = (t: TFunction<"translation", undefined>) =>  [
   {
      title: t(`Index.Feature1Title`),
      description: t(`Index.Feature1Description`),
      icon: <Sparkles size={60} />,
   },
   {
      title: t(`Index.Feature2Title`),
      description: t(`Index.Feature2Description`),
      icon: <NotebookPen size={60} />,
   },
   {
      title: t(`Index.Feature3Title`),
      description: t(`Index.Feature3Description`),
      icon: <Server size={60} />,
   },
];

export const dynamic = "force-static";

/**
 * The site's main landing page.
 * @constructor
 */
export default async function Page({ params: { locale } }): Promise<JSX.Element> {
   const { t } = await initTranslations(locale, [`home`]);
   return (
      <section className={cn(`flex flex-col items-center p-12 min-h-[70vh] gap-4 font-sans`, inter.variable)}>
         <Spotlight
            className="-top-40 left-0 md:left-1/2 md:-top-16"
            fill="var(--blue-500)"
         />
         <HeroSectionTwo
            heroLogo={(
               <div className={`relative !h-full !w-full flex items-center justify-center`}>
                  <div className={`relative w-[200px]`}>
                     <Image className={`absolute w-32 h-32 top-0 right-0 -translate-y-1/2 translate-x-1/3`}
                            src={aiAnimation} alt={`ai-animation`} />
                     <HeroSectionLogo className={`w-full !stroke-2`} />
                  </div>
               </div>
            )}
            appDescription={<>
               {t(`Index.HeroTitle`)} <span
               className={`test-gradient drop-shadow-lg`}> {APP_NAME} </span>
            </>} />
         <FeaturesTwo features={FEATURES(t)} />
         <FaqOne faqs={[
            {
               question: t(`Index.FAQ1Q`),
               answer: `Getting started with ${APP_NAME} is easy! Simply sign up for a free account, and you can start creating and organizing your notes right away. Our intuitive interface will guide you through the process.`,
            },
            {
               question: t(`Index.FAQ2Q`),
               answer: `Yes, your data is highly secure with ${APP_NAME}. We use advanced encryption methods to ensure that your notes are protected and only accessible to you. Additionally, our platform complies with industry-standard security practices.`,
            },
            {
               question: t(`Index.FAQ3Q`),
               answer: `Absolutely! ${APP_NAME} is designed to be fully responsive and works seamlessly across all your devices, including smartphones, tablets, and desktops. Your notes are synchronized in real-time, so you can access them from anywhere.`,
            },
            {
               question: t(`Index.FAQ4Q`),
               answer: `${APP_NAME} offers a variety of features to help you organize your notes efficiently. You can create tags, categories, and folders to sort your notes. Additionally, our powerful search functionality allows you to quickly find any note by keyword, date, or tag.`,
            },
            {
               question: t(`Index.FAQ5Q`),
               answer: `${APP_NAME} does not impose a hard limit on the number of notes you can create.`,
            },

         ]} />
         {/*<CtaSectionOne appName={APP_NAME} />*/}
      </section>
   );
}
