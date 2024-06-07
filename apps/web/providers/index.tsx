import React, { PropsWithChildren } from "react";
import SessionProvider from "./SessionProvider";
import { ThemeProvider } from "./ThemeProvider";

interface ProvidersProps extends PropsWithChildren {
}

const Providers = ({ children }: ProvidersProps) => {
   return (
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
   );
};

export default Providers;