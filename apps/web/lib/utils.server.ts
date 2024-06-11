"use server";

import { headers } from "next/headers";

export async function getReferer() {
   let referer = [...headers().entries()].find(([key]) => key === `referer`);
   return referer;
}

const NEW_LINE = "\n";

export async function recordsToCsv<T extends Object>(data: T[], delimiter = `,`) {
   const keys = Object.keys(data[0]);
   return keys.join(delimiter) + NEW_LINE + data.map(value => {

      return keys.map(key => {
         const propValue = value[key];
         let propString = ``;
         if (typeof propValue === `boolean`) propString = String(propValue);
         else propString = `"${String(value[key]).replaceAll(`'`, `\\'`)}"`;

         return `${propString}`;
      }).join(delimiter);
   }).join(NEW_LINE);
}