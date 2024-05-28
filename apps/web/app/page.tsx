import {
   FaqOne,
   CtaSectionOne,
   HeroSectionTwo,
} from "@repo/ui/components";
import { APP_NAME } from "config/site";
import HeroSectionLogo from "components/common/icons/HeroSectionLogo";
import Image from "next/image";
import aiAnimation from "public/ai-animation.gif"

/**
 * The site's main landing page.
 * @constructor
 */
export default async function Page(): Promise<JSX.Element> {
   return (
      <section className={`flex flex-col items-center p-12 min-h-[70vh] gap-4`}>
         <HeroSectionTwo
            heroLogo={(
               <div className={`relative !h-full !w-full flex items-center justify-center`}>
                  <div className={`relative w-[200px]`}>
                     <Image className={`absolute w-32 h-32 top-0 right-0 -translate-y-1/2 translate-x-1/3`} src={aiAnimation} alt={`ai-animation`} />
                     <HeroSectionLogo className={`w-full`} />
                  </div>
               </div>
            )}
            appDescription={<>
               Unleash the power of AI to transform your note-taking with <span
               className={`test-gradient drop-shadow-lg`}> IntelliNotes </span>, where smart technology meets
               seamless organization.
            </>} />
         <FaqOne />
         <CtaSectionOne appName={APP_NAME} />
      </section>
   );
}
