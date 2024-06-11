"use client";
import React, { createContext, PropsWithChildren, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Translations } from "./Translations";

const TranslationsContext = createContext<Translations>(null!);

export const useTranslations = () => useContext(TranslationsContext);

export interface TranslationsClientProviderProps extends PropsWithChildren {
}

const DEFAULT_NS = `home`;

const TranslationsClientProvider = ({ children }: TranslationsClientProviderProps) => {
   const { t } = useTranslation(DEFAULT_NS, { keyPrefix: `` });

   return (
      <TranslationsContext.Provider value={new Translations(t)}>
         {children}
      </TranslationsContext.Provider>
   );
};

export default TranslationsClientProvider;