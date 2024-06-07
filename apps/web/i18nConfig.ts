import { NextRequest } from "next/server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export interface Config {
   locales: readonly string[];
   defaultLocale: string;
   localeCookie?: string;
   localeDetector?: ((request: NextRequest, config: Config) => string) | false;
   prefixDefault?: boolean;
   noPrefix?: boolean;
   basePath?: string;
   serverSetCookie?: "if-empty" | "always" | "never";
   cookieOptions?: Partial<ResponseCookie>;
}

// const SUPPORTED_LOCALES = fs.readdirSync(
//    path.join(process.cwd(), `messages`), { encoding: `utf8`, withFileTypes: true })
//    .filter(d => d.isFile() && d.name.endsWith(`.json`))
//    .map(d => d.name.split(`.`).at(0)?.trim());

const SUPPORTED_LOCALES = ["en", "fr", "de"]

const DEFAULT_LOCALE = "en";

const i18nConfig = {
   locales: SUPPORTED_LOCALES,
   defaultLocale: DEFAULT_LOCALE,
   localeDetector:(request: NextRequest, config: Config) => {
      // Provide a static locale, fetch a user setting,
      // read from `cookies()`, `headers()`, etc.

      const headerLanguage = request.headers.get(`Accept-Language`);
      const cookieLanguage = request.cookies.get(`NEXT_LOCALE`)?.value;

      console.log({ headerLanguage, cookieLanguage });

      let locale = cookieLanguage ?? headerLanguage ?? DEFAULT_LOCALE;
      if (!SUPPORTED_LOCALES.includes(locale)) locale = DEFAULT_LOCALE;

      return locale;
   },
};

export default i18nConfig;