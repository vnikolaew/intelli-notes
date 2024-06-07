import initTranslations from "@/app/[locale]/i18n";

export async function getTranslation(locale: string) {
   const { t } = await initTranslations(locale, [`home`]);
   return t;
}