import {
   FaqOne,
   CtaSectionOne,
   HeroSectionTwo, FeaturesTwo,
} from "@repo/ui/components";
import { APP_NAME } from "config/site";
import HeroSectionLogo from "components/common/icons/HeroSectionLogo";
import Image from "next/image";
import aiAnimation from "public/ai-animation.gif";
import { Inter as FontSans } from "next/font/google";
import { cn } from "lib/utils";
import { NotebookPen, Server, Sparkles } from "lucide-react";

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

]
/**
 * The site's main landing page.
 * @constructor
 */
export default async function Page(): Promise<JSX.Element> {
   return (
      <section className={cn(`flex flex-col items-center p-12 min-h-[70vh] gap-4 font-sans`, inter.variable)}>
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
         <FaqOne />
         <CtaSectionOne appName={APP_NAME} />
      </section>
   );
}
