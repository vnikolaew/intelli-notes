import styles from "./page.module.css";
import { xprisma } from "@repo/db";
import { auth, signIn, signOut } from "auth";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Button } from "components/ui/button";
import { Fragment } from "react";


async function handleSignOut() {
   "use server";
   await signOut({ redirectTo: `/` });
}

export default async function Page(): Promise<JSX.Element> {
   const count = await xprisma.user.count();
   const session = await auth();

   return (
      <main className={styles.main}>
         <Button className={``}>Click me!</Button>
         {!session ? (
            <form
               action={async () => {
                  "use server";
                  await signIn("google");
               }}
            >
               <button type="submit">Signin with Google</button>
            </form>
         ) : (
            <Fragment>
               <Avatar title={session.user.name} className={`w-12 h-12 !rounded-full shadow-md cursor-pointer`}>
                  <AvatarImage className={`!w-12 !h-12 !object-cover`} src={session.user.image} />
                  <AvatarFallback>VN</AvatarFallback>
               </Avatar>
               <span>Welcome back, {session?.user?.name}</span>
               <form action={handleSignOut}>
                  <Button type={`submit`}>Sign out</Button>
               </form>
            </Fragment>
         )}
         <span>Total users: {count}</span>
      </main>
   );
}
