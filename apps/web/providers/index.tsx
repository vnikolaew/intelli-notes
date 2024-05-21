import React, { PropsWithChildren } from "react";
import SessionProvider from "./SessionProvider";
import { ThemeProvider } from "./ThemeProvider";

const Providers = ({ children }: PropsWithChildren) => {
   return (
      <SessionProvider>
         <ThemeProvider
            enableSystem
            disableTransitionOnChange
            defaultTheme={`system`}
            attribute={`class`}>
            {children}
         </ThemeProvider>
      </SessionProvider>
   );
};

export default Providers;