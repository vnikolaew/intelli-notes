import React from "react";

export interface PageProps {
}

const Page = ({}: PageProps) => {
   return (
      <section className={`flex flex-col w-full mt-24 items-center`}>
         Terms of Service.
      </section>
   );
};

export default Page;