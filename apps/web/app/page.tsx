import { xprisma } from "@repo/db";
import { auth, signIn } from "../auth";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Fragment } from "react";
import { User } from "@prisma/client";
import { Button } from "../components/ui/button";
//@ts-ignore
import { UilGoogle } from "@iconscout/react-unicons";

export default async function Page(): Promise<JSX.Element> {
   const session = await auth();
   let user: User;
   if (session) {
      user = await xprisma.user.findUnique({ where: { id: session.user.id } });
      console.log({ user });
   }

   return (
      <section className={`flex flex-col items-center p-12 min-h-[70vh] gap-4`}>
         {!session ? (
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
         ) : (
            <Fragment>
               <Avatar title={session.user.name} className={`w-12 h-12 !rounded-full shadow-md cursor-pointer`}>
                  <AvatarImage className={`!w-12 !h-12 !object-cover`} src={session.user.image} />
                  <AvatarFallback>VN</AvatarFallback>
               </Avatar>
               <span>Welcome back,{` `}
                  <b>
                     {session?.user?.name}
                  </b>
               </span>

            </Fragment>
         )}
      </section>
   );
}
