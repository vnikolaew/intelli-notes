import React from "react";

export interface PageProps {
}

export const dynamic = `force-dynamic`

const Page = async ({}: PageProps) => {
   return (
      <section className={`w-full flex flex-col items-center mx-auto justify-between`}>
         {Object.entries(process.env).map(([key, value]) => (
            <span key={key}>{key} - <b>{value}</b></span>
         ))}
      </section>
   );
};

export default Page;