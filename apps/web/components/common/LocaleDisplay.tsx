import React from "react";
import { getLocale } from "next-intl/server";

export interface LocaleDisplayProps {
}

const LocaleDisplay = async ({}: LocaleDisplayProps) => {
   const locale = await getLocale();
   return (
      <div>Locale: <b>{locale}</b></div>
   );
};

export default LocaleDisplay;