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

const inter = FontSans({ subsets: ["latin"], variable: "--font-sans" });

const FEATURES = [
   {
      title: `Powerful AI`,
      description: `IntelliNotes is powered by advanced AI technology, ensuring that your notes are always up-to-date and accurate.`,
      icon: <Sparkles size={60} />,
   },
   {
      title: `Easy Note-Taking`,
      description: `Effortlessly jot down and organize your thoughts, documents, and more with IntelliNotes.`,
      icon: <NotebookPen size={60} />,
   },
   {
      title: `Secure Storage`,
      description: `Keep your notes and documents safe with IntelliNotes's secure storage system.`,
      icon: <Server size={60} />,
   },

];
/**
 * The site's main landing page.
 * @constructor
 */
export default async function Page(): Promise<JSX.Element> {
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
               Unleash the power of AI to transform your note-taking with <span
               className={`test-gradient drop-shadow-lg`}> IntelliNotes </span>
            </>} />
         <FeaturesTwo features={FEATURES} />
         <FaqOne faqs={[
            {
               question: `How do I get started with ${APP_NAME}?`,
               answer: `Getting started with ${APP_NAME} is easy! Simply sign up for a free account, and you can start creating and organizing your notes right away. Our intuitive interface will guide you through the process.`,
            },
            {
               question: `Is my data secure with ${APP_NAME}?`,
               answer: `Yes, your data is highly secure with ${APP_NAME}. We use advanced encryption methods to ensure that your notes are protected and only accessible to you. Additionally, our platform complies with industry-standard security practices.`
            },
            {
               question: `Can I use ${APP_NAME} on multiple devices?`,
               answer: `Absolutely! ${APP_NAME} is designed to be fully responsive and works seamlessly across all your devices, including smartphones, tablets, and desktops. Your notes are synchronized in real-time, so you can access them from anywhere.`
            },
            {
               question: `What features does ${APP_NAME} offer for organizing notes?`,
               answer: `${APP_NAME} offers a variety of features to help you organize your notes efficiently. You can create tags, categories, and folders to sort your notes. Additionally, our powerful search functionality allows you to quickly find any note by keyword, date, or tag.`
            },
            {
               question: `Is there a limit to the number of notes I can create?`,
               answer: `${APP_NAME} does not impose a hard limit on the number of notes you can create.`
            }

         ]} />
         {/*<CtaSectionOne appName={APP_NAME} />*/}
      </section>
   );
}
