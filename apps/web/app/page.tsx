import {
   FaqOne,
   CtaSectionOne,
   HeroSectionTwo,
} from "@repo/ui/components";
import { APP_DESCRIPTION, APP_NAME } from "config/site";

/**
 * The site's main landing page.
 * @constructor
 */
export default async function Page(): Promise<JSX.Element> {
   return (
      <section className={`flex flex-col items-center p-12 min-h-[70vh] gap-4`}>
         <HeroSectionTwo appDescription={<>
            Unleash the power of AI to transform your note-taking with <span
            className={`test-gradient drop-shadow-lg`}> IntelliNotes</span>, where smart technology meets
            seamless organization.
         </>} appName={APP_NAME} />
         <FaqOne />
         <CtaSectionOne appName={APP_NAME} />
      </section>
   );
}
