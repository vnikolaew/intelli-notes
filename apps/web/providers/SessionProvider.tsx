"use client"
import React, { PropsWithChildren } from "react";
import { SessionProvider as SP } from "next-auth/react";

const SessionProvider = ({children}:PropsWithChildren) => {
   return (
      <SP>
         {children}
      </SP>
   );
};

export default SessionProvider;