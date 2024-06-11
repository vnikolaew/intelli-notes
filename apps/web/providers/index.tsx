import React, { PropsWithChildren } from "react";
import SessionProvider from "./SessionProvider";
import { ThemeProvider } from "./ThemeProvider";
import TranslationsClientProvider from "@/providers/TranslationsClientProvider";

interface ProvidersProps extends PropsWithChildren {
}

const Providers = ({ children }: ProvidersProps) => {
   return (
      <TranslationsClientProvider>
         <SessionProvider>
            <ThemeProvider
               enableSystem
               disableTransitionOnChange
               themes={[`light`]}
               storageKey={crypto.randomUUID()}
               defaultTheme={`light`}
               attribute={`class`}>
               {children}
            </ThemeProvider>
         </SessionProvider>
      </TranslationsClientProvider>
   );
};

export default Providers;