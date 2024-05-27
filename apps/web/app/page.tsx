import { signIn } from "auth";
import { Button } from "components/ui/button";
//@ts-ignore
import { UilGoogle } from "@iconscout/react-unicons";
import {
   FeaturesAndBenefits,
   TestimonialOne,
   PricingOne,
   FaqOne,
   CtaSectionOne, TestimonialTwo,
   HeroSectionTwo
} from "@repo/ui/components";
import { STRIPE_PRICING_PLANS } from "lib/consts";
import { ServerSignedIn, ServerSignedOut } from "components/common/Auth.server";
import userImage from "public/user-1.avif";
import { APP_NAME } from "config/site";

/**
 * The site's main landing page.
 * @constructor
 */
export default async function Page(): Promise<JSX.Element> {
   return (
      <section className={`flex flex-col items-center p-12 min-h-[70vh] gap-4`}>
         <ServerSignedOut>
            <form
               action={async () => {
                  "use server";
                  await signIn("google");
               }}
            >
               <Button className={`gap-2`} type="submit">
                  <UilGoogle className={`text-red-700`} size={18} />
                  Signin with Google
               </Button>
            </form>
         </ServerSignedOut>
         <ServerSignedIn>
            <HeroSectionTwo appName={APP_NAME} />
            <FeaturesAndBenefits />
            <section className={`mt-24 w-full`}>
               <TestimonialOne user={{
                  image: userImage,
                  name: `John Doe`,
               }} />
            </section>
            <PricingOne pricingPlans={STRIPE_PRICING_PLANS} appName={APP_NAME} />
            <section className={`mt-24 w-full`}>
               <TestimonialOne user={{
                  image: userImage,
                  name: `Jack Herrington`,
               }} />
            </section>
            <FaqOne />
            <CtaSectionOne appName={APP_NAME} />
            <section className={`mt-24 w-full`}>
               <TestimonialTwo appName={APP_NAME} user={{
                  image: userImage,
                  name: `Daniel Jones`,
               }} />
            </section>
         </ServerSignedIn>
      </section>
   );
}
