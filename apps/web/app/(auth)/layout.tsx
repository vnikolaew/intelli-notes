import { auth } from "auth";
import React, { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

export interface LayoutProps extends PropsWithChildren {
}

export const dynamic = `force-dynamic`

const Layout = async ({ children }: LayoutProps) => {
   const session = await auth();
   if (!session) redirect(`/`)

   return (
      <div>
         {children}
      </div>
   );
};

export default Layout;