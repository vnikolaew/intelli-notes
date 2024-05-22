import { signIn } from "../auth";
import { Button } from "../components/ui/button";
//@ts-ignore
import { UilGoogle } from "@iconscout/react-unicons";
import { HeroSectionOne, FeaturesAndBenefits, TestimonialOne, PricingOne } from "@repo/ui/components";
import { APP_NAME } from "lib/consts";
import { ServerSignedIn, ServerSignedOut } from "../components/common/Auth.server";
import userImage from "public/user-1.avif"

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
            <HeroSectionOne appName={APP_NAME} />
            <FeaturesAndBenefits  />
            <section className={`mt-24 w-full`}>
               <TestimonialOne user={{
                  image: userImage,
                  name: `John Doe`
               }} />
            </section>
            <PricingOne appName={APP_NAME} />
         </ServerSignedIn>
      </section>
   );
}
