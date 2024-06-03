import React from "react";

export interface PageProps {
   params: { userId: string }
}

const Page = async ({params}: PageProps) => {

   return (
      <div>
         User {params.userId} page.
      </div>
   );
};

export default Page;