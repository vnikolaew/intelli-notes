import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import * as process from "node:process";
import * as fs from "node:fs";
import * as path from "node:path";

const SUPPORTED_LOCALES = fs.readdirSync(
   path.join(process.cwd(), `messages`), { encoding: `utf8`, withFileTypes: true })
   .filter(d => d.isFile() && d.name.endsWith(`.json`))
   .map(d => d.name.split(`.`).at(0)?.trim());

const DEFAULT_LOCALE = "en";

export default getRequestConfig(async () => {
   // Provide a static locale, fetch a user setting,
   // read from `cookies()`, `headers()`, etc.
   const headerLanguage = headers().get(`Accept-Language`);
   const cookieLanguage = cookies().get(`NEXT_LOCALE`)?.value;

   let locale = cookieLanguage || headerLanguage || DEFAULT_LOCALE;
   if (!SUPPORTED_LOCALES.includes(locale)) locale = DEFAULT_LOCALE

   return {
      locale,
      messages: (await import(`messages/${locale}.json`)).default,
   };
});