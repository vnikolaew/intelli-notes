import React from "react";
import * as process from "node:process";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { __IS_PROD__ } from "@/lib/consts";
import { notFound } from "next/navigation";

export interface PageProps {
}

export const dynamic = `force-dynamic`;

const Page = async ({}: PageProps) => {
   if(__IS_PROD__) return notFound()

   const all = Object.entries(process.env);
   const clientOnly = all.filter(([key]) => key.startsWith(`NEXT_PUBLIC`));
   console.log({ clientOnly });

   return (
      <section className={`w-full flex flex-col items-center mx-auto justify-between mt-12`}>
         <div className={`w-1/2 mx-auto`}>
            <Table>
               <TableCaption className={`my-4`}>A list of your environment variables.</TableCaption>
               <TableHeader>
                  <TableRow>
                     <TableHead className="max-w-[150px] text-center !w-[100px] font-semibold">Key</TableHead>
                     <TableHead className={`text-center w-[100px]`}>Value</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {all.map(([key, value]) => (
                     <TableRow key={key}>
                        <TableCell className=" max-w-[100px] font-semibold">{key}</TableCell>
                        <TableCell className={`text-wrap max-w-[200px]`}>{value}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </section>
   );
};

export default Page;